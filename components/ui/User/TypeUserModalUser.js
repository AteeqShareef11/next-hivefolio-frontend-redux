import { IonButton, IonCardContent, IonContent, IonHeader, IonItem, IonList, IonLoading, IonModal, IonTitle, IonToast, IonToolbar } from '@ionic/react';

/* Search */
import Select from 'react-select';

/* Redux */
import { useDispatch, useSelector } from 'react-redux';


/* Contexts */
import { useCurrentUser } from '../../context/AuthContext';
import { fetchUserId, editUser, addGame, removeGame, addCharacter, removeCharacter, addTypeuser, removeTypeuser} from '../../redux/actions/coreActions';

const TypeUserModalUser = ({ showTypeUserModalUser, setShowTypeUserModalUser, setTypeUserId, typeUserId, error, showToast1, setShowToast1}) => {
  const signedInUser = useCurrentUser();
  const { id } = signedInUser;

  const dispatch = useDispatch();
  

  const loggedInUser = useSelector(state => state.user);
  const typeusers = useSelector((state) => state.allData.typeUsers);

  /* Add type to user type list */
  const handleAddTypeUser = async (event) => {
    //event.preventDefault()
    dispatch(addTypeuser(id, loggedInUser, typeusers, typeUserId))
  }

  /* Remove type to user type list */
  const handleRemoveTypeUser = async (event, removeId) => {
    event.preventDefault()
    dispatch(removeTypeuser(id, loggedInUser, removeId))
  }
  

  return (
    
    <div>        
      
    <div className="flex flex-row flex-wrap w-full">
   
          

          {/*  */}

          <IonModal
            isOpen={showTypeUserModalUser}
            swipeToClose={true}
            onDidDismiss={() => setShowTypeUserModalUser(false)}
            >

            <IonHeader>
              <IonToolbar>

                {/* {selectedProfileUser.id === signedInUser.id && (
                  <IonButton 
                    className='mr-4'
                    onClick={() => {
                      setShowTypeUserModalUser(false)
                      setShowTypeUserModalUser01(true)
                    }} slot="end"
                  >
                    Edit
                  </IonButton>
                )} */}
                

                 <IonTitle>Type User</IonTitle>
              </IonToolbar>
            </IonHeader>

            <div className="flex flex-col sm:items-start h-full">

              
              <div className="flex-col sm:flex sm:items-start m-2 border-b-2 border-solid w-auto">

              <div className="px-4 py-5 w-full">

                <div className="grid xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-1 bg-white p-2 md:grid-cols-2">
                  <Select
                  className="lg:mb-2 xl:mb-2"
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
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-dark hover:bg-dark hover:text-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
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
                  onClose={(value) => {
                    setShowTypeUserModalUser({ isOpen: false });
                    value ? setRetVal(value) : setRetVal("User Cancelled");
                  }}

                  loggedInUser={loggedInUser} 
                  handleRemoveTypeUser={handleRemoveTypeUser}
                  
                />

            </div>


            

            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              {/* <IonToast
                isOpen={showToast1}
                onDidDismiss={() => setShowToast1(false)}
                message={`Data saved`}
                duration={1000}
              /> */}
            </div>
              
            <div className='p-4 z-10 bg-white'>
              <IonButton 
                className='w-full' 
                onClick={() => {setShowTypeUserModalUser(false)}}
              >
                Close Modal
              </IonButton>
            </div>
          </IonModal>


    </div>

    </div>
  );
};

export default TypeUserModalUser;


const ModalContent = ({ loggedInUser, handleRemoveTypeUser }) => {
  return (
    <>
      
      <IonContent>

        <div className="px-4 py-5 w-full">

          <div className="px-4 py-5 w-full">
              {loggedInUser.type_user?.map(type => (
                <div className="grid grid-cols-2 bg-white p-2 mb-2">
                  <p>{type.name}</p>
                  <button
                    className="bg-primary border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-dark hover:bg-dark hover:text-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
                    
                    onClick={(event) => {
                      handleRemoveTypeUser(event, type.id);                                   
                    }}
                  >
                    Remove
                  </button>
                </div>  
              ))}    
            </div>

        </div>
      </IonContent>
    </>
  );
};
