import { X, Upload } from "lucide-react";
import { useState, useRef } from "react";

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

  // State cho số trang
  const [pageCount, setPageCount] = useState<string>("1");

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handlePageCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      setPageCount("");
    } else {
      const numValue = parseInt(value);
      if (numValue < 1) {
        setPageCount("1");
      } else {
        setPageCount(value);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-[480px] max-h-[90vh] flex flex-col shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b shrink-0">
          <h2 className="text-base font-medium">Thêm mới công văn đến</h2>
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
              />
              <button
                onClick={handleFileClick}
                className="flex items-center gap-2 px-3 py-1.5 border rounded-lg text-blue-600 hover:bg-blue-50 text-xs"
              >
                <Upload className="w-3.5 h-3.5" />
                Chọn file
              </button>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs mb-1">
                  Tên đơn vị <span className="text-red-500">*</span>
                </label>
                <select className="w-full border rounded-lg py-1 px-2 text-xs">
                  <option value="">Chọn đơn vị</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs mb-1">Phân loại</label>
                  <select className="w-full border rounded-lg py-1 px-2 text-xs">
                    <option value="">Chọn phân loại</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs mb-1">Nguồn</label>
                  <select className="w-full border rounded-lg py-1 px-2 text-xs">
                    <option value="">Chọn nguồn</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs mb-1">
                    Số văn bản <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded-lg py-1 px-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs mb-1">Ngày văn bản</label>
                  <div className="relative">
                    <input
                      type="date"
                      defaultValue={today}
                      className="w-full border rounded-lg py-1 px-2 text-xs"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs mb-1">Số trang</label>
                  <input
                    type="number"
                    min="1"
                    value={pageCount}
                    onChange={handlePageCountChange}
                    className="w-full border rounded-lg py-1 px-2 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs mb-1">
                  Mã tài ngôn gọn công văn{" "}
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
                    <option value="">Chọn người phụ trách</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs mb-1">Hình thức gửi</label>
                  <select className="w-full border rounded-lg py-1 px-2 text-xs">
                    <option value="">Chọn hình thức</option>
                  </select>
                </div>
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
                <div>
                  <label className="block text-xs mb-1">
                    Ngày hết hạn phản hồi
                  </label>
                  <div className="relative">
                    <input
                      type="date"
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
