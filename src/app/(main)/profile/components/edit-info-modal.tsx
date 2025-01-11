import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useUser } from "@/contexts/user.context";
import { UserProfile } from "@/types/user";
import { useState } from "react";

interface EditInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  profile: UserProfile | null;
}

export function EditInfoModal({
  isOpen,
  onClose,
  title,
  profile,
}: EditInfoModalProps) {
  const { updateProfile } = useUser();
  const [email, setEmail] = useState(profile?.email || "");
  const [phone, setPhone] = useState(profile?.phone || "");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!profile) return;
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("phone", phone);
      profile.email = email;
      profile.phone = phone;
      await updateProfile(profile?.userId, formData);
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div key={profile?.email} className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={email ?? ""}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div key={profile?.phone} className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={phone ?? ""}
              placeholder="Phone"
              onChange={(e) => setPhone(e.target.value)}
            />
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
