import { DiaryEntry as IDiaryEntry } from "../types";

interface DiaryEntriesProps {
  diaryEntries: IDiaryEntry[];
}

interface DiaryEntryProps {
  diaryEntry: IDiaryEntry;
}

const DiaryEntries = ({ diaryEntries }: DiaryEntriesProps) => (
  <main>
    {
      <main>
        <h2>Diary Entries</h2>
        {diaryEntries.map((diaryEntry) => (
          <DiaryEntry key={diaryEntry.id} diaryEntry={diaryEntry} />
        ))}
      </main>
    }
  </main>
);

const DiaryEntry = ({ diaryEntry }: DiaryEntryProps) => (
  <article>
    <h3>{diaryEntry.date}</h3>
    <p>Visibility: {diaryEntry.visibility}</p>
    <p>Weather: {diaryEntry.weather}</p>
    <p>Comment: {diaryEntry.comment}</p>
  </article>
);

export default DiaryEntries;
