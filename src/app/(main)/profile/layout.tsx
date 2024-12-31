import {
  UserCircle,
  Mail,
  SendHorizontal,
  FileText,
  BarChart2,
  HeadphonesIcon,
} from "lucide-react";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r mr-4 rounded-md">
        <nav className="flex flex-col">
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 text-white bg-red-600 rounded-tr-md"
          >
            <UserCircle className="w-5 h-5" />
            Thông tin tài khoản
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
          >
            <Mail className="w-5 h-5" />
            Công văn đến
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
          >
            <SendHorizontal className="w-5 h-5" />
            Công văn đi
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
          >
            <FileText className="w-5 h-5" />
            Công văn nội bộ
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
          >
            <BarChart2 className="w-5 h-5" />
            Báo cáo - thống kê
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
          >
            <HeadphonesIcon className="w-5 h-5" />
            Liên hệ - Hỗ trợ
          </a>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1">{children}</div>
    </div>
  );
}
