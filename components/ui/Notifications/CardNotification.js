import { IonButton, IonCardContent, IonModal, IonToast } from '@ionic/react';

import { Fragment, useRef, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
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
import { 
  teamAddMember,
  organisationAddMember, organisationAddTeam, organisationAddCommunity,
  communityAddMember, communityAddTeam,
  notificationTeamMemberApprove, 
  notificationOrganisationMemberApprove,
  notificationOrganisationTeamApprove,
  notificationOrganisationCommunityApprove, 
  notificationCommunityMemberApprove, 
  notificationCommunityTeamApprove,
  notificationRead, 
  notifiationDelete
  } from '../../redux/actions/coreActions';
//import { organisationAddMember, organisationAddTeam, organisationAddCommunity } from '../../redux/actions/organisationActions';
//import { communityAddMember, communityAddTeam } from '../../redux/actions/communityActions';
/* import { 
  notificationTeamMemberApprove, 
  notificationOrganisationMemberApprove,
  notificationOrganisationTeamApprove,
  notificationOrganisationCommunityApprove, 
  notificationCommunityMemberApprove, 
  notificationCommunityTeamApprove,
  notificationRead, 
  notifiationDelete 
} from '../../redux/actions/notificationActions'; */

const CardNotification = ({ id, notificationId, notificationData, username, image_profile, email, gamertag, team }) => {

  const loggedInUser = useCurrentUser();
  const dispatch = useDispatch();

  const users = useSelector((state) => state.allData.users);
  const teams = useSelector((state) => state.allData.teams);
  const organisations = useSelector((state) => state.allData.organisations);
  const communities = useSelector((state) => state.allData.communities);
  const games = useSelector((state) => state.allData.games);
  const characters = useSelector((state) => state.allData.characters);
  const notifications = useSelector((state) => state.allData.notifications);

  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const [showToast1, setShowToast1] = useState(false);


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
    <IonCardContent className="flex flex-row flex-wrap w-full">
      <div class="flex flex-row bg-light w-full px-6 py-4 whitespace-nowrap">
        <div class="flex justify-between items-center w-full">
          <div className="flex flex-row">
            <div class="flex-shrink-0 h-10 ">
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
            <div class="ml-4">
              
            </div>
          </div>
          <div class="px-6 py-4 whitespace-nowrap">
          </div>

          <p>{notificationType?.name}</p>

          <div
            class="rounded-3xl mr-4 py-4 px-4 bg-dark text-white hover:bg-primary hover:text-dark"
            onClick={() => {
              //setClickedUser(id);
              handleNotificationRead(notificationId);
              setShowModal(true);
            }}
          >
            Options
          </div>

          <IonModal
            isOpen={showModal}
            swipeToClose={true}
            onDidDismiss={() => setShowModal(false)}>

            <div className="sm:items-start m-8">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                </div>

                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left mb-4">
                  <h4>Notification details</h4>
                  <div className="mt-2">

                    {/* <p>Add 
                      {notificationData.senderuser} {notificationData.senderteam} {notificationData.senderorganisation} 
                      to 
                      {notificationData.receiveruser} {notificationData.receiverteam} {notificationData.receiverorganisation}
                    </p> */}
                    
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">

                {/* Team */}

                {(notificationType?.name === "Member request" && 
                notificationData.senderteam !== undefined && 
                notificationData.boolean_request === true) &&

                  <div className='flex flex-row flex-wrap'>

                  <NotificationRequestMemberTeam
                    senderteam={notificationData.senderteam}
                  />

                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => {
                        handleTeamMemberApprove(notificationId);
                        setShowToast1(true);
                      }}
                    >
                      {error && <p>{error}</p>}
                      Approve team member
                    </button>
                  </div>
                }

                {(notificationType?.name === "Member request" && 
                notificationData.receiverteam !== undefined && 
                notificationData.boolean_approve === true && 
                notificationData.boolean_request === false) &&

                  (
                    <div className='flex flex-row flex-wrap'>

                      <NotificationAcceptMemberTeam
                        senderuser={notificationData.senderuser}
                      />

                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => {
                        handleDeleteNotification(notificationId);
                        setShowToast1(true);
                      }}
                    >
                      {error && <p>{error}</p>}
                      Delete notification
                    </button>


                      <button
                        type="button"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => {
                          handleTeamAddMember(receiverTeamId);
                          setShowToast1(true);
                        }}
                      >
                        {error && <p>{error}</p>}
                        Add member
                      </button>

                    </div>
                  )
                  
                }

                {/* Organisation */}

                {(notificationType?.name === "Member request" && 
                notificationData.senderorganisation !== undefined && 
                notificationData.boolean_request === true) &&

                  <div className='flex flex-row flex-wrap'>

                  <NotificationRequestMemberOrganisation
                    senderorganisation={notificationData.senderorganisation}
                  />

                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      handleOrganisationMemberApprove(notificationId);
                      setShowToast1(true);
                    }}
                  >
                    {error && <p>{error}</p>}
                    Approve organisation member
                  </button>

                  </div>
                }

                {(notificationType?.name === "Member request" && 
                notificationData.receiverorganisation !== undefined && 
                notificationData.boolean_approve === true && 
                notificationData.boolean_request === false) &&

                  <div className='flex flex-row flex-wrap'>

                  <NotificationAcceptMemberOrganisation
                    senderuser={notificationData.senderuser}
                  />

                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      handleDeleteNotification(notificationId);
                      setShowToast1(true);
                    }}
                  >
                    {error && <p>{error}</p>}
                    Delete notification
                  </button>


                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      handleOrganisationAddMember(receiverOrganisationId);
                      setShowToast1(true);
                    }}
                  >
                    {error && <p>{error}</p>}
                    Add member
                  </button>
                  </div>
                }


                {(notificationType?.name === "Team request" && 
                notificationData.senderorganisation !== undefined && 
                notificationData.boolean_request === true) &&

                  <div className='flex flex-row flex-wrap'>

                  <NotificationRequestTeamOrganisation
                    senderorganisation={notificationData.senderorganisation}
                  />

                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      handleOrganisationTeamApprove(notificationId);
                      setShowToast1(true);
                    }}
                  >
                    {error && <p>{error}</p>}
                    Approve team request
                  </button>

                  </div>
                }


                {(notificationType?.name === "Team request" && 
                notificationData.receiverorganisation !== undefined && 
                notificationData.boolean_approve === true && 
                notificationData.boolean_request === false) &&

                  <div className='flex flex-row flex-wrap'>

                  <NotificationAcceptTeamOrganisation
                    senderteam={notificationData.senderteam}
                  />

                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      handleDeleteNotification(notificationId);
                      setShowToast1(true);
                    }}
                  >
                    {error && <p>{error}</p>}
                    Delete notification
                  </button>


                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      handleOrganisationAddTeam(receiverOrganisationId);
                      setShowToast1(true);
                    }}
                  >
                    {error && <p>{error}</p>}
                    Add team
                  </button>
                  </div>
                }

                {(notificationType?.name === "Community request" && 
                notificationData.senderorganisation !== undefined && 
                notificationData.boolean_request === true) &&

                  <div className='flex flex-row flex-wrap'>

                  <NotificationRequestCommunityOrganisation
                    senderorganisation={notificationData.senderorganisation}
                  />

                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      handleOrganisationCommunityApprove(notificationId);
                      setShowToast1(true);
                    }}
                  >
                    {error && <p>{error}</p>}
                    Approve community request
                  </button>

                  </div>
                }

                {(notificationType?.name === "Community request" && 
                notificationData.receiverorganisation !== undefined && 
                notificationData.boolean_approve === true && 
                notificationData.boolean_request === false) &&

                  <div className='flex flex-row flex-wrap'>

                  <NotificationAcceptCommunityOrganisation
                    sendercommunity={notificationData.sendercommunity}
                  />

                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      handleDeleteNotification(notificationId);
                      setShowToast1(true);
                    }}
                  >
                    {error && <p>{error}</p>}
                    Delete notification
                  </button>


                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      handleOrganisationAddCommunity(receiverOrganisationId);
                      setShowToast1(true);
                    }}
                  >
                    {error && <p>{error}</p>}
                    Add community
                  </button>
                  </div>
                }


                {/* Community */}

                {(notificationType?.name === "Member request" && 
                notificationData.sendercommunity !== undefined && 
                notificationData.boolean_request === true) &&

                  <div className='flex flex-row flex-wrap'>

                  <NotificationRequestMemberCommunity
                    sendercommunity={notificationData.sendercommunity}
                  />

                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      handleCommunityMemberApprove(notificationId);
                      setShowToast1(true);
                    }}
                  >
                    {error && <p>{error}</p>}
                    Approve organisation member
                  </button>

                  </div>
                }

                {(notificationType?.name === "Member request" && 
                notificationData.receivercommunity !== undefined && 
                notificationData.boolean_approve === true && 
                notificationData.boolean_request === false) &&

                  <div className='flex flex-row flex-wrap'>

                  <NotificationAcceptMemberCommunity
                    senderuser={notificationData.senderuser}
                  />

                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      handleDeleteNotification(notificationId);
                      setShowToast1(true);
                    }}
                  >
                    {error && <p>{error}</p>}
                    Delete notification
                  </button>


                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      handleCommunityAddMember(receiverCommunityId);
                      setShowToast1(true);
                    }}
                  >
                    {error && <p>{error}</p>}
                    Add member
                  </button>
                  </div>
                }

                {(notificationType?.name === "Team request" && 
                notificationData.sendercommunity !== undefined && 
                notificationData.boolean_request === true) &&

                  <div className='flex flex-row flex-wrap'>

                  <NotificationRequestTeamCommunity
                    sendercommunity={notificationData.sendercommunity}
                  />

                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      handleCommunityTeamApprove(notificationId);
                      setShowToast1(true);
                    }}
                  >
                    {error && <p>{error}</p>}
                    Approve request
                  </button>

                  </div>
                }

                {(notificationType?.name === "Team request" && 
                notificationData.receivercommunity !== undefined && 
                notificationData.boolean_approve === true && 
                notificationData.boolean_request === false) &&

                  <div className='flex flex-row flex-wrap'>

                  <NotificationAcceptTeamCommunity
                    senderteam={notificationData.senderteam}
                  />

                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      handleDeleteNotification(notificationId);
                      setShowToast1(true);
                    }}
                  >
                    {error && <p>{error}</p>}
                    Delete notification
                  </button>


                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      handleCommunityAddTeam(receiverCommunityId);
                      setShowToast1(true);
                    }}
                  >
                    {error && <p>{error}</p>}
                    Add team
                  </button>
                  </div>
                }


                {/* Delete notification */}
                {/* {(notificationType?.name === "Member request" && notificationData.boolean_approve === true && notificationData.boolean_request === false) &&
                  
                } */}

              </div>

            </div>

            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <IonToast
                isOpen={showToast1}
                onDidDismiss={() => setShowToast1(false)}
                //message={`User has been added to ${team.name}`}
                duration={1000}
              />
            </div>
              
            <IonButton onClick={() => {setShowModal(false)}}>Close Modal</IonButton>
          </IonModal>


        </div>
      </div>
    </IonCardContent>
  );
};

export default CardNotification;
