import axios from 'axios';

const API_URL = 'http://localhost:8080/api/users';

const addUser = (user) => axios.post(`${API_URL}/add`, user);
const getUserById = (id) => axios.get(`${API_URL}/${id}`);
const getAllUsers = () => axios.get(`${API_URL}/all`);
const updateUser = (id, user) => axios.put(`${API_URL}/${id}`, user);
const deleteUser = (id) => axios.delete(`${API_URL}/${id}`);

export default { addUser, getUserById, getAllUsers, updateUser, deleteUser };
