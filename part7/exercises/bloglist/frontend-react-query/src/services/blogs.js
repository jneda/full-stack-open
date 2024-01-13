import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (userToken) => {
  token = `Bearer ${userToken}`;
};

const configure = () => ({
  headers: { Authorization: token },
});

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newBlog) => {
  const response = await axios.post(baseUrl, newBlog, configure());
  return response.data;
};

const update = async (update) => {
  const { id, ...updateData } = update;
  const response = await axios.put(`${baseUrl}/${id}`, updateData, configure());
  return response.data;
};

const destroy = async (blog) => {
  const response = await axios.delete(`${baseUrl}/${blog.id}`, configure());
  return response.data;
};

export default { getAll, create, update, destroy, setToken };
