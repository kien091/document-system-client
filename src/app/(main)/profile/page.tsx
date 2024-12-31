"use client";

import Image from "next/image";
import { Camera, PencilIcon } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="min-h-screen">
      {/* Cover Image & Profile Section */}
      <div className="relative">
        <div className="max-w-7xl mx-auto bg-white rounded-md shadow-[4px_4px_10px_rgba(0,0,0,0.2)] mb-5">
          {/* Cover Image */}
          <div className="h-64 w-full relative">
            <Image
              src="/images/background.jpg"
              alt="Cover"
              fill
              className="object-cover rounded-tr-md rounded-tl-md"
            />
            <button className="absolute right-4 top-4 bg-white/80 hover:bg-white px-3 py-1.5 rounded-md text-sm flex items-center gap-2">
              <Camera className="w-4 h-4 mt-0.5" />
              Edit cover
            </button>
          </div>

          {/* Profile Info */}
          <div className="relative -mt-20 pb-6 ml-5">
            {/* Avatar */}
            <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-white group">
              <Image
                src="/images/avatar.png"
                alt="Profile"
                fill
                className="object-cover"
              />
              <button
                className="absolute h-1/2 bottom-0 right-0 left-0 flex items-center justify-center bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-b-full"
                onClick={() => {
                  /* handle image upload */
                }}
              >
                <Camera className="w-8 h-8 text-white" />
              </button>
            </div>
            {/* Name & Title */}
            <div className="mt-4">
              <h1 className="text-2xl font-semibold">Nguyễn Trung Kiên</h1>
              <p className="text-gray-600">
                Giảng viên (Khoa Công nghệ thông tin)
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Contact Info Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Contact */}
            <div className="bg-white p-6 rounded-lg shadow-[4px_4px_10px_rgba(0,0,0,0.2)]">
              <div className="flex items-center justify-between mb-4 pb-2.5 border-b border-gray-300">
                <h2 className="text-lg font-semibold">Liên lạc</h2>
                <PencilIcon className="w-7 h-7 text-gray-400 cursor-pointer hover:bg-gray-200 hover:text-gray-600 p-1.5 rounded-md" />
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600 mb-1">Email</p>
                  <p>52100752@student.tdtu.edu.vn</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Số điện thoại</p>
                  <p>0945454086</p>
                </div>
              </div>
            </div>

            {/* Department */}
            <div className="bg-white p-6 rounded-lg shadow-[4px_4px_10px_rgba(0,0,0,0.2)]">
              <div className="flex items-center justify-between mb-4 pb-2.5 border-b border-gray-300">
                <h2 className="text-lg font-semibold">Department</h2>
                <Camera className="w-7 h-7 text-gray-400 cursor-pointer hover:bg-gray-200 hover:text-gray-600 p-1.5 rounded-md" />
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600 mb-1">Số điện thoại</p>
                  <p>(028) 37755046</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Địa chỉ</p>
                  <p>
                    Phòng C004, Số 19 Nguyễn Hữu Thọ, P. Tân Phong, Quận 7, Tp.
                    Hồ Chí Minh
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Documents */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Công văn gần đây</h2>
            <div className="relative">
              <div className="grid grid-cols-3 gap-4 overflow-hidden">
                <div className="col-span-3">
                  <div className="flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                    {[1, 2, 3, 4, 5, 6].map((_, index) => (
                      <div key={index} className="flex-none w-[32%] first:ml-0">
                        <div className="bg-white p-4 rounded-lg shadow">
                          <Image
                            src="/images/news/thongbao.jpg"
                            alt="Document"
                            width={400}
                            height={250}
                            className="w-full rounded-md mb-3"
                          />
                          <h3 className="font-medium mb-1 line-clamp-2">
                            Thông báo lịch nghỉ Tết Dương lịch và Tết Nguyên đán
                            Giáp Thìn 2024
                          </h3>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
