import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonLoading,
  IonPage,
  IonRouterLink,
  IonSpinner,
  IonToolbar,
} from '@ionic/react';

import { useLocation } from 'react-router';
import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

/* Components */
import { NavButtons } from '../ui/Buttons/NavButtons';
import Hexagon from '../ui/Hexagon/Hexagon';
import HeaderProfileEvent from '../ui/Header/HeaderProfileEvent';
import TabSub from '../ui/Tabs/TabSub';
import CarouselCards from '../ui/Carousel/CarouselCards';
import CardUser from '../ui/Card/CardUser';
import CardTeam from '../ui/Card/CardTeam';
import CardOrganisation from '../ui/Card/CardOrganisation';
import CardCommunity from '../ui/Card/CardCommunity';
import CardGame from '../ui/Card/CardGame';
import CardYoutube from '../ui/Card/CardYoutube';
import CardTwitch from '../ui/Card/CardTwitch';
import CardTwitter from '../ui/Card/CardTwitter';
import CardGrid from '../ui/CardGrid/CardGrid';
import CarouselProfiles from '../ui/Carousel/CarouselProfiles';
import CardCharacter from '../ui/Card/CardCharacter';
import Footer from '../ui/Footer/Footer';
import hexagon_background from '../assets/images/hexagon_background.png';
import SelectOrganisations from '../ui/Select/SelectOrganisations';
import SelectListOrganisations from '../ui/SelectList/SelectListOrganisations';
import TabsHeadlessUi from '../ui/Tabs/TabsHeadlessUi';

/* Search */
import {useQuery, useQueryClient} from 'react-query';


/* User */
import { callApi } from '../utils/utils';

/* Contexts */
import { useCurrentUser } from '../context/AuthContext';

/* Redux */
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeam, removeSelectedTeam } from '../redux/actions/teamActions';


const ProfileEvent = ({ match }) => {
  const { username } = useParams();

  const team = useSelector(state => state.team);

  const dispatch = useDispatch();

  const user = useCurrentUser();

  const [showLoading, setShowLoading] = useState(true);  

  const location = useLocation();
  const tabFromUrl = new URLSearchParams(location.search).get('tab');

  const adminId = team.admins?.find((person) => {
    return person.id === user.id;
  })

  const updateTeam = () => {
    team.username === undefined
    return setShowLoading(true);
  }

  const memberTwitch = team.members?.filter((stream) => {
    return stream.stream_twitch !== undefined;
  })

  /* const isLoading = () => {
    if(team === undefined) {
      return setShowLoading(true);
    } else {
      return setShowLoading(false);
    }
    
  } */


  useEffect(() => {
    /* isLoading() */
    dispatch(fetchTeam(username));
    return () => {
      dispatch(removeSelectedTeam());
    };

  }, [username]);

  return (
    <IonPage id="PageId">
      <IonHeader>
        <title>Team - {team.name}</title>
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
      <IonContent fullscreen>
        <div>
          <div className="m-auto">
            {/* <IonLoading
              cssClass='my-custom-class'
              isOpen={showLoading}
              onDidDismiss={() => setShowLoading(false)}
              message={'Please wait...'}
            /> */}
          </div>
              {team.username && (
                <div>
                  <HeaderProfileEvent
                    id={team.id}
                    user={user}
                    name={team.name}
                    games={team.games}
                    username={team.username}
                    type_team={team.type_team}
                    introduction={team.introduction}
                    tagline={team.tagline}
                    image_profile={team.image_profile}
                    team={team}
                    image_background={team.image_background}
                    follows={team.follows}
                    followteams={team.followteams}
                    likes={team.likes}
                    facebook={team.facebook}
                    twitter={team.twitter}
                    instagram={team.instagram}
                    twitch={team.twitch}
                    tiktok={team.tiktok}
                    youtube={team.youtube}
                    discord={team.discord}
                    linkedin={team.linkedin}
                    xbox={team.xbox}
                    playstation={team.playstation}
                    nintendo={team.nintendo}
                    steam={team.steam}
                    epic={team.steam}
                    website={team.website}
                    store={team.store}
                    verified_profile={team.verified_profile}
                    edit={`/team/${team.id}/edit`}
                  />

                  {/* <!-- Tabs --> */}
                  <div className="max-width">
                    {/* <!-- Tabs --> */}

                    <TabSub initialTab={tabFromUrl}>
                      {/* Tab 1 */}
                      <div label="Overview">
                        <div className="gap-5 mx-4 md:flex-row lg:mt-8 xl:mt-8 mb-20">
                          {/* Section 1 */}
                          <div className="mb-8 grid grid-cols-1 lg:gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                            {/* Left */}
                            <section className="xs:my-8 lg:col-start-1 w-full lg:-mt-1 xl:-mt-1">
                              <div className="flex flex-col gap-5 w-full">
             
                                <div className="bg-light rounded-3xl border-none p-8 w-full">
                                  <h3>Details</h3>

                                  {(team.firstname || team.lastname || team.introduction || team.date_of_birth || team.country || team.languages) ? (

                                  <div>
                                    {(team.firstname || team.lastname) && (
                                      <div className="flex flex-col w-full mb-4">
                                        <p className="font-bold">Name</p>
                                        <p className="flow-auto">{team.firstname} {team.lastname}</p>
                                      </div>
                                    )}
                                    {team.introduction && (
                                      <div className="flex flex-col w-full mb-4">
                                      <p className="font-bold">Introduction</p>
                                      <p className="flow-auto">{team.introduction}</p>
                                      </div>
                                    )}

                                    {/* Date of birth */}
                                    {team.date_of_birth && (
                                      <div className="flex flex-col mb-4">
                                        <p className="font-bold w-full">Date of birth </p>

                                        <p className="flow-auto">{team.date_of_birth}</p>
                                      </div>
                                    )}

                                    {/* Country */}
                                    {team.country && (
                                      <div className="flex flex-col mb-4">
                                        <p className="font-bold">Country</p>
                                        <p className="flow-auto">{team.country}</p>
                                      </div>
                                    )}

                                    {/* Languages */}
                                    {team.languages && (
                                      <div className="flex flex-col mb-4">
                                        <p className="font-bold">Languages</p>
                                        <p className="flow-auto">{team.languages}</p>
                                      </div>
                                    )}

                                    {/* Genre */}
                                    {/* {team.genres ? (
                                        <div className="flex flex-col mb-4">
                                          <p className="font-bold">Date of birth:</p>
                                          <p className="flow-auto">{team.genres}</p>
                                        </div>
                                      ) : (
                                        <div></div>
                                      )} */}
                                  </div>

                                  ) : (
                                  <div>
                                  {adminId ? (
                                    <Link
                                      to={'/account'}
                                      className="inline-flex items-center justify-center h-12  
                                                  px-6 mr-2 mb-2 font-medium tracking-wide transition 
                                                  duration-200 bg-primary text-dark rounded-full hover:bg-dark hover:text-light
                                                  focus:shadow-outline focus:outline-none"
                                    >
                                      Add team details
                                    </Link>
                                  ) : (
                                    <div
                                      className="inline-flex items-center justify-center h-12  
                                        px-6 mr-2 mb-2 font-medium tracking-wide transition 
                                        duration-200 bg-dark text-light rounded-full
                                        focus:shadow-outline focus:outline-none"
                                    >
                                      Content coming soon
                                    </div>
                                  )}
                                  </div>
                                  )}

                                  {/* Verified profile */}
                                  {team.verified_profile && (
                                    <div className="flex flex-wrap mb-4">
                                      <div
                                        className="inline-flex items-center justify-center h-12  
                                      px-6 mr-2 mb-2 font-medium tracking-wide transition 
                                      duration-200 bg-primary text-dark rounded-full
                                      focus:shadow-outline focus:outline-none"
                                      >
                                        Verified profile
                                      </div>
                                    </div>
                                  )}
                                </div>

                                <div className="xs:block sm:block md:block lg:hidden xl:hidden">
                                  {team.stream_twitch ? (
                                    <CardTwitch
                                      twitchId={team.stream_twitch}
                                    />
                                  ) : (
                                    <div
                                      className="rounded-3xl border-none p-4 sm:w-full h-40 bg-cover bg-no-repeat"
                                      style={{ backgroundImage: `url(${hexagon_background})` }}
                                    >
                                      {adminId ? (
                                        <Link
                                          to={`${team.id}/edit-streams`}
                                          className="inline-flex items-center justify-center h-12  
                                                  px-6 mr-2 mb-2 font-medium tracking-wide transition 
                                                  duration-200 bg-dark text-light rounded-full hover:bg-primary hover:text-dark
                                                  focus:shadow-outline focus:outline-none"
                                        >
                                          Add a Twitch stream
                                        </Link>
                                      ) : (
                                        <div
                                          className="inline-flex items-center justify-center h-12  
                                        px-6 mr-2 mb-2 font-medium tracking-wide transition 
                                        duration-200 bg-primary text-dark rounded-full
                                        focus:shadow-outline focus:outline-none"
                                        >
                                          Content coming soon
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>

                                <div className="xs:block sm:block md:block lg:hidden xl:hidden">
                                  {team.video_feature_1 ? (
                                    <CardYoutube video1={team.video_feature_1} />
                                  ) : (
                                    <div
                                      className="rounded-3xl border-none p-4 sm:w-full h-40 bg-cover bg-no-repeat"
                                      style={{ backgroundImage: `url(${hexagon_background})` }}
                                    >
                                      {adminId ? (
                                        <Link
                                          to={`${team.id}/edit-media`}
                                          className="inline-flex items-center justify-center h-12  
                                                  px-6 mr-2 mb-2 font-medium tracking-wide transition 
                                                  duration-200 bg-dark text-light rounded-full hover:bg-primary hover:text-dark
                                                  focus:shadow-outline focus:outline-none"
                                        >
                                          Add a feature video
                                        </Link>
                                      ) : (
                                        <div
                                          className="inline-flex items-center justify-center h-12  
                                        px-6 mr-2 mb-2 font-medium tracking-wide transition 
                                        duration-200 bg-primary text-dark rounded-full
                                        focus:shadow-outline focus:outline-none"
                                        >
                                          Content coming soon
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>

                                <div className="bg-light rounded-3xl border-none p-8 sm:w-full xs:w-full">
                                  <h3>Games</h3>
                                  <CarouselCards
                                  infinite={false}
                                  xl={1280} xlItems={1} xlScroll={1} xlInfinite={false}
                                  lg={1008} lgItems={3} lgScroll={3} lgInfinite={false}
                                  md={800} mdItems={3} mdScroll={2} mdInfinite={false}
                                  sm={700} smItems={2} smScroll={2} smInfinite={false}
                                  xs={320} xsItems={1} xsScroll={1} xsInfinite={false}
                                >
                                  {team.games.sort(() => Math.random() - 0.5).map(character => (
                                    <CardGame
                                      id={character.id}
                                      username={character.username}
                                      image_profile={character.image_profile}
                                      name={character.name}
                                      full={true}
                                    />
                                  ))}
                                </CarouselCards>
                                </div>
                              </div>
                            </section>

                            {/* Right */}
                            <div className="lg:-mt-1 xl:-mt-1 col-span-2">
                              <div className="flex flex-col gap-5 sm:w-full xs:w-full">

                                <div className="xs:hidden sm:hidden md:hidden lg:block xl:block">
                                  {team.stream_twitch ? (
                                    <CardTwitch
                                      twitchId={team.stream_twitch} height="460px"
                                    />
                                  ) : (
                                    <div
                                      className="rounded-3xl border-none p-4 sm:w-full h-40 bg-cover bg-no-repeat"
                                      style={{ backgroundImage: `url(${hexagon_background})` }}
                                    >
                                      {adminId ? (
                                        <Link
                                          to={`${team.id}/edit-streams`}
                                          className="inline-flex items-center justify-center h-12  
                                                  px-6 mr-2 mb-2 font-medium tracking-wide transition 
                                                  duration-200 bg-dark text-light rounded-full hover:bg-primary hover:text-dark
                                                  focus:shadow-outline focus:outline-none"
                                        >
                                          Add a Twitch stream
                                        </Link>
                                      ) : (
                                        <div
                                          className="inline-flex items-center justify-center h-12  
                                        px-6 mr-2 mb-2 font-medium tracking-wide transition 
                                        duration-200 bg-primary text-dark rounded-full
                                        focus:shadow-outline focus:outline-none"
                                        >
                                          Content coming soon
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>

                                <div className="xs:hidden sm:hidden md:hidden lg:block xl:block">
                                  {team.video_feature_1 ? (
                                    <CardYoutube video1={team.video_feature_1} />
                                  ) : (
                                    <div
                                      className="rounded-3xl border-none p-4 sm:w-full h-40 bg-cover bg-no-repeat"
                                      style={{ backgroundImage: `url(${hexagon_background})` }}
                                    >
                                      {adminId ? (
                                        <Link
                                          to={`${team.id}/edit-media`}
                                          className="inline-flex items-center justify-center h-12  
                                                  px-6 mr-2 mb-2 font-medium tracking-wide transition 
                                                  duration-200 bg-dark text-light rounded-full hover:bg-primary hover:text-dark
                                                  focus:shadow-outline focus:outline-none"
                                        >
                                          Add a feature video
                                        </Link>
                                      ) : (
                                        <div
                                          className="inline-flex items-center justify-center h-12  
                                        px-6 mr-2 mb-2 font-medium tracking-wide transition 
                                        duration-200 bg-primary text-dark rounded-full
                                        focus:shadow-outline focus:outline-none"
                                        >
                                          Content coming soon
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>

                                {team.image_feature_1 ? (
                                  <div className="bg-light rounded-3xl border-none p-4 sm:w-full h-auto bg-cover bg-no-repeat">
                                    <img
                                      src={team.image_feature_1 && team.image_feature_1.url}
                                      className="h-full w-full rounded-3xl"
                                    />
                                  </div>
                                ) : (
                                  <div
                                    className="rounded-3xl border-none p-4 sm:w-full h-40 bg-cover bg-no-repeat"
                                    style={{ backgroundImage: `url(${hexagon_background})` }}
                                  >
                                    {adminId ? (
                                      <Link
                                        to={`${team.id}/edit`}
                                        className="inline-flex items-center justify-center h-12  
                                                  px-6 mr-2 mb-2 font-medium tracking-wide transition 
                                                  duration-200 bg-dark text-light rounded-full hover:bg-primary hover:text-dark
                                                  focus:shadow-outline focus:outline-none"
                                      >
                                        Add a feature video
                                      </Link>
                                    ) : (
                                      <div
                                        className="inline-flex items-center justify-center h-12  
                                        px-6 mr-2 mb-2 font-medium tracking-wide transition 
                                        duration-200 bg-primary text-dark rounded-full
                                        focus:shadow-outline focus:outline-none"
                                      >
                                        Content coming soon
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          {/*  */}
                        </div>

                        {/* <div>

                          {team.games ? (
                            <CarouselCards
                              titleText={`${team.name}'s competitive games`}
                              infinite={false}
                              xl={1280} xlItems={6} xlScroll={6} xlInfinite={false}
                              lg={1108} lgItems={4} lgScroll={3} lgInfinite={false}
                              md={800} mdItems={3} mdScroll={2} mdInfinite={false}
                              sm={700} smItems={2} smScroll={1} smInfinite={false}
                              xs={320} xsItems={1} xsScroll={1} xsInfinite={false}
                            >
                              {
                                team.games.sort(() => Math.random() - 0.5).map(game => (
                                  <CardGame
                                    id={game.id}
                                    image_profile={game.image_profile}
                                    name={game.name}
                                    team={game.teams.map((teamList) =>
                                      teamList.name
                                    )}
                                  />
                                ))}
                            </CarouselCards>
                          ) : (
                            <div
                              className="rounded-3xl border-none p-4 sm:w-full h-40 bg-cover bg-no-repeat"
                              style={{ backgroundImage: `url(${hexagon_background})` }}
                            >
                              {team.id === adminId ? (
                                <Link
                                  to={'/account'}
                                  className="inline-flex items-center justify-center h-12  
                                              px-6 mr-2 mb-2 font-medium tracking-wide transition 
                                              duration-200 bg-primary text-dark rounded-full hover:bg-dark hover:text-light
                                              focus:shadow-outline focus:outline-none"
                                >
                                  Add a game
                                </Link>
                              ) : (
                                <div
                                  className="inline-flex items-center justify-center h-12  
                                    px-6 mr-2 mb-2 font-medium tracking-wide transition 
                                    duration-200 bg-dark text-light rounded-full
                                    focus:shadow-outline focus:outline-none"
                                >
                                  Content coming soon
                                </div>
                              )}
                            </div>
                          )}

                          
                        </div> */}
                      </div>

                      {/* Tab 3 */}
                      <div label="Career">
                        {/*  */}

                        <div className="max-width px-4">

                        <TabsHeadlessUi
                        tab1title="Experience"
                        tab1={
                          <div className=" mb-8 grid grid-cols-1 lg:gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                            {/* Filters */}
                            <section className="xs:my-8 lg:col-start-1 w-full">
                              <div className="bg-light px-4 py-5 shadow rounded-lg ">Filter</div>
                            </section>
                            {/* Content */}
                            <div className="lg:-mt-10 xl:-mt-10 col-span-2">
                              
                            </div>
                          </div>
                        }
        
                        tab2title="Achievements"
                        tab2={
                          <div className=" mb-8 grid grid-cols-1 lg:gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                            {/* Filters */}
                            <section className="xs:my-8 lg:col-start-1 w-full">
                              <div className="bg-light px-4 py-5 shadow rounded-lg ">Filter</div>
                            </section>
                            {/* Content */}
                            <div className="lg:-mt-10 xl:-mt-10 col-span-2">
                              
                            </div>
                          </div>
                        }

                        tab3title="Scores"
                        tab3={
                          <div className=" mb-8 grid grid-cols-1 lg:gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                            {/* Filters */}
                            <section className="xs:my-8 lg:col-start-1 w-full">
                              <div className="bg-light px-4 py-5 shadow rounded-lg ">Filter</div>
                            </section>
                            {/* Content */}
                            <div className="lg:-mt-10 xl:-mt-10 col-span-2">
                              
                            </div>
                          </div>
                        }

                      />

                  </div>
                </div>

                      {/* Tab 2 */}
                      <div className="" label="Highlights">
                        {/* Highlight videos */}
                        <div className="mx-4 mt-8 mb-12">

                        <TabsHeadlessUi
                          tab1title="Videos"
                          tab1={
                            <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
                            {team.video_highlight_1 ? (
                              <div className="">
                                {team.video_highlight_1 && <CardYoutube video1={team.video_highlight_1} />}
                              </div>
                            ) : (
                              <div
                                className="rounded-3xl border-none p-4 sm:w-full h-40 bg-cover bg-no-repeat"
                                style={{ backgroundImage: `url(${hexagon_background})` }}
                              >
                                {user.id !== team.id ? (
                                  <Link
                                    to={'/account'}
                                    className="inline-flex items-center justify-center h-12  
                                                  px-6 mr-2 mb-2 font-medium tracking-wide transition 
                                                  duration-200 bg-dark text-light rounded-full hover:bg-primary hover:text-dark
                                                  focus:shadow-outline focus:outline-none"
                                  >
                                    Add a highlight video
                                  </Link>
                                ) : (
                                  <div
                                    className="inline-flex items-center justify-center h-12  
                                        px-6 mr-2 mb-2 font-medium tracking-wide transition 
                                        duration-200 bg-primary text-dark rounded-full
                                        focus:shadow-outline focus:outline-none"
                                  >
                                    Content coming soon
                                  </div>
                                )}
                              </div>
                            )}

                            {team.video_highlight_2 && (
                              <div className="">
                                {team.video_highlight_2 && <CardYoutube video1={team.video_highlight_2} />}
                              </div>
                            )}

                            {team.video_highlight_3 && (
                              <div className="">
                                {team.video_highlight_3 && <CardYoutube video1={team.video_highlight_3} />}
                              </div>
                            )}

                            {team.video_highlight_4 && (
                              <div className="">
                                {team.video_highlight_4 && <CardYoutube video1={team.video_highlight_4} />}
                              </div>
                            )}
                          </div>
                          }
          
                          tab2title="Images"
                          tab2={
                            <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
                            {team.image_highlight_1 ? (
                              <div className="rounded-3xl border-none p-4 sm:w-full h-auto bg-cover bg-no-repeat">
                                <img
                                  src={team.image_highlight_1 && team.image_highlight_1.url}
                                  className="h-full w-full rounded-3xl"
                                />
                              </div>
                            ) : (
                              <div
                                className="rounded-3xl border-none p-4 sm:w-full h-40 bg-cover bg-no-repeat"
                                style={{ backgroundImage: `url(${hexagon_background})` }}
                              >
                                {user.id === team.id ? (
                                  <Link
                                    to={`${team.id}/edit`}
                                    className="inline-flex items-center justify-center h-12  
                                                  px-6 mr-2 mb-2 font-medium tracking-wide transition 
                                                  duration-200 bg-dark text-light rounded-full hover:bg-primary hover:text-dark
                                                  focus:shadow-outline focus:outline-none"
                                  >
                                    Add a highlight video
                                  </Link>
                                ) : (
                                  <div
                                    className="inline-flex items-center justify-center h-12  
                                        px-6 mr-2 mb-2 font-medium tracking-wide transition 
                                        duration-200 bg-primary text-dark rounded-full
                                        focus:shadow-outline focus:outline-none"
                                  >
                                    Content coming soon
                                  </div>
                                )}
                              </div>
                            )}

                            {team.image_highlight_2 && (
                              <div className="rounded-3xl border-none p-4 sm:w-full h-auto bg-cover bg-no-repeat">
                                <img
                                  src={team.image_highlight_2 && team.image_highlight_2.url}
                                  className="h-full w-full rounded-3xl"
                                />
                              </div>
                            )}

                            {team.image_highlight_3 && (
                              <div className="rounded-3xl border-none p-4 sm:w-full h-auto bg-cover bg-no-repeat">
                                <img
                                  src={team.image_highlight_3 && team.image_highlight_3.url}
                                  className="h-full w-full rounded-3xl"
                                />
                              </div>
                            )}

                            {team.image_highlight_4 && (
                              <div className="rounded-3xl border-none p-4 sm:w-full h-auto bg-cover bg-no-repeat">
                                <img
                                  src={team.image_highlight_4 && team.image_highlight_4.url}
                                  className="h-full w-full rounded-3xl"
                                />
                              </div>
                            )}
                          </div>
                          }

                        />
                          
                        </div>

                      </div>

                      {/* Tab 3 */}
                      <div label="Streams">
                        <div className="mx-4 mt-8 mb-12">

                          
                          <div className="xs:mb-8">
                            <h2>Members Streams</h2>
                          </div>

                          {/* Section 1 */}

                          {team.members <= 0 ? (
                            <div>
                              {adminId ? (
                                <Link
                                  to={`${team.id}/edit-members`}
                                  className="inline-flex items-center justify-center h-12 lg:mt-20 xl:mt-20  
                                              px-6 mr-2 mb-2 font-medium tracking-wide transition 
                                              duration-200 bg-primary text-dark rounded-full hover:bg-dark hover:text-light
                                              focus:shadow-outline focus:outline-none"
                                >
                                  Join a member
                                </Link>
                              ) : (
                                <div
                                  className="inline-flex items-center justify-center h-12 lg:mt-20 xl:mt-20  
                                    px-6 mr-2 mb-2 font-medium tracking-wide transition 
                                    duration-200 bg-dark text-light rounded-full
                                    focus:shadow-outline focus:outline-none"
                                >
                                  Content coming soon
                                </div>
                              )}
                            </div>
                          ) : (
                            <CardGrid 
                              style1={"grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4"}
                            >
                              {
                              memberTwitch.sort(() => Math.random() - 0.5).map(user => (
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
                            </CardGrid>
                          )}

                        </div>
                      </div>

                      {/* Tab 5 */}
                      <div label="Members">

                        <div className="max-width px-4">

                        <TabsHeadlessUi
                        tab1title="Players"
                        tab1={
                          <div className=" mb-8 grid grid-cols-1 lg:gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                            {/* Filters */}
                            <section className="xs:my-8 lg:col-start-1 w-full">
                              <div className="bg-light px-4 py-5 shadow rounded-lg ">Filter</div>
                            </section>
                            {/* Content */}
                            <div className="lg:-mt-10 xl:-mt-10 col-span-2">

                            {team.members <= 0 ? (
                            <div>
                              {adminId ? (
                                <Link
                                  to={`${team.id}/edit-members`}
                                  className="inline-flex items-center justify-center h-12 lg:mt-20 xl:mt-20 
                                              px-6 mr-2 mb-2 font-medium tracking-wide transition 
                                              duration-200 bg-primary text-dark rounded-full hover:bg-dark hover:text-light
                                              focus:shadow-outline focus:outline-none"
                                >
                                  Join a member
                                </Link>
                              ) : (
                                <div
                                  className="inline-flex items-center justify-center h-12 lg:mt-20 xl:mt-20  
                                    px-6 mr-2 mb-2 font-medium tracking-wide transition 
                                    duration-200 bg-dark text-light rounded-full
                                    focus:shadow-outline focus:outline-none"
                                >
                                  Content coming soon
                                </div>
                              )}
                            </div>
                            ) : (
                              <CardGrid
                                style1={
                                  'grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4'
                                }
                              >
                                {team.members?.map(user => (
                                  <CardUser
                                    id={user.id}
                                    username={user.username}
                                    image_profile={user.image_profile}
                                    email={user.email}
                                    gamertag={user.gamertag}
                                    team={user.teams?.map((teamList) =>
                                      teamList.name
                                    )}
                                    games={user.games?.map((sub) =>
                                      sub.name
                                    )}
                                    responsive={true}
                                  />
                                ))}
                              </CardGrid>
                            )}
                              
                            </div>
                          </div>
                        }
        
                        tab2title="Specialists"
                        tab2={
                          <div className=" mb-8 grid grid-cols-1 lg:gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                            {/* Filters */}
                            <section className="xs:my-8 lg:col-start-1 w-full">
                              <div className="bg-light px-4 py-5 shadow rounded-lg ">Filter</div>
                            </section>
                            {/* Content */}
                            <div className="lg:-mt-10 xl:-mt-10 col-span-2">
                              
                            </div>
                          </div>
                        }

                        />

                          
                        </div>

                      </div>

                      {/* Tab 3 */}
                      <div label="Organisations">

                      <div className="max-width px-4">
                    
                        {/* Section 1 */}
                        <div className=" mb-8 grid grid-cols-1 lg:gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                          {/* Filters */}
                          <section className="xs:my-8 lg:col-start-1 w-full">
                            <div className="bg-light px-4 py-5 shadow rounded-lg ">Filter</div>
                          </section>
                          {/* Content */}
                          <div className="lg:-mt-10 xl:-mt-10 col-span-2">

                          {team.organisations <= 0 ? (
                            <div>
                              {adminId ? (
                                <Link
                                  to={`${team.id}/organisations`}
                                  className="inline-flex items-center justify-center h-12 lg:mt-20 xl:mt-20 
                                              px-6 mr-2 mb-2 font-medium tracking-wide transition 
                                              duration-200 bg-primary text-dark rounded-full hover:bg-dark hover:text-light
                                              focus:shadow-outline focus:outline-none"
                                >
                                  Join a organisation
                                </Link>
                              ) : (
                                <div
                                  className="inline-flex items-center justify-center h-12 lg:mt-20 xl:mt-20 
                                    px-6 mr-2 mb-2 font-medium tracking-wide transition 
                                    duration-200 bg-dark text-light rounded-full
                                    focus:shadow-outline focus:outline-none"
                                >
                                  Content coming soon
                                </div>
                              )}
                            </div>
                          ) : (
                            <CardGrid 
                              style1={"grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4"}
                            >
                              {
                                team.organisations.map(organisation => (
                                  <CardOrganisation
                                    id={organisation.id}
                                    username={organisation.username}
                                    image_profile={organisation.image_profile}
                                    name={organisation.name}
                                    organisation={organisation.teams?.map((teamList) =>
                                      teamList.name
                                    )}
                                    /* games={user.games.map((sub) =>
                                      sub.name
                                    )} */
                                    responsive={true}
                                  />
                                ))}
                            </CardGrid>
                          )}
                            
                          </div>
                        </div>
                      </div>

                      </div>

                      {/* Tab 3 */}
                      <div label="Communities">
                          
                        <div className="max-width px-4">
                    
                          {/* Section 1 */}
                          <div className=" mb-8 grid grid-cols-1 lg:gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                            {/* Filters */}
                            <section className="xs:my-8 lg:col-start-1 w-full">
                              <div className="bg-light px-4 py-5 shadow rounded-lg ">Filter</div>
                            </section>
                            {/* Content */}
                            <div className="lg:-mt-10 xl:-mt-10 col-span-2">
                                
                              {team.communities <= 0 ? (
                                <div>
                                  {adminId ? (
                                    <Link
                                      to={`${team.id}/communities`}
                                      className="inline-flex items-center justify-center h-12 lg:mt-20 xl:mt-20  
                                                  px-6 mr-2 mb-2 font-medium tracking-wide transition 
                                                  duration-200 bg-primary text-dark rounded-full hover:bg-dark hover:text-light
                                                  focus:shadow-outline focus:outline-none"
                                    >
                                      Join a community
                                    </Link>
                                  ) : (
                                    <div
                                      className="inline-flex items-center justify-center h-12 lg:mt-20 xl:mt-20  
                                        px-6 mr-2 mb-2 font-medium tracking-wide transition 
                                        duration-200 bg-dark text-light rounded-full
                                        focus:shadow-outline focus:outline-none"
                                    >
                                      Content coming soon
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <CardGrid 
                                  style1={"grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4"}
                                >
                                  {
                                    team.communities.map(community => (
                                      <CardCommunity
                                        id={community.id}
                                        username={community.username}
                                        image_profile={community.image_profile}
                                        name={community.name}
                                        responsive={true}
                                      />
                                    ))}
                                </CardGrid>
                              )}



                              
                            </div>
                          </div>
                        </div>

                      </div>
                    </TabSub>
                  </div>
            </div>
          )}
        </div>
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default ProfileEvent;
