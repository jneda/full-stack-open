import { useEffect, useState } from "react";
import { Patient, Diagnosis } from "../../types";
import patientService from "../../services/patients";
import diagnosisService from "../../services/diagnoses";
import GenderIcon from "./GenderIcon";
import EntryDetails from "../EntryDetails";

interface Props {
  patientId: string;
}

const PatientDetailsPage = ({ patientId }: Props) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchPatient = async () => {
      const patient = await patientService.getPatientById(patientId);
      setPatient(patient);
    };

    fetchPatient();
  }, [patientId]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosisService.getAll();
      setDiagnoses(diagnoses);
    };

    fetchDiagnoses();
  }, []);

  if (!patient) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h2>
        {patient.name} <GenderIcon patient={patient} />
      </h2>
      <p>Ssn: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>
      <h2>Entries</h2>
      {patient.entries.map((e) => (
        <EntryDetails key={e.id} entry={e} diagnoses={diagnoses} />
      ))}
    </>
  );
};

export default PatientDetailsPage;
