import { 
  IonBackButton,
  IonButtons, 
  IonContent, 
  IonHeader, 
  IonLoading, 
  IonPage, 
  IonRouterLink, 
  IonSpinner, 
  IonToolbar 
} from '@ionic/react';
import { useContext, useEffect, useState } from 'react';

/* User */;
import { useCurrentUser } from '../context/AuthContext';

/* Components */
import { NavButtons } from '../ui/Buttons/NavButtons';
import Hexagon from '../ui/Hexagon/Hexagon';
import Footer from '../ui/Footer/Footer';

import SelectTeams from '../ui/Select/SelectTeams';
import SelectListTeams from '../ui/SelectList/SelectListTeams';
import TabsHeadlessUi from '../ui/Tabs/TabsHeadlessUi';
import HeaderLanding from '../ui/Header/HeaderLanding';

import Twitter1 from '../assets/images/twitter_1.png';
import Twitter2 from '../assets/images/twitter_2.png';
import Twitter3 from '../assets/images/twitter_3.png';

/* User */
import { callApi } from '../utils/utils';

/* Headless UI */
import { Disclosure } from '@headlessui/react'

/* Redux */
import { useDispatch, useSelector } from 'react-redux';

const Teams = () => {

  const LoggedInUser = useCurrentUser();

  const users = useSelector((state) => state.allData.users);
  const teams = useSelector((state) => state.allData.teams);
  const organisations = useSelector((state) => state.allData.organisations);
  const communities = useSelector((state) => state.allData.communities);
  const games = useSelector((state) => state.allData.games);
  const characters = useSelector((state) => state.allData.characters);

  const [teamId, setTeamId] = useState(null)
  const [userId, setUserId] = useState(null)
  const [organisationId, setOrganisationId] = useState(null)
  const [gameId, setGameId] = useState(null)

    return (
      <IonPage >
      <IonHeader >
        <title>Teams</title>
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
                  
          <HeaderLanding
            title="Teams"
            sub_title="Discover and network with esports teams"
            image_background={Twitter2}
            button_link="/create-team"
            button_link_title="Create a Team"
          />

          <div className=" mb-8 grid grid-cols-1 lg:gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">

              <section className="xs:my-8 lg:col-start-1 w-full">
                <div className="bg-light px-4 py-5 shadow rounded-lg ">

                  <Disclosure>
                      <Disclosure.Button className="w-full px-3 py-4 font-medium text-dark bg-primary hover:bg-dark hover:text-light rounded-lg">
                        Filters
                      </Disclosure.Button>
                      <Disclosure.Panel>
                        <div className="flex flex-col w-full">

                          <SelectTeams 
                            style1="pt-4"
                            users={users}
                            setUserId={setUserId}
                            teams={teams}
                            setTeamId={setTeamId} 
                            organisations={organisations}
                            setOrganisationId={setOrganisationId} 
                            games={games}
                            setGameId={setGameId}
                      
                          />

                        </div>
                      </Disclosure.Panel>
                    </Disclosure>

                </div>


              </section>
           
                  <div className="xs:-mt-4 sm:-mt-4 md:-mt-12 lg:-mt-10 xl:-mt-10 col-span-2">

                      <SelectListTeams 
                        userId={userId}
                        teamId={teamId}
                        organisationId={organisationId}
                        gameId={gameId}
                      />

                  </div>
                  
            </div>

            {/* <TabsHeadlessUi
              tab1title="List"
              tab1={
                <div></div>
              }   
              tab2title="Map"
              tab2={
                <div></div>
              }
            /> */}

              

          </div>
        
      </div>
      <Footer/>
    </IonContent>
    </IonPage>
    )
};

export default Teams