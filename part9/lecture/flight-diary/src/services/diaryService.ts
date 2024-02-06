import diaryData from "../../data/diaries";

import { DiaryEntry, NonSensitiveDiaryEntry } from "../types";

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

const addDiary = () => null;

export default {
  getEntries,
  addDiary,
  getNonSensitiveEntries,
};
