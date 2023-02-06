import { IonButton, IonCardContent, IonContent, IonHeader, IonItem, IonList, IonLoading, IonModal, IonTitle, IonToast, IonToolbar } from '@ionic/react';

import { useState } from 'react';

/* Contexts */
import { useCurrentUser } from '../../context/AuthContext';


const EditExperienceModalTeam03 = ({ showEditExperiencesModal01,  setShowEditExperiencesModal01, showEditExperiencesModal03,  setShowEditExperiencesModal03, showToast1, setShowToast1}) => {



  const [error, setError] = useState('');


  return (
    <div className="flex flex-row flex-wrap w-full">

          {/*  */}

          <IonModal
            isOpen={showEditExperiencesModal03}
            swipeToClose={true}
            onDidDismiss={() => {
              setShowEditExperiencesModal01(true), 
              setShowEditExperiencesModal03(false)}
            }
            >

            <IonHeader>
              <IonToolbar>

                <IonButton 
                  className='mr-4'
                  onClick={() => {
                    setShowEditExperiencesModal01(true)
                    setShowEditExperiencesModal03(false)
                  }} slot="end"
                >
                  Back
                </IonButton>
                 <IonTitle>Onboarding 3</IonTitle>
              </IonToolbar>
            </IonHeader>

            <div className="flex flex-col sm:items-start h-full">

              <div className="sm:flex sm:items-start m-4">
                {/* <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10 sm:mb-4">
                  <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                </div> */}

                <div className="text-center sm:ml-4 sm:text-left mb-4">
                  <p>Short details here</p>

                </div>
              </div>


              <ModalContent
                className="shrink h-full "
                  /* onClose={(value) => {
                    setShowModal({ isOpen: false });
                    value ? setRetVal(value) : setRetVal("User Cancelled");
                  }} */
                  
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
              
            {/* <div className='p-4 z-10 bg-white'>
              <IonButton className='w-full' onClick={() => {setShowModal(false)}}>Close Modal</IonButton>
            </div> */}
          </IonModal>


    </div>
  );
};

export default EditExperienceModalTeam03;


const ModalContent = ({ onClose }) => {
  return (
    <>
      
      <IonContent>


          {/* Content here */}

        

          {/*  */}

        
      </IonContent>
    </>
  );
};
