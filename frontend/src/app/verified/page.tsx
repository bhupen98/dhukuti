export default function VerifiedPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-100 to-blue-200">
      <div className="bg-white/90 p-8 rounded-2xl shadow-2xl flex flex-col items-center max-w-md w-full">
        <span className="text-6xl mb-3">✅</span>
        <h1 className="text-2xl font-bold text-green-700 mb-2">Account Verified!</h1>
        <p className="text-gray-600 text-center mb-4">
          Your Dhukuti account has been verified.<br />
          You can now log in and start using the app.
        </p>
        <a href="/login" className="bg-green-600 text-white px-5 py-2 rounded-xl font-bold hover:bg-green-700 transition">
          Go to Login
        </a>
      </div>
    </main>
  );
}
