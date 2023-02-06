import { 
  IonBackButton,
  IonButtons, 
  IonContent, 
  IonHeader, 
  IonLoading, 
  IonPage, 
  IonRouterLink, 
  IonTitle, 
  IonToolbar 
} from '@ionic/react';

/* Components */
import { NavButtons } from '../ui/Buttons/NavButtons';
import Hexagon from '../ui/Hexagon/Hexagon';
import Footer from '../ui/Footer/Footer';
import { Link } from 'react-router-dom';

import Twitter1 from '../assets/images/twitter_1.png';
import Twitter2 from '../assets/images/twitter_2.png';
import Twitter3 from '../assets/images/twitter_3.png';


const Create = () => {
    return (
        <IonPage >
      <IonHeader >
        <title>Create</title>
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
        
        <div className="max-width">
          <div className="mt-8 mx-8">
            <h1>Create</h1>
            <h3>Team, organisation or community</h3>
          </div>
            <div className="mx-8 mt-12 grid gap-5 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 lg:max-w-none">

              {/* Card 1 */}
              <Link to="/create-team" class="flex flex-col overflow-hidden rounded-lg shadow-lg bg-white hover:bg-primary">
              <div key="" className="flex flex-col rounded-lg overflow-hidden">
                <div className="flex-shrink-0">
                  {/* <img className="h-48 w-full object-cover" src="https://wave.devdojo.com/storage/posts/March2018/h86hSqPMkT9oU8pjcrSu.jpg" alt="" /> */}
                  <img className="h-48 w-full object-cover" src={Twitter1} alt="" />
                </div>
                  <div class="flex flex-col justify-between flex-1 p-6 hover:bg-primary">
                      <div class="flex-1">
                          <span class="mt-2 text-base font-semibold leading-tight leading-7 text-gray-900 sm:text-xl">
                              Create a team
                          </span>
                          <span class="block mt-3 text-xs leading-6 text-dark sm:text-sm">
                              Start a team, bring players, coaches and your team content into one space.
                          </span>
                      </div>
                    </div>
                </div>
              </Link>


              {/* Card 2 */}
              <Link to="/create-organisation" class="flex flex-col overflow-hidden rounded-lg shadow-lg bg-white hover:bg-primary">
              <div key="" className="flex flex-col rounded-lg overflow-hidden">
                <div className="flex-shrink-0">
                  <img className="h-48 w-full object-cover" src={Twitter2} alt="" />
                </div>
                  <div class="flex flex-col justify-between flex-1 p-6 hover:bg-primary">
                      <div class="flex-1">
                          <span class="mt-2 text-base font-semibold leading-tight leading-7 text-gray-900 sm:text-xl">
                              Create a organisation
                          </span>
                          <span class="block mt-3 text-xs leading-6 text-dark sm:text-sm">
                              Create an organisation, centralise your content, players, teams and streams in one space.
                          </span>
                      </div>
                    </div>
                </div>
              </Link>

              {/* Card 3 */}
              <Link to="/create-community" class="flex flex-col overflow-hidden rounded-lg shadow-lg bg-white hover:bg-primary">
              <div key="" className="flex flex-col rounded-lg overflow-hidden">
                <div className="flex-shrink-0">
                  <img className="h-48 w-full object-cover" src={Twitter3} alt="" />
                </div>
                  <div class="flex flex-col justify-between flex-1 p-6 hover:bg-primary">
                      <div class="flex-1">
                          <span class="mt-2 text-base font-semibold leading-tight leading-7 text-gray-900 sm:text-xl">
                              Create a community
                          </span>
                          <span class="block mt-3 text-xs leading-6 text-dark sm:text-sm">
                              Bring together members with an open or closed community space.
                          </span>
                      </div>
                    </div>
                </div>
              </Link>
            </div>
        </div>
          <Footer/>
      </IonContent>
    </IonPage>
    )
}

export default Create