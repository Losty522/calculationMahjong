import React from "react";
import Link from "next/link";
import { FaHistory, FaHome, FaUser } from "react-icons/fa";

const Header = () => {
  return (
    <header className="bg-green-800 text-white">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <div>
          <Link href="/">
            <FaHome size={24} />
          </Link>
        </div>
        <div className="flex space-x-4">
          <Link href="/matchHistory">
            <FaHistory size={24} />
          </Link>
          <Link href="/playerData">
            <FaUser size={24} />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
