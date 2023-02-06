import http from './http-common';

const fetchJobs = () => {
  return http.get('/jobs?populate=*');
};

const fetchJob = id => {
  return http.get(`/jobs/${id}?populate=*`);
};

const createJob = data => {
  return http.post(`/jobs`, data);
};

const editJob = (data, id) => {
  return http.put(`/jobs/${id}`, data);
};

const addGameToJob = (data, id) => {
  return http.put(`/jobs/${id}`, data);
};

const removeGameFromJob = (data, id) => {
  return http.put(`/jobs/${id}`, data);
};
const addTypejob = (data, id) => {
  return http.put(`/jobs/${id}`, data);
};
const removeTypejob = (data, id) => {
  return http.put(`/jobs/${id}`, data);
};



const jobServices = {
  fetchJobs,
  fetchJob,
  createJob,
  editJob,
  addGameToJob,
  removeGameFromJob,
  addTypejob,
  removeTypejob,
};

export default jobServices;
