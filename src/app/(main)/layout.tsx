"use client";

import Image from "next/image";
import {
  Bell,
  LogOut,
  User,
  Settings,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn, formatTimeAgo } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth.context";
import { useNotifications } from "@/contexts/notification.context";
import Link from "next/link";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { profile } = useAuth();
  const router = useRouter();
  const { notifications, unreadCount, loading } = useNotifications();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="flex h-16 items-center px-6 justify-between">
          <div className="flex items-center gap-2">
            <Link href="/dashboard" className="flex items-center gap-2">
              <Image
                src="/images/logo/logo.webp"
                alt="TDT Logo"
                width={65}
                height={65}
              />
              <h1 className="text-xl font-semibold italic font-inriaSans">
                Hệ thống công văn
                <span className="block text-sm font-normal">
                  Khoa Công nghệ thông tin
                </span>
              </h1>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
                <div className="relative">
                  <Bell
                    className={cn(
                      "h-5 w-5 text-gray-600",
                      unreadCount > 0 &&
                        "animate-[bell-shake_1s_ease-in-out_infinite]"
                    )}
                  />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full" />
                  )}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="all">Tất cả</TabsTrigger>
                    <TabsTrigger value="unread">
                      Chưa đọc ({unreadCount})
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent
                    value="all"
                    className="max-h-[400px] overflow-y-auto"
                  >
                    {loading ? (
                      <div className="p-4 text-center text-gray-500">
                        Đang tải...
                      </div>
                    ) : notifications.length === 0 ? (
                      <div className="p-8 text-center text-gray-500">
                        <Image
                          src="/images/icon/empty-notification.jpg"
                          alt="Empty Notification"
                          width={200}
                          height={125}
                          className="w-[100px] mx-auto rounded-md mb-3"
                        />
                        <p>Không có thông báo gần đây</p>
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <DropdownMenuItem
                          key={notification.notificationId}
                          className="flex flex-col items-start p-4 hover:bg-gray-50"
                        >
                          <p
                            className={cn(
                              "text-sm",
                              !notification.read && "font-medium"
                            )}
                          >
                            {notification.message}
                          </p>
                          <span className="text-xs text-gray-500 mt-1">
                            {formatTimeAgo(notification.timestamp)}
                          </span>
                        </DropdownMenuItem>
                      ))
                    )}
                  </TabsContent>
                  <TabsContent
                    value="unread"
                    className="max-h-[400px] overflow-y-auto"
                  >
                    {loading ? (
                      <div className="p-4 text-center text-gray-500">
                        Đang tải...
                      </div>
                    ) : notifications.filter((n) => !n.read).length === 0 ? (
                      <div className="p-8 text-center text-gray-500">
                        <Image
                          src="/images/icon/empty-notification.jpg"
                          alt="Empty Notification"
                          width={200}
                          height={125}
                          className="w-[100px] mx-auto rounded-md mb-3"
                        />
                        <p>Không có thông báo chưa đọc</p>
                      </div>
                    ) : (
                      notifications
                        .filter((n) => !n.read)
                        .map((notification) => (
                          <DropdownMenuItem
                            key={notification.notificationId}
                            className="flex flex-col items-start p-4 hover:bg-gray-50"
                          >
                            <p className="text-sm font-medium">
                              {notification.message}
                            </p>
                            <span className="text-xs text-gray-500 mt-1">
                              {formatTimeAgo(notification.timestamp)}
                            </span>
                          </DropdownMenuItem>
                        ))
                    )}
                  </TabsContent>
                </Tabs>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-700">
                    {profile?.fullName || profile?.username}
                  </span>
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <Image
                      src={profile?.avatar || "/images/avatar.png"}
                      alt="Avatar"
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">
                      {profile?.fullName || profile?.username}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {profile?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/profile")}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Thông tin cá nhân</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/settings")}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Cài đặt</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-600 focus:text-red-600"
                  onClick={() => router.push("/login")}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Đăng xuất</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 pr-6 pt-6 pb-6 bg-[#f0f2f5]">{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

const Footer = () => {
  return (
    <footer className="bg-[#333333] text-white">
      <div className="max-w-7xl mx-auto px-4 py-8 ml-10 mr-10">
        <div className="grid grid-cols-7 gap-8">
          {/* Column 1 - Logo and Address (3/7) */}
          <div className="col-span-3">
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/images/logo/logo.webp"
                alt="TDT Logo"
                width={80}
                height={30}
              />
              <div>
                <h3 className="font-medium">ĐẠI HỌC TÔN ĐỨC THẮNG</h3>
                <p className="text-sm">Khoa Công nghệ thông tin</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex gap-2">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-1" />
                <p>
                  Địa chỉ: Phòng C004, Số 19 Nguyễn Hữu Thọ, P. Tân Phong, Quận
                  7, Tp. Hồ Chí Minh.
                </p>
              </div>
              <div className="flex gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <p>Điện thoại: (028) 37755046</p>
              </div>
            </div>
          </div>

          {/* Column 2 - Contact Info (2/7) */}
          <div className="col-span-2 space-y-6">
            <div>
              <h4 className="font-medium mb-2">Liên hệ kĩ thuật</h4>
              <div className="space-y-1 text-sm">
                <div className="flex gap-2 items-center">
                  <Phone className="w-4 h-4" />
                  <p>028.3775.5052</p>
                </div>
                <div className="flex gap-2 items-center">
                  <MapPin className="w-4 h-4" />
                  <p>Khoa công nghệ thông tin</p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Phòng Đại học</h4>
              <div className="space-y-1 text-sm">
                <div className="flex gap-2 items-center">
                  <Phone className="w-4 h-4" />
                  <p>028.3775.5052</p>
                </div>
                <div className="flex gap-2 items-center">
                  <Mail className="w-4 h-4" />
                  <p>phongdaihoc@tdtu.edu.vn</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3 - More Contact Info (2/7) */}
          <div className="col-span-2 space-y-6">
            <div>
              <h4 className="font-medium mb-2">Phòng Đại học</h4>
              <div className="space-y-1 text-sm">
                <div className="flex gap-2 items-center">
                  <Phone className="w-4 h-4" />
                  <p>028.3775.5052</p>
                </div>
                <div className="flex gap-2 items-center">
                  <Mail className="w-4 h-4" />
                  <p>phongdaihoc@tdtu.edu.vn</p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Phòng Đại học</h4>
              <div className="space-y-1 text-sm">
                <div className="flex gap-2 items-center">
                  <Phone className="w-4 h-4" />
                  <p>028.3775.5052</p>
                </div>
                <div className="flex gap-2 items-center">
                  <Mail className="w-4 h-4" />
                  <p>phongdaihoc@tdtu.edu.vn</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-600 my-4"></div>

        {/* Copyright */}
        <div className="text-sm">
          <p>Copyright ©2025 Đại học Tôn Đức Thắng</p>
          <p>Ứng dụng được phát triển bởi Nhóm phát triển Sigma</p>
        </div>
      </div>
    </footer>
  );
};
