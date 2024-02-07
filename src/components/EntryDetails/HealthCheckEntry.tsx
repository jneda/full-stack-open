import { HealthCheckEntry as IHealthCheckEntry, Diagnosis } from "../../types";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Diagnoses from "./Diagnoses";

interface Props {
  entry: IHealthCheckEntry;
  diagnoses: Diagnosis[];
}

const HealthCheckEntry = ({ entry, diagnoses }: Props) => {
  const colorCodes = {
    0: "green",
    1: "blue",
    2: "orange",
    3: "red",
  };

  return (
    <div className="entry">
      <p className="entry-heading">
        {entry.date} <PersonSearchIcon />
      </p>
      <p>
        <em>{entry.description}</em>
      </p>
      {entry?.diagnosisCodes && (
        <Diagnoses entry={entry} diagnoses={diagnoses} />
      )}
      <FavoriteIcon style={{ color: colorCodes[entry.healthCheckRating] }} />
      <p>Diagnosed by {entry.specialist}</p>
    </div>
  );
};

export default HealthCheckEntry;
