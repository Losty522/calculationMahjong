import Link from "next/link";
import React from "react";

const FinishedMatch = () => {
  return (
    <>
      <div>This match is already finished. Please create a new match.</div>
      <Link href="/">Go Home</Link>
    </>
  );
};

export default FinishedMatch;
