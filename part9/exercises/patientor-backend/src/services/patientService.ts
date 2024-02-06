import patientData from "../../data/patients";

import { Patient, NonSensitivePatient } from "../types";

const patients: Patient[] = patientData;

const getPatients = (): Patient[] => patients;

const getNonSensitivePatients = (): NonSensitivePatient[] =>
  patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));

export default { getPatients, getNonSensitivePatients };
