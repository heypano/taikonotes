import PropTypes from "prop-types";
import { memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Head from "next/head";
import PageContainer from "./PageContainer";
import TaikoGrid from "./TaikoGrid";
import CellPopupMenu from "./CellPopupMenu";
import { setMainState, useIsDirty } from "../redux/mainSlice";
import { setIsLoading, useIsLoading } from "../redux/editSlice";
import SectionSettings from "./SectionSettings";
import Loader from "./Loader";
import { setError } from "../redux/errorSlice";

const beforeUnloadHandler = (event) => {
  const question = "Are you sure you want to exit?";
  event.preventDefault();
  // eslint-disable-next-line no-param-reassign,no-return-assign
  return (event.returnValue = question);
};

function Main({ song, error }) {
  const { query } = useRouter();
  const { songslug } = query;
  const dispatch = useDispatch();
  const isLoading = useIsLoading();
  const isDirty = useIsDirty();

  // Loading, error and main state
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

  // onbeforeunload handler
  useEffect(() => {
    if (isDirty) {
      window.addEventListener("beforeunload", beforeUnloadHandler, {
        capture: true,
      });
    } else {
      window.removeEventListener("beforeunload", beforeUnloadHandler, {
        capture: true,
      });
    }

    return () => {
      window.removeEventListener("beforeunload", beforeUnloadHandler, {
        capture: true,
      });
    };
  }, [isDirty]);

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
            <SectionSettings />
          </>
        )}
      </PageContainer>
    </div>
  );
}
Main.propTypes = {
  song: PropTypes.shape({ title: PropTypes.string }),
  error: PropTypes.string,
};
Main.defaultProps = {
  song: undefined,
  error: undefined,
};

export default memo(Main);
