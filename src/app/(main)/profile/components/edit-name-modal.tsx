"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { UserProfile } from "@/types/user";
import { useUser } from "@/contexts/user.context";
import { useState, useEffect } from "react";

interface EditNameModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile | null;
}

export function EditNameModal({ isOpen, onClose, profile }: EditNameModalProps) {
  const [username, setUsername] = useState(profile?.username);
  const [fullName, setFullName] = useState(profile?.fullName);
  const { updateProfile } = useUser();

  useEffect(() => {
    setUsername(profile?.username);
    setFullName(profile?.fullName);
  }, [profile]);

  const handleUpdateProfile = async () => {
    console.log("Kien", username, fullName);
    if (!profile || !username || !fullName) return;
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("fullName", fullName);
      await updateProfile(profile.userId, formData);
      onClose();
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      console.error("Upload error:", err.response?.data || error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa thông tin cá nhân</DialogTitle>
          <DialogDescription>
            Chỉnh sửa thông tin cá nhân của bạn
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="username">Tên đăng nhập</Label>
              <Input
                id="username"
                defaultValue={username}
                placeholder="Nhập tên đăng nhập"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fullName">Họ và tên</Label>
              <Input
                id="fullName"
                defaultValue={fullName}
                placeholder="Nhập họ và tên"
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" type="button" onClick={onClose}>
              Hủy
            </Button>
            <Button type="submit" className="bg-[#dc2626] hover:bg-[#dc2626]/80" onClick={handleUpdateProfile}>Lưu thay đổi</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
