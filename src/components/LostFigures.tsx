import React, { FC } from "react";
import { Figure } from "../models/figures/Figure";

export enum ListPosition {
  Left = "left",
  Right = "right",
}

interface LostFiguresProps {
  title: string;
  figures: Figure[];
  position: ListPosition;
}

const LostFigures: FC<LostFiguresProps> = ({ title, figures, position }) => {
  return (
    <div className={["lost", position].join(" ")}>
      <h2 className="lost__title">{title}</h2>
      {figures.map((figure) => (
        <div className="lost__figure" key={figure.id}>
          {figure.name}{" "}
          {figure.logo && (
            <img width={20} height={20} src={figure.logo} alt="lost figure" />
          )}
        </div>
      ))}
    </div>
  );
};

export default LostFigures;
