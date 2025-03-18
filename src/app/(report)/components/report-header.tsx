"use client";

import ThemeToggle from "@/app/components/theme-toggle";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useTheme } from "@/providers/theme-provider";
import { ArrowUpRight, MenuIcon, X } from "lucide-react";

const BASE_APP_URL = "https://app.inboxdoctor.ai";

const PublicNavbar = () => {
  return (
    <header className="flex sticky top-0 bg-background h-16  z-40">
      <Container className="px-4 !py-0 md:px-6 lg:px-6 shrink-0 flex items-center justify-between gap-2">
        <Link
          href="/"
          className="flex items-center space-x-2 relative h-[40px] lg:h-[50px] w-[150px] lg:w-[200px]"
        >
          <Image
            src="/id_full_logo_white.png"
            alt="InboxDoctor Logo"
            fill
            className="w-full h-full object-contain dark:block hidden"
          />
          <Image
            src="/id_full_logo_black.png"
            alt="InboxDoctor Logo"
            fill
            className="w-full h-full object-contain dark:hidden"
          />
        </Link>
        <div className="items-center gap-2 hidden sm:flex">
          <ThemeToggle />
          <Link
            href={`${BASE_APP_URL}/signin`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline">Login</Button>
          </Link>
          <Link
            href={`${BASE_APP_URL}/sign-up`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button>Sign Up</Button>
          </Link>
        </div>
        <MobileRightContent />
      </Container>
    </header>
  );
};

const MobileRightContent = () => {
  const { theme } = useTheme();
  return (
    <Sheet>
      <SheetTrigger className="sm:hidden text-foreground">
        <MenuIcon className="w-6 h-6" />
      </SheetTrigger>
      <SheetContent
        className={cn("p-0", theme === "dark" ? "dark" : "")}
        side="top"
        showClose={false}
      >
        <div className="px-4 !py-0 md:px-6 lg:px-6 shrink-0 flex items-center justify-between gap-2 w-full">
          <SheetHeader className="bg-background h-16 w-full flex flex-row items-center justify-between gap-2 relative space-y-0">
            <SheetTitle>
              <Link
                href="/"
                className="flex items-center relative h-[40px] lg:h-[50px] w-[150px] lg:w-[200px]"
              >
                <Image
                  src="/id_full_logo_white.png"
                  alt="InboxDoctor Logo"
                  fill
                  className="w-full h-full object-contain dark:block hidden"
                />
                <Image
                  src="/id_full_logo_black.png"
                  alt="InboxDoctor Logo"
                  fill
                  className="w-full h-full object-contain dark:hidden"
                />
              </Link>
            </SheetTitle>
            <SheetClose className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary text-foreground">
              <X className="w-6 h-6" />
            </SheetClose>
          </SheetHeader>
        </div>
        <ul className="px-4 !py-0 md:px-6 lg:px-6 border-t divide-y text-foreground">
          <li className="flex items-center justify-between py-2">
            <span>Toggle Theme</span>
            <ThemeToggle />
          </li>
          <li className="flex items-center justify-between py-3">
            <Link
              href={`${BASE_APP_URL}/signin`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:underline"
            >
              Login
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </li>
          <li className="flex items-center justify-between py-3">
            <Link
              href={`${BASE_APP_URL}/sign-up`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:underline"
            >
              Sign Up
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </li>
        </ul>
      </SheetContent>
    </Sheet>
  );
};
export default PublicNavbar;
