"use client";

import { Button, IconButton } from "@mui/material";
import { Close, Menu, Login } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();
  const [showNavbar, setShowNavbar] = useState<boolean>(true);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [userMenuOpen, setUserMenuOpen] = useState<boolean>(false);
  const prevScrollPos = useRef<number>(0);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    prevScrollPos.current = window.scrollY;

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setShowNavbar(
        prevScrollPos.current > currentScrollPos || currentScrollPos < 10
      );
      prevScrollPos.current = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleUserMenu = () => {
    setUserMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    function closeWhenClickedOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
        document.removeEventListener("click", closeWhenClickedOutside);
      }
    }

    if (userMenuOpen) {
      document.addEventListener("click", closeWhenClickedOutside);
    }

    return () => {
      document.removeEventListener("click", closeWhenClickedOutside);
    };
  }, [userMenuOpen]);

  return (
    <header
  className={`flex justify-between items-center px-4 md:px-8 py-2 fixed w-full bg-white shadow z-10 transition-all duration-300 ${
    showNavbar ? "top-0" : "-top-16"
  }`}
>

      {/* Logo */}
      <div className="flex items-center justify-center gap-2">
        <div
          className="menubar block md:hidden"
          onClick={() => {
            setMenuOpen(true);
          }}
        >
          <IconButton
            aria-label="menu"
            sx={{
              color: "inherit",
            }}
          >
            <Menu />
          </IconButton>
        </div>
        <div className="logo gap-2">
          <Link
            href="/"
            className={`logo-link flex items-center jusify-center gap-2 text-lg sm:text-2xl font-bold `}
          >
            <Image src="/logo.png" alt="Logo" width={32} height={32} />
            AptResume
          </Link>
        </div>
      </div>

      <div className="flex gap-4">
        {/* Navbar */}
        <nav
          className={`navbar fixed top-0 left-0 h-screen min-w-75 bg-gray-50 shadow z-14 transition transition-transform  ease-in-out ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          } 
        md:relative md:h-auto md:bg-tranparent md:shadow-none md:w-auto md:bg-transparent md:translate-x-0 md:border-none`}
        >
          <div className="flex items-center gap-2 p-2 border-b border-gray-200 block md:hidden">
            <div
              className="closemenu"
              onClick={() => {
                setMenuOpen(false);
              }}
            >
              <IconButton aria-label="close-menu" sx={{ color: "inherit" }}>
                <Close />
              </IconButton>
            </div>
            <div className="logo gap-2">
              <Link
                href="/"
                className={`logo-link flex items-center jusify-center gap-2 text-lg sm:text-2xl text-black font-bold`}
              >
                <Image src="/logo.png" alt="Logo" width={32} height={32} />
                AptResume
              </Link>
            </div>
          </div>

          <ul
            className={`nav-list flex flex-col text-black md:flex-row md:items-center mt-4 md:gap-4 md:m-0`}
          >
            <li className="list-items">
              <Link
                href="/job-finder"
                className="nav-link text-[16px] block py-2 px-4 hover:bg-gray-200 md:hover:bg-transparent"
              >
                Job Finder
              </Link>
            </li>
            <li className="list-items">
              <Link
                href="/resume-scan"
                className="nav-link text-[16px] block py-2 px-4 hover:bg-gray-200 md:hover:bg-transparent"
              >
                Resume Scan
              </Link>
            </li>
            <li className="list-items">
              <Link
                href="/keyword-matcher"
                className="nav-link text-[16px] block py-2 px-4 hover:bg-gray-200 md:hover:bg-transparent"
              >
                Keyword Matcher
              </Link>
            </li>
          </ul>
        </nav>

        {!session ? (
          // Signin Button
          <div className="flex items-center gap-2">
            <Link href="/auth/signin">
              <Button
                variant="contained"
                color="primary"
                startIcon={<Login />}
                sx={{ textTransform: "none" }}
              >
                Sign In
              </Button>
            </Link>
          </div>
        ) : (
          // User Profile
          <div className="user">
            <div
              className="user-avatar"
              ref={menuRef}
              onClick={() => toggleUserMenu()}
            >
              {session.user?.image ? (
                <Image
                  src={session.user.image}
                  alt="User Profile"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ) : (
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-700">
                    {session.user?.name?.charAt(0) || "U"}
                  </span>
                </div>
              )}
            </div>

            {/* User Menu */}
            {userMenuOpen && (
              <div className="user-menu absolute right-0 ">
                <ul className="bg-white shadow-md rounded-md overflow-hidden text-sm border border-gray-200">
                  <li>
                    {session.user?.name && (
                      <div className="px-4 py-2 text-gray-700">
                        <strong>{session.user.name}</strong>
                        <br />
                        <span className="text-gray-500">
                          {session.user.email}
                        </span>
                      </div>
                    )}
                  </li>
                  <li className="menu-list">
                    <Link
                      href="/auth/signout"
                      className="block px-4 py-2 hover:bg-red-100 text-red-600"
                    >
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
      <div
        className={`fixed top-0 left-0 w-full h-screen z-9 transition-opacity ${
          menuOpen ? "bg-gray-950/95" : " opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      ></div>
    </header>
  );
};

export default Header;
