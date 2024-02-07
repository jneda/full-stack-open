import {
  Diagnosis,
  OccupationalHealthcareEntry as IOccupationalHealthcareEntry,
} from "../../types";
import HealingIcon from "@mui/icons-material/Healing";
import Diagnoses from "./Diagnoses";

interface Props {
  entry: IOccupationalHealthcareEntry;
  diagnoses: Diagnosis[];
}

const OccupationalHealthcareEntry = ({ entry, diagnoses }: Props) => {
  return (
    <div className="entry">
      <p className="entry-heading">
        {entry.date} <HealingIcon /> <em>{entry.employerName}</em>
      </p>
      <p>
        <em>{entry.description}</em>{" "}
      </p>
      {entry?.diagnosisCodes && (
        <Diagnoses entry={entry} diagnoses={diagnoses} />
      )}
      {entry?.sickLeave && (
        <p>
          Sick leave: from <em>{entry.sickLeave.startDate}</em> to{" "}
          <em>{entry.sickLeave.endDate}</em>
        </p>
      )}
      <p>Diagnosed by {entry.specialist}</p>
    </div>
  );
};

export default OccupationalHealthcareEntry;
