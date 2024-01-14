import BeginNewMatchButton from "@/components/BeginNewMatchButton";
import Link from "next/link";

const home = () => {
  return (
    <div className="flex flex-col">
      <div>home</div>
      <BeginNewMatchButton />
      <Link href="matchHistory">Match History</Link>
      <Link href="playerData">Player Data</Link>
    </div>
  );
};

export default home;
