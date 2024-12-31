import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  const [dragActive, setDragActive] = useState(false);

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
    // TODO: Handle upload logic here
    onClose();
    setPreview(null);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {preview ? (
            <div className="relative h-48 w-full">
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
            <label
              htmlFor="image-upload"
              className={`h-48 w-full flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer transition-colors
                ${
                  dragActive
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="w-8 h-8 text-gray-400 mb-2" />
              <span className="text-sm text-gray-600">
                Nhấn để tải lên hoặc kéo và thả
              </span>
              <Input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          )}

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>
              Hủy
            </Button>
            <Button onClick={handleUpload} disabled={!preview}>
              Tải lên
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
