export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="text-blue-700 font-bold text-xl">Dhukuti</div>
          <div className="flex space-x-4">
            <a href="/about" className="text-gray-700 hover:text-blue-700">About</a>
            <a href="/signup" className="text-gray-700 hover:text-blue-700">Sign Up</a>
            <a href="/login" className="text-blue-700 font-semibold hover:underline">Log In</a>
          </div>
        </div>
      </div>
    </nav>
  );
}
