import { useState } from "react";
import {
  FaBuilding,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

const RecruiterAuth = () => {
  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const isRegister = mode === "register";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-white px-4">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-xl transition-all duration-300">
        <h2 className="text-4xl font-extrabold text-center text-green-700 mb-2">
          {isRegister ? "Join JobSphere" : "Recruiter Login"}
        </h2>
        <p className="text-center text-gray-600 mb-8 text-sm">
          {isRegister
            ? "Create your recruiter account and post jobs effortlessly."
            : "Welcome back! Login to manage your job postings."}
        </p>

        <form className="space-y-6">
          {/* Company Name - only for Register */}
          {isRegister && (
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Name
              </label>
              <div className="relative">
                <FaBuilding className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="e.g. Google"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          )}

          {/* Email */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
              <input
                type="email"
                placeholder="example@company.com"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute top-3 left-3 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-3 right-3 text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Confirm Password - only for Register */}
          {isRegister && (
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <FaLock className="absolute top-3 left-3 text-gray-400" />
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Re-enter password"
                  className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((prev) => !prev)}
                  className="absolute top-3 right-3 text-gray-500"
                >
                  {showConfirm ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold shadow-md transition-all"
          >
            {isRegister ? "Create Account" : "Login"}
          </button>
        </form>

        {/* Switch link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => setMode(isRegister ? "login" : "register")}
            className="text-green-600 font-semibold hover:underline"
          >
            {isRegister ? "Login" : "Register"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default RecruiterAuth;
