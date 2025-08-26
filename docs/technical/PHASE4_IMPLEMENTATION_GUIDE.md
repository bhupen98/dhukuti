# 📊 Phase 4 Implementation Guide - Backend Infrastructure & Database Design

## 🎯 **Phase 4 Overview**

**Duration:** 2-3 weeks  
**Priority:** Critical  
**Dependencies:** None (can start immediately)

### **Objectives:**
- Complete Firebase schema implementation
- Set up comprehensive backend services
- Implement data validation and security
- Create API layer for frontend communication

---

## 🗄️ **4.1 Firebase Schema Implementation**

### **4.1.1 Core Collections Structure**

```typescript
// src/types/firebase/schema.ts

// Users Collection
users/{userId}
├── profile: UserProfile
├── settings: UserSettings
├── preferences: UserPreferences
└── security: SecuritySettings

// Groups Collection
groups/{groupId}
├── basic: GroupBasic
├── financial: GroupFinancial
├── rules: GroupRules
└── settings: GroupSettings

// Group Members Collection
groupMembers/{groupId}/{userId}
├── membership: MembershipDetails
├── permissions: MemberPermissions
└── history: MembershipHistory

// Contributions Collection
contributions/{contributionId}
├── payment: PaymentDetails
├── schedule: PaymentSchedule
├── history: PaymentHistory
└── status: PaymentStatus

// Transactions Collection
transactions/{transactionId}
├── details: TransactionDetails
├── metadata: TransactionMetadata
└── audit: AuditTrail
```

### **4.1.2 Key Type Definitions**

```typescript
// src/types/firebase/users.ts
export interface UserProfile {
  uid: string
  email: string
  displayName: string
  phoneNumber?: string
  avatar?: string
  kycStatus: 'PENDING' | 'VERIFIED' | 'REJECTED'
  createdAt: Date
  updatedAt: Date
  isActive: boolean
}

export interface UserSettings {
  uid: string
  language: 'en' | 'ne' | 'hi'
  timezone: string
  currency: 'USD' | 'NPR' | 'EUR'
  notifications: {
    email: boolean
    sms: boolean
    push: boolean
  }
  updatedAt: Date
}

// src/types/firebase/groups.ts
export interface GroupBasic {
  id: string
  name: string
  description: string
  category: 'SAVINGS' | 'LENDING' | 'INVESTMENT'
  type: 'ROTATING' | 'FIXED' | 'FLEXIBLE'
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED'
  visibility: 'PUBLIC' | 'PRIVATE' | 'INVITE_ONLY'
  createdAt: Date
  createdBy: string
}

export interface GroupFinancial {
  id: string
  contributionAmount: number
  contributionFrequency: 'DAILY' | 'WEEKLY' | 'MONTHLY'
  maxMembers: number
  currentMembers: number
  totalFunds: number
  availableFunds: number
  currency: string
  cycleDuration: number
  currentCycle: number
  updatedAt: Date
}
```

---

## 🔐 **4.2 Firestore Security Rules**

### **4.2.1 Basic Security Rules**

```javascript
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return request.auth.uid == userId;
    }
    
    function isGroupMember(groupId) {
      return exists(/databases/$(database)/documents/groupMembers/$(groupId)/$(request.auth.uid));
    }
    
    function isGroupAdmin(groupId) {
      let member = get(/databases/$(database)/documents/groupMembers/$(groupId)/$(request.auth.uid));
      return member.data.role in ['OWNER', 'ADMIN'];
    }
    
    // Users collection
    match /users/{userId} {
      allow read, write: if isAuthenticated() && isOwner(userId);
    }
    
    // Groups collection
    match /groups/{groupId} {
      allow read: if isAuthenticated() && (
        resource.data.visibility == 'PUBLIC' || 
        isGroupMember(groupId)
      );
      allow create: if isAuthenticated();
      allow update, delete: if isAuthenticated() && isGroupAdmin(groupId);
    }
    
    // Group members
    match /groupMembers/{groupId}/{userId} {
      allow read: if isAuthenticated() && isGroupMember(groupId);
      allow write: if isAuthenticated() && isGroupAdmin(groupId);
    }
    
    // Contributions
    match /contributions/{contributionId} {
      allow read: if isAuthenticated() && (
        resource.data.userId == request.auth.uid ||
        isGroupMember(resource.data.groupId)
      );
      allow create: if isAuthenticated() && 
        resource.data.userId == request.auth.uid;
      allow update: if isAuthenticated() && (
        resource.data.userId == request.auth.uid ||
        isGroupAdmin(resource.data.groupId)
      );
    }
  }
}
```

---

## 🛠️ **4.3 Backend Services Layer**

### **4.3.1 User Service**

```typescript
// src/lib/services/userService.ts
import { db } from '@/lib/firebase/config'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { UserProfile, UserSettings } from '@/types/firebase/users'

export class UserService {
  static async createUserProfile(uid: string, profileData: Partial<UserProfile>): Promise<UserProfile> {
    try {
      const userRef = doc(db, 'users', uid)
      const userData: UserProfile = {
        uid,
        email: profileData.email || '',
        displayName: profileData.displayName || '',
        phoneNumber: profileData.phoneNumber,
        avatar: profileData.avatar,
        kycStatus: 'PENDING',
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
        ...profileData
      }

      await setDoc(userRef, userData)
      return userData
    } catch (error) {
      console.error('Error creating user profile:', error)
      throw new Error('Failed to create user profile')
    }
  }

  static async getUserProfile(uid: string): Promise<UserProfile | null> {
    try {
      const userRef = doc(db, 'users', uid)
      const userSnap = await getDoc(userRef)

      if (userSnap.exists()) {
        return userSnap.data() as UserProfile
      }
      return null
    } catch (error) {
      console.error('Error getting user profile:', error)
      throw new Error('Failed to get user profile')
    }
  }

  static async updateUserProfile(uid: string, updates: Partial<UserProfile>): Promise<void> {
    try {
      const userRef = doc(db, 'users', uid)
      await updateDoc(userRef, {
        ...updates,
        updatedAt: new Date()
      })
    } catch (error) {
      console.error('Error updating user profile:', error)
      throw new Error('Failed to update user profile')
    }
  }

  static async getUserSettings(uid: string): Promise<UserSettings | null> {
    try {
      const settingsRef = doc(db, 'users', uid, 'settings', 'main')
      const settingsSnap = await getDoc(settingsRef)

      if (settingsSnap.exists()) {
        return settingsSnap.data() as UserSettings
      }
      return null
    } catch (error) {
      console.error('Error getting user settings:', error)
      throw new Error('Failed to get user settings')
    }
  }

  static async updateUserSettings(uid: string, updates: Partial<UserSettings>): Promise<void> {
    try {
      const settingsRef = doc(db, 'users', uid, 'settings', 'main')
      await setDoc(settingsRef, {
        ...updates,
        updatedAt: new Date()
      }, { merge: true })
    } catch (error) {
      console.error('Error updating user settings:', error)
      throw new Error('Failed to update user settings')
    }
  }
}
```

### **4.3.2 Group Service**

```typescript
// src/lib/services/groupService.ts
import { db } from '@/lib/firebase/config'
import { doc, getDoc, setDoc, updateDoc, addDoc, collection } from 'firebase/firestore'
import { GroupBasic, GroupFinancial } from '@/types/firebase/groups'

export class GroupService {
  static async createGroup(
    creatorId: string, 
    basicData: Partial<GroupBasic>,
    financialData: Partial<GroupFinancial>
  ): Promise<string> {
    try {
      // Create group document
      const groupRef = await addDoc(collection(db, 'groups'), {
        ...basicData,
        createdAt: new Date(),
        createdBy: creatorId
      })

      const groupId = groupRef.id

      // Create financial subcollection
      await setDoc(doc(db, 'groups', groupId, 'financial', 'main'), {
        id: groupId,
        ...financialData,
        updatedAt: new Date()
      })

      // Add creator as owner
      await this.addMember(groupId, creatorId, 'OWNER')

      return groupId
    } catch (error) {
      console.error('Error creating group:', error)
      throw new Error('Failed to create group')
    }
  }

  static async getGroup(groupId: string): Promise<{
    basic: GroupBasic
    financial: GroupFinancial
  } | null> {
    try {
      const [basicSnap, financialSnap] = await Promise.all([
        getDoc(doc(db, 'groups', groupId)),
        getDoc(doc(db, 'groups', groupId, 'financial', 'main'))
      ])

      if (!basicSnap.exists()) {
        return null
      }

      return {
        basic: basicSnap.data() as GroupBasic,
        financial: financialSnap.data() as GroupFinancial
      }
    } catch (error) {
      console.error('Error getting group:', error)
      throw new Error('Failed to get group')
    }
  }

  static async addMember(
    groupId: string, 
    userId: string, 
    role: 'OWNER' | 'ADMIN' | 'MEMBER' = 'MEMBER'
  ): Promise<void> {
    try {
      const memberData = {
        id: `${groupId}_${userId}`,
        groupId,
        userId,
        role,
        status: 'ACTIVE',
        joinedAt: new Date(),
        totalContributions: 0,
        currentBalance: 0,
        updatedAt: new Date()
      }

      const memberRef = doc(db, 'groupMembers', groupId, userId)
      await setDoc(memberRef, memberData)
    } catch (error) {
      console.error('Error adding member:', error)
      throw new Error('Failed to add member')
    }
  }
}
```

---

## 🌐 **4.4 API Layer Implementation**

### **4.4.1 User API Routes**

```typescript
// src/app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { UserService } from '@/lib/services/userService'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { uid, profileData } = body

    if (!uid || !profileData) {
      return NextResponse.json({ error: 'UID and profile data are required' }, { status: 400 })
    }

    const user = await UserService.createUserProfile(uid, profileData)
    return NextResponse.json({ user })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
```

```typescript
// src/app/api/users/[uid]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { UserService } from '@/lib/services/userService'

export async function GET(
  request: NextRequest,
  { params }: { params: { uid: string } }
) {
  try {
    const user = await UserService.getUserProfile(params.uid)
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { uid: string } }
) {
  try {
    const body = await request.json()
    const { updates } = body

    await UserService.updateUserProfile(params.uid, updates)
    return NextResponse.json({ message: 'User updated successfully' })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
```

### **4.4.2 Group API Routes**

```typescript
// src/app/api/groups/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { GroupService } from '@/lib/services/groupService'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { creatorId, basicData, financialData } = body

    if (!creatorId || !basicData) {
      return NextResponse.json({ error: 'Creator ID and basic data are required' }, { status: 400 })
    }

    const groupId = await GroupService.createGroup(creatorId, basicData, financialData || {})
    return NextResponse.json({ groupId })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
```

```typescript
// src/app/api/groups/[groupId]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { GroupService } from '@/lib/services/groupService'

export async function GET(
  request: NextRequest,
  { params }: { params: { groupId: string } }
) {
  try {
    const group = await GroupService.getGroup(params.groupId)
    
    if (!group) {
      return NextResponse.json({ error: 'Group not found' }, { status: 404 })
    }

    return NextResponse.json({ group })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
```

---

## 📋 **Phase 4 Implementation Checklist**

### **Week 1 Tasks:**
- [ ] **Day 1-2**: Implement Firebase schema types
- [ ] **Day 3-4**: Create User Service with CRUD operations
- [ ] **Day 5**: Create Group Service with basic operations

### **Week 2 Tasks:**
- [ ] **Day 1-2**: Complete Group Service with member management
- [ ] **Day 3-4**: Implement Firestore security rules
- [ ] **Day 5**: Create basic API routes for users and groups

### **Week 3 Tasks:**
- [ ] **Day 1-2**: Implement Contribution and Transaction services
- [ ] **Day 3-4**: Create remaining API routes
- [ ] **Day 5**: Testing and documentation

### **Deliverables:**
- ✅ Complete Firebase schema with all collections
- ✅ Comprehensive security rules
- ✅ Full backend service layer
- ✅ RESTful API endpoints
- ✅ API documentation

---

## 🚀 **Next Steps After Phase 4**

Once Phase 4 is completed, the project will have:
- **Solid backend foundation** with proper data structure
- **Secure data access** with comprehensive security rules
- **Professional service layer** for all business operations
- **API endpoints** ready for frontend integration

**Phase 5** will focus on **Advanced Frontend Features** including:
- Advanced UI components
- Real-time features
- Data visualization
- Comprehensive form system

This foundation will enable rapid development of the remaining phases and ensure a scalable, maintainable enterprise application.
