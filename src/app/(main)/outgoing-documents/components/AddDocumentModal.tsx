import { X, Upload, FileText } from "lucide-react";
import { useState, useRef } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";

interface AddDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddDocumentModal({
  isOpen,
  onClose,
}: AddDocumentModalProps) {
  // Lấy ngày hôm nay định dạng YYYY-MM-DD
  const today = new Date().toISOString().split("T")[0];

  // Ref cho input file
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase();
    switch (extension) {
      case "pdf":
        return (
          <Image src="/images/icon/pdf.png" alt="PDF" width={32} height={32} />
        );
      case "doc":
      case "docx":
        return (
          <Image src="/images/icon/word.png" alt="DOC" width={32} height={32} />
        );
      default:
        return <FileText className="w-8 h-8 text-gray-500" />;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-[480px] max-h-[90vh] flex flex-col shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b shrink-0">
          <h2 className="text-base font-medium">Thêm mới công văn đi</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-4 overflow-y-auto">
          <div className="space-y-4">
            {/* File Upload */}
            <div>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
              />
              <div className="space-y-2">
                {!selectedFile && (
                  <button
                    onClick={handleFileClick}
                    className="flex items-center gap-2 px-3 py-1.5 border rounded-lg text-blue-600 hover:bg-blue-50 text-xs"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    Chọn file
                  </button>
                )}

                {/* Show selected file info */}
                {selectedFile && (
                  <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                    {getFileIcon(selectedFile.name)}
                    <div className="flex-1 text-xs">
                      <p className="font-medium truncate">
                        {selectedFile.name}
                      </p>
                      <p className="text-gray-500">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedFile(null)}
                      className="p-1 hover:bg-gray-200 rounded-full"
                    >
                      <X className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs mb-1">
                  Tên đơn vị nhận<span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  className="w-full rounded-lg text-xs"
                  placeholder="Nhập tên đơn vị nhận"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs mb-1">
                    Số văn bản <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    className="w-full rounded-lg text-xs"
                    placeholder="Nhập số văn bản"
                  />
                </div>
                <div>
                  <label className="block text-xs mb-1">Ngày văn bản</label>
                  <div className="relative">
                    <input
                      type="date"
                      defaultValue={today}
                      className="w-full border rounded-lg py-2.5 px-2 text-xs"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs mb-1">
                  Mô tả ngắn gọn công văn{" "}
                  <span className="text-red-500">*</span>
                </label>
                <textarea className="w-full border rounded-lg p-2 h-20" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs mb-1">Mức độ khẩn cấp</label>
                  <select className="w-full border rounded-lg py-1 px-2 text-xs">
                    <option value="">Chọn mức độ</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs mb-1">Mức độ bảo mật</label>
                  <select className="w-full border rounded-lg py-1 px-2 text-xs">
                    <option value="">Chọn mức độ</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs mb-1">Phòng ban</label>
                  <select className="w-full border rounded-lg py-1 px-2 text-xs">
                    <option value="">Chọn phòng ban</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs mb-1">
                    Người chịu trách nhiệm
                  </label>
                  <select className="w-full border rounded-lg py-1 px-2 text-xs">
                    <option value="">Chọn gửi</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-xs mb-1">Ngày nhận/gửi</label>
                  <div className="relative">
                    <input
                      type="date"
                      defaultValue={today}
                      className="w-full border rounded-lg py-1 px-2 text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 p-4 border-t shrink-0">
          <button
            onClick={onClose}
            className="px-3 py-1 border rounded-lg hover:bg-gray-50 text-xs"
          >
            Hủy
          </button>
          <button className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-xs">
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}
