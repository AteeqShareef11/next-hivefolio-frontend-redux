import { IonButton, IonContent, IonHeader, IonModal, IonTitle, IonToast, IonToolbar } from '@ionic/react';

import { useState } from 'react';
import { useParams } from 'react-router-dom';

/* Redux */
import { useDispatch, useSelector } from 'react-redux';
import { deleteAchievement, fetchUser } from '../../redux/actions/coreActions';
import { fetchAchievements } from '../../redux/actions/achievementAction';

const EditAchievementModalOrganisationDelete = ({ selectedAchievement, showDeleteAchievementModal, setShowEditAchievementModal01, setShowDeleteAchievementModal}) => {

  const dispatch = useDispatch();

  const { username } = useParams();

  const [deleteAchievementState, setDeleteAchievementState] = useState();
  const [error, setError] = useState('');

  const [showToastDelete, setShowToastDelete] = useState(false);


  const handleDeleteAchievement = async (event) => {
    //event.preventDefault()
    dispatch(deleteAchievement( selectedAchievement.id, setShowDeleteAchievementModal, setShowEditAchievementModal01, fetchAchievements, fetchUser, username ));
    setShowToastDelete(true);
    dispatch(fetchAchievements());
    dispatch(fetchAchievements());
  }


  return (
    <div className="flex flex-row flex-wrap w-full">

          {/*  */}

          <IonModal
            isOpen={showDeleteAchievementModal}
            swipeToClose={true}
            onDidDismiss={() => {
              //setShowModal01(true), 
              setShowDeleteAchievementModal(false)}
            }
            >

            <IonHeader>
              <IonToolbar>

                <IonButton 
                  className='mr-4'
                  onClick={() => {
                    //setShowModal01(true)
                    setShowDeleteAchievementModal(false)
                  }} slot="end"
                >
                  Back
                </IonButton>
                 <IonTitle>Delete achievement</IonTitle>
              </IonToolbar>
            </IonHeader>

            <div className="flex flex-col sm:items-start h-full">

              <div className="sm:flex sm:items-start m-4">

                <div className="text-center sm:ml-4 sm:text-left mb-4">
                  <p>This will delete your selected achievement</p>

                </div>
              </div>

              

            


              <ModalContent
                className="shrink h-full "

                  handleDeleteAchievement={handleDeleteAchievement}
                  deleteAchievementState={deleteAchievementState}
                  setDeleteAchievementState={setDeleteAchievementState}
                  
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

export default EditAchievementModalOrganisationDelete;


const ModalContent = ({ handleDeleteAchievement }) => {
  return (
    <>
      
      <IonContent>

      <div className="px-4 py-5 w-full">
                
      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left mb-4 w-full">

        <div
          class="rounded-3xl mr-4 py-4 px-4 bg-dark text-white hover:bg-primary hover:text-dark"
          onClick={() => {
            handleDeleteAchievement();
          }}
        >
          Delete achievement
        </div>
        
      </div>
      
      
      </div>
        
      </IonContent>
    </>
  );
};
