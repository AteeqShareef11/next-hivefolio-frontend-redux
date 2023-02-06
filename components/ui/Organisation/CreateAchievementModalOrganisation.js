import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonModal, IonTextarea, IonTitle, IonToast, IonToolbar } from '@ionic/react';

import { useState } from 'react';
import { useParams } from 'react-router-dom';

/* Components */
import EditAchievementModalOrganisation01 from './EditAchievementModalOrganisation01';

/* Redux */
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoreData } from '../../redux/actions/coreActions';
import { fetchOrganisations } from '../../redux/actions/organisationActions';
import { fetchAchievements, createAchievementUser } from '../../redux/actions/achievementAction';

const CreateAchievementModalOrganisation = ({ showCreateAchievementModal, setShowCreateAchievementModal, selectedAchievement}) => {

  const dispatch = useDispatch();

  const selectedProfileOrganisation = useSelector((state) => state.organisation);

  const [showEditAchievementModal01, setShowEditAchievementModal01] = useState(false);
  const [showToastCreate, setShowToastCreate] = useState(false);

  const [name, setName] = useState(''); 
  const [description, setDescription] = useState(''); 
  const [errorName, setErrorName] = useState('');
  const [errorDescription, setErrorDescription] = useState('');
  const [error, setError] = useState('');

  const {admins} = selectedProfileOrganisation

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
    

    const formData = new FormData();
    formData.append('data', JSON.stringify({name: name, description: description, related_organisations: [selectedProfileOrganisation], admins: [admins] }));
    //formData.append('files.image_profile', file)

    dispatch(createAchievementUser(formData, setShowEditAchievementModal01, setShowCreateAchievementModal, setShowToastCreate, fetchAchievements, fetchOrganisations))
    dispatch(fetchAchievements());
    dispatch(fetchAchievements());
    dispatch(fetchOrganisations());
    dispatch(fetchOrganisations());
    dispatch(fetchCoreData());
    dispatch(fetchCoreData());

  }

  return (
    <div className="flex flex-row flex-wrap w-full">
      
        <div className="clear-both">
          <EditAchievementModalOrganisation01
            selectedAchievement={selectedAchievement}
            showEditAchievementModal01={showEditAchievementModal01}
            setShowEditAchievementModal01={setShowEditAchievementModal01}
          />
            
          </div>
          

          {/*  */}

          <IonModal
            isOpen={showCreateAchievementModal}
            swipeToClose={true}
            onDidDismiss={() => setShowCreateAchievementModal(false)}
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
                    setShowCreateAchievementModal(false)
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

export default CreateAchievementModalOrganisation;


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
