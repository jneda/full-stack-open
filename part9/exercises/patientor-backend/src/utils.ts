import { NewPatient, NonSensitivePatient, Patient } from "./types";

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

const isString = (s: unknown): s is string => {
  return typeof s === "string" || s instanceof String;
};

const parseString = (s: unknown): string => {
  if (!isString(s)) {
    throw new Error("Incorrect or missing value");
  }
  if (s.length === 0) {
    throw new Error("Fields must not be empty");
  }

  return s;
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
    dateOfBirth: parseString(obj.dateOfBirth),
    gender: parseString(obj.gender),
    occupation: parseString(obj.occupation),
  };

  return newPatient;
};
