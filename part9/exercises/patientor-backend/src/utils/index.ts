import {
  NewEntry,
  Gender,
  HealthCheckRating,
  NewPatient,
  NonSensitivePatient,
  Patient,
  Discharge,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
  Diagnosis,
  SickLeave,
} from "../types";

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

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
    throw new Error(`Incorrect or missing date: "${date}"`);
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
    throw new Error(`Incorrect or missing gender: "${gender}"`);
  }

  return gender;
};

const isEntryType = (entryType: unknown) => {
  if (!isString(entryType)) {
    throw new Error(`Incorrect or missing entry type: "${entryType}"`);
  }
  switch (entryType) {
    case "HealthCheck":
    case "Hospital":
    case "OccupationalHealthcare":
      return true;

    default: {
      return false;
    }
  }
};

const parseDiagnosisCodes = (obj: unknown): Array<Diagnosis["code"]> => {
  if (!obj || typeof obj !== "object" || !("diagnosisCodes" in obj)) {
    return [] as Array<Diagnosis["code"]>;
  }
  return obj.diagnosisCodes as Array<Diagnosis["code"]>;
};

const isNumber = (n: unknown): n is number => !isNaN(Number(n));

const isHealthCheckRating = (n: number): n is HealthCheckRating => {
  return Object.values(HealthCheckRating)
    .map((v) => Number(v))
    .includes(n);
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!isNumber(rating) || !isHealthCheckRating(rating)) {
    throw new Error(`Incorrect or missing healthcheck rating: "${rating}"`);
  }

  return rating;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || typeof discharge !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (!("date" in discharge) || !("criteria" in discharge)) {
    throw new Error("Incorrect data: some fields are missing");
  }

  const { date, criteria } = discharge;

  if (!isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing discharge date: "${date}"`);
  }
  if (!isString(criteria)) {
    throw new Error(`Incorrect or missing discharge criteria: "${criteria}"`);
  }

  return { date, criteria };
};

const parseSickLeave = (obj: unknown): SickLeave => {
  if (
    !obj ||
    typeof obj !== "object" ||
    !("sickLeave" in obj) ||
    !obj.sickLeave ||
    typeof obj.sickLeave !== "object"
  ) {
    throw new Error("Incorrect or missing sick leave data");
  }

  const { sickLeave } = obj;
  if (!("startDate" in sickLeave) || !("endDate" in sickLeave)) {
    throw new Error("Incorrect or missing sick leave data");
  }

  const { startDate, endDate } = sickLeave;

  if (!isString(startDate) || !isDate(startDate)) {
    throw new Error(
      `Incorrect or missing sick leave start date: "${startDate}"`
    );
  }

  if (!isString(endDate) || !isDate(endDate)) {
    throw new Error(`Incorrect or missing sick leave end date: "${endDate}"`);
  }

  return { startDate, endDate };
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

export const toNewEntry = (obj: unknown): NewEntry => {
  if (!obj || typeof obj !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    !("description" in obj) ||
    !("date" in obj) ||
    !("specialist" in obj) ||
    !("type" in obj)
  ) {
    throw new Error("Incorrect data: some fields are missing");
  }

  if (!isEntryType(obj.type)) {
    throw new Error(`Incorrect or missing entry type: "${obj.type}"`);
  }

  let baseEntry = {
    description: parseString(obj.description),
    date: parseDate(obj.date),
    specialist: parseString(obj.specialist),
  };

  if ("diagnosisCodes" in obj) {
    baseEntry = Object.assign(baseEntry, {
      diagnosisCodes: parseDiagnosisCodes(obj),
    });
  }

  switch (obj.type) {
    case "HealthCheck": {
      if (!("healthCheckRating" in obj)) {
        throw new Error("Incorrect data: some fields are missing");
      }

      const healthCheckEntry: Omit<HealthCheckEntry, "id"> = {
        ...baseEntry,
        type: "HealthCheck",
        healthCheckRating: parseHealthCheckRating(obj.healthCheckRating),
      };

      return healthCheckEntry;
    }
    case "Hospital": {
      if (!("discharge" in obj)) {
        throw new Error("Incorrect data: some fields are missing");
      }

      const hospitalEntry: Omit<HospitalEntry, "id"> = {
        ...baseEntry,
        type: "Hospital",
        discharge: parseDischarge(obj.discharge),
      };

      return hospitalEntry;
    }
    case "OccupationalHealthcare": {
      if (!("employerName" in obj)) {
        throw new Error("Incorrect data: some fields are missing");
      }

      let occupationalHealthcareEntry: Omit<OccupationalHealthcareEntry, "id"> =
        {
          ...baseEntry,
          type: "OccupationalHealthcare",
          employerName: parseString(obj.employerName),
        };

      if ("sickLeave" in obj) {
        occupationalHealthcareEntry = Object.assign(
          occupationalHealthcareEntry,
          { sickLeave: parseSickLeave(obj) }
        );
      }

      return occupationalHealthcareEntry;
    }
    default:
      throw new Error("Incorrect data.");
  }
};
