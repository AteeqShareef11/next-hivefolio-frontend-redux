import React, { useEffect, useState } from 'react';
import { IonPopover, IonRouterOutlet, IonButton, IonContent, IonItem, IonLabel, IonList, IonListHeader, useIonPopover, IonPage, IonIcon, IonMenuToggle, IonToast } from '@ionic/react';
import { Link, useHistory, Router, Route } from 'react-router-dom';
import { useRouter } from 'next/router';
import { IonReactRouter } from '@ionic/react-router';

/* Components */
import ProfilePlaceholder from '../../assets/images/profile_placeholder.png';
import Gravatar from 'react-gravatar';
import Account from '../../pages/Account';

import { BellIcon } from '@heroicons/react/outline'

/* Contexts */
import { DarkModeProvider } from '../../context/DarkModeContext';

/* Design */
import Hexagon from '../Hexagon/Hexagon';
import { moon } from 'ionicons/icons';

/* User */
import { useCurrentUser, useDispatchCurrentUser } from '../../context/AuthContext';
import { callApi } from '../../utils/utils';

const PopoverList = ({ onHide }) => {

  



    return (
      <div>
        <IonPopover
        isOpen={show}
        onDidDismiss={() => setShow(false)}
        event={popoverEvent}
      >

      
      <div>
    
    {/* <IonList>
        <IonListHeader>Account options</IonListHeader>
        <IonItem routerLink='/account' >Account</IonItem>
        

        <IonItem button onClick={() => setShowModal(true)} >Sign out</IonItem>

        <IonItem button routerLink={"/players"} routerDirection="none">
            <IonLabel>Players</IonLabel>
        </IonItem>


        <IonItem button>Documentation</IonItem>
        <IonItem button>Showcase</IonItem>
        <IonItem button>GitHub Repo</IonItem>

        <IonItem lines="none">
            <IonIcon slot="start" icon={moon} />
            <IonLabel>Dark Mode</IonLabel>
            <IonToggle slot="end" name="darkMode" onIonChange={toggleDarkModeHandler} />
        </IonItem>
        

        <IonItem lines="none" detail={false} button onClick={onHide}>
            Close
        </IonItem>
    </IonList> */}

  <IonList>
    <IonListHeader>Account options</IonListHeader>
    <IonItem routerLink='/account' >Account</IonItem>
            

    <IonItem lines="none" detail={false} button onClick={onHide}>
        Close
    </IonItem>
  </IonList>



    {/* <IonModal
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
            <h3>Account sign out</h3>
            <div className="mb-8">
              
              <p>If you would like to sign out please use the button below</p>
              
            </div>
            <button
              className="w-full px-3 py-4 font-medium text-white bg-blue-600 rounded-lg"
              onClick={handleLogout}
            >
              Sign out
            </button>
            
          </div>
          </div>
        </div>
        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <IonToast
            isOpen={showToast1}
            onDidDismiss={() => setShowToast1(false)}
            message={`Your account ${user.username} has been deleted`}
            duration={1000}
          />
        </div>
          
        <IonButton onClick={() => {setShowModal(false)}}>Close Modal</IonButton>
      </IonModal> */}
      </div>

      </IonPopover>
      </div>
    )
  };

  
  const DropdownHeadless = () => {
    /* const [present, dismiss] = useIonPopover(PopoverList, {
      onHide: () => dismiss(),
    }); */


    const [ show, setShow ] = useState(false);
    const [ popoverEvent, setPopoverEvent ] = useState();


    const loggedInUser = useCurrentUser();

  const dispatchUser = useDispatchCurrentUser();
  const [showToast1, setShowToast1] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter()

  /* Dark mode */
  const [theme, setTheme] = useState('light');
  
  const toggleDarkModeHandler = () => {
      theme === 'light' ? setTheme('dark') : setTheme('light');
      document.body.classList.toggle('dark');
  }

  useEffect(() => {
      const data = localStorage.getItem('dark-mode');
      if (data) {
      setTheme(JSON.parse(data));
      }
      localStorage.setItem('dark-mode', JSON.stringify(theme))
  }, [])


  /* Sign out */
  const handleLogout = async () => {
    localStorage.removeItem('token');
    await callApi({ path: '/logout', method: 'POST' });
    dispatchUser({ type: 'LOGOUT' });
    setShowModal(false)
    history.push('/');
  };



    return (

        <div
        
        >
          
          <IonButton
          gamertag={loggedInUser.gamertag}
          image_profile={loggedInUser.image_profile}
          className="relative w-12"
          onClick={e => { e.persist(); setPopoverEvent(e); setShow(true); }}
        >
          
          <div>
            {loggedInUser.image_profile ? (
              <img
              className="h-8 w-8 m-auto bg-no-repeat bg-cover rounded-full z-20 absolute top-0 left-0 border-2 border-primary bg-white"
              style={{
                backgroundImage: `url(${loggedInUser.image_profile && loggedInUser.image_profile.url})`,
              }}
            />
            ) : (
              <div
              className="h-8 w-8 m-auto bg-no-repeat bg-cover absolute top-0 left-0 "
              >
                <div
                  
                  style={{ backgroundImage: `url(${ProfilePlaceholder})` }}
                  alt={`Profile name ${loggedInUser.gamertag}`}
                >
                  {/* /* Change default to placeholder image */}
                  <Gravatar
                    size={1600}
                    rating="pg"
                    default={ProfilePlaceholder}
                    email={loggedInUser.email}
                    className="bg-no-repeat bg-cover rounded-full overflow-hidden absolute top-0 left-0 text-transparent"
                  />
                </div>
              </div>
            )}
            

            
          </div>
        </IonButton>

        <IonPopover
            isOpen={show}
            onDidDismiss={() => setShow(false)}
            event={popoverEvent}
          >
            <IonList>
              <IonListHeader>Account options</IonListHeader>
              <IonItem routerLink='/account' >Account</IonItem>
                      

              <IonItem lines="none" detail={false} onClick={e => {setShow(false) }}>
                  Close
              </IonItem>
            </IonList>
          </IonPopover>

        

    </div>
    );
  };

export default DropdownHeadless