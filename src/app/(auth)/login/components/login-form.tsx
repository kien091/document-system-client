"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResetPasswordModal } from "./reset-password-modal";
import { User, Lock } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/auth.context";
import { Loading } from "@/components/ui/loading";

export function LoginForm() {
  const { login } = useAuth();
  const [showResetModal, setShowResetModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      await login({ username, password });
    } catch (error) {
      const err = error as { message: string };
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loading />}
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-[#E74C3C] italic font-inriaSans">
            Xin chào!
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
                placeholder="Tài khoản"
                className="pl-10"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="password"
                placeholder="Mật khẩu"
                className="pl-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              type="button"
              variant="link"
              className="text-[#1a73e8] hover:text-[#1a73e8]/90 p-0"
              onClick={() => setShowResetModal(true)}
            >
              Quên mật khẩu?
            </Button>
          </div>
          <div className="flex flex-row gap-4">
            <Button
              type="submit"
              className="w-1/2 bg-[#E74C3C] hover:bg-[#E74C3C]/90 rounded-2xl"
            >
              Đăng nhập
            </Button>
            <Button
              type="button"
              variant="secondary"
              className="w-1/2 bg-[#d0d7d7] hover:bg-[#d0d7d7]/90 rounded-2xl"
              asChild
            >
              <Link href="/register">Đăng ký</Link>
            </Button>
          </div>
        </form>

        <ResetPasswordModal
          open={showResetModal}
          onClose={() => setShowResetModal(false)}
        />
      </div>
    </>
  );
}
