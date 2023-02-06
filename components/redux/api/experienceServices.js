import http from './http-common';

const fetchExperiences = () => {
  return http.get('/experiences?populate=*');
};

const fetchExperience = id => {
  return http.get(`/experiences/${id}?populate=*`);
};

const createExperienceUser = data => {
  return http.post(`/experiences/`, data);
};

const createExperience = (data) => {
  return http.post(`/experiences/`, data);
};

const userAddRelatedUsers = (data, id) => {
  return http.put(`/teams/${id}`, data);
};

const editExperience = (data, id) => {
  return http.put(`/experiences/${id}`, data);
};
const experienceAddAdmin = (data, id) => {
  return http.put(`/experiences/${id}`, data);
};
const experienceRemoveAdmin = (data, id) => {
  return http.put(`/experiences/${id}`, data);
};

const addGameToExperience = (data, id) => {
  return http.put(`/experiences/${id}`, data);
};
const removeGameFromExperience = (data, id) => {
  return http.put(`/experiences/${id}`, data);
};

const addTypeExperience = (data, id) => {
  return http.put(`/experiences/${id}`, data);
};

const removeTypeExperience = (data, id) => {
  return http.put(`/experiences/${id}`, data);
};

const deleteExperience = (data, id) => {
  return http.delete(`/experiences/${id}`);
};

const experienceServices = {
  fetchExperiences,
  fetchExperience,
  createExperienceUser,
  createExperience,
  userAddRelatedUsers,
  editExperience,
  experienceAddAdmin,
  experienceRemoveAdmin,
  addGameToExperience,
  removeGameFromExperience,
  addTypeExperience,
  removeTypeExperience,
  deleteExperience
};

export default experienceServices;
