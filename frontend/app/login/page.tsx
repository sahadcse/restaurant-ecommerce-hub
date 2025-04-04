"use client";

import { useState } from "react";
import { useAuth } from "../../lib/authContext";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      interface LoginResponse {
        token: string;
      }

      const response = await axios.post<LoginResponse>(
        "http://192.168.1.103:3001/auth/login",
        {
          email,
          password,
        }
      );
      login(response.data.token);
      router.push("/");
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="bg-gray-100 p-6 rounded-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-black mb-6">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-black mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>
          <div>
            <label className="block text-black mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full bg-primary text-white px-4 py-2 rounded hover:bg-teal-700 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
