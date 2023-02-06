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
import HeaderProfileGame from '../ui/Header/HeaderProfileGame';
import HeaderFeaturedSkeleton from '../ui/Header/HeaderFeaturedSkeleton';
import CarouselCards from '../ui/Carousel/CarouselCards';
import CardUser from '../ui/Card/CardUser';
import CardTeam from '../ui/Card/CardTeam';
import CardGrid from '../ui/CardGrid/CardGrid';
import CardCharacter from '../ui/Card/CardCharacter';
import CardOrganisation from '../ui/Card/CardOrganisation';
import CardCommunity from '../ui/Card/CardCommunity';
import CardYoutube from '../ui/Card/CardYoutube';
import CardTwitch from '../ui/Card/CardTwitch';
import CardTwitter from '../ui/Card/CardTwitter';
import Hexagon from '../ui/Hexagon/Hexagon';
import TabSub from '../ui/Tabs/TabSub';
import Footer from '../ui/Footer/Footer';
import TabsHeadlessUi from '../ui/Tabs/TabsHeadlessUi';

/* User */
import { callApi } from '../utils/utils';
import { useCurrentUser } from '../context/AuthContext';

/* Search */
import Select from 'react-select';
import { useQuery, useQueryClient } from 'react-query';

/* Design */
import hexagon_background from '../assets/images/hexagon_background.png';

/* Redux */
import { useDispatch, useSelector } from 'react-redux';
import { fetchGame, removeSelectedGame } from '../redux/actions/gameActions';

const ProfileGame = ({ match }) => {
  const { id } = match.params;

  const game = useSelector(state => state.game);

console.log(game);
  const dispatch = useDispatch();

  //const [game, setGame] = useState({});
  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [organisations, setOrganisations] = useState([]);
  const [games, setGames] = useState([]);
  const [followUsers, setFollowUsers] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(0);
  const [showLoading, setShowLoading] = useState(true);

  const queryClient = useQueryClient();

  const location = useLocation();
  const tabFromUrl = new URLSearchParams(location.search).get('tab');

  
  const fetchData = async () => {
    try {
      const res = await fetch(`https://hivefolio.herokuapp.com/api/games/${id}?populate=*`);
      const followUsersData = await fetch(`https://hivefolio.herokuapp.com/api/games/${id}?populate=*`);
      const charactersData = await fetch(`https://hivefolio.herokuapp.com/api/characters?populate=*`);
      const data = await res.json();

      //setGame(data);
      setCharacters(charactersData);
      setShowLoading(false);
    } catch (err) {
      setShowLoading(false);
    }
  };

  const updateGame = () => {
    game.username === undefined
    return setShowLoading(true);
  }

  useEffect(() => {
    //fetchData();
    //updateGame();
    dispatch(fetchGame(id));
    return () => {
      dispatch(removeSelectedGame());
    };
  }, [id]);

  console.log("Characters of Game is here", game)

  return (
    <IonPage>
      <IonHeader>
        <title>{game?.data?.attributes.name} - Hivefolio</title>
        <IonToolbar className="">
          <IonRouterLink
            routerLink="/"
            className="flex pl-4 xs:hidden sm:hidden md:block lg:block xl:block"
          >
            <Hexagon />
          </IonRouterLink>
          <IonButtons slot="start" className="xs:block sm:block md:hidden lg:hidden xl:hidden">
            <IonBackButton />
          </IonButtons>
          <IonButtons slot="end">
            <NavButtons />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div>
          {!game?.data?.id && (
            <div className="mt-6">
              <HeaderFeaturedSkeleton />
            </div>
          )}

          {game?.data?.id && (
            <div>
              <HeaderProfileGame
                id={id}
                name={game.data.attributes.name}
                introduction={game.data.attributes.introduction}
                tagline={game.data.attributes.tagline}
                type_game={game.data.attributes.type_game}
                image_profile={game.data.attributes.image_profile.data.attributes.url}
                image_background={game.data.attributes.image_background}
                follows={game.data.attributes.follows}
                followgames={game.data.attributes.followgames}
                likes={game.data.attributes.likes}
                facebook={game.data.attributes.facebook}
                twitter={game.data.attributes.twitter}
                instagram={game.data.attributes.instagram}
                twitch={game.data.attributes.twitch}
                tiktok={game.data.attributes.tiktok}
                youtube={game.data.attributes.youtube}
                discord={game.data.attributes.discord}
                linkedin={game.data.attributes.linkedin}
                xbox={game.data.attributes.xbox}
                playstation={game.data.attributes.playstation}
                nintendo={game.data.attributes.nintendo}
                steam={game.data.attributes.steam}
                epic={game.data.attributes.epic}
                website={game.data.attributes.website}
                store={game.data.attributes.store}
              />

              {/* <!-- Tabs --> */}
              <div className="max-width">
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

                              {/* Name */}
                              <div className="flex flex-col mb-4">
                                <p className="font-bold">Name</p>
                                <p className="flow-auto">{game.data.attributes.name}</p>
                              </div>

                              {/* Introduction */}
                              {game.data.attributes.introduction && (
                                <div className="flex flex-col mb-4">
                                  <p className="font-bold">Introduction</p>
                                  <p className="flow-auto">{game.data.attributes.introduction}</p>
                                </div>
                              )}

                              {/* Date of birth */}
                              {game.data.attributes.ate_of_birth && (
                                <div className="flex flex-col mb-4">
                                  <p className="font-bold">Date of birth</p>
                                  <p className="flow-auto">{game.data.attributes.ate_of_birth}</p>
                                </div>
                              )}

                              {/* Country */}
                              {/* {game.country && (
                                <div className="flex flex-col mb-4">
                                  <p className="font-bold">Country</p>
                                  <p className="flow-auto">{game.country}</p>
                                </div>
                              )} */}

                              {/* Languages */}
                              {/* {game.languages && (
                                <div className="flex flex-col mb-4">
                                  <p className="font-bold">Languages</p>
                                  <p className="flow-auto">{game.languages}</p>
                                </div>
                              )} */}

                              {/* Genre */}
                              {/* {game.genres ? (
                              <div className="flex flex-col mb-4">
                                <p className="font-bold">Date of birth</p>
                                <p className="flow-auto">{game.genres}</p>
                              </div>
                            ) : (
                              <div></div>
                            )} */}

                              {/* Verified profile */}
                              {/* {game.verified_profile && (
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

                            <div className="xs:block sm:block md:block lg:hidden xl:hidden">
                              {game.data.attributes.stream_twitch && (
                                <CardTwitch twitchId={game.data.attributes.stream_twitch} />
                              )}
                            </div>

                            <div className="xs:block sm:block md:block lg:hidden xl:hidden">
                              {game.data.attributes.video_feature_1 ? (
                                <CardYoutube video1={game.data.attributes.video_feature_1} />
                              ) : (
                                <div
                                  className="bg-light rounded-3xl border-none p-4 sm:w-full h-40 bg-cover bg-no-repeat"
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
                              )}
                            </div>
                          </div>
                        </section>

                        {/* Right */}
                        <div className="lg:-mt-1 xl:-mt-1 col-span-2">
                          <div className="flex flex-col gap-5 sm:w-full xs:w-full">
                            <div className="xs:hidden sm:hidden md:hidden lg:block xl:block">
                              {game.data.attributes.stream_twitch && (
                                <CardTwitch
                                  twitchId={game.data.attributes.stream_twitch}
                                  height="460px"
                                />
                              )}
                            </div>

                            <div className="xs:hidden sm:hidden md:hidden lg:block xl:block">
                              {game.data.attributes.video_feature_1 ? (
                                <CardYoutube video1={game.data.attributes.video_feature_1} />
                              ) : (
                                <div
                                  className="rounded-3xl border-none p-4 sm:w-full h-40 bg-cover bg-no-repeat"
                                  style={{ backgroundImage: `url(${hexagon_background})` }}
                                >
                                  {!id === game.data.id ? (
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
                            </div>

                            {/* <div className="xs:hidden sm:hidden md:hidden lg:block xl:block">
                            {game.twitch && (
                              <CardTwitch
                                video1={game.twitch}
                              />
                            )}
                            </div> */}

                            {/* <div className="xs:block sm:block md:block lg:block xl:block">

                              {tweets.map((tweet) => (
                                <CardTwitter key={tweet.id} {...tweet}/>
                              ))}
                              
                            </div> */}

                            {game.data.attributes.image_feature_1 ? (
                              <div className="bg-light rounded-3xl border-none p-4 sm:w-full h-auto bg-cover bg-no-repeat">
                                <img
                                  src={
                                    game.data.attributes.image_feature_1 &&
                                    game.data.attributes.image_feature_1.url
                                  }
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
                            )}
                          </div>
                        </div>
                      </div>

                      {/*  */}
                    </div>

                    <div>
                      {/* <CarouselCards titleText="Games">
                        {game.games.map(game => (
                          <CardGame
                            id={game.id}
                            image_profile={game.image_profile}
                            name={game.name}
                          />
                        ))}
                      </CarouselCards> */}

                      {/* <CardGrid style1={"grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4"}>
                          {
                            user.map(video => (
                              <CardYoutube
                                  id={video.id}
                                  featured1={video.featured1} 
                                  
                              />
                          ))}
                        </CardGrid> */}
                    </div>
                  </div>

                  {/* Tab 2 */}
                  <div label="About">
                    <div className="gap-5 mx-4 md:flex-row mt-8 mb-20">
                      {/* Section 1 */}
                      <div className="mb-8 grid grid-cols-1 lg:gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                        {/* Left */}
                        <section className="xs:my-8 lg:col-start-1 w-full lg:-mt-1 xl:-mt-1">
                          <div className="flex flex-col gap-5 w-full">
                            <div className="bg-light rounded-3xl border-none p-8 w-full">
                              <h3>Details</h3>

                              {/* Name */}
                              <div className="flex flex-wrap mb-4">
                                <p className="font-bold">Name:</p>
                                <p className="flow-auto">{game.data.attributes.name}</p>
                              </div>
                            </div>

                            <div className="bg-light rounded-3xl border-none p-8 sm:w-full xs:w-full">
                              <h3>Statistics</h3>
                            </div>
                          </div>
                        </section>
                        {/* Right */}
                        <div className="lg:-mt-1 xl:-mt-1 col-span-2">
                          <div className="flex flex-col gap-5 sm:w-full xs:w-full">
                            {game.data.attributes.description && (
                              <div className="bg-light rounded-3xl border-none p-4 sm:w-full h-auto bg-cover bg-no-repeat">
                                <h3>Description</h3>

                                {/* Description */}
                                <div className="flex flex-wrap mb-4">
                                  <p className="flow-auto">{game.data.attributes.description}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/*  */}
                    </div>
                  </div>

                  {/* Tab 3 */}
                  <div className="" label="Highlights">
                    {/* Highlight videos and images */}
                    <div className="mx-4 mt-8 mb-12">
                      <TabsHeadlessUi
                        tab1title="Videos"
                        tab1={
                          <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
                            {game.data.attributes.video_highlight_1 ? (
                              <div className="">
                                {game.data.attributes.video_highlight_1 && (
                                  <CardYoutube video1={game.data.attributes.video_highlight_1} />
                                )}
                              </div>
                            ) : (
                              <div
                                className="rounded-3xl border-none p-4 sm:w-full h-40 bg-cover bg-no-repeat"
                                style={{ backgroundImage: `url(${hexagon_background})` }}
                              >
                                {!id === game.data.id ? (
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

                            {game.data.attributes.video_highlight_2 && (
                              <div className="">
                                {game.data.attributes.video_highlight_2 && (
                                  <CardYoutube video1={game.data.attributes.video_highlight_2} />
                                )}
                              </div>
                            )}

                            {game.data.attributes.video_highlight_3 && (
                              <div className="">
                                {game.data.attributes.video_highlight_3 && (
                                  <CardYoutube video1={game.data.attributes.video_highlight_3} />
                                )}
                              </div>
                            )}

                            {game.data.attributes.video_highlight_4 && (
                              <div className="">
                                {game.data.attributes.video_highlight_4 && (
                                  <CardYoutube video1={game.data.attributes.video_highlight_4} />
                                )}
                              </div>
                            )}
                          </div>
                        }
                        tab2title="Images"
                        tab2={
                          <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
                            {game.data.attributes.image_highlight_1!==undefined && game.data.attributes.image_highlight_1.data!==null? (
                              <div className="rounded-3xl border-none p-4 sm:w-full h-auto bg-cover bg-no-repeat">
                                <img
                                  src={game.data.attributes.image_highlight_1.data!==null && game.data.attributes.image_highlight_1.data.attributes.url}
                                  className="h-full w-full rounded-3xl"
                                />
                              </div>
                            ) : (
                              <div
                                className="rounded-3xl border-none p-4 sm:w-full h-40 bg-cover bg-no-repeat"
                                style={{ backgroundImage: `url(${hexagon_background})` }}
                              >
                                {!id === game.data.id ? (
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

                            {game.data.attributes.image_highlight_2!==undefined && game.data.attributes.image_highlight_2.data!==null&& (
                              <div className="rounded-3xl border-none p-4 sm:w-full h-auto bg-cover bg-no-repeat">
                                <img
                                  src={game.data.attributes.image_highlight_2.data!==null&&game.data.attributes.image_highlight_2.data.attributes.url}
                                  className="h-full w-full rounded-3xl"
                                />
                              </div>
                            )}

                            {game.data.attributes.image_highlight_3!==undefined &&game.data.attributes.image_highlight_3.data!==null && (
                              <div className="rounded-3xl border-none p-4 sm:w-full h-auto bg-cover bg-no-repeat">
                                <img
                                  src={game.data.attributes.image_highlight_3.data!==null &&game.data.attributes.image_highlight_3.data.attributes.url}
                                  className="h-full w-full rounded-3xl"
                                />
                              </div>
                            )}

                            {game.data.attributes.image_highlight_4!==undefined && game.data.attributes.image_highlight_4.data!==null&& (
                              <div className="rounded-3xl border-none p-4 sm:w-full h-auto bg-cover bg-no-repeat">
                                <img
                                  src={game.data.attributes.image_highlight_4.data!==null&& game.data.attributes.image_highlight_4.data.attributes.url}
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
                  <div label="Characters">
                    {/* Section 1 */}
                    <div className="mx-4 mb-8 grid grid-cols-1 lg:gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                      {/* Filters */}
                      <section className="xs:my-8 lg:col-start-1 w-full">
                        <div className="bg-light px-4 py-5 shadow rounded-lg ">
                          <div className="flex flex-col w-full">
                            <Select
                              getOptionLabel={option => `${option.username} ${option.gamertag}`}
                              getOptionValue={option => option.id}
                              options={users}
                              instanceId="users"
                              placeholder="filter by users"
                              isClearable
                              onChange={value => setUserId(value ? value.id : null)}
                            />

                            <br />

                            <Select
                              getOptionLabel={option => `${option.name}`}
                              getOptionValue={option => option.id}
                              options={teams}
                              instanceId="teams"
                              placeholder="filter by teams"
                              isClearable
                              onChange={value => setTeamId(value ? value.id : null)}
                            />
                          </div>
                        </div>
                      </section>
                      {/* Content */}
                      <div className="lg:-mt-10 xl:-mt-10 col-span-2">
                        {/* Characters */}
                        {status === 'loading' && <div>I'm loading your players</div>}
                        {status === 'error' && <div>Something went wrong</div>}

                        <CardGrid
                          style1={
                            'grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4 '
                          }
                        >
                          {game?.data.attributes.characters?.data.map(character => (
                            <CardCharacter
                              id={character.id}
                              character={character}
                              image_profile={character.image_profile}
                              name={character.attributes.name}
                              style1={
                                'grid text-center border-none rounded-3xl bg-light hover:bg-primary'
                              }
                              style2={
                                'mx-auto bg-cover bg-no-repeat h-28 w-28 image-placeholder rounded-full bg-white'
                              }
                              style3={
                                'mx-auto bg-cover bg-no-repeat h-28 w-28 image-placeholder rounded-full placeholder overflow-hidden text-transparent'
                              }
                              /* genres={game.genres?.map((gameList) =>
                                  gameList.name
                                )} */
                              responsive={true}
                            />
                          ))}
                        </CardGrid>
                      </div>
                    </div>
                  </div>

                  {/* Tab 4 */}
                  <div label="Patch notes">
                    {/* Section 1 */}
                    <div className="mx-4 mb-8 grid grid-cols-1 lg:gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                      {/* Filters */}
                      <section className="xs:my-8 lg:col-start-1 w-full">
                        <div className="bg-light px-4 py-5 shadow rounded-lg ">
                          <div className="flex flex-col w-full">
                            <Select
                              getOptionLabel={option => `${option.username} ${option.gamertag}`}
                              getOptionValue={option => option.id}
                              options={users}
                              instanceId="users"
                              placeholder="filter by users"
                              isClearable
                              onChange={value => setUserId(value ? value.id : null)}
                            />

                            <br />

                            <Select
                              getOptionLabel={option => `${option.name}`}
                              getOptionValue={option => option.id}
                              options={teams}
                              instanceId="teams"
                              placeholder="filter by teams"
                              isClearable
                              onChange={value => setTeamId(value ? value.id : null)}
                            />
                          </div>
                        </div>
                      </section>
                      {/* Content */}
                      <div className="lg:-mt-10 xl:-mt-10 col-span-2">
                        {/* Characters */}
                        {status === 'loading' && <div>I'm loading your players</div>}
                        {status === 'error' && <div>Something went wrong</div>}
                        <CardGrid
                          style1={
                            'grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4 '
                          }
                        >
                          {game?.data.attributes.characters?.data?.map(character => (
                            <CardCharacter
                              id={character.id}
                              image_profile={
                                character.attributes?.image_profile?.data?.attributes.url
                              }
                              name={character.attributes.name}
                              style1={
                                'grid text-center border-none rounded-3xl bg-light hover:bg-primary'
                              }
                              style2={
                                'mx-auto bg-cover bg-no-repeat h-28 w-28 image-placeholder rounded-full'
                              }
                              style3={
                                'mx-auto bg-cover bg-no-repeat h-28 w-28 image-placeholder rounded-full placeholder overflow-hidden text-transparent'
                              }
                              genres={game?.data.attributes?.genres?.map(
                                gameList => gameList.attributes.name
                              )}
                            />
                          ))}
                        </CardGrid>
                      </div>
                    </div>
                  </div>

                  {/* Tab 4 */}
                  <div label="Players">
                    {/* Section 1 */}
                    <div className="mx-4 mb-8 grid grid-cols-1 lg:gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                      {/* Filters */}
                      <section className="xs:my-8 lg:col-start-1 w-full">
                        <div className="bg-light px-4 py-5 shadow rounded-lg ">
                          <div className="flex flex-col w-full">
                            <Select
                              getOptionLabel={option => `${option.username} ${option.gamertag}`}
                              getOptionValue={option => option.id}
                              options={users}
                              instanceId="users"
                              placeholder="filter by users"
                              isClearable
                              onChange={value => setUserId(value ? value.id : null)}
                            />

                            <br />

                            <Select
                              getOptionLabel={option => `${option.name}`}
                              getOptionValue={option => option.id}
                              options={teams}
                              instanceId="teams"
                              placeholder="filter by teams"
                              isClearable
                              onChange={value => setTeamId(value ? value.id : null)}
                            />
                          </div>
                        </div>
                      </section>
                      {/* Content */}
                      <div className="lg:-mt-10 xl:-mt-10 col-span-2">
                        {/* Players */}
                        {status === 'loading' && <div>I'm loading your players</div>}
                        {status === 'error' && <div>Something went wrong</div>}
                        <CardGrid
                          style1={
                            'grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4 '
                          }
                        >
                          {game.players?.map(user => (
                            <CardUser
                              id={user.id}
                              user={user}
                              username={user.username}
                              image_profile={user.image_profile}
                              email={user.email}
                              gamertag={user.gamertag}
                              team={user.teams?.map(teamList => teamList.name)}
                              games={user.games?.map(sub => sub.name)}
                              responsive={true}
                            />
                          ))}
                        </CardGrid>
                      </div>
                    </div>
                  </div>

                  {/* Tab 5 */}
                  <div label="Teams">
                    {/* Section 1 */}
                    <div className="mx-4 mb-8 grid grid-cols-1 lg:gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                      {/* Filters */}
                      <section className="xs:my-8 lg:col-start-1 w-full">
                        <div className="bg-light px-4 py-5 shadow rounded-lg ">
                          <div className="flex flex-col w-full">
                            <Select
                              getOptionLabel={option => `${option.username} ${option.gamertag}`}
                              getOptionValue={option => option.id}
                              options={users}
                              instanceId="users"
                              placeholder="filter by users"
                              isClearable
                              onChange={value => setUserId(value ? value.id : null)}
                            />

                            <br />

                            <Select
                              getOptionLabel={option => `${option.name}`}
                              getOptionValue={option => option.id}
                              options={teams}
                              instanceId="teams"
                              placeholder="filter by teams"
                              isClearable
                              onChange={value => setTeamId(value ? value.id : null)}
                            />
                          </div>
                        </div>
                      </section>
                      {/* Content */}
                      <div className="lg:-mt-10 xl:-mt-10 col-span-2">
                        {/* Teams */}
                        {status === 'loading' && <div>I'm loading your players</div>}
                        {status === 'error' && <div>Something went wrong</div>}
                        <CardGrid
                          style1={
                            'grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4 '
                          }
                        >
                          {game?.data?.attributes?.teams?.data?.map(team => (
                            <CardTeam
                              id={team.id}
                              team={team}
                              username={team.username}
                              image_profile={team.attributes.boolean_image_feature_1}
                              name={team.attributes.name}
                              organisation={team.teams?.map(teamList => teamList.name)}
                              games={team.games?.map(sub => sub.name)}
                              responsive={true}
                            />
                          ))}
                        </CardGrid>
                      </div>
                    </div>
                  </div>

                  {/* Tab 5 */}
                  <div label="Organisations">
                    {/* Section 1 */}
                    <div className="mx-4 mb-8 grid grid-cols-1 lg:gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                      {/* Filters */}
                      <section className="xs:my-8 lg:col-start-1 w-full">
                        <div className="bg-light px-4 py-5 shadow rounded-lg ">
                          <div className="flex flex-col w-full">
                            <Select
                              getOptionLabel={option => `${option.username} ${option.gamertag}`}
                              getOptionValue={option => option.id}
                              options={users}
                              instanceId="users"
                              placeholder="filter by users"
                              isClearable
                              onChange={value => setUserId(value ? value.id : null)}
                            />

                            <br />

                            <Select
                              getOptionLabel={option => `${option.name}`}
                              getOptionValue={option => option.id}
                              options={teams}
                              instanceId="teams"
                              placeholder="filter by teams"
                              isClearable
                              onChange={value => setTeamId(value ? value.id : null)}
                            />
                          </div>
                        </div>
                      </section>
                      {/* Content */}
                      <div className="lg:-mt-10 xl:-mt-10 col-span-2">
                        {/* Organisations */}
                        {status === 'loading' && <div>I'm loading your players</div>}
                        {status === 'error' && <div>Something went wrong</div>}
                        <CardGrid
                          style1={
                            'grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4 '
                          }
                        >
                          {game?.data.attributes?.organisations?.data?.map(organisation => (
                            <CardOrganisation
                              id={organisation.id}
                              organisation={organisation}
                              username={organisation.attributes.username}
                              image_profile={organisation.image_profile}
                              name={organisation.attributes.name}
                              teamusername={organisation.teams?.map(teamList => teamList.name)}
                              games={organisation.games?.map(gameList => gameList.name)}
                              responsive={true}
                            />
                          ))}
                        </CardGrid>
                      </div>
                    </div>
                  </div>

                  {/* Tab 5 */}
                  <div label="Communities">
                    {/* Section 1 */}
                    <div className="mx-4 mb-8 grid grid-cols-1 lg:gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                      {/* Filters */}
                      <section className="xs:my-8 lg:col-start-1 w-full">
                        <div className="bg-light px-4 py-5 shadow rounded-lg ">
                          <div className="flex flex-col w-full">
                            <Select
                              getOptionLabel={option => `${option.username} ${option.gamertag}`}
                              getOptionValue={option => option.id}
                              options={users}
                              instanceId="users"
                              placeholder="filter by users"
                              isClearable
                              onChange={value => setUserId(value ? value.id : null)}
                            />

                            <br />

                            <Select
                              getOptionLabel={option => `${option.name}`}
                              getOptionValue={option => option.id}
                              options={teams}
                              instanceId="teams"
                              placeholder="filter by teams"
                              isClearable
                              onChange={value => setTeamId(value ? value.id : null)}
                            />
                          </div>
                        </div>
                      </section>
                      {/* Content */}
                      <div className="lg:-mt-10 xl:-mt-10 col-span-2">
                        {/* Players */}
                        {status === 'loading' && <div>I'm loading your players</div>}
                        {status === 'error' && <div>Something went wrong</div>}
                        <CardGrid
                          style1={
                            'grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4 '
                          }
                        >
                          {game?.data?.attributes?.communities?.data?.map(community => (
                            <CardCommunity
                              id={community.id}
                              community={community}
                              username={community?.attributes.username}
                              image_profile={community.image_profile}
                              name={community.attributes.name}
                              /* team={community.teams?.map((teamList) =>
                                teamList.name,
                                teamList.usename,
                                teamList.id
                              )} */
                              responsive={true}
                            />
                          ))}
                        </CardGrid>
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

export default ProfileGame;
