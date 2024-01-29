import PropTypes from "prop-types";
import { useQuery } from "@apollo/client";
import { ALL_AUTHORS } from "../queries";
import BirthYearForm from "./BirthYearForm";

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS);

  if (!props.show) {
    return null;
  }

  if (result.loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Born</th>
            <th>Books</th>
          </tr>
          {result.data.allAuthors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <BirthYearForm />
    </div>
  );
};

Authors.propTypes = {
  show: PropTypes.bool,
};

export default Authors;
