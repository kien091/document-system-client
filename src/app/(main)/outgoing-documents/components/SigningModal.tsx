import { CalendarIcon, Captions, SignatureIcon, StampIcon, TextIcon, X } from "lucide-react";
import { useState } from "react";

interface SigningModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileUrl: string;
}

export default function SigningModal({
  isOpen,
  onClose,
  fileUrl,
}: SigningModalProps) {
  const [selectedUser, setSelectedUser] = useState("");
  const [loading, setLoading] = useState(true);

  if (!isOpen) return null;

  // Xác định loại file từ đuôi file
  const fileType = fileUrl.split(".").pop()?.toLowerCase();

  const renderPreview = () => {
    switch (fileType) {
      case "pdf":
        return (
          <iframe
            src={`${fileUrl}#toolbar=0`}
            className="w-full h-full rounded-lg"
            onLoad={() => setLoading(false)}
          />
        );
      case "doc":
      case "docx":
        // Đảm bảo URL là URL đầy đủ
        const fullUrl = fileUrl.startsWith("http")
          ? fileUrl
          : `${window.location.origin}${fileUrl}`;

        return (
          <iframe
            src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
              fullUrl
            )}`}
            className="w-full h-full rounded-lg"
            onLoad={() => setLoading(false)}
            frameBorder="0"
            allowFullScreen
          />
        );
      default:
        return (
          <div className="text-center p-4">
            Không hỗ trợ xem trước định dạng file này
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-[1200px] h-[90vh] flex flex-col shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-base font-medium">Trình ký văn bản</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex min-h-0">
          {/* Document Preview */}
          <div className="flex-1 border-r p-4 overflow-auto">
            <div className="bg-gray-100 rounded-lg h-full relative">
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-blue-600" />
                </div>
              )}
              {renderPreview()}
            </div>
          </div>

          {/* Signing Options */}
          <div className="w-80 p-4 flex flex-col">
            <div className="space-y-4">
              {/* User Selection */}
              <div>
                <label className="block text-xs mb-1">
                  Chọn người ký cần thiết lập
                </label>
                <select
                  className="w-full border rounded-lg py-2 px-3 text-sm"
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                >
                  <option value="">Chọn người ký</option>
                  <option value="user1">Nguyễn Văn A - Giám đốc</option>
                  <option value="user2">Trần Thị B - Phó giám đốc</option>
                </select>
              </div>

              {/* Signing Tools */}
              <div className="grid grid-cols-2 gap-4">
                <button className="flex flex-col items-center gap-2 p-3 border rounded-lg hover:bg-gray-50">
                  <SignatureIcon className="w-5 h-5 flex-shrink-0" />
                  <span className="text-xs">Chữ ký chính</span>
                </button>
                <button className="flex flex-col items-center gap-2 p-3 border rounded-lg hover:bg-gray-50">
                  <StampIcon className="w-5 h-5 flex-shrink-0" />
                  <span className="text-xs">Con dấu</span>
                </button>
                <button className="flex flex-col items-center gap-2 p-3 border rounded-lg hover:bg-gray-50">
                  <TextIcon className="w-5 h-5 flex-shrink-0" />
                  <span className="text-xs">Điền đầy đủ</span>
                </button>
                <button className="flex flex-col items-center gap-2 p-3 border rounded-lg hover:bg-gray-50">
                  <Captions  className="w-5 h-5 flex-shrink-0" />
                  <span className="text-xs">Chức danh</span>
                </button>
                <button className="flex flex-col items-center gap-2 p-3 border rounded-lg hover:bg-gray-50">
                  <CalendarIcon className="w-5 h-5 flex-shrink-0" />
                  <span className="text-xs">Ngày giờ</span>
                </button>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="mt-auto pt-4 flex justify-end gap-2">
              <button
                onClick={onClose}
                className="px-3 py-1.5 border rounded-lg hover:bg-gray-50 text-xs"
              >
                Hủy
              </button>
              <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-xs">
                Gửi duyệt
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
