import React from "react";
import PropTypes from "prop-types";
import { useSectionList, useSectionNoCells } from "../redux/mainSlice";

const SummaryItem = ({ sectionId }) => {
  const { sectionName } = useSectionNoCells(sectionId);
  return (
    <div
      className=" px-1 lg:px-8 bg-white"
      style={{
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
      }}
    >
      {sectionName}
    </div>
  );
};

SummaryItem.propTypes = {
  sectionId: PropTypes.string,
};
SummaryItem.defaultProps = {
  sectionId: undefined,
};

const Summary = () => {
  const sectionIds = useSectionList();
  return (
    <div
      className="p-0.5 px-0 lg:px-5"
      style={{
        background: "rgb(247, 236, 212)",
      }}
    >
      {sectionIds.map((sectionId) => (
        <SummaryItem sectionId={sectionId} />
      ))}
    </div>
  );
};

export default Summary;
