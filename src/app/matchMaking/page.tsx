"use client";
import CreateUser from "@/components/matchMaking/CreateUser";
import MatchMaking from "@/components/matchMaking/MatchMaking";

const page = () => {
  return (
    <>
      <div>Mach making page</div>
      <CreateUser />
      <MatchMaking />
    </>
  );
};

export default page;
