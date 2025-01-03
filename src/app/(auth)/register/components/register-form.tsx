"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Mail, Lock } from "lucide-react";
import { useAuth } from "@/contexts/auth.context";
import { Loading } from "@/components/ui/loading";
import { RegisterSuccessModal } from "@/app/(auth)/register/components/register-success-modal";

export function RegisterForm() {
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    fullName: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }
    try {
      setLoading(true);
      setError("");
      await register(formData);
      setShowSuccess(true);
    } catch (error) {
      const err = error as { message: string };
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      {loading && <Loading />}
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-[#E74C3C] italic font-inria-sans">
            Đăng ký
          </h1>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                name="username"
                placeholder="Tên đăng nhập"
                className="pl-10"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                name="fullName"
                placeholder="Họ và tên"
                className="pl-10"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="email"
                name="email"
                placeholder="Email"
                className="pl-10"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="password"
                name="password"
                placeholder="Mật khẩu"
                className="pl-10"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Xác nhận mật khẩu"
                className="pl-10"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#E74C3C] hover:bg-[#E74C3C]/90"
          >
            Đăng ký
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Hoặc</span>
            </div>
          </div>

          <Button type="button" variant="secondary" className="w-full" asChild>
            <Link href="/login">Đăng nhập</Link>
          </Button>
        </form>

        <RegisterSuccessModal
          open={showSuccess}
          onClose={() => setShowSuccess(false)}
        />
      </div>
    </>
  );
}
