import { Diagnosis, Entry } from "../../types";
import { assertNever } from "../../utils";
import HealthCheckEntry from "./HealthCheckEntry";
import HospitalEntry from "./HospitalEntry";
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry";

interface Props {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const EntryDetails = ({ entry, diagnoses }: Props) => {
  switch (entry.type) {
    case "HealthCheck": {
      return <HealthCheckEntry entry={entry} diagnoses={diagnoses} />;
    }
    case "Hospital": {
      return <HospitalEntry entry={entry} diagnoses={diagnoses} />;
    }
    case "OccupationalHealthcare": {
      return (
        <OccupationalHealthcareEntry entry={entry} diagnoses={diagnoses} />
      );
    }
    default: {
      return assertNever(entry);
    }
  }
};

export default EntryDetails;
