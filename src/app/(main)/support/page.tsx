"use client";
import {
  Phone,
  Mail,
  MessageCircle,
  Send,
  MapPin,
  ChevronRight,
  ChevronDown,
  X,
  Clock,
  User,
} from "lucide-react";
import { useState } from "react";

interface SupportTicket {
  id: string;
  title: string;
  content: string;
  status: "pending" | "processing" | "completed";
  createdAt: string;
  updatedAt: string;
  responses: {
    content: string;
    createdAt: string;
    user: {
      name: string;
      role: string;
    };
  }[];
}

type RequestType = "technical" | "feature" | "bug" | "other";

export default function SupportPage() {
  const [message, setMessage] = useState("");
  const [requestType, setRequestType] = useState<RequestType>("technical");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(
    null
  );

  // Mock data cho tickets
  const supportTickets: SupportTicket[] = [
    {
      id: "123",
      title: "Hỗ trợ kỹ thuật #123",
      content:
        "Tôi không thể tải lên file đính kèm trong công văn. Hệ thống báo lỗi 'File không hợp lệ'.",
      status: "processing",
      createdAt: "2024-01-15T08:30:00Z",
      updatedAt: "2024-01-15T10:45:00Z",
      responses: [
        {
          content:
            "Chào bạn, bạn vui lòng cho biết định dạng file và dung lượng file bạn đang cố gắng tải lên là gì?",
          createdAt: "2024-01-15T09:00:00Z",
          user: {
            name: "Nguyễn Trung Kiên",
            role: "Quản trị viên hệ thống",
          },
        },
        {
          content: "File của tôi là PDF, dung lượng 15MB",
          createdAt: "2024-01-15T09:15:00Z",
          user: {
            name: "Người dùng",
            role: "User",
          },
        },
      ],
    },
    {
      id: "456",
      title: "Góp ý cải thiện #456",
      content: "Đề xuất thêm tính năng lọc công văn theo nhiều tiêu chí hơn.",
      status: "completed",
      createdAt: "2024-01-14T13:20:00Z",
      updatedAt: "2024-01-14T15:30:00Z",
      responses: [
        {
          content:
            "Cảm ơn góp ý của bạn. Chúng tôi đã ghi nhận và sẽ cải thiện trong phiên bản tới.",
          createdAt: "2024-01-14T14:00:00Z",
          user: {
            name: "Nguyễn Trung Kiên",
            role: "Quản trị viên hệ thống",
          },
        },
      ],
    },
  ];

  // Format date helper
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("vi-VN");
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-50 text-yellow-600";
      case "processing":
        return "bg-blue-50 text-blue-600";
      case "completed":
        return "bg-green-50 text-green-600";
      default:
        return "bg-gray-50 text-gray-600";
    }
  };

  // Get status text
  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Chờ xử lý";
      case "processing":
        return "Đang xử lý";
      case "completed":
        return "Đã xử lý";
      default:
        return status;
    }
  };

  // Data FAQ
  const faqData = [
    {
      question: "Làm sao để tạo công văn mới?",
      answer: `Để tạo công văn mới, bạn thực hiện các bước sau:
      1. Truy cập vào mục "Công văn đi"
      2. Click vào nút "Tạo công văn mới"
      3. Điền đầy đủ thông tin vào form
      4. Đính kèm file nếu cần
      5. Click "Lưu" để tạo công văn`,
    },
    {
      question: "Cách xem lịch sử công văn?",
      answer: `Để xem lịch sử công văn:
      1. Vào chi tiết công văn cần xem
      2. Cuộn xuống phần "Lịch sử xử lý"
      3. Tại đây bạn sẽ thấy toàn bộ quá trình xử lý của công văn`,
    },
    {
      question: "Quy trình phê duyệt công văn?",
      answer: `Quy trình phê duyệt công văn gồm các bước:
      1. Người tạo gửi công văn
      2. Trưởng phòng xem xét và phê duyệt
      3. Ban giám đốc phê duyệt cuối cùng
      4. Văn thư cấp số và ban hành`,
    },
  ];

  // Danh sách loại yêu cầu
  const requestTypes = [
    { value: "technical", label: "Hỗ trợ kỹ thuật" },
    { value: "feature", label: "Đề xuất tính năng" },
    { value: "bug", label: "Báo lỗi" },
    { value: "other", label: "Khác" },
  ];

  const handleFaqClick = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Xử lý gửi tin nhắn hỗ trợ
    console.log("Gửi tin nhắn:", message);
    setMessage("");
  };

  return (
    <div className="p-6 relative">
      <h1 className="text-2xl font-semibold mb-6">Liên hệ & Hỗ trợ</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Thông tin liên hệ */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Thông tin liên hệ</h2>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Phone className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-medium">Hotline</h3>
                  <p className="text-gray-600">1900 xxxx</p>
                  <p className="text-sm text-gray-500">
                    Thứ 2 - Thứ 6 (8:00 - 17:00)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Mail className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-gray-600">support@example.com</p>
                  <p className="text-sm text-gray-500">Hỗ trợ 24/7</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <MapPin className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-medium">Địa chỉ</h3>
                  <p className="text-gray-600">
                    19 Nguyễn Hữu Thọ, P.Tân Phong, Q.7
                  </p>
                  <p className="text-sm text-gray-500">TP. Hồ Chí Minh</p>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-4">Câu hỏi thường gặp</h2>
              <div className="space-y-3">
                {faqData.map((faq, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg">
                    <button
                      className="w-full flex items-center justify-between p-3 hover:bg-gray-100 transition-colors rounded-lg"
                      onClick={() => handleFaqClick(index)}
                    >
                      <span className="text-left font-medium">
                        {faq.question}
                      </span>
                      {expandedFaq === index ? (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                      )}
                    </button>
                    {expandedFaq === index && (
                      <div className="px-3 pb-3 text-gray-600 whitespace-pre-line">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Form gửi tin nhắn */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Gửi yêu cầu hỗ trợ</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Loại yêu cầu
                </label>
                <select
                  value={requestType}
                  onChange={(e) =>
                    setRequestType(e.target.value as RequestType)
                  }
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  {requestTypes.map((type) => (
                    <option
                      key={type.value}
                      value={type.value}
                      className="text-xs !w-0"
                      style={{ width: "30% !important" }}
                    >
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tiêu đề
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập tiêu đề"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nội dung
                </label>
                <textarea
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                  placeholder="Mô tả chi tiết yêu cầu của bạn..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Gửi yêu cầu
              </button>
            </form>
          </div>

          {/* Trạng thái hỗ trợ */}
          <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
            <h2 className="text-lg font-semibold mb-4">Trạng thái hỗ trợ</h2>
            <div className="space-y-4">
              {supportTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => setSelectedTicket(ticket)}
                >
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-5 h-5 text-blue-500" />
                    <div>
                      <h3 className="font-medium">{ticket.title}</h3>
                      <p className="text-sm text-gray-500">
                        {new Date(ticket.createdAt).toLocaleString("vi-VN")}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                      ticket.status
                    )}`}
                  >
                    {getStatusText(ticket.status)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Popup chi tiết ticket */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold">{selectedTicket.title}</h3>
              <button
                onClick={() => setSelectedTicket(null)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 overflow-y-auto flex-1">
              {/* Ticket info */}
              <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <Clock className="w-4 h-4" />
                  <span>Tạo lúc: {formatDate(selectedTicket.createdAt)}</span>
                </div>
                <p className="text-gray-700">{selectedTicket.content}</p>
              </div>

              {/* Responses */}
              <div className="space-y-4">
                {selectedTicket.responses.map((response, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg ${
                      response.user.role === "User"
                        ? "bg-blue-50 ml-4"
                        : "bg-gray-50 mr-4"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="font-medium">{response.user.name}</span>
                      <span className="text-sm text-gray-500">
                        ({response.user.role})
                      </span>
                    </div>
                    <p className="text-gray-700">{response.content}</p>
                    <div className="mt-2 text-sm text-gray-500">
                      {formatDate(response.createdAt)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Nhập phản hồi..."
                  className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  Gửi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
