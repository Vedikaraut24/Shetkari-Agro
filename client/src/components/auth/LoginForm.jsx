import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../../services/authService";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const result = await login(data);

      localStorage.setItem("token", result.token);
      localStorage.setItem("admin", JSON.stringify(result.admin));

      toast.success(`Welcome ${result.admin.name} 👋`);

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Username */}
      <div>
        <label className="block mb-2 font-semibold text-gray-700">
          Username
        </label>

        <input
          {...register("username", {
            required: "Username is required",
          })}
          type="text"
          placeholder="Enter Username"
          className="w-full rounded-xl border border-gray-300 p-3 focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
        />

        {errors.username && (
          <p className="mt-1 text-sm text-red-500">
            {errors.username.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div>
        <label className="block mb-2 font-semibold text-gray-700">
          Password
        </label>

        <div className="relative">
          <input
            {...register("password", {
              required: "Password is required",
            })}
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            className="w-full rounded-xl border border-gray-300 p-3 pr-12 focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-700"
          >
            <i
              className={`bi ${
                showPassword ? "bi-eye-slash-fill" : "bi-eye-fill"
              } fs-5`}
            ></i>
          </button>
        </div>

        {errors.password && (
          <p className="mt-1 text-sm text-red-500">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Login Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-gradient-to-r from-green-700 to-yellow-500 py-3 font-semibold text-white shadow-lg transition hover:scale-105 disabled:opacity-70"
      >
        <i className="bi bi-box-arrow-in-right me-2"></i>

        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}