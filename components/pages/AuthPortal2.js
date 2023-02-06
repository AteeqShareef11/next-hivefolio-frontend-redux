import {
    IonButtons,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonLoading,
    IonPage,
    IonRouterLink,
    IonSpinner,
    IonToolbar,
  } from '@ionic/react';
  
  import { useRef, useEffect, useState } from 'react';
  import { Link, useHistory, useLocation } from 'react-router-dom';
  
  /* Components */
  import { NavButtons } from '../ui/Buttons/NavButtons';
  import Hexagon from '../ui/Hexagon/Hexagon';
  import TabSub from '../ui/Tabs/TabSub';
  import CardGrid from '../ui/CardGrid/CardGrid';
  import Footer from '../ui/Footer/Footer';
  
  /* Design */
  import ReactMarkdown from 'react-markdown';
  
  /* User */

import { useCurrentUser, useDispatchCurrentUser } from '../context/AuthContext';
import { callApi } from "../utils/utils";
  
  /* Search */
  import Select from 'react-select';
  import { useQuery, useQueryClient } from 'react-query';
  
  const AuthPortal2 = ({ match }) => {
    const { id } = match.params;

    const user = useCurrentUser();
    const {setUser} = useCurrentUser();
 
    const [showLoading, setShowLoading] = useState(true);
  
    const location = useLocation();
    const tabFromUrl = new URLSearchParams(location.search).get('tab');

    const history = useHistory();
    const emailRef = useRef();
    const passwordRef = useRef();
    const [forgot, setForgot] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [error, setError] = useState('');
    const dispatch = useDispatchCurrentUser();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gamertag, setGamertag] = useState('');
    const [username, setUsername] = useState('');

    const { state = {}} = location

   if (user.isAuthenticated) {
      if (state && state.from) {
          history.replace(state.from)
      }  
    } 
    const handleSigninSubmit = async (e) => {
        e.preventDefault()
        setErrorMsg(null)

        try {
            const response = await callApi({
                path: "/auth/local", method: "POST", body: {
                    identifier: emailRef.current.value,
                    password: passwordRef.current.value
                }
            });

            if (!response.user) {
                throw "Cannot sign in. Please try again"
            }

            localStorage.setItem('token', response.jwt);
            dispatch({ type: "LOGIN", user: response.user })
            if (state && state.from) {
                history.replace(state.from)
            }
            else {
                history.push("/")
            }
            
        } catch (err) {
            setErrorMsg(err)
        }
    }
  
    const handleSubmit = async (event) => {
        event.preventDefault()
  
        try{
            const response = await fetch('https://hivefolio.herokuapp.com/api/auth/local/register', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    username: username.split(' ').join('').toLowerCase(),
                    gamertag: gamertag,
                    email,
                    password,
                    /* typeuser: Player */
                })
            })
            const data = await response.json()
            if(data.message){
                setError(data.message[0].messages[0].message)
  
                return
            }
            
            history.push(`/user/${username}`)
            setUser(data)
  
        } catch(err){
            setError("Something went wrong ", err)
        }
    }
  
  
    useEffect(() => {

    }, []);
  
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <div className="flex pl-4">
              <IonRouterLink routerLink="/">
                <Hexagon />
              </IonRouterLink>
            </div>
            <IonButtons slot="end">
              <NavButtons />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className="m-auto">
            {/* <IonLoading
              cssClass='my-custom-class'
              isOpen={showLoading}
              onDidDismiss={() => setShowLoading(false)}
              message={'Please wait...'}
            /> */}
          </div>
          <div>
            
              <div>
  
                <div className="max-width">
                  {/* <!-- Tabs --> */}
                  <div className="max-width">
                    <TabSub initialTab={tabFromUrl}>
  
                      {/* Tab 1 */}
                      <div label="Sign in">
                        <div className="gap-5 mx-4 md:flex-row mt-8 mb-20">
                          {/* Section 1 */}
                          <section class=" px-8 py-16 m-8 rounded-2xl bg-gray-200 xl:px-8" >
            <div class="max-w-5xl mx-auto">
                <div class="flex flex-col items-center md:flex-row">

                    <div class="w-full space-y-5 md:w-3/5 md:pr-16">
                        <p class="font-medium text-blue-500 uppercase">Continue your legacy</p>
                        <h2 class="text-2xl font-extrabold leading-none text-black sm:text-3xl md:text-5xl">
                            Learn, grow and connect in eSports
                        </h2>
                        <p class="text-xl text-gray-600 md:pr-16">Build your eSports portfolio. Join or create teams, organisations and communities.</p>
                    </div>

                    <div class="w-full mt-16 md:mt-0 md:w-2/5">
                        <form class="relative z-10 h-auto p-8 py-10 overflow-hidden bg-white border-b-2 border-gray-300 rounded-lg shadow-2xl px-7" onSubmit={handleSigninSubmit}>
                            <h3 class="mb-6 text-2xl font-medium text-center">Sign in to your Account</h3>
                            <IonItem className="mb-4">
                                <IonLabel position="stacked">Email address</IonLabel>
                                <IonInput 
                                    ref={emailRef}
                                    type="email" 
                                    placeholder="Enter email" 
                                    >
                                </IonInput>
                            </IonItem> 

                            <IonItem className="mb-4">
                            <IonLabel position="stacked">Password</IonLabel>
                                <IonInput 
                                    ref={passwordRef}
                                    type="password"
                                    placeholder="Enter password"
                                    >
                                </IonInput>
                            </IonItem> 


                            <div className="block">
                                <button className="w-full px-3 py-4 font-medium text-dark bg-primary hover:bg-dark hover:text-light rounded-lg">Sign in</button>
                            </div>
                            
                            {/* <Link to='/password-forgotten' className="text-blue-500 underline">Forgotton password</Link> */}

                            <p className="w-full mt-4 text-sm text-center text-gray-500">Don't have an account? <Link to='/authportal?tab=sign-up' className="text-blue-500 underline">Sign up here</Link></p>
                        </form>
                        {errorMsg && <p>{errorMsg}</p>}
                    </div>

                </div>
            </div>
          </section>
  
                          {/*  */}
                        </div>
                      </div>
  
                      {/* Tab 2 */}
                      <div label="Sign up">
                        {/* Section 1 */}
                        <section class=" px-8 py-16 m-8 rounded-2xl bg-gray-200 xl:px-8">
                <div class="max-w-5xl mx-auto">
                    <div class="flex flex-col items-center md:flex-row">

                        <div class="w-full space-y-5 md:w-3/5 md:pr-16">
                            <p class="font-medium text-blue-500 uppercase">Showcase your skills</p>
                            <h2 class="text-2xl font-extrabold leading-none text-black sm:text-3xl md:text-5xl">
                                Learn, grow and connect in eSports
                            </h2>
                            <p class="text-xl text-gray-600 md:pr-16">Build your eSports portfolio. Join or create teams, organisations and communities.</p>
                        </div>

                        <div class="w-full mt-16 md:mt-0 md:w-2/5">
                            <form class="relative z-10 h-auto p-8 py-10 overflow-hidden bg-white border-b-2 border-gray-300 rounded-lg shadow-2xl px-7" onSubmit={handleSubmit}>
                                <h3 class="mb-6 text-2xl font-medium text-center">Sign up to Hivefolio</h3>
                                <IonItem className="mb-4">
                                <IonLabel position="stacked">Username (Can be similar to 'gamertag')</IonLabel>
                                    <IonInput 
                                        type="username"
                                        placeholder="username"
                                        value={username}
                                        onIonChange={(event) => setUsername(event.target.value)
                                        }
                                        class="block w-full px-4 py-3 border-2 border-transparent rounded-lg focus:border-blue-500 focus:outline-none">
                                    </IonInput>                                    
                                </IonItem>

                                <IonItem className="mb-4">
                                <IonLabel position="stacked">Gamertag</IonLabel>
                                    <IonInput 
                                        type="gamertag"
                                        placeholder="gamertag"
                                        value={gamertag}
                                        onIonChange={(event) => setGamertag(event.target.value)
                                        }
                                        class="block w-full px-4 py-3 border-2 border-transparent rounded-lg focus:border-blue-500 focus:outline-none">
                                    </IonInput>
                                </IonItem>

                                <IonItem className="mb-4">
                                <IonLabel position="stacked">Email address</IonLabel>
                                    <IonInput 
                                        type="email"
                                        placeholder="email"
                                        value={email}
                                        onIonChange={(event) => setEmail(event.target.value)
                                        }
                                        class="block w-full px-4 py-3 border-2 border-transparent rounded-lg focus:border-blue-500 focus:outline-none">
                                    </IonInput>
                                </IonItem>

                                <IonItem className="mb-4">
                                    <IonLabel position="stacked">Password</IonLabel>
                                    <IonInput 
                                        type="password"
                                        placeholder="password"
                                        value={password}
                                        onIonChange={(event) => setPassword(event.target.value)
                                        }
                                        class="block w-full px-4 py-3 border-2 border-transparent rounded-lg focus:border-blue-500 focus:outline-none" >
                                    </IonInput>
                                </IonItem>

                                

                                <div class="block">
                                    <button class="w-full px-3 py-4 font-medium text-white bg-blue-600 rounded-lg">Sign up</button>
                                </div>
                                <p class="w-full mt-4 text-sm text-center text-gray-500">Already have an account? <Link to='/signin' class="text-blue-500 underline">Sign in here</Link></p>
                            </form>
                            {error && <p>{error}</p>}

                        </div>

                    </div>
                </div>
            </section>

                      </div>
  
                      {/* Tab 2 */}
                      <div label="Forgotton password">
                        <div className="gap-5 mx-4 md:flex-row mt-8 mb-20">
                          {/* Section 1 */}

  
                          {/*  */}
                        </div>
                      </div>
  
  
                    </TabSub>
                  </div>
                </div>
              </div>
          </div>
          <Footer />
        </IonContent>
      </IonPage>
    );
  };
  
  export default AuthPortal2;
  