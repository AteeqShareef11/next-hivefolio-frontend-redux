import { 
  IonButtons, 
  IonContent, 
  IonHeader, 
  IonLoading, 
  IonPage, 
  IonRouterLink, 
  IonTitle, 
  IonToolbar 
} from '@ionic/react';
import { memo, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { callApi } from '../utils/utils';

/* Components */
import BannerAnnouncement from '../ui/Banner/BannerAnnouncement';
import CardProfile from '../ui/Card/CardProfile';
import CarouselProfiles from '../ui/Carousel/CarouselProfiles';
import Hexagon from '../ui/Hexagon/Hexagon';
import CardUser from '../ui/Card/CardUser';
import CardTeam from '../ui/Card/CardTeam';
import CardJob from '../ui/Job/CardJob';
import CardTeamCopy from '../ui/Card/CardTeamCopy';
import CardOrganisation from '../ui/Card/CardOrganisation';
import CardGame from '../ui/Card/CardGame';
import CardCharacter from '../ui/Card/CardCharacter';
import CardCommunity from '../ui/Card/CardCommunity';
import CardTwitch from '../ui/Card/CardTwitch';
import CarouselCards from '../ui/Carousel/CarouselCards';
import HeaderFeaturedUser from '../ui/Header/HeaderFeaturedUser';
import HeaderFeaturedTeam from '../ui/Header/HeaderFeaturedTeam';
import HeaderFeaturedOrganisation from '../ui/Header/HeaderFeaturedOrganisation';
import HeaderFeaturedCommunity from '../ui/Header/HeaderFeaturedCommunity';
import SlidesCards from '../ui/Slides/SlideCards';
import UpsellSignUp from '../ui/Upsell/UpsellSignUp'
import { NavButtons } from '../ui/Buttons/NavButtons';
import DropdownAccount2 from '../ui/Dropdown/DropdownAccount2';
import Accordion from '../ui/Accordion/Accordion';
import Footer from '../ui/Footer/Footer';

import DropdownHeadless from '../ui/Dropdown/DropdownHeadless';
import ModalTest from '../ui/Modal/ModalTest';
import CardUsers from '../ui/Users/CardUsers';


/* Contexts */
import { useCurrentUser } from '../context/AuthContext';

/* Redux */
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../redux/actions/userActions';
import { fetchTeams } from '../redux/actions/teamActions';
import { fetchOrganisations } from '../redux/actions/organisationActions';
import { fetchCommunities } from '../redux/actions/communityActions';
import { fetchGames } from '../redux/actions/gameActions';
import { fetchCharacters } from '../redux/actions/characterActions';
import { fetchTypeusers } from '../redux/actions/typeuserActions';
import { fetchJobs } from '../redux/actions/jobActions';

const Home = memo(() => {

  const user = useCurrentUser();
  /* const [showLoading, setShowLoading] = useState(true);
  const [randomBanner, setRandomBanner] = useState(randomBannerNumber) */

  /* Redux */
  //const dispatch = useDispatch();

  /* const users = useSelector((state) => state.allUsers.users);
  const teams = useSelector((state) => state.allTeams.teams);
  const organisations = useSelector((state) => state.allOrganisations.organisations);
  const communities = useSelector((state) => state.allCommunities.communities);
  const games = useSelector((state) => state.allGames.games);
  const characters = useSelector((state) => state.allCharacters.characters);
  const jobs = useSelector((state) => state.allJobs.jobs);
  const typeusers = useSelector((state) => state.allTypeusers.typeusers); */

  /* const usersTwitch = users.filter((stream) => {
    return stream.stream_twitch !== undefined;
  }) */

  /* const teamsTwitch = teams.filter((stream) => {
    return stream.stream_twitch !== undefined;
  }) */

  /* const organisationsTwitch = organisations.filter((stream) => {
    return stream.stream_twitch !== undefined;
  }) */

  /* const communitiesTwitch = communities.filter((stream) => {
    return stream.stream_twitch !== undefined;
  }) */

  /* const gamesTwitch = games.filter((stream) => {
    return stream.stream_twitch !== undefined;
  }) */

  //const combinedTwitch = [...usersTwitch, ...teamsTwitch, ...organisationsTwitch, ...communitiesTwitch, ...gamesTwitch ];

  //let randomBannerNumber = Math.floor((Math.random() * 4) +1);

  /* useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchTeams());
    dispatch(fetchOrganisations());
    dispatch(fetchCommunities());
    dispatch(fetchGames());
    dispatch(fetchCharacters());
    dispatch(fetchJobs());
    dispatch(fetchTypeusers());
  }, []); */

  
  return (
    <IonPage className="">
     
      <IonHeader className="">
        <IonToolbar className="">
          <div className="flex pl-4">
            <IonRouterLink routerLink="/"><Hexagon/></IonRouterLink>
          </div>
          <IonButtons slot="end" >
            <NavButtons className=""/>
          </IonButtons>
        </IonToolbar>
        <title>Hivefolio</title>
      </IonHeader>
      <IonContent fullscreen>
        <div className="mt-8" >
          {/* <div className="m-auto">
            <IonLoading
              cssClass='my-custom-class'
              isOpen={showLoading}
              onDidDismiss={() => setShowLoading(false)}
              message={'Please wait...'}
            />
          </div> */}

          <div> 
            <BannerAnnouncement/> 

            {randomBannerNumber === 1 && (
              <div>
                {
                  users.sort(() => Math.random() - 0.5).slice(0,1).map(user => (
                    <HeaderFeaturedUser
                      key={user.id} 
                      id={user.id}
                      type_user={user.type_user}
                      games={user.games}
                      username={user.username}
                      gamertag={user.gamertag}
                      introduction={user.introduction}
                      image_profile={user.image_profile}
                      image_background={user.image_background}
                    />
                  ))
                } 
              </div>
            )} 

            {randomBannerNumber === 2 && (
          
              <div>
                {
                  teams.sort(() => Math.random() - 0.5).slice(0,1).map(team => (
                    <HeaderFeaturedTeam
                      team={team}
                      key={team.id} 
                      id={team.id}
                      type_team={team.type_team}
                      games={team.games}
                      username={team.username}
                      gamertag={team.gamertag}
                      introduction={team.introduction}
                      image_profile={team.image_profile}
                      image_background={team.image_background}
                    />
                  ))
                } 
              </div>
            )}  

            {randomBannerNumber === 3 && (
              <div>
                {
                  organisations.sort(() => Math.random() - 0.5).slice(0,1).map(organisation => (
                    <HeaderFeaturedOrganisation
                      organisation={organisation}
                      key={organisation.id} 
                      id={organisation.id}
                      type_organisation={organisation.type_organisation}
                      games={organisation.games}
                      username={organisation.username}
                      gamertag={organisation.gamertag}
                      introduction={organisation.introduction}
                      image_profile={organisation.image_profile}
                      image_background={organisation.image_background}
                    />
                  ))
                } 
              </div>
            )}  

            {randomBannerNumber === 4 && (
              <div>
                {
                  communities.sort(() => Math.random() - 0.5).slice(0,1).map(community => (
                    <HeaderFeaturedCommunity
                      community={community}
                      key={community.id} 
                      id={community.id}
                      type_community={community.type_community}
                      games={community.games}
                      username={community.username}
                      gamertag={community.gamertag}
                      introduction={community.introduction}
                      image_profile={community.image_profile}
                      image_background={community.image_background}
                    />
                  ))
                } 
              </div>
            )}  


            {/* <UsersList /> */}
            <CarouselProfiles>
              {
                users.sort(() => Math.random()).map(user => (
                  <CardProfile
                    id={user.id}
                    username={user.username}
                    image_profile={user.image_profile}
                    gamertag={user.gamertag}
                  />
                ))
              }
            </CarouselProfiles> 


            


            <div className="max-width">

            {/* <CarouselCards 
                titleText="Featured Jobs" 
                infinite={false}
                xl={1280} xlItems={3} xlScroll={3} xlInfinite={false}
                lg={1108} lgItems={2} lgScroll={2} lgInfinite={false}
                md={800} mdItems={2} mdScroll={2} mdInfinite={false}
                sm={700} smItems={2} smScroll={1} smInfinite={false}
                xs={320} xsItems={1} xsScroll={1} xsInfinite={false}
                linktext={"jobs"}
                link={`/jobs`}
              >
                {
                  jobs.sort(() => Math.random() - 0.5).map(job => (
                    <CardJob
                      id={job.id}
                      job={job}
                      username={job.username}
                      image_profile={job.image_profile} 
                      name={job.name}
                      location={job.location}
                      standard={true}
                    />
                  ))}
              </CarouselCards> */}
            
            <CarouselCards 
                titleText="Featured Streams" 
                infinite={false}
                xl={1280} xlItems={3} xlScroll={3} xlInfinite={false}
                lg={1108} lgItems={3} lgScroll={3} lgInfinite={false}
                md={800} mdItems={3} mdScroll={2} mdInfinite={false}
                sm={700} smItems={2} smScroll={1} smInfinite={false}
                xs={320} xsItems={1} xsScroll={1} xsInfinite={false}
                linktext={"players"}
                link={`/players`}
              >
                {
                  usersTwitch.sort(() => Math.random() - 0.5).map(user => (
                    <div>
                      <Link to={`/user/${user.username}`}
                        className="z-20 hover:bg-primary"
                      >
                        <CardTwitch
                          twitchId={user.stream_twitch}
                          height="99.99%"
                          link1={`/user/${user.username}`}
                          gamertag={user.gamertag}
                          games={user.games.map((sub) =>
                            sub.name
                          )}
                        />
                      </Link>
                    </div>
                    
                  ))}
              </CarouselCards>

              {/* <CarouselCards 
                titleText="Test Players" 
                infinite={false}
                xl={1280} xlItems={6} xlScroll={6} xlInfinite={false}
                lg={1108} lgItems={4} lgScroll={3} lgInfinite={false}
                md={800} mdItems={3} mdScroll={2} mdInfinite={false}
                sm={700} smItems={2} smScroll={1} smInfinite={false}
                xs={320} xsItems={1} xsScroll={1} xsInfinite={false}
                linktext={"players"}
                link={`/players`}
              >
                
              </CarouselCards> */}
              {/* <CardUsers/> */}
              
              <CarouselCards 
                titleText="Featured Players" 
                infinite={false}
                xl={1280} xlItems={6} xlScroll={6} xlInfinite={false}
                lg={1108} lgItems={4} lgScroll={3} lgInfinite={false}
                md={800} mdItems={3} mdScroll={2} mdInfinite={false}
                sm={700} smItems={2} smScroll={1} smInfinite={false}
                xs={320} xsItems={1} xsScroll={1} xsInfinite={false}
                linktext={"players"}
                link={`/players`}
              >
                {
                  users.sort(() => Math.random() - 0.5).map(user => (
                    <CardUser
                      id={user.id}
                      username={user.username}
                      image_profile={user.image_profile}
                      email={user.email}
                      gamertag={user.gamertag}
                      team={user.teams.map((teamList) =>
                        teamList.name
                      )}
                      games={user.games.map((sub) =>
                        sub.name
                      )}
                      full={true}
                    />
                  ))}
              </CarouselCards>
  
              {!user.isAuthenticated && (
                <UpsellSignUp />
              )}

              <CarouselCards 
                titleText="Featured teams"
                infinite={false}
                xl={1280} xlItems={6} xlScroll={6} xlInfinite={false}
                lg={1108} lgItems={4} lgScroll={3} lgInfinite={false}
                md={800} mdItems={3} mdScroll={2} mdInfinite={false}
                sm={700} smItems={2} smScroll={1} smInfinite={false}
                xs={320} xsItems={1} xsScroll={1} xsInfinite={false}
                linktext={"teams"}
                link={`/teams`}
              >
                {
                  teams.sort(() => Math.random() - 0.5).map(team => (
                    <CardTeam
                      id={team.id}
                      username={team.username}
                      image_profile={team.image_profile}
                      name={team.name}
                      organisation={team?.teams?.map((teamList) =>
                        teamList.name
                      )}
                      games={team?.games?.map((sub) =>
                        sub.name
                      )}
                      full={true}
                    />
                  ))}
              </CarouselCards>

              <CarouselCards 
                titleText="Featured organisations"
                infinite={false}
                xl={1280} xlItems={6} xlScroll={6} xlInfinite={false}
                lg={1108} lgItems={4} lgScroll={3} lgInfinite={false}
                md={800} mdItems={3} mdScroll={2} mdInfinite={false}
                sm={700} smItems={2} smScroll={1} smInfinite={false}
                xs={320} xsItems={1} xsScroll={1} xsInfinite={false}
                linktext={"organisations"}
                link={`/organisations`}
              >
                {
                  organisations.sort(() => Math.random() - 0.5).map(organisation => (
                    <CardOrganisation
                      id={organisation.id}
                      username={organisation.username}
                      image_profile={organisation.image_profile}
                      name={organisation.name}
                      team={organisation.teams.map((teamList) =>
                        teamList.name
                      )}
                      games={organisation.games?.map((sub) =>
                        sub.name
                      )}
                      full={true}
                    />
                  ))}
              </CarouselCards>

              <CarouselCards 
                titleText="Featured games"
                infinite={false}
                xl={1280} xlItems={6} xlScroll={6} xlInfinite={false}
                lg={1108} lgItems={4} lgScroll={3} lgInfinite={false}
                md={800} mdItems={3} mdScroll={2} mdInfinite={false}
                sm={700} smItems={2} smScroll={1} smInfinite={false}
                xs={320} xsItems={1} xsScroll={1} xsInfinite={false}
                linktext={"games"}
                link={`/games`}
              >
                {
                  games.sort(() => Math.random() - 0.5).map(game => (
                    <CardGame
                      id={game.id}
                      image_profile={game.image_profile}
                      name={game.name}
                      team={game.teams.map((teamList) =>
                        teamList.name
                      )}
                      /* genres={game.typegenre.map((genreList) =>
                        genreList.name
                      )} */
                      full={true}
                    />
                  ))}
              </CarouselCards>

              <CarouselCards 
                titleText="Featured communities"
                infinite={false}
                xl={1280} xlItems={6} xlScroll={6} xlInfinite={false}
                lg={1108} lgItems={4} lgScroll={3} lgInfinite={false}
                md={800} mdItems={3} mdScroll={2} mdInfinite={false}
                sm={700} smItems={2} smScroll={1} smInfinite={false}
                xs={320} xsItems={1} xsScroll={1} xsInfinite={false}
                linktext={"communities"}
                link={`/communities`}
              >
                {
                  communities.map(community => (
                    <CardCommunity
                      id={community.id}
                      username={community.username}
                      image_profile={community.image_profile}
                      name={community.name}
                      team={community.teams.map((teamList) =>
                        teamList.name
                      )}
                      games={community.games?.map((sub) =>
                        sub.name
                      )}
                      full={true}
                    />
                  ))}
              </CarouselCards>

              <CarouselCards 
                titleText="Featured characters"
                infinite={false}
                xl={1280} xlItems={6} xlScroll={6} xlInfinite={false}
                lg={1108} lgItems={4} lgScroll={3} lgInfinite={false}
                md={800} mdItems={3} mdScroll={2} mdInfinite={false}
                sm={700} smItems={2} smScroll={1} smInfinite={false}
                xs={320} xsItems={1} xsScroll={1} xsInfinite={false}
                linktext={"characters"}
                link={`/characters`}
              >
                {characters.sort(() => Math.random() - 0.5).map(character => (
                    <CardCharacter
                      id={character.id}
                      image_profile={character.image_profile}
                      name={character.name}
                      style1={'grid text-center border-none rounded-3xl bg-light hover:bg-primary'}
                      style2={'mx-auto bg-cover bg-no-repeat h-28 w-28 image-placeholder rounded-full bg-white'}
                      style3={'mx-auto bg-cover bg-no-repeat h-28 w-28 image-placeholder rounded-full placeholder overflow-hidden text-transparent'}

                      games={character.games.map((sub) =>
                        sub.name
                      )}
                      full={true}
                    />
                  ))}
                </CarouselCards>

            </div>
            <Footer/>

          </div>
        </div>
      </IonContent>
    </IonPage>
  );
});


export default Home;
