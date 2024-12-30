"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResetPasswordModal } from "./reset-password-modal";
import { User, Lock } from "lucide-react";
import Link from "next/link";

export function LoginForm() {
  const [showResetModal, setShowResetModal] = useState(false);

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-[#E74C3C] italic font-inriaSans">
          Xin chào!
        </h1>
      </div>
      <form className="space-y-6">
        <div className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input type="text" placeholder="Tài khoản" className="pl-10" />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input type="password" placeholder="Mật khẩu" className="pl-10" />
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
            <Link href="/register">
              Đăng ký
            </Link>
          </Button>
        </div>
      </form>
      <ResetPasswordModal
        open={showResetModal}
        onClose={() => setShowResetModal(false)}
      />
    </div>
  );
}
