import React, { useState } from "react";
import diaryService from "../services/diaryService";
import { toNewDiaryEntry } from "../utils";
import { Notification, NotificationType } from "../types";

interface NewDiaryEntryProps {
  onComplete: (notification: Notification) => void;
}

const NewDiaryEntry = ({ onComplete }: NewDiaryEntryProps) => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = async (evt: React.SyntheticEvent) => {
    evt.preventDefault();

    try {
      const newEntry = toNewDiaryEntry({
        date,
        visibility,
        weather,
        comment,
      });

      const addedEntry = await diaryService.createEntry(newEntry);

      onComplete({
        type: NotificationType.Success,
        message: `New entry for ${addedEntry.date} has been added.`,
      });

      setDate("");
      setVisibility("");
      setWeather("");
      setComment("");
    } catch (error: unknown) {
      let errorMessage = "An error occurred.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      onComplete({ type: NotificationType.Failure, message: errorMessage });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add new entry</h2>
      <div id="form-inputs-wrapper">
        <label htmlFor="date">Date </label>
        <input
          id="date"
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <label htmlFor="visibility">Visibility </label>
        <input
          id="visibility"
          value={visibility}
          onChange={({ target }) => setVisibility(target.value)}
        />
        <label htmlFor="weather">Weather </label>
        <input
          id="weather"
          value={weather}
          onChange={({ target }) => setWeather(target.value)}
        />
        <label htmlFor="comment">Comment </label>
        <input
          id="comment"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
      </div>
      <button type="submit">Add</button>
    </form>
  );
};

export default NewDiaryEntry;
