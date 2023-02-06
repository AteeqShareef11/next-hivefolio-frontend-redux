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
  IonToolbar 
} from '@ionic/react';

import { useRef, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useCurrentUser, useDispatchCurrentUser } from '../context/AuthContext';
import { callApi } from "../utils/utils";

/* Components */
import { NavButtons } from '../ui/Buttons/NavButtons';
import Hexagon from '../ui/Hexagon/Hexagon';
import Footer from '../ui/Footer/Footer';

/* Captcha */
import Recaptcha from 'react-google-invisible-recaptcha';

const PasswordReset = () => {

  const history = useHistory();
  const location = useLocation();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [errorMsg, setErrorMsg] = useState(null);
  const dispatch = useDispatchCurrentUser();

  const user = useCurrentUser();

  const { state = {}} = location

   if (user.isAuthenticated) {
      if (state && state.from) {
          history.replace(state.from)
      }  
  } 
  const handleSubmit = async (e) => {
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

  /* Captcha */

    return (
        <IonPage >
      <IonHeader >
        <IonToolbar >
            <div className="flex pl-4">
                <IonRouterLink routerLink="/"><Hexagon/></IonRouterLink>
            </div>
          <IonButtons slot="end">
            <NavButtons/>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen >
        <section class=" px-8 py-16 m-8 rounded-2xl bg-gray-200 xl:px-8" >
            <div class="max-w-5xl mx-auto">
                <div class="flex flex-col items-center md:flex-row">

                    <div class="w-full space-y-5 md:w-3/5 md:pr-16">
                        <p class="font-medium text-blue-500 uppercase">Building Businesses</p>
                        <h2 class="text-2xl font-extrabold leading-none text-black sm:text-3xl md:text-5xl">
                            Changing The Way People Do Business.
                        </h2>
                        <p class="text-xl text-gray-600 md:pr-16">Learn how to engage with your visitors and teach them about your mission. We're revolutionizing the way customers and businesses interact.</p>
                    </div>

                    <div class="w-full mt-16 md:mt-0 md:w-2/5">
                        <form class="relative z-10 h-auto p-8 py-10 overflow-hidden bg-white border-b-2 border-gray-300 rounded-lg shadow-2xl px-7" onSubmit={handleSubmit}>
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

                            <Recaptcha
                                sitekey="6LeZxd8bAAAAAK_mWS39jVK8Q2vyaRn25eMEHkeA"
                            />

                            <div class="block">
                                <button className="w-full px-3 py-4 font-medium text-dark bg-primary hover:bg-dark hover:text-light rounded-lg">Sign in</button>
                            </div>
                            <p class="w-full mt-4 text-sm text-center text-gray-500">Don't have an account? <Link to='/signup' class="text-blue-500 underline">Sign up here</Link></p>
                        </form>
                        {errorMsg && <p>{errorMsg}</p>}
                    </div>

                </div>
            </div>
          </section>
          <Footer/>
      </IonContent>
    </IonPage>
    )
}

export default PasswordReset