import { useEffect, useState } from "react";
import { Patient } from "../../types";
import patientService from "../../services/patients";
import TransgenderIcon from "@mui/icons-material/Transgender";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";

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

  let genderIcon;
  switch (patient.gender) {
    case "male": {
      genderIcon = <MaleIcon />;
      break;
    }
    case "female": {
      genderIcon = <FemaleIcon />;
      break;
    }
    case "other": {
      genderIcon = <TransgenderIcon />;
      break;
    }
    default: {
      throw new Error(`Unexpected gender: ${patient.gender}`);
    }
  }

  return (
    <>
      <h2>
        {patient.name} {genderIcon}
      </h2>
      <p>Ssn: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>
    </>
  );
};

export default PatientDetailsPage;
