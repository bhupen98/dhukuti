"use client";

export default function TestEnvPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Environment Variables Test</h1>
      <div className="space-y-2">
        <p><strong>API Key:</strong> {process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'NOT FOUND'}</p>
        <p><strong>Auth Domain:</strong> {process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'NOT FOUND'}</p>
        <p><strong>Project ID:</strong> {process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'NOT FOUND'}</p>
        <p><strong>Storage Bucket:</strong> {process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'NOT FOUND'}</p>
        <p><strong>Messaging Sender ID:</strong> {process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || 'NOT FOUND'}</p>
        <p><strong>App ID:</strong> {process.env.NEXT_PUBLIC_FIREBASE_APP_ID || 'NOT FOUND'}</p>
        <p><strong>Measurement ID:</strong> {process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || 'NOT FOUND'}</p>
      </div>
    </div>
  );
}
