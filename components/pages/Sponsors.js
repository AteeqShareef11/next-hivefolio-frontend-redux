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

const Sponsors = () => {
    return (
        <IonPage >
      <IonHeader >
        <IonToolbar >
          <IonTitle>Sponsors</IonTitle>
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

export default Sponsors