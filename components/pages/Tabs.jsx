import { Redirect, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import { home as homeIcon, person as personIcon, people as peopleIcon, cog, flash as flashIcon, list, } from 'ionicons/icons';

/* Pages */
import Home from './Home';
import Players from './Players';
import Commentators from './Commentators';
import Specialists from './Specialists';
import Teams from './Teams';
import Organisations from './Organisations';
import Games from './Games';
import Events from './Events';
import Communities from './Communities';
import Characters from './Characters';
import Company from './Company';
import Jobs from './Jobs';
import Marketplace from './Marketplace';
import Scores from './Scores';
import SignIn from './SignIn';
import SignUp from './SignUp';
import PasswordForgotten from './PasswordForgotten';
import PasswordReset from './PasswordReset';
import AuthPortal from './AuthPortal';
import AuthPortalMagic from './AuthPortalMagic';
import Onboarding from './Onboarding';
import OnboardingTeam from './OnboardingTeam';
import OnboardingOrganisation from './OnboardingOrganisation';
import OnboardingCommunity from './OnboardingCommunity';
import OnboardingJob from './OnboardingJob';
import Notifications from './Notifications';

import Create from './Create';
import CreateTeam from './CreateTeam';
import CreateOrganisation from './CreateOrganisation';
import CreateCommunity from './CreateCommunity';
import CreateJob from './CreateJob';

import Account from './Account';
import AccountMedia from './AccountMedia';
import AccountSocial from './AccountSocial';
import AccountFollowing from './AccountFollowing';
import AccountStreams from './AccountStreams';
import AccountSettings from './AccountSettings';

import EditTeam from './EditTeam';
import EditTeamMembers from './EditTeamMembers';
import EditTeamMedia from './EditTeamMedia';
import EditTeamFollowing from './EditTeamFollowing';
import EditTeamSocial from './EditTeamSocial';
import EditTeamStreams from './EditTeamStreams';
import EditTeamSettings from './EditTeamSettings';

import EditOrganisation from './EditOrganisation';
import EditOgranisationMedia from './EditOrganisationMedia';
import EditOrganisionMembers from './EditOrganisationMembers';
import EditOrganisationTeams from './EditOrganisationTeams';
import EditOrganisationCommunities from './EditOrganisationCommunities';
import EditOrganoisationSocial from './EditOrganisationSocial';
import EditOrganisationStreams from './EditOrganisationStreams';
import EditOrgnaisationSettings from './EditOrganisationSettings';

import EditCommunity from './EditCommunity';
import EditCommunityMedia from './EditCommunityMedia';
import EditCommunityMembers from './EditCommunityMembers';
import EditCommunityTeams from './EditCommunityTeams';
import EditCommunitySocial from './EditCommunitySocial';
import EditCommunityStreams from './EditCommunityStreams';
import EditCommunitySettings from './EditCommunitySettings';

import EditJob from './EditJob';
import EditJobMedia from './EditJobMedia';
import EditJobMemebers from './EditJobMembers';
import EditJobSettings from './EditJobSettings';

import EditExperiencesUser from './EditExperiencesUser';
import EditExperiencesTeam from './EditExperiencesTeam';
import EditExperiencesOrganisation from './EditExperiencesOrganisation';
import EditExperiencesCommunity from './EditExperiencesCommunity';

import ProfileUser from './ProfileUser';
import ProfileTeam from './ProfileTeam';
import ProfileOrganisation from './ProfileOrganisation';
import ProfileGame from './ProfileGame';
import ProfileCharacter from './ProfileCharacter';
import ProfileCommunity from './ProfileCommunity';
import ProfileJob from './ProfileJob';

import ProfileUserTest from './ProfileUserTest';

import NotFound from './NotFound';


const Tabs = () => {

  const [mQuery, setQuery] = useState({
    matches: window.innerWidth > 800 ? true : false,
  });

  useEffect (() => {
      window.matchMedia("(min-width: 800px").addListener(setQuery);
  }, []);


  return (
    <div>
      {mQuery && !mQuery.matches ? (
          <>
            <IonTabs>
              <IonRouterOutlet>
                <Route exact path="/home" component={Home} />
                <Route exact path="/players" component={Players} />
                {/* <Route exact path="/commentators" component={Commentators} /> */}
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
                <Route exact path="/community/:username" component={ProfileCommunity} />
                <Route exact path="/job/:id" component={ProfileJob} />

                <Route exact path="/usertest/:username" component={ProfileUserTest} />

                <Route exact path="/create" component={Create} />
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
                <Route exact path="/organisation/:id/edit-media" component={EditOgranisationMedia} />
                <Route exact path="/organisation/:id/edit-members" component={EditOrganisionMembers} />
                <Route exact path="/organisation/:id/edit-teams" component={EditOrganisationTeams} />
                <Route exact path="/organisation/:id/edit-communities" component={EditOrganisationCommunities} />
                <Route exact path="/organisation/:id/edit-social" component={EditOrganoisationSocial} />
                <Route exact path="/organisation/:id/edit-streams" component={EditOrganisationStreams} />
                <Route exact path="/organisation/:id/edit-settings" component={EditOrgnaisationSettings} />
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
                <Route exact path="/job/:id/edit-members" component={EditJobMemebers} />
                <Route exact path="/job/:id/edit-media" component={EditJobMedia} />
                {/* <Route exact path="/team/:id/edit-social" component={EditTeamSocial} /> */}
                <Route exact path="/job/:id/edit-settings" component={EditJobSettings} />
                
                <Route exact path="/" component={NotFound} />


                <Route path="/tabs" render={() => <Redirect to="/home" />}  />
              </IonRouterOutlet>
              <IonTabBar slot="bottom">
                <IonTabButton tab="home" href="/home">
                    <IonIcon icon={homeIcon}/>
                    <IonLabel>Home</IonLabel>
                </IonTabButton> 
                <IonTabButton tab="players" href="/players">
                    <IonIcon icon={personIcon}/>
                    <IonLabel>Players</IonLabel>
                </IonTabButton>
                <IonTabButton tab="organisations" href="/organisations">
                    <IonIcon icon={flashIcon}/>
                    <IonLabel>Organisations</IonLabel>
                </IonTabButton>   
              </IonTabBar>
            </IonTabs>
          </>
          ) : (
        <div></div>
      )}
    </div>
  );
};

export default Tabs;

