export function Loading() {
  return (
    <div className="fixed inset-0 bg-black/25 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative">
        {/* Outer ring */}
        <div className="w-16 h-16 rounded-full border-4 border-[#E74C3C]/30 border-t-[#E74C3C] animate-spin" />

        {/* Inner ring */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-8 h-8 rounded-full border-4 border-[#E74C3C]/30 border-b-[#E74C3C] animate-spin" />
        </div>

        {/* Loading text */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
          <p className="text-[#E74C3C] font-medium">Đang xử lý...</p>
        </div>
      </div>
    </div>
  );
}
