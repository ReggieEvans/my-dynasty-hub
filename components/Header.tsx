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
  const links = [{ href: "/home", label: "Home" }];
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
      <header className="flex items-center justify-between w-full px-12 py-4 bg-card border-b border-border">
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="sm:hidden">
              <Button variant="ghost" size="icon" aria-label="Menu">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="space-y-6 p-6 bg-background">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>

              <div className="space-y-2">
                {links.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className={`block text-sm font-medium ${
                      pathname === href
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {label}
                  </Link>
                ))}
              </div>

              <Button
                variant="destructive"
                className="w-full"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </SheetContent>
          </Sheet>

          {/* Brand */}
          <Link href="/home" className="text-lg font-semibold uppercase">
            <div className="flex justify-center items-end">
              <Image
                src="/logo-250-29.png"
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
          {/* {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-medium hover:underline ${
                pathname === href ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {label}
            </Link>
          ))} */}
          {/* <ThemeToggle /> */}
          {hasMounted && displayName && (
            <Logout displayName={displayName} logout={handleLogout} />
          )}
        </div>
      </header>
    </div>
  );
}
