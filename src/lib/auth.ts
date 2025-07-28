import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from './prisma'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Demo Account',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "demo@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Admin login
        if (credentials?.email === 'admin@dhukuti.com' && credentials?.password === 'admin123') {
          const adminUser = await prisma.user.upsert({
            where: { email: 'admin@dhukuti.com' },
            update: {},
            create: {
              email: 'admin@dhukuti.com',
              name: 'Admin User',
              avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
              phoneNumber: '+61412345678',
              address: 'Sydney, NSW',
              emergencyContact: '+61412345679',
              isVerified: true,
              reputation: 100,
              totalEarnings: 0,
              totalContributions: 0,
              role: 'ADMIN', // Use the correct enum value
            },
          })
          return adminUser
        }

        // Regular demo login
        if (credentials?.email === 'demo@example.com' && credentials?.password === 'demo123') {
          const user = await prisma.user.upsert({
            where: { email: 'demo@example.com' },
            update: {},
            create: {
              email: 'demo@example.com',
              name: 'Demo User',
              avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo',
              phoneNumber: '+61412345678',
              address: 'Sydney, NSW',
              emergencyContact: '+61412345679',
              isVerified: true,
              reputation: 95,
              totalEarnings: 34000,
              totalContributions: 12,
              role: 'USER', // Use the correct enum value
            },
          })
          return user
        }
        return null
      }
    }),
  ],
  callbacks: {
    session: async ({ session, user }) => {
      if (session?.user && user) {
        session.user.id = user.id
        // Add role to session
        session.user.role = (user as any).role || 'USER'
      }
      return session
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id
        // Add role to token
        token.role = (user as any).role || 'USER'
      }
      return token
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
} 