import { 
  IonBackButton,
  IonButton,
    IonButtons, 
    IonContent, 
    IonHeader, 
    IonInput, 
    IonItem, 
    IonItemDivider, 
    IonLabel, 
    IonLoading, 
    IonModal, 
    IonPage, 
    IonRouterLink, 
    IonSpinner, 
    IonTextarea, 
    IonToast, 
    IonToolbar, 
  } from '@ionic/react';
  import { Fragment, useRef, useEffect, useState } from 'react';
  import { Link, useHistory } from 'react-router-dom';
  
  /* User */
  import { useCurrentUser, useDispatchCurrentUser } from '../context/AuthContext';
  import { callApi } from "../utils/utils";
  
  
  /* Components */
  import { NavButtons } from '../ui/Buttons/NavButtons';
  import Hexagon from '../ui/Hexagon/Hexagon';
  import NavigationAccordion from '../ui/Navigation/NavigationAccordion';
  import Footer from '../ui/Footer/Footer';

  import { Dialog, Transition } from '@headlessui/react';
  import { ExclamationIcon } from '@heroicons/react/outline';
  
  const EditCommunitySettings = ({match}) => {
  
    const {id} = match.params

    const dispatch = useDispatchCurrentUser();
    const [showLoading, setShowLoading] = useState(true);
    const user = useCurrentUser();
    const [username, setUsername] = useState('');
    const [community, setCommunity] = useState([]);
    const history = useHistory();

    const [showToast1, setShowToast1] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const [open, setOpen] = useState(false);
    const cancelButtonRef = useRef();
    const [accountValidate, setAccountValidate] = useState('');
    const [clickedUser, setClickedUser] = useState('');

    
    const [error, setError] = useState('');
  

    const fetchCommunity = async () => {
    
        try {
        const res = await fetch(`https://hivefolio.herokuapp.com/api/communities/${id}`)
        const data = await res.json()

        setCommunity(data)
        setUsername(data.username)
        setShowLoading(false)
        } catch (err) {
        setShowLoading(false)
        console.error(err)
        }
    
    }

    const adminId = community.admins?.find((person) => {
      return person.id === user.id;
    })

    useEffect(() => {
      fetchCommunity()
    }, [])

    /* Delete data */
   const handleDelete = async () => {
        const res = await fetch(`https://hivefolio.herokuapp.com/api/communities/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
        })
        const data = await res.json()
        history.push('/communities')
    }
  
      return (
          <IonPage >
        <IonHeader >
          <title>Edit Community Settings - {username}</title>
          <IonToolbar className="">
            <IonRouterLink 
              routerLink="/" 
              className="flex pl-4 xs:hidden sm:hidden md:block lg:block xl:block"
            >
              <Hexagon/>
            </IonRouterLink>
            <IonButtons 
              slot="start"
              className='xs:block sm:block md:hidden lg:hidden xl:hidden'
            >
              <IonBackButton />
            </IonButtons>
            <IonButtons slot="end">
              <NavButtons/>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen className="">
          <div className="max-width">
            <div className="m-auto">
              <IonLoading
                cssClass='my-custom-class'
                isOpen={showLoading}
                onDidDismiss={() => setShowLoading(false)}
                message={'Please wait...'}
              />
            </div>

                {(!showLoading && !adminId) && (history.push(`/community/${username}`))}
                <div className="mt-8 mx-8">
                  <h1>{community.name}</h1>
                  <Link to={`/community/${community.username}`}>
                  <button  className="bg-primary sm-mt-4 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-dark hover:bg-dark hover:text-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500">
                      View {community.name}'s profile
                  </button>
                  </Link>
                </div>
                  
  
              <main className="relative ">

                  <div className="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8">
                  <NavigationAccordion 
                    header='Menu'
                    link_01='edit'
                    link_01_title='Overall'
                    style_01='hover:bg-primary'

                    link_02='edit-media'
                    link_02_title='Media'
                    style_02='hover:bg-primary'

                    link_03='edit-members'
                    link_03_title='Members'
                    style_03='hover:bg-primary'

                    link_04='edit-teams'
                    link_04_title='Teams'
                    style_04='hover:bg-primary'

                    link_05='edit-social'
                    link_05_title='Social'
                    style_05='hover:bg-primary'

                    link_06='edit-streams'
                    link_06_title='Streams'
                    style_06='hover:bg-primary'

                    link_07='edit-settings'
                    link_07_title='Settings'
                    style_07='bg-primary'
                  />
                    <h3 className="">Settings</h3>
                    <div className="mb-8 bg-white rounded-lg shadow overflow-hidden">
                      <div className="divide-y divide-gray-200 lg:grid lg:divide-y-0 lg:divide-x">
 
                        {/* Form */}
                        <form className="divide-y divide-gray-200 lg:col-span-9">
                          {/* Section 1 */}
                        <div className="bg-light mb-8 grid grid-cols-1 lg:gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">

                          {/* Title */}
                          <section className="lg:col-start-1 w-full">
                            <div className="px-4 py-5">  
                              <h4>Delete team</h4>
                            </div>
                          </section>

                          {/* Content */}
                          <section className="col-span-2">
                          {/* IonModal */}

                          <IonButton 
                            /* className="bg-primary sm-mt-4 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-dark hover:bg-dark hover:text-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500" */
                            onClick={() => setShowModal(true)}
                          >
                              Delete user
                          </IonButton>

                          <IonModal
                            isOpen={showModal}
                            swipeToClose={true}
                            onDidDismiss={() => setShowModal(false)}>

                            <div className="sm:items-start m-8">
                              <div className="sm:flex">
                              <div className="mx-auto flex-shrink-0 flex items-center justify-center mt-2 h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                <ExclamationIcon
                                  className="h-6 w-6 text-red-600"
                                  aria-hidden="true"
                                />
                              </div>
                              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left mb-4 w-full">
                                <h3>Account deletion</h3>
                                <div className="mt-2">
                                  <h3 className="text-sm text-gray-500">
                                    Would you like to delete your account? 
                                  </h3>
                                  <p>Enter your community username "{community.username}"</p>
                                  <IonItem className="mb-4" >
                                    <IonLabel position="stacked">Write your community username {community.username}</IonLabel>
                                    <IonInput 
                                      onIonChange={event => setAccountValidate(event.target.value)}
                                      placeholder="Community username"
                                    ></IonInput>
                                  </IonItem>
                                </div>
                                
                                  {community.username === accountValidate && (
                                    <div className="mt-4">
                                      <p className="mb-4">CAUTION: This will permantely delete your community account and you cannot recover it!</p>
                                      <button
                                        onClick={handleDelete}
                                        className="inline-flex items-center justify-center h-12  
                                            px-6 font-medium tracking-wide transition 
                                            duration-200 bg-dark text-light rounded-full hover:bg-primary hover:text-dark
                                            focus:shadow-outline focus:outline-none"
                                      >
                                        Delete this community
                                      </button>
                                    </div>
                                  )}
                                
                              </div>
                              </div>
                            </div>
                            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                              <IonToast
                                isOpen={showToast1}
                                onDidDismiss={() => setShowToast1(false)}
                                message={`Your community account ${community.username} has been deleted`}
                                duration={1000}
                              />
                            </div>
                              
                            <IonButton onClick={() => {setShowModal(false); setAccountValidate(null)}}>Close Modal</IonButton>
                          </IonModal>

                        </section>
                        </div>

                          

  
                          {/* <!-- Privacy section --> */}
                          {/* <div className="pt-6 divide-y divide-gray-200">
                            <div className="mt-4 py-4 px-4 flex justify-end sm:px-6">
                              <button type="button" className="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500">
                                Cancel
                              </button>
                              <button  className="ml-5 bg-primary border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-dark hover:bg-dark hover:text-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
                              onClick={() => setShowToast1(true)} expand="block"
                              >
                                Save
                              </button>
                              <IonToast
                                isOpen={showToast1}
                                onDidDismiss={() => setShowToast1(false)}
                                message="Your settings have been saved."
                                duration={1000}
                              />
                            </div>
                          </div> */}
                        </form>
  
                      </div>
                    </div>
                    
                  </div>
                </main>
                
                
              
                
            </div>
            <Footer/>
        </IonContent>
      </IonPage>
      )
  }
  
  export default EditCommunitySettings