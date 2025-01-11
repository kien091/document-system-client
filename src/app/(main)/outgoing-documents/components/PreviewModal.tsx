import { X } from "lucide-react";
import { useState } from "react";

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileUrl: string | undefined;
  fileType: "pdf" | "doc" | "docx";
}

export default function PreviewModal({
  isOpen,
  onClose,
  fileUrl,
  fileType,
}: PreviewModalProps) {
  const [loading, setLoading] = useState(true);

  if (!isOpen) return null;

  const renderPreview = () => {
    console.log(fileUrl);
    switch (fileType) {
      case "pdf":
        return (
          <iframe
            src={`${fileUrl}#toolbar=0`}
            className="w-full h-full"
            onLoad={() => setLoading(false)}
          />
        );
      case "doc":
      case "docx":
        return (
          <iframe
            src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
              fileUrl || ""
            )}`}
            className="w-full h-full"
            onLoad={() => setLoading(false)}
          />
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-lg w-full max-w-5xl h-[80vh] flex flex-col shadow-lg animate-slideDown">
        {/* Header */}
        <div className="flex justify-between items-center p-3 border-b shrink-0">
          <h2 className="text-base font-medium">Xem trước tài liệu</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Preview Content */}
        <div className="flex-1 min-h-0 relative">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-blue-600" />
            </div>
          )}
          {renderPreview()}
        </div>
      </div>
    </div>
  );
}
