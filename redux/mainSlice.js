/* eslint-disable no-param-reassign */
import { createSlice, current } from "@reduxjs/toolkit";
import { shallowEqual, useSelector } from "react-redux";
import { v4 as uuidV4 } from "uuid";

export const name = "main";

const initialSectionId1 = uuidV4();
const defaultCellsPerLine = 16;
const defaultDivideEvery = 4;
const defaultTotaleLines = 1;
const getNewSection = (sectionId) => ({
  cells: new Array(defaultTotaleLines * defaultCellsPerLine).fill(""),
  id: sectionId,
  sectionName: `Line ${sectionId.substring(0, 2)}`,
  totalLines: 1,
  settings: {
    cellsPerLine: defaultCellsPerLine,
    divideEvery: defaultDivideEvery,
    sounds: "don, kon, ka",
    soundObj: {
      "": "",
      don: "don",
      kon: "kon",
      ka: "ka",
    },
  },
});
export const initialState = {
  title: "New Song",
  isDirty: false,
  slug: undefined,
  sections: [initialSectionId1],
  sectionsMap: {
    [initialSectionId1]: getNewSection(initialSectionId1),
  },
};
export const mainActionRegExp = new RegExp(`^${name}/`);
export const cleanActionsRegExp = new RegExp(
  `^${name}/(setIsDirty|setMainState)`
);
const isMainDirtyAction = ({ type }) =>
  mainActionRegExp.test(type) && !cleanActionsRegExp.test(type);

// To work with old and new format
export const getCurrentState = (state, sname) =>
  state[sname].present || state[sname];

export const useHistoryIndex = () =>
  useSelector((state) => state[name].index, shallowEqual);

export const useSettings = (sectionId) =>
  useSelector(
    (state) =>
      getCurrentState(state, name)?.sectionsMap?.[sectionId]?.settings || {},
    shallowEqual
  );

export const useSoundObj = (sectionId) =>
  useSelector((state) => {
    if (sectionId !== undefined) {
      return getCurrentState(state, name)?.sectionsMap?.[sectionId]?.settings
        ?.soundObj;
    }
    return null;
  }, shallowEqual);

export const useSongTitle = () =>
  useSelector((state) => {
    const { title } = getCurrentState(state, name);
    return title;
  }, shallowEqual);

export const useSectionList = () =>
  useSelector((state) => {
    const { sections } = getCurrentState(state, name);
    return sections;
  }, shallowEqual);

export const useSectionNoCells = (sectionId) =>
  useSelector((state) => {
    const { sectionsMap } = getCurrentState(state, name);
    const section = {
      ...sectionsMap[sectionId],
    };
    delete section.cells;
    return section;
  }, shallowEqual);

export const useSectionComment = (sectionId) =>
  useSelector((state) => {
    if (sectionId !== undefined) {
      return getCurrentState(state, name)?.sectionsMap?.[sectionId]?.comment;
    }
    return null;
  }, shallowEqual);

export const useCell = (sectionId, cellIndex) =>
  useSelector(
    (state) =>
      getCurrentState(state, name)?.sectionsMap?.[sectionId]?.cells?.[
        cellIndex
      ] || {},
    shallowEqual
  );

export const useIsDirty = () =>
  useSelector((state) => getCurrentState(state, name)?.isDirty, shallowEqual);

export const mainSlice = createSlice({
  name,
  initialState,
  reducers: {
    clearState: (state, action) => {
      const newSectionId = uuidV4();
      state.sections = [newSectionId];
      state.sectionsMap = {
        [newSectionId]: getNewSection(newSectionId),
      };
    },
    setSongTitle: (state, action) => {
      state.title = action.payload;
    },
    setSettings: (state, action) => {
      const { sectionId, settings } = action.payload;
      Object.keys(settings).forEach((key) => {
        state.sectionsMap[sectionId].settings[key] = settings[key];
      });
      state.sectionsMap[sectionId].settings.soundObj = Object.fromEntries(
        `,${state.sectionsMap[sectionId].settings.sounds}`
          .split(",")
          .map((s) => [s.trim(), s.trim()])
      );
    },
    setTotalLines: (state, action) => {
      const { sectionId, totalLines } = action.payload;
      const final = Math.max(totalLines, 0);
      const cellsPerLine = Number(
        state.sectionsMap[sectionId].settings.cellsPerLine
      );
      state.sectionsMap[sectionId].totalLines = final;
      state.sectionsMap[sectionId].cells = state.sectionsMap[sectionId].cells
        .slice(0, final * cellsPerLine)
        .map((i) => {
          if (i === undefined) {
            return ""; // no undefined items
          }
          return i;
        });
    },
    setSectionName: (state, action) => {
      const { sectionId, sectionName } = action.payload;
      state.sectionsMap[sectionId].sectionName = sectionName;
    },
    setSectionComment: (state, action) => {
      const { sectionId, comment } = action.payload;
      state.sectionsMap[sectionId].comment = comment;
    },
    setSound: (state, action) => {
      const { sectionId, cellIndex, sound } = action.payload;
      const section = state.sectionsMap[sectionId];
      const cell = section.cells[cellIndex] || {};
      cell.sound = sound;
      state.sectionsMap[sectionId].cells[cellIndex] = cell;
    },
    setCellComment: (state, action) => {
      const { sectionId, cellIndex, comment } = action.payload;
      const section = state.sectionsMap[sectionId];
      const cell = section.cells[cellIndex] || {};
      cell.comment = comment;
      state.sectionsMap[sectionId].cells[cellIndex] = cell;
    },
    setIntensity: (state, action) => {
      const { sectionId, cellIndex, intensity } = action.payload;
      const section = state.sectionsMap[sectionId];
      const cell = section.cells[cellIndex] || {};
      cell.intensity = intensity;
      state.sectionsMap[sectionId].cells[cellIndex] = cell;
    },
    setMainState: (state, action) => action.payload.present || action.payload,
    addSection: (state, action) => {
      const newSectionId = uuidV4();
      state.sections.push(newSectionId);
      state.sectionsMap[newSectionId] = getNewSection(newSectionId);
    },
    removeLastSection: (state, action) => {
      state.sections.pop();
      // TODO remove from sectionsMap if no longer relevant
    },
    removeSection: (state, action) => {
      const { sectionIndex } = action.payload;
      state.sections.splice(sectionIndex, 1);
    },
    cloneSection: (state, action) => {
      const { sectionIndex } = action.payload;
      const newId = uuidV4();
      const oldId = state.sections[sectionIndex];
      const oldSection = state.sectionsMap[oldId];
      const newSection = {
        ...oldSection,
        id: newId,
      };
      state.sectionsMap[newId] = newSection;
      state.sections.push(newId);
    },
    unlinkSection: (state, action) => {
      const { sectionIndex } = action.payload;
      const newId = uuidV4();
      const oldId = state.sections[sectionIndex];
      const oldSection = state.sectionsMap[oldId];
      state.sectionsMap[newId] = {
        ...oldSection,
        id: newId,
      };
      state.sections[sectionIndex] = newId;
    },
    moveSection: (state, action) => {
      const { fromIndex, toIndex } = action.payload;
      const removed = state.sections.splice(fromIndex, 1);
      state.sections.splice(toIndex, 0, removed);
    },
    setIsDirty: (state, action) => {
      const { isDirty } = action.payload;
      state.isDirty = isDirty;
    },
    duplicateLastLine: (state, action) => {
      const { sectionId } = action.payload;
      const oldSection = state.sectionsMap[sectionId];
      const cellsPerLine = Number(oldSection.settings.cellsPerLine);
      const newSection = {
        ...oldSection,
        totalLines: oldSection.totalLines + 1,
        cells: [
          ...oldSection.cells,
          ...oldSection.cells.slice(
            cellsPerLine * (oldSection.totalLines - 1),
            cellsPerLine * oldSection.totalLines
          ),
        ],
      };
      state.sectionsMap[sectionId] = newSection;
    },
    moveLineInSection: (state, action) => {
      const { sectionId, sourceIndex, destinationIndex } = action.payload;
      const { cells, settings } = state.sectionsMap[sectionId];
      const cellsPerLine = Number(settings.cellsPerLine);
      const newCells = [...cells];
      newCells.splice(
        destinationIndex * cellsPerLine,
        0,
        ...newCells.splice(cellsPerLine * sourceIndex, cellsPerLine)
      );
      state.sectionsMap[sectionId].cells = newCells;
    },
    removeLineInSection: (state, action) => {
      const { sectionId, index } = action.payload;
      const { cells, settings } = state.sectionsMap[sectionId];
      const cellsPerLine = Number(settings.cellsPerLine);
      const newCells = [...cells];
      newCells.splice(index * cellsPerLine, cellsPerLine);
      state.sectionsMap[sectionId].cells = newCells;
      state.sectionsMap[sectionId].totalLines -= 1;
    },
    addLineInSection: (state, action) => {
      const { sectionId, index } = action.payload;
      const { cells, settings } = state.sectionsMap[sectionId];
      const cellsPerLine = Number(settings.cellsPerLine);
      const newCells = [...cells];
      const newLine = new Array(cellsPerLine).fill("");
      newCells.splice((index + 1) * cellsPerLine, 0, ...newLine);
      state.sectionsMap[sectionId].cells = newCells;
      state.sectionsMap[sectionId].totalLines += 1;
    },
    duplicateLineInSection: (state, action) => {
      const { sectionId, index } = action.payload;
      const { cells, settings } = state.sectionsMap[sectionId];
      const cellsPerLine = Number(settings.cellsPerLine);
      const newCells = [...current(cells)];
      const newLine = newCells.slice(
        index * cellsPerLine,
        (index + 1) * cellsPerLine
      );
      newCells.splice((index + 1) * cellsPerLine, 0, ...newLine);
      state.sectionsMap[sectionId].cells = newCells;
      state.sectionsMap[sectionId].totalLines += 1;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(isMainDirtyAction, (state, action) => {
      state.isDirty = true;
    });
  },
});

// Action creators are generated for each case reducer function
export const {
  setSongTitle,
  setTotalLines,
  setSectionName,
  setSectionComment,
  setSettings,
  setSound,
  setCellComment,
  setIntensity,
  setMainState,
  addSection,
  removeLastSection,
  removeSection,
  clearState,
  cloneSection,
  unlinkSection,
  moveSection,
  setIsDirty,
  duplicateLastLine,
  moveLineInSection,
  removeLineInSection,
  addLineInSection,
  duplicateLineInSection,
} = mainSlice.actions;

export default mainSlice.reducer;
