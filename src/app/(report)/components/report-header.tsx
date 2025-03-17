import ThemeToggle from "@/app/components/theme-toggle";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

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
            src="/id-logo.png"
            alt="InboxDoctor Logo"
            fill
            className="w-full h-full object-contain dark:block hidden"
          />
          <Image
            src="/id-logo-full-black.png"
            alt="InboxDoctor Logo"
            fill
            className="w-full h-full object-contain dark:hidden"
          />
        </Link>
        <div className="flex items-center gap-2">
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
      </Container>
    </header>
  );
};

export default PublicNavbar;
