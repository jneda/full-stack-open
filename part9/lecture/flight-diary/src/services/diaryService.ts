import diaryData from "../../data/diaries";

import { DiaryEntry, NonSensitiveDiaryEntry, NewDiaryEntry } from "../types";

const diaries: DiaryEntry[] = diaryData;

const getEntries = (): DiaryEntry[] => diaries;

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));
};

const addDiary = (entry: NewDiaryEntry): DiaryEntry => {
  const newDiaryEntry = {
    id: Math.max(...diaries.map((d) => d.id)) + 1,
    ...entry,
  };

  diaries.push(newDiaryEntry);
  return newDiaryEntry;
};

const findById = (id: number): DiaryEntry | undefined => {
  return diaries.find((d) => d.id === id);
};

export default {
  getEntries,
  addDiary,
  getNonSensitiveEntries,
  findById,
};
