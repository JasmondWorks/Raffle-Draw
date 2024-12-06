"use client";

import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FiLogOut, FiMenu } from "react-icons/fi";
import { IoIosClose } from "react-icons/io";

export default function Navbar() {
  const { user, isAuthenticating } = useAuth();
  const [isShowing, setIsShowing] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsShowing(false);
  }, [pathname]);

  if (isAuthenticating) return null;

  function handleToggleSideNav() {
    setIsShowing((cur) => !cur);
  }

  if (user)
    return (
      <div>
        <SidebarNav isShowing={isShowing} onHideSideNav={handleToggleSideNav} />
        <div className="z-50 shadow-sm fixed top-0 left-0 right-0 bg-white whitespace-nowrap h-14 flex items-center">
          <div className="container flex justify-between items-center">
            <div className="text-sm font-bold text-neutral-600">
              YOUR <span className="text-indigo-600">SPINNER</span>
            </div>
            {/* Desktop Navigation */}
            <nav className="text-sm font-medium gap-8 hidden md:flex">
              <Link href="#">Home</Link>
              <Link href="/user">Events</Link>
              <Link href="#">Settings</Link>
            </nav>

            {/* User Profile and Menu */}
            <div className="flex gap-6 items-center text-xl">
              <Image
                className="w-8 aspect-square rounded-full"
                width={100}
                height={100}
                alt="profile image"
                src="/images/placeholder-avatar.png"
              />
              <button
                onClick={handleToggleSideNav}
                className="text-neutral-600 md:hidden"
              >
                <FiMenu />
              </button>
              <div className="hidden md:block">
                <LogoutButton showText />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

function SidebarNav({ isShowing, onHideSideNav }) {
  return (
    <>
      {/* Background Overlay */}
      <div
        onClick={onHideSideNav}
        className={`fixed inset-0 bg-black transition-opacity ${
          isShowing ? "opacity-15" : "opacity-0 pointer-events-none"
        }`}
      ></div>

      <div
        className={`fixed min-w-32 top-0 left-0 h-screen bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-[1000] p-6 py-20 flex flex-col justify-between ${
          isShowing ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col text-neutral-600 text-sm font-semibold justify-between gap-12 ">
          <button
            onClick={onHideSideNav}
            className="absolute top-2 right-2 w-full flex justify-end"
          >
            <IoIosClose className="text-3xl" />
          </button>
          <div className="text-sm font-bold text-neutral-600">
            YOUR <span className="text-indigo-600">SPINNER</span>
          </div>
          <div className="space-y-12 my-auto">
            <nav className="flex flex-col  gap-4">
              <Link href="#" onClick={onHideSideNav}>
                Home
              </Link>
              <Link href="/user" onClick={onHideSideNav}>
                Events
              </Link>
              <Link href="#" onClick={onHideSideNav}>
                Settings
              </Link>
            </nav>
            <LogoutButton showText />
          </div>
        </div>
      </div>
    </>
  );
}

function LogoutButton({ showText = false }) {
  const { logout } = useAuth();

  return (
    <button
      onClick={logout}
      className="leading-none font-sans font-semibold text-sm flex gap-3 items-center"
    >
      {showText && "Logout"}
      {<FiLogOut className="text-red-600" />}
    </button>
  );
}
