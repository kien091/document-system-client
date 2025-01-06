"use client";

import { createContext, useState, useCallback, useContext } from "react";
import { Department } from "@/types/department";
import { departmentService } from "@/services/department.service";

interface DepartmentContextType {
  department: Department | null;
  loading: boolean;
  error: string | null;
  fetchDepartment: (id: string) => Promise<void>;
}

const DepartmentContext = createContext<DepartmentContextType>(
  {} as DepartmentContextType
);

export function DepartmentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [department, setDepartment] = useState<Department | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDepartment = useCallback(async (id: string) => {
    try {
      setLoading(true);
      const response = await departmentService.getDepartment(id);
      setDepartment(response.data);
    } catch (error) {
      setError(
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "An error occurred"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <DepartmentContext.Provider
      value={{ department, loading, error, fetchDepartment }}
    >
      {children}
    </DepartmentContext.Provider>
  );
}

export function useDepartment() {
  const context = useContext(DepartmentContext);
  if (context === undefined) {
    throw new Error("useDepartment must be used within a DepartmentProvider");
  }
  return context;
}
