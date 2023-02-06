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
import OnboardingModal03 from './OnboardingModal03';

const OnboardingModal02 = ({ showModal01,  setShowModal01, showModal02,  setShowModal02, showToast1, setShowToast1}) => {

  const dispatch = useDispatch();

  const user = useCurrentUser();
  const { id } = user;

  //const id = loggedInUser.id

  const [showModal03, setShowModal03] = useState(false);

  const loggedInUser = useSelector(state => state.user);
  const users = useSelector((state) => state.allUsers.users);
  const typeusers = useSelector((state) => state.allTypeusers.typeusers);

  //const [users, setUsers] = useState({});
  //const [typeusers, setTypeusers] = useState({});
  const [typeUserId, setTypeUserId] = useState({});

  const [error, setError] = useState('');

  console.log("loggedInUser", loggedInUser)
  //console.log("user", user)
  console.log("users", users);
  console.log("typeusers1", typeusers);
  //console.log("type_user", type_user)
  //console.log("typeusers", typeusers)

  /* const type_user = loggedInUser.type_user.filter((type) => {
    return type.id === typeusers.id;
  }) */

  /* let loggedInUser = users?.find((person) => {
    return person.id === user.id;
  }) */

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

  }, [user]);

  return (
    <div className="flex flex-row flex-wrap w-full">
        <OnboardingModal03
            showModal02={showModal02}
            setShowModal02={setShowModal02}

            showModal03={showModal03}
            setShowModal03={setShowModal03}
        />

          

          {/*  */}

          <IonModal
            isOpen={showModal02}
            swipeToClose={true}
            //onDidDismiss={() => setShowModal(false)}
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
                  Previous
                </IonButton>

                <IonButton 
                  className='mr-4'
                  onClick={() => {
                    setShowModal03(true)
                    setShowModal02(false)
                  }} slot="end"
                >
                  Next
                </IonButton>
                 <IonTitle>Onboarding 2</IonTitle>
              </IonToolbar>
            </IonHeader>

            <div className="flex flex-col sm:items-start h-full">

              <div className="flex-col sm:flex sm:items-start m-4 w-full border-b-2 border-solid">

                <div className="text-center sm:ml-4 sm:text-left">
                    <h4>Your types</h4>
                </div>


                {/* Content */}

                <div className="w-full pb-4 mr-8">

                  <div className="grid grid-cols-2 bg-white">
                      <Select
                      className=""
                      getOptionLabel={option => `${option.name}`}
                      getOptionValue={option => option.id}
                      options={typeusers}
                      instanceId="types"
                      placeholder="filter by types"
                      isClearable
                      onChange={value => setTypeUserId(value ? value.id : null)}
                      />
                      <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-dark hover:bg-dark hover:text-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm pr-4"
                      onClick={() => {
                          handleAddTypeUser();
                          /* setShowToast1(true); */
                      }}
                      >
                      {error && <p>{error}</p>}
                      Add type
                      </button>
                  </div>
                    
                    
                

                </div>

                
              </div>

              <ModalContent
                className="shrink h-full "
                  /* onClose={(value) => {
                    setShowModal({ isOpen: false });
                    value ? setRetVal(value) : setRetVal("User Cancelled");
                  }} */

                  loggedInUser={loggedInUser}
                  handleRemoveTypeUser={handleRemoveTypeUser}
                  
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

export default OnboardingModal02;


const ModalContent = ({ loggedInUser, handleRemoveTypeUser }) => {
  return (
    <>
      
      <IonContent>


          {/* Content here */}


          <div className="px-4 py-5 w-full">
            {loggedInUser.type_user?.map(type => (
                <div className="grid grid-cols-2 bg-white p-2 mb-2">
                <p>{type.name}</p>
                <button
                    className="bg-primary border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-dark hover:bg-dark hover:text-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
                    
                    onClick={(event) => {
                    handleRemoveTypeUser(event, type.id);
                    console.log("selected type id", type.id)
                    
                    }}
                >
                    Remove
                </button>
                </div>  
            ))}    
          </div>
        

          {/*  */}

        
      </IonContent>
    </>
  );
};
