import { useEffect, useState } from "react";
import { Patient } from "../../types";
import patientService from "../../services/patients";
import GenderIcon from "./GenderIcon";
import Entry from "./Entry";

interface Props {
  patientId: string;
}

const PatientDetailsPage = ({ patientId }: Props) => {
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      const patient = await patientService.getPatientById(patientId);
      setPatient(patient);
    };

    fetchPatient();
  }, [patientId]);

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
        <Entry key={e.id} entry={e} />
      ))}
    </>
  );
};

export default PatientDetailsPage;
