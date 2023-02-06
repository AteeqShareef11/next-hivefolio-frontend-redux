import { IonButton, IonCardContent, IonContent, IonHeader, IonItem, IonList, IonLoading, IonModal, IonTextarea, IonTitle, IonToast, IonToolbar } from '@ionic/react';

import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ExclamationIcon } from '@heroicons/react/outline';

/* Design */
import ReactMarkdown from 'react-markdown';

/* Redux */
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, teamAddMember, createNotificationTeamMemberRequest } from '../../redux/actions/coreActions';
//import { fetchTeamId, teamAddMember } from '../../redux/actions/teamActions';
//import { createNotificationTeamMemberRequest } from '../../redux/actions/notificationActions';

/* User */
import { useCurrentUser } from '../../context/AuthContext';

const CardJobModal = ({ job, userId,  showModal,  setShowModal, showToast1, setShowToast1}) => {

  const { id } = useParams();
  const signedInUser = useCurrentUser();

  const dispatch = useDispatch();
  const users = useSelector((state) => state.allData.users);  
  const team = useSelector((state) => state.team);
  //const job = useSelector((state) => state.job);

  const {title} = job;

  const adminId = job.admins?.find((person) => {
    return person.id === signedInUser.id;
  })

  //const [user, setUser] = useState('');

  const [error, setError] = useState('');
  //const [showToast1, setShowToast1] = useState(false);
  const [showLoading, setShowLoading] = useState(true);


  /* Request add user to members list */
  const handleTeamMemberRequest = async (event) => {
    //event.preventDefault()
    dispatch(createNotificationTeamMemberRequest( userId, id ))
  }

  /* New Add user to members list */
  const handleAddUser = async (event) => {
    //event.preventDefault()
    dispatch(teamAddMember(id, userId, users, teamDataMember, team ))
  }

  return (
    <div className="flex flex-row flex-wrap w-full">
      

          

          {/*  */}

          <IonModal
            isOpen={showModal}
            swipeToClose={true}
            onDidDismiss={() => setShowModal(false)}>

            <IonHeader>
              <IonToolbar>
                {(adminId) && (
                  <Link to={`/job/${job.id}`} 
                    className='mr-4 px-3 py-1 text-dark bg-primary hover:bg-dark hover:text-light rounded-lg'
                    //onClick={() => onClose(null)} 
                    onClick={() => {setShowModal(false)}}
                    slot="end"
                  >
                    Edit
                  </Link>
                )}
                <Link to={`/job/${job.id}`} 
                  className='mr-4 px-3 py-1 text-dark bg-primary hover:bg-dark hover:text-light rounded-lg'
                  //onClick={() => onClose(null)} 
                  onClick={() => {setShowModal(false)}}
                  slot="end"
                >
                  View more
                </Link>
                 <IonTitle>Job Details</IonTitle>
              </IonToolbar>
            </IonHeader>

            <div className="flex flex-col sm:items-start h-full">

              <div className="sm:flex sm:items-start m-4">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10 sm:mb-4">
                  <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                </div>

                <div className="text-center sm:ml-4 sm:text-left mb-4">
                  <h4>{title}</h4>
                  
                </div>
              </div>


              <ModalContent
                className="shrink h-full "
                job={job}
                  onClose={(value) => {
                    setShowModal({ isOpen: false });
                    value ? setRetVal(value) : setRetVal("User Cancelled");
                  }}
                  
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


    </div>
  );
};

export default CardJobModal;


const ModalContent = ({job}) => {
  
  const {introduction, description} = job;

  return (

      
      <IonContent
        className='mx-4'
      >


          {/* Content here */}
          <div className='mx-4'>
            <ReactMarkdown>
              {introduction}
            </ReactMarkdown>

            <ReactMarkdown>
              {description}
            </ReactMarkdown>
            
          </div>

          

          

          {/*  */}


        
      </IonContent>

  );
};
