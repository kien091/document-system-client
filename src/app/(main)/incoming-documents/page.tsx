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
  Printer,
  Clock,
  Plus,
  MoreVertical,
  Edit2,
  Trash2,
  FileX,
} from "lucide-react";
import Image from "next/image";
import { useState, useRef, useEffect, useMemo } from "react";
import AddDocumentModal from "./components/AddDocumentModal";
import FilterDocumentModal from "./components/FilterDocumentModal";
import PreviewModal from "./components/PreviewModal";
import AddTaskModal from "./components/AddTaskModal";
import { useDocuments } from "@/contexts/document.context";
import { Document, SearchRequest } from "@/types/document";
import { Loading } from "@/components/ui/loading";
import { debounce } from "lodash";

export default function IncomingDocumentsPage() {
  const {
    documents,
    documentById,
    pagination,
    loading,
    fetchDocuments,
    fetchDocumentById,
    searchDocuments,
  } = useDocuments();
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [activeAction, setActiveAction] = useState("history");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [comments, setComments] = useState([
    {
      id: 1,
      user: "Nguyễn Trung Kiên",
      avatar: "/images/avatar.png",
      position: "Giám đốc",
      department: "Phòng Đại học",
      content: "Đã xem và phê duyệt văn bản này.",
      time: "14:40",
      date: "11/11/2024",
    },
    {
      id: 2,
      user: "Nguyễn Trung Kiên",
      avatar: "/images/avatar.png",
      position: "Giám đốc",
      department: "Phòng Đại học",
      content: "Ai làm công văn này lên văn phòng gặp tôi ngay lập tức.",
      time: "15:30",
      date: "11/11/2024",
    },
    {
      id: 3,
      user: "Nguyễn Trung Kiên",
      avatar: "/images/avatar.png",
      position: "Giám đốc",
      department: "Phòng Đại học",
      content: "Công văn này có vấn đề gì không?",
      time: "15:30",
      date: "11/11/2024",
    },
  ]);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  // Load dữ liệu ban đầu khi vào trang
  useEffect(() => {
    fetchDocuments(0, 7, "INCOMING");
  }, [fetchDocuments]);

  const debouncedSearch = useMemo(
    () =>
      debounce(async (term: string) => {
        if (term.trim() === "") {
          await fetchDocuments(0, 7, "INCOMING");
          return;
        }

        const request: SearchRequest = {
          keyword: term,
          startDate: null,
          endDate: null,
          page: 0,
          size: 7,
          sortBy: "createdAt",
          sortDirection: "DESC",
          type: "INCOMING",
        };
        await searchDocuments(request);
      }, 800),
    [searchDocuments, fetchDocuments]
  );

  // Handle input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

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

  const handleDocumentClick = async (doc: Document) => {
    if (selectedDoc === doc.documentId) {
      handleClose();
    } else {
      try {
        setSelectedDoc(doc.documentId);
        setActiveAction("history");
        await fetchDocumentById(doc.documentId);
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    }
  };

  const handlePrint = () => {
    const fileUrl = "/files/162.2020.TDT-TB.pdf"; // path to your file

    const printFrame = document.createElement("iframe");
    printFrame.style.display = "none";
    printFrame.src = fileUrl;

    document.body.appendChild(printFrame);

    printFrame.onload = () => {
      setTimeout(() => {
        printFrame.contentWindow?.print();
      }, 300);
    };
  };

  const handleDownload = (fileUrl: string) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileUrl.split("/").pop() || "document";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const now = new Date();
    const time = now.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const date = now.toLocaleDateString("vi-VN");

    setComments([
      ...comments,
      {
        id: comments.length + 1,
        user: "Nguyễn Trung Kiên",
        avatar: "/images/avatar.png",
        position: "Giám đốc",
        department: "Phòng Đại học",
        content: newComment,
        time,
        date,
      },
    ]);

    setNewComment("");
  };

  const handleEditComment = (commentId: number, content: string) => {
    setEditingCommentId(commentId);
    setEditContent(content);
  };

  const handleSaveEdit = (commentId: number) => {
    if (!editContent.trim()) return;

    setComments(
      comments.map((comment) =>
        comment.id === commentId
          ? { ...comment, content: editContent }
          : comment
      )
    );

    setEditingCommentId(null);
    setEditContent("");
  };

  const handleDeleteComment = (commentId: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bình luận này?")) {
      setComments(comments.filter((comment) => comment.id !== commentId));
    }
  };

  return (
    <>
      {loading && <Loading />}
      <div className="p-4 overflow-x-hidden">
        {/* Page title */}
        <div className="flex items-center gap-2 mb-6">
          <h1 className="text-xl font-semibold">Công văn đến</h1>
          <span className="text-gray-500">|</span>
          <span className="text-gray-500">
            Tất cả ({pagination?.totalElements})
          </span>
        </div>

        {/* Header group with background */}
        <div className="bg-gray-50 p-4 rounded-md mb-6">
          {/* Search and actions */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Tìm kiếm công văn..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Thêm mới
            </button>
            <button
              onClick={() => setIsFilterModalOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-md"
            >
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
                {pagination?.totalElements}
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
                {pagination?.statusCounts.PENDING}
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
                {pagination?.statusCounts.PROCESSING}
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
                  activeFilter === "completed"
                    ? "text-blue-100"
                    : "text-gray-500"
                }
              >
                {pagination?.statusCounts.COMPLETED}
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
              {documents.length > 0 ? (
                documents.map((doc, index) => (
                  <div
                    key={doc.documentId}
                    className={`p-4 hover:bg-gray-50 cursor-pointer ${
                      index === 0 ? "rounded-t-lg" : ""
                    } ${index === documents.length - 1 ? "rounded-b-lg" : ""}`}
                    onClick={() => handleDocumentClick(doc)}
                  >
                    <div className="flex flex-col gap-2">
                      <h3 className="font-medium line-clamp-2 text-sm">
                        {doc.title}
                      </h3>
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-500">
                          {doc.issueDate}
                        </div>
                        <span className="px-3 py-1 bg-blue-50 text-blue-500 rounded-full text-xs">
                          Mới tạo
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-500">
                          {doc.agencyUnit}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-full py-12 text-gray-500">
                  <FileX className="w-12 h-12 mb-4" />
                  <p>Không có công văn phù hợp với yêu cầu</p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {pagination && (
              <div className="flex justify-center gap-2">
                {Array.from({ length: pagination.totalPages }, (_, i) => {
                  return (
                    <button
                      key={i}
                      onClick={() => fetchDocuments(i, 7, "INCOMING")}
                      className={`px-3 py-1 rounded ${
                        pagination.number === i ||
                        Number(pagination.number) === i
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>
            )}
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
                        {documentById?.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-500">
                          {documentById?.agencyUnit}
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
                          <p className="font-medium">{documentById?.number}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 mb-1">Ngày tạo</p>
                          <p className="font-medium">
                            {documentById?.issueDate}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500 mb-1">Ngày gửi/nhận</p>
                          <p className="font-medium">
                            {documentById?.sendDate}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500 mb-1">Hạn phản hồi</p>
                          <p className="font-medium">
                            {documentById?.expirationDate}
                          </p>
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
                      {documentById?.urgencyLevel === "IMPORTANT" && (
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                          <p className="font-medium text-red-500">Hỏa tốc</p>
                        </div>
                      )}
                      {documentById?.urgencyLevel === "NORMAL" && (
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                          <p className="font-medium text-yellow-500">
                            Bình thường
                          </p>
                        </div>
                      )}
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
                        {documentById?.number}.pdf
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        title="Xem"
                        onClick={() => setIsPreviewOpen(true)}
                      >
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                      <button
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        title="In"
                        onClick={handlePrint}
                      >
                        <Printer className="w-4 h-4 text-gray-600" />
                      </button>
                      <button
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        title="Tải về"
                        onClick={() =>
                          handleDownload("/files/601.BTTTT-CNTT.pdf")
                        }
                      >
                        <Download className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Timeline section - flexible height with scroll */}
                {activeAction === "history" && (
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
                )}

                {/* Comments section */}
                {activeAction === "comments" && (
                  <div className="flex-1 min-h-0 border-b">
                    <div className="h-full flex flex-col">
                      <div className="flex-1 overflow-y-auto">
                        <div className="p-4 space-y-4">
                          {comments.map((comment) => (
                            <div key={comment.id} className="flex gap-3">
                              <Image
                                src={comment.avatar}
                                alt={comment.user}
                                width={32}
                                height={32}
                                className="rounded-full w-8 h-8 object-cover shrink-0 mt-3"
                              />
                              <div className="flex-1">
                                <div className="bg-gray-50 rounded-lg p-3">
                                  <div className="flex justify-between items-start mb-1">
                                    <div>
                                      <p className="font-medium text-sm">
                                        {comment.user}
                                      </p>
                                      <p className="text-xs text-gray-500">
                                        {comment.position} ({comment.department}
                                        )
                                      </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <button
                                        className="p-1 hover:bg-gray-200 rounded-full"
                                        onClick={() =>
                                          handleEditComment(
                                            comment.id,
                                            comment.content
                                          )
                                        }
                                      >
                                        <Edit2 className="w-3.5 h-3.5 text-blue-500" />
                                      </button>
                                      <button
                                        className="p-1 hover:bg-gray-200 rounded-full"
                                        onClick={() =>
                                          handleDeleteComment(comment.id)
                                        }
                                      >
                                        <Trash2 className="w-3.5 h-3.5 text-red-500" />
                                      </button>
                                    </div>
                                  </div>
                                  {editingCommentId === comment.id ? (
                                    <div className="flex gap-2">
                                      <input
                                        type="text"
                                        value={editContent}
                                        onChange={(e) =>
                                          setEditContent(e.target.value)
                                        }
                                        onKeyDown={(e) =>
                                          e.key === "Enter" &&
                                          handleSaveEdit(comment.id)
                                        }
                                        className="flex-1 border rounded-lg px-3 py-1 text-sm focus:outline-none focus:border-blue-500"
                                        autoFocus
                                      />
                                      <button
                                        onClick={() =>
                                          handleSaveEdit(comment.id)
                                        }
                                        className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
                                      >
                                        Lưu
                                      </button>
                                      <button
                                        onClick={() =>
                                          setEditingCommentId(null)
                                        }
                                        className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm hover:bg-gray-200"
                                      >
                                        Hủy
                                      </button>
                                    </div>
                                  ) : (
                                    <p className="text-sm">{comment.content}</p>
                                  )}
                                </div>
                                <div className="flex items-center gap-4 mt-1 text-xs text-gray-500 mx-3">
                                  <span>{comment.time}</span>
                                  <span>{comment.date}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Comment input */}
                      <div className="p-4 border-t">
                        <div className="flex gap-3">
                          <Image
                            src="/images/avatar.png"
                            alt="User"
                            width={32}
                            height={32}
                            className="rounded-full w-8 h-8 object-cover shrink-0"
                          />
                          <div className="flex-1 flex gap-2">
                            <input
                              type="text"
                              placeholder="Viết bình luận..."
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                              onKeyDown={(e) =>
                                e.key === "Enter" && handleAddComment()
                              }
                              className="flex-1 border rounded-full px-4 py-1.5 text-sm focus:outline-none focus:border-blue-500"
                            />
                            <button
                              onClick={handleAddComment}
                              className="px-4 py-1.5 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700"
                            >
                              Gửi
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tasks section */}
                {activeAction === "tasks" && (
                  <div className="flex-1 min-h-0 border-b">
                    <div className="h-full overflow-y-auto">
                      <div className="p-4 space-y-3">
                        {/* Task items */}
                        {Array.from({ length: 3 }).map((_, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-3 p-3 border rounded-lg"
                          >
                            <input type="checkbox" className="mt-1" />
                            <div className="flex-1">
                              <p className="text-sm font-medium">
                                Xem xét và phê duyệt văn bản
                              </p>
                              <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                                <div className="flex items-center gap-1">
                                  <Clock className="w-3.5 h-3.5" />
                                  <span>Hạn: 20/03/2024</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Image
                                    src="/images/avatar.png"
                                    alt="User"
                                    width={16}
                                    height={16}
                                    className="rounded-full w-4 h-4 object-cover shrink-0"
                                  />
                                  <span>Nguyễn Trung Kiên</span>
                                </div>
                              </div>
                            </div>
                            <button className="p-1.5 hover:bg-gray-100 rounded-full">
                              <MoreVertical className="w-4 h-4 text-gray-500" />
                            </button>
                          </div>
                        ))}

                        {/* Add task button */}
                        <button
                          className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 p-2"
                          onClick={() => setIsAddTaskModalOpen(true)}
                        >
                          <Plus className="w-4 h-4" />
                          Thêm công việc mới
                        </button>
                      </div>
                    </div>
                  </div>
                )}

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

        <FilterDocumentModal
          isOpen={isFilterModalOpen}
          onClose={() => setIsFilterModalOpen(false)}
        />

        <PreviewModal
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          fileUrl={documentById?.attachment} // path to file
          fileType={
            documentById?.attachment?.split(".").pop() as "pdf" | "doc" | "docx"
          } // type of file
        />

        <AddTaskModal
          isOpen={isAddTaskModalOpen}
          onClose={() => setIsAddTaskModalOpen(false)}
        />
      </div>
    </>
  );
}
