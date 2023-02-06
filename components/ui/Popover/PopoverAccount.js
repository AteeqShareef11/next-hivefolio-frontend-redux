import React, { useEffect, useState } from 'react';
import { IonPopover, IonRouterOutlet, IonButton, IonContent, IonItem, IonLabel, IonList, IonListHeader, useIonPopover, IonPage, IonIcon, IonMenuToggle, IonToast } from '@ionic/react';
import { Link, useParams } from 'react-router-dom';
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

/* Redux */
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserId, removeSelectedUser } from '../../redux/actions/coreActions';

  
const PopoverAccount = () => {
  const dispatch = useDispatch();

  const [ show, setShow ] = useState(false);
  const [ popoverEvent, setPopoverEvent ] = useState();

  const loggedInUser = useCurrentUser();
  const { id } = loggedInUser;

  const { username } = useParams();

  const dispatchUser = useDispatchCurrentUser();
  const [showToast1, setShowToast1] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter()

  //const {username} = loggedInUser;

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

  /* Add type to user type list */
  const handleRefreshUser = async (event) => {
    dispatch(removeSelectedUser());
    dispatch(fetchUserId(id));
    //console.log("PopoverAccount handleRefreshUser")
  }


    return (

        <div>
          
          <IonButton
            gamertag={loggedInUser.gamertag}
            image_profile={loggedInUser.image_profile}
            className="relative w-12"
            onClick={e => { e.persist(); setPopoverEvent(e); setShow(true); }}
          >
          
          <div>
            {loggedInUser.image_profile ? (
              <div
              className="mx-auto bg-cover bg-no-repeat h-8 w-8 image-placeholder rounded-full border-2 border-primary bg-white"
              style={{
                backgroundImage: `url(${loggedInUser.image_profile && loggedInUser.image_profile.url})`,
              }}
              alt={`Profile name ${loggedInUser.gamertag}`}
            >
            </div>
            ) : (
              <div
              className="h-8 w-8 m-auto bg-no-repeat bg-cover absolute top-0 left-0 rounded-full"
              >
                <div
                  className="mx-auto bg-cover bg-no-repeat h-8 w-8 image-placeholder rounded-full placeholder overflow-hidden text-transparent border-2 border-primary bg-white"
                  /* className="hexagonImage element placeholder overflow-hidden text-transparent" */
                  style={{ backgroundImage: `url(${ProfilePlaceholder})` }}
                  alt={`Profile name ${loggedInUser.username}`}
                >
                  
                </div>
                  {/* /* Change default to placeholder image */}
                  {/* <Gravatar
                    size={1600}
                    rating="pg"
                    default={ProfilePlaceholder}
                    email={loggedInUser.email}
                    className="bg-no-repeat bg-cover rounded-full overflow-hidden absolute top-0 left-0 text-transparent"
                  /> */}
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
              <IonItem 
                routerLink='/account' 
                onClick={e => {
                  setShow(false) 
                  handleRefreshUser(id)
                }}
              >
                Account
              </IonItem>
                {username ? (
                  <IonItem 
                    routerLink={`${loggedInUser.username}`} 
                    onClick={e => {setShow(false) }}
                  >
                    View profile
                  </IonItem>
                ) : (
                  <IonItem 
                    routerLink={`user/${loggedInUser.username}`} 
                    onClick={e => {setShow(false) }}
                  >
                    View profile
                  </IonItem>
                )}
                
                      

              <IonItem lines="none" detail={false} onClick={e => {setShow(false) }}>
                  Close
              </IonItem>
            </IonList>
          </IonPopover>

        

    </div>
    );
  };

export default PopoverAccount