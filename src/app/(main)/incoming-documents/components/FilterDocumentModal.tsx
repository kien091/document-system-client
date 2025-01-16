import { X } from "lucide-react";
import {
  UrgencyLevel,
  DocumentStatus,
  SecretLevel,
  DocumentFilterParams,
} from "@/types/document";
import { useDocuments } from "@/contexts/document.context";
import { useMemo, useEffect, useState } from "react";
import { debounce } from "lodash";

interface FilterDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FilterDocumentModal({
  isOpen,
  onClose,
}: FilterDocumentModalProps) {
  const today = new Date().toISOString().split("T")[0];

  const { suggestAgencyUnits, filterDocuments } = useDocuments();
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<DocumentStatus | "">("");
  const [filterData, setFilterData] = useState<DocumentFilterParams>({
    type: "INCOMING",
    agencyUnit: "",
    status: undefined,
    urgencyLevel: undefined,
    secretLevel: undefined,
    startDate: today,
    endDate: today,
    page: 0,
    size: 7,
  });

  const debouncedSearch = useMemo(
    () =>
      debounce(async (term: string) => {
        if (term.trim() === "") {
          setSuggestions([]);
          return;
        }
        const result = await suggestAgencyUnits(term);
        setSuggestions(result || []);
      }, 300),
    [suggestAgencyUnits]
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleApply = async () => {
    const formattedData = {
      ...filterData,
      startDate: filterData.startDate
        ? `${filterData.startDate}T00:00:00`
        : undefined,
      endDate: filterData.endDate
        ? `${filterData.endDate}T23:59:59`
        : undefined,
    };

    const cleanedParams = {
      type: "INCOMING",
      ...Object.fromEntries(
        Object.entries(formattedData).filter(([v]) => v !== undefined)
      ),
    };

    await filterDocuments(cleanedParams as DocumentFilterParams);
    onClose();
  };

  const handleReset = () => {
    setFilterData({
      type: "INCOMING",
      page: 0,
      size: 7,
    });
    setSearchTerm("");
    setSelectedStatus("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-[420px] flex flex-col shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center p-3 border-b shrink-0">
          <h2 className="text-base font-medium">Lọc công văn</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Filter Content */}
        <div className="p-4 overflow-y-auto">
          <div className="space-y-4">
            <div>
              <label className="block text-xs mb-1">Đơn vị</label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full border rounded-lg py-1 px-2 text-xs"
                  placeholder="Nhập tên đơn vị..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    debouncedSearch(e.target.value);
                  }}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => {
                    // Delay hiding suggestions to allow clicking on them
                    setTimeout(() => setIsFocused(false), 200);
                  }}
                />
                {isFocused && suggestions?.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-48 overflow-y-auto">
                    {suggestions.map((agency, index) => (
                      <div
                        key={index}
                        className="px-2 py-2 text-xs hover:bg-gray-100 cursor-pointer"
                        onMouseDown={(e) => {
                          e.preventDefault();
                        }}
                        onClick={() => {
                          setSearchTerm(agency);
                          setSuggestions([]);
                          setIsFocused(false);
                          setFilterData((prev) => ({
                            ...prev,
                            agencyUnit: agency,
                          }));
                        }}
                      >
                        {agency}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs mb-1">Trạng thái</label>
              <select
                value={selectedStatus}
                onChange={(e) =>
                  setSelectedStatus(e.target.value as DocumentStatus)
                }
                className="w-full border rounded-lg py-1 px-2 text-xs"
              >
                <option value="">Tất cả trạng thái</option>
                <option value={DocumentStatus.PENDING}>Mới</option>
                <option value={DocumentStatus.PROCESSING}>Đang xử lý</option>
                <option value={DocumentStatus.COMPLETED}>Đã hoàn thành</option>
              </select>
            </div>

            <div>
              <label className="block text-xs mb-1">Mức độ khẩn cấp</label>
              <select
                value={filterData.urgencyLevel}
                onChange={(e) =>
                  setFilterData((prev) => ({
                    ...prev,
                    urgencyLevel: (e.target.value as UrgencyLevel) || undefined,
                  }))
                }
                className="w-full border rounded-lg py-1 px-2 text-xs"
              >
                <option value="">Tất cả mức độ</option>
                <option value={UrgencyLevel.NORMAL}>Bình thường</option>
                <option value={UrgencyLevel.IMPORTANT}>Khẩn</option>
              </select>
            </div>

            <div>
              <label className="block text-xs mb-1">Mức độ bảo mật</label>
              <select
                value={filterData.secretLevel}
                onChange={(e) =>
                  setFilterData((prev) => ({
                    ...prev,
                    secretLevel: (e.target.value as SecretLevel) || undefined,
                  }))
                }
                className="w-full border rounded-lg py-1 px-2 text-xs"
              >
                <option value="">Tất cả mức độ</option>
                <option value={SecretLevel.LOW}>Thấp</option>
                <option value={SecretLevel.MEDIUM}>Trung bình</option>
                <option value={SecretLevel.HIGH}>Cao</option>
              </select>
            </div>

            <div>
              <label className="block text-xs mb-1">Thời gian nhận/gửi</label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <input
                    type="date"
                    className="w-full border rounded-lg py-1 px-2 text-xs"
                    placeholder="Từ ngày"
                    value={filterData.startDate || ""}
                    onChange={(e) =>
                      setFilterData((prev) => ({
                        ...prev,
                        startDate: e.target.value || undefined,
                      }))
                    }
                  />
                </div>
                <div>
                  <input
                    type="date"
                    className="w-full border rounded-lg py-1 px-2 text-xs"
                    placeholder="Đến ngày"
                    value={filterData.endDate || ""}
                    onChange={(e) =>
                      setFilterData((prev) => ({
                        ...prev,
                        endDate: e.target.value || undefined,
                      }))
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 p-3 border-t shrink-0">
          <button
            onClick={handleReset}
            className="px-3 py-1 border rounded-lg hover:bg-gray-50 text-xs"
          >
            Đặt lại
          </button>
          <button
            onClick={handleApply}
            className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-xs"
          >
            Áp dụng
          </button>
        </div>
      </div>
    </div>
  );
}
