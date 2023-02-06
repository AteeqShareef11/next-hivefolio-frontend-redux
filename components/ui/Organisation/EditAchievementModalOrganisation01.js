import { IonButton, IonLabel, IonContent, IonHeader, IonItem, IonModal, IonTextarea, IonTitle, IonToast, IonToolbar, IonInput } from '@ionic/react';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

/* Redux */
import { useDispatch } from 'react-redux';
import { editAchievement } from '../../redux/actions/coreActions';
import { fetchAchievements } from '../../redux/actions/achievementAction';

import EditAchievementModalOrganisation02 from './EditAchievementModalOrganisation02';
import EditAchievementModalOrganisationDelete from './EditAchievementModalOrganisationDelete';

const EditAchievementModalOrganisation01 = ({ selectedAchievement, setShowEditAchievementModal, showEditAchievementModal01, setShowEditAchievementModal01, showEditAchievementModal02, setShowEditAchievementModal02, showEditAchievementModal03, setShowEditAchievementModal03}) => {

  const dispatch = useDispatch();

  const { username } = useParams();

  const [showToastSubmit, setShowToastSubmit] = useState(false);
  const [showToastCancel, setShowToastCancel] = useState(false);

  const [error, setError] = useState('');

  const [showDeleteAchievementModal, setShowDeleteAchievementModal] = useState(false);


  const [formValues, setFormValues] = useState({
    name: selectedAchievement?.name || "",
    description: selectedAchievement?.description || "",
  })

  const onChange = e => {
    setFormValues({...formValues, [e.target.name]: e.target.value})
  }


  const handleEditSubmit = async (event) => {
    //event.preventDefault()
   

    const formData = new FormData();
    formData.append('data', JSON.stringify({
      name: formValues.name,
      description: formValues.description,
    }));
    const body = {
      name: formValues.name,
      description: formValues.description,
    }

    dispatch(editAchievement(body, selectedAchievement.id))
    dispatch(fetchAchievements());
    dispatch(fetchAchievements());
    setShowToastSubmit(true)
  }

  useEffect(() => {

    if(selectedAchievement !== undefined) {
      setFormValues({...formValues, name: selectedAchievement.name, description: selectedAchievement.description})
    }

  }, [])

  return (

    <div>
      {selectedAchievement && (

    <div className="flex flex-row flex-wrap w-full">
      <EditAchievementModalOrganisation02
        showEditAchievementModal01={showEditAchievementModal01}
        setShowEditAchievementModal01={setShowEditAchievementModal01}

        showEditAchievementModal02={showEditAchievementModal02}
        setShowEditAchievementModal02={setShowEditAchievementModal02}
        selectedAchievement={selectedAchievement}
      />

      <EditAchievementModalOrganisationDelete

        setShowEditAchievementModal01={setShowEditAchievementModal01}
        showDeleteAchievementModal={showDeleteAchievementModal}
        setShowDeleteAchievementModal={setShowDeleteAchievementModal}

        selectedAchievement={selectedAchievement}
      />
          

          {/*  */}

          <IonModal
            isOpen={showEditAchievementModal01}
            swipeToClose={true}
            onDidDismiss={() => setShowEditAchievementModal01(false)}
            >

            <IonHeader>
              <IonToolbar>

                <IonButton 
                  className='mr-4'
                  onClick={() => {
                    setShowEditAchievementModal01(false)
                    setShowToastCancel(true)
                  }} slot="end"
                >
                  Cancel
                </IonButton>
                 <IonTitle>Edit achievement</IonTitle>
              </IonToolbar>
            </IonHeader>

            <div className="flex flex-col sm:items-start h-full">

              <div className="flex-col sm:flex sm:items-start m-4 border-b-2 border-solid">

                <div className="text-center m-4 sm:text-left">
                    <h4 className='m-0'>{selectedAchievement.name}</h4>
                </div>

                
              </div>

              <ModalContent
                className="shrink h-full "
                  onClose={(value) => {
                    setShowEditAchievementModal01({ isOpen: false });
                    value ? setRetVal(value) : setRetVal("User Cancelled");
                  }}
                  showModal={false}
                  showEditAchievementModal01={false}
                  formValues={formValues}
                  onChange={onChange}
                  setShowEditAchievementModal02={setShowEditAchievementModal02}
                  setShowDeleteAchievementModal={setShowDeleteAchievementModal}
                  type_achievements={selectedAchievement.type_achievements}
                />

            </div>

            <div className='p-4 z-10 bg-white'>
              <IonButton 
                className='w-full' 
                onClick={() => {
                  handleEditSubmit()
                  setShowEditAchievementModal01(false)
                  setShowEditAchievementModal(false)
                }}
              >
                Save and close
              </IonButton>
            </div>
          </IonModal>

          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <IonToast
              isOpen={showToastSubmit}
              onDidDismiss={() => setShowToastSubmit(false)}
              message={`Changes have been saved`}
              duration={1000}
            />
          </div>

          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <IonToast
              isOpen={showToastCancel}
              onDidDismiss={() => setShowToastCancel(false)}
              message={`Changes have been canceled`}
              duration={1000}
            />
          </div>


    </div>
    )}
    </div>
  );
};

export default EditAchievementModalOrganisation01;


const ModalContent = ({ formValues, onChange, type_achievements, setShowEditAchievementModal02, setShowDeleteAchievementModal }) => {
  return (
    <>
      
      <IonContent>

      <div className="px-4 py-5 w-full">
          
          {/* Form */}
          <div className="" >
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
                      value={formValues.name}
                      name="name"
                      onIonChange={onChange}
                      placeholder="Name"
                    ></IonInput>
                  </IonItem>
                  {/* {errorName && <p>{errorName}</p>} */}
                           
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
                        Brief description for your achievement.
                      </p>
                      <div className="mt-2">
                        <IonTextarea
                          id="about"
                          rows="3"
                          value={formValues.description}
                          name="description"
                          onIonChange={onChange}
                          className="shadow-sm focus:ring-light-blue-500 focus:border-light-blue-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        ></IonTextarea>
                      </div>
                    </div>
                  </IonItem>
                  {/* {errorDescription && <p>{errorDescription}</p>}  */}
                           
                </div>

              </section>
            </div>

            {/* Section 3 Types */}
            <div className="flex bg-light">

              {/* Content */}
              <section className="flex-row w-full p-4">

                <div className="flex justify-between">  
                  <h4>Types</h4>

                  <div
                    className="inline-flex items-center justify-center h-8  
                    px-6 font-medium tracking-wide transition 
                    duration-200 bg-primary text-dark rounded-full hover:bg-dark hover:text-light
                    focus:shadow-outline focus:outline-none"
                    onClick={() => {
                    setShowEditAchievementModal02(true);
                    }}
                  >
                    Add types
                  </div>
                </div> 

                <div className='flex'>
                  {type_achievements.map(type => (

                    <div
                      className="rounded-3xl inline-flex items-center justify-center h-8  
                      px-6 mr-4 focus:shadow-outline focus:outline-none bg-dark text-white"
                    >
                      {type.name}

                    </div>

                  ))}
                </div>

              </section>
            </div>

            {/* Section 4 Delete */}
            <div className="flex bg-light">

              {/* Content */}
              <section className="flex-row w-full p-4">

                <div className="">  
                  <h4>Delete achievement</h4>
                </div> 

                <div
                  class="rounded-3xl mr-4 py-4 px-4 bg-dark text-white hover:bg-primary hover:text-dark"
                  onClick={() => {
                    setShowDeleteAchievementModal(true);
                  }}
                >
                  Delete achievement
                </div>

              </section>
            </div>

          </div>
          
        </div>
          

        
      </IonContent>
    </>
  );
};
