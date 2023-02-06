import { ActionTypes } from "../constants/action-types";
import hivefolioApi from "../../utils/apis/hivefolioApi";
import axios from "axios";

import {fetchUsers, fetchUser, fetchUserId, setUsers, selectedUser, removeSelectedUser, editUser, addGame, removeGame, addCharacter, removeCharacter, addTypeuser, removeTypeuser, addUserImage, removeUserImage, onboardingUser} from '../../redux/actions/userActions';

import {fetchTeams, fetchTeam, fetchTeamId, setTeams, selectedTeam, removeSelectedTeam, createTeam, editTeam, teamAddMember, teamRemoveMember, teamAddAdmin, teamRemoveAdmin, teamAddCaptain, teamRemoveCaptain, teamAddCoach, teamRemoveCoach, teamAddOrganisation, teamRemoveOrganisation, teamAddCommunity, teamRemoveCommunity, addGameToTeam, removeGameFromTeam, addTypeteam, removeTypeteam, onboardingTeam} from '../../redux/actions/teamActions';

import {fetchOrganisations, fetchOrganisation, fetchOganisationId, setOrganisations, selectedOrganisation, removeSelectedOrganisation, createOrganisation, editOrganisation, organisationAddMember, organisationRemoveMember, organisationAddAdmin, organisationRemoveAdmin, organisationAddTeam, organisationRemoveTeam, organisationAddCommunity, organisationRemoveCommunity, addGameToOrganisation, removeGameFromOrganisation, addTypeorganisation, removeTypeorganisation, onboardingOrganisation} from '../../redux/actions/organisationActions';

import {fetchCommunities, fetchCommunity, fetchCommunityId, setCommunities, selectedCommunity, removeSelectedCommunity, createCommunity, editCommunity, communityAddMember, communityRemoveMember, communityAddAdmin, communityRemoveAdmin, communityAddTeam, communityRemoveTeam, communityAddOrganisation, communityRemoveOrganisation, addGameToCommunity, removeGameFromCommunity, addTypecommunity, removeTypecommunity, onboardingCommunity} from '../../redux/actions/communityActions';

import { fetchGames, fetchGame, setGames, selectedGame, removeSelectedGame } from '../../redux/actions/gameActions';

import {fetchCharacters, fetchCharacter, setCharacter, selectedCharacter, removeSelectedCharacter} from '../../redux/actions/characterActions';

import {fetchExperiences, fetchExperience, createExperienceUser, userAddRelatedUsers, editExperience, experienceAddAdmin, experienceRemoveAdmin, addGameToExperience, removeGameFromExperience, addTypeExperience, removeTypeExperience, deleteExperience} from '../../redux/actions/experienceAction';

import {fetchAchievements, fetchAchievement, createAchievementUser, achievementAddRelatedUsers, editAchievement, achievementAddAdmin, achievementRemoveAdmin, addGameToAchievement, removeGameFromAchievement, addTypeAchievement, removeTypeAchievement, deleteAchievement} from '../../redux/actions/achievementAction';

import {fetchJobs, fetchJob, setJobs, selectedJob, removeSelectedJob, createJob, editJob, addGameToJob, removeGameFromJob, addTypejob, removeTypejob} from '../../redux/actions/jobActions';

import {fetchTypeusers, fetchTypeteams, fetchTypeorganisations, fetchTypecommunities, fetchTypejobs, fetchTypeExperiences, fetchTypeAchievements} from '../../redux/actions/typeActions';

import {setNotifications, selectedNotification, removeSelectedNotification, notifiationDelete, createNotificationTeamMemberRequest, notificationTeamMemberApprove, createNotificationOrganisationMemberRequest, notificationOrganisationMemberApprove, createNotificationOrganisationTeamRequest, notificationOrganisationTeamApprove, createNotificationOrganisationCommunityRequest, notificationOrganisationCommunityApprove, createNotificationCommunityMemberRequest, notificationCommunityMemberApprove, createNotificationCommunityTeamRequest, notificationCommunityTeamApprove, notificationRead} from '../../redux/actions/notificationActions';

import {fetchTypenotifications} from '../../redux/actions/typenotificationActions';

import {fetchAnnouncements} from '../../redux/actions/announcementActions';




import {
    usersURL,
    teamsURL,
    organisationsURL,
    communitiesURL,
    gamesURL,
    charactersURL,
    jobsURL,
    experiencesURL,
    achievementsURL,
    notificationsURL,
    typeUsersURL,
    typeTeamsURL,
    typeOrganisationsURL,
    typeCommunitiesURL,
    typeJobsURL,
    typeExperiencesURL,
    typeAchievementsURL,
    announcementsURL
  } from "../../utils/apis/hivefolioApi";

  export {fetchUsers, fetchUser, fetchUserId, setUsers, selectedUser, removeSelectedUser, editUser, addGame, removeGame, addCharacter, removeCharacter, addTypeuser, removeTypeuser, addUserImage, removeUserImage, onboardingUser}

  export {fetchTeams, fetchTeam, fetchTeamId, setTeams, selectedTeam, removeSelectedTeam, createTeam, editTeam, teamAddMember, teamRemoveMember, teamAddAdmin, teamRemoveAdmin, teamAddCaptain, teamRemoveCaptain, teamAddCoach, teamRemoveCoach, teamAddOrganisation, teamRemoveOrganisation, teamAddCommunity, teamRemoveCommunity, addGameToTeam, removeGameFromTeam, addTypeteam, removeTypeteam, onboardingTeam}

  export {fetchOrganisations, fetchOrganisation, fetchOganisationId, setOrganisations, selectedOrganisation, removeSelectedOrganisation, createOrganisation, editOrganisation, organisationAddMember, organisationRemoveMember, organisationAddAdmin, organisationRemoveAdmin, organisationAddTeam, organisationRemoveTeam, organisationAddCommunity, organisationRemoveCommunity, addGameToOrganisation, removeGameFromOrganisation, addTypeorganisation, removeTypeorganisation, onboardingOrganisation}

  export {fetchCommunities, fetchCommunity, fetchCommunityId, setCommunities, selectedCommunity, removeSelectedCommunity, createCommunity, editCommunity, communityAddMember, communityRemoveMember, communityAddAdmin, communityRemoveAdmin, communityAddTeam, communityRemoveTeam, communityAddOrganisation, communityRemoveOrganisation, addGameToCommunity, removeGameFromCommunity, addTypecommunity, removeTypecommunity, onboardingCommunity};

  export {fetchGames, fetchGame, setGames, selectedGame, removeSelectedGame};

  export {fetchCharacters, fetchCharacter, setCharacter, selectedCharacter, removeSelectedCharacter};

  export {fetchExperiences, fetchExperience, createExperienceUser, userAddRelatedUsers, editExperience, experienceAddAdmin, experienceRemoveAdmin, addGameToExperience, removeGameFromExperience, addTypeExperience, removeTypeExperience, deleteExperience};

  export {fetchAchievements, fetchAchievement, createAchievementUser, achievementAddRelatedUsers, editAchievement, achievementAddAdmin, achievementRemoveAdmin, addGameToAchievement, removeGameFromAchievement, addTypeAchievement, removeTypeAchievement, deleteAchievement};

  export {fetchJobs, fetchJob, setJobs, selectedJob, removeSelectedJob, createJob, editJob, addGameToJob, removeGameFromJob, addTypejob, removeTypejob};

  export {fetchTypeusers, fetchTypeteams, fetchTypeorganisations, fetchTypecommunities, fetchTypejobs, fetchTypeExperiences, fetchTypeAchievements};

  export {setNotifications, selectedNotification, removeSelectedNotification, notifiationDelete, createNotificationTeamMemberRequest, notificationTeamMemberApprove, createNotificationOrganisationMemberRequest, notificationOrganisationMemberApprove, createNotificationOrganisationTeamRequest, notificationOrganisationTeamApprove, createNotificationOrganisationCommunityRequest, notificationOrganisationCommunityApprove, createNotificationCommunityMemberRequest, notificationCommunityMemberApprove, createNotificationCommunityTeamRequest, notificationCommunityTeamApprove, notificationRead};

  export {fetchTypenotifications};

  export {fetchAnnouncements};


  export const fetchCoreData = () => async (dispatch) => {
    //FETCH AXIOS
    const usersData = await axios.get(`${usersURL()}`);
    const teamsData = await axios.get(`${teamsURL()}`);
    const organisationsData = await axios.get(`${organisationsURL()}`);
    const communitiesData = await axios.get(`${communitiesURL()}`);
    const gamesData = await axios.get(`${gamesURL()}`);
    const charactersData = await axios.get(`${charactersURL()}`);
    const jobsData = await axios.get(`${jobsURL()}`);
    const experiencesData = await axios.get(`${experiencesURL()}`);
    const achievementsData = await axios.get(`${achievementsURL()}`);
    const notificationsData = await axios.get(`${notificationsURL()}`);
    const typeUsersData = await axios.get(`${typeUsersURL()}`);
    const typeTeamsData = await axios.get(`${typeTeamsURL()}`);
    const typeOrganisarionsData = await axios.get(`${typeOrganisationsURL()}`);
    const typeCommunitiesData = await axios.get(`${typeCommunitiesURL()}`);
    const typeJobsData = await axios.get(`${typeJobsURL()}`);
    const typeExperiencesData = await axios.get(`${typeExperiencesURL()}`);
    const typeAchievementsData = await axios.get(`${typeAchievementsURL()}`);
    const announcementsData = await axios.get(`${announcementsURL()}`);
    console.log("coreActions usersData", usersData);

    dispatch({
        type: ActionTypes.FETCH_CORE_DATA,
        payload: {
          users: usersData.data,
          teams: teamsData.data.data,
          organisations: organisationsData.data,
          communities: communitiesData.data,
          games: gamesData.data.data,
          characters: charactersData.data,
          jobs: jobsData.data,
          experiences: experiencesData.data,
          achievements: achievementsData.data,
          notifications: notificationsData.data,
          typeUsers: typeUsersData.data,
          typeTeams: typeTeamsData.data,
          typeOrganisations: typeOrganisarionsData.data,
          typeCommunities: typeCommunitiesData.data,
          typeJobs: typeJobsData.data,
          typeExperiences: typeExperiencesData.data,
          typeAchievements: typeAchievementsData.data,
          announcements: announcementsData.data,
          

        },
        
    }
      
    );
  }; 

  export const removeCoreData = () => {
    return {
        type: ActionTypes.REMOVE_CORE_DATA,
    };
};

