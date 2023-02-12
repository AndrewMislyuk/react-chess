import React, { useEffect, useState } from "react";
import BoardComponent from "./components/BoardComponent";
import LostFigures, { ListPosition } from "./components/LostFigures";
import ModalComponent, { ModalStatus } from "./components/ModalComponent";
import { Board } from "./models/Board";
import { Colors } from "./models/Colors";
import { Player } from "./models/Player";

function App() {
  const [board, setBoard] = useState(new Board());
  const [whitePlayer] = useState(new Player(Colors.WHITE));
  const [blackPlayer] = useState(new Player(Colors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState<ModalStatus>(ModalStatus.None);

  useEffect(() => {
    restart();
    setCurrentPlayer(whitePlayer);
  }, []);

  function restart() {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
  }

  function swapPlayer() {
    setCurrentPlayer(
      currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer
    );
  }

  function setModal(modalToggle: boolean, status: ModalStatus) {
    setIsModalOpen(modalToggle);
    setModalStatus(status);
  }

  function restartFromModal() {
    setModal(false, ModalStatus.None);
    restart();
    setCurrentPlayer(whitePlayer);
  }

  return (
    <div className="app">
      <BoardComponent
        board={board}
        setBoard={setBoard}
        setIsModalOpen={setModal}
        currentPlayer={currentPlayer}
        swapPlayer={swapPlayer}
      />

      <div>
        <LostFigures
          position={ListPosition.Left}
          title="White Figures:"
          figures={board.lostWhiteFigures}
        />
        <LostFigures
          position={ListPosition.Right}
          title="Black Figures:"
          figures={board.lostBlackFigures}
        />
      </div>

      {isModalOpen && (
        <ModalComponent
          status={modalStatus}
          player={currentPlayer}
          close={() => setModal(false, ModalStatus.None)}
          restart={() => restartFromModal()}
        />
      )}
    </div>
  );
}

export default App;
