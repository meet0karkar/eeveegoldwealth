"use client";

import React from "react";
import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { motion } from "framer-motion";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Terms and Conditions", href: "/termand-conditions" },
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Refund Policy", href: "/refund-policy" },
  { name: "Contact", href: "/contact" },
  { name: "Blog", href: "/blog" }
];
const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "https://facebook.com" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com" },
  { name: "Instagram", icon: Instagram, href: "https://instagram.com" },
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#000814] to-[#001d3d] py-16 font-cinzel text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="mb-4 bg-gradient-to-r from-[#ffd60a] to-[#ffc300] bg-clip-text text-3xl font-bold text-transparent">
              GoldBuy
            </h3>
            <p className="text-gray-300">
              Your trusted partner in gold transactions since 2005.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="mb-4 text-xl font-semibold text-[#ffd60a]">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    href={link.href}
                    className="link-flash-white text-gray-300 transition duration-300 hover:text-[#ffd60a]"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="mb-4 text-xl font-semibold text-[#ffd60a]">
              Contact Us
            </h4>
            <ul className="space-y-3 text-gray-300">
              <motion.li
                className="flex items-center"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <MapPin className="mr-2 h-5 w-5 shrink-0 text-[#ffd60a]" />
                <span>
                  8-9, Bhakti Arcade Pramukh Park Soc, Satellite Rd, near
                  Mahadev Chowk, Mota Varachha, Surat, Gujarat 394101
                </span>
              </motion.li>
              <motion.li
                className="flex items-center"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Phone className="mr-2 h-5 w-5 text-[#ffd60a]" />
                <a
                  href="tel:+8238664001"
                  className="transition duration-300 hover:text-[#ffd60a]"
                >
                  8238664001
                </a>
              </motion.li>
              <motion.li
                className="flex items-center"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Mail className="mr-2 h-5 w-5 text-[#ffd60a]" />
                <a
                  href="mailto:support@eeveegold.com "
                  className="transition duration-300 hover:text-[#ffd60a]"
                >
                  support@eeveegold.com
                </a>
              </motion.li>
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="mb-4 text-xl font-semibold text-[#ffd60a]">
              Follow Us
            </h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 transition duration-300 hover:text-[#ffd60a]"
                  aria-label={`Follow us on ${social.name}`}
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <social.icon className="h-6 w-6" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
        <motion.div
          className="mt-12 border-t border-[#ffd60a]/30 pt-8 text-center text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p>&copy; {new Date().getFullYear()} GoldBuy. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            {/* <Link
              href="/terms"
              className="transition duration-300 hover:text-[#ffd60a]"
            >
              Terms of Service
            </Link> */}
            <Link
              href="/privacy-policy"
              className="transition duration-300 hover:text-[#ffd60a]"
            >
              Privacy Policy
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
