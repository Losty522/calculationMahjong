import BeginNewMatchButton from "@/components/BeginNewMatchButton";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Link from "next/link";

const home = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-1">
        <div className="  w-11/12 h-5/6 my-auto mx-auto flex flex-col items-center space-y-5">
          <div className="mt-5 mb-5 text-4xl text-center font-extrabold text-gray-800">
            Welcome to{" "}
            <span className="text-green-800">Mahjong Calculator</span>
          </div>
          <div className="text-lg w-11/12 bg-green-950 text-white font-extralight border border-amber-900 border-solid border-4">
            <div className="w-11/12 mx-auto">
              <p className="mb-2">
                This website can calculate points without using Point-Sticks
                while playing.
                <br /> Additionally, your match data and player data will be
                saved on the server. After a match, it helps you analyze and
                review your game easily.
              </p>
              <p>
                ● <span className="font-medium">Begin new match</span>: Create a
                new game data
                <br />● <span className="font-medium">Match Histroy</span>: You
                can view previous matches.
                <br />● <span className="font-medium">Player Data</span>: You
                can review players data relatively.
              </p>
            </div>
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
            className="mb-2 w-11/12 border bg-blue-300 text-3xl  h-24 border-black flex items-center justify-center  hover:bg-blue-500 font-bold py-2 px-4 rounded"
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
