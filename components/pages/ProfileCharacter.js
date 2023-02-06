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
import HeaderFeaturedSkeleton from '../ui/Header/HeaderFeaturedSkeleton';
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

const ProfileCharacter = ({ match, history }) => {
  const { id } = match.params;

  const character = useSelector(state => state.character.data);

  const dispatch = useDispatch();

  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [games, setGames] = useState([]);
  //const [character, setCharacter] = useState({});
  const [characters, setCharacters] = useState([]);
  const [showLoading, setShowLoading] = useState(true);

  const location = useLocation();
  const tabFromUrl = new URLSearchParams(location.search).get('tab');

  // Used for the edit form

  const fetchData = async () => {
    try {
      const res = await fetch(`https://hivefolio.herokuapp.com/api/characters/${id}?populate=*`);
      const charactersData = await fetch(
        `https://hivefolio.herokuapp.com/api/characters?populate=*`
      );
      const data = await res.json();

      setCharacter(data);
      setCharacters(charactersData);
      setShowLoading(false);
    } catch (err) {
      setShowLoading(false);
      console.error(err);
    }
  };

  const updateCharacter = () => {
    character.username === undefined;
    return setShowLoading(true);
  };
  // console.log('character=========>', character);
  useEffect(() => {
    //fetchData();
    //updateCharacter();
    dispatch(fetchCharacter(id));
    return () => {
      dispatch(removeSelectedCharacter());
    };
  }, [id]);

  return (
    <IonPage>
      <IonHeader>
        <title>{character!==undefined && character.attributes.name} - Hivefolio</title>
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
          {character==undefined && (
            <div className="mt-6">
              <HeaderFeaturedSkeleton />
            </div>
          )}

          {character!==undefined && (
            <div>
              <HeaderProfileCharacter
                id={id}
                name={character.attributes.name}
                tagline={character.attributes.tagline}
                image_profile={character.attributes.image_profile}
                image_background={character.attributes.image_background}
                type_character={character.attributes.type_character}
                games={character.attributes.games}
                follows={character.attributes.follows}
                followcharacters={character.attributes.followcharacters}
                likes={character.attributes.likes}
                image_highlight_1={character.attributes.image_highlight_1}
                image_1={character.attributes.image_1}
                featured_character={character.attributes.featured_character}
                update={character.attributes.update}
                facebook={character.attributes.facebook}
                twitter={character.attributes.twitter}
                instagram={character.attributes.instagram}
                twitch={character.attributes.twitch}
                tiktok={character.attributes.tiktok}
                youtube={character.attributes.youtube}
                discord={character.attributes.discord}
                linkedin={character.attributes.linkedin}
                xbox={character.attributes.xbox}
                playstation={character.attributes.playstation}
                nintendo={character.attributes.nintendo}
                steam={character.attributes.steam}
                epic={character.attributes.epic}
                website={character.attributes.website}
                store={character.attributes.store}
              />

              <div className="max-width">
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
                                  <p className="flow-auto">{character.attributes.name}</p>
                                </div>

                                {/* Introduction */}
                                {character.attributes.introduction && (
                                  <div className="flex flex-col mb-4">
                                    <p className="font-bold">Introduction</p>
                                    <p className="flow-auto">{character.attributes.introduction}</p>
                                  </div>
                                )}

                                {/* Date of birth */}
                                {character.attributes.date_of_birth && (
                                  <div className="flex flex-col mb-4">
                                    <p className="font-bold">Date of birth</p>
                                    <p className="flow-auto">
                                      {character.attributes.date_of_birth}
                                    </p>
                                  </div>
                                )}

                                {/* Country */}
                                {character.attributes.country && (
                                  <div className="flex flex-col mb-4">
                                    <p className="font-bold">Country</p>
                                    <p className="flow-auto">{character.attributes.country}</p>
                                  </div>
                                )}

                                {/* Languages */}
                                {character.attributes.languages && (
                                  <div className="flex flex-col mb-4">
                                    <p className="font-bold">Languages</p>
                                    <p className="flow-auto">{character.attributes.languages}</p>
                                  </div>
                                )}

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
                                {character.attributes.verified_profile && (
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
                                {character.attributes.video_feature_1 ? (
                                  <CardYoutube video1={character.attributes.video_feature_1} />
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
                              </div>

                              <div className="bg-light rounded-3xl border-none p-8 sm:w-full xs:w-full">
                                <h3>Statistics</h3>
                              </div>

                              <div className="bg-light rounded-3xl border-none p-8 sm:w-full xs:w-full">
                                <h3>Games</h3>

                                {character.attributes.games!==undefined && character.attributes.games.data!==null&& character.attributes.games.data
                                  .sort(() => Math.random() - 0.5)
                                  .map(game => (
                                    <CardGame
                                      id={game.id}
                                      game={game}
                                      image_profile={game.attributes.image_profile}
                                      name={game.attributes.name}
                                      //  team={game.attributes.teams.data.map((teamList) =>
                                      //   teamList.attributes.name
                                      // )}
                                      full={true}
                                    />
                                  ))}
                              </div>
                            </div>
                          </section>

                          {/* Right */}
                          <div className="lg:-mt-1 xl:-mt-1 col-span-2">
                            <div className="flex flex-col gap-5 sm:w-full xs:w-full">
                              <div className="xs:hidden sm:hidden md:hidden lg:block xl:block">
                                {character.attributes.video_feature_1 ? (
                                  <CardYoutube video1={character.attributes.video_feature_1} />
                                ) : (
                                  <div
                                    className="rounded-3xl border-none p-4 sm:w-full h-40 bg-cover bg-no-repeat"
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

                              {character.attributes.image_full!==undefined && character.attributes.image_full.data!==null? (
                                <div className="bg-light rounded-3xl border-none p-4 sm:w-full h-auto bg-cover bg-no-repeat">
                                  <img
                                    src={
                                      character.attributes.image_full.data!==null &&
                                      character.attributes.image_full.data.attributes.url
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
                        <CarouselCards
                          titleText="Related characters"
                          infinite={false}
                          xl={1280}
                          xlItems={6}
                          xlScroll={6}
                          xlInfinite={false}
                          lg={1108}
                          lgItems={4}
                          lgScroll={3}
                          lgInfinite={false}
                          md={800}
                          mdItems={3}
                          mdScroll={2}
                          mdInfinite={false}
                          sm={700}
                          smItems={2}
                          smScroll={1}
                          smInfinite={false}
                          xs={320}
                          xsItems={1}
                          xsScroll={1}
                          xsInfinite={false}
                        >
                          {character.attributes.related_characters!==undefined &&character.attributes.related_characters.data!==null && character.attributes.related_characters.data
                            ?.sort(() => Math.random() - 0.5)
                            .map(character => (
                              <CardCharacter
                                id={character.id}
                                character={character}
                                image_profile={character.attributes.image_profile}
                                name={character.attributes.name}
                              />
                            ))}
                        </CarouselCards>
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
                                  <p className="flow-auto">{character.attributes.name}</p>
                                </div>
                              </div>

                              <div
                                className="bg-light rounded-3xl border-none p-4 sm:w-full h-auto bg-cover bg-no-repeat"
                                /* style={{
                                backgroundImage: `url(${character.image_highlight_1 && character.image_highlight_1.url})`
                                }} */
                              >
                                <img
                                  src={
                                    character.attributes.image_profile !== undefined &&
                                    character.attributes.image_profile.data !== null &&
                                    character.attributes.image_profile.data.attributes.url
                                  }
                                  className="h-full w-full rounded-3xl"
                                />
                              </div>

                              <div className="bg-light rounded-3xl border-none p-8 sm:w-full xs:w-full">
                                <h3>Statistics</h3>
                              </div>
                            </div>
                          </section>
                          {/* Right */}
                          <div className="lg:-mt-1 xl:-mt-1 col-span-2">
                            <div className="flex flex-col gap-5 sm:w-full xs:w-full">
                              {character.attributes.description && (
                                <div className="bg-light rounded-3xl border-none p-4 sm:w-full h-auto bg-cover bg-no-repeat">
                                  <h3>Description</h3>

                                  {/* Description */}
                                  <div className="flex flex-wrap mb-4">
                                    <ReactMarkdown
                                      source={character.attributes.description}
                                      escapeHtml={false}
                                      className="flow-auto"
                                    />
                                    <ReactMarkdown
                                      source={character.attributes.description}
                                      escapeHtml={false}
                                    />

                                    {/* <div dangerouslySetInnerHTML={{__html: character.description}}/> */}
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
                      {/* Highlights video and images */}
                      <div className="mx-4 mt-8 mb-12">
                        <TabsHeadlessUi
                          tab1title="Videos"
                          tab1={
                            <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
                              {character.attributes.video_highlight_1 ? (
                                <div className="">
                                  {character.attributes.video_highlight_1 && (
                                    <CardYoutube video1={character.attributes.video_highlight_1} />
                                  )}
                                </div>
                              ) : (
                                <div
                                  className="rounded-3xl border-none p-4 sm:w-full h-40 bg-cover bg-no-repeat"
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

                              {character.attributes.video_highlight_2 && (
                                <div className="">
                                  {character.attributes.video_highlight_2 && (
                                    <CardYoutube video1={character.attributes.video_highlight_2} />
                                  )}
                                </div>
                              )}

                              {character.attributes.video_highlight_3 && (
                                <div className="">
                                  {character.attributes.video_highlight_3 && (
                                    <CardYoutube video1={character.attributes.video_highlight_3} />
                                  )}
                                </div>
                              )}

                              {character.attributes.video_highlight_4 && (
                                <div className="">
                                  {character.attributes.video_highlight_4 && (
                                    <CardYoutube video1={character.attributes.video_highlight_4} />
                                  )}
                                </div>
                              )}
                            </div>
                          }
                          tab2title="Images"
                          tab2={
                            <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
                              {character.attributes.image_highlight_1 !== undefined &&
                              character.attributes.image_highlight_1.data !== null ? (
                                <div className="rounded-3xl border-none p-4 sm:w-full h-auto bg-cover bg-no-repeat">
                                  <img
                                    src={
                                      character.attributes.image_highlight_1.data !== null &&
                                      character.attributes.image_highlight_1.data.attributes.url
                                    }
                                    className="h-full w-full rounded-3xl"
                                  />
                                </div>
                              ) : (
                                <div
                                  className="rounded-3xl border-none p-4 sm:w-full h-40 bg-cover bg-no-repeat"
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

                              {character.attributes.image_highlight_2 !== undefined &&
                                character.attributes.image_highlight_2.data !== null && (
                                  <div className="rounded-3xl border-none p-4 sm:w-full h-auto bg-cover bg-no-repeat">
                                    <img
                                      src={
                                        character.attributes.image_highlight_2.data !== null &&
                                        character.attributes.image_highlight_2.data.attributes.url
                                      }
                                      className="h-full w-full rounded-3xl"
                                    />
                                  </div>
                                )}

                              {character.attributes.image_highlight_3 !== undefined &&
                                character.attributes.image_highlight_3.data !== null && (
                                  <div className="rounded-3xl border-none p-4 sm:w-full h-auto bg-cover bg-no-repeat">
                                    <img
                                      src={
                                        character.attributes.image_highlight_3.data !== null &&
                                        character.attributes.image_highlight_3.data.attributes.url
                                      }
                                      className="h-full w-full rounded-3xl"
                                    />
                                  </div>
                                )}

                              {character.attributes.image_highlight_4 !== undefined &&
                                character.attributes.image_highlight_4.data !== null && (
                                  <div className="rounded-3xl border-none p-4 sm:w-full h-auto bg-cover bg-no-repeat">
                                    <img
                                      src={
                                        character.attributes.image_highlight_4.data !== null &&
                                        character.attributes.image_highlight_4.data.attributes.url
                                      }
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
                                getOptionLabel={option => `${option.attributes.name}`}
                                getOptionValue={option => option.id}
                                options={teams}
                                instanceId="teams"
                                placeholder="filter by teams"
                                isClearable
                                onChange={value => setTeamId(value ? value.id : null)}
                              />

                              <br />

                              <Select
                                getOptionLabel={option => `${option.attributes.name}`}
                                getOptionValue={option => option.id}
                                options={games}
                                instanceId="games"
                                isMulti
                                placeholder="filter by games"
                                onChange={values => setGameId(values.map(game => game.id))}
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
                            {status === 'success' &&
                              data.map(user => (
                                <CardUser
                                  id={user.id}
                                  user={user}
                                  image_profile={user.image_profile}
                                  email={user.email}
                                  gamertag={user.gamertag}
                                  team={user.teams.map(teamList => teamList.name)}
                                  games={user.games.map(sub => sub.name)}
                                  responsive={true}
                                />
                              ))}
                          </CardGrid>
                        </div>
                      </div>
                    </div>

                    {/* Tab 5 */}
                    <div label="Players">
                      <div className="mx-4 mt-8 mb-12">
                        {/* Section 1 */}
                        <div className=" mb-8 grid grid-cols-1 lg:gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                          {/* Filters */}
                          <section className="xs:my-8 lg:col-start-1 w-full">
                            <div className="bg-light px-4 py-5 shadow rounded-lg ">Filter</div>
                          </section>

                          {/* Content */}
                          <div className="lg:-mt-10 xl:-mt-10 col-span-2">
                            <CardGrid
                              style1={
                                'grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4 '
                              }
                            >
                              {character.attributes.players !== undefined &&
                                character.attributes.players.data !== null &&
                                character.attributes.players.data
                                  ?.sort(() => Math.random() - 0.5)
                                  ?.map(user => (
                                    <CardUser
                                      id={user.id}
                                      user={user}
                                      username={user.attributes.username}
                                      image_profile={user.attributes.image_profile}
                                      email={user.attributes.email}
                                      gamertag={user.attributes.gamertag}
                                    />
                                  ))}
                            </CardGrid>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabSub>
                </div>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default ProfileCharacter;
