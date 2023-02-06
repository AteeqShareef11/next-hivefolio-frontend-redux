import { 
  IonBackButton,
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
import axios from 'axios';

/* Components */
import { NavButtons } from '../ui/Buttons/NavButtons';
import Hexagon from '../ui/Hexagon/Hexagon';
import Footer from '../ui/Footer/Footer';

import Login from '../ui/Auth/Login';
import SignUp from '../ui/Auth/SignUp';
import Complete from '../ui/Auth/Complete';
import Reset from '../ui/Auth/Reset';

/* Captcha */
import Recaptcha from 'react-google-invisible-recaptcha';
/* import SignUp from './SignUp'; */

/* Redux */
import { useDispatch, useSelector } from 'react-redux';

const AuthPortal = () => {

const history = useHistory();
const {user} = useCurrentUser();
const dispatch = useDispatchCurrentUser();

const [selectedStep, setSelectedStep] = useState(0);
const [password, setPassword] = useState("");

const steps = [
  {component: Login, label: "Login"}, 
  {component: SignUp, label: "Sign Up"},
  {component: Complete, label: "Complete"},
  {component: Reset, label: "Reset"}
]

// const games = useSelector((state) => state.allData.games);

// const gamesWithBackground = games?.filter((game) => {
//   return game.image_background !== undefined;
// })

// const gameWithBackground = gamesWithBackground?.sort(() => Math.random() - 0.5).slice(0,1);


  useEffect(() => {
      if(user){
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
          dispatch({ type: "LOGIN", user: response.user })

          window.history.replaceState(null, null, window.location.pathname)
        }).catch(error => {
          console.error(error)
        })
      }

      if(password !== null) {
        setPassword(null)
      }
  }, [user])

  /* useIonViewDidEnter(() => {
    setPassword(null)
  }); */

  useEffect(() => {
    /* if(user) {
      history.push(`/home`)
    } */
  }, [])

  return (
      <IonPage >
    <IonHeader >
      <title>Account Portal</title>
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
    <IonContent fullscreen >
      <section className="m-8 rounded-2xl bg-gray-200 md:px-8 lg:px-8 xl:px-8 md:py-16 lg:py-16 xl:py-16 bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url('https://miro.medium.com/max/1200/1*vfyYbfX5wDPOUTvy23hYaw.jpeg')`
      }}
      >
              <div className="max-w-5xl mx-auto">
                  <div className="flex flex-col items-center md:flex-row">

                      <div className="w-full space-y-5 md:w-3/5 md:pr-16 xs:hidden sm:hidden md:hidden lg:block xl:block">
                          
                          <h2 className="text-2xl font-extrabold leading-none text-white sm:text-3xl md:text-5xl">
                              Learn, Grow and Network in Esports
                          </h2>
                          <p className="text-xl text-white md:pr-16">Build your Esports portfolio. Join or create teams, organisations and communities.</p>
                      </div>

                      {/* Input area */}
                      <div className="w-full md:mt-0 lg:w-2/5">

                        <div className="relative z-10 h-auto p-8 py-10 overflow-hidden bg-white border-b-2 border-gray-300 rounded-lg shadow-2xl px-7">
                        {steps.map((Step, i) => 
                            selectedStep === i ? (
                              <Step.component 
                                setSelectedStep={setSelectedStep} 
                                password={password}
                                setPassword={setPassword}
                                steps={steps} 
                                key={Step.label}
                              />
                            ) : null
                          )}
                        </div>

                      </div>

                  </div>
              </div>
          </section>
          <Footer/>
    </IonContent>
  </IonPage>
  )
}

export default AuthPortal