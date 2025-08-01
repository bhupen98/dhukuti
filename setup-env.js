const fs = require('fs');
const path = require('path');

console.log('🔧 Setting up environment variables for Dhukuti...');

const envContent = `# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/dhukuti"

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-change-this-in-production"



# App Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="Dhukuti"
`;

const envPath = path.join(__dirname, '.env');

try {
  if (fs.existsSync(envPath)) {
    console.log('⚠️  .env file already exists. Skipping creation.');
  } else {
    fs.writeFileSync(envPath, envContent);
    console.log('✅ .env file created successfully!');
  }
  
  console.log('\n📋 Next steps:');
  console.log('1. Update the DATABASE_URL in .env with your actual database credentials');
  console.log('2. Update NEXTAUTH_SECRET with a secure random string');
  console.log('3. Run: npm run db:push');
  console.log('4. Run: npm run db:seed');
  console.log('5. Run: npm run dev');
  console.log('\n🔑 Test login credentials:');
  console.log('   Email: ramesh.thapa@email.com');
  console.log('   Password: password123');
  console.log('   Email: sita.gurung@email.com');
  console.log('   Password: password123');
  
} catch (error) {
  console.error('❌ Error creating .env file:', error.message);
} 