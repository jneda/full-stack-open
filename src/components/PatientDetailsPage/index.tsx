import { useEffect, useState } from "react";
import axios from "axios";
import { Patient, Diagnosis, EntryFormValues } from "../../types";
import patientService from "../../services/patients";
import diagnosisService from "../../services/diagnoses";
import Button from "@mui/material/Button";
import GenderIcon from "./GenderIcon";
import EntryDetails from "../EntryDetails";
import AddEntryModal from "../AddEntryModal";

interface Props {
  patientId: string;
}

const PatientDetailsPage = ({ patientId }: Props) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState<string>();

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

  const openModal = () => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    if (!patient) return;

    try {
      const addedEntry = await patientService.createEntry(patient.id, values);
      patient.entries = patient.entries.concat(addedEntry);
      setPatient(patient);
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e.response.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            ""
          );
          console.error(message);
          setError(message);
        } else if (
          e?.response?.data &&
          typeof e.response.data === "object" &&
          "error" in e.response.data
        ) {
          setError(
            e.response.data.error.replace("An error occurred. Error: ", "")
          );
        } else {
          console.error("Unknown error", e);
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

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
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
      <AddEntryModal
        modalOpen={modalOpen}
        onClose={closeModal}
        error={error}
        onSubmit={submitNewEntry}
      />
      {patient.entries.map((e) => (
        <EntryDetails key={e.id} entry={e} diagnoses={diagnoses} />
      ))}
    </>
  );
};

export default PatientDetailsPage;
