import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface ResetPasswordSuccessModalProps {
  open: boolean;
  onClose: () => void;
}

export function ResetPasswordSuccessModal({
  open,
  onClose,
}: ResetPasswordSuccessModalProps) {
  const router = useRouter();

  const handleBackToLogin = () => {
    onClose();
    router.push("/login");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center flex flex-col items-center gap-4">
            <CheckCircle2 className="w-16 h-16 text-green-500" />
            <span>Đổi mật khẩu thành công!</span>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 text-center">
          <p className="text-gray-600">
            Mật khẩu của bạn đã được thay đổi thành công. Vui lòng đăng nhập lại
            với mật khẩu mới.
          </p>
          <div className="pt-4">
            <Button
              onClick={handleBackToLogin}
              className="w-full bg-[#E74C3C] hover:bg-[#E74C3C]/90"
            >
              Đăng nhập
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
