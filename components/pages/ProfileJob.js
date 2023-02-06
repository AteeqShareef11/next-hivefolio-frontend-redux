import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonLoading,
  IonPage,
  IonRouterLink,
  IonSpinner,
  IonToolbar,
} from '@ionic/react';

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

/* Components */
import { NavButtons } from '../ui/Buttons/NavButtons';
import Hexagon from '../ui/Hexagon/Hexagon';
import HeaderFeaturedSkeleton from '../ui/Header/HeaderFeaturedSkeleton';
import TabSub from '../ui/Tabs/TabSub';
import CardGame from '../ui/Card/CardGame';
import CardGrid from '../ui/CardGrid/CardGrid';
import CardCharacter from '../ui/Card/CardCharacter';
import CardUser from '../ui/Card/CardUser';
import CardTeam from '../ui/Card/CardTeam';
import CarouselCards from '../ui/Carousel/CarouselCards';
import CardOrganisation from '../ui/Card/CardOrganisation';
import CardYoutube from '../ui/Card/CardYoutube';
import CardTwitch from '../ui/Card/CardTwitch';
import CardTwitter from '../ui/Card/CardTwitter';
import HeaderProfileCharacter from '../ui/Header/HeaderProfileCharacter';
import HeaderProfileJob from '../ui/Header/HeaderProfileJob';
import Footer from '../ui/Footer/Footer';
import TabsHeadlessUi from '../ui/Tabs/TabsHeadlessUi';

/* Design */
import hexagon_background from '../assets/images/hexagon_background.png';
import ReactMarkdown from 'react-markdown';

/* User */
import { callApi } from '../utils/utils';
import { useCurrentUser } from '../context/AuthContext';

/* Search */
import Select from 'react-select';
import { useQuery, useQueryClient } from 'react-query';

/* Redux */
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacter, removeSelectedCharacter } from '../redux/actions/characterActions';
import { fetchJob, removeSelectedJob } from '../redux/actions/jobActions'

const ProfileJob = ({ match, history }) => {
  const { id } = match.params;

  const character = useSelector(state => state.character);
  const job = useSelector(state => state.job)

  const {description, games, image_profile, title} = job


  const dispatch = useDispatch();

  const [users, setUsers] = useState([]);
  //const [teams, setTeams] = useState([]);
  //const [games, setGames] = useState([]);
  //const [character, setCharacter] = useState({});
  const [characters, setCharacters] = useState([]);
  const [showLoading, setShowLoading] = useState(true);

  const location = useLocation();
  const tabFromUrl = new URLSearchParams(location.search).get('tab');

  // Used for the edit form

  useEffect(() => {
    //fetchData();
    //updateCharacter();
    dispatch(fetchJob(id));
    return () => {
      dispatch(removeSelectedJob());
    };
  }, [id]);

  return (
    <IonPage>
      <IonHeader>
        <title>{job.title} - Hivefolio</title>
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
      <IonContent>

        <div>
          
            <div>
              {/* <HeaderProfileJob
                id={id}
                name={character.name}
                tagline={character.tagline}
                image_profile={image_profile}
                image_background={character.image_background}
                type_character={character.type_character}
                games={character.games}
                follows={character.follows}
                followcharacters={character.followcharacters}
                likes={character.likes}
                image_highlight_1={character.image_highlight_1}
                image_1={character.image_1}
                featured_character={character.featured_character}
                update={character.update}
                facebook={character.facebook}
                twitter={character.twitter}
                instagram={character.instagram}
                twitch={character.twitch}
                tiktok={character.tiktok}
                youtube={character.youtube}
                discord={character.discord}
                linkedin={character.linkedin}
                xbox={character.xbox}
                playstation={character.playstation}
                nintendo={character.nintendo}
                steam={character.steam}
                epic={character.epic}
                website={character.website}
                store={character.store}
              /> */}

              <div className="max-width">
                {/* <!-- Tabs --> */}
                <div className="max-width">
                 
                    {/* Tab 1 */}
                    <div label="Overview">
                      <div className="gap-5 mx-4 md:flex-row lg:mt-8 xl:mt-8 mb-20">
                        {/* Section 1 */}
                        <div className="mb-8 grid grid-cols-1 lg:gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                          {/* Left */}
                          <section className="xs:my-8 lg:col-start-1 w-full lg:-mt-1 xl:-mt-1">
                            <div className="flex flex-col gap-5 w-full">
                              <div className="bg-light rounded-3xl border-none p-8 w-full">
                                <h1>{title}</h1>

                                {/* {/* Name */}
                                {/* <div className="flex flex-col mb-4">
                                  <p className="font-bold">Name</p>
                                  <p className="flow-auto">{title}</p>
                                </div> */}

                                {/* Introduction */}
                                {/* {character.introduction && (
                                  <div className="flex flex-col mb-4">
                                    <p className="font-bold">Introduction</p>
                                    <p className="flow-auto">{character.introduction}</p>
                                  </div>
                                )} */}

                                {/* Date of birth */}
                                {/* {character.date_of_birth && (
                                  <div className="flex flex-col mb-4">
                                    <p className="font-bold">Date of birth</p>
                                    <p className="flow-auto">{character.date_of_birth}</p>
                                  </div>
                                )} */}

                                {/* Country */}
                                {/* {character.country && (
                                  <div className="flex flex-col mb-4">
                                    <p className="font-bold">Country</p>
                                    <p className="flow-auto">{character.country}</p>
                                  </div>
                                )} */}

                                {/* Languages */}
                                {/* {character.languages && (
                                  <div className="flex flex-col mb-4">
                                    <p className="font-bold">Languages</p>
                                    <p className="flow-auto">{character.languages}</p>
                                  </div>
                                )} */}

                                {/* Genre */}
                                {/* {character.genres ? (
                                  <div className="flex flex-col mb-4">
                                    <p className="font-bold">Date of birth</p>
                                    <p className="flow-auto">{character.genres}</p>
                                  </div>
                                ) : (
                                  <div></div>
                                )} */}

                                {/* Verified profile */}
                                {/* {character.verified_profile && (
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
                                )} */}
                              </div>

                              {/* <div className="xs:block sm:block md:block lg:hidden xl:hidden">
                                {character.video_feature_1 ? (
                                  <CardYoutube video1={character.video_feature_1} />
                                ) : (
                                  <div
                                    className="bg-light rounded-3xl border-none p-4 sm:w-full h-40 bg-cover bg-no-repeat"
                                    style={{ backgroundImage: `url(${hexagon_background})` }}
                                  >
                                    {!id === character.id ? (
                                      <Link
                                        to={'/account'}
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
                              </div> */}

                              {/* <div className="bg-light rounded-3xl border-none p-8 sm:w-full xs:w-full">
                                <h3>Statistics</h3>
                              </div> */}

                              {/* <div className="bg-light rounded-3xl border-none p-8 sm:w-full xs:w-full">
                                <h3>Games</h3>

                                {games
                                  .sort(() => Math.random() - 0.5)
                                  .map(game => (
                                    <CardGame
                                      id={game.id}
                                      image_profile={game.image_profile}
                                      name={game.name}
                                      full={true}
                                    />
                                  ))}
                              </div> */}
                            </div>
                          </section>


                          {/* Right */}
                          <div className="lg:-mt-1 xl:-mt-1 col-span-2">

                          <div className="flex flex-col gap-5 sm:w-full xs:w-full">

                            <div className="xs:block sm:block md:block lg:block xl:block">
                              <p>{description}</p>
                            </div>

                            {/* <div className="xs:hidden sm:hidden md:hidden lg:block xl:block">
                            {character.twitch && (
                              <CardTwitch
                                video1={character.twitch}
                              />
                            )}
                            </div> */}

                            {/* <div className="xs:block sm:block md:block lg:block xl:block">

                              {tweets.map((tweet) => (
                                <CardTwitter key={tweet.id} {...tweet}/>
                              ))}
                              
                            </div> */}

                            {/* {character.image_full ? (
                              <div className="bg-light rounded-3xl border-none p-4 sm:w-full h-auto bg-cover bg-no-repeat">
                                <img
                                  src={character.image_full && character.image_full.url}
                                  className="h-full w-full rounded-3xl"
                                />
                              </div>
                            ) : (
                              <div
                                className="rounded-3xl border-none p-4 sm:w-full h-40 bg-cover bg-no-repeat"
                                style={{ backgroundImage: `url(${hexagon_background})` }}
                              >
                                  <div
                                    className="inline-flex items-center justify-center h-12  
                                        px-6 mr-2 mb-2 font-medium tracking-wide transition 
                                        duration-200 bg-primary text-dark rounded-full
                                        focus:shadow-outline focus:outline-none"
                                  >
                                    Content coming soon
                                  </div>
                              </div>
                            )} */}
                          </div>

                        </div>
                        </div>

                        {/*  */}
                      </div>
                      
                    </div>


           
                </div>
              </div>
            </div>

        </div>
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default ProfileJob;
