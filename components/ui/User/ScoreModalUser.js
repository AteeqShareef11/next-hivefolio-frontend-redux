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
import { fetchUserId, addTypeuser, removeTypeuser} from '../../redux/actions/userActions';
import { fetchTypeusers } from '../../redux/actions/typeActions';

/* Contexts */
import { useCurrentUser } from '../../context/AuthContext';

/* Components */
import EditScoreModalUser01 from './EditScoreModalUser01';

const ScoreModalUser = ({ showModal,  setShowModal, showModal02,  setShowModal02, showToast1, setShowToast1}) => {

  const dispatch = useDispatch();

  const user = useCurrentUser();
  const { id } = user;

  const [showModal01, setShowModal01] = useState(false);
  const [showModal03, setShowModal03] = useState(false);

  const loggedInUser = useSelector(state => state.user);

  useEffect(() => {
    dispatch(fetchUserId(id));
    if(loggedInUser.id === undefined) {
      dispatch(fetchUserId(id));
    };
    dispatch(fetchTypeusers());

  }, []);

  return (
    <div className="flex flex-row flex-wrap w-full">
      <EditScoreModalUser01
        showModal01={showModal01}
        setShowModal01={setShowModal01}
      />

          

          {/*  */}

          <IonModal
            isOpen={showModal}
            swipeToClose={true}
            onDidDismiss={() => setShowModal(false)}
            >

            <IonHeader>
              <IonToolbar>

                {/* <IonButton 
                  className='mr-4'
                  onClick={() => {
                    setShowModal01(true)
                    setShowModal02(false)
                  }} slot="end"
                >
                  Previous
                </IonButton> */}

                {/* <IonButton 
                  className='mr-4'
                  onClick={() => {
                    setShowModal03(true)
                    setShowModal02(false)
                  }} slot="end"
                >
                  Next
                </IonButton> */}
                 <IonTitle>Experience</IonTitle>
              </IonToolbar>
            </IonHeader>

            <div className="flex flex-col sm:items-start h-full">

              <div className="flex-col sm:flex sm:items-start m-4 w-full border-b-2 border-solid">

                <div className="text-center sm:ml-4 sm:text-left">
                    <h4>Public experience view</h4>
                </div>


                {/* Content */}

                <div className="w-full pb-4 mr-8">
   

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
              <IonButton className='w-full' onClick={() => {setShowModal(false)}}>Close Modal</IonButton>
            </div>
          </IonModal>


    </div>
  );
};

export default ScoreModalUser;


const ModalContent = ({ loggedInUser, handleRemoveTypeUser }) => {
  return (
    <>
      
      <IonContent>


          {/* Content here */}
        

          {/*  */}

        
      </IonContent>
    </>
  );
};
