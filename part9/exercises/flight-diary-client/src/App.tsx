import { useEffect, useState } from "react";
import diaryService from "./services/diaryService";
import { DiaryEntry } from "./types";
import DiaryEntries from "./components/DiaryEntries";
import NewDiaryEntry from "./components/NewDiaryEntry";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    const fetchDiaries = async () => {
      setDiaries(await diaryService.getAllEntries());
    };

    fetchDiaries();
  }, []);
  return (
    <>
      <h1>Flight Diary</h1>
      <NewDiaryEntry />
      {diaries.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <DiaryEntries diaryEntries={diaries} />
      )}
    </>
  );
}

export default App;
