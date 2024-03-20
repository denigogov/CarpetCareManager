import { useState } from "react";
import "../sass/_toggleBtn.scss";

const ToggleBtn = ({
  handlerOnClik,
  state,
  toggleTextOn = "on",
  toggleTextOff = "off",
}) => {
  const handleToggleTables = () => {
    handlerOnClik();
  };

  return (
    <div
      className={
        state
          ? "togglebuttonContainer toggleTextOn"
          : "togglebuttonContainer toggleTextOff"
      }
    >
      <label className="toggleContainer">
        <input onClick={handleToggleTables} type="checkbox" className="cB" />
        <div className="line-toggle">
          <div className="lineCircle-toggle"></div>
        </div>
      </label>
      {!state ? ` ${toggleTextOff}` : ` ${toggleTextOn}`}
    </div>
  );
};

export default ToggleBtn;
