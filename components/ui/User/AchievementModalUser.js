import { IonButton, IonCardContent, IonContent, IonHeader, IonItem, IonList, IonLoading, IonModal, IonTitle, IonToast, IonToolbar } from '@ionic/react';

import { useEffect, useState } from 'react';
import { ExclamationIcon } from '@heroicons/react/outline';

/* Images */
import ProfilePlaceholder from '../../assets/images/profile_placeholder.png';
import Gravatar from 'react-gravatar';
import Axios from 'axios';

/* Search */
import Select from 'react-select';

/* Redux */
import { useDispatch, useSelector } from 'react-redux';


/* Contexts */
import { useCurrentUser } from '../../context/AuthContext';

/* Components */
import EditExperienceModalUser01 from './EditExperienceModalUser01';
import EditAchievementModalUser01 from './EditAchievementModalUser01';

const AchievementModalUser = ({ selectedAchievement, showEditAchievementModal, setShowEditAchievementModal, showToast1, setShowToast1}) => {

  const dispatch = useDispatch();
  const signedInUser = useCurrentUser();

  const selectedProfileUser = useSelector(state => state.user);

  const [showEditAchievementModal01, setShowEditAchievementModal01] = useState(false);
  const [showEditAchievementModal02, setShowEditAchievementModal02] = useState(false);
  const [showEditAchievementModal03, setShowEditAchievementModal03] = useState(false);
  

  

  return (
    
    <div>
      {selectedAchievement && (
        
      
    <div className="flex flex-row flex-wrap w-full">
      <EditAchievementModalUser01
        showEditAchievementModal={showEditAchievementModal}
        setShowEditAchievementModal={setShowEditAchievementModal}

        showEditAchievementModal01={showEditAchievementModal01}
        setShowEditAchievementModal01={setShowEditAchievementModal01}

        showEditAchievementModal02={showEditAchievementModal02}
        setShowEditAchievementModal02={setShowEditAchievementModal02}

        showEditAchievementModal03={showEditAchievementModal03}
        setShowEditAchievementModal03={setShowEditAchievementModal03}

        selectedAchievement={selectedAchievement}
      />

      

          

          {/*  */}

          <IonModal
            isOpen={showEditAchievementModal}
            swipeToClose={true}
            onDidDismiss={() => setShowEditAchievementModal(false)}
            >

            <IonHeader>
              <IonToolbar>

                {/* <IonButton 
                  className='mr-4'
                  onClick={() => {
                    setShowEditAchievementModal01(true)
                    setShowEditAchievementModal02(false)
                  }} slot="end"
                >
                  Previous
                </IonButton> */}

                {selectedProfileUser.id === signedInUser.id && (
                  <IonButton 
                    className='mr-4'
                    onClick={() => {
                      setShowEditAchievementModal(false)
                      setShowEditAchievementModal01(true)
                    }} slot="end"
                  >
                    Edit
                  </IonButton>
                )}
                

                 <IonTitle>Achievement</IonTitle>
              </IonToolbar>
            </IonHeader>

            <div className="flex flex-col sm:items-start h-full">

              <div className="flex-col sm:flex sm:items-start m-2 border-b-2 border-solid">

                <div className="text-center m-4 sm:text-left">
                    <h4 className='m-0'>{selectedAchievement.name}</h4>
                </div>


                {/* Content */}

                <div className="w-full pb-4 mr-4">

   

                </div>

                
              </div>

              <ModalContent
                className="shrink h-full "
                  onClose={(value) => {
                    setShowEditAchievementModal({ isOpen: false });
                    value ? setRetVal(value) : setRetVal("User Cancelled");
                  }}

                  description={selectedAchievement.description}
                  type_achievements={selectedAchievement.type_achievements}
                  selectedAchievement={selectedAchievement}
                  setShowEditAchievementModal02={setShowEditAchievementModal02}
                  selectedProfileUser={selectedProfileUser}
                  signedInUser={signedInUser}

                  
                />

            </div>


            

            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <IonToast
                isOpen={showToast1}
                onDidDismiss={() => setShowToast1(false)}
                message={`Data saved`}
                duration={1000}
              />
            </div>
              
            <div className='p-4 z-10 bg-white'>
              <IonButton 
              className='w-full' onClick={() => {setShowEditAchievementModal(false)}}
              >
                Close Modal
              </IonButton>
            </div>
          </IonModal>


    </div>
    )}
    </div>
  );
};

export default AchievementModalUser;


const ModalContent = ({ selectedAchievement, description, type_achievements, setShowEditAchievementModal02, selectedProfileUser, signedInUser }) => {
  return (
    <>
      
      <IonContent>

        <div className="px-4 py-5 w-full">

          <div className="px-4 py-5 w-full">
            {description}    
          </div>

          <div>
            {selectedAchievement.type_achievements.length > 0 ? (
              <div>
                {type_achievements.map(type => (

                  <div
                    className="rounded-3xl inline-flex items-center justify-center h-8  
                    px-6 mr-4 focus:shadow-outline focus:outline-none bg-dark text-white"
                  >
                    {type.name}

                  </div>

                ))}
              </div>
            ) : (

              <div>
                {selectedProfileUser.id === signedInUser.id && (
                  <div
                    className="inline-flex items-center justify-center h-8  
                    px-6 font-medium tracking-wide transition 
                    duration-200 bg-primary text-dark rounded-full hover:bg-dark hover:text-light
                    focus:shadow-outline focus:outline-none"
                    onClick={() => {
                      setShowEditAchievementModal02(true);
                    }}
                  >
                    Add type
                  </div>
                )}
              </div>
              
            )}
            
            
          </div>

        </div>
      </IonContent>
    </>
  );
};
