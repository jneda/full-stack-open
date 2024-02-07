import { Diagnosis, Entry } from "../../types";

interface Props {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const Diagnoses = ({ entry, diagnoses }: Props) => {
  return (
    <ul>
      {entry.diagnosisCodes!.map((dc) => {
        const diagnosis = diagnoses.find((d) => d.code === dc);
        return (
          <li key={`${entry.id}-${dc}`}>
            {dc} {diagnosis && diagnosis.name}
          </li>
        );
      })}
    </ul>
  );
};

export default Diagnoses;
