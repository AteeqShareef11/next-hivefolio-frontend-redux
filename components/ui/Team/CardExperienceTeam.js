import { IonButton, IonCardContent, IonLoading, IonModal, IonToast } from '@ionic/react';

import { Fragment, useRef, useEffect, useState } from 'react';

/* Components */
import ExperienceModalTeam from './ExperienceModalTeam';
import CreateExperienceModalTeam from './CreateExperienceModalTeam';

/* Images */
import ProfilePlaceholder from '../../assets/images/profile_placeholder.png';

import { useCurrentUser } from '../../context/AuthContext';

/* Redux */
import { useSelector } from 'react-redux';

const CardExperienceTeam = ({ experience }) => {

  const signedInUser = useCurrentUser();

  const selectedProfileTeam = useSelector(state => state.team);

  const experiences = useSelector((state) => state.allExperiences.experiences);

  const {admins} = selectedProfileTeam


  const selectedExperince = experiences?.data.find((item) => {
    return item?.id === experience?.id;
  })

  // console.log("Selected Experience founded here", selectedExperince)
  const adminId = admins?.find((person) => {
    return person.id === signedInUser.id;
  })

  const [showEditExperiencesModal, setShowEditExperiencesModal] = useState(false);
  

  return (
    <div>
      <div
        className="flex flex-row"
        onClick={() => {
          setShowEditExperiencesModal(true);
        }}
      >
        {selectedExperince && (
          <div class="bg-light w-full px-6 py-4">
            <div class="">
              <div className="flex flex-row">
                <div class="flex-shrink-0 h-10 ">
                  {selectedExperince.image_profile ? (
                    <div
                      className=" h-10 w-10 rounded-full bg-cover bg-no-repeat my-auto "
                      style={{
                        backgroundImage: `url(${
                          selectedExperince.image_profile && selectedExperince.image_profile.url
                        })`,
                      }}
                      alt={`Profile name ${selectedExperince.name}`}
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
                    ></div>
                  )}
                </div>
                <div class="flex flex-col ml-4">
                  <div class="text-gray-900 mb-2 text-lg">{selectedExperince.name}</div>

                  <div>
                    {selectedExperince.attributes.type_experiences.data.length > 0 ? (
                      <div>
                        {selectedExperince.attributes.type_experiences.data
                          ?.sort(() => Math.random() - 0.5)
                          ?.map(item => (
                            <div
                              className="inline-flex items-center justify-center h-8  
                                  px-6 font-medium tracking-wide transition 
                                  duration-200 bg-gray-300 text-dark rounded-full
                                  focus:shadow-outline focus:outline-none mr-2"
                            >
                              {item.name}
                            </div>
                          ))}
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
                              setShowEditExperiencesModal(true);
                            }}
                          >
                            Add type
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div class="text-sm text-gray-500">
                    {selectedExperince.attributes.name}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <ExperienceModalTeam
        showEditExperiencesModal={showEditExperiencesModal}
        setShowEditExperiencesModal={setShowEditExperiencesModal}
        selectedExperince={selectedExperince}
      />

      <CreateExperienceModalTeam selectedExperince={selectedExperince} />
    </div>
  );
};

export default CardExperienceTeam;
