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
  import NavigationAccordion from '../ui/Navigation/NavigationAccordion';
  import Footer from '../ui/Footer/Footer';
  
  const EditCommunitySocial = ({match}) => {
  
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
    const [community, setCommunity] = useState({})
    const [facebook, setFacebook] = useState('');
    const [instagram, setInstagram] = useState('');
    const [tiktok, setTiktok] = useState('');
    const [twitch, setTwitch] = useState('');
    const [youtube, setYoutube] = useState('');
    const [discord, setDiscord] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [twitter, setTwitter] = useState('');
    const [xbox, setXbox] = useState('');
    const [playstation, setPlaystation] = useState('');
    const [nintendo, setNintendo] = useState('');
    const [steam, setSteam] = useState('');
    const [epic, setEpic] = useState('');
    const [website, setWebsite] = useState('');
    const [store, setStore] = useState('');
   

    const fetchCommunity = async () => {
    
        try {
        const res = await fetch(`https://hivefolio.herokuapp.com/api/communities/${id}`)
        const data = await res.json()
    
        setUsername(data.username)
        setCommunity(data)
        setFacebook(data.facebook)
        setInstagram(data.instagram)
        setTiktok(data.tiktok)
        setTwitch(data.twitch)
        setYoutube(data.youtube)
        setDiscord(data.discord)
        setLinkedin(data.linkedin)
        setTwitter(data.twitter)
        setXbox(data.xbox)
        setPlaystation(data.playstation)
        setNintendo(data.nintendo)
        setSteam(data.steam)
        setEpic(data.epic)
        setWebsite(data.website)
        setStore(data.store)
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
                facebook, 
                twitter, 
                instagram, 
                twitch, 
                tiktok, 
                youtube, 
                discord, 
                linkedin, 
                xbox, 
                playstation, 
                nintendo, 
                steam, 
                epic, 
                website, 
                store
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
          <title>Edit Community Social - {username}</title>
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
                    style_05='bg-primary'

                    link_06='edit-streams'
                    link_06_title='Streams'
                    style_06='hover:bg-primary'

                    link_07='edit-settings'
                    link_07_title='Settings'
                    style_07='hover:bg-primary'
                  />
                    <h3>Social connects</h3>
                    <div className="mb-8 bg-white rounded-lg shadow overflow-hidden">
  
                        {/* Form */}
                        <form className="divide-y divide-gray-200 lg:col-span-9" onSubmit={handleEditSubmit}>
                          {/* <!-- Profile section --> */}

                          <div className="py-6 px-4 sm:p-6 lg:pb-8">

                            {/* Social media */}
                            <div className="">
                                
                                <div className="grid grid-cols-12 gap-6">

                                <div className="col-span-12 sm:col-span-6">
                                  <IonItem className="mb-4" >
                                    <IonLabel position="stacked">Twitter</IonLabel>
                                    <IonInput 
                                        value={twitter} 
                                        onIonChange={(event) => setTwitter(event.target.value)} 
                                        placeholder="example.com"
                                        >
                                    </IonInput>
                                  </IonItem>
                                </div>

                                <div className="col-span-12 sm:col-span-6">
                                  <IonItem className="mb-4" >
                                    <IonLabel position="stacked">Instagram</IonLabel>
                                    <IonInput 
                                        value={instagram} 
                                        onIonChange={(event) => setInstagram(event.target.value)} 
                                        placeholder="example.com"
                                        >
                                    </IonInput>
                                  </IonItem>
                                </div>
  
                                <div className="col-span-12 sm:col-span-6">
                                  <IonItem className="mb-4" >
                                    <IonLabel position="stacked">Facebook</IonLabel>
                                    <IonInput 
                                        value={facebook} 
                                        onIonChange={(event) => setFacebook(event.target.value)} 
                                        placeholder="example.com"
                                        >
                                    </IonInput>
                                  </IonItem> 
                                </div>

                                <div className="col-span-12 sm:col-span-6">
                                  <IonItem className="mb-4" >
                                    <IonLabel position="stacked">Twitch</IonLabel>
                                    <IonInput 
                                        value={twitch} 
                                        onIonChange={(event) => setTwitch(event.target.value)} 
                                        placeholder="example.com"
                                        >
                                    </IonInput>
                                  </IonItem>
                                </div>

                                <div className="col-span-12 sm:col-span-6">
                                  <IonItem className="mb-4" >
                                    <IonLabel position="stacked">Tiktok</IonLabel>
                                    <IonInput 
                                        value={tiktok} 
                                        onIonChange={(event) => setTiktok(event.target.value)} 
                                        placeholder="example.com"
                                        >
                                    </IonInput>
                                  </IonItem>
                                </div>

                                <div className="col-span-12 sm:col-span-6">
                                  <IonItem className="mb-4" >
                                    <IonLabel position="stacked">YouTube</IonLabel>
                                    <IonInput 
                                        value={youtube} 
                                        onIonChange={(event) => setYoutube(event.target.value)} 
                                        placeholder="example.com"
                                        >
                                    </IonInput>
                                  </IonItem>
                                </div>

                                <div className="col-span-12 sm:col-span-6">
                                  <IonItem className="mb-4" >
                                    <IonLabel position="stacked">Discord</IonLabel>
                                    <IonInput 
                                        value={discord} 
                                        onIonChange={(event) => setDiscord(event.target.value)} 
                                        placeholder="example.com"
                                        >
                                    </IonInput>
                                  </IonItem>
                                </div>

                                <div className="col-span-12 sm:col-span-6">
                                  <IonItem className="mb-4" >
                                    <IonLabel position="stacked">LinkedIn</IonLabel>
                                    <IonInput 
                                        value={linkedin} 
                                        onIonChange={(event) => setLinkedin(event.target.value)} 
                                        placeholder="example.com"
                                        >
                                    </IonInput>
                                  </IonItem>
                                </div>

                                <div className="col-span-12 sm:col-span-6">
                                  <IonItem className="mb-4" >
                                    <IonLabel position="stacked">Xbox</IonLabel>
                                    <IonInput 
                                        value={xbox} 
                                        onIonChange={(event) => setXbox(event.target.value)} 
                                        placeholder="example.com"
                                        >
                                    </IonInput>
                                  </IonItem>
                                </div>

                                <div className="col-span-12 sm:col-span-6">
                                  <IonItem className="mb-4" >
                                    <IonLabel position="stacked">PlayStation</IonLabel>
                                    <IonInput 
                                        value={playstation} 
                                        onIonChange={(event) => setPlaystation(event.target.value)} 
                                        placeholder="example.com"
                                        >
                                    </IonInput>
                                  </IonItem>
                                </div>

                                <div className="col-span-12 sm:col-span-6">
                                  <IonItem className="mb-4" >
                                    <IonLabel position="stacked">Nintendo</IonLabel>
                                    <IonInput 
                                        value={nintendo} 
                                        onIonChange={(event) => setNintendo(event.target.value)} 
                                        placeholder="example.com"
                                        >
                                    </IonInput>
                                  </IonItem>
                                </div>

                                <div className="col-span-12 sm:col-span-6">
                                  <IonItem className="mb-4" >
                                    <IonLabel position="stacked">Steam</IonLabel>
                                    <IonInput 
                                        value={steam} 
                                        onIonChange={(event) => setSteam(event.target.value)} 
                                        placeholder="example.com"
                                        >
                                    </IonInput>
                                  </IonItem>
                                </div>

                                <div className="col-span-12 sm:col-span-6">
                                  <IonItem className="mb-4" >
                                    <IonLabel position="stacked">Epic</IonLabel>
                                    <IonInput 
                                        value={epic} 
                                        onIonChange={(event) => setEpic(event.target.value)} 
                                        placeholder="example.com"
                                        >
                                    </IonInput>
                                  </IonItem>
                                </div>

                                <div className="col-span-12 sm:col-span-6">
                                  <IonItem className="mb-4" >
                                    <IonLabel position="stacked">Website</IonLabel>
                                    <IonInput 
                                        value={website} 
                                        onIonChange={(event) => setWebsite(event.target.value)} 
                                        placeholder="example.com"
                                        >
                                    </IonInput>
                                  </IonItem>
                                </div>

                                <div className="col-span-12 sm:col-span-6">
                                  <IonItem className="mb-4" >
                                    <IonLabel position="stacked">Store</IonLabel>
                                    <IonInput 
                                        value={store} 
                                        onIonChange={(event) => setStore(event.target.value)} 
                                        placeholder="example.com"
                                        >
                                    </IonInput>
                                  </IonItem>
                                </div>
                     
                                </div>
                            </div>
                          </div>

                          <div className="pt-6 divide-y divide-gray-200">
                            
                            {/* Save */}
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
  
  export default EditCommunitySocial