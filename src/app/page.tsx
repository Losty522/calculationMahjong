import BeginNewMatchButton from "@/components/BeginNewMatchButton";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Link from "next/link";

const home = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-1">
        <div className="  w-11/12 h-full mx-auto flex flex-col items-center space-y-5">
          <div className="mt-5 mb-5 text-4xl text-center font-extrabold text-gray-800">
            Welcome to{" "}
            <span className="text-green-800">Mahjong Calculator</span>
          </div>

          <BeginNewMatchButton />
          <Link
            href="matchHistory"
            className="w-11/12 border bg-green-300 text-3xl h-24 border-black flex items-center justify-center  hover:bg-green-500 font-bold py-2 px-4 rounded"
          >
            Match History
          </Link>
          <Link
            href="playerData"
            className="w-11/12 border bg-blue-300 text-3xl  h-24 border-black flex items-center justify-center  hover:bg-blue-500 font-bold py-2 px-4 rounded"
          >
            Player Data
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default home;
