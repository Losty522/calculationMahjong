"use client";
import Link from "next/link";
import React from "react";

const page = () => {
  const handleResetStrage = () => {
    // localStorage.removeItem("playerStoreData");
    // localStorage.removeItem("FeildStatus");
  };

  return (
    <>
      <div>Mach making page</div>
      <Link href="/match">
        <button
          onClick={() => {
            handleResetStrage();
          }}
        >
          start match
        </button>
      </Link>
    </>
  );
};

export default page;
