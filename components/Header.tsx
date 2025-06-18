"use client";

import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { RootState } from "@/store";
import { clearAuth } from "@/store/slices/authSlice";
import { createClient } from "@/utils/supabase/client";

import { Logout } from "./Logout";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const displayName = useSelector((state: RootState) => state.auth.displayName);
  const supabase = createClient();
  const dispatch = useDispatch();
  const router = useRouter();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    dispatch(clearAuth());
    router.push("/login");
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <header className="flex items-center justify-between w-full px-12 py-4 h-[68px] bg-card border-b border-border">
        <div className="flex items-center gap-4">
          {/* Brand */}
          <Link href="/" className="text-lg font-semibold uppercase">
            <div className="flex justify-center items-end">
              <Image
                src="/logo-250-30.png"
                alt="MyDynastyHub Logo"
                width={250}
                height={29}
                priority
              />
              <span className="text-[#3ecf8e] uppercase text-xs ml-2 mb-[1px]">
                beta
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden sm:flex items-center space-x-6">
          {hasMounted && displayName && (
            <Logout displayName={displayName} logout={handleLogout} />
          )}
        </div>
      </header>
    </div>
  );
}
