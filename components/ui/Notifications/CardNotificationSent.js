import { IonButton, IonCardContent, IonModal, IonToast } from '@ionic/react';

import { Fragment, useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationIcon } from '@heroicons/react/outline';

/* Images */
import ProfilePlaceholder from '../../assets/images/profile_placeholder.png';
import Gravatar from 'react-gravatar';
import Axios from 'axios';

/* Team components */
import NotificationRequestMemberTeam from '../Team/NotificationRequestMemberTeam';
import NotificationAcceptMemberTeam from '../Team/NotificationAcceptMemberTeam';
import NotificationDeclineMemberTeam from '../Team/NotificationDeclineMemberTeam';

/* Organisation components */
import NotificationRequestMemberOrganisation from '../Organisation/NotificationRequestMemberOrganisation';
import NotificationAcceptMemberOrganisation from '../Organisation/NotificationAcceptMemberOrganisation';
import NotificationDeclineMemberOrganisation from '../Organisation/NotificationDeclineMemberOrganisation';

import NotificationRequestTeamOrganisation from '../Organisation/NotificationRequestTeamOrganisation';
import NotificationAcceptTeamOrganisation from '../Organisation/NotificationAcceptTeamOrganisation';
import NotificationDeclineTeamOrganisation from '../Organisation/NotificationDeclineTeamOrganisation';

import NotificationRequestCommunityOrganisation from '../Organisation/NotificationRequestCommunityOrganisation';
import NotificationAcceptCommunityOrganisation from '../Organisation/NotificationAcceptCommunityOrganisation';
import NotificationDeclineCommunityOrganisation from '../Organisation/NotificationDeclineCommunityOrganisation';

/* Community components */
import NotificationRequestMemberCommunity from '../Community/NotificationRequestMemberCommunity';
import NotificationAcceptMemberCommunity from '../Community/NotificationAcceptMemberCommunity';
import NotificationDeclineMemberCommunity from '../Community/NotificationDeclineMemberCommunity';

import NotificationRequestTeamCommunity from '../Community/NotificationRequestTeamCommunity';
import NotificationAcceptTeamCommunity from '../Community/NotificationAcceptTeamCommunity';
import NotificationDeclineTeamCommunity from '../Community/NotificationDeclineTeamCommunity';

/* Contexts */
import { useCurrentUser } from '../../context/AuthContext';

/* Redux */
import { useDispatch, useSelector } from 'react-redux';
import { teamAddMember } from '../../redux/actions/teamActions';
import { organisationAddMember, organisationAddTeam, organisationAddCommunity } from '../../redux/actions/organisationActions';
import { communityAddMember, communityAddTeam } from '../../redux/actions/communityActions';
import { 
  notificationTeamMemberApprove, 
  notificationOrganisationMemberApprove,
  notificationOrganisationTeamApprove,
  notificationOrganisationCommunityApprove, 
  notificationCommunityMemberApprove, 
  notificationCommunityTeamApprove,
  notificationRead, 
  notifiationDelete 
} from '../../redux/actions/notificationActions';

const CardNotificationSent = ({ notificationId, notificationData, username, image_profile, email, gamertag, showMembers, showTeams, showOrganisations, showCommunities }) => {

  const { id } = useParams();

  const loggedInUser = useCurrentUser();
  const dispatch = useDispatch();

  const users = useSelector((state) => state.allData.users);
  const teams = useSelector((state) => state.allData.teams);
  const organisations = useSelector((state) => state.allData.organisations);
  const communities = useSelector((state) => state.allData.communities);

  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const [showToast1, setShowToast1] = useState(false);

  console.log("notificationData CardNotificationSent", notificationData.receiveruser)


  const notificationType = notificationData.typenotification;

  const senderUserId = notificationData.senderuser?.id;

  const receiverUserId = notificationData.receiveruser?.id;

  /* Team */

  const senderTeamId = notificationData.senderteam?.id;

  const receiverTeamId = notificationData.receiverteam?.id;

  const receiverTeam = notificationData.receiverteam;

  const teamDataMember = notificationData.receiverteam?.members;

  /* Organisation */

  const findOrganisation = organisations?.find((organisation) => {
    return organisation?.id === notificationData.receiverorganisation?.id;
  })

  const senderOrganisationId = notificationData.senderorganisation?.id;

  const receiverOrganisationId = notificationData.receiverorganisation?.id;

  const receiverOrganisation = notificationData.receiverorganisation;

  const organisationDataMember = notificationData.receiverorganisation?.members;

  const organisationDataTeams = findOrganisation?.teams;

  const organisationDataCommunity = findOrganisation?.communities;

  /* Community */

  const findcommunity = communities?.find((community) => {
    return community?.id === notificationData.receivercommunity?.id;
  })

  const senderCommunityId = notificationData.sendercommunity?.id;

  const receiverCommunityId = notificationData.receivercommunity?.id;

  const receiverCommunity = notificationData.receivercommunity;

  const communityDataMember = notificationData.receivercommunity?.members;

  const communityDataTeams = findcommunity?.teams;
 

  /* Team handles */

  const handleTeamMemberApprove = async (event) => {
    //event.preventDefault()
    dispatch(notificationTeamMemberApprove(receiverUserId, senderTeamId ))
    dispatch(notifiationDelete( notificationId ));
  }

  const handleTeamAddMember = async (event) => {
    //event.preventDefault()
    dispatch(teamAddMember(receiverTeamId, senderUserId, users, teamDataMember, receiverTeam ));
    dispatch(notifiationDelete( notificationId ));
  }

  /* Organisation handles */

  const handleOrganisationMemberApprove = async (event) => {
    //event.preventDefault()
    dispatch(notificationOrganisationMemberApprove(receiverUserId, senderOrganisationId))
    dispatch(notifiationDelete( notificationId ));
  }

  const handleOrganisationAddMember = async (event) => {
    //event.preventDefault()
    dispatch(organisationAddMember(receiverOrganisationId, senderUserId, users, organisationDataMember, receiverOrganisation ));
    dispatch(notifiationDelete( notificationId ));
  }

  const handleOrganisationTeamApprove = async (event) => {
    //event.preventDefault()
    dispatch(notificationOrganisationTeamApprove(receiverTeamId, senderOrganisationId))
    dispatch(notifiationDelete( notificationId ));
  }

  const handleOrganisationAddTeam = async (event) => {
    //event.preventDefault()
    dispatch(organisationAddTeam(receiverOrganisationId, senderTeamId, teams, organisationDataTeams));
    dispatch(notifiationDelete( notificationId ));
  }

  const handleOrganisationCommunityApprove = async (event) => {
    //event.preventDefault()
    dispatch(notificationOrganisationCommunityApprove( receiverCommunityId, senderOrganisationId ))
    dispatch(notifiationDelete( notificationId ));
  }

  const handleOrganisationAddCommunity = async (event) => {
    //event.preventDefault()
    dispatch(organisationAddCommunity(receiverOrganisationId, senderCommunityId, communities, organisationDataCommunity ));
    dispatch(notifiationDelete( notificationId ));
  }


  /* Community handles */

  const handleCommunityMemberApprove = async (event) => {
    //event.preventDefault()
    dispatch(notificationCommunityMemberApprove( receiverUserId, senderCommunityId))
    dispatch(notifiationDelete( notificationId ));
  }

  const handleCommunityAddMember = async (event) => {
    //event.preventDefault()
    dispatch(communityAddMember(receiverCommunityId, senderUserId, users, communityDataMember));
    dispatch(notifiationDelete( notificationId ));
  }

  const handleCommunityTeamApprove = async (event) => {
    //event.preventDefault()
    dispatch(notificationCommunityTeamApprove(receiverTeamId, senderCommunityId))
    dispatch(notifiationDelete( notificationId ));
  }

  const handleCommunityAddTeam = async (event) => {
    //event.preventDefault()
    dispatch(communityAddTeam(receiverCommunityId, senderTeamId, teams, communityDataTeams));
    dispatch(notifiationDelete( notificationId ));
  }


  /* Other */

  const handleNotificationRead = async (event) => {
    //event.preventDefault()
    dispatch(notificationRead(notificationId ))
  }

  const handleDeleteNotification = async (event) => {
    //event.preventDefault()
    dispatch(notifiationDelete( notificationId ))
  }

  return (

      <div class="mt-4">

      {/* Organisation */}

        {/* Organisation Member */}
        {showMembers && (

          <div>

            {(notificationType?.name === "Member request" && 
              notificationData.senderorganisation !== undefined && 
              notificationData.boolean_request === true) && (id === notificationData.senderorganisation.id) &&

                <div className="flex flex-row justify-between bg-light w-full px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-row">
                    <div class="flex-shrink-0 h-10 pr-4">
                      {notificationData.receiveruser.image_profile ? (
                        <div
                          className=" h-10 w-10 rounded-full bg-cover bg-no-repeat my-auto "
                          style={{
                            backgroundImage: `url(${notificationData.receiveruser.image_profile && notificationData.receiveruser.image_profile.url})`,
                          }}
                          alt={`Profile name ${notificationData.receiveruser.gamertag}`}
                        >
                          <svg className="clip-svg ">
                            <defs>
                              <clipPath clipPathUnits="objectBoundingBox">
                                <path d="M1,0.284 C1,0.428,1,0.572,1,0.716 C0.999,0.718,0.998,0.72,0.998,0.722 C0.993,0.747,0.979,0.766,0.954,0.779 C0.818,0.849,0.681,0.919,0.545,0.988 C0.515,1,0.484,1,0.454,0.988 C0.318,0.919,0.182,0.849,0.046,0.779 C0.015,0.764,0,0.74,0,0.709 C0,0.569,0,0.431,0,0.292 C0,0.26,0.015,0.236,0.046,0.221 C0.182,0.151,0.318,0.081,0.454,0.012 C0.484,-0.004,0.515,-0.004,0.545,0.012 C0.681,0.081,0.818,0.151,0.954,0.222 C0.968,0.229,0.979,0.243,0.989,0.255 C0.995,0.263,0.996,0.274,1,0.284"></path>
                              </clipPath>
                            </defs>
                          </svg>
                        </div>
                      ) : (
                        <div
                          className=" h-10 w-10 rounded-full bg-cover bg-no-repeat my-auto text-transparent"
                          style={{ backgroundImage: `url(${ProfilePlaceholder})` }}
                          //alt={`Profile name ${gamertag}`}
                        >
                          
                          <Gravatar
                            email={notificationData.receiveruser.email}
                            size={1600}
                            rating="pg"
                            default={ProfilePlaceholder}
                            className="CustomAvatar-image overflow-hidden h-10 w-10 rounded-full bg-cover bg-no-repeat my-auto "
                          />
                        </div>
                      )}
                    </div>

                    <div class="flex flex-col whitespace-nowrap">
                      <p>{notificationData.receiveruser.gamertag}</p>
                      <p>@{notificationData.receiveruser.username}</p>
                    </div>

                  </div>
                  
                  <div class="rounded-3xl px-4 py-2 bg-gray-500 text-white ">
                    Request sent
                  </div>
                </div>
                
              }
          </div>
          
        )}

        {showTeams && (

        <div>

          {/* Organisation Team */}
          {(notificationType?.name === "Team request" && notificationData.senderorganisation !== undefined && 
          notificationData.boolean_request === true) && (id === notificationData.senderorganisation.id) &&

            <div className="flex flex-row justify-between bg-light w-full px-6 py-4 whitespace-nowrap">
              <div className="flex flex-row">
                <div class="flex-shrink-0 h-10 pr-4">
                  {notificationData.receiverteam.image_profile && (
                    <div
                      className=" h-10 w-10 rounded-full bg-cover bg-no-repeat my-auto "
                      style={{
                        backgroundImage: `url(${notificationData.receiverteam.image_profile && notificationData.receiverteam.image_profile.url})`,
                      }}
                      alt={`Profile name ${notificationData.receiverteam.name}`}
                    >
                      <svg className="clip-svg ">
                        <defs>
                          <clipPath clipPathUnits="objectBoundingBox">
                            <path d="M1,0.284 C1,0.428,1,0.572,1,0.716 C0.999,0.718,0.998,0.72,0.998,0.722 C0.993,0.747,0.979,0.766,0.954,0.779 C0.818,0.849,0.681,0.919,0.545,0.988 C0.515,1,0.484,1,0.454,0.988 C0.318,0.919,0.182,0.849,0.046,0.779 C0.015,0.764,0,0.74,0,0.709 C0,0.569,0,0.431,0,0.292 C0,0.26,0.015,0.236,0.046,0.221 C0.182,0.151,0.318,0.081,0.454,0.012 C0.484,-0.004,0.515,-0.004,0.545,0.012 C0.681,0.081,0.818,0.151,0.954,0.222 C0.968,0.229,0.979,0.243,0.989,0.255 C0.995,0.263,0.996,0.274,1,0.284"></path>
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  )}
                </div>

                <div class="flex flex-col whitespace-nowrap">
                  <p>{notificationData.receiverteam.name}</p>
                  <p>@{notificationData.receiverteam.username}</p>
                </div>

              </div>
              
              <div class="rounded-3xl px-4 py-2 bg-gray-500 text-white ">
                Request sent
              </div>
            </div>
            }

          </div>
        )}

        {showCommunities && (

          <div>  

            {/* Organisation Community */}
            {(notificationType?.name === "Community request" && notificationData.senderorganisation !== undefined && 
            notificationData.boolean_request === true) && (id === notificationData.senderorganisation.id) &&

              <div className="flex flex-row justify-between bg-light w-full px-6 py-4 whitespace-nowrap">
                <div className="flex flex-row">
                  <div class="flex-shrink-0 h-10 pr-4">
                    {notificationData.receivercommunity.image_profile && (
                      <div
                        className=" h-10 w-10 rounded-full bg-cover bg-no-repeat my-auto "
                        style={{
                          backgroundImage: `url(${notificationData.receivercommunity.image_profile && notificationData.receivercommunity.image_profile.url})`,
                        }}
                        alt={`Profile name ${notificationData.receivercommunity.name}`}
                      >
                        <svg className="clip-svg ">
                          <defs>
                            <clipPath clipPathUnits="objectBoundingBox">
                              <path d="M1,0.284 C1,0.428,1,0.572,1,0.716 C0.999,0.718,0.998,0.72,0.998,0.722 C0.993,0.747,0.979,0.766,0.954,0.779 C0.818,0.849,0.681,0.919,0.545,0.988 C0.515,1,0.484,1,0.454,0.988 C0.318,0.919,0.182,0.849,0.046,0.779 C0.015,0.764,0,0.74,0,0.709 C0,0.569,0,0.431,0,0.292 C0,0.26,0.015,0.236,0.046,0.221 C0.182,0.151,0.318,0.081,0.454,0.012 C0.484,-0.004,0.515,-0.004,0.545,0.012 C0.681,0.081,0.818,0.151,0.954,0.222 C0.968,0.229,0.979,0.243,0.989,0.255 C0.995,0.263,0.996,0.274,1,0.284"></path>
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                    )}
                  </div>

                  <div class="flex flex-col whitespace-nowrap">
                    <p>{notificationData.receivercommunity.name}</p>
                    <p>@{notificationData.receivercommunity.username}</p>
                  </div>

                </div>
                
                <div class="rounded-3xl px-4 py-2 bg-gray-500 text-white ">
                  Request sent
                </div>
              </div>
            }
          </div>
        )}  

        {/* Team */}

          {/* Team Member */}
          {(notificationType?.name === "Member request" && notificationData.senderteam !== undefined && 
          notificationData.boolean_request === true) && (id === notificationData.senderteam.id) &&

            <div className="flex flex-row justify-between bg-light w-full px-6 py-4 whitespace-nowrap">
              <div className="flex flex-row">
                <div class="flex-shrink-0 h-10 pr-4">
                  {image_profile ? (
                    <div
                      className=" h-10 w-10 rounded-full bg-cover bg-no-repeat my-auto "
                      style={{
                        backgroundImage: `url(${image_profile && image_profile.url})`,
                      }}
                      alt={`Profile name ${gamertag}`}
                    >
                      <svg className="clip-svg ">
                        <defs>
                          <clipPath clipPathUnits="objectBoundingBox">
                            <path d="M1,0.284 C1,0.428,1,0.572,1,0.716 C0.999,0.718,0.998,0.72,0.998,0.722 C0.993,0.747,0.979,0.766,0.954,0.779 C0.818,0.849,0.681,0.919,0.545,0.988 C0.515,1,0.484,1,0.454,0.988 C0.318,0.919,0.182,0.849,0.046,0.779 C0.015,0.764,0,0.74,0,0.709 C0,0.569,0,0.431,0,0.292 C0,0.26,0.015,0.236,0.046,0.221 C0.182,0.151,0.318,0.081,0.454,0.012 C0.484,-0.004,0.515,-0.004,0.545,0.012 C0.681,0.081,0.818,0.151,0.954,0.222 C0.968,0.229,0.979,0.243,0.989,0.255 C0.995,0.263,0.996,0.274,1,0.284"></path>
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  ) : (
                    <div
                      className=" h-10 w-10 rounded-full bg-cover bg-no-repeat my-auto text-transparent"
                      style={{ backgroundImage: `url(${ProfilePlaceholder})` }}
                      //alt={`Profile name ${gamertag}`}
                    >
                      
                      <Gravatar
                        email={email}
                        size={1600}
                        rating="pg"
                        default={ProfilePlaceholder}
                        className="CustomAvatar-image overflow-hidden h-10 w-10 rounded-full bg-cover bg-no-repeat my-auto "
                      />
                    </div>
                  )}
                </div>

                <div class="flex flex-col whitespace-nowrap">
                  <p>{notificationType?.name}</p>
                  <p>@{notificationType?.name}</p>
                </div>

              </div>

              <div class="rounded-3xl px-4 py-2 bg-gray-500 text-white ">
                Request sent
              </div>
            </div>
                }


        {/* Community */}
        
          {/* Community Member */}
          {(notificationType?.name === "Member request" && notificationData.sendercommunity !== undefined && 
          notificationData.boolean_request === true) && (id === notificationData.sendercommunity.id) &&

            <div className="flex flex-row justify-between bg-light w-full px-6 py-4 whitespace-nowrap">
              <div className="flex flex-row">
                <div class="flex-shrink-0 h-10 pr-4">
                  {image_profile ? (
                    <div
                      className=" h-10 w-10 rounded-full bg-cover bg-no-repeat my-auto "
                      style={{
                        backgroundImage: `url(${image_profile && image_profile.url})`,
                      }}
                      alt={`Profile name ${gamertag}`}
                    >
                      <svg className="clip-svg ">
                        <defs>
                          <clipPath clipPathUnits="objectBoundingBox">
                            <path d="M1,0.284 C1,0.428,1,0.572,1,0.716 C0.999,0.718,0.998,0.72,0.998,0.722 C0.993,0.747,0.979,0.766,0.954,0.779 C0.818,0.849,0.681,0.919,0.545,0.988 C0.515,1,0.484,1,0.454,0.988 C0.318,0.919,0.182,0.849,0.046,0.779 C0.015,0.764,0,0.74,0,0.709 C0,0.569,0,0.431,0,0.292 C0,0.26,0.015,0.236,0.046,0.221 C0.182,0.151,0.318,0.081,0.454,0.012 C0.484,-0.004,0.515,-0.004,0.545,0.012 C0.681,0.081,0.818,0.151,0.954,0.222 C0.968,0.229,0.979,0.243,0.989,0.255 C0.995,0.263,0.996,0.274,1,0.284"></path>
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  ) : (
                    <div
                      className=" h-10 w-10 rounded-full bg-cover bg-no-repeat my-auto text-transparent"
                      style={{ backgroundImage: `url(${ProfilePlaceholder})` }}
                      //alt={`Profile name ${gamertag}`}
                    >
                      
                      <Gravatar
                        email={email}
                        size={1600}
                        rating="pg"
                        default={ProfilePlaceholder}
                        className="CustomAvatar-image overflow-hidden h-10 w-10 rounded-full bg-cover bg-no-repeat my-auto "
                      />
                    </div>
                  )}
                </div>

                <div class="flex flex-col whitespace-nowrap">
                  <p>{notificationType?.name}</p>
                  <p>@{notificationType?.name}</p>
                </div>

              </div>

              <div class="rounded-3xl px-4 py-2 bg-gray-500 text-white ">
                Request sent
              </div>
            </div>
          }


      </div>
  );
};

export default CardNotificationSent;
