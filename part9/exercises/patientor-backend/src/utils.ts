import { Gender, NewPatient, NonSensitivePatient, Patient } from "./types";

export const deSensitivizePatient = ({
  id,
  name,
  dateOfBirth,
  gender,
  occupation,
}: Patient): NonSensitivePatient => ({
  id,
  name,
  dateOfBirth,
  gender,
  occupation,
});

const isString = (s: unknown): s is string =>
  typeof s === "string" || s instanceof String;

const parseString = (s: unknown): string => {
  if (!isString(s)) {
    throw new Error("Incorrect or missing value");
  }
  if (s.length === 0) {
    throw new Error("Fields must not be empty");
  }

  return s;
};

const isDate = (date: string): boolean => Boolean(Date.parse(date));

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${date}`);
  }

  return date;
};

const isGender = (s: string): s is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(s);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }

  return gender;
};

export const toNewPatient = (obj: unknown): NewPatient => {
  if (!obj || typeof obj !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    !("name" in obj) ||
    !("ssn" in obj) ||
    !("dateOfBirth" in obj) ||
    !("gender" in obj) ||
    !("occupation" in obj)
  ) {
    throw new Error("Incorrect data: some fields are missing");
  }

  const newPatient = {
    name: parseString(obj.name),
    ssn: parseString(obj.ssn),
    dateOfBirth: parseDate(obj.dateOfBirth),
    gender: parseGender(obj.gender),
    occupation: parseString(obj.occupation),
  };

  return newPatient;
};
