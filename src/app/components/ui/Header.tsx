"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User } from "lucide-react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Buy Gold", href: "/buy" },
  { name: "Contact", href: "/contactus" },
  
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <div className="bg-[#000814]">
      <header className="sticky top-0 z-10 z-50 bg-[#000814] shadow-lg transition-colors duration-300 dark:bg-gray-800">
        <div className="container relative mx-auto flex items-center justify-between bg-[#000814] px-4 py-4">
          <Link
            href="/"
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text font-cinzel text-3xl font-extrabold text-transparent"
          >
            EEVEEGOLD
          </Link>
          <nav className="hidden font-cinzel lg:block">
            <ul className="flex space-x-8">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`text-white transition duration-300 hover:text-yellow-500 dark:text-white ${
                      pathname === item.href
                        ? "font-semibold text-yellow-500"
                        : ""
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              {isLoggedIn ? (
                <>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="text-white transition duration-300 hover:text-yellow-500 dark:text-gray-300"
                    >
                      Logout
                    </button>
                  </li>
                  <li>
                    <Link
                      href="/myaccount"
                      className={`text-white transition duration-300 hover:text-yellow-500 dark:text-gray-300 ${
                        pathname === "/myaccount"
                          ? "font-semibold text-yellow-500"
                          : ""
                      }`}
                    >
                      My profile
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      href="/Login"
                      className={`text-white transition duration-300 hover:text-yellow-500 dark:text-gray-300 ${
                        pathname === "Login"
                          ? "font-semibold text-yellow-500"
                          : ""
                      }`}
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/signup"
                      className={`text-white transition duration-300 hover:text-yellow-500 dark:text-gray-300 ${
                        pathname === "/signup"
                          ? "font-semibold text-yellow-500"
                          : ""
                      }`}
                    >
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
          <button
            onClick={toggleMenu}
            className="rounded-md text-white hover:text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:text-gray-300 lg:hidden"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute left-0 right-0 top-full z-50 w-full bg-[#000814] shadow-md dark:bg-gray-800 lg:hidden"
            >
              <nav className="container mx-auto bg-[#000814] px-4 py-4">
                <ul className="space-y-4">
                  {navItems.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={`block text-white transition duration-300 hover:text-yellow-500 dark:text-gray-300 ${
                          pathname === item.href
                            ? "font-semibold text-yellow-500"
                            : ""
                        }`}
                        onClick={toggleMenu}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                  {isLoggedIn ? (
                    <>
                      <li>
                    <Link
                      href="/myaccount"
                      className={`text-white transition duration-300 hover:text-yellow-500 dark:text-gray-300 ${
                        pathname === "/myaccount"
                          ? "font-semibold text-yellow-500"
                          : ""
                      }`}
                    >
                      My profile
                    </Link>
                  </li>
                    <li>
                      <button
                        onClick={() => {
                          handleLogout();
                          toggleMenu();
                        }}
                        className="block w-full text-left text-white transition duration-300 hover:text-yellow-500 dark:text-gray-300"
                        >
                        Logout
                      </button>
                    </li>
                  
                        </>
                  ) : (
                    <>
                      <li>
                        <Link
                          href="/Login"
                          className={`block text-white transition duration-300 hover:text-yellow-500 dark:text-gray-300 ${
                            pathname === "/Login"
                              ? "font-semibold text-yellow-500"
                              : ""
                          }`}
                          onClick={toggleMenu}
                        >
                          Login
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/signup"
                          className={`block text-white transition duration-300 hover:text-yellow-500 dark:text-gray-300 ${
                            pathname === "/signup"
                              ? "font-semibold text-yellow-500"
                              : ""
                          }`}
                          onClick={toggleMenu}
                        >
                          Sign Up
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </div>
  );
}
