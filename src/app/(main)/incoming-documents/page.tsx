"use client";
import {
  Search,
  MoreHorizontal,
  Filter,
  Building,
  X,
  Eye,
  Download,
  History,
  MessageCircle,
  CheckSquare,
} from "lucide-react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import AddDocumentModal from "./components/AddDocumentModal";

interface DocumentType {
  id: number;
  title: string;
  department: string;
  status: string;
  date: string;
}

const getPageNumbers = (currentPage: number, totalPages: number) => {
  const delta = 2;
  const range = [];
  const rangeWithDots = [];
  let l;

  range.push(1);
  if (totalPages <= 1) return range;

  for (let i = currentPage - delta; i <= currentPage + delta; i++) {
    if (i > 1 && i < totalPages) {
      range.push(i);
    }
  }

  range.push(totalPages);

  for (const i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push("...");
      }
    }
    rangeWithDots.push(i);
    l = i;
  }

  return rangeWithDots;
};

export default function IncomingDocumentsPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDoc, setSelectedDoc] = useState<number | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [activeAction, setActiveAction] = useState("history");
  const itemsPerPage = 7;
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const documents = [
    {
      id: 1,
      title:
        "V/v Thông báo lịch nghỉ Tết Dương lịch và Tết Nguyên đán Giáp Thìn 2024",
      department: "Phòng Đại học",
      status: "new",
      date: "11/11/2024",
    },
    {
      id: 2,
      title: "V/v Thông báo kế hoạch tổ chức Lễ tốt nghiệp đợt 3 năm 2024",
      department: "Phòng Đào tạo",
      status: "processing",
      date: "10/11/2024",
    },
    {
      id: 3,
      title:
        "V/v Thông báo lịch nghỉ Tết Dương lịch và Tết Nguyên đán Giáp Thìn 2024",
      department: "Phòng Đại học",
      status: "new",
      date: "11/11/2024",
    },
    {
      id: 4,
      title:
        "V/v Thông báo lịch nghỉ Tết Dương lịch và Tết Nguyên đán Giáp Thìn 2024",
      department: "Phòng Đại học",
      status: "new",
      date: "11/11/2024",
    },
    {
      id: 5,
      title:
        "V/v Thông báo lịch nghỉ Tết Dương lịch và Tết Nguyên đán Giáp Thìn 2024",
      department: "Phòng Đại học",
      status: "new",
      date: "11/11/2024",
    },
    {
      id: 6,
      title:
        "V/v Thông báo về việc đăng ký học phần học kỳ 2 năm học 2024-2025",
      department: "Phòng Đào tạo",
      status: "completed",
      date: "01/11/2024",
    },
    {
      id: 7,
      title:
        "V/v Thông báo về việc đăng ký học phần học kỳ 2 năm học 2024-2025",
      department: "Phòng Đào tạo",
      status: "completed",
      date: "01/11/2024",
    },
    {
      id: 8,
      title:
        "V/v Thông báo về việc đăng ký học phần học kỳ 2 năm học 2024-2025",
      department: "Phòng Đào tạo",
      status: "completed",
      date: "01/11/2024",
    },
    {
      id: 9,
      title:
        "V/v Thông báo về việc đăng ký học phần học kỳ 2 năm học 2024-2025",
      department: "Phòng Đào tạo",
      status: "completed",
      date: "01/11/2024",
    },
    {
      id: 10,
      title:
        "V/v Thông báo về việc đăng ký học phần học kỳ 2 năm học 2024-2025",
      department: "Phòng Đào tạo",
      status: "completed",
      date: "01/11/2024",
    },
    {
      id: 11,
      title:
        "V/v Thông báo về việc đăng ký học phần học kỳ 2 năm học 2024-2025",
      department: "Phòng Đào tạo",
      status: "completed",
      date: "01/11/2024",
    },
    {
      id: 12,
      title:
        "V/v Thông báo về việc đăng ký học phần học kỳ 2 năm học 2024-2025",
      department: "Phòng Đào tạo",
      status: "completed",
      date: "01/11/2024",
    },
    {
      id: 13,
      title:
        "V/v Thông báo lịch nghỉ Tết Dương lịch và Tết Nguyên đán Giáp Thìn 2024",
      department: "Phòng Đại học",
      status: "new",
      date: "11/11/2024",
    },
    {
      id: 14,
      title: "V/v Thông báo kế hoạch tổ chức Lễ tốt nghiệp đợt 3 năm 2024",
      department: "Phòng Đào tạo",
      status: "processing",
      date: "10/11/2024",
    },
    {
      id: 15,
      title:
        "V/v Thông báo lịch nghỉ Tết Dương lịch và Tết Nguyên đán Giáp Thìn 2024",
      department: "Phòng Đại học",
      status: "new",
      date: "11/11/2024",
    },
    {
      id: 16,
      title:
        "V/v Thông báo lịch nghỉ Tết Dương lịch và Tết Nguyên đán Giáp Thìn 2024",
      department: "Phòng Đại học",
      status: "new",
      date: "11/11/2024",
    },
    {
      id: 17,
      title:
        "V/v Thông báo lịch nghỉ Tết Dương lịch và Tết Nguyên đán Giáp Thìn 2024",
      department: "Phòng Đại học",
      status: "new",
      date: "11/11/2024",
    },
    {
      id: 18,
      title:
        "V/v Thông báo về việc đăng ký học phần học kỳ 2 năm học 2024-2025",
      department: "Phòng Đào tạo",
      status: "completed",
      date: "01/11/2024",
    },
    {
      id: 19,
      title:
        "V/v Thông báo về việc đăng ký học phần học kỳ 2 năm học 2024-2025",
      department: "Phòng Đào tạo",
      status: "completed",
      date: "01/11/2024",
    },
    {
      id: 20,
      title:
        "V/v Thông báo về việc đăng ký học phần học kỳ 2 năm học 2024-2025",
      department: "Phòng Đào tạo",
      status: "completed",
      date: "01/11/2024",
    },
    {
      id: 21,
      title:
        "V/v Thông báo về việc đăng ký học phần học kỳ 2 năm học 2024-2025",
      department: "Phòng Đào tạo",
      status: "completed",
      date: "01/11/2024",
    },
    {
      id: 22,
      title:
        "V/v Thông báo về việc đăng ký học phần học kỳ 2 năm học 2024-2025",
      department: "Phòng Đào tạo",
      status: "completed",
      date: "01/11/2024",
    },
    {
      id: 23,
      title:
        "V/v Thông báo về việc đăng ký học phần học kỳ 2 năm học 2024-2025",
      department: "Phòng Đào tạo",
      status: "completed",
      date: "01/11/2024",
    },
  ];

  const totalPages = Math.ceil(documents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDocuments = documents.slice(startIndex, endIndex);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedDoc(null);
      setIsClosing(false);
    }, 300);
  };

  const historyRef = useRef<HTMLButtonElement>(null);
  const commentsRef = useRef<HTMLButtonElement>(null);
  const tasksRef = useRef<HTMLButtonElement>(null);

  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const updateIndicator = () => {
      if (historyRef.current && activeAction === "history") {
        setIndicatorStyle({
          left: historyRef.current.offsetLeft,
          width: historyRef.current.offsetWidth,
        });
      }
      switch (activeAction) {
        case "history":
          if (historyRef.current) {
            setIndicatorStyle({
              left: historyRef.current.offsetLeft,
              width: historyRef.current.offsetWidth,
            });
          }
          break;
        case "comments":
          if (commentsRef.current) {
            setIndicatorStyle({
              left: commentsRef.current.offsetLeft,
              width: commentsRef.current.offsetWidth,
            });
          }
          break;
        case "tasks":
          if (tasksRef.current) {
            setIndicatorStyle({
              left: tasksRef.current.offsetLeft,
              width: tasksRef.current.offsetWidth,
            });
          }
          break;
      }
    };

    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [activeAction]);

  useEffect(() => {
    if (selectedDoc && activeAction === "history" && historyRef.current) {
      setIndicatorStyle({
        left: historyRef.current.offsetLeft,
        width: historyRef.current.offsetWidth,
      });
    }
  }, [selectedDoc, activeAction]);

  const handleDocumentClick = (doc: DocumentType) => {
    if (selectedDoc === doc.id) {
      handleClose();
    } else if (!selectedDoc) {
      setSelectedDoc(doc.id);
      setActiveAction("history");
    } else {
      setSelectedDoc(doc.id);
      setActiveAction("history");
    }
  };

  return (
    <div className="p-4 overflow-x-hidden">
      {/* Page title */}
      <div className="flex items-center gap-2 mb-6">
        <h1 className="text-xl font-semibold">Công văn đến</h1>
        <span className="text-gray-500">|</span>
        <span className="text-gray-500">Tất cả (57)</span>
      </div>

      {/* Header group with background */}
      <div className="bg-gray-50 p-4 rounded-md mb-6">
        {/* Search and actions */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm"
              className="w-full pl-10 pr-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Thêm mới
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-md">
            <Filter className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-md">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>

        {/* Status filters */}
        <div className="flex gap-3 overflow-x-auto">
          <button
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              activeFilter === "all"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
            onClick={() => setActiveFilter("all")}
          >
            Tất cả{" "}
            <span
              className={
                activeFilter === "all" ? "text-blue-100" : "text-gray-500"
              }
            >
              57
            </span>
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              activeFilter === "pending"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
            onClick={() => setActiveFilter("pending")}
          >
            Chưa xử lý{" "}
            <span
              className={
                activeFilter === "pending" ? "text-blue-100" : "text-gray-500"
              }
            >
              35
            </span>
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              activeFilter === "processing"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
            onClick={() => setActiveFilter("processing")}
          >
            Đang xử lý{" "}
            <span
              className={
                activeFilter === "processing"
                  ? "text-blue-100"
                  : "text-gray-500"
              }
            >
              17
            </span>
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              activeFilter === "completed"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
            onClick={() => setActiveFilter("completed")}
          >
            Đã hoàn tất{" "}
            <span
              className={
                activeFilter === "completed" ? "text-blue-100" : "text-gray-500"
              }
            >
              5
            </span>
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              activeFilter === "pinned"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
            onClick={() => setActiveFilter("pinned")}
          >
            Được ghim{" "}
            <span
              className={
                activeFilter === "pinned" ? "text-blue-100" : "text-gray-500"
              }
            >
              7
            </span>
          </button>
        </div>
      </div>

      <div className="flex gap-6 transition-all duration-300 h-[calc(100vh+2rem)]">
        {/* Main content */}
        <div
          className={`flex-1 transition-all duration-300 flex flex-col ${
            selectedDoc ? "w-[44%]" : "w-full"
          }`}
        >
          {/* Documents list */}
          <div className="flex-1 bg-white rounded-lg shadow divide-y mb-4 overflow-y-auto">
            {currentDocuments.map((doc, index) => (
              <div
                key={doc.id}
                className={`p-4 hover:bg-gray-50 cursor-pointer ${
                  index === 0 ? "rounded-t-lg" : ""
                } ${
                  index === currentDocuments.length - 1 ? "rounded-b-lg" : ""
                }`}
                onClick={() => handleDocumentClick(doc)}
              >
                <div className="flex flex-col gap-2">
                  <h3 className="font-medium line-clamp-2 text-sm">
                    {doc.title}
                  </h3>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">{doc.date}</div>
                    <span className="px-3 py-1 bg-blue-50 text-blue-500 rounded-full text-xs">
                      Mới tạo
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-500">
                      {doc.department}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-auto flex justify-center items-center gap-2">
            {getPageNumbers(currentPage, totalPages).map((pageNumber, index) =>
              pageNumber === "..." ? (
                <span key={`dots-${index}`} className="px-3 py-2 text-gray-500">
                  {pageNumber}
                </span>
              ) : (
                <button
                  key={pageNumber}
                  className={`px-2 py-2 border rounded-md min-w-[40px] ${
                    currentPage === pageNumber
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => setCurrentPage(Number(pageNumber))}
                >
                  {pageNumber}
                </button>
              )
            )}
          </div>
        </div>

        {/* Selected Document Card */}
        {(selectedDoc || isClosing) && (
          <div
            className="w-[56%] h-full transition-all duration-300 transform"
            style={{
              animation: isClosing
                ? "slideOut 0.3s ease-out forwards"
                : "slideIn 0.3s ease-out",
            }}
          >
            <div className="bg-white rounded-lg shadow h-full flex flex-col">
              {/* Header with close button - fixed height */}
              <div className="shrink-0 p-4 border-b">
                <div className="flex justify-between items-start p-4">
                  <div className="flex-1">
                    <h3 className="font-medium mb-1">
                      V/v Thông báo lịch nghỉ Tết Dương lịch và Tết Nguyên đán
                      Giáp Thìn 2024
                    </h3>
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-500">
                        Phòng Đại học
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="px-3 py-1 bg-blue-50 text-blue-500 rounded-full text-sm">
                      Mới tạo
                    </span>
                    <button
                      onClick={handleClose}
                      className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <X className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Info Grid - fixed height */}
              <div className="shrink-0 p-4 border-b">
                <div className="grid grid-cols-3 gap-6 text-sm">
                  <div className="col-span-2">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <p className="text-gray-500 mb-1">Số văn bản</p>
                        <p className="font-medium">601/BTTTT-CNTT</p>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-1">Ngày tạo</p>
                        <p className="font-medium">11/11/2024</p>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-1">Phân loại</p>
                        <p className="font-medium">Công văn</p>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-1">Mức độ bảo mật</p>
                        <p className="font-medium">Cao</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Mức độ khẩn cấp</p>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      <p className="font-medium text-red-500">Hỏa tốc</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/images/icon/pdf.png"
                      alt="PDF"
                      width={24}
                      height={24}
                    />
                    <span className="text-sm text-gray-600">
                      601.BTTTT-CNTT.pdf (2.35MB)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      title="Xem"
                    >
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      title="Tải về"
                    >
                      <Download className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Timeline section - flexible height with scroll */}
              <div className="flex-1 min-h-0 border-b">
                <div className="h-full overflow-y-auto">
                  <div className="p-4 space-y-4">
                    {Array.from({ length: 10 }).map((_, index) => (
                      <div key={index} className="flex gap-4">
                        {/* Time and date column */}
                        <div className="flex flex-col items-end min-w-[100px]">
                          <div className="text-lg font-medium text-blue-600">
                            14:40
                          </div>
                          <div className="text-gray-500 text-sm">
                            11/11/2024
                          </div>
                        </div>

                        {/* User info */}
                        <div className="flex gap-3">
                          <Image
                            src="/images/avatar.png"
                            alt="User"
                            width={32}
                            height={32}
                            className="rounded-full w-8 h-8 object-cover"
                          />
                          <div className="flex flex-col">
                            <p className="font-medium">Nguyễn Trung Kiên</p>
                            <p className="text-gray-500 text-sm">
                              Giảng viên khoa Công nghệ thông tin
                            </p>
                            <p className="text-gray-500 text-sm">
                              Nhận từ Phòng Đại học
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex-shrink-0 px-4 py-3 border-t">
                <div className="flex gap-8 relative">
                  <button
                    ref={historyRef}
                    className={`flex items-center gap-2 pb-2 relative transition-colors ${
                      activeAction === "history"
                        ? "text-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => setActiveAction("history")}
                  >
                    <History className="w-4 h-4" />
                    <span>Lịch sử</span>
                  </button>

                  <button
                    ref={commentsRef}
                    className={`flex items-center gap-2 pb-2 relative transition-colors ${
                      activeAction === "comments"
                        ? "text-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => setActiveAction("comments")}
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Bình luận</span>
                  </button>

                  <button
                    ref={tasksRef}
                    className={`flex items-center gap-2 pb-2 relative transition-colors ${
                      activeAction === "tasks"
                        ? "text-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => setActiveAction("tasks")}
                  >
                    <CheckSquare className="w-4 h-4" />
                    <span>Công việc</span>
                  </button>

                  {/* Animated border bottom */}
                  <div
                    className="absolute bottom-0 h-0.5 bg-blue-600 transition-all duration-200 ease-out"
                    style={{
                      left: indicatorStyle.left,
                      width: indicatorStyle.width,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slideOut {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }
      `}</style>

      <AddDocumentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
}
