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
import { useState } from 'react';

/* Components */
import { NavButtons } from '../ui/Buttons/NavButtons';
import Hexagon from '../ui/Hexagon/Hexagon';
import Footer from '../ui/Footer/Footer';
import SelectGames from '../ui/Select/SelectGames';
import SelectListGames from '../ui/SelectList/SelectListGames';

import HeaderLanding from '../ui/Header/HeaderLanding';

import Twitter1 from '../assets/images/twitter_1.png';
import Twitter2 from '../assets/images/twitter_2.png';
import Twitter3 from '../assets/images/twitter_3.png';

/* Headless UI */
import { Disclosure } from '@headlessui/react'

/* Redux */
import { useDispatch, useSelector } from 'react-redux';

const Games = () => {

  const users = useSelector((state) => state.allData.users);
  const teams = useSelector((state) => state.allData.teams);
  const organisations = useSelector((state) => state.allData.organisations);
  const communities = useSelector((state) => state.allData.communities);
  const games = useSelector((state) => state.allData.games);
  const characters = useSelector((state) => state.allData.characters);

  const [userId, setUserId] = useState(null)
  const [teamId, setTeamId] = useState(null)
  const [organisationId, setOrganisationId] = useState(null)
  const [gameId, setGameId] = useState(null)

    return (
      <IonPage >
      <IonHeader >
        <title>Games</title>
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
            title="Games"
            sub_title="Discover and follow your favourite games"
            //image_background={Twitter2}
          />

              {/* Section 1 */}
              <div className=" mb-8 grid grid-cols-1 lg:gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">

              {/* Filters */}
              <section className="xs:my-8 lg:col-start-1 w-full">
                <div className="bg-light px-4 py-5 shadow rounded-lg ">
                  
                  <Disclosure>
                    <Disclosure.Button className="w-full px-3 py-4 font-medium text-dark bg-primary hover:bg-dark hover:text-light rounded-lg">
                      Filters
                    </Disclosure.Button>
                    <Disclosure.Panel>
                      <div className="flex flex-col w-full">

                        <SelectGames 
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
                        />

                      </div>
                    </Disclosure.Panel>
                  </Disclosure>

                </div>


              </section>
              {/* Content */}
                  <div className="xs:-mt-4 sm:-mt-4 md:-mt-12 lg:-mt-10 xl:-mt-10 col-span-2">

                    <SelectListGames 
                      userId={userId}
                      teamId={teamId}
                      organisationId={organisationId}
                      gameId={gameId}
                    />

                  </div>
            </div>

            

            
              
          </div>
          <Footer/>
      </div>
      
    </IonContent>
    </IonPage>
    )
}

export default Games



