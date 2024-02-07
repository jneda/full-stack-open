import uuid = require("uuid");
import patientData from "../../data/patients";

import { Patient, NonSensitivePatient, NewPatient } from "../types";
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

export default { getPatients, getPatient, getNonSensitivePatients, addPatient };
