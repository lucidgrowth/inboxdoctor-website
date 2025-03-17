import React from "react";
import NavBar from "../components/nav-bar";
import Footer from "../components/footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div>
        <NavBar />
        {children}
        <Footer />
      </div>
  );
}
