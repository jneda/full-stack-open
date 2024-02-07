import React, { useState } from "react";
import diaryService from "../services/diaryService";
import { toNewDiaryEntry } from "../utils";
import {
  Notification,
  NotificationType,
  Visibility,
  Weather,
  DiaryEntry,
} from "../types";
import RadioInput from "./RadioInput";

interface NewDiaryEntryProps {
  onAdd: (addedEntry: DiaryEntry) => void;
  onNotify: (notification: Notification) => void;
}

const NewDiaryEntry = ({ onAdd, onNotify }: NewDiaryEntryProps) => {
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

      onAdd(addedEntry);

      onNotify({
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
      onNotify({ type: NotificationType.Failure, message: errorMessage });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add new entry</h2>
      <div id="form-inputs-wrapper">
        <label htmlFor="date">Date </label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <label htmlFor="visibility">Visibility </label>
        <div className="radio-inputs-wrapper">
          {Object.values(Visibility).map((visibility) => {
            const value = visibility.toString();
            return (
              <RadioInput
                key={value}
                name="visibility"
                value={value}
                onChange={() => setVisibility(value)}
              />
            );
          })}
        </div>
        <label htmlFor="weather">Weather </label>
        <div className="radio-inputs-wrapper">
          {Object.values(Weather).map((weather) => {
            const value = weather.toString();
            return (
              <RadioInput
                key={value}
                name="weather"
                value={value}
                onChange={() => setWeather(value)}
              />
            );
          })}
        </div>
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
