import MatchHistory from "@/components/matchHistory/MatchHistory";
import Link from "next/link";

const page = () => {
  return (
    <>
      <div>MatchHistory page</div>
      <Link href="/">Go Home</Link>
      <MatchHistory />
    </>
  );
};

export default page;
