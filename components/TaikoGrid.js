import { memo } from "react";
import { useSectionIds } from "../redux/mainSlice";
import Section from "./Section";
import Header from "./Header";

const TaikoGrid = () => {
  const sectionsIds = useSectionIds();

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

export default memo(TaikoGrid);
