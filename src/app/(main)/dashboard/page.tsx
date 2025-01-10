"use client";

import { useEffect, useState } from "react";
import AutoPlay from "embla-carousel-autoplay";
import {
  Search,
  Mail,
  SendHorizontal,
  FileText,
  BarChart2,
  Files,
  HeadphonesIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDocuments } from "@/contexts/document.context";
import { formatDateTime } from "@/lib/utils";
import { Loading } from "@/components/ui/loading";

const carouselImages = [
  "/images/carousel/carousel-1.png",
  "/images/carousel/carousel-2.png",
  "/images/carousel/carousel-3.png",
];

export default function DashboardPage() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [activeTab, setActiveTab] = useState<"incoming" | "outgoing">(
    "incoming"
  );
  const {
    recentIncoming,
    recentOutgoing,
    loading: documentLoading,
  } = useDocuments();

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <>
      {documentLoading && <Loading />}
      <div className="max-w-7xl mx-auto space-y-6 pl-6">
        <div className="relative w-full h-[400px] mb-8 overflow-hidden shadow-[4px_4px_10px_rgba(0,0,0,0.2)] rounded-xl">
          <Carousel
            className="w-full"
            opts={{
              loop: true,
              align: "start",
              skipSnaps: false,
              slidesToScroll: 1,
              containScroll: false,
              dragFree: false,
            }}
            plugins={[
              AutoPlay({
                delay: 4000,
                stopOnInteraction: false,
              }),
            ]}
            setApi={setApi}
          >
            <CarouselContent className="!ml-0">
              {carouselImages.map((src, index) => (
                <CarouselItem key={index} className="!p-0 w-full">
                  <div className="relative h-[400px] w-full rounded-lg overflow-hidden">
                    <Image
                      src={src}
                      alt={`Slide ${index + 1}`}
                      fill
                      className="object-cover"
                      priority={index === 0}
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4 bg-white/50 hover:bg-white/75" />
            <CarouselNext className="right-4 bg-white/50 hover:bg-white/75" />

            {/* Dots navigation */}
            <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-2">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  className={`h-1.5 rounded-full transition-all ${
                    current === index
                      ? "w-8 bg-[#E74C3C]"
                      : "w-2 bg-gray-400/50 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </Carousel>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Left section - 2/3 width */}
          <div className="col-span-2 space-y-6">
            {/* Search bar */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Nhập để tìm kiếm công văn..."
                className="pl-10 bg-white"
              />
            </div>

            {/* Quick access grid */}
            <div className="grid grid-cols-3 gap-4">
              <QuickAccessCard
                title="CÔNG VĂN ĐẾN"
                icon={<Mail className="w-8 h-8" />}
                href="/incoming-documents"
              />
              <QuickAccessCard
                title="CÔNG VĂN ĐI"
                icon={<SendHorizontal className="w-8 h-8" />}
                href="/documents/outgoing"
              />
              <QuickAccessCard
                title="CÔNG VĂN NỘI BỘ"
                icon={<FileText className="w-8 h-8" />}
                href="/documents/internal"
              />
              <QuickAccessCard
                title="BÁO CÁO - THỐNG KÊ"
                icon={<BarChart2 className="w-8 h-8" />}
                href="/reports"
              />
              <QuickAccessCard
                title="DANH SÁCH CÔNG VĂN"
                icon={<Files className="w-8 h-8" />}
                href="/documents"
              />
              <QuickAccessCard
                title="LIÊN HỆ - HỖ TRỢ"
                icon={<HeadphonesIcon className="w-8 h-8" />}
                href="/support"
              />
            </div>

            {/* News section */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2  border-b-2 border-gray-200 pb-6">
                <FileText className="w-6 h-6" />
                TIN TỨC
              </h2>
              <div className="grid grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((_, index) => (
                  <div key={index} className="space-y-3">
                    <div className="aspect-[16/9] relative rounded-lg overflow-hidden">
                      <Image
                        src="/images/news/thongbao.jpg"
                        alt="Thông báo lịch nghỉ Tết"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <a href="#" className="block group">
                      <h3 className="font-medium group-hover:text-blue-600">
                        Thông báo lịch nghỉ Tết Dương lịch và Tết Nguyên đán Giáp
                        Thìn 2024
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">06/12/2024</p>
                    </a>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <a href="#" className="text-blue-600 hover:underline text-sm">
                  Xem thêm
                </a>
              </div>
            </div>
          </div>

          {/* Right section - 1/3 width */}
          <div className="col-span-1 space-y-6">
            {/* Documents section */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-blue-600">
                <FileText className="w-6 h-6" />
                CÔNG VĂN MỚI NHẤT
              </h2>

              {documentLoading ? (
                <div>Đang tải...</div>
              ) : (
                <Tabs
                  defaultValue="incoming"
                  className="w-full"
                  onValueChange={(value) =>
                    setActiveTab(value as "incoming" | "outgoing")
                  }
                >
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="incoming">Công văn đến</TabsTrigger>
                    <TabsTrigger value="outgoing">Công văn đi</TabsTrigger>
                  </TabsList>

                  <TabsContent value="incoming" className="space-y-4">
                    {recentIncoming.slice(0, 7).map((doc) => (
                      <div key={doc.documentId} className="border-b pb-3">
                        <a href="#" className="group">
                          <h3 className="font-medium group-hover:text-blue-600">
                            {doc.title}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {formatDateTime(doc.createdAt)}
                          </p>
                        </a>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="outgoing" className="space-y-4">
                    {recentOutgoing.slice(0, 7).map((doc) => (
                      <div key={doc.documentId} className="border-b pb-3">
                        <a href="#" className="group">
                          <h3 className="font-medium group-hover:text-blue-600">
                            {doc.title}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {formatDateTime(doc.createdAt)}
                          </p>
                        </a>
                      </div>
                    ))}
                  </TabsContent>

                  <div className="mt-6 text-center">
                    <a
                      href={
                        activeTab === "incoming"
                          ? "/incoming-documents"
                          : "/outgoing-documents"
                      }
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Xem tất cả công văn{" "}
                      {activeTab === "incoming" ? "đến" : "đi"}
                    </a>
                  </div>
                </Tabs>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function QuickAccessCard({
  title,
  icon,
  href,
}: {
  title: string;
  icon: React.ReactNode;
  href: string;
}) {
  return (
    <a
      href={href}
      className="block p-6 bg-white rounded-lg shadow 
        hover:bg-blue-50 hover:scale-105 
        active:scale-95
        transform transition-all duration-200 ease-in-out"
    >
      <div className="text-blue-600 mb-4">{icon}</div>
      <h3 className="font-semibold">{title}</h3>
    </a>
  );
}
