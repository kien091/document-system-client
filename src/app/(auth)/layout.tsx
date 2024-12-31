"use client"

import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e9eeee] to-[#bac2c2] flex items-center justify-center p-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, x: pathname === "/login" ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: pathname === "/login" ? 20 : -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex w-full max-w-4xl h-[600px] overflow-hidden rounded-2xl bg-white shadow-[4px_4px_10px_rgba(0,0,0,0.2)]"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
