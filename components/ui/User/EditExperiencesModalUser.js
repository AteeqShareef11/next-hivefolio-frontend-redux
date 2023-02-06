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
import EditExperienceModalUser02 from './EditExperienceModalUser02';
import EditExperienceModalUser03 from './EditExperienceModalUser03';

import CardGrid from '../CardGrid/CardGrid';
import CardExperienceUser from './CardExperienceUser';

const EditExperiencesModalUser = ({ id, showEditExperiencesModal, setShowEditExperiencesModal, showToast1, setShowToast1}) => {

  const dispatch = useDispatch();

  const signedInUser = useCurrentUser();

  const [showModal01, setShowModal01] = useState(false);

  const selectedProfileUser = useSelector(state => state.user);

  const { experiences } = selectedProfileUser

  const [error, setError] = useState('');


  useEffect(() => {


  }, []);

  return (
    <div className="flex flex-row flex-wrap w-full">

          {/*  */}

          <IonModal
            isOpen={showEditExperiencesModal}
            swipeToClose={true}
            onDidDismiss={() => setShowEditExperiencesModal(false)}
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

                <IonButton 
                  className='mr-4'
                  onClick={() => {
                    setShowEditExperiencesModal(false)
                  }} slot="end"
                >
                  Close
                </IonButton>
                 <IonTitle>Experiences</IonTitle>
              </IonToolbar>
            </IonHeader>

            <div className="flex flex-col sm:items-start h-full">

              <div className="flex-col sm:flex sm:items-start m-4 w-full border-b-2 border-solid">

                {/* <div className="text-center sm:ml-4 sm:text-left">
                    <h4>Edit Hub</h4>
                </div> */}


                {/* Content */}

                <div className="w-full pb-4 mr-8">

                  <p>Select an experience to edit</p>

                  {/* <div
                    class="rounded-3xl mr-4 py-4 px-4 bg-dark text-white hover:bg-primary hover:text-dark"
                    onClick={() => {
                    setShowModal02(true);
                    }}
                  >
                    Modal 2
                  </div> */}

                  {/* <div
                    class="rounded-3xl mr-4 py-4 px-4 bg-dark text-white hover:bg-primary hover:text-dark"
                    onClick={() => {
                    setShowModal03(true);
                    }}
                  >
                    Modal 3
                  </div> */}

                </div>

                
              </div>

              <ModalContent
                className="shrink h-full "
                  onClose={(value) => {
                    setShowEditExperiencesModal({ isOpen: false });
                    value ? setRetVal(value) : setRetVal("User Cancelled");
                  }}

                  signedInUser={signedInUser}
                  experiences={experiences}

                  showModal01={showModal01}
                  setShowModal01={setShowModal01}                  
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
              <IonButton className='w-full' onClick={() => {setShowModal01(false)}}>Save and close</IonButton>
            </div> */}
          </IonModal>


    </div>
  );
};

export default EditExperiencesModalUser;


const ModalContent = ({ signedInUser, experiences, showModal01, setShowModal01, loggedInUser, handleRemoveTypeUser }) => {
  return (
    <>
      
      <IonContent>


          {/* Content here */}


          <div className="px-4 py-5 w-full">

          <CardGrid
            style1={
              'grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4'
            }
            className="mt-8"
          >
            {experiences.map(experience => (
              <CardExperienceUser
                signedInUser={signedInUser}
                experience={experience}
                experienceId={experience.id}
                username={experience.username}
                image_profile={experience.image_profile}
                name={experience.name}
                responsive={true}
                cardLink02={true}

                showModal01={showModal01}
                setShowModal01={setShowModal01}
              />
            ))}
          </CardGrid>


                
          </div>
        

          {/*  */}

        
      </IonContent>
    </>
  );
};
