import { 
  IonBackButton,
  IonButtons, 
  IonContent, 
  IonHeader, 
  IonLoading, 
  IonPage, 
  IonRouterLink, 
  IonSpinner, 
  IonTitle, 
  IonToolbar 
} from '@ionic/react';

/* Components */
import { NavButtons } from '../ui/Buttons/NavButtons';
import Hexagon from '../ui/Hexagon/Hexagon';
import CardUser from '../ui/Card/CardUser';
import CardGrid from '../ui/CardGrid/CardGrid';
import Pagination from '../ui/Pagination/Pagination';
import Footer from '../ui/Footer/Footer';
import SelectUsers from '../ui/Select/SelectUsers';
import SelectListUsers from '../ui/SelectList/SelectListUsers';
import TabsHeadlessUi from '../ui/Tabs/TabsHeadlessUi';

import HeaderLanding from '../ui/Header/HeaderLanding';

import Twitter1 from '../assets/images/twitter_1.png';
import Twitter2 from '../assets/images/twitter_2.png';
import Twitter3 from '../assets/images/twitter_3.png';

/* User */
import { callApi } from '../utils/utils';
import { useEffect, useState } from 'react';

/* Headless UI */
import { Disclosure } from '@headlessui/react'

/* Redux */
import { useDispatch, useSelector } from 'react-redux';


const Commentators = () => {

  const users = useSelector((state) => state.allData.users);
  const teams = useSelector((state) => state.allData.teams);
  const organisations = useSelector((state) => state.allData.organisations);
  const communities = useSelector((state) => state.allData.communities);
  const games = useSelector((state) => state.allData.games);
  const characters = useSelector((state) => state.allData.characters);

  const [showLoading, setShowLoading] = useState(true);

  const [userId, setUserId] = useState(null)
  const [teamId, setTeamId] = useState(null)
  const [gamesId, setGameId] = useState([])

    return (
      <IonPage >
        <IonHeader >
          <title>Commentators</title>
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
        <IonContent fullscreen className="" >
        <div className="mt-8">

          <div className="max-width px-4">
              <h1 className="">Commentators</h1>

              <TabsHeadlessUi
                tab1title="List"
                tab1={
                  
                <div className=" mb-8 grid grid-cols-1 lg:gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
               
                <section className="xs:my-8 lg:col-start-1 w-full">
                  <div className="bg-light px-4 py-5 shadow rounded-lg ">

                  <Disclosure>
                      <Disclosure.Button className="w-full px-3 py-4 font-medium text-dark bg-primary hover:bg-dark hover:text-light rounded-lg">
                        Filters
                      </Disclosure.Button>
                      <Disclosure.Panel>
                        <div className="flex flex-col w-full">

                          <SelectUsers 
                            style1="pt-4"
                            users={users}
                            setUserId={setUserId}
                            teams={teams}
                            setTeamId={setTeamId} 
                            organisations={organisations}
                            games={games}
                            setGameId={setGameId}
                          />

                        </div>
                      </Disclosure.Panel>
                    </Disclosure>

                  </div>
                </section>
                
                    <div className="lg:-mt-10 xl:-mt-10 col-span-2">

                      <SelectListUsers 
                        userId={userId}
                        teamId={teamId}
                        gamesId={gamesId}
                      />

                    </div>
              </div>
                }   
                tab2title="Map"
                tab2={
                  <div></div>
                }
              />

                
            </div>
            <Footer/>
        </div>
        
      </IonContent>
      </IonPage>
    )
}

export default Commentators