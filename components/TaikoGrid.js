import { memo, useCallback, useMemo } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { moveSection, useSectionList } from "../redux/mainSlice";
import Section from "./Section";
import Header from "./Header";
import { getListStyle } from "../lib/dnd";
import { useIsEditing } from "../redux/editSlice";

function TaikoGrid() {
  const dispatch = useDispatch();
  const sectionsIds = useSectionList();
  const isEditing = useIsEditing();
  const sectionIdMap = useMemo(() => {
    const result = {};
    sectionsIds.forEach((sectionId) => {
      result[sectionId] = result[sectionId] ? result[sectionId] + 1 : 1;
    });
    return result;
  }, [sectionsIds]);
  const isLinkedSection = (sectionId) => sectionIdMap[sectionId] > 1;
  const onDragStart = useCallback(() => {
    // Add a little vibration if the browser supports it.
    // Add's a nice little physical feedback
    if (window.navigator.vibrate) {
      window.navigator.vibrate(100);
    }
  }, []);
  const onDragEnd = useCallback(
    (result) => {
      dispatch(
        moveSection({
          fromIndex: result?.source?.index,
          toIndex: result?.destination?.index,
        })
      );
    },
    [dispatch]
  );

  return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <Header />
      <Droppable droppableId="sectionsList">
        {(dropProvided, dropSnapshot) => (
          <div
            {...dropProvided.droppableProps}
            ref={dropProvided.innerRef}
            style={getListStyle(dropSnapshot.isDraggingOver)}
            className="p-0.5 px-0 lg:px-5"
          >
            {sectionsIds.map((sectionId, sectionIndex) => (
              <Draggable
                key={`${sectionId}_${sectionIndex}`}
                draggableId={`${sectionId}_${sectionIndex}`}
                index={sectionIndex}
                isDragDisabled={!isEditing}
              >
                {(dragProvided, dragSnapshot) => (
                  <Section
                    isLinkedSection={isLinkedSection(sectionId)}
                    sectionId={sectionId}
                    sectionIndex={sectionIndex}
                    dragProvided={dragProvided}
                    dragSnapshot={dragSnapshot}
                  />
                )}
              </Draggable>
            ))}
            {dropProvided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default memo(TaikoGrid);
