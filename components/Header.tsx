"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/store";
import { clearAuth } from "@/store/slices/authSlice";
import { createClient } from "@/utils/supabase/client";

import { Logout } from "./Logout";

export default function Header() {
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
      <header className="flex items-center justify-center md:justify-between w-full px-12 py-4 bg-card border-b border-border">
        <div className="flex items-center gap-4">
          {/* Brand */}
          <Link href="/" className="text-lg font-semibold uppercase">
            <div className="flex justify-center items-end">
              <Image
                src="/logo-250-31.png"
                alt="MyDynastyHub Logo"
                width={250}
                height={31}
                priority
              />
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
  );
}
