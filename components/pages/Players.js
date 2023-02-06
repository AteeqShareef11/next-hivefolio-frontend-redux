import { 
  IonBackButton,
  IonButton,
  IonButtons, 
  IonContent, 
  IonHeader, 
  IonLoading, 
  IonPage, 
  IonPopover, 
  IonRouterLink, 
  IonSpinner, 
  IonTitle, 
  IonToolbar 
} from '@ionic/react';

import React, {useRef} from 'react';

/* Components */
import { NavButtons } from '../ui/Buttons/NavButtons';
import Hexagon from '../ui/Hexagon/Hexagon';
import Footer from '../ui/Footer/Footer';
import SelectUsers from '../ui/Select/SelectUsers';
import SelectListUsers from '../ui/SelectList/SelectListUsers';
import TabsHeadlessUi from '../ui/Tabs/TabsHeadlessUi';
import UpsellcomingSoon from '../ui/Upsell/UpsellComingSoon';

import CardUsers from '../ui/Users/CardUsers';

import HeaderLanding from '../ui/Header/HeaderLanding';

import Twitter1 from '../assets/images/twitter_1.png';
import Twitter2 from '../assets/images/twitter_2.png';
import Twitter3 from '../assets/images/twitter_3.png';

import PopoverAccount2 from '../ui/Popover/PopoverAccount2'

/* Headless UI */
import { Disclosure } from '@headlessui/react';


/* User */
import { callApi } from '../utils/utils';
import { useEffect, useState } from 'react';

/* Redux */
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, fetchTeams, fetchOrganisations, fetchCommunities, fetchGames, fetchCharacters } from '../redux/actions/coreActions';

const Players = () => {

  const dispatch = useDispatch();

  const users = useSelector((state) => state.allData.users);
  const teams = useSelector((state) => state.allData.teams);
  const organisations = useSelector((state) => state.allData.organisations);
  const communities = useSelector((state) => state.allData.communities);
  const games = useSelector((state) => state.allData.games);
  const characters = useSelector((state) => state.allData.characters);

  const [userId, setUserId] = useState(null);
  const [teamId, setTeamId] = useState(null);
  const [organisationId, setOrganisationId] = useState(null);
  const [gamesId, setGameId] = useState([]);
  const [typeuserId, setTypeuserId] = useState([]);

  const contentRef = useRef(null);
  const scrollToTop= () => {
      contentRef.current && contentRef.current.scrollToTop();
  };

  const [ show, setShow ] = useState(false);
const [ popoverEvent, setPopoverEvent ] = useState();
  

    return (
      <IonPage >
        <IonHeader >
          <title>Players</title>
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
        <IonContent fullscreen className="" ref={contentRef} scrollEvents={true}>
        <div className="mt-8">

          <div className="max-width px-4">
              
            <HeaderLanding
              title="Players"
              sub_title="Discover and network with esports players"
              image_background={Twitter2}
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

                          <SelectUsers 
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
                            games={games}
                            setGameId={setGameId}
                            showGames
                            //setTypeuserId={setTypeuserId}
                          />

                        </div>
                      </Disclosure.Panel>
                    </Disclosure>

                  </div>
                </section>
          
                <div className="xs:-mt-8 sm:-mt-8 md:-mt-12 lg:-mt-10 lg:-mt-4 xl:-mt-10 col-span-2">

                  <SelectListUsers 
                    userId={userId}
                    teamId={teamId}
                    organisationId={organisationId}
                    gamesId={gamesId}
                    //typeuserId={typeuserId}
                    scrollUp={true}
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
                  <UpsellcomingSoon/>
                }
              /> */}

               
                
              {/* <IonButton onClick={()=>scrollToTop()}>Scroll to top</IonButton> */}
            </div>
            <Footer/>
        </div>

        {/* 
          <TabsHeadlessUi
            tab1title="List"
            tab1={
              <div></div>
            }   
            tab2title="Map"
            tab2={
              <div></div>
            }
          />
        */}

{/* <>

<>
      <IonButton onClick={e => { e.persist(); setPopoverEvent(e); setShow(true); }}>Show Me</IonButton>
      <IonPopover
        isOpen={show}
        onDidDismiss={() => setShow(false)}
        event={popoverEvent}
      >
      Content Here
      </IonPopover>
  </>
<PopoverAccount2/>


      
    </> */}
        
      </IonContent>
      </IonPage>
    )
}

export default Players