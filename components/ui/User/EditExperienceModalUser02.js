import { IonButton, IonCardContent, IonContent, IonHeader, IonItem, IonList, IonLoading, IonModal, IonTitle, IonToast, IonToolbar } from '@ionic/react';

import { useState, useEffect } from 'react';
import { ExclamationIcon } from '@heroicons/react/outline';

/* Images */
import ProfilePlaceholder from '../../assets/images/profile_placeholder.png';
import Gravatar from 'react-gravatar';
import Axios from 'axios';

/* Search */
import Select from 'react-select';

/* Redux */
import { useDispatch, useSelector } from 'react-redux';
import { addTypeExperience, removeTypeExperience } from '../../redux/actions/coreActions';
import { fetchExperiences } from '../../redux/actions/experienceAction';

/* Contexts */
import { useCurrentUser } from '../../context/AuthContext';

const EditExperienceModalUser02 = ({ selectedExperince, showEditExperiencesModal01,  setShowEditExperiencesModal01, showEditExperiencesModal02,  setShowEditExperiencesModal02, showModal03,  setShowModal03, showToast1, setShowToast1}) => {


  const signedInUser = useCurrentUser();

  const dispatch = useDispatch();

  const loggedInUser = useSelector(state => state.user);
  const typeExperiences = useSelector((state) => state.allData.typeExperiences);

  const [typeUserId, setTypeUserId] = useState({});

  const [error, setError] = useState('');

  const [showToastAddType, setShowToastAddType] = useState(false);
  const [showToastRemoveType, setShowToastRemoveType] = useState(false);



  /* Add type to experience type list */
  const handleAddTypeExperience = async (event) => {
  //event.preventDefault()
  dispatch(addTypeExperience(selectedExperince.id, selectedExperince, typeExperiences, typeUserId));
  dispatch(fetchExperiences());
  dispatch(fetchExperiences());
  setShowToastAddType(true)
  }

  /* Remove type to experience type list */
  const handleRemoveTypeExperience = async (event, removeId) => {
  //event.preventDefault()
  dispatch(removeTypeExperience(selectedExperince.id, selectedExperince, removeId));
  dispatch(fetchExperiences());
  dispatch(fetchExperiences());
  setShowToastRemoveType(true)
  }


  return (

    <div>
      {selectedExperince && (
    <div className="flex flex-row flex-wrap w-full">
          

          {/*  */}

          <IonModal
            isOpen={showEditExperiencesModal02}
            swipeToClose={true}
            onDidDismiss={() => {
              setShowEditExperiencesModal01(true), 
              setShowEditExperiencesModal02(false)}
            }
            >

            <IonHeader>
              <IonToolbar>

                <IonButton 
                  className='mr-4'
                  onClick={() => {
                    setShowEditExperiencesModal01(true)
                    setShowEditExperiencesModal02(false)
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
                  <h4>{selectedExperince.name}</h4>
                  <div className="grid grid-row-2 bg-white">
                    <Select
                    className=""
                    getOptionLabel={option => `${option.name}`}
                    getOptionValue={option => option.id}
                    options={typeExperiences}
                    instanceId="types"
                    placeholder="Filter by types"
                    isClearable
                    onChange={value => setTypeUserId(value ? value.id : null)}
                    />
                    <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm py-2 bg-primary text-base font-medium text-dark hover:bg-dark hover:text-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto sm:text-sm mt-2"
                    onClick={() => {
                      handleAddTypeExperience();
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

                  handleRemoveTypeExperience={handleRemoveTypeExperience}

                  type_experiences={selectedExperince.type_experiences}
                  
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
              message={`Type has been added to experience`}
              duration={1000}
            />
          </div>

          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <IonToast
              isOpen={showToastRemoveType}
              onDidDismiss={() => setShowToastRemoveType(false)}
              message={`Type has been removed from experience`}
              duration={1000}
            />
          </div>


    </div>
    )}
    </div>
  );
};

export default EditExperienceModalUser02;


const ModalContent = ({ onClose, type_experiences, handleRemoveTypeExperience }) => {
  return (
    <>
      
      <IonContent>


      <div className="px-4 py-5 w-full">
        {type_experiences?.map(type => (
            <div className="bg-light p-2 mb-2 flex justify-between">
              <p>{type.name}</p>
              <button
                  className="bg-primary border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-dark hover:bg-dark hover:text-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
                  
                  onClick={(event) => {
                    handleRemoveTypeExperience(event, type.id);
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
