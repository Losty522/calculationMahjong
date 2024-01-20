"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import CreateUser from "@/components/matchMaking/CreateUser";
import MatchMaking from "@/components/matchMaking/MatchMaking";

const page = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-1">
        <div className="  w-11/12 h-full mx-auto flex flex-col items-center space-y-5">
          <div className="mt-3 mb-2 text-4xl text-center font-extrabold text-gray-800">
            Match Making
          </div>
          <MatchMaking />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default page;
