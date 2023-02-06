import http from './http-common';

const fetchCommunities = () => {
  return http.get('/communities?populate=*');
};

const fetchCommunity = id => {
  return http.get(`/communities/${id}?populate=*`);
};

const createCommunity = data => {
  return http.post(`/communities/`, data);
};



const editCommunity = (data, id) => {
  return http.put(`/communities/${id}`, data);
};

const communityAddMember = (data, id) => {
  return http.put(`/communities/${id}`, data);
};

const communityRemoveMember = (data, id) => {
  return http.put(`/communities/${id}`, data);
};
const communityAddAdmin = (data, id) => {
  return http.put(`/communities/${id}`, data);
};
const communityRemoveAdmin = (data, id) => {
  return http.put(`/communities/${id}`, data);
};

const communityAddTeam = (data, id) => {
  return http.put(`/communities/${id}`, data);
};
const communityRemoveTeam = (data, id) => {
  return http.put(`/communities/${id}`, data);
};

const communityAddOrganisation = (data, id) => {
  return http.put(`/communities/${id}`, data);
};

const communityRemoveOrganisation = (data, id) => {
  return http.put(`/communities/${id}`, data);
};

const addGameToCommunity = (data, id) => {
  return http.put(`/communities/${id}`, data);
};

const removeGameFromCommunity = (data, id) => {
return http.put(`/communities/${id}`, data);
};
const addTypecommunity = (data, id) => {
  return http.put(`/communities/${id}`, data);
};

const removeTypecommunity = (data, id) => {
  return http.put(`/communities/${id}`, data);
};

const onboardingCommunity = (data, id) => {
  return http.put(`/communities/${id}`, data);
};
const communityServices = {
  fetchCommunities,
  fetchCommunity,
  createCommunity,
  editCommunity,
  communityAddMember,
  communityRemoveMember,
  communityAddAdmin,
  communityRemoveAdmin,
  communityAddTeam,
  communityRemoveTeam,
  communityAddOrganisation,
  addGameToCommunity,
  communityRemoveOrganisation,
  removeGameFromCommunity,
  addTypecommunity,
  removeTypecommunity,
  onboardingCommunity,
};

export default communityServices;

