import { useState } from 'react';


import AchievementModalOrganisation from './AchievementModalOrganisation';
import CreateAchievementModalOrganisation from './CreateAchievementModalOrganisation';

/* Images */
import ProfilePlaceholder from '../../assets/images/profile_placeholder.png';

import { useCurrentUser } from '../../context/AuthContext';

/* Redux */
import { useDispatch, useSelector } from 'react-redux';

const CardAchievementOrganisation = ({ achievement }) => {

  const dispatch = useDispatch();

  const signedInUser  = useCurrentUser();

  const achievements = useSelector((state) => state.allAchievements.achievements);
  const selectedProfileOrganisation = useSelector((state) => state.organisation);

  const {admins} = selectedProfileOrganisation

  const adminId = admins?.find((person) => {
    return person.id === signedInUser.id;
  });

  const selectedAchievement = achievements?.find((item) => {
    return item?.id === achievement?.id;
  })

  const [showEditAchievementModal, setShowEditAchievementModal] = useState(false);
  

  return (
    <div>
    <div className="flex flex-row flex-wrap w-full"
      onClick={() => {
        setShowEditAchievementModal(true);
      }}
    >

      

      {selectedAchievement && (
      <div class="flex flex-row bg-light w-full px-6 py-4">
      <div class="flex justify-between items-center w-full">
        <div className="flex flex-row">

          <div class="flex-shrink-0 h-10 ">
            {selectedAchievement.image_profile ? (
              <div
                className=" h-10 w-10 rounded-full bg-cover bg-no-repeat my-auto "
                style={{
                  backgroundImage: `url(${selectedAchievement.image_profile && selectedAchievement.image_profile.url})`,
                }}
                alt={`Profile name ${selectedAchievement.name}`}
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
              </div>
            )}
          </div>
          <div class="flex flex-col ml-4">
            <div class="text-gray-900 mb-2 text-lg">{selectedAchievement.name}</div>

            <div>
              {selectedAchievement.type_achievements.length > 0 ? (
                <div>
                  {
                    selectedAchievement.type_achievements?.sort(() => Math.random() - 0.5)?.map(item => (
                      <div
                      className="inline-flex items-center justify-center h-8  
                                  px-6 font-medium tracking-wide transition 
                                  duration-200 bg-gray-300 text-dark rounded-full
                                  focus:shadow-outline focus:outline-none mr-2"
                      >
                        {item.name}
                      </div>
                    ))
                  }
                </div>
              ) : (
                <div>
                  {adminId && (
                    <div
                      className="inline-flex items-center justify-center h-8  
                      px-6 font-medium tracking-wide transition 
                      duration-200 bg-primary text-dark rounded-full hover:bg-dark hover:text-light
                      focus:shadow-outline focus:outline-none"
                      onClick={() => {
                        setShowEditAchievementModal(true);
                      }}
                    >
                      Add type
                    </div>
                  )}
                </div>
              )}
              
            </div>

          </div>
        </div>
        
        
      </div>
      
    </div>

      )}
    </div>

    <AchievementModalOrganisation
      showEditAchievementModal={showEditAchievementModal}
      setShowEditAchievementModal={setShowEditAchievementModal}

      selectedAchievement={selectedAchievement}
    />

    <CreateAchievementModalOrganisation
      selectedAchievement={selectedAchievement}
    />


    </div>
  );
};

export default CardAchievementOrganisation;
