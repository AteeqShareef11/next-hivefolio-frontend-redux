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
import {} from '../../redux/actions/teamActions';
import { fetchTypeusers } from '../../redux/actions/typeActions';

/* Contexts */
import { useCurrentUser } from '../../context/AuthContext';

/* Components */
import EditScoreModalOrganisation02 from './EditScoreModalOrganisation02';
import EditScoreModalOrganisation03 from './EditScoreModalOrganisation03';

const EditScoreModalOrganisation01 = ({ showModal01, setShowModal01, showToast1, setShowToast1}) => {

  const dispatch = useDispatch();

  const user = useCurrentUser();
  const { id } = user;

  //const id = loggedInUser.id

  const [showModal02, setShowModal02] = useState(false);
  const [showModal03, setShowModal03] = useState(false);

  const loggedInUser = useSelector(state => state.user);
  const users = useSelector((state) => state.allUsers.users);
  const typeusers = useSelector((state) => state.allTypeusers.typeusers);

  const [typeUserId, setTypeUserId] = useState({});

  const [error, setError] = useState('');

  /* Add type to user type list */
  const handleAddTypeUser = async (event) => {
    //event.preventDefault()
    dispatch(addTypeuser(id, loggedInUser, typeusers, typeUserId))
  }

  /* Remove type to user type list */
  const handleRemoveTypeUser = async (event, removeId) => {
    //event.preventDefault()
    dispatch(removeTypeuser(id, loggedInUser, removeId))
  }

  useEffect(() => {
    dispatch(fetchUserId(id));
    if(loggedInUser.id === undefined) {
      dispatch(fetchUserId(id));
    };
    dispatch(fetchTypeusers());

  }, []);

  return (
    <div className="flex flex-row flex-wrap w-full">
      <EditScoreModalOrganisation02
        showModal01={showModal01}
        setShowModal01={setShowModal01}

        showModal02={showModal02}
        setShowModal02={setShowModal02}
      />

      <EditScoreModalOrganisation03
        showModal01={showModal01}
        setShowModal01={setShowModal01}

        showModal03={showModal03}
        setShowModal03={setShowModal03}
      />
          

          {/*  */}

          <IonModal
            isOpen={showModal01}
            swipeToClose={true}
            onDidDismiss={() => setShowModal01(false)}
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
                 <IonTitle>Edit experience</IonTitle>
              </IonToolbar>
            </IonHeader>

            <div className="flex flex-col sm:items-start h-full">

              <div className="flex-col sm:flex sm:items-start m-4 w-full border-b-2 border-solid">

                <div className="text-center sm:ml-4 sm:text-left">
                    <h4>Edit Hub</h4>
                </div>


                {/* Content */}

                <div className="w-full pb-4 mr-8">

                  <p>Title, Description, types, date, games</p>

                  <div
                    class="rounded-3xl mr-4 py-4 px-4 bg-dark text-white hover:bg-primary hover:text-dark"
                    onClick={() => {
                    setShowModal02(true);
                    }}
                  >
                    Modal 2
                  </div>

                  <div
                    class="rounded-3xl mr-4 py-4 px-4 bg-dark text-white hover:bg-primary hover:text-dark"
                    onClick={() => {
                    setShowModal03(true);
                    }}
                  >
                    Modal 3
                  </div>

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
              <IonButton className='w-full' onClick={() => {setShowModal01(false)}}>Save and close</IonButton>
            </div>
          </IonModal>


    </div>
  );
};

export default EditScoreModalOrganisation01;


const ModalContent = ({ loggedInUser, handleRemoveTypeUser }) => {
  return (
    <>
      
      <IonContent>


          {/* Content here */}


          <div className="px-4 py-5 w-full">
                
          </div>
        

          {/*  */}

        
      </IonContent>
    </>
  );
};
