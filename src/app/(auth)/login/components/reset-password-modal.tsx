"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock } from "lucide-react";
import { OTPInput } from "./otp-input";

interface ResetPasswordModalProps {
  open: boolean;
  onClose: () => void;
}

type Step = "email" | "otp" | "new-password";

export function ResetPasswordModal({ open, onClose }: ResetPasswordModalProps) {
  const [step, setStep] = useState<Step>("email");

  useEffect(() => {
    if (open) {
      setStep("email");
    }
  }, [open]);

  const content = {
    email: {
      title: "Quên mật khẩu",
      description:
        "Vui lòng nhập tài khoản của bạn vào ô bên dưới chúng tôi sẽ gửi mã OTP về tài khoản Email của bạn",
      button: "Gửi mã OTP",
    },
    otp: {
      title: "Quên mật khẩu",
      description:
        "Chúng tôi đã gửi mã xác nhận về tài khoản Email của bạn. Vui lòng nhập mã số để xác thực đó là bạn.",
      button: "Xác nhận",
    },
    "new-password": {
      title: "Quên mật khẩu",
      description:
        "Bạn cần thay đổi mật khẩu mới. Hãy vui lòng nhập mật khẩu mới vào các ô bên dưới",
      button: "Xác nhận",
    },
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md h-[350px] flex flex-col">
        <DialogHeader className="ml-4 mr-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-[#E74C3C] text-xl">
              {content[step].title}
            </DialogTitle>
          </div>
          <p className="text-sm text-gray-500 pt-3">{content[step].description}</p>
        </DialogHeader>

        <div className="flex-1 flex flex-col justify-around ml-4 mr-4">
          <div className="space-y-4">
            {step === "email" && (
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input type="email" placeholder="Email" className="pl-10" />
              </div>
            )}
            {step === "otp" && (
              <OTPInput length={6} onComplete={(code) => console.log(code)} />
            )}
            {step === "new-password" && (
              <>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    type="password"
                    placeholder="Mật khẩu mới"
                    className="pl-10"
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    type="password"
                    placeholder="Xác nhận mật khẩu"
                    className="pl-10"
                  />
                </div>
              </>
            )}
          </div>

          <Button
            className="w-full bg-[#E74C3C] hover:bg-[#E74C3C]/90"
            onClick={() => {
              if (step === "email") setStep("otp");
              else if (step === "otp") setStep("new-password");
              else onClose();
            }}
          >
            {content[step].button}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
