import PropTypes from "prop-types";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Head from "next/head";
import PageContainer from "./PageContainer";
import TaikoGrid from "./TaikoGrid";
import CellPopupMenu from "./CellPopupMenu";
import SectionCommentPopup from "./SectionCommentPopup";
import { setMainState } from "../redux/mainSlice";
import { setIsLoading, useIsLoading } from "../redux/editSlice";
import SectionSettings from "./SectionSettings";
import Loader from "./Loader";
import { setError } from "../redux/errorSlice";

const Main = ({ song, error }) => {
  const { query } = useRouter();
  const { songslug } = query;
  const dispatch = useDispatch();
  const isLoading = useIsLoading();

  useEffect(() => {
    if (songslug && !song && !error) {
      dispatch(setIsLoading(true));
    } else {
      dispatch(setIsLoading(false));
    }

    if (error) {
      dispatch(setError(error));
    }

    if (song) {
      dispatch(setMainState(song));
    }
  }, [dispatch, song, songslug, error]);

  return (
    <div className="app">
      <Head>
        <title>Taiko Notes -- {song?.present?.title || "New Song"}</title>
      </Head>
      <PageContainer>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <TaikoGrid song={song} />
            <div id="modalPortal" />
            <CellPopupMenu />
            <SectionCommentPopup />
            <SectionSettings />
          </>
        )}
      </PageContainer>
    </div>
  );
};
Main.propTypes = {
  song: PropTypes.shape({ title: PropTypes.string }),
  error: PropTypes.string,
};
Main.defaultProps = {
  song: undefined,
  error: undefined,
};

export default Main;
