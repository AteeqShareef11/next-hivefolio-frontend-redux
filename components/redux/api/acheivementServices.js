import http from './http-common';

const fetchAchievements = () => {
  return http.get('/achievements?populate=*');
};

const fetchAchievement = id => {
  return http.get(`/achievements/${id}?populate=*`);
};

const createAchievementUser = data => {
  return http.post(`/achievements`, data);
};

const achievementAddRelatedUsers = (data, id) => {
  return http.put(`/achievements/${id}`, data);
};

const editAchievement = (data, id) => {
  return http.put(`/achievements/${id}`, data);
};

const achievementAddAdmin = (data, id) => {
  return http.put(`/experiences/${id}`, data);
};

const achievementRemoveAdmin = (data, id) => {
  return http.put(`/achievements/${id}`, data);
};
const addGameToAchievement = (data, id) => {
  return http.put(`/achievement/${id}`, data);
};
const removeGameFromAchievement = (data, id) => {
  return http.put(`/achievement/${id}`, data);
};

const addTypeAchievement = (data, id) => {
  return http.put(`/achievements/${id}`, data);
};
const removeTypeAchievement = (data, id) => {
  return http.put(`/achievements/${id}`, data);
};

const deleteAchievement = (id) => {
  return http.delete(`/achievements/${id}`);
};



const achievementServices = {
  fetchAchievements,
  fetchAchievement,
  editAchievement,
  achievementAddAdmin,
  achievementRemoveAdmin,
  addGameToAchievement,
  removeGameFromAchievement,
  addTypeAchievement,
  removeTypeAchievement,
  deleteAchievement,
  createAchievementUser,
  achievementAddRelatedUsers
};

export default achievementServices;

