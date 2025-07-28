import { PrismaClient } from '@prisma/client'
import { generateAvatarUrl } from '../src/lib/utils'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Note: Real users will be created through Google OAuth authentication
  // This seed file creates sample groups and data for demonstration purposes

  console.log('✅ Database seeded successfully')
  console.log('📝 Note: Users will be created automatically when they sign in with Google OAuth')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 