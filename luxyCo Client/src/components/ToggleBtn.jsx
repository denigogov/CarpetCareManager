import { useState } from 'react';
import '../sass/_toggleBtn.scss';

const ToggleBtn = ({ handleShowCategory, showCategory }) => {
  const handleToggleTables = () => {
    handleShowCategory();
  };

  return (
    <div
      className={
        showCategory
          ? 'togglebuttonContainer toggleTextOn'
          : 'togglebuttonContainer toggleTextOff'
      }
    >
      <label className="toggleContainer">
        <input onClick={handleToggleTables} type="checkbox" className="cB" />
        <div className="line-toggle">
          <div className="lineCircle-toggle"></div>
        </div>
      </label>{' '}
      {!showCategory ? ` Category Visibility Off` : ` Category Visibility on`}
    </div>
  );
};

export default ToggleBtn;
