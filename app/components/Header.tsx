"use client";

import { Button, IconButton } from "@mui/material";
import { Close, Menu, Login } from "@mui/icons-material";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const [fixedHeader, setFixedHeader] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setFixedHeader(true);
      } else {
        setFixedHeader(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`header flex justify-between items-center w-full py-2 px-2 lg:px-10
    ${
      fixedHeader
        ? "sticky shadow shadow-xl bg-white top-0 left-0"
        : "absolute  bg-inherit bg-opacity-0"
    }
    text-white transition-all duration-300 ease-in-out z-10`}
    >
      {/* Logo */}
      <div className="flex items-center justify-center gap-2">
        <div
          className="menubar block lg:hidden"
          onClick={() => {
            setMenuOpen(true);
          }}
        >
          <IconButton
            aria-label="menu"
            sx={{
              color: fixedHeader ? "black" : "white",
            }}
          >
            <Menu />
          </IconButton>
        </div>
        <div className="logo gap-2">
          <Link
            href="/"
            className={`logo-link flex items-center jusify-center gap-2 text-lg sm:text-2xl font-bold ${
              fixedHeader ? "text-black" : "text-white"
            }`}
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
        lg:relative lg:h-auto lg:bg-tranparent lg:shadow-none lg:w-auto lg:bg-transparent lg:translate-x-0 lg:border-none`}
      >
        <div className="flex items-center gap-2 p-2 border-b border-gray-200 block lg:hidden">
          <div
            className="closemenu"
            onClick={() => {
              setMenuOpen(false);
            }}
          >
            <IconButton aria-label="colse-menu" sx={{ color: "black" }}>
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
          className={`nav-list flex flex-col text-black ${
            fixedHeader ? "text-black" : "lg:text-white"
          } lg:flex-row lg:items-center mt-4 lg:gap-4 lg:m-0`}
        >
          <li className="list-items">
            <Link
              href="/job-finder"
              className="nav-link block py-2 px-4 hover:bg-gray-200 lg:hover:bg-transparent"
            >
              Job Finder
            </Link>
          </li>
          <li className="list-items">
            <Link
              href="/resume-scan"
              className="nav-link block py-2 px-4 hover:bg-gray-200 lg:hover:bg-transparent"
            >
              Resume Scan
            </Link>
          </li>
          <li className="list-items">
            <Link
              href="/keyword-matcher"
              className="nav-link block py-2 px-4 hover:bg-gray-200 lg:hover:bg-transparent"
            >
              Keyword Matcher
            </Link>
          </li>
        </ul>
      </nav>

      {/*Signin Button */}
      <div className="flex items-center gap-2">
        <Link href="/auth/signin">
          <Button
            variant="contained"
            color="primary"
            startIcon={<Login />}
            sx={{
              textTransform: "none",
            }}
          >
            Sign In
          </Button>
        </Link>
      </div>
      <div
        className={`fixed top-0 left-0 w-full h-screen z-9 transition-opacity ${
          menuOpen ? " backdrop-blur-xl" : " opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      ></div>
    </header>
  );
};

export default Header;
