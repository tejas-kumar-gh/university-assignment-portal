import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setError("");
    setMessage("");

    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Invalid credentials");
        return;
      }

      setMessage(data.message);
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("name", data.user.name);

      const routes = {
        student: "/student-dashboard",
        professor: "/professor-dashboard",
        hod: "/hod-dashboard",
        admin: "/admin-dashboard",
      };

      navigate(routes[data.user.role]);
    } catch (err) {
      console.log(err);
      setError("Server error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Header with University Colors */}
        <div className="bg-[#003366] text-white p-6 text-center">
          <h1 className="text-2xl font-bold">University Portal</h1>
          <p className="text-blue-200 mt-2">Secure Login Access</p>
        </div>

        <div className="p-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">Welcome Back</h2>
          <p className="text-gray-600 text-center mb-8">Sign in to your account</p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-center font-medium">{error}</p>
            </div>
          )}

          {message && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-700 text-center font-medium">{message}</p>
            </div>
          )}

          <div className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003366] focus:border-transparent"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003366] focus:border-transparent"
            />


            <button
              onClick={handleSubmit}
              className="w-full bg-[#003366] hover:bg-[#002244] text-white py-3 rounded-lg font-semibold transition duration-200 transform hover:scale-105"
            >
              Login to Portal
            </button>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Need help?{" "}
                <Link 
              to="/contact" 
              className="text-[#003366] hover:text-[#002244] font-medium"
            >
              Contact Support
            </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

