import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ALL_AUTHORS, EDIT_BIRTH_YEAR } from "../queries";

const BirthYearForm = () => {
  const [year, setYear] = useState("");

  const [editBirthYear] = useMutation(EDIT_BIRTH_YEAR);
  const authorsQuery = useQuery(ALL_AUTHORS);

  const submit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const { name } = Object.fromEntries(formData);

    editBirthYear({ variables: { name, year: parseInt(year) } });

    setYear("");
  };

  if (authorsQuery.loading) return <div>Loading...</div>;

  return (
    <div>
      <h3>Set birth year</h3>
      <form onSubmit={submit}>
        <div>
          Name{" "}
          <select name="name">
            {authorsQuery.data.allAuthors.map((a) => (
              <option key={a.id} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          Born{" "}
          <input
            value={year}
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <button type="submit">Update author</button>
      </form>
    </div>
  );
};

export default BirthYearForm;
