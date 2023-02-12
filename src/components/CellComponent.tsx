import React, { FC } from "react";
import { Cell } from "../models/Cell";

interface CellProps {
  cell: Cell;
  selected: boolean;
  click: (cell: Cell) => void;
}

const CellComponent: FC<CellProps> = ({ cell, selected, click }) => {
  return (
    <div
      className={[
        "cell",
        cell.color,
        selected ? "selected" : "",
        cell.x === 0 ? `numbers cell${cell.y}` : "",
        cell.y === 0 ? `letters cell${cell.x}` : "",
      ].join(" ")}
      onClick={() => click(cell)}
      style={{ background: cell.available && cell.figure ? "green" : "" }}
    >
      {cell.available && !cell.figure && <div className="available" />}
      {cell.figure?.logo && <img src={cell.figure.logo} alt="figure" />}
    </div>
  );
};

export default CellComponent;
