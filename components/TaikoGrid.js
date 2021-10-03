import { memo, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { setMainState, useSectionIds } from "../redux/mainSlice";
import Section from "./Section";
import Header from "./Header";

// const chihat = new Audio("/drum-sounds-master/closed-hihat.mp3");
// const snare = new Audio("/drum-sounds-master/acoustic-snare.mp3");
// const bass = new Audio("/drum-sounds-master/bass-drum-1.mp3");
//
// const notes = [chihat, snare, bass];

const TaikoGrid = ({ song }) => {
  const sectionsIds = useSectionIds();
  const dispatch = useDispatch();

  useEffect(() => {
    if (song) {
      dispatch(setMainState(song));
    }
  }, [dispatch, song]);

  // console.debug("TaikoGrid rerender");
  return (
    <div>
      <Header />
      <div>
        {sectionsIds.map((sectionId, sectionIndex) => (
          <Section key={sectionId} sectionId={sectionIndex} />
        ))}
      </div>
    </div>
  );
};
TaikoGrid.propTypes = {
  song: PropTypes.shape({}),
};
TaikoGrid.defaultProps = {
  song: undefined,
};

export default memo(TaikoGrid);
