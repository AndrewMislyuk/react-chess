import React, { FC } from "react";
import { Colors } from "../models/Colors";
import { Player } from "../models/Player";

export enum ModalStatus {
  None = "",
  Check = "CHECK",
  Mate = "MATE",
}

interface ModalComponentProps {
  player: Player | null;
  status: ModalStatus;
  close: () => void;
  restart: () => void;
}

const ModalComponent: FC<ModalComponentProps> = ({
  player,
  status,
  close,
  restart,
}) => {
  return (
    <div className="modal">
      <div className="modal__background" onClick={() => close()} />

      <div className="modal__content">
        <div className="modal__content-text">
          {status === ModalStatus.Check
            ? `${
                player?.color === Colors.WHITE ? "WHITE" : "BLACK"
              } Player Check`
            : `Checkmate to the ${
                player?.color === Colors.WHITE ? "BLACK" : "WHITE"
              } player`}
        </div>

        <div className="modal__footer">
          {status === ModalStatus.Check && (
            <button
              type="button"
              className="modal__footer-btn"
              onClick={() => close()}
            >
              Understand
            </button>
          )}

          {status === ModalStatus.Mate && (
            <button
              type="button"
              className="modal__footer-btn"
              onClick={() => restart()}
            >
              Restart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
