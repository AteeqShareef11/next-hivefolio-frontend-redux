import { IonCardContent } from '@ionic/react';

import { Fragment, useRef, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

/* Images */
import ProfilePlaceholder from '../../assets/images/profile_placeholder.png';
import Gravatar from 'react-gravatar';

/* User */
import { useCurrentUser } from '../../context/AuthContext';

import CardJobModal from './CardJobModal';

const CardJob = ({ job, userId, standard, full, responsive, list, edit, view }) => {

  const signedInUser = useCurrentUser();

  const {id, name, image_profile, type_job} = job

  const [showModal, setShowModal] = useState(false);
  const [clickedUser, setClickedUser] = useState('');
  //const [user, setUser] = useState('');
  const [error, setError] = useState('');
  const [showToast1, setShowToast1] = useState(false);
  const [showLoading, setShowLoading] = useState(true);

  const adminId = job.admins?.find((person) => {
    return person.id === signedInUser.id;
  })



  return (
    <div>
      {list === true && (
    <div className="flex flex-row flex-wrap w-full"
      onClick={() => {
        setClickedUser(id);
        setShowModal(true);
      }}
    >
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
                  /* alt={`Profile name ${username}`} */
                >
                  {/* Change default to placeholder image */}
                  <Gravatar
                    /* email={email} */
                    size={1600}
                    rating="pg"
                    default={ProfilePlaceholder}
                    className="CustomAvatar-image overflow-hidden h-10 w-10 rounded-full bg-cover bg-no-repeat my-auto "
                  />
                </div>
              )}
            </div>
            <div class="flex flex-col ml-4">
              <div class="text-gray-900 mb-2 text-lg">{name}</div>

              <div>
                {
                  type_job?.sort(() => Math.random() - 0.5)?.map(item => (
                    <div
                    className="inline-flex items-center justify-center h-8  
                                px-6 font-medium tracking-wide transition 
                                duration-200 bg-gray-300 text-dark rounded-full
                                focus:shadow-outline focus:outline-none"
                    >
                      {item.name}
                      {console.log("item.name", item.name)}
                    </div>
                  ))}
              </div>
              <div class="text-sm text-gray-500">{type_job.name}</div>
            </div>
          </div>


          
          {/* <div className='flex'>
            {(edit === true && adminId) && (
              <Link to={`/job/${id}/edit`}
                  class="rounded-3xl mr-4 py-4 px-4 bg-dark text-white hover:bg-primary hover:text-dark"
                  onClick={() => {
                  setClickedUser(id);
                  setShowModal(true);
                  }}
              >
                  Edit
              </Link>
            )}                      

            {view === true && (
              <div
                  class="rounded-3xl mr-4 py-4 px-4 bg-dark text-white hover:bg-primary hover:text-dark"
                  onClick={() => {
                  setClickedUser(id);
                  setShowModal(true);
                  }}
              >
                  View
              </div>
            )}
          </div> */}
          

          
          
        </div>
        
      </div>
      
      </div>
      )}


{standard === true && (
    <div className="flex flex-row flex-wrap w-full">
      <Link to={`/job/${id}`} className="w-full">
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
                  /* alt={`Profile name ${name}`} */
                >
                  {/* Change default to placeholder image */}
                  <Gravatar
                    /* email={email} */
                    size={1600}
                    rating="pg"
                    default={ProfilePlaceholder}
                    className="CustomAvatar-image overflow-hidden h-10 w-10 rounded-full bg-cover bg-no-repeat my-auto "
                  />
                </div>
              )}
            </div>
            
            <div class="flex flex-col ml-4">
              <div class="text-gray-900 mb-2 text-lg">{name}</div>

              <div>
                {
                  type_job?.sort(() => Math.random() - 0.5)?.map(item => (
                    <div
                    className="inline-flex items-center justify-center h-8  
                                px-6 font-medium tracking-wide transition 
                                duration-200 bg-gray-300 text-dark rounded-full
                                focus:shadow-outline focus:outline-none"
                    >
                      {item.name}
                      {console.log("item.name", item.name)}
                    </div>
                  ))}
              </div>
              <div class="text-sm text-gray-500">{type_job.name}</div>
            </div>
          </div>


          
          
          </div>
          

        
      </div>
        </Link>
      </div>
      )}

      <CardJobModal
        job={job}
        showModal={showModal}
        setShowModal={setShowModal}
        showToast1={showToast1}
        setShowToast1={setShowToast1}
      />

      
      </div>
  );
};

export default CardJob;
