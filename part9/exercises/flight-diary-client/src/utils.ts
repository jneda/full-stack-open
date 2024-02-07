import { NewDiaryEntry, Weather, Visibility } from "./types";

const isString = (s: unknown): s is string =>
  typeof s === "string" || s instanceof String;

const parseComment = (comment: unknown): string => {
  if (!isString(comment) || comment.length < 1) {
    throw new Error(`Incorrect comment: "${comment}"`);
  }

  return comment;
};

const isDate = (date: string): boolean => Boolean(Date.parse(date));

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error(`Incorrect date: "${date}"`);
  }

  return date;
};

const isWeather = (s: string): s is Weather =>
  Object.values(Weather)
    .map((v) => v.toString())
    .includes(s);

const parseWeather = (weather: unknown): Weather => {
  if (!isString(weather) || !isWeather(weather)) {
    throw new Error(`Incorrect weather: "${weather}"`);
  }

  return weather;
};

const isVisibility = (s: string): s is Visibility =>
  Object.values(Visibility)
    .map((v) => v.toString())
    .includes(s);

const parseVisibility = (visibility: unknown): Visibility => {
  if (!isString(visibility) || !isVisibility(visibility)) {
    throw new Error(`Incorrect visibility: "${visibility}"`);
  }

  return visibility;
};

export const toNewDiaryEntry = (obj: unknown): NewDiaryEntry => {
  if (!obj || typeof obj !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    !("date" in obj) ||
    !("weather" in obj) ||
    !("visibility" in obj) ||
    !("comment" in obj)
  ) {
    throw new Error("One field is missing");
  }

  return {
    date: parseDate(obj.date),
    weather: parseWeather(obj.weather),
    visibility: parseVisibility(obj.visibility),
    comment: parseComment(obj.comment),
  };
};
