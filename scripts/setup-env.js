const fs = require('fs');
const path = require('path');

console.log('🔧 Setting up environment variables for Dhukuti Firebase...');

const envContent = `# Firebase Configuration
# Get these values from your Firebase Console > Project Settings > General > Your Apps > Web App
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=dhukuti-cloud-sync.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=dhukuti-cloud-sync
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=dhukuti-cloud-sync.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id_here

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Dhukuti

# Legacy Configuration (No longer needed with Firebase)
# NEXTAUTH_SECRET=your-secret-key-here
# NEXTAUTH_URL=http://localhost:3000
`;

const envPath = path.join(__dirname, '.env.local');

try {
  if (fs.existsSync(envPath)) {
    console.log('⚠️  .env.local file already exists. Skipping creation.');
    console.log('📝 Please update your .env.local with Firebase configuration from env.example');
  } else {
    fs.writeFileSync(envPath, envContent);
    console.log('✅ .env.local file created successfully!');
  }
  
  console.log('\n📋 Next steps:');
  console.log('1. Go to Firebase Console: https://console.firebase.google.com/');
  console.log('2. Select project: dhukuti-cloud-sync');
  console.log('3. Go to Project Settings > General > Your Apps');
  console.log('4. Create a Web App if you haven\'t already');
  console.log('5. Copy the Firebase config values to .env.local');
  console.log('6. Replace "your_api_key_here" etc. with actual values');
  
} catch (error) {
  console.error('❌ Error creating .env.local:', error.message);
} 