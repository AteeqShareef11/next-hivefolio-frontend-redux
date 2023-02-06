import { 
    IonButtons, 
    IonContent, 
    IonHeader, 
    IonInput, 
    IonItem, 
    IonLabel, 
    IonPage,
    IonRouterLink,
    IonTitle, 
    IonToolbar, 
    useIonViewDidEnter
  } from '@ionic/react';
  
  import { useState, useEffect } from 'react'
  import { useHistory, useLocation } from 'react-router-dom';
  import { useCurrentUser, useDispatchCurrentUser } from '../context/AuthContext';
  import { callApi } from "../utils/utils";
  import axios from 'axios'
  
  /* Components */
  import { NavButtons } from '../ui/Buttons/NavButtons';
  import Hexagon from '../ui/Hexagon/Hexagon';
  import Footer from '../ui/Footer/Footer';
  import CarouselCards from '../ui/Carousel/CarouselCards';
  import CardCharacter from '../ui/Card/CardCharacter';
  import CardGame from '../ui/Card/CardGame';
  import CardGrid from '../ui/CardGrid/CardGrid';

  import HeaderProfileUserOnboarding from '../ui/Header/HeaderProfileUserOnboarding';
  
  import Login from '../ui/Onboarding/Login';
  import SignUp from '../ui/Onboarding/SignUp';
  import Complete from '../ui/Onboarding/Complete';
  import Reset from '../ui/Onboarding/Reset';

  import OnboardingJob01 from '../ui/Onboarding/OnboardingJob01';
  
  /* Captcha */
  import Recaptcha from 'react-google-invisible-recaptcha';
  /* import SignUp from './SignUp'; */

  /* Images */
  import ProfilePlaceholder from '../assets/images/profile_placeholder.png';
  import hexagon_background from '../assets/images/hexagon_background.png';
  import Gravatar from 'react-gravatar';

  /* Redux */
  import { useDispatch, useSelector } from 'react-redux';
  import { fetchGames, fetchCharacters, fetchUserId } from '../redux/actions/coreActions';
  import { fetchTypeusers } from '../redux/actions/typeuserActions';
  
  const OnboardingJob = () => {
  
  /* Redux */
  const dispatch = useDispatch();
  
  const location = useLocation();
  const history = useHistory();
  const [type, setType] = useState('');
  const [error, setError] = useState('');
  const user = useCurrentUser();
  //const dispatch = useDispatchCurrentUser();

  const loggedInUser = useSelector(state => state.user);
  
  const [page, setPage] = useState(0);
  const [selectedStep, setSelectedStep] = useState(0);
  const [password, setPassword] = useState("");

  const { id, username, gamertag, email, first_name, last_name, introduction, tagline } = user;
  
  
  const steps = [
    //{component: Login, label: "Login"}, 
    {component: OnboardingJob01, label: "Sign Up"},
    {component: Complete, label: "Complete"},
    {component: Reset, label: "Reset"}
  ]
  
  
  
    useEffect(() => {
        if(!user){
            history.push('/')
        }
        const params = new URLSearchParams(window.location.search)
        const code = params.get("code")
        const access_token = params.get("access_token")
  
        if(code) {
          const resetStep = steps.find(step => step.label === "Reset")
          setSelectedStep(steps.indexOf(resetStep))
        } else if(access_token) {
          axios.get('https://hivefolio.herokuapp.com/api/auth/facebook/callback', {
            params: { access_token }
          }).then(response => {
            localStorage.setItem('token', response.jwt);
            //dispatch({ type: "LOGIN", user: response.user })
  
            window.history.replaceState(null, null, window.location.pathname)
          }).catch(error => {
            console.error(error)
          })
        }
  
        if(password !== null) {
          setPassword(null)
        }
    }, [user])
  
    useEffect(() => {
      //dispatch(fetchUsers());
      //dispatch(fetchTeams());
      //dispatch(fetchOrganisations());
      //dispatch(fetchCommunities());
      dispatch(fetchGames());
      dispatch(fetchCharacters());
      //dispatch(fetchJobs());
      dispatch(fetchTypeusers());

      dispatch(fetchUserId(id));
        /* if(loggedInUser.id === undefined) {
        dispatch(fetchUserId(id));
      } */


      if(user.onboarding === true) {
        history.push(`/user/${user.username}`)
      }
    }, [dispatch]);
  
    return (
        <IonPage >
      <IonHeader >
        <title>Onboarding</title>
        {/* <IonToolbar >
            <div className="flex pl-4">
              <IonRouterLink routerLink="/"><Hexagon/></IonRouterLink>
            </div>
          <IonButtons slot="end">
            <NavButtons/>
          </IonButtons>
        </IonToolbar> */}
      </IonHeader>
      <IonContent fullscreen >
        
        <section className="bg-light h-full">

                <div className='bg-primary text-dark rounded-full text-center text-bold p-2 border-8 border-white border-solid sticky top-2 z-40 m-2 font-bold text-lg max-width'>Onboarding</div>

                <div className="mx-auto h-full ">
                    <div className="flex justify-between flex-col items-start md:flex-row md:mx-8 lg:mx-8 xl:mx-8 max-width">

                    <div className='flex h-full mt-8 text-center w-full max-w-xl xs:hidden sm:hidden md:hidden lg:block xl:block'>
                      {page === 0 && (
                        <div className="flex w-full space-y-5 md:pr-16 xs:hidden sm:hidden md:hidden lg:block xl:block items-start">
                            
                          <h1 className="w-full leading-none text-dark">Welcome</h1>
                          <h3 class="mb-6">{gamertag}</h3>
                          <p className="text-xl text-dark w-full">Let's help you setup your profile.</p>
                        </div>
                      )}   

                      {page === 1 && (
                        <div className="w-full space-y-5 md:pr-16 xs:hidden sm:hidden md:hidden lg:block xl:block items-center">

                          <div>
                            <h1 className="leading-none text-dark ">
                                Your games
                            </h1>
                            <p className="text-xl text-dark w-full">Select the games you play</p>
                          </div>

                          <div>

                            {loggedInUser.games && (
                            <div className="">
                              <CardGrid
                                style1={
                                  'grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4'
                                }
                                className="mt-8"
                              >
                                {loggedInUser.games.sort(() => Math.random() - 0.5).map(game => (
                                  <CardGame
                                    id={game.id}
                                    //username={game.username}
                                    image_profile={game.image_profile}
                                    //name={game.name}
                                    noLink={true}
                                  />
                                ))}
                              </CardGrid>
                            </div>
                            )}
                            
                          </div>
                              
                          
                        </div>
                      )}

                      {page === 2 && (
                        <div className="flex w-full space-y-5 md:pr-16 xs:hidden sm:hidden md:hidden lg:block xl:block items-center">
                              
                          <div>
                            <h1 className="leading-none text-dark ">
                                Your characters
                            </h1>
                            <p className="text-xl text-dark w-full">Select the characters you play</p>
                          </div>
                          
                          <div>

                            {loggedInUser.characters && (
                            <div className="">
                              <CardGrid
                                style1={
                                  'grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-2'
                                }
                                className="mt-8"
                              >
                                {loggedInUser.characters.sort(() => Math.random() - 0.5).map(game => (
                                  <CardCharacter
                                    style1={
                                      'grid text-center border-none rounded-3xl'
                                    }
                                    style2={
                                      'mx-auto bg-cover bg-no-repeat h-24 w-24 sm:h-24 sm:w-24 lg:h-24 lg:w-24 xl:h-24 xl:w-24 image-placeholder rounded-full'
                                    }
                                    style3={
                                      'mx-auto bg-cover bg-no-repeat image-placeholder rounded-full placeholder overflow-hidden text-transparent'
                                    }
                                    id={game.id}
                                    image_profile={game.image_profile}
                                    noLink={true}
                                  />
                                ))}
                              </CardGrid>
                            </div>
                            )}
                            
                          </div>
                        </div>
                      )}

                      {page === 3 && (
                        <div className="flex w-full space-y-5 md:pr-16 xs:hidden sm:hidden md:hidden lg:block xl:block items-center">
                          <div>
                            <h1 className="leading-none text-dark ">
                                User types
                            </h1>
                            <p className="text-xl text-dark w-full">Select the types you relate to</p>
                          </div>
                          
                          

                        </div>
                      )}

                      {page === 4 && (
                        <div className="flex w-full space-y-5 md:pr-16 xs:hidden sm:hidden md:hidden lg:block xl:block items-center">
                          <div>
                            <h1 className="leading-none text-dark ">
                                Profile and background
                            </h1>
                            <p className="text-xl text-dark w-full">Upload a profile image and a background image</p>
                          </div>

                          <div className="flex items-center w-full justify-center">
                          { loggedInUser.image_background ? (
                              <img 
                              src={loggedInUser.image_background.url} 
                              alt={`Profile name ${loggedInUser.gamertag}`} 
                              className="object-cover w-full h-40 lg:h-full md:h-60 rounded-md"
                              />
                              ) : (
                                  <img src={hexagon_background} className="object-cover w-full h-40 lg:h-full md:h-60 rounded-md bg-white"/>
                              )}
                              
                              <div className="mx-auto bg-cover bg-no-repeat h-32 w-32 image-placeholder rounded-full absolute bg-white">
                                  {loggedInUser.image_profile ? (
                                      <div className="mx-auto bg-cover bg-no-repeat h-32 w-32 image-placeholder rounded-full border-4 border-light absolute"
                                      style={{
                                          backgroundImage: `url(${loggedInUser.image_profile && loggedInUser.image_profile.url})`
                                          }}
                                          alt={`Profile name ${loggedInUser.gamertag}`}
                                  >
                                  </div>
                                  ) : (
                                    <div
                                    className="mx-auto bg-cover bg-no-repeat h-28 w-28 image-placeholder rounded-full placeholder overflow-hidden text-transparent"
                                    /* className="hexagonImage element placeholder overflow-hidden text-transparent" */
                                    style={{ backgroundImage: `url(${ProfilePlaceholder})` }}
                                    alt={`Profile name ${gamertag}`}
                                  >
                                    {/* /* Change default to placeholder image */}
                                    <Gravatar
                                      size={1600}
                                      rating="pg"
                                      default={ProfilePlaceholder}
                                      email={email}
                                      className="CustomAvatar-image overflow-hidden"
                                    />
                                  </div>
                                  )
                              }
                              </div>

                          </div>

                        </div>
                      )}

                      {page === 5 && (
                        <div className="flex w-full space-y-5 md:pr-16 xs:hidden sm:hidden md:hidden lg:block xl:block items-center">

                          <div>
                            <h1 className="leading-none text-dark ">
                                Good game!
                            </h1>
                            <p className="text-xl text-dark w-full">Let's take you to your profile</p>
                          </div>

                          {/* <HeaderProfileUserOnboarding
                            style1="p-8 bg-white border-none"
                          /> */}
                        </div>
                              
                          
                      )}
                    </div>

                    
  
                      
  
                        {/* Input area */}
                        <div class="flex w-full lg:w-1/2 xl:w-1/2 mt-2 h-full">
                        {/* <h2 class="mb-6 text-center xs:block sm:block md:block lg:hidden xl:hidden">Onboarding</h2> */}
  
                          <div class="relative z-10 p-8 py-10 overflow-hidden bg-white border-b-2 border-gray-300 rounded-lg shadow-2xl px-7 my-4 shrink w-full">
                          {steps.map((Step, i) => 
                              selectedStep === i ? (
                                <Step.component 
                                  setSelectedStep={setSelectedStep} 
                                  password={password}
                                  setPassword={setPassword}
                                  steps={steps} 
                                  key={Step.label}
                                  page={page}
                                  setPage={setPage}
                                />
                              ) : null
                            )}
                          </div>
  
                        </div>
  
                    </div>
                </div>
            </section>
            {/* <Footer/> */}
      </IonContent>
    </IonPage>
    )
  }
  
  export default OnboardingJob