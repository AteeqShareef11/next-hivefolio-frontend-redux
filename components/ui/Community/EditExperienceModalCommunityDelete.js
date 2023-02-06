import { IonButton, IonCardContent, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonLoading, IonModal, IonTitle, IonToast, IonToolbar } from '@ionic/react';

import { useState } from 'react';
import { ExclamationIcon } from '@heroicons/react/outline';
import { useParams } from 'react-router-dom';


/* Redux */
import { useDispatch } from 'react-redux';
import { deleteExperience, fetchUser } from '../../redux/actions/coreActions';
import { fetchExperiences } from '../../redux/actions/experienceAction';

/* Contexts */
import { useCurrentUser } from '../../context/AuthContext';


const EditExperienceModalCommunityDelete = ({ selectedExperince, showDeleteExperiencesModal, setShowEditExperiencesModal01, setShowDeleteExperiencesModal}) => {

  const dispatch = useDispatch();

  const { username } = useParams();

  const [deleteExperienceState, setDeleteExperienceState] = useState();
  const [error, setError] = useState('');

  const [showToastDelete, setShowToastDelete] = useState(false);


  const handleDeleteExperience = async (event) => {
    //event.preventDefault()
    dispatch(deleteExperience( selectedExperince.id, setShowDeleteExperiencesModal, setShowEditExperiencesModal01, fetchExperiences, fetchUser, username ));
    setShowToastDelete(true);
    dispatch(fetchExperiences());
    dispatch(fetchExperiences());
  }


  return (
    <div className="flex flex-row flex-wrap w-full">

          {/*  */}

          <IonModal
            isOpen={showDeleteExperiencesModal}
            swipeToClose={true}
            onDidDismiss={() => {
              setShowDeleteExperiencesModal(false)}
            }
            >

            <IonHeader>
              <IonToolbar>

                <IonButton 
                  className='mr-4'
                  onClick={() => {
                    //setShowModal01(true)
                    setShowDeleteExperiencesModal(false)
                  }} slot="end"
                >
                  Back
                </IonButton>
                 <IonTitle>Delete experience</IonTitle>
              </IonToolbar>
            </IonHeader>

            <div className="flex flex-col sm:items-start h-full">

              <div className="sm:flex sm:items-start m-4">

                <div className="text-center sm:ml-4 sm:text-left mb-4">
                  <p>This will delete your selected experience</p>

                </div>
              </div>


              <ModalContent
                className="shrink h-full "

                  handleDeleteExperience={handleDeleteExperience}
                  deleteExperienceState={deleteExperienceState}
                  setDeleteExperienceState={setDeleteExperienceState}
                  
                />

            </div>

          </IonModal>

          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <IonToast
              isOpen={showToastDelete}
              onDidDismiss={() => setShowToastDelete(false)}
              message={`Experience has been deleted`}
              duration={1000}
            />
          </div>


    </div>
  );
};

export default EditExperienceModalCommunityDelete;


const ModalContent = ({ handleDeleteExperience }) => {
  return (
    <>
      
      <IonContent>

      <div className="px-4 py-5 w-full">
                
      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left mb-4 w-full">

        <div
          class="rounded-3xl mr-4 py-4 px-4 bg-dark text-white hover:bg-primary hover:text-dark"
          onClick={() => {
            handleDeleteExperience();
          }}
        >
          Delete experience
        </div>
        
      </div>
      
      
      </div>
        
      </IonContent>
    </>
  );
};
