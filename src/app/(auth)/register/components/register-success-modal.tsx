import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Facebook, Phone } from "lucide-react";
import Link from "next/link";

interface RegisterSuccessModalProps {
  open: boolean;
  onClose: () => void;
}

export function RegisterSuccessModal({
  open,
  onClose,
}: RegisterSuccessModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center flex flex-col items-center gap-4">
            <CheckCircle2 className="w-16 h-16 text-green-500" />
            <span>Đăng ký thành công!</span>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 text-center">
          <p className="text-gray-600">
            Hãy chờ để quản trị viên phê duyệt tài khoản của bạn.
          </p>
          <p className="text-gray-600">Mọi thắc mắc xin liên hệ:</p>
          <div className="flex justify-center gap-4">
            <Button variant="outline" asChild>
              <Link
                href="https://www.facebook.com/kienk4.me/"
                target="_blank"
                className="flex items-center gap-2"
              >
                <Facebook className="w-4 h-4" />
                Facebook
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="tel:0945454086" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                0945454086
              </Link>
            </Button>
          </div>
          <div className="pt-4">
            <Button onClick={onClose} className="w-full bg-[#E74C3C] hover:bg-[#E74C3C]/90">
              Đã hiểu
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
