
import http from './http-common';

const fetchTypeusers = () => {
  return http.get('/type-users?populate=*');
};


const fetchTypeteams = () => {
  return http.get('/type-teams?populate=*');
};
const fetchTypeorganisations = () => {
  return http.get('/type-organisations?populate=*');
};

const fetchTypecommunities = () => {
  return http.get('/type-communities?populate=*');
};
const fetchTypejobs = () => {
  return http.get('/type-communities?populate=*');
};

const fetchTypeExperiences = () => {
  return http.get('/type-experiences?populate=*');
};


const fetchTypeAchievements = () => {
  return http.get('/type-achievements?populate=*');
};



const typeServices = {
  fetchTypeusers,
  fetchTypeteams,
  fetchTypeorganisations,
  fetchTypecommunities,
  fetchTypejobs,
  fetchTypeExperiences,
  fetchTypeAchievements,
};

export default typeServices;
