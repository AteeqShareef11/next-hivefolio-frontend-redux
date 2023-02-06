import { callApis } from '../../utils/utils';
import http from './http-common';

const fetchUsers =async() => {
  return await callApis({path: "/users"})
};

const fetchUser = async(id) => {
  // return http.get(`/users/${id}?populate=*`);
  return await callApis({path: `/users/${id}`})
};

const editUser = (data, id )=> {
  return http.put(`/users/${id}`, data);
};

const addGame = (data, id) => {
  return http.put(`/users/${id}`, data);
};

const removeGame = (data, id) => {
  return http.put(`/users/${id}`, data);
};
const addCharacter = (data, id) => {
  return http.put(`/users/${id}`, data);
};
const removeCharacter = (data, id) => {
  return http.put(`/users/${id}`, data);
};

const addTypeuser = (data, id) => {
  return http.put(`/users/${id}`, data);
};
const removeTypeuser = (data, id) => {
  return http.put(`/users/${id}`, data);
};

const addUserImage = (data, id) => {
  return http.put(`/users/${id}`, data);
};

const removeUserImage = (data, id) => {
  return http.put(`/users/${id}`, data);
};


const userServices = {
  fetchUsers,
  fetchUser,
  editUser,
  addGame,
  removeGame,
  addCharacter,
  removeCharacter,
  addTypeuser,
  removeTypeuser,
  addUserImage,
  removeUserImage,
};

export default userServices;

