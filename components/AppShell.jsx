import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { useRouter } from 'next/router'

import { useEffect, useState } from 'react';
import { IonReactRouter } from '@ionic/react-router';
import { BrowserRouter as Router, Route, Redirect, useLocation } from 'react-router-dom';

/* User */
import { useCurrentUser } from './context/AuthContext';

/* Pages */
import Home from './pages/Home';
import Players from './pages/Players';
import Commentators from './pages/Commentators';
import Specialists from './pages/Specialists';
import Teams from './pages/Teams';
import Organisations from './pages/Organisations';
import Games from './pages/Games';
import Events from './pages/Events';
import Communities from './pages/Communities';
import Characters from './pages/Characters';
import Company from './pages/Company';
import Jobs from './pages/Jobs';
import Marketplace from './pages/Marketplace';
import Scores from './pages/Scores';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import PasswordForgotten from './pages/PasswordForgotten';
import PasswordReset from './pages/PasswordReset';
import AuthPortal from './pages/AuthPortal';
import AuthPortalMagic from './pages/AuthPortalMagic';
import Onboarding from './pages/Onboarding';
import OnboardingTeam from './pages/OnboardingTeam';
import OnboardingOrganisation from './pages/OnboardingOrganisation';
import OnboardingCommunity from './pages/OnboardingCommunity';
import OnboardingJob from './pages/OnboardingJob';
import Notifications from './pages/Notifications';

import Create from './pages/Create';
import CreateTeam from './pages/CreateTeam';
import CreateOrganisation from './pages/CreateOrganisation';
import CreateCommunity from './pages/CreateCommunity';
import CreateJob from './pages/CreateJob';

import Account from './pages/Account';
import AccountMedia from './pages/AccountMedia';
import AccountSocial from './pages/AccountSocial';
import AccountStreams from './pages/AccountStreams';
import AccountFollowing from './pages/AccountFollowing';
import AccountSettings from './pages/AccountSettings';

import EditTeam from './pages/EditTeam';
import EditTeamMembers from './pages/EditTeamMembers';
import EditTeamMedia from './pages/EditTeamMedia';
import EditTeamFollowing from './pages/EditTeamFollowing';
import EditTeamSocial from './pages/EditTeamSocial';
import EditTeamStreams from './pages/EditTeamStreams';
import EditTeamSettings from './pages/EditTeamSettings';

import EditOrganisation from './pages/EditOrganisation';
import EditOrganisationMedia from './pages/EditOrganisationMedia';
import EditOrganisationMembers from './pages/EditOrganisationMembers';
import EditOrganisationTeams from './pages/EditOrganisationTeams';
import EditOrganisationCommunities from './pages/EditOrganisationCommunities';
import EditOrganisationSocial from './pages/EditOrganisationSocial';
import EditOrganisationStreams from './pages/EditOrganisationStreams';
import EditOrganisationSettings from './pages/EditOrganisationSettings';

import EditCommunity from './pages/EditCommunity';
import EditCommunityMedia from './pages/EditCommunityMedia';
import EditCommunityMembers from './pages/EditCommunityMembers';
import EditCommunityTeams from './pages/EditCommunityTeams';
import EditCommunitySocial from './pages/EditCommunitySocial';
import EditCommunityStreams from './pages/EditCommunityStreams';
import EditCommunitySettings from './pages/EditCommunitySettings';

import EditJob from './pages/EditJob';
import EditJobMedia from './pages/EditJobMedia';
import EditJobMembers from './pages/EditJobMembers';
import EditJobSettings from './pages/EditJobSettings';

import EditExperiencesUser from './pages/EditExperiencesUser';
import EditExperiencesTeam from './pages/EditExperiencesTeam';
import EditExperiencesOrganisation from './pages/EditExperiencesOrganisation';
import EditExperiencesCommunity from './pages/EditExperiencesCommunity';

import ProfileUser from './pages/ProfileUser';
import ProfileTeam from './pages/ProfileTeam';
import ProfileOrganisation from './pages/ProfileOrganisation';
import ProfileGame from './pages/ProfileGame';
import ProfileCharacter from './pages/ProfileCharacter';
import ProfileEvent from './pages/ProfileEvent';
import ProfileCommunity from './pages/ProfileCommunity';
import ProfileJob from './pages/ProfileJob';

import ProfileUserTest from './pages/ProfileUserTest';

import NotFound from './pages/NotFound';

/* Components */
import { NavigationMenu } from './ui/Navigation/NavigationMenu';
import Tabs from './pages/Tabs';
import PopoverAccount from './ui/Popover/PopoverAccount'

import CookieConsent from 'react-cookie-consent';
/* import { useDispatch } from 'react-redux'; */
/* import { addUsers, startAddUser } from '../actions/users'; */


const AppShell = () => {
  /* const dispatch = useDispatch(); */

  /* dispatch(startAddUser()); */
  
  /* Dark mode */
  const [theme, setTheme] = useState('light')

  const toggleDarkModeHandler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
    document.body.classList.toggle('dark');
  }

  useEffect(() => {
    const data = localStorage.getItem('dark-mode');
    if (data) {
      setTheme(JSON.parse(data));
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('dark-mode', JSON.stringify(theme))
  })


  return (
    
          <IonApp>            
              <IonReactRouter>
                <NavigationMenu />
                <PopoverAccount />
                <IonRouterOutlet id="main">
                  <Route path="/home" render={() => <Tabs />} />

                  <Route exact path="/home" component={Home} />
                  <Route exact path="/players" component={Players} />
                  <Route exact path="/commentators" component={Commentators} />
                  <Route exact path="/specialists" component={Specialists} />
                  <Route exact path="/teams" component={Teams} />
                  <Route exact path="/organisations" component={Organisations} />
                  <Route exact path="/games" component={Games} />
                  <Route exact path="/events" component={Events} />
                  <Route exact path="/communities" component={Communities} />
                  <Route exact path="/characters" component={Characters} />
                  <Route exact path="/company" component={Company} />
                  <Route exact path="/jobs" component={Jobs} />
                  <Route exact path="/marketplace" component={Marketplace} />
                  <Route exact path="/scores" component={Scores} />
                  <Route exact path="/signin" component={SignIn} />
                  <Route exact path="/signup" component={SignUp} />
                  <Route exact path="/password-forgotten" component={PasswordForgotten} />
                  <Route exact path="/password-reset" component={PasswordReset} />
                  <Route exact path="/authportal2" component={AuthPortalMagic} />
                  <Route exact path="/authportal" component={AuthPortal} />
                  <Route exact path="/onboarding" component={Onboarding} />
                  <Route exact path="/onboarding/team/:id" component={OnboardingTeam} />
                  <Route exact path="/onboarding/organisation/:id" component={OnboardingOrganisation} />
                  <Route exact path="/onboarding/community/:id" component={OnboardingCommunity} />
                  <Route exact path="/onboarding/job/:id" component={OnboardingJob} />
                  <Route exact path="/notifications" component={Notifications} />

                  <Route  path="/user/:username" component={ProfileUser} />
                  <Route  path="/team/:username" component={ProfileTeam} />
                  <Route  path="/organisation/:username" component={ProfileOrganisation} />
                  <Route exact path="/game/:id" component={ProfileGame} />
                  <Route exact path="/character/:id" component={ProfileCharacter} />
                  <Route exact path="/event/:id" component={ProfileEvent} />
                  <Route exact path="/community/:username" component={ProfileCommunity} />
                  <Route exact path="/job/:id" component={ProfileJob} />

                  <Route  path="/usertest/:username" component={ProfileUserTest} />

                  <PrivateRoute exact path="/create" component={Create} />
                  <Route exact path="/create-team" component={CreateTeam} />
                  <Route exact path="/create-organisation" component={CreateOrganisation} />
                  <Route exact path="/create-community" component={CreateCommunity} />
                  <Route exact path="/create-job" component={CreateJob} />

                  <Route exact path="/account" component={Account} />
                  <Route exact path="/account-media" component={AccountMedia} />
                  <Route exact path="/account-social" component={AccountSocial} />
                  <Route exact path="/account-streams" component={AccountStreams} />
                  <Route exact path="/account-following" component={AccountFollowing} />
                  <Route exact path="/account-settings" component={AccountSettings} />
                  <Route exact path="/account-experiences" component={EditExperiencesUser} />

                  <Route exact path="/team/:id/edit" component={EditTeam} />
                  <Route exact path="/team/:id/edit-members" component={EditTeamMembers} />
                  <Route exact path="/team/:id/edit-media" component={EditTeamMedia} />
                  <Route exact path="/team/:id/edit-following" component={EditTeamFollowing} />
                  <Route exact path="/team/:id/edit-social" component={EditTeamSocial} />
                  <Route exact path="/team/:id/edit-streams" component={EditTeamStreams} />
                  <Route exact path="/team/:id/edit-settings" component={EditTeamSettings} />
                  <Route exact path="/team/:id/edit-experiences" component={EditExperiencesTeam} />

                  <Route exact path="/organisation/:id/edit" component={EditOrganisation} />
                  <Route exact path="/organisation/:id/edit-media" component={EditOrganisationMedia} />
                  <Route exact path="/organisation/:id/edit-members" component={EditOrganisationMembers} />
                  <Route exact path="/organisation/:id/edit-teams" component={EditOrganisationTeams} />
                  <Route exact path="/organisation/:id/edit-communities" component={EditOrganisationCommunities} />
                  <Route exact path="/organisation/:id/edit-social" component={EditOrganisationSocial} />
                  <Route exact path="/organisation/:id/edit-streams" component={EditOrganisationStreams} />
                  <Route exact path="/organisation/:id/edit-settings" component={EditOrganisationSettings} />
                  <Route exact path="/organisation/:id/edit-experiences" component={EditExperiencesOrganisation} />

                  <Route exact path="/community/:id/edit" component={EditCommunity} />
                  <Route exact path="/community/:id/edit-media" component={EditCommunityMedia} />
                  <Route exact path="/community/:id/edit-members" component={EditCommunityMembers} />
                  <Route exact path="/community/:id/edit-teams" component={EditCommunityTeams} />
                  <Route exact path="/community/:id/edit-social" component={EditCommunitySocial} />
                  <Route exact path="/community/:id/edit-streams" component={EditCommunityStreams} />
                  <Route exact path="/community/:id/edit-settings" component={EditCommunitySettings} />
                  <Route exact path="/community/:id/edit-experiences" component={EditExperiencesCommunity} />

                  <Route exact path="/job/:id/edit" component={EditJob} />
                  <Route exact path="/job/:id/edit-media" component={EditJobMedia} />
                  <Route exact path="/job/:id/edit-members" component={EditJobMembers} />
                  <Route exact path="/job/:id/edit-settings" component={EditJobSettings} />

                  <Route exact path="/" component={NotFound} />

                  <Route exact path="/" render={() => <Redirect to="/home" />} />
                </IonRouterOutlet>

                <Tabs >     
                <IonRouterOutlet id="main">
                  <Route path="/home" render={() => <Tabs />} />

                  <Route exact path="/home" component={Home} />
                  <Route exact path="/players" component={Players} />
                  <Route exact path="/commentators" component={Commentators} />
                  <Route exact path="/specialists" component={Specialists} />
                  <Route exact path="/teams" component={Teams} />
                  <Route exact path="/organisations" component={Organisations} />
                  <Route exact path="/games" component={Games} />
                  <Route exact path="/events" component={Events} />
                  <Route exact path="/communities" component={Communities} />
                  <Route exact path="/characters" component={Characters} />
                  <Route exact path="/company" component={Company} />
                  <Route exact path="/jobs" component={Jobs} />
                  <Route exact path="/marketplace" component={Marketplace} />
                  <Route exact path="/scores" component={Scores} />
                  <Route exact path="/signin" component={SignIn} />
                  <Route exact path="/signup" component={SignUp} />
                  <Route exact path="/password-forgotten" component={PasswordForgotten} />
                  <Route exact path="/password-reset" component={PasswordReset} />
                  <Route exact path="/authportal2" component={AuthPortalMagic} />
                  <Route exact path="/authportal" component={AuthPortal} />
                  <Route exact path="/onboarding" component={Onboarding} />
                  <Route exact path="/onboarding/team/:id" component={OnboardingTeam} />
                  <Route exact path="/onboarding/organisation/:id" component={OnboardingOrganisation} />
                  <Route exact path="/onboarding/community/:id" component={OnboardingCommunity} />
                  <Route exact path="/onboarding/job/:id" component={OnboardingJob} />
                  <Route exact path="/notifications" component={Notifications} />

                  <Route exact path="/user/:username" component={ProfileUser} />
                  <Route exact path="/team/:username" component={ProfileTeam} />
                  <Route exact path="/organisation/:username" component={ProfileOrganisation} />
                  <Route exact path="/game/:id" component={ProfileGame} />
                  <Route exact path="/character/:id" component={ProfileCharacter} />
                  <Route exact path="/event/:id" component={ProfileEvent} />
                  <Route exact path="/community/:username" component={ProfileCommunity} />
                  <Route exact path="/job/:id" component={ProfileJob} />

                  <Route  path="/usertest/:username" component={ProfileUserTest} />

                  <PrivateRoute exact path="/create" component={Create} />
                  <Route exact path="/create-team" component={CreateTeam} />
                  <Route exact path="/create-organisation" component={CreateOrganisation} />
                  <Route exact path="/create-community" component={CreateCommunity} />
                  <Route exact path="/create-job" component={CreateJob} />

                  <Route exact path="/account" component={Account} />
                  <Route exact path="/account-media" component={AccountMedia} />
                  <Route exact path="/account-social" component={AccountSocial} />
                  <Route exact path="/account-streams" component={AccountStreams} />
                  <Route exact path="/account-following" component={AccountFollowing} />
                  <Route exact path="/account-settings" component={AccountSettings} />
                  <Route exact path="/account-experiences" component={EditExperiencesUser} />

                  <Route exact path="/team/:id/edit" component={EditTeam} />
                  <Route exact path="/team/:id/edit-members" component={EditTeamMembers} />
                  <Route exact path="/team/:id/edit-media" component={EditTeamMedia} />
                  <Route exact path="/team/:id/edit-following" component={EditTeamFollowing} />
                  <Route exact path="/team/:id/edit-social" component={EditTeamSocial} />
                  <Route exact path="/team/:id/edit-streams" component={EditTeamStreams} />
                  <Route exact path="/team/:id/edit-settings" component={EditTeamSettings} />
                  <Route exact path="/team/:id/edit-experiences" component={EditExperiencesTeam} />

                  <Route exact path="/organisation/:id/edit" component={EditOrganisation} />
                  <Route exact path="/organisation/:id/edit-media" component={EditOrganisationMedia} />
                  <Route exact path="/organisation/:id/edit-members" component={EditOrganisationMembers} />
                  <Route exact path="/organisation/:id/edit-teams" component={EditOrganisationTeams} />
                  <Route exact path="/organisation/:id/edit-communities" component={EditOrganisationCommunities} />
                  <Route exact path="/organisation/:id/edit-social" component={EditOrganisationSocial} />
                  <Route exact path="/organisation/:id/edit-streams" component={EditOrganisationStreams} />
                  <Route exact path="/organisation/:id/edit-settings" component={EditOrganisationSettings} />
                  <Route exact path="/organisation/:id/edit-experiences" component={EditExperiencesOrganisation} />

                  <Route exact path="/community/:id/edit" component={EditCommunity} />
                  <Route exact path="/community/:id/edit-media" component={EditCommunityMedia} />
                  <Route exact path="/community/:id/edit-members" component={EditCommunityMembers} />
                  <Route exact path="/community/:id/edit-teams" component={EditCommunityTeams} />
                  <Route exact path="/community/:id/edit-social" component={EditCommunitySocial} />
                  <Route exact path="/community/:id/edit-streams" component={EditCommunityStreams} />
                  <Route exact path="/community/:id/edit-settings" component={EditCommunitySettings} />
                  <Route exact path="/community/:id/edit-experiences" component={EditExperiencesCommunity} />

                  <Route exact path="/job/:id/edit" component={EditJob} />
                  <Route exact path="/job/:id/edit-media" component={EditJobMedia} />
                  <Route exact path="/job/:id/edit-members" component={EditJobMembers} />
                  <Route exact path="/job/:id/edit-settings" component={EditJobSettings} />

                  <Route exact path="/" component={NotFound} />

                  <Route exact path="/" render={() => <Redirect to="/home" />} />
                </IonRouterOutlet>
                </Tabs> 

              </IonReactRouter>

              <CookieConsent 
                /* debug={true} */
                style={{background: '#333333'}}
                buttonStyle={{background: '#FCB028'}}
                buttonText="I accept"
                expires={30}
              >
                <h5>Our website uses cookies.</h5>
                <p>Some of these cookies are essential, while others help us to improve your experience by providing insights into how the site is being used.</p>
              </CookieConsent>
              
          </IonApp>
          
  );
};

export default AppShell;


const PrivateRoute = ({ component, ...rest }) => {
  let currentUser = useCurrentUser();
  const location = useLocation();
  const Component = component;

  return (
    <Route {...rest} >
      {
        currentUser.isAuthenticated ? (<Component {...rest} />) :  (<Redirect
          to={{
            pathname: "/signin",
            state: { from: location }
          }} />)
      }
    </Route>
  );
}