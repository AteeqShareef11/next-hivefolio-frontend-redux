import http from './http-common';

const fetchTeams = () => {
  return http.get('/teams?populate=*');
};

const fetchTeam = id => {
  return http.get(`/teams/${id}?populate=*`);
};

const createTeam = data => {
  return http.post(`/teams`, data);
};

const editTeam = (data, id) => {
  return http.put(`/teams/${id}`, data);
};

const teamAddMember = (data, id) => {
  return http.put(`/teams/${id}`, data);
};

const teamRemoveMember = (data, id) => {
  return http.put(`/teams/${id}`, data);
};

const teamAddAdmin = (data, id) => {
  return http.put(`/teams/${id}`, data);
};

const teamRemoveAdmin = id => {
  return http.put(`/teams/${id}`);
};

const teamAddCaptain = (data, id) => {
  return http.put(`/teams/${id}`, data);
};

const teamRemoveCaptain = (data, id) => {
  return http.put(`/teams/${id}`, data);
};

const teamAddCoach = (data, id) => {
  return http.put(`/teams/${id}`, data);
};
const teamRemoveCoach = (data, id) => {
  return http.put(`/teams/${id}`, data);
};
const teamAddOrganisation = (data, id) => {
  return http.put(`/teams/${id}`, data);
};

const teamAddCommunity = (data, id) => {
  return http.put(`/teams/${id}`, data);
};
const teamRemoveCommunity = (data, id) => {
  return http.put(`/teams/${id}`, data);
};


const addGameToTeam = (data, id) => {
  return http.put(`/teams/${id}`, data);
};
const removeGameFromTeam = (data, id) => {
  return http.put(`/teams/${id}`, data);
};
const addTypeteam = (data, id) => {
  return http.put(`/teams/${id}`, data);
};
const removeTypeteam = (data, id) => {
  return http.put(`/teams/${id}`, data);
};
const onboardingTeam = (data, id) => {
  return http.put(`/teams/${id}`, data);
};


const teamServices = {
  fetchTeams,
  fetchTeam,
  createTeam,
  editTeam,
  teamAddMember,
  teamRemoveMember,
  teamAddAdmin,
  teamRemoveAdmin,
  teamAddCaptain,
  teamRemoveCaptain,
  teamAddCoach,
  teamRemoveCoach,
  teamAddOrganisation,
  teamAddCommunity,
  teamRemoveCommunity,
  addGameToTeam,
  removeGameFromTeam,
  addTypeteam,
  removeTypeteam,
  onboardingTeam,
};

export default teamServices;