export default function TestLayoutPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin Layout Test</h1>
      <p>If you see a red banner at the top saying "ADMIN LAYOUT ACTIVE - NO NAVBAR", then the admin layout is working.</p>
      <p>If you see the main navigation bar, then the main layout is being used instead.</p>
      <div className="mt-4 p-4 bg-blue-100 rounded">
        <h2 className="font-semibold">Expected Behavior:</h2>
        <ul className="list-disc list-inside mt-2">
          <li>Red banner at top</li>
          <li>Yellow background</li>
          <li>No navigation bar</li>
        </ul>
      </div>
    </div>
  );
} 