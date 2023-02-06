import { 
  IonBackButton,
  IonButtons, 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonRouterLink, 
  IonSpinner, 
  IonToolbar 
} from '@ionic/react';

/* Components */
import { NavButtons } from '../ui/Buttons/NavButtons';
import Hexagon from '../ui/Hexagon/Hexagon';
import CardGame from '../ui/Card/CardGame';
import CardGrid from '../ui/CardGrid/CardGrid';
import Footer from '../ui/Footer/Footer';

/* User */
import { callApi } from '../utils/utils';
import { useCurrentUser } from '../context/AuthContext';
import { useEffect, useState } from 'react';

const Scores = () => {

  const user = useCurrentUser();
  const [games, setGames] = useState([]);
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  /* Fetching data */

  useEffect(() => {

    const getOrganisations = async () => {
      try {
        const data = await callApi({ path: '/games' });
        /* const data = await res.json(); */

        setGames(data)
        setLoading(false)
      } catch (err) {
        console.error(err)
      }
    }

    getOrganisations();
  }, []);


    return (
        <IonPage >
      <IonHeader >
        <title>Scores - {score.name}</title>
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
        <div className="mt-8">
          <div className="m-auto">
            {loading &&
              <IonSpinner/>
            }
          </div>

            <h1 className=" max-width px-4">Scores</h1>
          
            <div className="max-width">
              <div>
                <h2>Coming soon</h2>
              </div>
            </div>
          </div>
          <Footer/>
      </IonContent>
    </IonPage>
    )
}

export default Scores