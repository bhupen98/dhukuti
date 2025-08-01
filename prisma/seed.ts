import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clear existing data
  console.log('🧹 Clearing existing data...');
  await prisma.transaction.deleteMany();
  await prisma.contribution.deleteMany();
  await prisma.message.deleteMany();
  await prisma.activity.deleteMany();
  await prisma.groupMember.deleteMany();
  await prisma.group.deleteMany();
  await prisma.user.deleteMany();

  console.log('👥 Creating users...');

  // Create users with Nepalese names and Australian locations
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'ramesh.thapa@email.com',
        name: 'Ramesh Thapa',
        password: await bcrypt.hash('password123', 12),
        phoneNumber: '+61-412-345-678',
        address: 'Melbourne, VIC, Australia',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ramesh',
        totalContributions: 12,
        totalEarnings: 8000,
        reputation: 95,
        isVerified: true,
      },
    }),
    prisma.user.create({
      data: {
        email: 'sita.gurung@email.com',
        name: 'Sita Gurung',
        password: await bcrypt.hash('password123', 12),
        phoneNumber: '+61-413-456-789',
        address: 'Brisbane, QLD, Australia',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sita',
        totalContributions: 10,
        totalEarnings: 6000,
        reputation: 92,
        isVerified: true,
      },
    }),
    prisma.user.create({
      data: {
        email: 'bhupen.rai@email.com',
        name: 'Bhupen Rai',
        password: await bcrypt.hash('password123', 12),
        phoneNumber: '+61-414-567-890',
        address: 'Perth, WA, Australia',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bhupen',
        totalContributions: 15,
        totalEarnings: 10000,
        reputation: 88,
        isVerified: true,
      },
    }),
    prisma.user.create({
      data: {
        email: 'anjali.shrestha@email.com',
        name: 'Anjali Shrestha',
        password: await bcrypt.hash('password123', 12),
        phoneNumber: '+61-415-678-901',
        address: 'Adelaide, SA, Australia',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=anjali',
        totalContributions: 8,
        totalEarnings: 4000,
        reputation: 85,
        isVerified: true,
      },
    }),
    prisma.user.create({
      data: {
        email: 'dipesh.magar@email.com',
        name: 'Dipesh Magar',
        password: await bcrypt.hash('password123', 12),
        phoneNumber: '+61-416-789-012',
        address: 'Canberra, ACT, Australia',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=dipesh',
        totalContributions: 6,
        totalEarnings: 3000,
        reputation: 82,
        isVerified: true,
      },
    }),
    prisma.user.create({
      data: {
        email: 'priya.tamang@email.com',
        name: 'Priya Tamang',
        password: await bcrypt.hash('password123', 12),
        phoneNumber: '+61-417-890-123',
        address: 'Darwin, NT, Australia',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya',
        totalContributions: 9,
        totalEarnings: 5000,
        reputation: 87,
        isVerified: true,
      },
    }),
    prisma.user.create({
      data: {
        email: 'santosh.limbu@email.com',
        name: 'Santosh Limbu',
        password: await bcrypt.hash('password123', 12),
        phoneNumber: '+61-418-901-234',
        address: 'Hobart, TAS, Australia',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=santosh',
        totalContributions: 11,
        totalEarnings: 7000,
        reputation: 90,
        isVerified: true,
      },
    }),
  ]);

  console.log('👥 Users created:', users.length);

  console.log('🏘️ Creating groups...');

  // Create Dhukuti groups with Nepalese community focus
  const groups = await Promise.all([
    prisma.group.create({
      data: {
        name: 'Sydney Nepalese Community',
        description: 'Traditional Dhukuti group for Nepalese community in Sydney. Building financial security together.',
        contributionAmount: 1000,
        maxMembers: 12,
        cycleDuration: 30,
        startDate: new Date(),
        status: 'ACTIVE',
        ownerId: users[1].id,
      },
    }),
    prisma.group.create({
      data: {
        name: 'Melbourne Nepalese Professionals',
        description: 'Dhukuti group for Nepalese professionals in Melbourne. Supporting career growth and financial stability.',
        contributionAmount: 1500,
        maxMembers: 10,
        cycleDuration: 30,
        startDate: new Date(),
        status: 'ACTIVE',
        ownerId: users[2].id,
      },
    }),
    prisma.group.create({
      data: {
        name: 'Brisbane Nepalese Students',
        description: 'Dhukuti group for Nepalese students in Brisbane. Supporting education and community bonding.',
        contributionAmount: 500,
        maxMembers: 15,
        cycleDuration: 30,
        startDate: new Date(),
        status: 'ACTIVE',
        ownerId: users[3].id,
      },
    }),
    prisma.group.create({
      data: {
        name: 'Perth Nepalese Family Network',
        description: 'Dhukuti group for Nepalese families in Perth. Building strong family bonds and financial security.',
        contributionAmount: 800,
        maxMembers: 8,
        cycleDuration: 30,
        startDate: new Date(),
        status: 'ACTIVE',
        ownerId: users[4].id,
      },
    }),
  ]);

  console.log('🏘️ Groups created:', groups.length);

  console.log('👥 Adding group members...');

  // Add members to groups
  const groupMembers = await Promise.all([
    // Sydney Nepalese Community members
    prisma.groupMember.create({
      data: {
        userId: users[1].id,
        groupId: groups[0].id,
        role: 'OWNER',
        joinedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
        status: 'ACTIVE',
      },
    }),
    prisma.groupMember.create({
      data: {
        userId: users[2].id,
        groupId: groups[0].id,
        role: 'MEMBER',
        joinedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000), // 25 days ago
        status: 'ACTIVE',
      },
    }),
    prisma.groupMember.create({
      data: {
        userId: users[3].id,
        groupId: groups[0].id,
        role: 'MEMBER',
        joinedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000), // 20 days ago
        status: 'ACTIVE',
      },
    }),

    // Melbourne Nepalese Professionals members
    prisma.groupMember.create({
      data: {
        userId: users[2].id,
        groupId: groups[1].id,
        role: 'OWNER',
        joinedAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000), // 45 days ago
        status: 'ACTIVE',
      },
    }),
    prisma.groupMember.create({
      data: {
        userId: users[1].id,
        groupId: groups[1].id,
        role: 'MEMBER',
        joinedAt: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000), // 40 days ago
        status: 'ACTIVE',
      },
    }),

    // Brisbane Nepalese Students members
    prisma.groupMember.create({
      data: {
        userId: users[3].id,
        groupId: groups[2].id,
        role: 'OWNER',
        joinedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), // 60 days ago
        status: 'ACTIVE',
      },
    }),
    prisma.groupMember.create({
      data: {
        userId: users[4].id,
        groupId: groups[2].id,
        role: 'MEMBER',
        joinedAt: new Date(Date.now() - 55 * 24 * 60 * 60 * 1000), // 55 days ago
        status: 'ACTIVE',
      },
    }),

    // Perth Nepalese Family Network members
    prisma.groupMember.create({
      data: {
        userId: users[4].id,
        groupId: groups[3].id,
        role: 'OWNER',
        joinedAt: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000), // 75 days ago
        status: 'ACTIVE',
      },
    }),
    prisma.groupMember.create({
      data: {
        userId: users[5].id,
        groupId: groups[3].id,
        role: 'MEMBER',
        joinedAt: new Date(Date.now() - 70 * 24 * 60 * 60 * 1000), // 70 days ago
        status: 'ACTIVE',
      },
    }),
  ]);

  console.log('👥 Group members added:', groupMembers.length);

  console.log('💰 Creating contributions...');

  // Create sample contributions
  const contributions = await Promise.all([
    prisma.contribution.create({
      data: {
        userId: users[1].id,
        groupId: groups[0].id,
        amount: 1000,
        status: 'PAID',
        cycleNumber: 1,
        dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
        paidDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
        notes: 'Monthly contribution for Sydney Nepalese Community',
      },
    }),
    prisma.contribution.create({
      data: {
        userId: users[2].id,
        groupId: groups[0].id,
        amount: 1000,
        status: 'PAID',
        cycleNumber: 1,
        dueDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
        paidDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
        notes: 'Monthly contribution for Sydney Nepalese Community',
      },
    }),
    prisma.contribution.create({
      data: {
        userId: users[3].id,
        groupId: groups[0].id,
        amount: 1000,
        status: 'PAID',
        cycleNumber: 1,
        dueDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        paidDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        notes: 'Monthly contribution for Sydney Nepalese Community',
      },
    }),
    prisma.contribution.create({
      data: {
        userId: users[2].id,
        groupId: groups[1].id,
        amount: 1500,
        status: 'PAID',
        cycleNumber: 1,
        dueDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
        paidDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
        notes: 'Monthly contribution for Melbourne Nepalese Professionals',
      },
    }),
    prisma.contribution.create({
      data: {
        userId: users[3].id,
        groupId: groups[2].id,
        amount: 500,
        status: 'PAID',
        cycleNumber: 1,
        dueDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        paidDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        notes: 'Monthly contribution for Brisbane Nepalese Students',
      },
    }),
  ]);

  console.log('💰 Contributions created:', contributions.length);

  console.log('💸 Creating transactions...');

  // Create sample transactions (payouts)
  const transactions = await Promise.all([
    prisma.transaction.create({
      data: {
        userId: users[1].id,
        groupId: groups[0].id,
        amount: 8000,
        type: 'PAYOUT',
        status: 'COMPLETED',
        description: 'Monthly payout from Sydney Nepalese Community',
      },
    }),
    prisma.transaction.create({
      data: {
        userId: users[2].id,
        groupId: groups[1].id,
        amount: 9000,
        type: 'PAYOUT',
        status: 'COMPLETED',
        description: 'Monthly payout from Melbourne Nepalese Professionals',
      },
    }),
  ]);

  console.log('💸 Transactions created:', transactions.length);

  console.log('📝 Creating activities...');

  // Create sample activities
  const activities = await Promise.all([
    prisma.activity.create({
      data: {
        userId: users[1].id,
        groupId: groups[0].id,
        type: 'CONTRIBUTION_PAID',
        title: 'Ramesh Thapa paid contribution',
        description: 'Ramesh Thapa made a contribution of $1000 to Sydney Nepalese Community',
        metadata: { amount: 1000 },
      },
    }),
    prisma.activity.create({
      data: {
        userId: users[2].id,
        groupId: groups[0].id,
        type: 'CONTRIBUTION_PAID',
        title: 'Sita Gurung paid contribution',
        description: 'Sita Gurung made a contribution of $1000 to Sydney Nepalese Community',
        metadata: { amount: 1000 },
      },
    }),
    prisma.activity.create({
      data: {
        userId: users[3].id,
        groupId: groups[0].id,
        type: 'CONTRIBUTION_PAID',
        title: 'Bhupen Rai paid contribution',
        description: 'Bhupen Rai made a contribution of $1000 to Sydney Nepalese Community',
        metadata: { amount: 1000 },
      },
    }),
    prisma.activity.create({
      data: {
        userId: users[1].id,
        groupId: groups[0].id,
        type: 'PAYOUT_DISTRIBUTED',
        title: 'Ramesh Thapa received payout',
        description: 'Ramesh Thapa received a payout of $8000 from Sydney Nepalese Community',
        metadata: { amount: 8000 },
      },
    }),
  ]);

  console.log('📝 Activities created:', activities.length);

  console.log('💬 Creating messages...');

  // Create sample messages
  const messages = await Promise.all([
    prisma.message.create({
      data: {
        userId: users[1].id,
        groupId: groups[0].id,
        content: 'Namaste everyone! Just made my monthly contribution. Looking forward to our next meeting.',
        messageType: 'TEXT',
      },
    }),
    prisma.message.create({
      data: {
        userId: users[2].id,
        groupId: groups[0].id,
        content: 'Namaste! I\'ve also contributed. Great to see our Nepalese community growing stronger in Sydney.',
        messageType: 'TEXT',
      },
    }),
    prisma.message.create({
      data: {
        userId: users[3].id,
        groupId: groups[0].id,
        content: 'Namaste! Contribution done. Should we plan a cultural event for our community next month?',
        messageType: 'TEXT',
      },
    }),
    prisma.message.create({
      data: {
        userId: users[2].id,
        groupId: groups[1].id,
        content: 'Namaste professionals! Monthly contribution completed. Great networking opportunity at our last meetup.',
        messageType: 'TEXT',
      },
    }),
  ]);

  console.log('💬 Messages created:', messages.length);

  console.log('✅ Database seeding completed successfully!');
  console.log(`📊 Summary:`);
  console.log(`   👥 Users: ${users.length}`);
  console.log(`   🏘️ Groups: ${groups.length}`);
  console.log(`   👥 Group Members: ${groupMembers.length}`);
  console.log(`   💰 Contributions: ${contributions.length}`);
  console.log(`   💸 Transactions: ${transactions.length}`);
  console.log(`   📝 Activities: ${activities.length}`);
  console.log(`   💬 Messages: ${messages.length}`);
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 