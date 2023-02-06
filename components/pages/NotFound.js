import { 
  IonButtons, 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonRouterLink, 
  IonTitle, 
  IonToolbar 
} from '@ionic/react';

/* Components */
import { NavButtons } from '../ui/Buttons/NavButtons';
import Footer from '../ui/Footer/Footer';

const NotFound = () => {
    return (
        <IonPage >
      <IonHeader >
        <title>Hivefolio - Build your brand, network and discover new career opportunities in Esports</title>
        <IonToolbar >
          <IonTitle>NotFound</IonTitle>
          <IonButtons slot="end">
            <NavButtons/>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen >
            Go to <IonRouterLink routerLink="/home">Home</IonRouterLink>
            <Footer/>
      </IonContent>
    </IonPage>
    )
}

export default NotFound