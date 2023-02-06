import { IonButton, IonCardContent, IonContent, IonHeader, IonItem, IonList, IonLoading, IonModal, IonTitle, IonToast, IonToolbar } from '@ionic/react';

import { useState } from 'react';
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

/* Contexts */
import { useCurrentUser } from '../../context/AuthContext';

/* Components */
//import OnboardingModal04 from './OnboardingModal04';

const EditScoreModalTeam02 = ({ showModal01,  setShowModal01, showModal02,  setShowModal02, showModal03,  setShowModal03, showToast1, setShowToast1}) => {

  //const { id } = useParams();

  /* const dispatch = useDispatch();
  const users = useSelector((state) => state.allUsers.users);  
  const team = useSelector((state) => state.team);
  const job = useSelector((state) => state.job); */

  const loggedInUser = useCurrentUser();
  const [showModal04, setShowModal04] = useState(false);


  const [error, setError] = useState('');

  return (
    <div className="flex flex-row flex-wrap w-full">
      
        {/* <OnboardingModal04
            showModal03={showModal03}
            setShowModal03={setShowModal03}

            showModal04={showModal04}
            setShowModal04={setShowModal04}
        /> */}
          

          {/*  */}

          <IonModal
            isOpen={showModal02}
            swipeToClose={true}
            onDidDismiss={() => {
              setShowModal01(true), 
              setShowModal02(false)}
            }
            >

            <IonHeader>
              <IonToolbar>

                <IonButton 
                  className='mr-4'
                  onClick={() => {
                    setShowModal01(true)
                    setShowModal02(false)
                  }} slot="end"
                >
                  Back
                </IonButton>

                {/* <IonButton 
                  className='mr-4'
                  onClick={() => {
                    setShowModal04(true)
                    setShowModal03(false)
                  }} slot="end"
                >
                  Next
                </IonButton> */}
                 <IonTitle>Onboarding 2</IonTitle>
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

export default EditScoreModalTeam02;


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
