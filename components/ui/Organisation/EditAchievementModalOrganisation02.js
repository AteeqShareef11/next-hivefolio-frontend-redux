import { IonButton, IonContent, IonHeader, IonModal, IonTitle, IonToast, IonToolbar } from '@ionic/react';

import { useState, useEffect } from 'react';

/* Search */
import Select from 'react-select';

/* Redux */
import { useDispatch, useSelector } from 'react-redux';
import { addTypeAchievement, removeTypeAchievement } from '../../redux/actions/coreActions';
import { fetchAchievements } from '../../redux/actions/achievementAction';

/* Contexts */
import { useCurrentUser } from '../../context/AuthContext';

const EditAchievementModalOrganisation03 = ({ selectedAchievement, setShowEditAchievementModal01, showEditAchievementModal02,  setShowEditAchievementModal02}) => {


  const signedInUser = useCurrentUser();

  const dispatch = useDispatch();

  const loggedInUser = useSelector(state => state.user);
  const typeAchievements = useSelector((state) => state.allData.typeAchievements);

  const [typeUserId, setTypeUserId] = useState({});

  const [error, setError] = useState('');

  const [showToastAddType, setShowToastAddType] = useState(false);
  const [showToastRemoveType, setShowToastRemoveType] = useState(false);



  /* Add type to achievement type list */
  const handleAddTypeAchievement = async (event) => {
  //event.preventDefault()
  dispatch(addTypeAchievement(selectedAchievement.id, selectedAchievement, typeAchievements, typeUserId));
  dispatch(fetchAchievements());
  dispatch(fetchAchievements());
  setShowToastAddType(true)
  }

  /* Remove type to achievement type list */
  const handleRemoveTypeAchievement = async (event, removeId) => {
  //event.preventDefault()
  dispatch(removeTypeAchievement(selectedAchievement.id, selectedAchievement, removeId));
  dispatch(fetchAchievements());
  dispatch(fetchAchievements());
  setShowToastRemoveType(true)
  }


  return (

    <div>
      {selectedAchievement && (
    <div className="flex flex-row flex-wrap w-full">
          

          {/*  */}

          <IonModal
            isOpen={showEditAchievementModal02}
            swipeToClose={true}
            onDidDismiss={() => {
              setShowEditAchievementModal01(true), 
              setShowEditAchievementModal02(false)}
            }
            >

            <IonHeader>
              <IonToolbar>

                <IonButton 
                  className='mr-4'
                  onClick={() => {
                    setShowEditAchievementModal01(true)
                    setShowEditAchievementModal02(false)
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
                  <h4>{selectedAchievement.name}</h4>
                  <div className="grid grid-row-2 bg-white">
                    <Select
                    className=""
                    getOptionLabel={option => `${option.name}`}
                    getOptionValue={option => option.id}
                    options={typeAchievements}
                    instanceId="types"
                    placeholder="Filter by types"
                    isClearable
                    onChange={value => setTypeUserId(value ? value.id : null)}
                    />
                    <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm py-2 bg-primary text-base font-medium text-dark hover:bg-dark hover:text-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto sm:text-sm mt-2"
                    onClick={() => {
                      handleAddTypeAchievement();
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

                  handleRemoveTypeAchievement={handleRemoveTypeAchievement}

                  type_achievements={selectedAchievement.type_achievements}
                  
                />

            </div>

              
            {/* <div className='p-4 z-10 bg-white'>
              <IonButton className='w-full' onClick={() => {setShowModal(false)}}>Close Modal</IonButton>
            </div> */}
          </IonModal>

          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <IonToast
              isOpen={showToastAddType}
              onDidDismiss={() => setShowToastAddType(false)}
              message={`Type has been added to achievement`}
              duration={1000}
            />
          </div>

          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <IonToast
              isOpen={showToastRemoveType}
              onDidDismiss={() => setShowToastRemoveType(false)}
              message={`Type has been removed from achievement`}
              duration={1000}
            />
          </div>


    </div>
    )}
    </div>
  );
};

export default EditAchievementModalOrganisation03;


const ModalContent = ({ onClose, type_achievements, handleRemoveTypeAchievement }) => {
  return (
    <>
      
      <IonContent>


      <div className="px-4 py-5 w-full">
        {type_achievements?.map(type => (
            <div className="bg-light p-2 mb-2">
            <p>{type.name}</p>
            <button
                className="bg-primary border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-dark hover:bg-dark hover:text-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
                
                onClick={(event) => {
                  handleRemoveTypeAchievement(event, type.id);
                console.log("selected type id", type.id)
                
                }}
            >
                Remove
            </button>
            </div>  
        ))}    
      </div>

        
      </IonContent>
    </>
  );
};
