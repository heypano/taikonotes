import { memo } from "react";
import { useSectionList } from "../redux/mainSlice";
import Section from "./Section";
import Header from "./Header";

const TaikoGrid = () => {
  const sectionsIds = useSectionList();

  return (
    <div>
      <Header />
      <div>
        {sectionsIds.map((sectionId, sectionIndex) => (
          <Section
            key={sectionIndex}
            sectionId={sectionId}
            sectionIndex={sectionIndex}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(TaikoGrid);
