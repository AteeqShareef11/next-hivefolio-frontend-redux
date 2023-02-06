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
  
  import { Link } from 'react-router-dom';
  
  /* User */
  import { useCurrentUser } from '../context/AuthContext';
  import { callApi } from "../utils/utils";
  
  
  /* Components */
  import { NavButtons } from '../ui/Buttons/NavButtons';
  import Hexagon from '../ui/Hexagon/Hexagon';
  import NavigationAccordion from '../ui/Navigation/NavigationAccordion';
  import Footer from '../ui/Footer/Footer';

  /* Redux */
  import { useDispatch, useSelector } from 'react-redux';
  import { fetchUserId, editUser } from '../redux/actions/coreActions';
  
  const AccountSocial = ({match}) => {
    const user = useCurrentUser();
    const {id} = user;

    const dispatch = useDispatch();

    const loggedInUser = useSelector(state => state.user);
    const users = useSelector(state => state.allUsers.users);

    const [showToast1, setShowToast1] = useState(false);
    const [showModal, setShowModal] = useState(false);
    
    const {facebook, instagram, tiktok, twitch, youtube, discord, discord_channel, linkedin, twitter, xbox, playstation, nintendo, steam, epic, website, store} = loggedInUser;

    const [formValues, setFormValues] = useState({
      facebook: user?.facebook || "",
      instagram: user?.instagram || "",
      tiktok: user?.tiktok || "",
      twitch: user?.twitch || "",
      youtube: user?.youtube || "",
      discord: user?.discord || "",
      discord_channel: user?.discord_channel || "",
      linkedin: user?.linkedin || "",
      twitter: user?.twitter || "",
      xbox: user?.xbox || "",
      playstation: user?.playstation || "",
      nintendo: user?.nintendo || "",
      steam: user?.steam || "",
      epic: user?.epic || "",
      website: user?.website || "",
      store: user?.store || "",
    })

    useEffect(() => {
      setFormValues({...formValues, facebook, instagram, tiktok, twitch, youtube, discord, discord_channel, linkedin, twitter, xbox, playstation, nintendo, steam, epic, website, store})
  
    }, [loggedInUser])
  
    const onChange = e => {
      setFormValues({...formValues, [e.target.name]: e.target.value})
    }

    const handleEditSubmit = async (event) => {
      event.preventDefault()
     
      const formData = new FormData();
      formData.append('data', JSON.stringify({
        facebook: formValues.facebook,
        instagram: formValues.instagram,
        tiktok: formValues.tiktok,
        twitch: formValues.twitch,
        youtube: formValues.youtube,
        discord: formValues.discord,
        discord_channel: formValues.discord_channel,
        linkedin: formValues.linkedin,
        twitter: formValues.twitter,
        xbox: formValues.xbox,
        playstation: formValues.playstation,
        nintendo: formValues.nintendo,
        steam: formValues.steam,
        epic: formValues.epic,
        website: formValues.website,
        store: formValues.store,
      }));
      const body = {
        facebook: formValues.facebook,
        instagram: formValues.instagram,
        tiktok: formValues.tiktok,
        twitch: formValues.twitch,
        youtube: formValues.youtube,
        discord: formValues.discord,
        discord_channel: formValues.discord_channel,
        linkedin: formValues.linkedin,
        twitter: formValues.twitter,
        xbox: formValues.xbox,
        playstation: formValues.playstation,
        nintendo: formValues.nintendo,
        steam: formValues.steam,
        epic: formValues.epic,
        website: formValues.website,
        store: formValues.store,
      }

  
      dispatch(editUser(body, id, user))
      dispatch(fetchUserId(id));
    }
  

    useEffect(() => {

      dispatch(fetchUserId(id));
      if(loggedInUser.id !== user.id) {
        dispatch(fetchUserId(id));
      }
  
    }, []);
   
  
    /* Edit data */
    
    /* const handleEditSubmit = async (event) => {
        event.preventDefault()

        const res = await fetch(`https://hivefolio.herokuapp.com/api/users/${id}`,
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
        fetchTeam()
        setShowLoading(true)

    }
 */
    /* useEffect(() => {
    fetchTeam()
    }, []) */


  
      return (
          <IonPage >
        <IonHeader >
          <title>Account Social - {user.username}</title>
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
                {/* <IonLoading
                  cssClass='my-custom-class'
                  isOpen={showLoading}
                  onDidDismiss={() => setShowLoading(false)}
                  message={'Please wait...'}
                /> */}
                </div>
                <div className="mt-8 mx-8">
                  <h1>{user.gamertag}</h1>
                  <Link to={`/user/${user.username}`}>
                  <button  className="bg-primary sm-mt-4 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-dark hover:bg-dark hover:text-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500">
                      View {user.gamertag}'s profile
                  </button>
                  </Link>
                </div>
                  
  
              <main className="relative ">

                  <div className="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8">

                  <NavigationAccordion 
                    header='Menu'
                    link_01='account'
                    link_01_title='Overall'
                    style_01="hover:bg-primary"

                    link_02='account-media'
                    link_02_title='Media'
                    style_02="hover:bg-primary"

                    link_03='account-social'
                    link_03_title='Social'
                    style_03="bg-primary"

                    link_04="account-streams"
                    link_04_title="Streams"
                    style_04="hover:bg-primary"

                    link_05='account-settings'
                    link_05_title='Settings'
                    style_05="hover:bg-primary"
                  />
                    <h3>Social connects</h3>
                    <div className="mb-8 bg-white rounded-lg shadow overflow-hidden">
  
                        {/* Form */}
                        <form className="divide-y divide-gray-200 lg:col-span-9" onSubmit={(e)=>handleEditSubmit(e)}>
                          {/* <!-- Profile section --> */}

                          <div className="py-6 px-4 sm:p-6 lg:pb-8">

                            {/* Social media */}
                            <div className="">
                                
                                <div className="grid grid-cols-12 gap-6">

                                <div className="col-span-12 sm:col-span-6">
                                  <IonItem className="mb-4" >
                                    <IonLabel position="stacked">Twitter</IonLabel>
                                    <IonInput 
                                        value={formValues.twitter}
                                        name="twitter" 
                                        onIonChange={onChange} 
                                        placeholder="example.com"
                                        >
                                    </IonInput>
                                  </IonItem>
                                </div>

                                <div className="col-span-12 sm:col-span-6">
                                  <IonItem className="mb-4" >
                                    <IonLabel position="stacked">Instagram</IonLabel>
                                    <IonInput 
                                        value={formValues.instagram} 
                                        name="instagram" 
                                        onIonChange={onChange} 
                                        placeholder="example.com"
                                        >
                                    </IonInput>
                                  </IonItem>
                                </div>
  
                                <div className="col-span-12 sm:col-span-6">
                                  <IonItem className="mb-4" >
                                    <IonLabel position="stacked">Facebook</IonLabel>
                                    <IonInput 
                                        value={formValues.facebook} 
                                        name="facebook" 
                                        onIonChange={onChange} 
                                        placeholder="example.com"
                                        >
                                    </IonInput>
                                  </IonItem> 
                                </div>

                                <div className="col-span-12 sm:col-span-6">
                                  <IonItem className="mb-4" >
                                    <IonLabel position="stacked">Twitch</IonLabel>
                                    <IonInput 
                                        value={formValues.twitch}
                                        name="twitch"  
                                        onIonChange={onChange} 
                                        placeholder="example.com"
                                        >
                                    </IonInput>
                                  </IonItem>
                                </div>

                                <div className="col-span-12 sm:col-span-6">
                                  <IonItem className="mb-4" >
                                    <IonLabel position="stacked">Tiktok</IonLabel>
                                    <IonInput 
                                        value={formValues.tiktok} 
                                        name="tiktok" 
                                        onIonChange={onChange} 
                                        placeholder="example.com"
                                        >
                                    </IonInput>
                                  </IonItem>
                                </div>

                                <div className="col-span-12 sm:col-span-6">
                                  <IonItem className="mb-4" >
                                    <IonLabel position="stacked">YouTube</IonLabel>
                                    <IonInput 
                                        value={formValues.youtube}
                                        name="youtube"  
                                        onIonChange={onChange} 
                                        placeholder="example.com"
                                        >
                                    </IonInput>
                                  </IonItem>
                                </div>

                                <div className="col-span-12 sm:col-span-6">
                                  <IonItem className="mb-4" >
                                    <IonLabel position="stacked">Discord</IonLabel>
                                    <IonInput 
                                        value={formValues.discord} 
                                        name="discord" 
                                        onIonChange={onChange} 
                                        placeholder="username#0000"
                                        >
                                    </IonInput>
                                  </IonItem>
                                </div>

                                <div className="col-span-12 sm:col-span-6">
                                  <IonItem className="mb-4" >
                                    <IonLabel position="stacked">Discord Channel</IonLabel>
                                    <IonInput 
                                        value={formValues.discord_channel} 
                                        name="discord_channel" 
                                        onIonChange={onChange} 
                                        placeholder="111222333444555666"
                                        >
                                    </IonInput>
                                  </IonItem>
                                </div>

                                <div className="col-span-12 sm:col-span-6">
                                  <IonItem className="mb-4" >
                                    <IonLabel position="stacked">LinkedIn</IonLabel>
                                    <IonInput 
                                        value={formValues.linkedin} 
                                        name="linkedin" 
                                        onIonChange={onChange} 
                                        placeholder="example.com"
                                        >
                                    </IonInput>
                                  </IonItem>
                                </div>

                                <div className="col-span-12 sm:col-span-6">
                                  <IonItem className="mb-4" >
                                    <IonLabel position="stacked">Xbox</IonLabel>
                                    <IonInput 
                                        value={formValues.xbox} 
                                        name="xbox" 
                                        onIonChange={onChange} 
                                        placeholder="example.com"
                                        >
                                    </IonInput>
                                  </IonItem>
                                </div>

                                <div className="col-span-12 sm:col-span-6">
                                  <IonItem className="mb-4" >
                                    <IonLabel position="stacked">PlayStation</IonLabel>
                                    <IonInput 
                                        value={formValues.playstation} 
                                        name="playstation" 
                                        onIonChange={onChange} 
                                        placeholder="example.com"
                                        >
                                    </IonInput>
                                  </IonItem>
                                </div>

                                <div className="col-span-12 sm:col-span-6">
                                  <IonItem className="mb-4" >
                                    <IonLabel position="stacked">Nintendo</IonLabel>
                                    <IonInput 
                                        value={formValues.nintendo} 
                                        name="nintendo" 
                                        onIonChange={onChange} 
                                        placeholder="example.com"
                                        >
                                    </IonInput>
                                  </IonItem>
                                </div>

                                <div className="col-span-12 sm:col-span-6">
                                  <IonItem className="mb-4" >
                                    <IonLabel position="stacked">Steam</IonLabel>
                                    <IonInput 
                                        value={formValues.steam}
                                        name="steam"  
                                        onIonChange={onChange} 
                                        placeholder="example.com"
                                        >
                                    </IonInput>
                                  </IonItem>
                                </div>

                                <div className="col-span-12 sm:col-span-6">
                                  <IonItem className="mb-4" >
                                    <IonLabel position="stacked">Epic</IonLabel>
                                    <IonInput 
                                        value={formValues.epic}
                                        name="epic"  
                                        onIonChange={onChange} 
                                        placeholder="example.com"
                                        >
                                    </IonInput>
                                  </IonItem>
                                </div>

                                <div className="col-span-12 sm:col-span-6">
                                  <IonItem className="mb-4" >
                                    <IonLabel position="stacked">Website</IonLabel>
                                    <IonInput 
                                        value={formValues.website} 
                                        name="website" 
                                        onIonChange={onChange} 
                                        placeholder="example.com"
                                        >
                                    </IonInput>
                                  </IonItem>
                                </div>

                                <div className="col-span-12 sm:col-span-6">
                                  <IonItem className="mb-4" >
                                    <IonLabel position="stacked">Store</IonLabel>
                                    <IonInput 
                                        value={formValues.store} 
                                        name="store" 
                                        onIonChange={onChange} 
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
  
  export default AccountSocial