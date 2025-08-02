import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function verifyData() {
  console.log('🔍 Verifying Real-World Data...\n')

  // Get all users
  const users = await prisma.user.findMany({
    include: {
      ownedGroups: true,
      memberships: {
        include: { group: true }
      },
      contributions: true
    }
  })

  console.log('👥 USERS:')
  users.forEach(user => {
    console.log(`  • ${user.name} (${user.email})`)
    console.log(`    Reputation: ${user.reputation}`)
    console.log(`    Total Earnings: Rs. ${user.totalEarnings}`)
    console.log(`    Groups Owned: ${user.ownedGroups.length}`)
    console.log(`    Groups Member: ${user.memberships.length}`)
    console.log(`    Contributions: ${user.contributions.length}`)
    console.log('')
  })

  // Get all groups
  const groups = await prisma.group.findMany({
    include: {
      owner: true,
      members: {
        include: { user: true }
      },
      contributions: true,
      transactions: true
    }
  })

  console.log('🏘️ GROUPS:')
  groups.forEach(group => {
    const totalContributions = group.contributions.reduce((sum, c) => sum + Number(c.amount), 0)
    const paidContributions = group.contributions.filter(c => c.status === 'PAID').length
    const pendingContributions = group.contributions.filter(c => c.status === 'PENDING').length

    console.log(`  • ${group.name}`)
    console.log(`    Owner: ${group.owner.name}`)
    console.log(`    Members: ${group.members.length}`)
    console.log(`    Contribution Amount: Rs. ${group.contributionAmount}`)
    console.log(`    Cycle Duration: ${group.cycleDuration} days`)
    console.log(`    Total Contributions: Rs. ${totalContributions}`)
    console.log(`    Paid: ${paidContributions}, Pending: ${pendingContributions}`)
    console.log('')
  })

  // Get financial summary
  const totalContributions = await prisma.contribution.aggregate({
    _sum: { amount: true },
    _count: true
  })

  const paidContributions = await prisma.contribution.count({
    where: { status: 'PAID' }
  })

  const pendingContributions = await prisma.contribution.count({
    where: { status: 'PENDING' }
  })

  const totalTransactions = await prisma.transaction.aggregate({
    _sum: { amount: true }
  })

  console.log('💰 FINANCIAL SUMMARY:')
  console.log(`  • Total Contributions: ${totalContributions._count}`)
  console.log(`  • Total Amount: Rs. ${totalContributions._sum.amount || 0}`)
  console.log(`  • Paid: ${paidContributions}`)
  console.log(`  • Pending: ${pendingContributions}`)
  console.log(`  • Total Transactions: Rs. ${totalTransactions._sum.amount || 0}`)
  console.log('')

  // Get recent activities
  const recentActivities = await prisma.activity.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: { user: true, group: true }
  })

  console.log('📊 RECENT ACTIVITIES:')
  recentActivities.forEach(activity => {
    console.log(`  • ${activity.title}`)
    console.log(`    ${activity.description}`)
    console.log(`    User: ${activity.user?.name || 'System'}`)
    console.log(`    Group: ${activity.group?.name || 'N/A'}`)
    console.log(`    Date: ${activity.createdAt.toLocaleDateString()}`)
    console.log('')
  })

  console.log('✅ Data verification complete!')
  console.log('🎯 Your Dhukuti platform is ready for real-world operations!')
}

verifyData()
  .catch((e) => {
    console.error('❌ Error verifying data:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 