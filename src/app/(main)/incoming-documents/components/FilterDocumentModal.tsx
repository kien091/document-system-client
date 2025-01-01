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
    <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-[420px] flex flex-col shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center p-3 border-b shrink-0">
          <h2 className="text-base font-medium">Lọc công văn</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Filter Content */}
        <div className="p-4 overflow-y-auto">
          <div className="space-y-4">
            <div>
              <label className="block text-xs mb-1">Phòng ban</label>
              <select className="w-full border rounded-lg py-1 px-2 text-xs">
                <option value="">Tất cả phòng ban</option>
                <option value="daihoc">Phòng Đại học</option>
                <option value="daotao">Phòng Đào tạo</option>
              </select>
            </div>

            <div>
              <label className="block text-xs mb-1">Trạng thái</label>
              <select className="w-full border rounded-lg py-1 px-2 text-xs">
                <option value="">Tất cả trạng thái</option>
                <option value="new">Mới</option>
                <option value="processing">Đang xử lý</option>
                <option value="completed">Đã hoàn thành</option>
              </select>
            </div>

            <div>
              <label className="block text-xs mb-1">Mức độ khẩn cấp</label>
              <select className="w-full border rounded-lg py-1 px-2 text-xs">
                <option value="">Tất cả mức độ</option>
                <option value="normal">Bình thường</option>
                <option value="urgent">Khẩn</option>
                <option value="emergency">Hỏa tốc</option>
              </select>
            </div>

            <div>
              <label className="block text-xs mb-1">Thời gian</label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <input
                    type="date"
                    className="w-full border rounded-lg py-1 px-2 text-xs"
                    placeholder="Từ ngày"
                  />
                </div>
                <div>
                  <input
                    type="date"
                    className="w-full border rounded-lg py-1 px-2 text-xs"
                    placeholder="Đến ngày"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 p-3 border-t shrink-0">
          <button
            onClick={onClose}
            className="px-3 py-1 border rounded-lg hover:bg-gray-50 text-xs"
          >
            Đặt lại
          </button>
          <button className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-xs">
            Áp dụng
          </button>
        </div>
      </div>
    </div>
  );
}
