"use client";

import { useEffect, useRef } from "react";

import { useAppContext } from "-/app/context";
import Cell from "./Cell";

import "./styles-board.css";

let timer: NodeJS.Timeout;

const Board = () => {
  const {
    gameState: { position },
  } = useAppContext();
  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (position) {
      timer = setTimeout(() => {
        boardRef.current && boardRef.current.classList.add("full");
      }, 50);
    } else {
      boardRef.current && boardRef.current.classList.remove("full");
    }

    return () => {
      clearTimeout(timer);
    };
  }, [position]);

  return (
    <div
      ref={boardRef}
      className={`board flex justify-center flex-col w-full ${position}`}
    >
      {[0, 3, 6].map((i) => (
        <div className="flex" key={[i, i + 1, i + 2].join("-")}>
          {[i, i + 1, i + 2].map((ii) => (
            <Cell key={ii} index={ii} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
