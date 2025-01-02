"use client";
import { useState } from "react";
import {
  UserCircle,
  Mail,
  SendHorizontal,
  FileText,
  BarChart2,
  HeadphonesIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function IncomingDocumentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={`bg-white border-r mr-4 rounded-md transition-all duration-300 ${
          isCollapsed ? "w-16" : "w-64"
        } relative`}
      >
        <nav className="flex flex-col">
          <a
            href="/profile"
            className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-100 ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <UserCircle className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && "Thông tin tài khoản"}
          </a>
          <a
            href="/incoming-documents"
            className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-100 ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <Mail className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && "Công văn đến"}
          </a>
          <a
            href="/outgoing-documents"
            className={`flex items-center gap-3 px-4 py-3 text-white bg-red-600 rounded-tr-md ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <SendHorizontal className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && "Công văn đi"}
          </a>
          <a
            href="#"
            className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-100 ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <FileText className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && "Công văn nội bộ"}
          </a>
          <a
            href="#"
            className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-100 ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <BarChart2 className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && "Báo cáo - thống kê"}
          </a>
          <a
            href="#"
            className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-100 ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <HeadphonesIcon className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && "Liên hệ - Hỗ trợ"}
          </a>
        </nav>

        {/* Toggle button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-10 bg-white border rounded-full p-1 shadow hover:bg-gray-100"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1">{children}</div>
    </div>
  );
}
