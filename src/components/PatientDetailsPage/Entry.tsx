import { Entry as IEntry } from "../../types";

interface Props {
  entry: IEntry;
}

const Entry = ({ entry }: Props) => {
  return (
    <>
      <p>
        {entry.date} <em>{entry.description}</em>
      </p>
      {entry?.diagnosisCodes && (
        <ul>
          {entry.diagnosisCodes.map((dc) => (
            <li key={`${entry.id}-${dc}`}>{dc}</li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Entry;
