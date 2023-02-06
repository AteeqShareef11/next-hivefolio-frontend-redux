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

/* Components */
import { NavButtons } from '../ui/Buttons/NavButtons';
import Hexagon from '../ui/Hexagon/Hexagon';
import UpsellComingSoon from '../ui/Upsell/UpsellComingSoon';
import Footer from '../ui/Footer/Footer';

import CardJob from '../ui/Job/CardJob';
import CardGrid from '../ui/CardGrid/CardGrid';

import SelectTeams from '../ui/Select/SelectTeams';
import SelectJobs from '../ui/Job/SelectJobs';
import SelectListTeams from '../ui/SelectList/SelectListTeams';
import SelectListJobs from '../ui/Job/SelectListJobs';
import TabsHeadlessUi from '../ui/Tabs/TabsHeadlessUi';

/* User */
import { callApi } from '../utils/utils';

/* Headless UI */
import { Disclosure } from '@headlessui/react'

/* Redux */
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../redux/actions/userActions';
import { fetchTeams } from '../redux/actions/teamActions';
import { fetchOrganisations } from '../redux/actions/organisationActions';
import { fetchCommunities } from '../redux/actions/communityActions';
import { fetchGames } from '../redux/actions/gameActions';
import { fetchCharacters } from '../redux/actions/characterActions';
import { fetchJobs } from '../redux/actions/jobActions';
import { fetchTypejobs } from '../redux/actions/typeActions';




const Events = () => {

  //const [teams] = useState([]);
  //const [users] = useState([]);
  //const [organisations] = useState([]);
  //const [games] = useState([]);
  const [showLoading, setShowLoading] = useState(true);

  const [teamId, setTeamId] = useState(null);
  const [jobId, setJobId] = useState(null);
  const [typejobId, setTypejobId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [organisationId, setOrganisationId] = useState(null);
  const [gameId, setGameId] = useState(null);

  /* Redux */
  const dispatch = useDispatch();

  const users = useSelector((state) => state.allUsers.users);
  const jobs = useSelector((state) => state.allJobs.jobs);
  const teams = useSelector((state) => state.allTeams.teams);
  const organisations = useSelector((state) => state.allOrganisations.organisations);
  const communities = useSelector((state) => state.allCommunities.communities);
  const games = useSelector((state) => state.allGames.games);
  const characters = useSelector((state) => state.allCharacters.characters);
  const typejobs = useSelector((state) => state.allTypejobs.typejobs);


    return (
      <IonPage >
      <IonHeader >
        <title>Events</title>
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
            <h1 className="">Jobs</h1>

              {/* <UpsellComingSoon /> */}

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

                          <SelectJobs 
                            style1="pt-4"
                            users={users}
                            setUserId={setUserId}
                            teams={teams}
                            setTeamId={setTeamId} 
                            jobs={jobs}
                            setJobId={setJobId}
                            typejobs={typejobs}
                            setTypejobId={setTypejobId}
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
           
                  <div className="lg:-mt-10 xl:-mt-10 col-span-2">

                  <SelectListJobs 
                    userId={userId}
                    teamId={teamId}
                    jobId={jobId}
                    typejobId={typejobId}
                    organisationId={organisationId}
                    gameId={gameId}
                  />

                  </div>
                  
            </div>
            }   
            /* tab2title="Map"
            tab2={
              <div></div>
            } */
          />

              

          </div>
        
      </div>
      <Footer/>
    </IonContent>
    </IonPage>
    )
};

export default Events