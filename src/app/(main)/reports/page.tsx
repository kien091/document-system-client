"use client";
import {
  BarChart3,
  TrendingUp,
  Users,
  FileText,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Filter,
  RotateCcw,
  Check,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import * as XLSX from "xlsx";
import { useState } from "react";

// Thêm state và interface
interface ReportFilters {
  dateRange: string;
  documentType: string;
  status: string;
}

export default function ReportsPage() {
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState<ReportFilters>({
    dateRange: "all",
    documentType: "all",
    status: "all",
  });

  // Mock data cho biểu đồ
  const monthlyData = [
    { name: "T1", "Công văn đến": 40, "Công văn đi": 24 },
    { name: "T2", "Công văn đến": 30, "Công văn đi": 13 },
    { name: "T3", "Công văn đến": 20, "Công văn đi": 38 },
    { name: "T4", "Công văn đến": 27, "Công văn đi": 39 },
    { name: "T5", "Công văn đến": 18, "Công văn đi": 48 },
    { name: "T6", "Công văn đến": 23, "Công văn đi": 38 },
    { name: "T7", "Công văn đến": 34, "Công văn đi": 43 },
  ];

  const dailyData = [
    { name: "T2", value: 10 },
    { name: "T3", value: 15 },
    { name: "T4", value: 8 },
    { name: "T5", value: 12 },
    { name: "T6", value: 20 },
    { name: "T7", value: 5 },
    { name: "CN", value: 0 },
  ];

  // Thêm data cho biểu đồ tròn
  const documentTypeData = [
    { name: "Công văn đến", value: 1210, color: "#3b82f6" },
    { name: "Công văn đi", value: 1150, color: "#ef4444" },
    { name: "Công văn nội bộ", value: 60, color: "#22c55e" },
  ];

  // Thêm data cho trạng thái xử lý
  const statusData = [
    { name: "Chưa xử lý", value: 245, color: "#f59e0b" },
    { name: "Đang xử lý", value: 532, color: "#3b82f6" },
    { name: "Đã hoàn thành", value: 1643, color: "#22c55e" },
  ];

  const handleExportReport = () => {
    // Tạo dữ liệu cho báo cáo
    const reportData = [
      // Sheet 1: Tổng quan
      {
        sheetName: "Tổng quan",
        data: [
          ["Báo cáo thống kê công văn", "", "", "", ""],
          ["Thời gian xuất báo cáo:", new Date().toLocaleString(), "", "", ""],
          ["", "", "", "", ""],
          ["Chỉ số", "Số lượng", "Tỷ lệ", "So với tháng trước", ""],
          ["Tổng công văn", "2,420", "100%", "+12.5%", ""],
          ["Công văn đến", "1,210", "50%", "+8.1%", ""],
          ["Công văn đi", "1,150", "47.5%", "-2.4%", ""],
          ["Công văn nội bộ", "60", "2.5%", "+5.2%", ""],
        ],
      },
      // Sheet 2: Chi tiết trạng thái
      {
        sheetName: "Trạng thái xử lý",
        data: [
          [
            "Loại công văn",
            "Tổng số",
            "Chưa xử lý",
            "Đang xử lý",
            "Đã hoàn thành",
          ],
          ["Công văn đến", "1,210", "120", "290", "800"],
          ["Công văn đi", "1,150", "95", "212", "843"],
          ["Công văn nội bộ", "60", "30", "30", "0"],
          ["Tổng cộng", "2,420", "245", "532", "1,643"],
        ],
      },
      // Sheet 3: Thống kê theo tháng
      {
        sheetName: "Thống kê theo tháng",
        data: [
          ["Tháng", "Công văn đến", "Công văn đi", "Tổng"],
          ...monthlyData.map((item) => [
            item.name,
            item["Công văn đến"],
            item["Công văn đi"],
            item["Công văn đến"] + item["Công văn đi"],
          ]),
        ],
      },
    ];

    // Tạo workbook mới
    const wb = XLSX.utils.book_new();

    // Thêm từng sheet vào workbook
    reportData.forEach((sheet) => {
      const ws = XLSX.utils.aoa_to_sheet(sheet.data);
      XLSX.utils.book_append_sheet(wb, ws, sheet.sheetName);
    });

    // Tạo style cho các sheet
    reportData.forEach((sheet) => {
      const ws = wb.Sheets[sheet.sheetName];

      // Thiết lập độ rộng cột
      const columnWidths = [
        { wch: 20 }, // A
        { wch: 15 }, // B
        { wch: 15 }, // C
        { wch: 15 }, // D
        { wch: 15 }, // E
      ];
      ws["!cols"] = columnWidths;
    });

    // Xuất file
    const fileName = `Báo_cáo_thống_kê_${
      new Date().toISOString().split("T")[0]
    }.xlsx`;
    XLSX.writeFile(wb, fileName);
  };

  // Filter section component
  const FilterSection = () => {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Thời gian */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Thời gian
            </label>
            <select
              value={filters.dateRange}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, dateRange: e.target.value }))
              }
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="all">Tất cả thời gian</option>
              <option value="today">Hôm nay</option>
              <option value="week">7 ngày qua</option>
              <option value="month">30 ngày qua</option>
              <option value="quarter">3 tháng qua</option>
              <option value="year">Năm nay</option>
            </select>
          </div>

          {/* Loại công văn */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Loại công văn
            </label>
            <select
              value={filters.documentType}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  documentType: e.target.value,
                }))
              }
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="all">Tất cả loại</option>
              <option value="incoming">Công văn đến</option>
              <option value="outgoing">Công văn đi</option>
              <option value="internal">Công văn nội bộ</option>
            </select>
          </div>

          {/* Trạng thái */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Trạng thái xử lý
            </label>
            <select
              value={filters.status}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, status: e.target.value }))
              }
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="pending">Chưa xử lý</option>
              <option value="processing">Đang xử lý</option>
              <option value="completed">Đã hoàn thành</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={() =>
              setFilters({
                dateRange: "all",
                documentType: "all",
                status: "all",
              })
            }
            className="px-4 py-2 text-gray-600 hover:text-gray-800 flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Đặt lại
          </button>
          <button
            onClick={() => setShowFilter(false)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            Áp dụng
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Báo cáo & Thống kê</h1>
        <div className="flex gap-3">
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            <Filter className="w-4 h-4" />
            Bộ lọc
          </button>
          <button
            onClick={handleExportReport}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            <Download className="w-4 h-4" />
            Xuất báo cáo
          </button>
        </div>
      </div>

      {/* Show Filter Section */}
      {showFilter && <FilterSection />}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Tổng công văn"
          value="2,420"
          trend="+12.5%"
          isPositive={true}
          icon={<FileText className="w-6 h-6" />}
        />
        <StatCard
          title="Công văn đến"
          value="1,210"
          trend="+8.1%"
          isPositive={true}
          icon={<TrendingUp className="w-6 h-6" />}
        />
        <StatCard
          title="Công văn đi"
          value="1,150"
          trend="-2.4%"
          isPositive={false}
          icon={<BarChart3 className="w-6 h-6" />}
        />
        <StatCard
          title="Người dùng"
          value="245"
          trend="+4.7%"
          isPositive={true}
          icon={<Users className="w-6 h-6" />}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Thống kê theo tháng</h2>
            <select className="border rounded-lg px-3 py-1">
              <option>7 ngày qua</option>
              <option>30 ngày qua</option>
              <option>3 tháng qua</option>
            </select>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Công văn đến" fill="#3b82f6" />
                <Bar dataKey="Công văn đi" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Daily Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Hoạt động hàng ngày</h2>
            <select className="border rounded-lg px-3 py-1">
              <option>Tuần này</option>
              <option>Tuần trước</option>
            </select>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#3b82f6"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Thêm row mới cho biểu đồ tròn */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Document Types Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Phân loại công văn</h2>
          </div>
          <div className="h-80 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={documentTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {documentTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Trạng thái xử lý</h2>
          </div>
          <div className="h-80 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Thêm bảng thống kê chi tiết */}
      <div className="mt-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Thống kê chi tiết</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Loại công văn
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tổng số
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Chưa xử lý
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Đang xử lý
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Đã hoàn thành
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">Công văn đến</td>
                  <td className="px-6 py-4 whitespace-nowrap">1,210</td>
                  <td className="px-6 py-4 whitespace-nowrap">120</td>
                  <td className="px-6 py-4 whitespace-nowrap">290</td>
                  <td className="px-6 py-4 whitespace-nowrap">800</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">Công văn đi</td>
                  <td className="px-6 py-4 whitespace-nowrap">1,150</td>
                  <td className="px-6 py-4 whitespace-nowrap">95</td>
                  <td className="px-6 py-4 whitespace-nowrap">212</td>
                  <td className="px-6 py-4 whitespace-nowrap">843</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    Công văn nội bộ
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">60</td>
                  <td className="px-6 py-4 whitespace-nowrap">30</td>
                  <td className="px-6 py-4 whitespace-nowrap">30</td>
                  <td className="px-6 py-4 whitespace-nowrap">0</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// Component cho thẻ thống kê
function StatCard({
  title,
  value,
  trend,
  isPositive,
  icon,
}: {
  title: string;
  value: string;
  trend: string;
  isPositive: boolean;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="text-2xl font-semibold mt-1">{value}</h3>
        </div>
        <div className="p-2 bg-blue-50 rounded-lg">{icon}</div>
      </div>
      <div className="flex items-center gap-1 mt-2">
        {isPositive ? (
          <ArrowUpRight className="w-4 h-4 text-green-500" />
        ) : (
          <ArrowDownRight className="w-4 h-4 text-red-500" />
        )}
        <span
          className={`text-sm ${
            isPositive ? "text-green-500" : "text-red-500"
          }`}
        >
          {trend}
        </span>
        <span className="text-sm text-gray-500">so với tháng trước</span>
      </div>
    </div>
  );
}
