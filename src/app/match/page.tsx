import Player from "@/components/Player";

import React, { useState } from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <>
      <div>match page</div>
      <Player playerName={"p1"} />
      <Player playerName={"p2"} />
      <Player playerName={"p3"} />
      <Player playerName={"p4"} />
    </>
  );
};

export default page;
