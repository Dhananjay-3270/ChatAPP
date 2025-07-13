import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "../components/ThemeToggle";
import { AuthService } from "../services/AuthService";
import { StatusCode } from "../../core/utils/enum";
export const Login: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await AuthService.login(formData);
      if (response.status === StatusCode.OK) {
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 relative">
      {/* Theme Toggle Button */}
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      <div className="min-h-screen flex">
        {/* Left side - Login Form */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full">
            <form
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl flex flex-col gap-5"
              onSubmit={handleSubmit}
            >
              <h2 className="text-3xl font-bold mb-2 text-center text-blue-700 dark:text-blue-400">
                Welcome Back
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
                Sign in to your account
              </p>

              <input
                type="email"
                name="email"
                placeholder="Email"
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg px-4 py-2 font-semibold transition-colors"
              >
                Sign In
              </button>

              <div className="text-center">
                <span className="text-gray-600 dark:text-gray-400">
                  New to our platform?{" "}
                  <Link
                    to="/register"
                    className="text-blue-600 dark:text-blue-400 font-semibold hover:underline transition-colors"
                  >
                    Create an account
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>

        {/* Right side - Welcome Message */}
        <div className="hidden lg:flex flex-1 items-center justify-center bg-blue-600 dark:bg-blue-800 text-white">
          <div className="max-w-md text-center px-8">
            <h1 className="text-4xl font-bold mb-6">Welcome to ChatApp</h1>
            <p className="text-xl mb-8 text-blue-100">
              Connect with friends, share moments, and stay in touch with the
              people who matter most.
            </p>
            <div className="space-y-4 text-blue-100">
              <div className="flex items-center justify-center space-x-3">
                <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                <span>Real-time messaging</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                <span>Secure conversations</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                <span>Cross-platform support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
