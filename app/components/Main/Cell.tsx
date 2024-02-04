"use client";

import { useAppContext } from "-/app/context";
import { ICON_CHARS, ICON_PLACEHOLDER } from "-/app/common";

const Cell = ({ index }: { index: number }) => {
  const { cells, humanPlay } = useAppContext();

  const value = cells[index];
  const icon = value !== null ? ICON_CHARS[value] : ICON_PLACEHOLDER;

  return (
    <div
      onClick={() => humanPlay(index)}
      className={`
        flex-1 
        p-[calc(100%/6-2.9rem)] leading-[5.7rem] 
        font-extrabold text-5xl text-center
        bg-transparent border-2 border-gray-600
        ${icon !== ICON_PLACEHOLDER ? "text-gray-200" : "text-transparent"}
        ${index % 3 !== 0 ? "border-l" : ""} 
        ${index < 6 ? "border-t" : ""}
        hover:bg-black hover:cursor-pointer
        transition-all
      `}
    >
      {icon}
    </div>
  );
};

export default Cell;
