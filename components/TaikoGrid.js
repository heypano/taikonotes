import { memo, useMemo } from "react";
import { useSectionList } from "../redux/mainSlice";
import Section from "./Section";
import Header from "./Header";

const TaikoGrid = () => {
  const sectionsIds = useSectionList();
  const sectionIdMap = useMemo(() => {
    const result = {};
    sectionsIds.forEach((sectionId) => {
      result[sectionId] = result[sectionId] ? result[sectionId] + 1 : 1;
    });
    return result;
  }, [sectionsIds]);
  const isLinkedSection = (sectionId) => sectionIdMap[sectionId] > 1;

  return (
    <div>
      <Header />
      <div>
        {sectionsIds.map((sectionId, sectionIndex) => (
          <Section
            key={sectionIndex}
            isLinkedSection={isLinkedSection(sectionId)}
            sectionId={sectionId}
            sectionIndex={sectionIndex}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(TaikoGrid);
