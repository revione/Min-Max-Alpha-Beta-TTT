"use client";

import Info from "./Info";
import Board from "./Board";

const Main = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-5 w-full max-w-[350px] mx-auto">
      <Info />
      <Board />
    </div>
  );
};

export default Main;
