import { IonButton, IonCardContent, IonLoading, IonModal, IonToast } from '@ionic/react';

import { Fragment, useRef, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationIcon } from '@heroicons/react/outline';

/* Components */
import ScoreModalUser from './ScoreModalUser';
import EditScoreModalUser01 from './EditScoreModalUser01';

/* Images */
import ProfilePlaceholder from '../../assets/images/profile_placeholder.png';
import Gravatar from 'react-gravatar';

import { useCurrentUser } from '../../context/AuthContext';

/* Redux */
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../redux/actions/userActions';
import { fetchTeamId, teamAddMember } from '../../redux/actions/teamActions';
import { createNotificationTeamMemberRequest } from '../../redux/actions/notificationActions';

const CardScoreUser = ({ userId, username, image_profile, email, gamertag }) => {

  const { id } = useParams();
  const loggedInUser = useCurrentUser();

  const dispatch = useDispatch();
  const users = useSelector((state) => state.allUsers.users);  
  const team = useSelector((state) => state.team);

  console.log("id Experince",id );
  console.log("loggedInUser experience", loggedInUser);

  const [showModal, setShowModal] = useState(false);
  const [showModal01, setShowModal01] = useState(false);
  const [clickedUser, setClickedUser] = useState('');
  const [error, setError] = useState('');
  const [showToast1, setShowToast1] = useState(false);
  //const [showLoading, setShowLoading] = useState(true);

  return (
    <div className="flex flex-row flex-wrap w-full">
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

          <div className='flex'>

            <ScoreModalUser
              showModal={showModal}
              setShowModal={setShowModal}
            />

            <EditScoreModalUser01
              showModal01={showModal01}
              setShowModal01={setShowModal01}
            />

            {id === loggedInUser.id && (
              <div
                  class="rounded-3xl mr-4 py-4 px-4 bg-dark text-white hover:bg-primary hover:text-dark"
                  onClick={() => {
                  setClickedUser(id);
                  setShowModal01(true);
                  }}
              >
                  Edit
              </div>                      
            )}

            <div
                class="rounded-3xl mr-4 py-4 px-4 bg-dark text-white hover:bg-primary hover:text-dark"
                onClick={() => {
                setClickedUser(id);
                setShowModal(true);
                }}
            >
                View
            </div>
          </div>

          

          {/*  */}


          {/*  */}

          
          
        </div>
      </div>
    </div>
  );
};

export default CardScoreUser;
