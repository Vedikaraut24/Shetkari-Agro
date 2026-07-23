import LoginForm from "../components/auth/LoginForm";

export default function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-700 to-green-500 flex items-center justify-center px-4">

      {/* Login Card */}
      <div className="w-full max-w-md rounded-3xl bg-white/90 backdrop-blur-xl shadow-2xl p-8">

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">

          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-green-700 to-yellow-400 flex items-center justify-center shadow-lg text-5xl">
            🌾
          </div>

          <h1 className="mt-4 text-3xl font-bold text-green-800">
            शेतकरी अॅग्रो
          </h1>

          <p className="text-gray-500 text-center mt-2">
            Agricultural Inventory Management System
          </p>

        </div>

        <LoginForm />

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          © 2026 Shetkari Agro
        </div>

      </div>

    </div>
  );
}