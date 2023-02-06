import { IonButton, IonCardContent, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonLoading, IonModal, IonTextarea, IonTitle, IonToast, IonToolbar } from '@ionic/react';

import { useState } from 'react';
import { useParams } from 'react-router-dom';

/* Components */
import EditExperienceModalUser01 from './EditExperienceModalUser01';

/* Redux */
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoreData } from '../../redux/actions/coreActions';
import { fetchUsers } from '../../redux/actions/userActions';
import { fetchExperiences, createExperienceUser } from '../../redux/actions/experienceAction';

/* Contexts */
import { useCurrentUser } from '../../context/AuthContext';

const CreateExperienceModalUser = ({ showCreateExperienceModal, setShowCreateExperienceModal, selectedExperince}) => {

  const { username } = useParams();

  const dispatch = useDispatch();
  const users = useSelector((state) => state.allData.users);
  const team = useSelector((state) => state.team);
  const signedInUser  = useCurrentUser();

  //const [showCreateExperienceModal, setShowCreateExperienceModal] = useState(false);
  const [showEditExperiencesModal01, setShowEditExperiencesModal01] = useState(false);
  const [showToastCreate, setShowToastCreate] = useState(false);

  const [name, setName] = useState(''); 
  const [description, setDescription] = useState(''); 
  const [file, setFile] = useState(null);
  const [errorName, setErrorName] = useState('');
  const [errorDescription, setErrorDescription] = useState('');
  const [errorImageProfile, setErrorImageProfile] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    //event.preventDefault()

    if(!name) {
        setErrorTitle('Please add a name')
        return
    }

    if(!description) {
      setErrorDescription('Please add a description')
      return
    }

    /* if(!file) {
        setErrorImageProfile('Please add a file')
        return
    } */

    /* relatedUsers.push(signedInUser.id);
  
    let newMember = {
      related_users: relatedUsers,
    }; */
    

    const formData = new FormData();
    formData.append('data', JSON.stringify({name: name, description: description, related_users: [signedInUser] }));
    //formData.append('files.image_profile', file)

    dispatch(createExperienceUser(formData, setShowEditExperiencesModal01, setShowCreateExperienceModal, setShowToastCreate, fetchExperiences, fetchUsers))
    dispatch(fetchExperiences());
    dispatch(fetchExperiences());
    dispatch(fetchUsers());
    dispatch(fetchUsers());
    dispatch(fetchCoreData());
    dispatch(fetchCoreData());

  }

  return (
    <div className="flex flex-row flex-wrap w-full">
      
        <div className="clear-both">
          <EditExperienceModalUser01
            selectedExperince={selectedExperince}
            showEditExperiencesModal01={showEditExperiencesModal01}
            setShowEditExperiencesModal01={setShowEditExperiencesModal01}
          />
            
          </div>
          

          {/*  */}

          <IonModal
            isOpen={showCreateExperienceModal}
            swipeToClose={true}
            onDidDismiss={() => setShowCreateExperienceModal(false)}
            >

            <IonHeader>
              <IonToolbar>

                {/* <IonButton 
                  className='mr-4'
                  onClick={() => onClose(null)} slot="end"
                >
                  Previous
                </IonButton> */}

                <IonButton 
                  className='mr-4'
                  onClick={() => {
                    setShowCreateExperienceModal(false)
                    /* setName=""
                    setDescription="" */
                  }} slot="end"
                >
                  Cancel
                </IonButton>
                 <IonTitle>Create Experience</IonTitle>
              </IonToolbar>
            </IonHeader>

            <div className="flex flex-col sm:items-start h-full">

              <div className="sm:flex sm:items-start m-4">
                {/* <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10 sm:mb-4">
                  <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                </div> */}

                {/* <div className="text-center sm:ml-4 sm:text-left mb-4">
                  <p>Describe your experience</p>

                </div> */}
              </div>


              <ModalContent
                className="shrink h-full "
                onClose={(value) => {
                  setShowToastCreate({ isOpen: false });
                  value ? setRetVal(value) : setRetVal("User Cancelled");
                }}
                
                name={name}
                setName={setName}
                description={description}
                setDescription={setDescription}
                showToastCreate={showToastCreate} 
                error={error}
                errorName={errorName}
                errorDescription={errorDescription}
                //handleSubmit={handleSubmit}
                  
                />

            </div>

            <div className='p-4 z-10 bg-white'>
              <IonButton 
                className='w-full' 
                onClick={handleSubmit}
              >Create</IonButton>
            </div>
          </IonModal>

          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <IonToast
              isOpen={showToastCreate}
              onDidDismiss={() => setShowToastCreate(false)}
              message={`Experience has been created`}
              duration={1000}
            />
          </div>


    </div>
  );
};

export default CreateExperienceModalUser;


const ModalContent = ({ onClose, handleSubmit, name, description, setName, setDescription, errorName, errorDescription}) => {
  return (
    <>
      
      <IonContent>

        <div className="px-4 py-5 w-full">
          
          {/* Form */}
          <form className="" >
            {/* Section 1 */}
            <div className="flex bg-light">

              {/* Content */}
              <section className="flex-row w-full p-4">

                <div className="">  
                  <h4>Basic information</h4>
                </div> 

                <div className="">
                  
                  <IonItem className="mb-4 rounded-lg" >
                    <IonLabel position="stacked">Name</IonLabel>
                    <IonInput 
                      placeholder="Name"
                      value={name}
                      onIonChange={(event) => setName(event.target.value)}
                    ></IonInput>
                  </IonItem>
                  {errorName && <p>{errorName}</p>}
                           
                </div>

              </section>
            </div>

            {/* Section 2 */}
            <div className="flex bg-light">

              {/* Content */}
              <section className="flex-row w-full p-4">

                <div className="">  
                  <h4>Description</h4>
                </div> 

                <div className="">
                  
                  <IonItem className="rounded-lg">
                    <div className="py-4 w-full">
                      <IonLabel
                        for="about"
                        className=" block text-sm font-medium text-gray-700"
                      >
                        Description
                      </IonLabel>
                      <p className="mt-2 text-sm text-gray-500">
                        Brief description for your experience.
                      </p>
                      <div className="mt-2">
                        <IonTextarea
                          id="description"
                          rows="3"
                          value={description}
                          name="description"
                          onIonChange={(event) => setDescription(event.target.value)}
                          className="shadow-sm focus:ring-light-blue-500 focus:border-light-blue-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        ></IonTextarea>
                      </div>
                    </div>
                  </IonItem>
                  {errorDescription && <p>{errorDescription}</p>} 
                           
                </div>

              </section>
            </div>

          </form>
          
        </div>  
          

        
      </IonContent>
    </>
  );
};
