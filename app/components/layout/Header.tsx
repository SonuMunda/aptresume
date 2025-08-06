"use client";

import { Button, IconButton, Skeleton, Typography } from "@mui/material";
import { Close, Menu } from "@mui/icons-material";
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
    { href: "/resume-scan", label: "Resume Scan" },
    { href: "/extract-keywords", label: "Extract Keywords" },
    { href: "/resume-builder", label: "Resume Builder" },
    { href: "/jobs", label: "Jobs" },
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
      className={`header w-full border-b-2 border-indigo-50 fixed top-0 left-0 z-10 bg-white/50 backdrop-blur-3xl flex justify-between items-center p-2 lg:px-8 `}
    >
      <div className="container max-w-full mx-auto flex justify-between">
        {/* Logo */}
        <div className="flex items-center justify-center gap-1">
          <div
            className="menubar block lg:hidden"
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
              className={`logo-link flex items-center jusify-center gap-2  font-bold`}
            >
              <Image src="/logo.png" alt="Logo" width={32} height={32} />

              <h1 className="text-2xl font-bold text-gray-900">aptresume</h1>
            </Link>
          </div>
        </div>

        <div className="flex gap-10">
          {/* Navbar */}
          <nav
            className={`navbar fixed top-0 left-0 h-screen min-w-75 bg-gray-50 shadow z-15 transition transition-transform  ease-in-out ${
              menuOpen ? "translate-x-0" : "-translate-x-full"
            } 
        lg:relative lg:h-auto lg:bg-tranparent lg:shadow-none lg:w-auto lg:bg-transparent lg:translate-x-0 lg:border-none`}
          >
            <div className="flex items-center gap-1 p-2 border-b border-gray-200 block lg:hidden">
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
                  className={`logo-link flex items-center jusify-center gap-2  font-bold`}
                >
                  <Image src="/logo.png" alt="Logo" width={32} height={32} />

                  <h1 className="text-2xl font-bold text-gray-900">
                    aptresume
                  </h1>
                </Link>
              </div>
            </div>

            <ul className="nav-list flex flex-col text-black lg:flex-row lg:items-center mt-4 p-2 lg:p-0 lg:m-0">
              {pages.map(({ href, label }) => (
                <li
                  key={href}
                  className="nav-list-item"
                  onClick={() => setMenuOpen(false)}
                >
                  <Link
                    href={href}
                    className="nav-link text-gray-700 block lg:mx-2 p-4 lg:p-2 hover:bg-indigo-50 lg:hover:bg-transparent lg:hover:text-indigo-900"
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
                  sx={{
                    textTransform: "none",
                    backgroundColor: indigo[500],
                    borderRadius: 100,
                    "&:hover": {
                      backgroundColor: indigo[600],
                    },
                  }}
                >
                  <Typography
                    component={"span"}
                    variant="body1"
                    sx={{
                      fontSize: {
                        xs: "1rem",
                        sm: "1.2rem",
                      },
                    }}
                  >
                    Sign In
                  </Typography>
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
                <div className="user-menu absolute right-0 mt-2 w-56 bg-white/50 backdrop-blur-3xl rounded-lg shadow-lg border border-gray-300 text-sm font-sans overflow-hidden z-50">
                  <ul className="flex flex-col">
                    <li className="px-6 py-4 border-b border-gray-200">
                      <div className="text-gray-900 font-semibold">
                        {session?.user?.name}
                      </div>
                      <div className="text-gray-500">
                        {session?.user?.email}
                      </div>
                    </li>
                    <li>
                      <Button
                        variant="text"
                        onClick={() => signOut()}
                        fullWidth
                        sx={{
                          color: "text.secondary",
                          textTransform: "none",
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
        </div>

        <div
          className={`fixed top-0 left-0 w-full h-screen z-9 transition-opacity ${
            menuOpen ? "bg-gray-950/95" : " opacity-0 pointer-events-none"
          }`}
          onClick={() => setMenuOpen(false)}
        ></div>
      </div>
    </header>
  );
};

export default Header;
