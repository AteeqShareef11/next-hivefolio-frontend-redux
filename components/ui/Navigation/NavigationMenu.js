import { 
    IonContent, 
    IonHeader, 
    IonLabel, 
    IonMenu, 
    IonMenuToggle, 
    IonTitle, 
    IonToolbar, 
    IonList, 
    IonItem, 
    IonIcon, 
    IonToggle 
} from '@ionic/react';

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

/* APIs */
import { callApi } from '../../utils/utils';

/* User */
import { useCurrentUser, useDispatchCurrentUser } from '../../context/AuthContext';
import { DarkModeProvider } from '../../context/DarkModeContext';

/* Design */
import Hexagon from '../Hexagon/Hexagon';
import { moon } from 'ionicons/icons';

export const NavigationMenu = () => {

    const user = useCurrentUser();
    const dispatch = useDispatchCurrentUser();
    const history = useHistory();
    const [openCommunity, setOpenCommunity] = useState();
    const [theme, setTheme] = useState('light');

    console.log("user boolean", user.boolean_darkmode)

    /* const handleLogout = async () => {
        localStorage.removeItem('token')
        await callApi({path: "/logout", method: "POST"}) 
        dispatch({ type: "LOGOUT"})
        history.push('/')
    } */

    /* const toggleDarkModeHandler = () => {
        (user.boolean_darkmode === false) ? setTheme('dark') : setTheme('light');
        document.body.classList.toggle('dark');
    } */

    useEffect(() => {
        /* toggleDarkModeHandler(); */
    })

    /* Dark mode */
    /* const [theme, setTheme] = useState('light');
    

    const toggleDarkModeHandler = () => {
        theme === 'light' ? setTheme('dark') : setTheme('light');
        document.body.classList.toggle('dark');
    }

    useEffect(() => {
        const data = localStorage.getItem('dark-mode');
        if (data) {
        setTheme(JSON.parse(data));
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('dark-mode', JSON.stringify(theme))
    }) */

    /* const changeTheme = DarkModeProvider(); */

    return (
        <IonMenu side="end" contentId="main">
            <IonHeader>
                <IonToolbar color="light" className="bg-white">
                    <IonTitle>Menu</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    {!user.isAuthenticated && (
                        <IonMenuToggle auto-hide="false" >
                            <IonItem button routerLink={"/authportal"} routerDirection="none" >
                                <IonLabel >Sign In</IonLabel>
                            </IonItem>
                        </IonMenuToggle>
                    )}
                    
                    {!user.isAuthenticated && (
                        <IonMenuToggle auto-hide="false">
                            <IonItem button routerLink={"/authportal"} routerDirection="none">
                                <IonLabel>Sign Up</IonLabel>
                            </IonItem>
                        </IonMenuToggle>                        
                    )}

                    {user.isAuthenticated && (
                        <IonMenuToggle auto-hide="false">
                            <IonItem button routerLink={"/create"} routerDirection="none">
                                <IonLabel>Create</IonLabel>
                            </IonItem>
                        </IonMenuToggle>
                    )}

                    {/* <IonMenuToggle auto-hide="false">
                        <IonItem button routerLink={"/events"} routerDirection="none">
                            <IonLabel>Events</IonLabel>
                        </IonItem>
                    </IonMenuToggle> */}
                    {/* <IonMenuToggle auto-hide="false">
                        <IonItem button routerLink={"/events"} routerDirection="none">
                            <IonLabel>Events</IonLabel>
                        </IonItem>
                    </IonMenuToggle> */}
                    <IonMenuToggle auto-hide="false">
                        <IonItem button routerLink={"/games"} routerDirection="none">
                            <IonLabel>Games</IonLabel>
                        </IonItem>
                    </IonMenuToggle>
                    <IonMenuToggle auto-hide="false">
                        <IonItem button routerLink={"/characters"} routerDirection="none">
                            <IonLabel>Characters</IonLabel>
                        </IonItem>
                    </IonMenuToggle>
                    {/* <IonMenuToggle auto-hide="false">
                        <IonItem button routerLink={"/scores"} routerDirection="none">
                            <IonLabel>Scores</IonLabel>
                        </IonItem>
                    </IonMenuToggle> */}
                                       

                    <IonMenuToggle auto-hide="false">
                        <IonItem button routerLink={"/company"} routerDirection="none">
                            <IonLabel>Company (Hivefolio)</IonLabel>
                        </IonItem>
                    </IonMenuToggle>  

                    {/* Dark mode switch */}

                    {/* <IonList>
                        <IonItem lines="none">
                        <IonIcon slot="start" icon={moon} />
                        <IonLabel>Dark Mode</IonLabel>
                        <IonToggle slot="end" name="darkMode" onIonChange={toggleDarkModeHandler} />
                        </IonItem>
                    </IonList>  */}

                </IonList>
            </IonContent>
        </IonMenu>
    )
}

export default NavigationMenu