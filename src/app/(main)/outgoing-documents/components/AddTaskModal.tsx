import { X, Calendar, User } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const users = [
  {
    id: 1,
    name: "Nguyễn Trung Kiên",
    position: "Giám đốc",
    department: "Phòng Đại học",
    avatar: "/images/avatar.png",
  },
  {
    id: 2,
    name: "Nguyễn Văn A",
    position: "Trưởng phòng",
    department: "Phòng Đào tạo",
    avatar: "/images/avatar.png",
  },
  {
    id: 3,
    name: "Trần Thị B",
    position: "Nhân viên",
    department: "Phòng Hành chính",
    avatar: "/images/avatar.png",
  },
];

export default function AddTaskModal({ isOpen, onClose }: AddTaskModalProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(users[0]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-lg w-full max-w-[500px] flex flex-col shadow-lg animate-slideDown">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-medium">Thêm công việc mới</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Task name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Tên công việc
            </label>
            <input
              type="text"
              placeholder="Nhập tên công việc..."
              className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Due date */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Hạn hoàn thành
            </label>
            <div className="relative">
              <input
                type="date"
                className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-blue-500"
              />
              <Calendar className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Assignee */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Người thực hiện
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full flex items-center gap-2 p-2 border rounded-lg text-left"
              >
                <Image
                  src={selectedUser.avatar}
                  alt={selectedUser.name}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium">{selectedUser.name}</p>
                  <p className="text-xs text-gray-500">
                    {selectedUser.position} ({selectedUser.department})
                  </p>
                </div>
                <User className="w-4 h-4 text-gray-400" />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg z-10 max-h-[200px] overflow-y-auto">
                  {users.map((user) => (
                    <button
                      key={user.id}
                      onClick={() => {
                        setSelectedUser(user);
                        setIsDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 p-2 hover:bg-gray-50 text-left"
                    >
                      <Image
                        src={user.avatar}
                        alt={user.name}
                        width={24}
                        height={24}
                        className="rounded-full w-8 h-8 object-cover shrink-0"
                      />
                      <div>
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-gray-500">
                          {user.position} ({user.department})
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">Mô tả</label>
            <textarea
              rows={3}
              placeholder="Nhập mô tả công việc..."
              className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-blue-500"
            />
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
            Thêm công việc
          </button>
        </div>
      </div>
    </div>
  );
}
