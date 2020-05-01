import React from "react";
import * as PropTypes from "prop-types";

class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSoundIndex: null
    };
  }
  /**
   * Return the next sound
   * @param {[]} sounds
   * @param {number} lastSelected
   * @returns {number}
   */
  getNextSound(sounds, lastSelected) {
    if (lastSelected == null) {
      return 0;
    } else if (lastSelected + 1 < sounds.length) {
      return lastSelected + 1;
    } else {
      return null;
    }
  }

  getCurrentSound;

  render() {
    let { index, divideEvery, sounds } = this.props;
    let backgroundClass = "hover:bg-gray-300";
    if (index % divideEvery === 0) {
      backgroundClass = "bg-gray-300 hover:bg-gray-600";
    }

    return (
      <div
        className={`flex flex-row justify-center items-center select-none border border-blue-800 h-10 cursor-pointer ${backgroundClass}`}
        onClick={() => {
          const nextSound = this.getNextSound(
            sounds,
            this.state.selectedSoundIndex
          );
          this.setState({ ...this.state, selectedSoundIndex: nextSound });
        }}
        onContextMenu={e => {
          e.preventDefault();
          this.setState({ ...this.state, selectedSoundIndex: null });
        }}
      >
        {sounds[this.state.selectedSoundIndex]}
      </div>
    );
  }
}

Cell.propTypes = {
  index: PropTypes.any,
  divideEvery: PropTypes.any,
  cellsPerLine: PropTypes.any,
  sounds: PropTypes.any
};

export default Cell;
