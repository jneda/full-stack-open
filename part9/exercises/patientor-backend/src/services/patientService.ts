import uuid = require("uuid");
import patientData from "../../data/patients";

import {
  Patient,
  NonSensitivePatient,
  NewPatient,
  NewEntry,
  Entry,
} from "../types";
import { deSensitivizePatient } from "../utils";

const patients: Patient[] = patientData;

const getPatients = (): Patient[] => patients;

const getPatient = (id: string): Patient | undefined =>
  patients.find((p) => p.id === id);

const getNonSensitivePatients = (): NonSensitivePatient[] =>
  patients.map(deSensitivizePatient);

const addPatient = (patient: NewPatient): NonSensitivePatient => {
  const newPatient = {
    id: uuid.v1(),
    entries: [],
    ...patient,
  };

  patients.push(newPatient);
  return deSensitivizePatient(newPatient);
};

const addEntry = (id: string, entry: NewEntry): Entry => {
  const patient = patients.find((p) => p.id === id);

  if (!patient) {
    throw new Error("Resource not found");
  }

  const patientIndex = patients.indexOf(patient);

  const newEntry = {
    id: uuid.v1(),
    ...entry,
  };

  patient.entries.push(newEntry);
  patients[patientIndex] = patient;

  return newEntry;
};

export default {
  getPatients,
  getPatient,
  getNonSensitivePatients,
  addPatient,
  addEntry,
};
