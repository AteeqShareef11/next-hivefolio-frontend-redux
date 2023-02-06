import { IonButton, IonCardContent, IonContent, IonHeader, IonItem, IonList, IonLoading, IonModal, IonTitle, IonToast, IonToolbar } from '@ionic/react';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ExclamationIcon } from '@heroicons/react/outline';

/* Images */
import ProfilePlaceholder from '../../assets/images/profile_placeholder.png';
import Gravatar from 'react-gravatar';
import Axios from 'axios';

/* Search */
import Select from 'react-select';

/* Redux */
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../redux/actions/userActions';
import { fetchJob, addTypejob, removeTypejob } from '../../redux/actions/jobActions';
import { fetchTypejobs } from '../../redux/actions/typeActions';

const CreateExperienceModalTypeCommunity = ({ showModal,  setShowModal, showToast1, setShowToast1}) => {

  const { id } = useParams();

  const dispatch = useDispatch();
  const users = useSelector((state) => state.allUsers.users);  
  const job = useSelector((state) => state.job);
  const typejobs = useSelector((state) => state.allTypejobs.typejobs);

  //const [user, setUser] = useState('');

  const [error, setError] = useState('');
  const [typeJob, setTypeJob] = useState({});
  const [typeJobId, setTypeJobId] = useState({});
  //const [showToast1, setShowToast1] = useState(false);
  const [showLoading, setShowLoading] = useState(true);


  const fetchData = async () => {
    try {
      const typeJobRes = await fetch(`https://hivefolio.herokuapp.com/api/type-jobs`);
      const typeJobData = await typeJobRes.json();

      setTypeJob(typeJobData);
      setShowLoading(false)
    } catch (err) {
      console.error(err);
    }
  };



/* Add type to user type list */
const handleAddTypeJob = async (event) => {
  //event.preventDefault()
  dispatch(addTypejob(job.id, job, typejobs, typeJobId))
}

/* Remove type to user type list */
const handleRemoveTypeJob = async (event, removeId) => {
  //event.preventDefault()
  dispatch(removeTypejob(job.id, job, removeId))
}

useEffect(() => {
  fetchData();
  dispatch(fetchJob(id));
  dispatch(fetchTypejobs(typejobs));
}, []);

  return (
    <IonCardContent className="flex flex-row flex-wrap w-full">
      
          {/*  */}

          <IonModal
            isOpen={showModal}
            swipeToClose={true}
            onDidDismiss={() => setShowModal(false)}>

            <IonHeader>
              <IonToolbar>
                <IonButton 
                  className='mr-4'
                  onClick={() => onClose(null)} slot="end"
                >
                  Next
                </IonButton>
                 <IonTitle>Job types</IonTitle>
              </IonToolbar>
            </IonHeader>

            <div className="flex flex-col sm:items-start h-full">

              <div className="sm:flex sm:items-start m-4">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10 sm:mb-4">
                  <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                </div>

                <div className="text-center sm:ml-4 sm:text-left mb-4">
                  <p>Add types to your job</p>

                </div>
              </div>


              <ModalContent
                className="shrink h-full "
                job={job}
                typeJob={typeJob} 
                typejobs={typejobs}
                setTypeJobId={setTypeJobId} 
                handleAddTypeJob={handleAddTypeJob} 
                handleRemoveTypeJob={handleRemoveTypeJob}
                error={error} 
                setError={setError}
                />

            </div>


            

            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <IonToast
                isOpen={showToast1}
                onDidDismiss={() => setShowToast1(false)}
                message={`User has been added to ${job.name}`}
                duration={1000}
              />
            </div>
              
            <div className='p-4 z-10 bg-white'>
              <IonButton className='w-full' onClick={() => {setShowModal(false)}}>Close Modal</IonButton>
            </div>
          </IonModal>


    </IonCardContent>
  );
};

export default CreateExperienceModalTypeCommunity;


const ModalContent = ({ job, setTypeJobId, handleAddTypeJob, handleRemoveTypeJob, typeJob, error, setError, typejobs }) => {

  return (

      <IonContent>


      <div className="bg-light mb-8 grid grid-cols-1 lg:gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2">
        <div className="px-4 py-5 w-full">

          <div className="grid xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-1 bg-white p-2 md:grid-cols-2">
            <Select
            className="lg:mb-2 xl:mb-2"
              getOptionLabel={option => `${option.title}`}
              getOptionValue={option => option.id}
              options={typeJob}
              instanceId="types"
              placeholder="filter by types"
              isClearable
              onChange={value => setTypeJobId(value ? value.id : null)}
            />
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-dark hover:bg-dark hover:text-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => {
                handleAddTypeJob();
                /* setShowToast1(true); */
              }}
            >
              {error && <p>{error}</p>}
              Add type
            </button>
          </div>

        </div>

        <div className="px-4 py-5 w-full">
          {job.type_job?.map(type => (
            <div className="grid grid-cols-2 bg-white p-2 mb-2">
              <p>{type.title}</p>
              <button
                className="bg-primary border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-dark hover:bg-dark hover:text-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
                
                onClick={(event) => {
                  handleRemoveTypeJob(event, type.id);
                  /* setShowToast1(true); */
                }}
              >
                Remove
              </button>
            </div>
            
          ))}
          
        </div>

      </div>
      
        
      </IonContent>

  );
};
