import React from "react";
import Link from "next/link";
import { FaHistory, FaHome, FaUser } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-green-800 text-white p-4">
      <nav className="flex space-x-4 justify-center">
        <p className="w-auto">Mahjong Calculator</p>
        <Link href="/">
          <FaHome size={24} />
        </Link>
        <Link href="/matchHistory">
          <FaHistory size={24} />
        </Link>
        <Link href="/playerData">
          <FaUser size={24} />
        </Link>
      </nav>
    </footer>
  );
};

export default Footer;
