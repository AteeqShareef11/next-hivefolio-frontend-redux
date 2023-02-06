import { IonButton, IonContent, IonHeader, IonModal, IonTitle, IonToast, IonToolbar } from '@ionic/react';

import { useState } from 'react';

/* Redux */
import { useSelector } from 'react-redux';

/* Contexts */
import { useCurrentUser } from '../../context/AuthContext';

/* Components */
import EditExperienceModalCommunity01 from './EditExperienceModalCommunity01';

const ExperienceModalCommunity = ({ selectedExperince, showEditExperiencesModal, setShowEditExperiencesModal, showToast1, setShowToast1}) => {

  const signedInUser = useCurrentUser();

  const selectedProfileCommunity = useSelector(state => state.community);

  const {admins} = selectedProfileCommunity

  const [showEditExperiencesModal01, setShowEditExperiencesModal01] = useState(false);
  const [showEditExperiencesModal02, setShowEditExperiencesModal02] = useState(false);
  const [showEditExperiencesModal03, setShowEditExperiencesModal03] = useState(false);
  
  const adminId = admins?.find((person) => {
    return person.id === signedInUser.id;
  })
  

  return (
    
    <div>
      {selectedExperince && (
        
      
    <div className="flex flex-row flex-wrap w-full">
      <EditExperienceModalCommunity01
        showEditExperiencesModal={showEditExperiencesModal}
        setShowEditExperiencesModal={setShowEditExperiencesModal}

        showEditExperiencesModal01={showEditExperiencesModal01}
        setShowEditExperiencesModal01={setShowEditExperiencesModal01}

        showEditExperiencesModal02={showEditExperiencesModal02}
        setShowEditExperiencesModal02={setShowEditExperiencesModal02}

        showEditExperiencesModal03={showEditExperiencesModal03}
        setShowEditExperiencesModal03={setShowEditExperiencesModal03}

        selectedExperince={selectedExperince}
      />

      

          

          {/*  */}

          <IonModal
            isOpen={showEditExperiencesModal}
            swipeToClose={true}
            onDidDismiss={() => setShowEditExperiencesModal(false)}
            >

            <IonHeader>
              <IonToolbar>

                {adminId && (
                  <IonButton 
                    className='mr-4'
                    onClick={() => {
                      setShowEditExperiencesModal(false)
                      setShowEditExperiencesModal01(true)
                    }} slot="end"
                  >
                    Edit
                  </IonButton>
                )}
                

                 <IonTitle>Experience</IonTitle>
              </IonToolbar>
            </IonHeader>

            <div className="flex flex-col sm:items-start h-full">

              
              <div className="flex-col sm:flex sm:items-start m-2 border-b-2 border-solid w-auto">

                <div className="text-center m-4 sm:text-left">
                    <h4 className='m-0'>{selectedExperince.name}</h4>
                </div>


              </div>

              <ModalContent
                className="shrink h-full "
                  onClose={(value) => {
                    setShowEditExperiencesModal({ isOpen: false });
                    value ? setRetVal(value) : setRetVal("User Cancelled");
                  }}

                  description={selectedExperince.description}
                  type_experiences={selectedExperince.type_experiences}
                  
                  selectedExperince={selectedExperince}
                  selectedProfileCommunity={selectedProfileCommunity} 
                  adminId={adminId}
                  setShowEditExperiencesModal02={setShowEditExperiencesModal02}
                  
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
              className='w-full' onClick={() => {setShowEditExperiencesModal(false)}}
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

export default ExperienceModalCommunity;


const ModalContent = ({ description, type_experiences, selectedExperince, selectedProfileCommunity, adminId, setShowEditExperiencesModal02 }) => {
  return (
    <>
      
      <IonContent>

        <div className="px-4 py-5 w-full">

          <div className="px-4 py-5 w-full">
            {description}    
          </div>

          <div className='flex'>

              <div>
                {selectedExperince.type_experiences.length > 0 ? (
                  <div>
                    {type_experiences.map(type => (

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
                    {adminId && (
                      <div
                        className="inline-flex items-center justify-center h-8  
                        px-6 font-medium tracking-wide transition 
                        duration-200 bg-primary text-dark rounded-full hover:bg-dark hover:text-light
                        focus:shadow-outline focus:outline-none"
                        onClick={() => {
                          setShowEditExperiencesModal02(true);
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
      </IonContent>
    </>
  );
};
