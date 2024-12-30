import Image from "next/image";
import { RegisterForm } from "./components/register-form";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#E9EEEE] to-[#BAC2C2] flex items-center justify-center p-4">
        <div className="flex w-full max-w-5xl h-[550px] overflow-hidden rounded-2xl bg-white shadow-[4px_4px_10px_rgba(0,0,0,0.4)] mt-5 mb-5">
            <div className="flex-1 flex items-center justify-center p-8">
                <RegisterForm />
            </div>
            <div className="hidden w-1/3 bg-[#E74C3C] lg:flex flex-col items-center justify-center p-8">
                <div className="relative w-32 h-32 rounded-full bg-white flex items-center justify-center mb-4">
                    <Image
                    src="/images/logo/logo.webp"
                    alt="TDT Logo"
                    width={100}
                    height={100}
                    className="object-contain"
                    />
                </div>
                <h2 className="text-2xl font-medium text-white text-center italic font-inriaSans">
                    Hệ thống công văn
                </h2>
            </div>
        </div>
    </div>
  );
}
