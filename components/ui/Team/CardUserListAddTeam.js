import { IonButton, IonCardContent, IonLoading, IonModal, IonToast } from '@ionic/react';

import { Fragment, useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationIcon } from '@heroicons/react/outline';

/* Images */
import ProfilePlaceholder from '../../assets/images/profile_placeholder.png';
import Gravatar from 'react-gravatar';
import Axios from 'axios';

/* Redux */
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../redux/actions/userActions';
import { fetchTeamId, teamAddMember } from '../../redux/actions/teamActions';
import { createNotificationTeamMemberRequest } from '../../redux/actions/notificationActions';

const CardUserListAddTeam = ({ userId, username, image_profile, email, gamertag }) => {

  const { id } = useParams();

  const dispatch = useDispatch();
  const users = useSelector((state) => state.allUsers.users);  
  const team = useSelector((state) => state.team);

  const [showModal, setShowModal] = useState(false);
  const [clickedUser, setClickedUser] = useState('');
  //const [user, setUser] = useState('');
  const [teamDataMember, setTeamDataMember] = useState({});
  const [error, setError] = useState('');
  const [showToast1, setShowToast1] = useState(false);
  const [showLoading, setShowLoading] = useState(true);

  console.log("teamDataMember card", teamDataMember)

  const notifications = useSelector((state) => state.allNotifications.notifications);
  console.log("notifications 2", notifications)

  useEffect(() => {
    Axios.get(`https://hivefolio.herokuapp.com/api/teams/${id}?populate=*`)
      .then(data => {
        setTeamDataMember(data.data.members);
      })
      .catch(err => {
        console.log('ERR: ', err);
      });
  }, []);

  /* const dataLoaded = () => {
    if(userId !== undefined ) {
      setShowLoading(false)
    }
  } */

  /* useEffect(() => {
    dispatch(fetchUsers(users));
    dispatch(fetchTeamId(id));
    dataLoaded();
  }, []); */

  /* Request add user to members list */
  const handleTeamMemberRequest = async (event) => {
    //event.preventDefault()
    dispatch(createNotificationTeamMemberRequest( userId, id ))
  }

  /* New Add user to members list */
  const handleAddUser = async (event) => {
    //event.preventDefault()
    dispatch(teamAddMember(id, userId, users, teamDataMember, team ))
  }

  return (
    <IonCardContent className="flex flex-row flex-wrap w-full">
      <div class="flex flex-row bg-light w-full px-6 py-4 whitespace-nowrap">
        <div class="flex justify-between items-center w-full">
          <div className="flex flex-row">
            {/* <IonLoading
              cssClass='my-custom-class'
              isOpen={showLoading}
              onDidDismiss={() => setShowLoading(false)}
              message={'Please wait...'}
            /> */}
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
                      <clipPath id="clip-shape" clipPathUnits="objectBoundingBox">
                        <path d="M1,0.284 C1,0.428,1,0.572,1,0.716 C0.999,0.718,0.998,0.72,0.998,0.722 C0.993,0.747,0.979,0.766,0.954,0.779 C0.818,0.849,0.681,0.919,0.545,0.988 C0.515,1,0.484,1,0.454,0.988 C0.318,0.919,0.182,0.849,0.046,0.779 C0.015,0.764,0,0.74,0,0.709 C0,0.569,0,0.431,0,0.292 C0,0.26,0.015,0.236,0.046,0.221 C0.182,0.151,0.318,0.081,0.454,0.012 C0.484,-0.004,0.515,-0.004,0.545,0.012 C0.681,0.081,0.818,0.151,0.954,0.222 C0.968,0.229,0.979,0.243,0.989,0.255 C0.995,0.263,0.996,0.274,1,0.284"></path>
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              ) : (
                <div
                  className=" h-10 w-10 rounded-full bg-cover bg-no-repeat my-auto text-transparent"
                  style={{ backgroundImage: `url(${ProfilePlaceholder})` }}
                  alt={`Profile name ${gamertag}`}
                >
                  {/* Change default to placeholder image */}
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
              <div class="text-sm font-medium text-gray-900">{gamertag}</div>
              <div class="text-sm text-gray-500">{username}</div>
            </div>
          </div>
          <div class="px-6 py-4 whitespace-nowrap">
            {/* <div class="text-sm text-gray-900">Regional Paradigm Technician</div>
                                <div class="text-sm text-gray-500">Optimization</div> */}
          </div>
          <div
            class="rounded-3xl mr-4 py-4 px-4 bg-dark text-white hover:bg-primary hover:text-dark"
            onClick={() => {
              setClickedUser(id);
              setShowModal(true);
            }}
          >
            Options
          </div>

          {/*  */}

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
                  <h6>Member options</h6>
                  <div className="mt-2">
                    <h3>{gamertag}</h3>
                    <p className="text-sm text-gray-500">
                      Would you like to add {gamertag} to team {team.name}?
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                    handleTeamMemberRequest(userId);
                    setShowToast1(true);
                  }}
                >
                  {error && <p>{error}</p>}
                  Add member request
                </button>
              </div>

            </div>

            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <IonToast
                isOpen={showToast1}
                onDidDismiss={() => setShowToast1(false)}
                message={`User has been added to ${team.name}`}
                duration={1000}
              />
            </div>
              
            <IonButton onClick={() => {setShowModal(false)}}>Close Modal</IonButton>
          </IonModal>


          {/*  */}

          
          
        </div>
      </div>
    </IonCardContent>
  );
};

export default CardUserListAddTeam;
