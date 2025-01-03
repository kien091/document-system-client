"use client";

import { useState, useEffect } from "react";
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
import { authService } from "@/services/auth.service";
import { Loading } from "@/components/ui/loading";
import { ResetPasswordSuccessModal } from "@/app/(auth)/login/components/reset-password-success-modal";

interface ResetPasswordModalProps {
  open: boolean;
  onClose: () => void;
}

type Step = "email" | "otp" | "new-password";

export function ResetPasswordModal({ open, onClose }: ResetPasswordModalProps) {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(300); // 5 phút
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (open) {
      setStep("email");
      setEmail("");
      setOtp("");
      setError("");
      setResetToken("");
      setNewPassword("");
      setConfirmPassword("");
      setCountdown(300);
    }
  }, [open]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === "otp" && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step, countdown]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleSendOTP = async () => {
    try {
      setLoading(true);
      setError("");
      await authService.sendOTP({ to: email });
      setStep("otp");
      setCountdown(300);
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      setError(err.response?.data?.message || "Gửi OTP thất bại");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await authService.verifyOTP({ email, otp });
      setResetToken(response.data.resetToken);
      setStep("new-password");
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      setError(err.response?.data?.message || "Mã OTP không chính xác");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await authService.resetPassword({
        email,
        resetToken,
        newPassword,
        confirmPassword,
      });
      setShowSuccess(true);
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      setError(err.response?.data?.message || "Đổi mật khẩu thất bại");
    } finally {
      setLoading(false);
    }
  };

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
    <>
      <Dialog open={open && !showSuccess} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md h-[350px] flex flex-col">
          {loading && <Loading />}
          <DialogHeader className="ml-4 mr-4">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-[#E74C3C] text-xl">
                {content[step].title}
              </DialogTitle>
            </div>
            <p className="text-sm text-gray-500 pt-3">
              {content[step].description}
            </p>
          </DialogHeader>

          {error && (
            <div className="mx-4 bg-red-50 text-red-500 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="flex-1 flex flex-col justify-around ml-4 mr-4">
            <div className="space-y-4">
              {step === "email" && (
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="Email"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              )}
              {step === "otp" && (
                <>
                  <OTPInput length={6} onComplete={(code) => setOtp(code)} />
                  <div className="flex justify-between items-center text-sm">
                    <p className="text-gray-500">
                      Mã sẽ hết hạn sau:{" "}
                      <span className="text-[#E74C3C]">
                        {formatTime(countdown)}
                      </span>
                    </p>
                    {countdown === 0 && (
                      <Button
                        variant="link"
                        className="text-[#E74C3C] p-0"
                        onClick={handleSendOTP}
                      >
                        Gửi lại mã
                      </Button>
                    )}
                  </div>
                </>
              )}
              {step === "new-password" && (
                <>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      type="password"
                      placeholder="Mật khẩu mới"
                      className="pl-10"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      type="password"
                      placeholder="Xác nhận mật khẩu"
                      className="pl-10"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </>
              )}
            </div>
            <Button
              onClick={
                step === "email"
                  ? handleSendOTP
                  : step === "otp"
                  ? handleVerifyOTP
                  : handleResetPassword
              }
              className="w-full bg-[#E74C3C] hover:bg-[#E74C3C]/90"
              disabled={step === "otp" && countdown === 0}
            >
              {content[step].button}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <ResetPasswordSuccessModal
        open={showSuccess}
        onClose={() => {
          setShowSuccess(false);
          onClose();
        }}
      />
    </>
  );
}
