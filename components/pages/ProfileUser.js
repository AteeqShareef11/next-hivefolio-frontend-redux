import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonLoading,
  IonModal,
  IonPage,
  IonRouterLink,
  IonSpinner,
  IonTitle,
  IonToggle,
  IonToolbar,
} from '@ionic/react';

import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useQuery, useQueryClient } from 'react-query';
import Select from 'react-select';

import ReactMarkdown from 'react-markdown';

/* Components */
import { NavButtons } from '../ui/Buttons/NavButtons';
import Hexagon from '../ui/Hexagon/Hexagon';
import HeaderProfileUser from '../ui/Header/HeaderProfileUser';
import HeaderFeaturedSkeleton from '../ui/Header/HeaderFeaturedSkeleton';
import Carousel from '../ui/Carousel/Carousel';
import CarouselCards from '../ui/Carousel/CarouselCards';
import CardTeam from '../ui/Card/CardTeam';
import CardOrganisation from '../ui/Card/CardOrganisation';
import CardGame from '../ui/Card/CardGame';
import CardYoutube from '../ui/Card/CardYoutube';
import CardTwitch from '../ui/Card/CardTwitch';
import CardTwitter from '../ui/Card/CardTwitter';
import CardDiscord from '../ui/Card/CardDiscord';
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
import TabsHeadlessUi from '../ui/Tabs/TabsHeadlessUi';
import CardExperienceUser from '../ui/User/CardExperienceUser';
import CardAchievementUser from '../ui/User/CardAchievementUser';

import CreateExperienceModalUser from '../ui/User/CreateExperienceModalUser';
import CreateAchievementModalUser from '../ui/User/CreateAchievementModalUser';

/* Headless UI */
import { Disclosure } from '@headlessui/react';
import { moon } from 'ionicons/icons';

import { useCurrentUser } from '../context/AuthContext';
import { useLocation } from 'react-router';
import { getTweets } from '../utils/twitter';

/* Redux */
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, removeSelectedUser, editUser } from '../redux/actions/coreActions';
import { fetchExperiences } from '../redux/actions/experienceAction';
import { fetchAchievements } from '../redux/actions/achievementAction';
import { fetchUsers, booleanToogle } from '../redux/actions/userActions';
import CardCommunity from '../ui/Card/CardCommunity';
//import { fetchUser, removeSelectedUser } from '../redux/actions/userActions';

const ProfileUser = ({ query }) => {
  const dispatch = useDispatch();

  const location = useLocation();
  const tabFromUrl = new URLSearchParams(location.search).get('tab');

  const { username } = useParams();
  const signedInUser = useCurrentUser();

  const [showCreateExperienceModal, setShowCreateExperienceModal] = useState(false);
  const [showCreateAchievementModal, setShowCreateAchievementModal] = useState(false);

  const users = useSelector(state => state.allUsers.users);
  const experiences = useSelector(state => state.allExperiences.experiences);
  const achievements = useSelector(state => state.allAchievements.achievements);
  const typeUsers = useSelector(state => state.allData.typeUsers);
  const selectedProfileUser = useSelector(state => state.user);

  console.log('users==========', users);
  console.log('experiences==========', experiences);
  console.log('selectedProfileUser==========', selectedProfileUser);
  console.log('achievements==========', achievements);
  console.log('typeUsers==========', typeUsers);

  const [videoFeature1, setVideoFeature1] = useState(boolean_video_feature_1);
  const [imageFeature1, setImageFeature1] = useState(boolean_image_feature_1);
  const [streamTwitchBoolean, setStreamTwitchBoolean] = useState(boolean_stream_twitch);

  let foundUser = {};
  if (users && users !== undefined && selectedProfileUser && selectedProfileUser !== undefined) {
    const matchUser = Array.isArray(users)
      ? users?.find(person => {
          return person?.id === selectedProfileUser?.id;
        })
      : {};
    foundUser = matchUser;
  }

  console.log('ProfileUser foundUser', foundUser);
  console.log('ProfileUser users', users);

  useEffect(() => {
    if (!users) {
      dispatch(fetchUsers());
    }
  }, [users]);

  const {
    id,
    teams,
    organisations,
    communities,
    image_profile,
    email,
    gamertag,
    games,
    discord,
    discord_channel,
    characters,
    firstname,
    lastname,
    introduction,
    date_of_birth,
    country,
    languages,
    verified_profile,
    stream_twitch,
    video_feature_1,
    image_feature_1,
    video_highlight_1,
    video_highlight_2,
    video_highlight_3,
    video_highlight_4,
    image_highlight_1,
    image_highlight_2,
    image_highlight_3,
    image_highlight_4,
    boolean_video_feature_1,
    boolean_image_feature_1,
    boolean_stream_twitch,
  } = selectedProfileUser;

  //setOpenCommunity(boolean_video_feature_1)

  const contentRef = useRef(null);

  useEffect(() => {
    /* if(!users) {
      dispatch(fetchUsers());
    } */

    /* if(!experiences) {
      dispatch(fetchExperiences());
    } */

    dispatch(fetchUsers());
    dispatch(fetchExperiences());
    dispatch(fetchAchievements());

    if (users && experiences && achievements && typeUsers) {
      dispatch(fetchUser(username));
    }

    //dispatch(fetchUser(username));

    if (username && selectedProfileUser.username !== username) {
      dispatch(removeSelectedUser());
    }
  }, [username]);

  const handleFeatureVideo1Toggle = () => {
    videoFeature1 === 'true' ? setVideoFeature1('false') : setVideoFeature1('true');
    document.body.classList.toggle('false');

    const formData = new FormData();
    formData.append(
      'data',
      JSON.stringify({
        boolean_video_feature_1: videoFeature1,
      })
    );

    const body = {
      boolean_video_feature_1: videoFeature1,
    };

    dispatch(editUser(body, id, selectedProfileUser));
    dispatch(fetchUser(username));
    dispatch(fetchUser(username));
    dispatch(fetchUser(username));
  };

  const handleFeatureImage1Toggle = () => {
    imageFeature1 === 'true' ? setImageFeature1('false') : setImageFeature1('true');
    document.body.classList.toggle('false');

    const formData = new FormData();
    formData.append(
      'data',
      JSON.stringify({
        boolean_image_feature_1: imageFeature1,
      })
    );

    const body = {
      boolean_image_feature_1: imageFeature1,
    };

    dispatch(editUser(body, id, selectedProfileUser));
    dispatch(fetchUser(username));
    dispatch(fetchUser(username));
    dispatch(fetchUser(username));
  };

  const handleStreamTwitchToggle = () => {
    streamTwitchBoolean === 'true'
      ? setStreamTwitchBoolean('false')
      : setStreamTwitchBoolean('true');
    document.body.classList.toggle('false');

    const formData = new FormData();
    formData.append(
      'data',
      JSON.stringify({
        boolean_stream_twitch: streamTwitchBoolean,
      })
    );

    const body = {
      boolean_stream_twitch: streamTwitchBoolean,
    };

    dispatch(editUser(body, id, selectedProfileUser));
    dispatch(fetchUser(username));
    dispatch(fetchUser(username));
    dispatch(fetchUser(username));
  };

  return (
    <IonPage>
      <IonHeader>
        <title>{selectedProfileUser.gamertag} - Hivefolio</title>
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
      <IonContent ref={contentRef} scrollEvents={true}>
        {!foundUser && (
          <div className="mt-6">
            <HeaderFeaturedSkeleton />
          </div>
        )}

        {foundUser && selectedProfileUser && (
          <div>
            <HeaderProfileUser key={id} />

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
                            {firstname ||
                            lastname ||
                            introduction ||
                            date_of_birth ||
                            country ||
                            languages ? (
                              <div>
                                {(firstname || lastname) && (
                                  <div className="flex flex-col w-full mb-4">
                                    <p className="font-bold">Name</p>
                                    <p className="flow-auto">
                                      {firstname} {lastname}
                                    </p>
                                  </div>
                                )}
                                {introduction && (
                                  <div className="flex flex-col w-full mb-4">
                                    <p className="font-bold">Introduction</p>
                                    <ReactMarkdown className="flow-auto">
                                      {introduction}
                                    </ReactMarkdown>
                                  </div>
                                )}

                                {/* Date of birth */}
                                {date_of_birth && (
                                  <div className="flex flex-col mb-4">
                                    <p className="font-bold w-full">Date of birth </p>

                                    <p className="flow-auto">{date_of_birth}</p>
                                  </div>
                                )}

                                {/* Country */}
                                {country && (
                                  <div className="flex flex-col mb-4">
                                    <p className="font-bold">Country</p>
                                    <p className="flow-auto">{country}</p>
                                  </div>
                                )}

                                {/* Languages */}
                                {languages && (
                                  <div className="flex flex-col mb-4">
                                    <p className="font-bold">Languages</p>
                                    <p className="flow-auto">{languages}</p>
                                  </div>
                                )}

                                {/* Genre */}
                                {/* {genres ? (
                              <div className="flex flex-col mb-4">
                                <p className="font-bold">Date of birth:</p>
                                <p className="flow-auto">{genres}</p>
                              </div>
                            ) : (
                              <div></div>
                            )} */}
                              </div>
                            ) : (
                              <div>
                                {signedInUser.id === selectedProfileUser.id ? (
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
                            {verified_profile && (
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

                          {(stream_twitch || selectedProfileUser.id === signedInUser.id) && (
                            <div className="flex flex-col xs:block sm:block md:block lg:hidden xl:hidden">
                              <div className="mb-4">
                                {stream_twitch && boolean_stream_twitch === true ? (
                                  <CardTwitch twitchId={stream_twitch} />
                                ) : (
                                  <div>
                                    {!stream_twitch &&
                                    signedInUser.id === selectedProfileUser.id ? (
                                      <div
                                        className="rounded-3xl border-none p-4 sm:w-full h-40 bg-cover bg-no-repeat"
                                        style={{ backgroundImage: `url(${hexagon_background})` }}
                                      >
                                        <Link
                                          to={'/account-streams'}
                                          className="inline-flex items-center justify-center h-12  
                                              px-6 mr-2 mb-2 font-medium tracking-wide transition 
                                              duration-200 bg-primary text-dark rounded-full hover:bg-dark hover:text-light
                                              focus:shadow-outline focus:outline-none"
                                        >
                                          Add a Twitch stream
                                        </Link>
                                      </div>
                                    ) : (
                                      <div>
                                        {!stream_twitch && boolean_stream_twitch === true && (
                                          <div
                                            className="rounded-3xl border-none p-4 sm:w-full h-40 bg-cover bg-no-repeat"
                                            style={{
                                              backgroundImage: `url(${hexagon_background})`,
                                            }}
                                          >
                                            <div
                                              className="inline-flex items-center justify-center h-12  
                                        px-6 mr-2 mb-2 font-medium tracking-wide transition 
                                        duration-200 bg-dark text-light rounded-full
                                        focus:shadow-outline focus:outline-none"
                                            >
                                              Content coming soon
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>

                              {selectedProfileUser.id === signedInUser.id && (
                                <div>
                                  {!boolean_stream_twitch ? (
                                    <button
                                      type="submit"
                                      onClick={event => {
                                        handleStreamTwitchToggle(event);
                                      }}
                                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-dark hover:bg-dark hover:text-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    >
                                      Show Twitch stream
                                    </button>
                                  ) : (
                                    <button
                                      type="submit"
                                      onClick={event => {
                                        handleStreamTwitchToggle(event);
                                      }}
                                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    >
                                      Hide Twitch stream
                                    </button>
                                  )}
                                </div>
                              )}
                            </div>
                          )}

                          {(video_feature_1 || selectedProfileUser.id === signedInUser.id) && (
                            <div className="flex flex-col xs:block sm:block md:block lg:hidden xl:hidden">
                              <div className="mb-4">
                                {video_feature_1 && boolean_video_feature_1 === true ? (
                                  <CardYoutube video1={video_feature_1} />
                                ) : (
                                  <div>
                                    {!video_feature_1 &&
                                    signedInUser.id === selectedProfileUser.id ? (
                                      <div
                                        className="rounded-3xl border-none p-4 sm:w-full h-40 bg-cover bg-no-repeat"
                                        style={{ backgroundImage: `url(${hexagon_background})` }}
                                      >
                                        <Link
                                          to={'/account-media'}
                                          className="inline-flex items-center justify-center h-12  
                                              px-6 mr-2 mb-2 font-medium tracking-wide transition 
                                              duration-200 bg-primary text-dark rounded-full hover:bg-dark hover:text-light
                                              focus:shadow-outline focus:outline-none"
                                        >
                                          Add a feature video
                                        </Link>
                                      </div>
                                    ) : (
                                      <div>
                                        {!video_feature_1 && boolean_video_feature_1 === true && (
                                          <div
                                            className="rounded-3xl border-none p-4 sm:w-full h-40 bg-cover bg-no-repeat"
                                            style={{
                                              backgroundImage: `url(${hexagon_background})`,
                                            }}
                                          >
                                            <div
                                              className="inline-flex items-center justify-center h-12  
                                        px-6 mr-2 mb-2 font-medium tracking-wide transition 
                                        duration-200 bg-dark text-light rounded-full
                                        focus:shadow-outline focus:outline-none"
                                            >
                                              Content coming soon
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>

                              {selectedProfileUser.id === signedInUser.id && (
                                <div>
                                  {!boolean_video_feature_1 ? (
                                    <button
                                      type="submit"
                                      onClick={event => {
                                        handleFeatureVideo1Toggle(event);
                                      }}
                                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-dark hover:bg-dark hover:text-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    >
                                      Show Video
                                    </button>
                                  ) : (
                                    <button
                                      type="submit"
                                      onClick={event => {
                                        handleFeatureVideo1Toggle(event);
                                      }}
                                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    >
                                      Hide video
                                    </button>
                                  )}
                                </div>
                              )}
                            </div>
                          )}

                          {/* Experiences */}

                          {(selectedProfileUser.experiences.length !== 0 ||
                            selectedProfileUser.id === signedInUser.id) && (
                            <div
                              className="xxs:mt-12 xs:mt-12 sm:mt-12 md:mt-16 lg:mt-10 xl:mt-10 col-span-2 
                  xs:block sm:block md:block lg:hidden xl:hidden"
                            >
                              <div className="flex flex-row justify-between">
                                <h3 className="px-4 -mb-12">Experiences</h3>

                                {selectedProfileUser.id === signedInUser.id && (
                                  <div
                                    className="inline-flex items-center justify-center h-12
                                    px-6 mr-2 mb-2 font-medium tracking-wide transition 
                                    duration-200 bg-primary text-dark rounded-full hover:bg-dark hover:text-light
                                    focus:shadow-outline focus:outline-none"
                                    onClick={() => {
                                      setShowCreateExperienceModal(true);
                                    }}
                                  >
                                    Add experience
                                  </div>
                                )}
                              </div>

                              {experiences && foundUser.id ? (
                                <CardGrid
                                  style1={
                                    'grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4'
                                  }
                                  className="mt-8"
                                >
                                  {experiences && foundUser.id && (
                                    <div>
                                      {foundUser.experiences.map(experience => (
                                        <div>
                                          <CardExperienceUser
                                            experienceId={experience.id}
                                            signedInUser={signedInUser}
                                            experience={experience}
                                            image_profile={experience.image_profile}
                                            responsive={true}
                                            cardLink01={true}
                                          />
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </CardGrid>
                              ) : (
                                <div
                                  className="rounded-3xl border-none p-4 mt-16 sm:w-full h-40 bg-cover bg-no-repeat"
                                  style={{ backgroundImage: `url(${hexagon_background})` }}
                                >
                                  <div
                                    className="inline-flex items-center justify-center h-12  
                              px-6 mr-2 mb-2 font-medium tracking-wide transition 
                              duration-200 bg-dark text-light rounded-full
                              focus:shadow-outline focus:outline-none"
                                  >
                                    Content coming soon
                                  </div>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Achievements */}
                          {(selectedProfileUser.achievements.length !== 0 ||
                            selectedProfileUser.id === signedInUser.id) && (
                            <div
                              className="xxs:mt-12 xs:mt-12 sm:mt-12 md:mt-16 lg:mt-10 xl:mt-10 col-span-2 
                  xs:block sm:block md:block lg:hidden xl:hidden"
                            >
                              <div className="flex flex-row justify-between">
                                <h3 className="px-4 -mb-12">Achievements</h3>

                                {selectedProfileUser.id === signedInUser.id && (
                                  <div
                                    className="inline-flex items-center justify-center h-12
                                    px-6 mr-2 mb-2 font-medium tracking-wide transition 
                                    duration-200 bg-primary text-dark rounded-full hover:bg-dark hover:text-light
                                    focus:shadow-outline focus:outline-none"
                                    onClick={() => {
                                      setShowCreateAchievementModal(true);
                                    }}
                                  >
                                    Add achievements
                                  </div>
                                )}
                              </div>

                              {achievements && foundUser.id ? (
                                <CardGrid
                                  style1={
                                    'grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4'
                                  }
                                  className="mt-8"
                                >
                                  {achievements && foundUser.id && (
                                    <div>
                                      {foundUser.achievements.map(achievement => (
                                        <div>
                                          <CardAchievementUser
                                            achievementId={achievement.id}
                                            signedInUser={signedInUser}
                                            achievement={achievement}
                                            image_profile={achievement.image_profile}
                                            responsive={true}
                                            cardLink01={true}
                                          />
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </CardGrid>
                              ) : (
                                <div
                                  className="rounded-3xl border-none p-4 mt-16 sm:w-full h-40 bg-cover bg-no-repeat"
                                  style={{ backgroundImage: `url(${hexagon_background})` }}
                                >
                                  <div
                                    className="inline-flex items-center justify-center h-12  
                              px-6 mr-2 mb-2 font-medium tracking-wide transition 
                              duration-200 bg-dark text-light rounded-full
                              focus:shadow-outline focus:outline-none"
                                  >
                                    Content coming soon
                                  </div>
                                </div>
                              )}
                            </div>
                          )}

                          {/* <div className="xs:block sm:block md:block lg:hidden xl:hidden">
                    
                      <CardTwitter/>
                    
                    </div> */}

                          <div className="flex flex-col xs:block sm:block md:block lg:block xl:block">
                            <div className="mb-4">
                              {discord_channel ? (
                                <CardDiscord discord_channel={discord_channel} />
                              ) : (
                                <div>
                                  {!discord_channel && signedInUser.id === selectedProfileUser.id && (
                                    <div
                                      className="rounded-3xl border-none p-4 sm:w-full h-40 bg-cover bg-no-repeat"
                                      style={{ backgroundImage: `url(${hexagon_background})` }}
                                    >
                                      <Link
                                        to={'/account-social'}
                                        className="inline-flex items-center justify-center h-12  
                                              px-6 mr-2 mb-2 font-medium tracking-wide transition 
                                              duration-200 bg-primary text-dark rounded-full hover:bg-dark hover:text-light
                                              focus:shadow-outline focus:outline-none"
                                      >
                                        Add a Discord channel
                                      </Link>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>

                          {selectedProfileUser.games ? (
                            <div className="bg-light rounded-3xl border-none p-8 sm:w-full xs:w-full">
                              <h3>Games</h3>
                              <CarouselCards
                                infinite={false}
                                xl={1280}
                                xlItems={1}
                                xlScroll={1}
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
                                {selectedProfileUser.games
                                  .sort(() => Math.random() - 0.5)
                                  .map(game => (
                                    <CardGame
                                      id={game.id}
                                      game={game}
                                      username={game.username}
                                      image_profile={game.image_profile}
                                      name={game.name}
                                      full={true}
                                    />
                                  ))}
                              </CarouselCards>
                            </div>
                          ) : (
                            <div
                              className="rounded-3xl border-none p-4 sm:w-full h-40 bg-cover bg-no-repeat"
                              style={{ backgroundImage: `url(${hexagon_background})` }}
                            >
                              {selectedProfileUser.id === selectedProfileUser.id ? (
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

                          <div className="bg-light rounded-3xl border-none p-4 sm:w-full xs:w-full">
                            <h3 className="px-4 pt-4 -mb-4">Characters</h3>
                            {characters <= 0 ? (
                              <div>
                                {signedInUser.id === selectedProfileUser.id ? (
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
                                {characters
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
                                      character={character}
                                      username={character.username}
                                      image_profile={character.image_profile}
                                      name={character.name}
                                      games={character.games?.map(gameList => gameList.name)}
                                      full={true}
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
                          {(stream_twitch || selectedProfileUser.id === signedInUser.id) && (
                            <div className="flex flex-col xs:hidden sm:hidden md:hidden lg:block xl:block">
                              <div className="mb-4">
                                {stream_twitch && boolean_stream_twitch === true ? (
                                  <CardTwitch twitchId={stream_twitch} />
                                ) : (
                                  <div>
                                    {!stream_twitch &&
                                    signedInUser.id === selectedProfileUser.id ? (
                                      <div
                                        className="rounded-3xl border-none p-4 sm:w-full h-40 bg-cover bg-no-repeat"
                                        style={{ backgroundImage: `url(${hexagon_background})` }}
                                      >
                                        <Link
                                          to={'/account-streams'}
                                          className="inline-flex items-center justify-center h-12  
                                              px-6 mr-2 mb-2 font-medium tracking-wide transition 
                                              duration-200 bg-primary text-dark rounded-full hover:bg-dark hover:text-light
                                              focus:shadow-outline focus:outline-none"
                                        >
                                          Add a Twitch stream
                                        </Link>
                                      </div>
                                    ) : (
                                      <div>
                                        {!stream_twitch && boolean_stream_twitch === true && (
                                          <div
                                            className="rounded-3xl border-none p-4 sm:w-full h-40 bg-cover bg-no-repeat"
                                            style={{
                                              backgroundImage: `url(${hexagon_background})`,
                                            }}
                                          >
                                            <div
                                              className="inline-flex items-center justify-center h-12  
                                        px-6 mr-2 mb-2 font-medium tracking-wide transition 
                                        duration-200 bg-dark text-light rounded-full
                                        focus:shadow-outline focus:outline-none"
                                            >
                                              Content coming soon
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>

                              {selectedProfileUser.id === signedInUser.id && (
                                <div>
                                  {!boolean_stream_twitch ? (
                                    <button
                                      type="submit"
                                      onClick={event => {
                                        handleStreamTwitchToggle(event);
                                      }}
                                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-dark hover:bg-dark hover:text-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    >
                                      Show Twitch stream
                                    </button>
                                  ) : (
                                    <button
                                      type="submit"
                                      onClick={event => {
                                        handleStreamTwitchToggle(event);
                                      }}
                                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    >
                                      Hide Twitch stream
                                    </button>
                                  )}
                                </div>
                              )}
                            </div>
                          )}

                          {(video_feature_1 || selectedProfileUser.id === signedInUser.id) && (
                            <div className="flex flex-col xs:hidden sm:hidden md:hidden lg:block xl:block">
                              <div className="mb-4">
                                {video_feature_1 && boolean_video_feature_1 === true ? (
                                  <CardYoutube video1={video_feature_1} />
                                ) : (
                                  <div>
                                    {!video_feature_1 &&
                                    signedInUser.id === selectedProfileUser.id ? (
                                      <div
                                        className="rounded-3xl border-none p-4 sm:w-full h-40 bg-cover bg-no-repeat"
                                        style={{ backgroundImage: `url(${hexagon_background})` }}
                                      >
                                        <Link
                                          to={'/account-media'}
                                          className="inline-flex items-center justify-center h-12  
                                              px-6 mr-2 mb-2 font-medium tracking-wide transition 
                                              duration-200 bg-primary text-dark rounded-full hover:bg-dark hover:text-light
                                              focus:shadow-outline focus:outline-none"
                                        >
                                          Add a feature video
                                        </Link>
                                      </div>
                                    ) : (
                                      <div>
                                        {!video_feature_1 && boolean_video_feature_1 === true && (
                                          <div
                                            className="rounded-3xl border-none p-4 sm:w-full h-40 bg-cover bg-no-repeat"
                                            style={{
                                              backgroundImage: `url(${hexagon_background})`,
                                            }}
                                          >
                                            <div
                                              className="inline-flex items-center justify-center h-12  
                                        px-6 mr-2 mb-2 font-medium tracking-wide transition 
                                        duration-200 bg-dark text-light rounded-full
                                        focus:shadow-outline focus:outline-none"
                                            >
                                              Content coming soon
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>

                              {selectedProfileUser.id === signedInUser.id && (
                                <div>
                                  {!boolean_video_feature_1 ? (
                                    <button
                                      type="submit"
                                      onClick={event => {
                                        handleFeatureVideo1Toggle(event);
                                      }}
                                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-dark hover:bg-dark hover:text-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    >
                                      Show Video
                                    </button>
                                  ) : (
                                    <button
                                      type="submit"
                                      onClick={event => {
                                        handleFeatureVideo1Toggle(event);
                                      }}
                                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    >
                                      Hide video
                                    </button>
                                  )}
                                </div>
                              )}
                            </div>
                          )}

                          {/* Experiences */}
                          {(selectedProfileUser.experiences.length !== 0 ||
                            selectedProfileUser.id === signedInUser.id) && (
                            <div
                              className="xxs:-mt-4 xs:-mt-4 sm:-mt-6 md:-mt-16 lg:mt-10 xl:mt-10 col-span-2 
                  xs:hidden sm:hidden md:hidden lg:block xl:block"
                            >
                              <div className="flex flex-row justify-between">
                                <h3 className="px-4 -mb-12">Experiences</h3>

                                {selectedProfileUser.id === signedInUser.id && (
                                  <div
                                    className="inline-flex items-center justify-center h-12
                                    px-6 mr-2 mb-2 font-medium tracking-wide transition 
                                    duration-200 bg-primary text-dark rounded-full hover:bg-dark hover:text-light
                                    focus:shadow-outline focus:outline-none"
                                    onClick={() => {
                                      setShowCreateExperienceModal(true);
                                    }}
                                  >
                                    Add experience
                                  </div>
                                )}
                              </div>

                              {experiences && foundUser.id ? (
                                <CardGrid
                                  style1={
                                    'grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4'
                                  }
                                  className="mt-8"
                                >
                                  {experiences && foundUser.id && (
                                    <div>
                                      {foundUser.experiences.map(experience => (
                                        <div>
                                          <CardExperienceUser
                                            experienceId={experience.id}
                                            signedInUser={signedInUser}
                                            experience={experience}
                                            image_profile={experience.image_profile}
                                            responsive={true}
                                            cardLink01={true}
                                          />
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </CardGrid>
                              ) : (
                                <div
                                  className="rounded-3xl border-none p-4 mt-16 sm:w-full h-40 bg-cover bg-no-repeat"
                                  style={{ backgroundImage: `url(${hexagon_background})` }}
                                >
                                  <div
                                    className="inline-flex items-center justify-center h-12  
                                px-6 mr-2 mb-2 font-medium tracking-wide transition 
                                duration-200 bg-dark text-light rounded-full
                                focus:shadow-outline focus:outline-none"
                                  >
                                    Content coming soon
                                  </div>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Achievements */}
                          {(selectedProfileUser.achievements.length !== 0 ||
                            selectedProfileUser.id === signedInUser.id) && (
                            <div
                              className="xxs:-mt-4 xs:-mt-4 sm:-mt-6 md:-mt-16 lg:mt-10 xl:mt-10 col-span-2 
                    xs:hidden sm:hidden md:hidden lg:block xl:block"
                            >
                              <div className="flex flex-row justify-between">
                                <h3 className="px-4 -mb-12">Achievements</h3>

                                {selectedProfileUser.id === signedInUser.id && (
                                  <div
                                    className="inline-flex items-center justify-center h-12
                                      px-6 mr-2 mb-2 font-medium tracking-wide transition 
                                      duration-200 bg-primary text-dark rounded-full hover:bg-dark hover:text-light
                                      focus:shadow-outline focus:outline-none"
                                    onClick={() => {
                                      setShowCreateAchievementModal(true);
                                    }}
                                  >
                                    Add achievement
                                  </div>
                                )}
                              </div>

                              {achievements && foundUser.id ? (
                                <CardGrid
                                  style1={
                                    'grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4'
                                  }
                                  className="mt-8"
                                >
                                  {achievements && foundUser.id && (
                                    <div>
                                      {foundUser.achievements.map(achievement => (
                                        <div>
                                          <CardAchievementUser
                                            achievementId={achievement.id}
                                            signedInUser={signedInUser}
                                            achievement={achievement}
                                            image_profile={achievement.image_profile}
                                            responsive={true}
                                            cardLink01={true}
                                          />
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </CardGrid>
                              ) : (
                                <div
                                  className="rounded-3xl border-none p-4 mt-16 sm:w-full h-40 bg-cover bg-no-repeat"
                                  style={{ backgroundImage: `url(${hexagon_background})` }}
                                >
                                  <div
                                    className="inline-flex items-center justify-center h-12  
                                  px-6 mr-2 mb-2 font-medium tracking-wide transition 
                                  duration-200 bg-dark text-light rounded-full
                                  focus:shadow-outline focus:outline-none"
                                  >
                                    Content coming soon
                                  </div>
                                </div>
                              )}
                            </div>
                          )}

                          {(image_feature_1 || selectedProfileUser.id === signedInUser.id) && (
                            <div>
                              <div className="mb-4">
                                {image_feature_1 && boolean_image_feature_1 === true ? (
                                  <div className="bg-light rounded-3xl border-none p-4 sm:w-full h-auto bg-cover bg-no-repeat">
                                    <img
                                      src={image_feature_1 && image_feature_1.url}
                                      className="h-full w-full rounded-3xl"
                                    />
                                  </div>
                                ) : (
                                  <div>
                                    {!image_feature_1 &&
                                    signedInUser.id === selectedProfileUser.id ? (
                                      <div
                                        className="rounded-3xl border-none p-4 sm:w-full h-40 bg-cover bg-no-repeat"
                                        style={{ backgroundImage: `url(${hexagon_background})` }}
                                      >
                                        <Link
                                          to={'/account-media'}
                                          className="inline-flex items-center justify-center h-12  
                                              px-6 mr-2 mb-2 font-medium tracking-wide transition 
                                              duration-200 bg-primary text-dark rounded-full hover:bg-dark hover:text-light
                                              focus:shadow-outline focus:outline-none"
                                        >
                                          Add a feature image
                                        </Link>
                                      </div>
                                    ) : (
                                      <div>
                                        {!image_feature_1 && boolean_image_feature_1 === true && (
                                          <div
                                            className="rounded-3xl border-none p-4 sm:w-full h-40 bg-cover bg-no-repeat"
                                            style={{
                                              backgroundImage: `url(${hexagon_background})`,
                                            }}
                                          >
                                            <div
                                              className="inline-flex items-center justify-center h-12  
                                        px-6 mr-2 mb-2 font-medium tracking-wide transition 
                                        duration-200 bg-dark text-light rounded-full
                                        focus:shadow-outline focus:outline-none"
                                            >
                                              Content coming soon
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>

                              {selectedProfileUser.id === signedInUser.id && (
                                <div>
                                  {!boolean_image_feature_1 ? (
                                    <button
                                      type="submit"
                                      onClick={event => {
                                        handleFeatureImage1Toggle(event);
                                      }}
                                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-dark hover:bg-dark hover:text-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    >
                                      Show image
                                    </button>
                                  ) : (
                                    <button
                                      type="submit"
                                      onClick={event => {
                                        handleFeatureImage1Toggle(event);
                                      }}
                                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    >
                                      Hide image
                                    </button>
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/*  */}
                  </div>
                </div>

                {/* Tab 2 */}
                <div label="Career">
                  {/*  */}

                  <div className="max-width px-4">
                    <TabsHeadlessUi
                      tab1title="Experiences"
                      tab1={
                        <div className=" mb-8 ">
                          <div className="flex">
                            {selectedProfileUser.id === signedInUser.id && (
                              <div
                                className="inline-flex items-center justify-center h-12 lg:mt-20 xl:mt-20
                              px-6 mr-2 mb-2 font-medium tracking-wide transition 
                              duration-200 bg-primary text-dark rounded-full hover:bg-dark hover:text-light
                              focus:shadow-outline focus:outline-none"
                                onClick={() => {
                                  setShowCreateExperienceModal(true);
                                }}
                              >
                                Add experience
                              </div>
                            )}
                          </div>

                          <div className="grid grid-cols-1 lg:gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                            {/* Filters */}
                            <div className="xs:my-8 lg:col-start-1 w-full">
                              <div className="bg-light px-4 py-5 shadow rounded-lg ">Filter</div>
                            </div>
                            {/* Content */}
                            <div className="xxs:-mt-4 xs:-mt-4 sm:-mt-6 md:-mt-16 lg:-mt-10 xl:-mt-10 col-span-2">
                              {experiences && foundUser.id ? (
                                <CardGrid
                                  style1={
                                    'grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4'
                                  }
                                  className="mt-8"
                                >
                                  {experiences && foundUser.id && (
                                    <div>
                                      {experiences &&
                                        foundUser.experiences.map(experience => (
                                          <div>
                                            <CardExperienceUser
                                              experienceId={experience.id}
                                              signedInUser={signedInUser}
                                              experience={experience}
                                              image_profile={experience.image_profile}
                                              responsive={true}
                                              cardLink01={true}
                                            />
                                          </div>
                                        ))}
                                    </div>
                                  )}
                                </CardGrid>
                              ) : (
                                <div
                                  className="rounded-3xl border-none p-4 mt-16 sm:w-full h-40 bg-cover bg-no-repeat"
                                  style={{ backgroundImage: `url(${hexagon_background})` }}
                                >
                                  <div
                                    className="inline-flex items-center justify-center h-12  
                              px-6 mr-2 mb-2 font-medium tracking-wide transition 
                              duration-200 bg-dark text-light rounded-full
                              focus:shadow-outline focus:outline-none"
                                  >
                                    Content coming soon
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      }
                      tab2title="Achievements"
                      tab2={
                        <div className=" mb-8 ">
                          <div className="flex">
                            {/* {selectedProfileUser.id === signedInUser.id && (
                  <div
                    className="inline-flex items-center justify-center h-12 lg:mt-20 xl:mt-20
                              px-6 mr-2 mb-2 font-medium tracking-wide transition 
                              duration-200 bg-primary text-dark rounded-full hover:bg-dark hover:text-light
                              focus:shadow-outline focus:outline-none"
                    onClick={() => {
                      setShowEditExperiencesModal(true)
                    }}
                  >
                    Edit experiences
                  </div>
                )} */}

                            {selectedProfileUser.id === signedInUser.id && (
                              <div
                                className="inline-flex items-center justify-center h-12 lg:mt-20 xl:mt-20
                              px-6 mr-2 mb-2 font-medium tracking-wide transition 
                              duration-200 bg-primary text-dark rounded-full hover:bg-dark hover:text-light
                              focus:shadow-outline focus:outline-none"
                                onClick={() => {
                                  setShowCreateAchievementModal(true);
                                }}
                              >
                                Add achievement
                              </div>
                            )}
                          </div>

                          <div className="grid grid-cols-1 lg:gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                            {/* Filters */}
                            <div className="xs:my-8 lg:col-start-1 w-full">
                              <div className="bg-light px-4 py-5 shadow rounded-lg ">Filter</div>
                            </div>
                            {/* Content */}
                            <div className="xxs:-mt-4 xs:-mt-4 sm:-mt-6 md:-mt-16 lg:-mt-10 xl:-mt-10 col-span-2">
                              {achievements && foundUser.id ? (
                                <CardGrid
                                  style1={
                                    'grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4'
                                  }
                                  className="mt-8"
                                >
                                  {achievements && foundUser.id && (
                                    <div>
                                      {foundUser.achievements.map(achievement => (
                                        <div>
                                          <CardAchievementUser
                                            achievementId={achievement.id}
                                            signedInUser={signedInUser}
                                            achievement={achievement}
                                            image_profile={achievement.image_profile}
                                            responsive={true}
                                            cardLink01={true}
                                          />
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </CardGrid>
                              ) : (
                                <div
                                  className="rounded-3xl border-none p-4 mt-16 sm:w-full h-40 bg-cover bg-no-repeat"
                                  style={{ backgroundImage: `url(${hexagon_background})` }}
                                >
                                  <div
                                    className="inline-flex items-center justify-center h-12  
                              px-6 mr-2 mb-2 font-medium tracking-wide transition 
                              duration-200 bg-dark text-light rounded-full
                              focus:shadow-outline focus:outline-none"
                                  >
                                    Content coming soon
                                  </div>
                                </div>
                              )}
                            </div>
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
                          <div className="lg:-mt-10 xl:-mt-10 col-span-2"></div>
                        </div>
                      }
                    />
                  </div>
                </div>

                {/* Tab 3 */}
                <div className="" label="Highlights">
                  {/* Video */}
                  <div className="mx-4 mt-8 mb-12">
                    <TabsHeadlessUi
                      tab1title="Videos"
                      tab1={
                        <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
                          {video_highlight_1 ? (
                            <div>
                              {video_highlight_1 && <CardYoutube video1={video_highlight_1} />}
                            </div>
                          ) : (
                            <div
                              className="rounded-3xl border-none p-4 sm:w-full h-40 bg-cover bg-no-repeat"
                              style={{ backgroundImage: `url(${hexagon_background})` }}
                            >
                              {signedInUser.id === selectedProfileUser.id ? (
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

                          {video_highlight_2 && (
                            <div>
                              {video_highlight_2 && <CardYoutube video1={video_highlight_2} />}
                            </div>
                          )}

                          {video_highlight_3 && (
                            <div>
                              {video_highlight_3 && <CardYoutube video1={video_highlight_3} />}
                            </div>
                          )}

                          {video_highlight_4 && (
                            <div>
                              {video_highlight_4 && <CardYoutube video1={video_highlight_4} />}
                            </div>
                          )}
                        </div>
                      }
                      tab2title="Images"
                      tab2={
                        <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
                          {image_highlight_1 ? (
                            <div className="rounded-3xl border-none p-4 sm:w-full h-auto bg-cover bg-no-repeat">
                              <img
                                src={image_highlight_1 && image_highlight_1.url}
                                className="h-full w-full rounded-3xl"
                              />
                            </div>
                          ) : (
                            <div
                              className="rounded-3xl border-none p-4 sm:w-full h-40 bg-cover bg-no-repeat"
                              style={{ backgroundImage: `url(${hexagon_background})` }}
                            >
                              {signedInUser.id === selectedProfileUser.id ? (
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

                          {image_highlight_2 && (
                            <div className="rounded-3xl border-none p-4 sm:w-full h-auto bg-cover bg-no-repeat">
                              <img
                                src={image_highlight_2 && image_highlight_2.url}
                                className="h-full w-full rounded-3xl"
                              />
                            </div>
                          )}

                          {image_highlight_3 && (
                            <div className="rounded-3xl border-none p-4 sm:w-full h-auto bg-cover bg-no-repeat">
                              <img
                                src={image_highlight_3 && image_highlight_3.url}
                                className="h-full w-full rounded-3xl"
                              />
                            </div>
                          )}

                          {image_highlight_4 && (
                            <div className="rounded-3xl border-none p-4 sm:w-full h-auto bg-cover bg-no-repeat">
                              <img
                                src={image_highlight_4 && image_highlight_4.url}
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
                <div label="Teams">
                  {/*  */}

                  <div className="max-width px-4">
                    {/* Section 1 */}
                    <div className=" mb-8 grid grid-cols-1 lg:gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                      {/* Filters */}
                      <section className="xs:my-8 lg:col-start-1 w-full">
                        <div className="bg-light px-4 py-5 shadow rounded-lg ">Filter</div>
                      </section>
                      {/* Content */}
                      <div className="lg:-mt-10 xl:-mt-10 col-span-2">
                        {teams <= 0 ? (
                          <div>
                            {signedInUser.id === selectedProfileUser.id ? (
                              <Link
                                to={'/teams'}
                                className="inline-flex items-center justify-center h-12 lg:mt-20 xl:mt-20
                                  px-6 mr-2 mb-2 font-medium tracking-wide transition 
                                  duration-200 bg-primary text-dark rounded-full hover:bg-dark hover:text-light
                                  focus:shadow-outline focus:outline-none"
                              >
                                Join a team
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
                            className="mt-8"
                          >
                            {teams.map(team => (
                              <CardTeam
                                id={team.id}
                                team={team}
                                username={team.username}
                                image_profile={team.image_profile}
                                name={team.name}
                                teams={team.teams?.map(teamList => {
                                  teamname = teamList.name;
                                })}
                                responsive={true}
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
                  <div className="max-width px-4">
                    {/* Section 1 */}
                    <div className=" mb-8 grid grid-cols-1 lg:gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                      {/* Filters */}
                      <section className="xs:my-8 lg:col-start-1 w-full">
                        <div className="bg-light px-4 py-5 shadow rounded-lg ">Filter</div>
                      </section>
                      {/* Content */}
                      <div className="lg:-mt-10 xl:-mt-10 col-span-2">
                        {organisations <= 0 ? (
                          <div>
                            {signedInUser.id === selectedProfileUser.id ? (
                              <Link
                                to={'/organisations'}
                                className="inline-flex items-center justify-center h-12 lg:mt-20 xl:mt-20
                                    px-6 mr-2 mb-2 font-medium tracking-wide transition 
                                    duration-200 bg-primary text-dark rounded-full hover:bg-dark hover:text-light
                                    focus:shadow-outline focus:outline-none"
                              >
                                Join an organisation
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
                            className="mt-8"
                          >
                            {organisations.map(organisation => (
                              <CardOrganisation
                                id={organisation.id}
                                organisation={organisation}
                                username={organisation.username}
                                image_profile={organisation.image_profile}
                                name={organisation.name}
                                teams={organisation.teams?.map(teamList => {
                                  teamname = teamList.name;
                                  teamusername = teamList.username;
                                })}
                                responsive={true}
                              />
                            ))}
                          </CardGrid>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tab 4 */}
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
                        {communities <= 0 ? (
                          <div>
                            {signedInUser.id === selectedProfileUser.id ? (
                              <Link
                                to={'/communities'}
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
                            style1={
                              'grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4'
                            }
                          >
                            {communities.map(community => (
                              <CardCommunity
                                id={community.id}
                                community={community}
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

              <CreateExperienceModalUser
                id={id}
                selectedProfileUser={selectedProfileUser}
                showCreateExperienceModal={showCreateExperienceModal}
                setShowCreateExperienceModal={setShowCreateExperienceModal}
              />

              <CreateAchievementModalUser
                id={id}
                selectedProfileUser={selectedProfileUser}
                showCreateAchievementModal={showCreateAchievementModal}
                setShowCreateAchievementModal={setShowCreateAchievementModal}
              />
            </div>
          </div>
        )}
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default ProfileUser;
