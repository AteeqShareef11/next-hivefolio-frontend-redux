import { IonButton, IonCardContent, IonContent, IonHeader, IonItem, IonList, IonLoading, IonModal, IonTitle, IonToast, IonToolbar } from '@ionic/react';

import { useState } from 'react';
import { ExclamationIcon } from '@heroicons/react/outline';

/* Images */
import ProfilePlaceholder from '../../assets/images/profile_placeholder.png';
import Gravatar from 'react-gravatar';
import Axios from 'axios';

/* Components */
import EditAchievementModalCommunity01 from './EditAchievementModalCommunity01';

/* Redux */
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../redux/actions/userActions';
import { fetchTeamId, teamAddMember } from '../../redux/actions/teamActions';
import { createNotificationTeamMemberRequest } from '../../redux/actions/notificationActions';

/* Contexts */
import { useCurrentUser } from '../../context/AuthContext';

const CreateAchievementModalCommunity = ({ showToast1, setShowToast1 }) => {

  //const { id } = useParams();

  const dispatch = useDispatch();
  useSelector((state) => state.allUsers.users);  
  const team = useSelector((state) => state.team);
  //const job = useSelector((state) => state.job);

  const loggedInUser = useCurrentUser();
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [showModal01, setShowModal01] = useState(false);


  const [error, setError] = useState('');
  //const [showToast1, setShowToast1] = useState(false);
  //const [showLoading, setShowLoading] = useState(true);


  /* Request add user to members list */
  /* const handleTeamMemberRequest = async (event) => {
    //event.preventDefault()
    dispatch(createNotificationTeamMemberRequest( userId, id ))
  } */

  /* New Add user to members list */
  /* const handleAddUser = async (event) => {
    //event.preventDefault()
    dispatch(teamAddMember(id, userId, users, teamDataMember, team ))
  } */

  return (
    <div className="flex flex-row flex-wrap w-full">
      
        <div className="clear-both">
          <EditAchievementModalCommunity01
            showModalCreate={showModalCreate}
            setShowModalCreate={setShowModalCreate}
          />
            
          </div>
          

          {/*  */}

          <IonModal
            isOpen={showModalCreate}
            swipeToClose={true}
            onDidDismiss={() => setShowModalCreate(false)}
            >

            <IonHeader>
              <IonToolbar>

                {/* <IonButton 
                  className='mr-4'
                  onClick={() => onClose(null)} slot="end"
                >
                  Previous
                </IonButton> */}

                {/* <IonButton 
                  className='mr-4'
                  onClick={() => {
                    setShowModal02(true)
                    setShowModal01(false)
                  }} slot="end"
                >
                  Next
                </IonButton> */}
                 <IonTitle>Create Experience</IonTitle>
              </IonToolbar>
            </IonHeader>

            <div className="flex flex-col sm:items-start h-full">

              <div className="sm:flex sm:items-start m-4">
                {/* <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10 sm:mb-4">
                  <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                </div> */}

                <div className="text-center sm:ml-4 sm:text-left mb-4">
                  <h4>Hello</h4>
                  <p>Let us help you setup your profile.</p>

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
              
            <div className='p-4 z-10 bg-white'>
              <IonButton className='w-full' onClick={() => {setShowModalCreate(false)}}>Close Modal</IonButton>
            </div>
          </IonModal>


    </div>
  );
};

export default CreateAchievementModalCommunity;


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
