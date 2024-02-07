import { useEffect, useState } from "react";
import diaryService from "./services/diaryService";
import {
  DiaryEntry,
  Notification as INotification,
  NotificationType,
} from "./types";
import DiaryEntries from "./components/DiaryEntries";
import NewDiaryEntry from "./components/NewDiaryEntry";
import Notification from "./components/Notification";

function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [notification, setNotification] = useState<INotification | null>(null);

  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        setDiaryEntries(await diaryService.getAllEntries());
      } catch (error: unknown) {
        let errorMessage = "An error occurred.";
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        notify({ type: NotificationType.Failure, message: errorMessage });
      }
    };

    fetchDiaries();
  }, []);

  const handleNewDiaryEntry = (addedEntry: DiaryEntry) =>
    setDiaryEntries(diaryEntries.concat(addedEntry));

  const notify = (notification: INotification) => {
    setNotification(notification);
    setTimeout(() => setNotification(null), 5000);
  };

  return (
    <>
      <h1>Flight Diary</h1>
      <NewDiaryEntry onAdd={handleNewDiaryEntry} onNotify={notify} />
      {notification && <Notification notification={notification} />}
      {diaryEntries.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <DiaryEntries diaryEntries={diaryEntries} />
      )}
    </>
  );
}

export default App;
