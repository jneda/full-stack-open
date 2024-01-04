import axios from "axios";
const baseUrl = "http://localhost:3001/notes";

const getAll = () =>
  axios.get(baseUrl).then((response) => {
    const nonExisting = {
      id: 10 * 1000,
      content: "This note is not saved to server",
      important: true,
    };
    return response.data.concat(nonExisting);
  });

const create = (newObject) =>
  axios.post(baseUrl, newObject).then((response) => response.data);

const update = (id, newObject) =>
  axios.put(`${baseUrl}/${id}`, newObject).then((response) => response.data);

export default {
  getAll,
  create,
  update,
};
