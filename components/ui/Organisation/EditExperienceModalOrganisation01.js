import { IonButton, IonLabel, IonCardContent, IonContent, IonHeader, IonItem, IonList, IonLoading, IonModal, IonTextarea, IonTitle, IonToast, IonToolbar, IonInput } from '@ionic/react';

import { useEffect, useState } from 'react';

/* Redux */
import { useDispatch, useSelector } from 'react-redux';
import { editExperience } from '../../redux/actions/coreActions';
import { fetchExperiences } from '../../redux/actions/experienceAction';

/* Contexts */
import { useCurrentUser } from '../../context/AuthContext';

/* Components */
import EditExperienceModalOrganisation02 from './EditExperienceModalOrganisation02';
import EditExperienceModalOrganisationDelete from './EditExperienceModalOrganisationDelete';

const EditExperienceModalOrganisation01 = ({ selectedExperince, showEditExperiencesModal01, setShowEditExperiencesModal01, showEditExperiencesModal02, setShowEditExperiencesModal02 }) => {

  const dispatch = useDispatch();

  const selecteProfileOrganisation = useSelector((state) => state.organisation);

  const [showToastSubmit, setShowToastSubmit] = useState(false);
  const [showToastCancel, setShowToastCancel] = useState(false);

  const [error, setError] = useState('');

  const [showDeleteExperiencesModal, setShowDeleteExperiencesModal] = useState(false);

  const {admins} = selecteProfileOrganisation


  const [formValues, setFormValues] = useState({
    name: selectedExperince?.name || "",
    description: selectedExperince?.description || "",
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
      admins: [admins]
    }

    dispatch(editExperience(body, selectedExperince.id))
    dispatch(fetchExperiences());
    dispatch(fetchExperiences());
    setShowToastSubmit(true)
  }

  useEffect(() => {

    if(selectedExperince !== undefined) {
      setFormValues({...formValues, name: selectedExperince.name, description: selectedExperince.description})
    }

  }, [])

  return (

    <div>
      {selectedExperince && (

    <div className="flex flex-row flex-wrap w-full">
      <EditExperienceModalOrganisation02
        showEditExperiencesModal01={showEditExperiencesModal01}
        setShowEditExperiencesModal01={setShowEditExperiencesModal01}

        showEditExperiencesModal02={showEditExperiencesModal02}
        setShowEditExperiencesModal02={setShowEditExperiencesModal02}
        selectedExperince={selectedExperince}
      />

      <EditExperienceModalOrganisationDelete

        setShowEditExperiencesModal01={setShowEditExperiencesModal01}
        showDeleteExperiencesModal={showDeleteExperiencesModal}
        setShowDeleteExperiencesModal={setShowDeleteExperiencesModal}

        selectedExperince={selectedExperince}
      />
          

          {/*  */}

          <IonModal
            isOpen={showEditExperiencesModal01}
            swipeToClose={true}
            onDidDismiss={() => setShowEditExperiencesModal01(false)}
            >

            <IonHeader>
              <IonToolbar>

                <IonButton 
                  className='mr-4'
                  onClick={() => {
                    setShowEditExperiencesModal01(false)
                    setShowToastCancel(true)
                  }} slot="end"
                >
                  Cancel
                </IonButton>
                 <IonTitle>Edit experience</IonTitle>
              </IonToolbar>
            </IonHeader>

            <div className="flex flex-col sm:items-start h-full">

              <div className="flex-col sm:flex sm:items-start m-2 border-b-2 border-solid">

                <div className="text-center m-4 sm:text-left">
                    <h4 className='m-0'>{selectedExperince.name}</h4>
                </div>


                {/* Content */}

                {/* <div className="w-full pb-4 mr-8">
                  <p>Name, Description, types, date, games</p>
                </div> */}

                
              </div>

              <ModalContent
                className="shrink h-full "
                  onClose={(value) => {
                    setShowEditExperiencesModal01({ isOpen: false });
                    value ? setRetVal(value) : setRetVal("User Cancelled");
                  }}
                  showModal={false}
                  showEditExperiencesModal01={false}
                  formValues={formValues}
                  onChange={onChange}
                  setShowEditExperiencesModal02={setShowEditExperiencesModal02}
                  setShowDeleteExperiencesModal={setShowDeleteExperiencesModal}
                  type_experiences={selectedExperince.type_experiences}
                />

            </div>

            <div className='p-4 z-10 bg-white'>
              <IonButton 
                className='w-full' 
                onClick={() => {
                  handleEditSubmit()
                  setShowEditExperiencesModal01(false)
                  //setShowEditExperiencesModal(true)
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

export default EditExperienceModalOrganisation01;


const ModalContent = ({ formValues, onChange, type_experiences, setShowEditExperiencesModal02, setShowDeleteExperiencesModal }) => {
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
                    setShowEditExperiencesModal02(true);
                    }}
                  >
                    Add types
                  </div>
                </div> 

                <div className='flex'>
                  {type_experiences.map(type => (

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
    

            {/* Section 3 */}
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

            {/* Section 4 Delete */}
            <div className="flex bg-light">

              {/* Content */}
              <section className="flex-row w-full p-4">

                <div className="">  
                  <h4>Delete experience</h4>
                </div> 

                <div
                  class="rounded-3xl mr-4 py-4 px-4 bg-dark text-white hover:bg-primary hover:text-dark"
                  onClick={() => {
                    setShowDeleteExperiencesModal(true);
                  }}
                >
                  Delete experience
                </div>

              </section>
            </div>

          </div>
          
        </div>
          

        
      </IonContent>
    </>
  );
};
