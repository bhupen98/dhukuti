# 🔥 Firebase Migration Plan for Dhukuti

**Complete migration from PostgreSQL/Prisma to Firebase for the Dhukuti platform**

## 📋 **Migration Overview**

### **Current State**

- **Backend**: Next.js API routes + Prisma ORM + PostgreSQL
- **Authentication**: NextAuth.js with credentials provider
- **Database**: Relational database with complex relationships
- **File Storage**: Local file system

### **Target State**

- **Backend**: Firebase SDK + Client-side operations
- **Authentication**: Firebase Authentication
- **Database**: Firestore (NoSQL)
- **File Storage**: Firebase Storage
- **Real-time**: Firestore real-time listeners

### **Migration Benefits**

- ✅ Real-time updates out of the box
- ✅ Automatic scaling
- ✅ Built-in authentication
- ✅ Better offline support
- ✅ Simplified deployment
- ✅ Cost-effective for community apps

## 🚀 **Phase 1: Firebase Project Setup & Configuration**

### **Timeline**: 1-2 days

### **Priority**: Critical

#### **1.1 Create Firebase Project**

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase project
firebase init
```

#### **1.2 Configure Firebase Services**

```typescript
// Enable these services:
✅ Authentication (Email/Password, Google)
✅ Firestore Database
✅ Storage
✅ Hosting (optional)
✅ Functions (optional)
```

#### **1.3 Update Dependencies**

```bash
# Remove Prisma dependencies
npm uninstall @prisma/client prisma @auth/prisma-adapter bcryptjs

# Install Firebase dependencies
npm install firebase
npm install -D firebase-tools
```

#### **1.4 Environment Configuration**

```bash
# .env.local
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

#### **1.5 Firebase Configuration File**

```typescript
// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
```

## 🔐 **Phase 2: Authentication System Migration**

### **Timeline**: 2-3 days

### **Priority**: Critical

#### **2.1 Replace NextAuth.js with Firebase Auth**

```typescript
// src/lib/auth.ts (Replace entire file)
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { auth } from "./firebase";

export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const signUp = async (email: string, password: string, name: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    // Update display name
    await updateProfile(userCredential.user, { displayName: name });
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
```

#### **2.2 Create Auth Context Provider**

```typescript
// src/components/providers/AuthProvider.tsx
import { createContext, useContext, useEffect, useState } from 'react'
import { User, onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/lib/firebase'

interface AuthContextType {
  user: User | null
  loading: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
```

#### **2.3 Update Login/Signup Pages**

```typescript
// src/app/login/page.tsx
// Replace NextAuth signIn with Firebase signIn
import { signIn, signUp } from "@/lib/auth";

// Update form submission handlers
const handleSignIn = async () => {
  const result = await signIn(formData.email, formData.password);
  if (result.success) {
    router.push("/dashboard");
  } else {
    setMessage({ type: "error", text: result.error });
  }
};
```

#### **2.4 Remove NextAuth Dependencies**

```bash
# Remove NextAuth files
rm src/app/api/auth/[...nextauth]/route.ts
rm src/components/providers/SessionProvider.tsx

# Update layout.tsx to use AuthProvider instead
```

## 🗄️ **Phase 3: Database Schema Migration**

### **Timeline**: 3-4 days

### **Priority**: High

#### **3.1 Design Firestore Collections**

```typescript
// Firestore Collection Structure
users: {
  [userId]: {
    email: string
    name: string
    avatar?: string
    phoneNumber?: string
    address?: string
    isVerified: boolean
    reputation: number
    totalEarnings: number
    totalContributions: number
    createdAt: Timestamp
    updatedAt: Timestamp
  }
}

groups: {
  [groupId]: {
    name: string
    description?: string
    maxMembers: number
    contributionAmount: number
    cycleDuration: number
    startDate?: Timestamp
    endDate?: Timestamp
    status: 'ACTIVE' | 'INACTIVE' | 'COMPLETED' | 'SUSPENDED'
    ownerId: string
    memberCount: number // Denormalized
    totalContributions: number // Denormalized
    createdAt: Timestamp
    updatedAt: Timestamp
  }
}

groupMembers: {
  [memberId]: {
    userId: string
    groupId: string
    joinedAt: Timestamp
    status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED'
    role: 'OWNER' | 'ADMIN' | 'MEMBER'
  }
}

contributions: {
  [contributionId]: {
    amount: number
    dueDate: Timestamp
    paidDate?: Timestamp
    status: 'PENDING' | 'PAID' | 'OVERDUE' | 'CANCELLED'
    cycleNumber: number
    notes?: string
    userId: string
    groupId: string
    createdAt: Timestamp
    updatedAt: Timestamp
  }
}

transactions: {
  [transactionId]: {
    amount: number
    type: 'CONTRIBUTION' | 'PAYOUT' | 'FEE' | 'REFUND'
    description?: string
    status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED'
    userId: string
    groupId: string
    createdAt: Timestamp
  }
}

activities: {
  [activityId]: {
    type: string
    title: string
    description?: string
    metadata?: any
    userId?: string
    groupId?: string
    createdAt: Timestamp
  }
}

messages: {
  [messageId]: {
    content: string
    messageType: 'TEXT' | 'IMAGE' | 'FILE' | 'SYSTEM'
    userId: string
    groupId: string
    createdAt: Timestamp
    updatedAt: Timestamp
  }
}
```

#### **3.2 Create Database Service Layer**

```typescript
// src/lib/database.ts
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { db } from "./firebase";

// User operations
export const createUser = async (userData: Partial<User>) => {
  const docRef = await addDoc(collection(db, "users"), {
    ...userData,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return docRef.id;
};

export const getUser = async (userId: string) => {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};

// Group operations
export const createGroup = async (groupData: Partial<Group>) => {
  const docRef = await addDoc(collection(db, "groups"), {
    ...groupData,
    memberCount: 1, // Start with owner
    totalContributions: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return docRef.id;
};

export const getGroupsByUser = async (userId: string) => {
  const q = query(collection(db, "groups"), where("ownerId", "==", userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// Real-time listeners
export const subscribeToGroupUpdates = (
  groupId: string,
  callback: Function
) => {
  const q = doc(db, "groups", groupId);
  return onSnapshot(q, doc => {
    if (doc.exists()) {
      callback({ id: doc.id, ...doc.data() });
    }
  });
};
```

#### **3.3 Update Type Definitions**

```typescript
// src/types/index.ts
// Replace Prisma types with Firebase types

export interface FirebaseUser {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  phoneNumber?: string;
  address?: string;
  isVerified: boolean;
  reputation: number;
  totalEarnings: number;
  totalContributions: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface FirebaseGroup {
  id: string;
  name: string;
  description?: string;
  maxMembers: number;
  contributionAmount: number;
  cycleDuration: number;
  startDate?: Date;
  endDate?: Date;
  status: "ACTIVE" | "INACTIVE" | "COMPLETED" | "SUSPENDED";
  ownerId: string;
  memberCount: number;
  totalContributions: number;
  createdAt: Date;
  updatedAt: Date;
}

// ... other types
```

## 🔄 **Phase 4: API Routes Replacement**

### **Timeline**: 4-5 days

### **Priority**: High

#### **4.1 Remove Next.js API Routes**

```bash
# Remove all API routes
rm -rf src/app/api/

# These will be replaced with Firebase SDK calls
```

#### **4.2 Update Components to Use Firebase**

```typescript
// Example: src/app/groups/page.tsx
// Replace API calls with Firebase operations

import { useEffect, useState } from "react";
import { useAuth } from "@/components/providers/AuthProvider";
import { getGroupsByUser, subscribeToGroupUpdates } from "@/lib/database";

export default function GroupsPage() {
  const { user } = useAuth();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const loadGroups = async () => {
        const userGroups = await getGroupsByUser(user.uid);
        setGroups(userGroups);
        setLoading(false);
      };
      loadGroups();
    }
  }, [user]);

  // ... rest of component
}
```

#### **4.3 Create Custom Hooks for Firebase Operations**

```typescript
// src/hooks/useFirestore.ts
import { useState, useEffect } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const useCollection = (collectionName: string, constraints = []) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      let q = collection(db, collectionName);

      // Apply constraints
      constraints.forEach(([field, operator, value]) => {
        q = query(q, where(field, operator, value));
      });

      const unsubscribe = onSnapshot(
        q,
        snapshot => {
          const documents = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setData(documents);
          setLoading(false);
        },
        error => {
          setError(error);
          setLoading(false);
        }
      );

      return unsubscribe;
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }, [collectionName, JSON.stringify(constraints)]);

  return { data, loading, error };
};

export const useDocument = (collectionName: string, documentId: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!documentId) return;

    const docRef = doc(db, collectionName, documentId);
    const unsubscribe = onSnapshot(
      docRef,
      doc => {
        if (doc.exists()) {
          setData({ id: doc.id, ...doc.data() });
        } else {
          setData(null);
        }
        setLoading(false);
      },
      error => {
        setError(error);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [collectionName, documentId]);

  return { data, loading, error };
};
```

## 📁 **Phase 5: File Storage Migration**

### **Timeline**: 1-2 days

### **Priority**: Medium

#### **5.1 Firebase Storage Setup**

```typescript
// src/lib/storage.ts
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "./firebase";

export const uploadFile = async (file: File, path: string) => {
  try {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return { success: true, url: downloadURL };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const deleteFile = async (path: string) => {
  try {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
```

#### **5.2 Update Avatar Upload**

```typescript
// src/components/features/dashboard/ProfileWidget.tsx
// Replace local file handling with Firebase Storage

import { uploadFile } from "@/lib/storage";

const handleAvatarUpload = async (file: File) => {
  const path = `avatars/${user.uid}/${Date.now()}_${file.name}`;
  const result = await uploadFile(file, path);

  if (result.success) {
    // Update user profile with new avatar URL
    await updateDoc(doc(db, "users", user.uid), {
      avatar: result.url,
      updatedAt: new Date(),
    });
  }
};
```

## 🎯 **Phase 6: Real-time Features Implementation**

### **Timeline**: 2-3 days

### **Priority**: Medium

#### **6.1 Real-time Group Updates**

```typescript
// src/components/features/groups/GroupCard.tsx
// Add real-time updates

import { useEffect } from "react";
import { subscribeToGroupUpdates } from "@/lib/database";

export default function GroupCard({ groupId }: { groupId: string }) {
  const [group, setGroup] = useState(null);

  useEffect(() => {
    const unsubscribe = subscribeToGroupUpdates(groupId, updatedGroup => {
      setGroup(updatedGroup);
    });

    return unsubscribe;
  }, [groupId]);

  // ... rest of component
}
```

#### **6.2 Real-time Chat Implementation**

```typescript
// src/components/chat/GroupChat.tsx
// Implement real-time messaging

import { useCollection } from "@/hooks/useFirestore";

export default function GroupChat({ groupId }: { groupId: string }) {
  const { data: messages, loading } = useCollection("messages", [
    ["groupId", "==", groupId],
  ]);

  const sendMessage = async (content: string) => {
    await addDoc(collection(db, "messages"), {
      content,
      userId: user.uid,
      groupId,
      messageType: "TEXT",
      createdAt: new Date(),
    });
  };

  // ... rest of component
}
```

## 🧪 **Phase 7: Testing & Quality Assurance**

### **Timeline**: 2-3 days

### **Priority**: High

#### **7.1 Unit Testing**

```bash
# Install testing dependencies
npm install -D jest @testing-library/react @testing-library/jest-dom

# Create test files for Firebase operations
```

#### **7.2 Integration Testing**

```typescript
// Test Firebase operations
describe("Firebase Operations", () => {
  test("should create user successfully", async () => {
    const userData = { email: "test@example.com", name: "Test User" };
    const userId = await createUser(userData);
    expect(userId).toBeDefined();
  });
});
```

#### **7.3 Performance Testing**

```typescript
// Test real-time listeners
describe("Real-time Features", () => {
  test("should update in real-time", done => {
    const unsubscribe = subscribeToGroupUpdates("test-group", data => {
      expect(data).toBeDefined();
      unsubscribe();
      done();
    });
  });
});
```

## 🚀 **Phase 8: Deployment & Production Setup**

### **Timeline**: 1-2 days

### **Priority**: High

#### **8.1 Firebase Hosting Setup**

```bash
# Build the application
npm run build

# Deploy to Firebase Hosting
firebase deploy --only hosting
```

#### **8.2 Environment Variables**

```bash
# Production environment variables
NEXT_PUBLIC_FIREBASE_API_KEY=prod_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=prod_project.firebaseapp.com
# ... other production values
```

#### **8.3 Security Rules**

```typescript
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Groups: owners and members can access
    match /groups/{groupId} {
      allow read: if request.auth != null &&
        (resource.data.ownerId == request.auth.uid ||
         exists(/databases/$(database)/documents/groupMembers/$(groupId + '_' + request.auth.uid)));
      allow write: if request.auth != null && resource.data.ownerId == request.auth.uid;
    }

    // ... other security rules
  }
}
```

## 📊 **Phase 9: Data Migration & Validation**

### **Timeline**: 2-3 days

### **Priority**: Medium

#### **9.1 Export Current Data**

```typescript
// scripts/export-data.ts
// Export data from PostgreSQL for migration
```

#### **9.2 Transform Data Structure**

```typescript
// scripts/transform-data.ts
// Transform relational data to Firestore structure
```

#### **9.3 Import to Firebase**

```typescript
// scripts/import-to-firebase.ts
// Import transformed data to Firestore
```

## 🔄 **Phase 10: Monitoring & Optimization**

### **Timeline**: Ongoing

### **Priority**: Low

#### **10.1 Firebase Analytics**

```typescript
// Implement Firebase Analytics for monitoring
```

#### **10.2 Performance Monitoring**

```typescript
// Monitor Firestore performance and costs
```

#### **10.3 Error Tracking**

```typescript
// Implement error tracking and logging
```

## 📅 **Migration Timeline Summary**

| Phase                 | Duration | Priority | Dependencies  |
| --------------------- | -------- | -------- | ------------- |
| 1. Firebase Setup     | 1-2 days | Critical | None          |
| 2. Authentication     | 2-3 days | Critical | Phase 1       |
| 3. Database Schema    | 3-4 days | High     | Phase 1       |
| 4. API Replacement    | 4-5 days | High     | Phase 2, 3    |
| 5. File Storage       | 1-2 days | Medium   | Phase 1       |
| 6. Real-time Features | 2-3 days | Medium   | Phase 4       |
| 7. Testing            | 2-3 days | High     | Phase 4, 5, 6 |
| 8. Deployment         | 1-2 days | High     | Phase 7       |
| 9. Data Migration     | 2-3 days | Medium   | Phase 8       |
| 10. Monitoring        | Ongoing  | Low      | Phase 8       |

**Total Estimated Time**: 18-28 days

## 🚨 **Risk Mitigation**

### **Rollback Plan**

- Keep PostgreSQL database running during migration
- Maintain NextAuth.js as backup authentication
- Create feature flags for gradual rollout

### **Data Backup**

- Export all data before migration
- Test migration on staging environment
- Validate data integrity after migration

### **Performance Monitoring**

- Monitor Firebase costs during migration
- Track application performance metrics
- Set up alerts for critical issues

## 📚 **Resources & Documentation**

### **Firebase Documentation**

- [Firebase Console](https://console.firebase.google.com/)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Firebase Auth Documentation](https://firebase.google.com/docs/auth)
- [Firebase Storage Documentation](https://firebase.google.com/docs/storage)

### **Migration Tools**

- [Firebase CLI](https://firebase.google.com/docs/cli)
- [Firebase Emulator](https://firebase.google.com/docs/emulator-suite)
- [Firebase Extensions](https://firebase.google.com/docs/extensions)

---

**Next Steps**: Begin with Phase 1 (Firebase Setup) and work through each phase sequentially. Each phase should be completed and tested before moving to the next.

**Need Help?**: Create issues in the repository for specific phase questions or blockers.
