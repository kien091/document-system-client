"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";
import { LoginRequest, User, RegisterRequest } from "@/types/auth";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const user = authService.getCurrentUser();
    setUser(user);
    setLoading(false);
  }, []);

  const login = async (data: LoginRequest) => {
    try {
      const response = await authService.login(data);
      setUser({
        id: response.id,
        username: response.username,
        email: response.email,
        role: response.role,
      });
      router.push("/dashboard");
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      throw new Error(err.response?.data?.message || "Đăng nhập thất bại");
    }
  };

  const register = async (data: RegisterRequest) => {
    try {
      await authService.register(data);
      // Không setUser vì người dùng cần được admin phê duyệt
      // Không redirect vì sẽ hiển thị modal thông báo
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      throw new Error(err.response?.data?.message || "Đăng ký thất bại");
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
