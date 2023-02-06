/* import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { IonReactRouter } from '@ionic/react-router';


import Home from '../../pages/Home';
import Players from '../../pages/Players';
import Commentators from '../../pages/Commentators';
import Teams from '../../pages/Teams';
import Organisations from '../../pages/Organisations';
import Games from '../../pages/Games';
import Events from '../../pages/Events';
import Communities from '../../pages/Communities';
import Characters from '../../pages/Characters';
import Company from '../../pages/Company';
import Scores from './pages/Scores';
import SignIn from '../../pages/SignIn';
import SignUp from '../../pages/SignUp';
import PasswordForgotten from '../../pages/PasswordForgotten';
import PasswordReset from '../../pages/PasswordReset';

import Create from '../../pages/Create';
import CreateTeam from '../../pages/CreateTeam';
import CreateOrganisation from '../../pages/CreateOrganisation';
import CreateCommunity from '../../pages/CreateCommunity';

import Account from '../../pages/Account';
import AccountMedia from '../../pages/AccountMedia';
import AccountSocial from '../../pages/AccountSocial';
import AccountStreams from '../../pages/AccountStreams';
import AccountFollowing from '../../pages/AccountFollowing';
import AccountSettings from '../../pages/AccountSettings';

import EditTeam from '../../pages/EditTeam';
import EditTeamMedia from '../../pages/EditTeamMedia';
import EditTeamMembers from '../../pages/EditTeamMembers';
import EditTeamSocial from '../../pages/EditTeamSocial';
import EditTeamStreams from '../../pages/EditTeamStreams';
import EditTeamSettings from '../../pages/EditTeamSettings';

import EditOrganisation from '../../pages/EditOrganisation';
import EditOrganisationMedia from '../../pages/EditOrganisationMedia';
import EditOrganisationMembers from '../../pages/EditOrganisationMembers';
import EditOrganisationTeams from '../../pages/EditOrganisationTeams';
import EditOrganisationCommunities from '../../pages/EditOrganisationCommunities';
import EditOrganisationSocial from '../../pages/EditOrganisationSocial';
import EditOrganisationStreams from '../../pages/EditOrganisationStreams';
import EditOrganisationSettings from '../../pages/EditOrganisationSettings';

import EditCommunity from '../../pages/EditCommunity';
import EditCommunityMedia from '../../pages/EditCommunityMedia';
import EditCommunityMembers from '../../pages/EditCommunityMembers';
import EditCommunityTeams from '../../pages/EditCommunityTeams';
import EditCommunitySocial from '../../pages/EditCommunitySocial';
import EditCommunityStreams from '../../pages/EditCommunityStreams';
import EditCommunitySettings from '../../pages/EditCommunitySettings';

import ProfileUser from '../../pages/ProfileUser';
import ProfileTeam from '../../pages/ProfileTeam';
import ProfileOrganisation from '../../pages/ProfileOrganisation';
import ProfileGame from '../../pages/ProfileGame';
import ProfileCharacter from '../../pages/ProfileCharacter';
import ProfileEvent from '../../pages/ProfileEvent';
import ProfileCommunity from '../../pages/ProfileCommunity';

import NotFound from '../../pages/NotFound';


import { home as homeIcon, person as personIcon, people as peopleIcon } from 'ionicons/icons';

export const TabsMenu = () => {

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
                            <Route exact path="/home" component={Home} exact={true}/>
                            <Route exact path="/players" component={Players} exact={true}/>
                            <Route exact path="/commentators" component={Commentators} exact={true}/>
                            <Route exact path="/teams" component={Teams} exact={true}/>
                            <Route exact path="/organisations" component={Organisations} exact={true}/>
                            <Route exact path="/games" component={Games} exact={true}/>
                            <Route exact path="/events" component={Events} exact={true}/>
                            <Route exact path="/communities" component={Communities} exact={true}/>
                            <Route exact path="/characters" component={Characters} exact={true}/>
                            <Route exact path="/company" component={Company} exact={true}/>
                            <Route exact path="/scores" component={Scores} exact={true}/>
                            <Route exact path="/signin" component={SignIn} exact={true}/>
                            <Route exact path="/signup" component={SignUp} exact={true}/>
                            <Route exact path="/password-forgotten" component={PasswordForgotten} exact={true}/>
                            <Route exact path="/password-reset" component={PasswordReset} exact={true}/>

                            <Route exact path="/user/:username" component={ProfileUser} exact={true}/>
                            <Route exact path="/team/:username" component={ProfileTeam} exact={true}/>
                            <Route exact path="/organisation/:username" component={ProfileOrganisation} exact={true}/>
                            <Route exact path="/game/:id" component={ProfileGame} exact={true}/>
                            <Route exact path="/character/:id" component={ProfileCharacter} exact={true}/>
                            <Route exact path="/event/:id" component={ProfileEvent} exact={true}/>
                            <Route exact path="/community/:username" component={ProfileCommunity} exact={true}/>

                            <Route exact path="/create" component={Create} exact={true}/>
                            <Route exact path="/create-team" component={CreateTeam} exact={true}/>
                            <Route exact path="/create-organisation" component={CreateOrganisation} exact={true}/>
                            <Route exact path="/create-community" component={CreateCommunity} exact={true}/>

                            <Route exact path="/account" component={Account} exact={true}/>
                            <Route exact path="/account-media" component={AccountMedia} exact={true}/>
                            <Route exact path="/account-social" component={AccountSocial} exact={true}/>
                            <Route exact path="/account-streams" component={AccountStreams} exact={true}/>
                            <Route exact path="/account-following" component={AccountFollowing} exact={true}/>
                            <Route exact path="/account-settings" component={AccountSettings} exact={true}/>

                            <Route exact path="/team/:id/edit" component={EditTeam} exact={true}/>
                            <Route exact path="/team/:id/edit-media" component={EditTeamMedia} exact={true}/>
                            <Route exact path="/team/:id/edit-members" component={EditTeamMembers} exact={true}/>
                            <Route exact path="/team/:id/edit-social" component={EditTeamSocial} exact={true}/>
                            <Route exact path="/team/:id/edit-streams" component={EditTeamStreams} exact={true}/>
                            <Route exact path="/team/:id/edit-settings" component={EditTeamSettings} exact={true}/>

                            <Route exact path="/organisation/:id/edit" component={EditOrganisation} exact={true}/>
                            <Route exact path="/organisation/:id/edit-media" component={EditOrganisationMedia} exact={true}/>
                            <Route exact path="/organisation/:id/edit-members" component={EditOrganisationMembers} exact={true}/>
                            <Route exact path="/organisation/:id/edit-teams" component={EditOrganisationTeams} exact={true}/>
                            <Route exact path="/organisation/:id/edit-communities" component={EditOrganisationCommunities} exact={true}/>
                            <Route exact path="/organisation/:id/edit-social" component={EditOrganisationSocial} exact={true}/>
                            <Route exact path="/organisation/:id/edit-streams" component={EditOrganisationStreams} exact={true}/>
                            <Route exact path="/organisation/:id/edit-settings" component={EditOrganisationSettings} exact={true}/>

                            <Route exact path="/community/:id/edit" component={EditCommunity} exact={true}/>
                            <Route exact path="/community/:id/edit-media" component={EditCommunityMedia} exact={true}/>
                            <Route exact path="/community/:id/edit-members" component={EditCommunityMembers} exact={true}/>
                            <Route exact path="/community/:id/edit-teams" component={EditCommunityTeams} exact={true}/>
                            <Route exact path="/community/:id/edit-social" component={EditCommunitySocial} exact={true}/>
                            <Route exact path="/community/:id/edit-streams" component={EditCommunityStreams} exact={true}/>
                            <Route exact path="/community/:id/edit-settings" component={EditCommunitySettings} exact={true}/>

                            <Route exact path="/" component={NotFound} exact={true}/>
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
                            <IonTabButton tab="communities" href="/communities">
                                <IonIcon icon={peopleIcon}/>
                                <IonLabel>Communities</IonLabel>
                            </IonTabButton>             
                        </IonTabBar>
                    </IonTabs>
                </>
            ) : (
                <div></div>
            )}
        </div>
        
        
    )
} */