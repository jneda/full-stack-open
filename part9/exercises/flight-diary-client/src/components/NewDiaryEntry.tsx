import React, { useState } from "react";
import diaryService from "../services/diaryService";

const NewDiaryEntry = () => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    
    const newEntry = {
      date,
      visibility,
      weather,
      comment,
    };

    diaryService.createEntry(newEntry);

    setDate("");
    setVisibility("");
    setWeather("");
    setComment("");
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
