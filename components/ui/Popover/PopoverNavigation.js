import React, { useEffect, useState } from 'react';
import { IonPopover, IonRouterOutlet, IonButton, IonContent, IonItem, IonLabel, IonList, IonListHeader, useIonPopover, IonPage, IonIcon, IonMenuToggle, IonToast } from '@ionic/react';
import { Link, useHistory, Router, Route } from 'react-router-dom';
import { useRouter } from 'next/router';
import { IonReactRouter } from '@ionic/react-router';

/* Components */
import ProfilePlaceholder from '../../assets/images/profile_placeholder.png';
import Gravatar from 'react-gravatar';
import Account from '../../pages/Account';

import { BellIcon } from '@heroicons/react/outline';
import { DotsVerticalIcon, DotsHorizontalIcon } from '@heroicons/react/solid';

/* Contexts */
import { DarkModeProvider } from '../../context/DarkModeContext';

/* Design */
import Hexagon from '../Hexagon/Hexagon';
import { moon } from 'ionicons/icons';

/* User */
import { useCurrentUser, useDispatchCurrentUser } from '../../context/AuthContext';
import { callApi } from '../../utils/utils';

const PopoverAccount = () => {
   

  const [ show, setShow ] = useState(false);
  const [ popoverEvent, setPopoverEvent ] = useState();



    return (

        <div>
          
          <DotsHorizontalIcon 
            className="h-8 w-8 bg-light p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" aria-hidden="true"
            onClick={e => { e.persist(); setPopoverEvent(e); setShow(true); }}
          />
      

        <IonPopover
            isOpen={show}
            onDidDismiss={() => setShow(false)}
            event={popoverEvent}
          >
            <IonList>
              {/* <IonListHeader>Account options</IonListHeader> */}
              <IonItem 
                routerLink='/specialists'
                className="xxs:block xs:block sm:hidden md:hidden lg:hidden xl:hidden"
                onClick={e => {setShow(false) }}
              >Specialists</IonItem>

              <IonItem 
                routerLink='/teams'
                className="xxs:block xs:block sm:hidden md:hidden lg:hidden xl:hidden"
                onClick={e => {setShow(false) }}
              >Teams</IonItem>

              <IonItem 
                routerLink='/organisations'
                className="xxs:block xs:block sm:hidden md:hidden lg:hidden xl:hidden"
                onClick={e => {setShow(false) }}
              >Organisations</IonItem>

              <IonItem 
                routerLink='/communities'
                className="xxs:block xs:block sm:block md:block lg:hidden xl:hidden"
                onClick={e => {setShow(false) }}
              >Communities</IonItem>  

              {/* <IonItem 
                routerLink='/jobs'
                className="xxs:block xs:block sm:block md:block lg:hidden xl:hidden"
                onClick={e => {setShow(false) }}
              >Jobs</IonItem>  */}  

              {/* <IonItem 
                routerLink='/events'
                className="xxs:block xs:block sm:block md:block lg:block xl:hidden"
                onClick={e => {setShow(false) }}
              >Events</IonItem>   */} 

              <IonItem 
                routerLink='/games'
                className="xxs:block xs:block sm:block md:block lg:block xl:hidden"
                onClick={e => {setShow(false) }}
              >Games</IonItem>       
              

              <IonItem lines="none" detail={false} button onClick={e => {setShow(false) }}>
                  Close
              </IonItem>
            </IonList>


          </IonPopover>

        

    </div>
    );
  };

  export default PopoverAccount
