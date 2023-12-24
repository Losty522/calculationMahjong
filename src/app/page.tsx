import Link from "next/link";

const home = () => {
  return (
    <>
      <div>home</div>
      <Link href="/matchMaking">begin new match</Link>
    </>
  );
};

export default home;
