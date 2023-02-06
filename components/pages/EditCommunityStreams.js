import { 
  IonBackButton,
  IonButton,
    IonButtons, 
    IonContent, 
    IonHeader, 
    IonInput, 
    IonItem, 
    IonLabel, 
    IonLoading, 
    IonModal, 
    IonPage, 
    IonRouterLink, 
    IonSpinner, 
    IonToast, 
    IonToolbar, 
  } from '@ionic/react';
  import { useState, useEffect } from 'react';
  
  import { Link, useHistory } from 'react-router-dom';
  
  /* User */
  import { useCurrentUser, useDispatchCurrentUser } from '../context/AuthContext';
  import { callApi } from "../utils/utils";
  
  
  /* Components */
  import { NavButtons } from '../ui/Buttons/NavButtons';
  import Hexagon from '../ui/Hexagon/Hexagon';
  import CardTwitch from '../ui/Card/CardTwitch';
  import NavigationAccordion from '../ui/Navigation/NavigationAccordion';
  import Footer from '../ui/Footer/Footer';
  
  const EditCommunityStreams = ({match}) => {
  
    const {id} = match.params

    const dispatch = useDispatchCurrentUser();
    const [showLoading, setShowLoading] = useState(true);
    const user = useCurrentUser();
    const [username, setUsername] = useState('');
    const history = useHistory();

    const [showToast1, setShowToast1] = useState(false);
    const [showModal, setShowModal] = useState(false);
    
    const [edit, setEdit] = useState(false)

    // Used for the edit form
    const [streamTwitch, setStreamTwitch] = useState('');
    const [community, setCommunity] = useState({});
   

    const fetchCommunity = async () => {
    
        try {
        const res = await fetch(`https://hivefolio.herokuapp.com/api/communities/${id}`)
        const data = await res.json()
    
        setUsername(data.username)
        setCommunity(data)
        setStreamTwitch(data.stream_twitch);
        setShowLoading(false)
        } catch (err) {
        setShowLoading(false)
        console.error(err)
        }
    
    }

    const adminId = community.admins?.find((person) => {
      return person.id === user.id;
    })
  
    /* Edit data */
    
    const handleEditSubmit = async (event) => {
        event.preventDefault()

        const res = await fetch(`https://hivefolio.herokuapp.com/api/communities/${id}`,
        {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
              stream_twitch: streamTwitch,
            })
        })

        const data = await res.json()
        fetchCommunity()
    }

    useEffect(() => {
    fetchCommunity()
    }, [])


  
      return (
          <IonPage >
        <IonHeader >
          <title>Edit Community Streams - {username}</title>
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
                    style_06='bg-primary'

                    link_07='edit-settings'
                    link_07_title='Settings'
                    style_07='hover:bg-primary'
                  />
                    <h3>Streams</h3>
                    <div className="mb-8 bg-white rounded-lg shadow overflow-hidden">
                      {/* Form */}
                      <form
                        className="divide-y divide-gray-200 lg:col-span-9"
                        onSubmit={handleEditSubmit}
                      >
                        
                        {/* Section 1 */}
                        <div className="bg-light mb-8 grid grid-cols-1 lg:gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                            {/* Title */}
                            <section className="lg:col-start-1 w-full">
                              <div className="px-4 py-5">
                                <h4>Twitch stream</h4>
                              </div>
                            </section>

                            {/* Content */}
                            <section className="col-span-2">
                              <div className="px-4 py-5 grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-6">
                                <IonItem className="mb-4 rounded-lg">
                                  <IonLabel position="stacked">Twitch username</IonLabel>
                                  <IonInput
                                    value={streamTwitch}
                                    onIonChange={event => setStreamTwitch(event.target.value)}
                                    placeholder="Twitch username"
                                  ></IonInput>
                                </IonItem>

                                <div className="">
                                  {community.stream_twitch && (
                                    <CardTwitch
                                    twitchId={community.stream_twitch}
                                    />
                                  )}
                                </div>
                              </div>
                            </section>
                          </div>

                        <div className="pt-6 divide-y divide-gray-200">
                          {/* Save */}
                          <div className="mt-4 py-4 px-4 flex justify-end sm:px-6">
                            <button
                              type="button"
                              className="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
                            >
                              Cancel
                            </button>
                            <button
                              className="ml-5 bg-primary border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-dark hover:bg-dark hover:text-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
                              onClick={() => setShowToast1(true)}
                              expand="block"
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
                        </div>
                      </form>
                    </div>
                  </div>
                </main>
                
                
              
                
            </div>
            <Footer/>
        </IonContent>
      </IonPage>
      )
  }
  
  export default EditCommunityStreams