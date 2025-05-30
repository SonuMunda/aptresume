"use client";

import Image from "next/image";
import Link from "next/link";
import { Facebook, Twitter, LinkedIn, Instagram } from "@mui/icons-material";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-300 py-10 px-4 sm:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand Info */}
        <div>
          <div className="logo gap-2">
            <Link
              href="/"
              className={`logo-link flex items-center jusify-center gap-2 text-2xl text-white font-bold`}
            >
              <Image src="/logo.png" alt="Logo" width={32} height={32} />
              AptResume
            </Link>
          </div>
          <p className="text-sm">
            Empowering job seekers with smart tools for resume optimization and
            job matching.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="font-semibold text-white mb-2">Explore</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/job-finder" className="hover:text-white">
                Job Finder
              </a>
            </li>
            <li>
              <a href="/resume-scan" className="hover:text-white">
                Resume Scan
              </a>
            </li>
            <li>
              <a href="/keyword-matcher" className="hover:text-white">
                Keyword Matcher
              </a>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold text-white mb-2">Company</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/about" className="hover:text-white">
                About
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white">
                Contact
              </a>
            </li>
            <li>
              <a href="/privacy" className="hover:text-white">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-semibold text-white mb-2">Follow Us</h3>
          <div className="flex gap-4 mt-2">
            <a href="#" aria-label="Facebook">
              <Facebook className="hover:text-white" />
            </a>
            <a href="#" aria-label="Twitter">
              <Twitter className="hover:text-white" />
            </a>
            <a href="#" aria-label="LinkedIn">
              <LinkedIn className="hover:text-white" />
            </a>
            <a href="#" aria-label="Instagram">
              <Instagram className="hover:text-white" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-sm text-gray-500 mt-10 border-t border-gray-800 pt-6">
        &copy; {new Date().getFullYear()} AptResume. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
