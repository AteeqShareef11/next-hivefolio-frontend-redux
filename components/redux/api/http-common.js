// import axios from 'axios';
import axios from 'axios';
const baseURL = 'https://hivefolio.herokuapp.com/api';

const token = localStorage.getItem('token');
const getHeaders = () => {
  const defaultHeaders = { 'content-type': 'application/json' };
  if (token) {
    return {
      ...defaultHeaders,
      Authorization: `Bearer ${token}`,
    };
  }
  return defaultHeaders;
};

export default axios.create({
  baseURL: 'https://hivefolio.herokuapp.com/api',
  headers: getHeaders(),
  credentials: 'include',
});

console.log('hivefolioApi baseURL', baseURL);

export const usersURL = () => `${baseURL}/users`;
export const teamsURL = () => `${baseURL}/teams`;
export const organisationsURL = () => `${baseURL}/organisations`;
export const communitiesURL = () => `${baseURL}/communities`;
export const gamesURL = () => `${baseURL}/games`;
export const charactersURL = () => `${baseURL}/characters`;
export const jobsURL = () => `${baseURL}/jobs`;
export const experiencesURL = () => `${baseURL}/experiences`;
export const achievementsURL = () => `${baseURL}/achievements`;
export const notificationsURL = () => `${baseURL}/notifications`;
export const typeUsersURL = () => `${baseURL}/typeusers`;
export const typeTeamsURL = () => `${baseURL}/typeteams`;
export const typeOrganisationsURL = () => `${baseURL}/typeorganisations`;
export const typeCommunitiesURL = () => `${baseURL}/typecommunities`;
export const typeJobsURL = () => `${baseURL}/type-jobs`;
export const typeExperiencesURL = () => `${baseURL}/type-experiences`;
export const typeAchievementsURL = () => `${baseURL}/type-achievements`;
export const announcementsURL = () => `${baseURL}/announcements`;

console.log('hivefolioApi usersURL', usersURL());
