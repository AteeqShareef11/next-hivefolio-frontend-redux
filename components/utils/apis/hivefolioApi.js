import axios from 'axios';
const baseURL = "https://hivefolio.herokuapp.com/api"

    const token = localStorage.getItem('token') 
    const getHeaders = () => {
    const defaultHeaders = {"content-type": "application/json"}
    if (token) {
        return {
        ...defaultHeaders,
        Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    } 
        return defaultHeaders
    }


export default axios.create({
    baseURL: "https://hivefolio.herokuapp.com/api",
    headers: getHeaders(),
    credentials: "include",
})

console.log("hivefolioApi baseURL", baseURL)

export const usersURL = () => `${baseURL}/users?populate=*`;
export const teamsURL = () => `${baseURL}/teams?populate=*`;
export const organisationsURL = () => `${baseURL}/organisations?populate=*`;
export const communitiesURL = () => `${baseURL}/communities?populate=*`;
export const gamesURL = () => `${baseURL}/games?populate=*`;
export const charactersURL = () => `${baseURL}/characters?populate=*`;
export const jobsURL = () => `${baseURL}/jobs?populate=*`;
export const experiencesURL = () => `${baseURL}/experiences?populate=*`;
export const achievementsURL = () => `${baseURL}/achievements?populate=*`;
export const notificationsURL = () => `${baseURL}/notifications?populate=*`;
export const typeUsersURL = () => `${baseURL}/type-users?populate=*`;
export const typeTeamsURL = () => `${baseURL}/type-teams?populate=*`;
export const typeOrganisationsURL = () => `${baseURL}/type-organisations?populate=*`;
export const typeCommunitiesURL = () => `${baseURL}/type-communities?populate=*`;
export const typeJobsURL = () => `${baseURL}/type-jobs?populate=*`;
export const typeExperiencesURL = () => `${baseURL}/type-experiences?populate=*`;
export const typeAchievementsURL = () => `${baseURL}/type-achievements?populate=*`;
export const announcementsURL = () => `${baseURL}/announcements?populate=*`;

console.log("hivefolioApi usersURL", usersURL())
