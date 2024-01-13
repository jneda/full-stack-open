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

const update = async (blogId, update) => {
  const response = await axios.put(`${baseUrl}/${blogId}`, update, configure());
  return response.data;
};

const destroy = async (blogId) => {
  const response = await axios.delete(`${baseUrl}/${blogId}`, configure());
  return response.data;
};

export default { getAll, create, update, destroy, setToken };
