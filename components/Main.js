import PropTypes from "prop-types";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import PageContainer from "./PageContainer";
import TaikoGrid from "./TaikoGrid";
import CellPopupMenu from "./CellPopupMenu";
import SectionCommentPopup from "./SectionCommentPopup";
import { setMainState } from "../redux/mainSlice";
import { setIsLoading, useIsLoading } from "../redux/editSlice";
import Spin from "./Icons/Spin";

const Main = ({ song }) => {
  const { query } = useRouter();
  const { songslug } = query;
  const dispatch = useDispatch();
  const isLoading = useIsLoading();
  useEffect(() => {
    if (songslug) {
      dispatch(setIsLoading(true));
      if (song) {
        dispatch(setMainState(song));
      }
    } else {
      dispatch(setIsLoading(false));
    }
  }, [dispatch, song, songslug]);

  return (
    <div className="app">
      <PageContainer>
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-48">
              <Spin />
            </div>
          </div>
        ) : (
          <>
            <TaikoGrid song={song} />
            <CellPopupMenu />
            <SectionCommentPopup />
          </>
        )}
      </PageContainer>
    </div>
  );
};
Main.propTypes = {
  song: PropTypes.shape({}),
};
Main.defaultProps = {
  song: undefined,
};

export default Main;
