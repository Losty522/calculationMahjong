"use client";
import MatchMaking from "@/components/matchMaking/MatchMaking";
import { usePlayerStore } from "@/components/playerStore";
import { useGetFromStore } from "@/hooks/zustandHooks";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <>
      <div>Mach making page</div>
      <MatchMaking />
    </>
  );
};

export default page;
