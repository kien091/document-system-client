"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Mail, Lock } from "lucide-react";

export function RegisterForm() {
  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-[#E74C3C] italic font-inria-sans">
          Đăng ký
        </h1>
      </div>
      <form className="space-y-6">
        <div className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input type="text" placeholder="Tên người dùng" className="pl-10" />
          </div>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input type="email" placeholder="Email" className="pl-10" />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input type="password" placeholder="Mật khẩu" className="pl-10" />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              type="password"
              placeholder="Xác nhận mật khẩu"
              className="pl-10"
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
    </div>
  );
}
