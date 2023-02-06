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

/* User */;
import { useCurrentUser } from '../context/AuthContext';

/* Components */
import { NavButtons } from '../ui/Buttons/NavButtons';
import Hexagon from '../ui/Hexagon/Hexagon';
import Footer from '../ui/Footer/Footer';
import SelectCommunities from '../ui/Select/SelectCommunities';
import SelectListCommunities from '../ui/SelectList/SelectListCommunities';
import TabsHeadlessUi from '../ui/Tabs/TabsHeadlessUi';

import HeaderLanding from '../ui/Header/HeaderLanding';

import Twitter1 from '../assets/images/twitter_1.png';
import Twitter2 from '../assets/images/twitter_2.png';
import Twitter3 from '../assets/images/twitter_3.png';

/* Headless UI */
import { Disclosure } from '@headlessui/react'

/* User */
import { callApi } from '../utils/utils';
import { useEffect, useState } from 'react';

/* Redux */
import { useDispatch, useSelector } from 'react-redux';

const Communities = () => {

  const LoggedInUser = useCurrentUser();

  const users = useSelector((state) => state.allData.users);
  const teams = useSelector((state) => state.allData.teams);
  const organisations = useSelector((state) => state.allData.organisations);
  const communities = useSelector((state) => state.allData.communities);
  const games = useSelector((state) => state.allData.games);
  const characters = useSelector((state) => state.allData.characters);

  const [userId, setUserId] = useState(null)
  const [teamId, setTeamId] = useState(null)
  const [organisationId, setOrganisationId] = useState(null)
  const [communityId, setCommunityId] = useState(null)
  const [gamesId, setGameId] = useState([])
  

    return (
      <IonPage >
        <IonHeader >
          <title>Communities</title>
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
            title="Communities"
            sub_title="Discover and network with esports communities"
            image_background={Twitter3}
            button_link="/create-community"
            button_link_title="Create a Community"
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

                          <SelectCommunities 
                            style1="pt-4"
                            users={users}
                            setUserId={setUserId}
                            showUsers
                            teams={teams}
                            setTeamId={setTeamId} 
                            showTeams
                            organisations={organisations}
                            setOrganisationId={setOrganisationId}
                            showOrganisations
                            communities={communities}
                            setCommunityId={setCommunityId}
                            showCommunities
                            games={games}
                            setGameId={setGameId}
                            showGames
                          />

                        </div>
                      </Disclosure.Panel>
                    </Disclosure>

                  </div>


                </section>
         
                    <div className="xs:-mt-4 sm:-mt-4 md:-mt-12 lg:-mt-10 xl:-mt-10 col-span-2">

                        <SelectListCommunities 
                          userId={userId}
                          teamId={teamId}
                          organisationId={organisationId}
                          communityId={communityId}
                          gamesId={gamesId}
                        />
 
                    </div>                    
              </div>

              {/* <TabsHeadlessUi
                tab1title="List"
                tab1={
                  
                
                }   
                tab2title="Map"
                tab2={
                  <div></div>
                }
              /> */}

                

        
            </div>
            <Footer/>
        </div>
      </IonContent>
      </IonPage>
    )
}

export default Communities