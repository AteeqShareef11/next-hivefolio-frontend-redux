import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonLoading,
  IonModal,
  IonPage,
  IonRouterLink,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useQuery, useQueryClient } from 'react-query';
import Select from 'react-select';

/* Components */
import { NavButtons } from '../ui/Buttons/NavButtons';
import Hexagon from '../ui/Hexagon/Hexagon';
import HeaderProfileUser from '../ui/Header/HeaderProfileUser';
import Carousel from '../ui/Carousel/Carousel';
import CarouselCards from '../ui/Carousel/CarouselCards';
import CardTeam from '../ui/Card/CardTeam';
import CardOrganisation from '../ui/Card/CardOrganisation';
import CardCommunity from '../ui/Card/CardCommunity';
import CardGame from '../ui/Card/CardGame';
import CardYoutube from '../ui/Card/CardYoutube';
import CardTwitch from '../ui/Card/CardTwitch';
import CardTwitter from '../ui/Card/CardTwitter';
import TwitterFeed from '../ui/Twitter/TwitterFeed';
import CardGrid from '../ui/CardGrid/CardGrid';
import CarouselProfiles from '../ui/Carousel/CarouselProfiles';
import CardCharacter from '../ui/Card/CardCharacter';
import TabSub from '../ui/Tabs/TabSub';
import Footer from '../ui/Footer/Footer';
import ProfilePlaceholder from '../assets/images/profile_placeholder.png';
import hexagon_background from '../assets/images/hexagon_background.png';
import SelectTeams from '../ui/Select/SelectTeams';
import SelectListTeams from '../ui/SelectList/SelectListTeams';

/* Headless UI */

import { useCurrentUser } from '../context/AuthContext';
import { useLocation } from 'react-router';
import { getTweets } from '../utils/twitter';

/* Redux */
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, removeSelectedUser } from '../redux/actions/userActions';

const ProfileUserTest = ({ match, query }) => {
  const location = useLocation();
  const tabFromUrl = new URLSearchParams(location.search).get('tab');
  const { username } = useParams();
  const userLoggedIn = useCurrentUser();
  const [showLoading, setShowLoading] = useState(true);

  const user = useSelector(state => state.users.user);
  const {} = user;

  const dispatch = useDispatch();

  const contentRef = useRef(null);
  const scrollToTop = () => {
    contentRef.current && contentRef.current.scrollToTop();
  };

  /* const updateUser = () => {
    user.username === undefined;
    setShowLoading(true);
  }; */

  useEffect(() => {
    if (username && username !== '') dispatch(fetchUser(username), setShowLoading(false));
    return () => {
      dispatch(removeSelectedUser());
      setShowLoading(false);
    };
    scrollToTop();
  }, [username]);

  return (
    <IonPage>
      <IonHeader>
        <title>User - {username}</title>
        <IonToolbar className="">
          <div className="flex pl-4">
            <IonRouterLink routerLink="/">
              <Hexagon />
            </IonRouterLink>
          </div>
          <IonButtons slot="end">
            <NavButtons />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent ref={contentRef} scrollEvents={true}>
        <div className="m-auto">
          <IonLoading
            cssClass="my-custom-class"
            isOpen={showLoading}
            onDidDismiss={() => setShowLoading(false)}
            message={'Please wait...'}
          />
        </div>

        {user.username && (
          <div>
            <HeaderProfileUser
              id={user.id}
              user={user}
              gamertag={user.gamertag}
              username={user.username}
              tagline={user.tagline}
              games={user.games}
              image_profile={user.image_profile}
              image_background={user.image_background}
              typeuser={user.typeuser}
              facebook={user.facebook}
              twitter={user.twitter}
              instagram={user.instagram}
              twitch={user.twitch}
              tiktok={user.tiktok}
              youtube={user.youtube}
              discord={user.discord}
              linkedin={user.linkedin}
              xbox={user.xbox}
              playstation={user.playstation}
              nintendo={user.nintendo}
              steam={user.steam}
              epic={user.epic}
              website={user.website}
              store={user.store}
              verified_profile={user.verified_profile}
            />

            <div className="max-width">
              {/* <!-- Tabs --> */}
              {query}
              <TabSub initialTab={tabFromUrl}>
                {/* Tab 1 */}
                <div label="Overview">
                  <div className="gap-5 mx-4 md:flex-row mb-20 lg:mt-8 xl:mt-8">
                    {/* Section 1 */}
                    <div className="mb-8 grid grid-cols-1 lg:gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                      {/* Left */}
                      <section className="xs:my-8 lg:col-start-1 w-full lg:-mt-1 xl:-mt-1">
                        <div className="flex flex-col gap-5 w-full">
                          <div className="bg-light rounded-3xl border-none p-8 w-full">
                            <h3>Details</h3>

                            {/* Personal details */}
                            {user.firstname ||
                            user.lastname ||
                            user.introduction ||
                            user.date_of_birth ||
                            user.country ||
                            user.languages ? (
                              <div>
                                {(user.firstname || user.lastname) && (
                                  <div className="flex flex-col w-full mb-4">
                                    <p className="font-bold">Name</p>
                                    <p className="flow-auto">
                                      {user.firstname} {user.lastname}
                                    </p>
                                  </div>
                                )}
                                {user.introduction && (
                                  <div className="flex flex-col w-full mb-4">
                                    <p className="font-bold">Introduction</p>
                                    <p className="flow-auto">{user.introduction}</p>
                                  </div>
                                )}

                                {/* Date of birth */}
                                {user.date_of_birth && (
                                  <div className="flex flex-col mb-4">
                                    <p className="font-bold w-full">Date of birth </p>

                                    <p className="flow-auto">{user.date_of_birth}</p>
                                  </div>
                                )}

                                {/* Country */}
                                {user.country && (
                                  <div className="flex flex-col mb-4">
                                    <p className="font-bold">Country</p>
                                    <p className="flow-auto">{user.country}</p>
                                  </div>
                                )}

                                {/* Languages */}
                                {user.languages && (
                                  <div className="flex flex-col mb-4">
                                    <p className="font-bold">Languages</p>
                                    <p className="flow-auto">{user.languages}</p>
                                  </div>
                                )}

                                {/* Genre */}
                                {/* {user.genres ? (
                                      <div className="flex flex-col mb-4">
                                        <p className="font-bold">Date of birth:</p>
                                        <p className="flow-auto">{user.genres}</p>
                                      </div>
                                    ) : (
                                      <div></div>
                                    )} */}
                              </div>
                            ) : (
                              <div>
                                {user.id === userLoggedIn.id ? (
                                  <Link
                                    to={'/account'}
                                    className="inline-flex items-center justify-center h-12  
                                                px-6 mr-2 mb-2 font-medium tracking-wide transition 
                                                duration-200 bg-primary text-dark rounded-full hover:bg-dark hover:text-light
                                                focus:shadow-outline focus:outline-none"
                                  >
                                    Add a your details
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
                            {user.verified_profile && (
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
                            {user.stream_twitch ? (
                              <CardTwitch twitchId={user.stream_twitch} height={480} />
                            ) : (
                              <div
                                className="rounded-3xl border-none p-4 sm:w-full h-40 bg-cover bg-no-repeat"
                                style={{ backgroundImage: `url(${hexagon_background})` }}
                              >
                                {user.id === userLoggedIn.id ? (
                                  <Link
                                    to={'/account-streams'}
                                    className="inline-flex items-center justify-center h-12  
                                                  px-6 mr-2 mb-2 font-medium tracking-wide transition 
                                                  duration-200 bg-primary text-dark rounded-full hover:bg-dark hover:text-light
                                                  focus:shadow-outline focus:outline-none"
                                  >
                                    Add a Twitch stream
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
                          </div>

                          <div className="xs:block sm:block md:block lg:hidden xl:hidden">
                            {user.video_feature_1 ? (
                              <CardYoutube video1={user.video_feature_1} />
                            ) : (
                              <div
                                className="rounded-3xl border-none p-4 sm:w-full h-40 bg-cover bg-no-repeat"
                                style={{ backgroundImage: `url(${hexagon_background})` }}
                              >
                                {user.id === userLoggedIn.id ? (
                                  <Link
                                    to={'/account-media'}
                                    className="inline-flex items-center justify-center h-12  
                                                  px-6 mr-2 mb-2 font-medium tracking-wide transition 
                                                  duration-200 bg-primary text-dark rounded-full hover:bg-dark hover:text-light
                                                  focus:shadow-outline focus:outline-none"
                                  >
                                    Add a feature video
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
                          </div>

                          {/* <div className="xs:block sm:block md:block lg:hidden xl:hidden">
                            
                              <CardTwitter/>
                            
                            </div> */}

                          <div className="bg-light rounded-3xl border-none p-4 sm:w-full xs:w-full">
                            <h3 className="px-4 pt-4 -mb-4">Characters</h3>
                            {user.characters <= 0 ? (
                              <div>
                                {user.id === userLoggedIn.id ? (
                                  <Link
                                    to={'/account'}
                                    className="inline-flex items-center justify-center h-12  
                                                  px-6 mr-2 mb-2 font-medium tracking-wide transition 
                                                  duration-200 bg-primary text-dark rounded-full hover:bg-dark hover:text-light
                                                  focus:shadow-outline focus:outline-none"
                                  >
                                    Add your characters
                                  </Link>
                                ) : (
                                  <div
                                    className="inline-flex items-center justify-center h-12  
                                        px-6 mx-4 mb-2 mt-8 font-medium tracking-wide transition 
                                        duration-200 bg-dark text-light rounded-full
                                        focus:shadow-outline focus:outline-none"
                                  >
                                    Content coming soon
                                  </div>
                                )}
                              </div>
                            ) : (
                              <CarouselCards
                                infinite={false}
                                xl={1280}
                                xlItems={2}
                                xlScroll={2}
                                xlInfinite={false}
                                lg={1008}
                                lgItems={3}
                                lgScroll={3}
                                lgInfinite={false}
                                md={800}
                                mdItems={3}
                                mdScroll={2}
                                mdInfinite={false}
                                sm={700}
                                smItems={2}
                                smScroll={2}
                                smInfinite={false}
                                xs={320}
                                xsItems={1}
                                xsScroll={1}
                                xsInfinite={false}
                              >
                                {user.characters
                                  .sort(() => Math.random() - 0.5)
                                  .map(character => (
                                    <CardCharacter
                                      style1={
                                        'grid text-center border-none rounded-3xl bg-light hover:bg-primary'
                                      }
                                      style2={
                                        'mx-auto bg-cover bg-no-repeat h-24 w-24 sm:h-24 sm:w-24 lg:h-24 lg:w-24 xl:h-24 xl:w-24 image-placeholder rounded-full'
                                      }
                                      style3={
                                        'mx-auto bg-cover bg-no-repeat image-placeholder rounded-full placeholder overflow-hidden text-transparent'
                                      }
                                      id={character.id}
                                      username={character.username}
                                      image_profile={character.image_profile}
                                      name={character.name}
                                      games={character.games?.map(gameList => gameList.name)}
                                    />
                                  ))}
                              </CarouselCards>
                            )}
                          </div>
                        </div>
                      </section>

                      {/* Right */}
                      <div className="lg:-mt-1 xl:-mt-1 col-span-2">
                        <div className="flex flex-col gap-5 sm:w-full xs:w-full">
                          <div className="xs:hidden sm:hidden md:hidden lg:block xl:block">
                            {user.stream_twitch ? (
                              <CardTwitch twitchId={user.stream_twitch} height="460px" />
                            ) : (
                              <div
                                className="rounded-3xl border-none p-4 sm:w-full h-40 bg-cover bg-no-repeat"
                                style={{ backgroundImage: `url(${hexagon_background})` }}
                              >
                                {user.id === userLoggedIn.id ? (
                                  <Link
                                    to={'/account-streams'}
                                    className="inline-flex items-center justify-center h-12  
                                                  px-6 mr-2 mb-2 font-medium tracking-wide transition 
                                                  duration-200 bg-primary text-dark rounded-full hover:bg-dark hover:text-light
                                                  focus:shadow-outline focus:outline-none"
                                  >
                                    Add a Twitch stream
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
                          </div>

                          <div className="xs:hidden sm:hidden md:hidden lg:block xl:block">
                            {user.video_feature_1 ? (
                              <CardYoutube video1={user.video_feature_1} />
                            ) : (
                              <div
                                className="rounded-3xl border-none p-4 sm:w-full h-40 bg-cover bg-no-repeat"
                                style={{ backgroundImage: `url(${hexagon_background})` }}
                              >
                                {user.id === userLoggedIn.id ? (
                                  <Link
                                    to={'/account-media'}
                                    className="inline-flex items-center justify-center h-12  
                                                  px-6 mr-2 mb-2 font-medium tracking-wide transition 
                                                  duration-200 bg-primary text-dark rounded-full hover:bg-dark hover:text-light
                                                  focus:shadow-outline focus:outline-none"
                                  >
                                    Add a highlight video
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
                          </div>

                          {/* <div className="xs:block sm:block md:block lg:block xl:block">

                              {tweets.map((tweet) => (
                                <CardTwitter key={tweet.id} {...tweet}/>
                              ))}
                              
                            </div> */}

                          {user.image_feature_1 ? (
                            <div className="bg-light rounded-3xl border-none p-4 sm:w-full h-auto bg-cover bg-no-repeat">
                              <img
                                src={user.image_feature_1 && user.image_feature_1.url}
                                className="h-full w-full rounded-3xl"
                              />
                            </div>
                          ) : (
                            <div
                              className="rounded-3xl border-none p-4 sm:w-full h-40 bg-cover bg-no-repeat"
                              style={{ backgroundImage: `url(${hexagon_background})` }}
                            >
                              {user.id === userLoggedIn.id ? (
                                <Link
                                  to={'/account-media'}
                                  className="inline-flex items-center justify-center h-12  
                                                  px-6 mr-2 mb-2 font-medium tracking-wide transition 
                                                  duration-200 bg-primary text-dark rounded-full hover:bg-dark hover:text-light
                                                  focus:shadow-outline focus:outline-none"
                                >
                                  Add a feature image
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
                        </div>
                      </div>
                    </div>

                    {/*  */}
                  </div>

                  <div>
                    {user.games ? (
                      <CarouselCards
                        titleText={`${user.gamertag}'s competitive games`}
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
                        {user.games
                          .sort(() => Math.random() - 0.5)
                          .map(game => (
                            <CardGame
                              id={game.id}
                              image_profile={game.image_profile}
                              name={game.name}
                              /* genres={game.genres.map(genreList => genreList.name)} */
                            />
                          ))}
                      </CarouselCards>
                    ) : (
                      <div
                        className="rounded-3xl border-none p-4 sm:w-full h-40 bg-cover bg-no-repeat"
                        style={{ backgroundImage: `url(${hexagon_background})` }}
                      >
                        {user.id === userLoggedIn.id ? (
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
                  </div>
                </div>

                {/* Tab 2 */}
                <div className="" label="Highlights">
                  {/* Video */}
                  <div className="mx-4 mt-8 mb-12">
                    <div className="xs:mb-8">
                      <h2>Highlight videos</h2>
                    </div>

                    <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
                      {user.video_highlight_1 ? (
                        <div className="xs:hidden sm:hidden md:hidden lg:block xl:block">
                          {user.video_highlight_1 && (
                            <CardYoutube video1={user.video_highlight_1} />
                          )}
                        </div>
                      ) : (
                        <div
                          className="rounded-3xl border-none p-4 sm:w-full h-40 bg-cover bg-no-repeat"
                          style={{ backgroundImage: `url(${hexagon_background})` }}
                        >
                          {user.id === userLoggedIn.id ? (
                            <Link
                              to={'/account-media'}
                              className="inline-flex items-center justify-center h-12  
                                                  px-6 mr-2 mb-2 font-medium tracking-wide transition 
                                                  duration-200 bg-primary text-dark rounded-full hover:bg-dark hover:text-light
                                                  focus:shadow-outline focus:outline-none"
                            >
                              Add a highlight video
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

                      {user.video_highlight_2 && (
                        <div className="xs:hidden sm:hidden md:hidden lg:block xl:block">
                          {user.video_highlight_2 && (
                            <CardYoutube video1={user.video_highlight_2} />
                          )}
                        </div>
                      )}

                      {user.video_highlight_3 && (
                        <div className="xs:hidden sm:hidden md:hidden lg:block xl:block">
                          {user.video_highlight_3 && (
                            <CardYoutube video1={user.video_highlight_3} />
                          )}
                        </div>
                      )}

                      {user.video_highlight_4 && (
                        <div className="xs:hidden sm:hidden md:hidden lg:block xl:block">
                          {user.video_highlight_4 && (
                            <CardYoutube video1={user.video_highlight_4} />
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Images */}
                  <div className="mx-4 mt-8">
                    <div className="xs:mb-8">
                      <h2>Highlight images</h2>
                    </div>

                    <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
                      {user.image_highlight_1 ? (
                        <div className="rounded-3xl border-none p-4 sm:w-full h-auto bg-cover bg-no-repeat">
                          <img
                            src={user.image_highlight_1 && user.image_highlight_1.url}
                            className="h-full w-full rounded-3xl"
                          />
                        </div>
                      ) : (
                        <div
                          className="rounded-3xl border-none p-4 sm:w-full h-40 bg-cover bg-no-repeat"
                          style={{ backgroundImage: `url(${hexagon_background})` }}
                        >
                          {!user.id === user.id ? (
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
                              duration-200 bg-dark text-light rounded-full
                              focus:shadow-outline focus:outline-none"
                            >
                              Content coming soon
                            </div>
                          )}
                        </div>
                      )}

                      {user.image_highlight_2 && (
                        <div className="rounded-3xl border-none p-4 sm:w-full h-auto bg-cover bg-no-repeat">
                          <img
                            src={user.image_highlight_2 && user.image_highlight_2.url}
                            className="h-full w-full rounded-3xl"
                          />
                        </div>
                      )}

                      {user.image_highlight_3 && (
                        <div className="rounded-3xl border-none p-4 sm:w-full h-auto bg-cover bg-no-repeat">
                          <img
                            src={user.image_highlight_3 && user.image_highlight_3.url}
                            className="h-full w-full rounded-3xl"
                          />
                        </div>
                      )}

                      {user.image_highlight_4 && (
                        <div className="rounded-3xl border-none p-4 sm:w-full h-auto bg-cover bg-no-repeat">
                          <img
                            src={user.image_highlight_4 && user.image_highlight_4.url}
                            className="h-full w-full rounded-3xl"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Tab 3 */}
                <div label="Teams">
                  {/*  */}

                  <div className="max-width px-4">
                    <div className="xs:mb-8 mt-8">
                      <h3>Teams</h3>
                    </div>

                    {/* Section 1 */}
                    <div className=" mb-8 grid grid-cols-1 lg:gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                      {/* Filters */}
                      <section className="xs:my-8 lg:col-start-1 w-full">
                        <div className="bg-light px-4 py-5 shadow rounded-lg ">Filter</div>
                      </section>
                      {/* Content */}
                      <div className="lg:-mt-10 xl:-mt-10 col-span-2">
                        {user.teams <= 0 ? (
                          <div>
                            {user.id === userLoggedIn.id ? (
                              <Link
                                to={'/teams'}
                                className="inline-flex items-center justify-center h-12  
                                          px-6 mr-2 mb-2 font-medium tracking-wide transition 
                                          duration-200 bg-primary text-dark rounded-full hover:bg-dark hover:text-light
                                          focus:shadow-outline focus:outline-none"
                              >
                                Join an organisation
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
                        ) : (
                          <CardGrid
                            style1={
                              'grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4'
                            }
                            className="mt-8"
                          >
                            {user.teams.map(team => (
                              <CardTeam
                                id={team.id}
                                username={team.username}
                                image_profile={team.image_profile}
                                name={team.name}
                                teams={team.teams?.map(teamList => {
                                  teamname = teamList.name;
                                  teamusername = teamList.username;
                                })}
                              />
                            ))}
                          </CardGrid>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tab 4 */}
                <div label="Organisation">
                  <div className="mx-4 mt-8 mb-12">
                    <div className="xs:mb-8 mt-8">
                      <h2>Organisations</h2>
                    </div>

                    {user.organisations <= 0 ? (
                      <div>
                        {user.id === userLoggedIn.id ? (
                          <Link
                            to={'/organisations'}
                            className="inline-flex items-center justify-center h-12  
                                          px-6 mr-2 mb-2 font-medium tracking-wide transition 
                                          duration-200 bg-primary text-dark rounded-full hover:bg-dark hover:text-light
                                          focus:shadow-outline focus:outline-none"
                          >
                            Join an organisation
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
                    ) : (
                      <CardGrid
                        style1={
                          'grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 gap-4'
                        }
                        className="mt-8"
                      >
                        {user.organisations.map(organisation => (
                          <CardOrganisation
                            id={organisation.id}
                            username={organisation.username}
                            image_profile={organisation.image_profile}
                            name={organisation.name}
                            teams={organisation.teams?.map(teamList => {
                              teamname = teamList.name;
                              teamusername = teamList.username;
                            })}
                          />
                        ))}
                      </CardGrid>
                    )}
                  </div>
                </div>

                {/* Tab 4 */}
                <div label="Communities">
                  <div className="mx-4 mt-8 mb-12">
                    <div className="xs:mb-8 mt-8">
                      <h2>Communities</h2>
                    </div>

                    {user.communities <= 0 ? (
                      <div>
                        {user.id === userLoggedIn.id ? (
                          <Link
                            to={'/communities'}
                            className="inline-flex items-center justify-center h-12  
                                          px-6 mr-2 mb-2 font-medium tracking-wide transition 
                                          duration-200 bg-primary text-dark rounded-full hover:bg-dark hover:text-light
                                          focus:shadow-outline focus:outline-none"
                          >
                            Join a community
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
                    ) : (
                      <CardGrid
                        style1={
                          'grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 gap-4'
                        }
                      >
                        {user.communities.map(community => (
                          <CardCommunity
                            id={community.id}
                            username={community.username}
                            image_profile={community.image_profile}
                            name={community.name}
                          />
                        ))}
                      </CardGrid>
                    )}
                  </div>
                </div>
              </TabSub>
            </div>
          </div>
        )}
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default ProfileUserTest;
