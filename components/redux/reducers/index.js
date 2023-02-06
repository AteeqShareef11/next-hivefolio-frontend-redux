import {combineReducers} from 'redux';
import { coreReducer } from './coreReducer';
import { userReducer, selectedUserReducer} from './userReducer';
import { teamReducer, selectedTeamReducer } from './teamReducer';
import { organisationReducer, selectedOrganisationReducer } from './organisationReducer';
import { communityReducer, selectedCommunityReducer } from './communityReducer';
import { gameReducer, selectedGameReducer } from './gameReducer';
import { characterReducer, selectedCharacterReducer } from './characterReducer';
import { notificationReducer, selectedNotificationReducer } from './notificationReducer';
import { announcementReducer } from './announcementReducer'
import { typenotificationReducer } from './typenotificationReducer';
import { typeuserReducer, typeteamReducer, typeorganisationReducer, typecommunityReducer, typejobReducer, typeExperienceReducer } from './typeReducer';
import { experienceReducer, selectedExperienceReducer } from './experienceReducer';
import { achievementReducer, selectedAchievementReducer } from './achievementReducer';
import { jobReducer, selectedJobReducer } from './jobReducer';

const reducers = combineReducers({
    allData: coreReducer,

    allUsers: userReducer,
    user: selectedUserReducer,

    allTeams: teamReducer,
    team: selectedTeamReducer,

    allOrganisations: organisationReducer,
    organisation: selectedOrganisationReducer,

    allCommunities: communityReducer,
    community: selectedCommunityReducer,

    allCharacters: characterReducer,
    character: selectedCharacterReducer,

    allGames: gameReducer,
    game: selectedGameReducer,

    allJobs: jobReducer,
    job: selectedJobReducer,

    allNotifications: notificationReducer,
    notification: selectedNotificationReducer,

    allAnnouncements: announcementReducer,

    allTypeusers: typeuserReducer,

    allTypeteams: typeteamReducer,

    allTypeorganisations: typeorganisationReducer,

    allTypecommunities: typecommunityReducer,

    allTypejobs: typejobReducer,

    allTypenotifications: typenotificationReducer,

    allTypeExperiences: typeExperienceReducer,

    allExperiences: experienceReducer,
    experience: selectedExperienceReducer,

    allAchievements: achievementReducer,
    achievements: selectedAchievementReducer,
});

export default reducers;