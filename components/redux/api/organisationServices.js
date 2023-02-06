import http from './http-common';

const fetchOrganisations = () => {
  return http.get('/organisations');
};

const fetchOrganisation = (id) => {
  return http.get(`/organisations/${id}?populate=*`);
};

const createOrganisation = data => {
  return http.post(`/organisations`, data);
};

const editOrganisation = (data, id) => {
  return http.put(`/organisations/${id}`, data);
};

const organisationAddMember = (data, id) => {
  return http.put(`/organisations/${id}`, data);
};

const organisationRemoveMember = (data, id) => {
  return http.put(`/organisations/${id}`, data);
};
const organisationRemoveAdmin = id => {
  return http.put(`/organisations/${id}`);
};


const organisationAddTeam = (data, id) => {
  return http.put(`/organisations/${id}`, data);
};

const organisationRemoveTeam = (data, id) => {
  return http.put(`/organisations/${id}`, data);
};

const organisationAddCommunity = (data, id) => {
  return http.put(`/organisations/${id}`, data);
};
const organisationRemoveCommunity = (data, id) => {
  return http.put(`/organisations/${id}`, data);
};
const addGameToOrganisation = (data, id) => {
  return http.put(`/organisations/${id}`, data);
};

const removeGameFromOrganisation = (data, id) => {
  return http.put(`/organisations/${id}`, data);
};

const addTypeorganisation = (data, id) => {
  return http.put(`/organisations/${id}`, data);
};
const removeTypeorganisation = (data, id) => {
  return http.put(`/organisations/${id}`, data);
};
const onboardingOrganisation = (data, id) => {
  return http.put(`/organisations/${id}`, data);
};
const organisationServices = {
  fetchOrganisations,
  fetchOrganisation,
  createOrganisation,
  editOrganisation,
  organisationAddMember,
  organisationRemoveMember,
  organisationRemoveAdmin,
  organisationAddTeam,
  organisationRemoveTeam,
  organisationAddCommunity,
  organisationRemoveCommunity,
  addGameToOrganisation,
  removeGameFromOrganisation,
  addTypeorganisation,
  removeTypeorganisation,
  onboardingOrganisation,
};

export default organisationServices;


