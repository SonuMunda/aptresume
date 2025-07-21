"use client";

import { Button, IconButton, Skeleton } from "@mui/material";
import { Close, Menu, Login } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { indigo } from "@mui/material/colors";

const Header = () => {
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleUserMenu = () => {
    setUserMenuOpen((prev) => !prev);
  };

  const pages = [
    { href: "/find-job", label: "Find Job" },
    { href: "/resume-scan", label: "Resume Scan" },
    { href: "/match-keywords", label: "Keyword Matcher" },
    { href: "/resume-builder", label: "Resume Builder" },
  ];

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
      className={`flex justify-between items-center px-2 md:px-8 py-1 fixed top-0 left-0 w-full bg-white shadow shadow-lg z-10 transition-all duration-300`}
    >
      {/* Logo */}
      <div className="flex items-center justify-center gap-1">
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

      {/* Navbar */}
      <nav
        className={`navbar fixed top-0 left-0 h-screen min-w-75 bg-gray-50 shadow z-14 transition transition-transform  ease-in-out ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } 
        md:relative md:h-auto md:bg-tranparent md:shadow-none md:w-auto md:bg-transparent md:translate-x-0 md:border-none`}
      >
        <div className="flex items-center gap-1 p-1 border-b border-gray-200 block md:hidden">
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
          <div className="logo gap-2" onClick={() => setMenuOpen(false)}>
            <Link
              href="/"
              className={`logo-link flex items-center jusify-center gap-2 text-xl sm:text-2xl text-black font-bold`}
            >
              <Image src="/logo.png" alt="Logo" width={32} height={32} />
              AptResume
            </Link>
          </div>
        </div>

        <ul className="nav-list flex flex-col text-black md:flex-row md:items-center mt-4 p-2 md:p-0 md:m-0">
          {pages.map(({ href, label }) => (
            <li
              key={href}
              className="nav-list-item"
              onClick={() => setMenuOpen(false)}
            >
              <Link
                href={href}
                className="nav-link text-[16px] block md:mx-2 p-2 hover:bg-indigo-100 md:hover:bg-transparent md:hover:text-indigo-900"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {status === "loading" ? (
        <Skeleton variant="circular" width={40} height={40} />
      ) : status === "unauthenticated" ? (
        <div className="flex items-center gap-2">
          <Link href="/auth/signin">
            <Button
              variant="contained"
              color="primary"
              startIcon={<Login />}
              sx={{
                textTransform: "none",
                backgroundColor: indigo[600],
              }}
            >
              Sign In
            </Button>
          </Link>
        </div>
      ) : (
        <div className="user cursor-pointer">
          <div
            className="user-avatar"
            ref={menuRef}
            onClick={() => toggleUserMenu()}
          >
            {session?.user?.image ? (
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
                  {session?.user?.name?.charAt(0)}
                </span>
              </div>
            )}
          </div>

          {/* User Menu */}
          {userMenuOpen && (
            <div className="user-menu absolute right-0 bg-white shadow-md rounded-md overflow-hidden text-sm border border-gray-200">
              <ul className="menu">
                <li>
                  <div className="px-4 py-2 text-gray-700">
                    <strong>{session?.user?.name}</strong>
                    <br />
                    <span className="text-gray-500">
                      {session?.user?.email}
                    </span>
                  </div>
                </li>
                <li className="menu-list">
                  <Button
                    variant="text"
                    onClick={() => signOut()}
                    sx={{
                      color: "red",
                      padding: "0.5rem 1rem",
                      display: "block",
                      width: "100%",
                      textTransform: "capitalize",
                      "&:hover": {
                        backgroundColor: "#fee6dc",
                      },
                    }}
                  >
                    Sign Out
                  </Button>
                </li>
              </ul>
            </div>
          )}
        </div>
      )}

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
