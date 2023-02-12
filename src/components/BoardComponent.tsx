import React, { FC, useEffect, useState } from "react";
import { Board } from "../models/Board";
import { Cell } from "../models/Cell";
import { Colors } from "../models/Colors";
import { Player } from "../models/Player";
import CellComponent from "./CellComponent";
import { ModalStatus } from "./ModalComponent";

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
  currentPlayer: Player | null;
  swapPlayer: () => void;
  setIsModalOpen: (modalToggle: boolean, status: ModalStatus) => void;
}

const BoardComponent: FC<BoardProps> = ({
  board,
  setBoard,
  currentPlayer,
  swapPlayer,
  setIsModalOpen,
}) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  function click(cell: Cell) {
    if (
      selectedCell &&
      selectedCell !== cell &&
      selectedCell.figure?.canMove(cell)
    ) {
      selectedCell.moveFigure(cell);
      if (kingIsUnderAttack()) {
        setIsModalOpen(true, ModalStatus.Mate);
      }
      swapPlayer();
      setSelectedCell(null);
      updateBoard();
    } else {
      if (cell.figure?.color === currentPlayer?.color) {
        setSelectedCell(cell);
      }
    }
  }

  useEffect(() => {
    highlightCells();
  }, [selectedCell]);

  useEffect(() => {
    if (kingIsUnderAttack()) {
      setIsModalOpen(true, ModalStatus.Check);
    }
  }, [currentPlayer]);

  function highlightCells() {
    board.highlightCells(selectedCell);
    updateBoard();
  }

  function kingIsUnderAttack() {
    const kingTarget = board.getKingTarget(currentPlayer?.color as Colors);
    return board.figureIsUnderAttack(kingTarget as Cell);
  }

  function updateBoard() {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  }

  return (
    <div>
      <h1 className="title">Current Player: {currentPlayer?.color}</h1>

      <div className="board">
        <div className="board__wrapper">
          {board.cells.map((row, index) => (
            <React.Fragment key={index}>
              {row.map((cell) => (
                <CellComponent
                  click={click}
                  cell={cell}
                  key={cell.id}
                  selected={
                    cell.x === selectedCell?.x && cell.y === selectedCell?.y
                  }
                />
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BoardComponent;
