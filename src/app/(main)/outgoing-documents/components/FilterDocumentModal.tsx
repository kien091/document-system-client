import { X } from "lucide-react";

interface FilterDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FilterDocumentModal({
  isOpen,
  onClose,
}: FilterDocumentModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-lg w-full max-w-[420px] flex flex-col shadow-lg animate-slideDown">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-medium">Lọc công văn</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Trạng thái</label>
            <select className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-blue-500">
              <option value="">Tất cả trạng thái</option>
              <option>Chờ phê duyệt</option>
              <option>Đã phê duyệt</option>
              <option>Từ chối</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Nơi nhận</label>
            <select className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-blue-500">
              <option value="">Tất cả nơi nhận</option>
              <option>Phòng Đại học</option>
              <option>Phòng Đào tạo</option>
              <option>Phòng Hành chính</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Mức độ khẩn cấp
            </label>
            <select className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-blue-500">
              <option value="">Tất cả mức độ</option>
              <option>Bình thường</option>
              <option>Khẩn</option>
              <option>Hỏa tốc</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Thời gian</label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="date"
                className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-blue-500"
              />
              <input
                type="date"
                className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 p-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            Hủy
          </button>
          <button className="px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-lg">
            Áp dụng
          </button>
        </div>
      </div>
    </div>
  );
}
