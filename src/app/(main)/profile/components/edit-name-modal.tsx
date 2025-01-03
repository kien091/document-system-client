import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface EditNameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EditNameModal({ isOpen, onClose }: EditNameModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa thông tin cá nhân</DialogTitle>
        </DialogHeader>
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="username">Tên đăng nhập</Label>
              <Input
                id="username"
                defaultValue="kien"
                placeholder="Nhập tên đăng nhập"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fullName">Họ và tên</Label>
              <Input
                id="fullName"
                defaultValue="Nguyễn Trung Kiên"
                placeholder="Nhập họ và tên"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" type="button" onClick={onClose}>
              Hủy
            </Button>
            <Button type="submit" className="bg-[#dc2626] hover:bg-[#dc2626]/80">Lưu thay đổi</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
