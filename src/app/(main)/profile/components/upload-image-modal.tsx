import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import { Upload, X } from "lucide-react";

interface UploadImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  aspectRatio?: "square" | "cover";
}

export function UploadImageModal({
  isOpen,
  onClose,
  title,
  aspectRatio = "square",
}: UploadImageModalProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    // Handle upload logic here
    onClose();
    setPreview(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {preview ? (
            <div className="relative">
              <div
                className={`relative ${
                  aspectRatio === "cover" ? "h-48 w-full" : "w-40 h-40 mx-auto"
                }`}
              >
                <Image
                  src={preview}
                  alt="Preview"
                  fill
                  className={`object-cover ${
                    aspectRatio === "square" ? "rounded-full" : "rounded-lg"
                  }`}
                />
              </div>
              <button
                onClick={() => setPreview(null)}
                className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white hover:bg-black/70"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-gray-400">
              <Upload className="w-8 h-8 text-gray-400 mb-2" />
              <Label
                htmlFor="image-upload"
                className="cursor-pointer text-sm text-gray-600"
              >
                Click to upload or drag and drop
              </Label>
              <Input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          )}

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleUpload} disabled={!preview}>
              Upload
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
