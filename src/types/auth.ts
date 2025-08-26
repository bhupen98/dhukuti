// Firebase Auth types
export interface FirebaseSession {
  user: {
    uid: string;
    email: string;
    displayName?: string;
    photoURL?: string;
  };
  expires: string;
}

export interface FirebaseJWT {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
}

export interface User {
  uid: string
  email: string
  displayName: string
  createdAt: Date
  updatedAt: Date
  phoneNumber?: string
  avatar?: string
  isActive: boolean
}

export interface SessionUser {
  id: string
  email: string
  name: string
  avatar?: string
}

export type UserWithGroups = User & {
  ownedGroups: Group[]
  memberships: GroupMember[]
}
