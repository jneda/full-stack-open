import { HospitalEntry as IHospitalEntry, Diagnosis } from "../../types";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import Diagnoses from "./Diagnoses";

interface Props {
  entry: IHospitalEntry;
  diagnoses: Diagnosis[];
}

const HospitalEntry = ({ entry, diagnoses }: Props) => {
  return (
    <div className="entry">
      <p className="entry-heading">
        {entry.date} <LocalHospitalIcon />
      </p>
      <p>
        <em>{entry.description}</em>
      </p>
      {entry?.diagnosisCodes && (
        <Diagnoses entry={entry} diagnoses={diagnoses} />
      )}
      <p>Diagnosed by {entry.specialist}</p>
      <p>Discharge: {entry.discharge.date}</p>
      <p>Criteria: {entry.discharge.criteria}</p>
    </div>
  );
};

export default HospitalEntry;
