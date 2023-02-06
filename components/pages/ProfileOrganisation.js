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

import { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router';

/* Components */
import { NavButtons } from '../ui/Buttons/NavButtons';
import HeaderProfileOrganisation from '../ui/Header/HeaderProfileOrganisation';
import HeaderFeaturedSkeleton from '../ui/Header/HeaderFeaturedSkeleton';
import CarouselCards from '../ui/Carousel/CarouselCards';
import CardGrid from '../ui/CardGrid/CardGrid';
import CardUser from '../ui/Card/CardUser';
import CardTeam from '../ui/Card/CardTeam';
import CardGame from '../ui/Card/CardGame';
import CardCommunity from '../ui/Card/CardCommunity';
import CardYoutube from '../ui/Card/CardYoutube';
import CardTwitch from '../ui/Card/CardTwitch';
import CardTwitter from '../ui/Card/CardTwitter';
import Hexagon from '../ui/Hexagon/Hexagon';
import TabSub from '../ui/Tabs/TabSub';
import Footer from '../ui/Footer/Footer';
import TabsHeadlessUi from '../ui/Tabs/TabsHeadlessUi';

import CardExperienceOrganisation from '../ui/Organisation/CardExperienceOrganisation';
import CardAchievementOrganisation from '../ui/Organisation/CardAchievementOrganisation';

import CreateExperienceModalOrganisation from '../ui/Organisation/CreateExperienceModalOrganisation';
import CreateAchievementModalOrganisation from '../ui/Organisation/CreateAchievementModalOrganisation';

/* User */
import { useCurrentUser } from '../context/AuthContext';
import { Link } from 'react-router-dom';

/* Design */
import hexagon_background from '../assets/images/hexagon_background.png';

/* Redux */
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchOrganisation,
  removeSelectedOrganisation,
  editOrganisation,
} from '../redux/actions/coreActions';

import { fetchExperiences } from '../redux/actions/experienceAction';
import { fetchAchievements } from '../redux/actions/achievementAction';
import { fetchOrganisations, booleanToogle } from '../redux/actions/organisationActions';

const ProfileOrganisation = () => {
  const { username } = useParams();

  const user = useCurrentUser();

  const dispatch = useDispatch();

  const location = useLocation();
  const history = useHistory();
  const tabFromUrl = new URLSearchParams(location.search).get('tab');

  const [showCreateExperienceModal, setShowCreateExperienceModal] = useState(false);
  const [showCreateAchievementModal, setShowCreateAchievementModal] = useState(false);

  const [showLoading, setShowLoading] = useState(true);

  const selectedProfileOrganisation = useSelector(state => state.organisation);

  const organisations = useSelector(state => state.allOrganisations.organisations);
  const experiences = useSelector(state => state.allExperiences.experiences);
  const achievements = useSelector(state => state.allAchievements.achievements);
  const typeOrganisations = useSelector(state => state.allData.typeOrganisations);

  const [videoFeature1, setVideoFeature1] = useState(selectOrgAttribute &&selectOrgAttribute.boolean_video_feature_1);
  const [imageFeature1, setImageFeature1] = useState(selectOrgAttribute &&selectOrgAttribute.boolean_image_feature_1);
  const [streamTwitchBoolean, setStreamTwitchBoolean] = useState(selectOrgAttribute &&selectOrgAttribute.boolean_stream_twitch);

  let foundOrganisation = {};
  if (
    organisations &&
    organisations !== undefined &&
    selectedProfileOrganisation &&
    selectedProfileOrganisation !== undefined
  ) {
    const matchOrganisation = Array.isArray(organisations)
      ? organisations?.find(person => {
          return person?.id === selectedProfileOrganisation?.id;
        })
      : {};
    foundOrganisation = matchOrganisation;
  }

  useEffect(() => {
    if (!organisations) {
      dispatch(fetchOrganisations());
    }
  }, [organisations]);
  const { id } = selectedProfileOrganisation;

  const selectOrgAttribute = selectedProfileOrganisation.attributes;

  const {
    members,
    teams,
    communities,
    admins,
    image_profile,
    name,
    games,
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
  } = selectedProfileOrganisation;

  console.log('selectedProfileOrganisation===>', selectedProfileOrganisation);

  const adminId =selectOrgAttribute &&selectOrgAttribute.admins !== undefined &&
    Array.isArray(selectOrgAttribute.admins.data) &&
    selectOrgAttribute.admins.data?.find(person => {
      return person.id === user.id;
    });

  const memberTwitch =
    selectOrgAttribute &&
    selectOrgAttribute.members !== undefined &&
    Array.isArray(selectOrgAttribute.members.data) &&
    selectOrgAttribute.members.data?.filter(stream => {
      return stream !== undefined;
    });

    // console.log("memberTwitch==========",memberTwitch);

  const teamTwitch =
    selectOrgAttribute &&
    selectOrgAttribute.teams !== undefined &&
    Array.isArray(selectOrgAttribute.teams.data) &&
    selectOrgAttribute.teams.data?.filter(stream => {
      return stream.attributes.stream_twitch !== undefined;
    });

    // console.log("teamTwitch==========",teamTwitch);

  useEffect(() => {
    /* if(boolean_onboarding === false && adminId) {
      history.push(`/onboarding/organisation/${id}`)
    } */

    dispatch(fetchOrganisations());
    dispatch(fetchExperiences());
    dispatch(fetchAchievements());

    dispatch(fetchOrganisation(username));

    return () => {
      dispatch(removeSelectedOrganisation());
    };
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

    dispatch(editOrganisation(body, id));
    dispatch(fetchOrganisation(username));
    dispatch(fetchOrganisation(username));
    dispatch(fetchOrganisation(username));
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

    dispatch(editOrganisation(body, id));
    dispatch(fetchOrganisation(username));
    dispatch(fetchOrganisation(username));
    dispatch(fetchOrganisation(username));
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

    console.log('ProfileOrganisation editOrganisation dispatch');
    dispatch(editOrganisation(body, id));
    dispatch(fetchOrganisation(username));
    dispatch(fetchOrganisation(username));
    dispatch(fetchOrganisation(username));
  };

  return (
    <IonPage>
      <IonHeader>
        <title>{selectOrgAttribute &&selectOrgAttribute.name} - Hivefolio</title>
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
          {!id && (
            <div className="mt-6">
              <HeaderFeaturedSkeleton />
            </div>
          )}

          {id && (
            <div>
              <HeaderProfileOrganisation id={id} />

              <div className="max-width">
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

                                {selectOrgAttribute && selectOrgAttribute.introduction || selectOrgAttribute.date_of_birth || selectOrgAttribute.country || selectOrgAttribute.languages ? (
                                  <div>
                                    {selectOrgAttribute &&selectOrgAttribute.introduction && (
                                      <div className="flex flex-col w-full mb-4">
                                        <p className="font-bold">Introduction</p>
                                        <p className="flow-auto">{selectOrgAttribute.introduction}</p>
                                      </div>
                                    )}

                                    {/* Date of birth */}
                                    {selectOrgAttribute && selectOrgAttribute.date_of_birth && (
                                      <div className="flex flex-col mb-4">
                                        <p className="font-bold w-full">Date of birth </p>

                                        <p className="flow-auto">{selectOrgAttribute.date_of_birth}</p>
                                      </div>
                                    )}

                                    {/* Country */}
                                    {selectOrgAttribute &&selectOrgAttribute.country && (
                                      <div className="flex flex-col mb-4">
                                        <p className="font-bold">Country</p>
                                        <p className="flow-auto">{selectOrgAttribute.country}</p>
                                      </div>
                                    )}

                                    {/* Languages */}
                                    {selectOrgAttribute &&selectOrgAttribute.languages && (
                                      <div className="flex flex-col mb-4">
                                        <p className="font-bold">Languages</p>
                                        <p className="flow-auto">{selectOrgAttribute.languages}</p>
                                      </div>
                                    )}
                                  </div>
                                ) : (
                                  <div>
                                    {adminId ? (
                                      <Link
                                        to={`/organisation/${id}/edit`}
                                        className="inline-flex items-center justify-center h-12  
                                                px-6 mr-2 mb-2 font-medium tracking-wide transition 
                                                duration-200 bg-primary text-dark rounded-full hover:bg-dark hover:text-light
                                                focus:shadow-outline focus:outline-none"
                                      >
                                        Add organisation details
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
                                {selectOrgAttribute &&selectOrgAttribute.verified_profile && (
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

                              {/* Twitch */}

                              {(selectOrgAttribute && selectOrgAttribute.stream_twitch || adminId) && (
                                <div className="flex flex-col xs:block sm:block md:block lg:hidden xl:hidden">
                                  <div className="mb-4">
                                    {selectOrgAttribute && selectOrgAttribute.stream_twitch && selectOrgAttribute.boolean_stream_twitch === true ? (
                                      <CardTwitch twitchId={selectOrgAttribute.stream_twitch} />
                                    ) : (
                                      <div>
                                        {!selectOrgAttribute.stream_twitch && adminId ? (
                                          <div
                                            className="rounded-3xl border-none p-4 sm:w-full h-40 bg-cover bg-no-repeat"
                                            style={{
                                              backgroundImage: `url(${hexagon_background})`,
                                            }}
                                          >
                                            <Link
                                              to={`${id}/edit-media`}
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
                                            {!selectOrgAttribute && selectOrgAttribute.stream_twitch && selectOrgAttribute.boolean_stream_twitch === true && (
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

                                  {adminId && (
                                    <div>
                                      {!selectOrgAttribute && selectOrgAttribute.boolean_stream_twitch ? (
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

                              {/* YouTube */}

                              {(selectOrgAttribute &&selectOrgAttribute.video_feature_1 || adminId) && (
                                <div className="flex flex-col xs:block sm:block md:block lg:hidden xl:hidden">
                                  <div className="mb-4">
                                    {selectOrgAttribute &&selectOrgAttribute.video_feature_1 && selectOrgAttribute.boolean_video_feature_1 === true ? (
                                      <CardYoutube video1={selectOrgAttribute && selectOrgAttribute.video_feature_1} />
                                    ) : (
                                      <div>
                                        {!selectOrgAttribute.video_feature_1 && adminId ? (
                                          <div
                                            className="rounded-3xl border-none p-4 sm:w-full h-40 bg-cover bg-no-repeat"
                                            style={{
                                              backgroundImage: `url(${hexagon_background})`,
                                            }}
                                          >
                                            <Link
                                              to={`${id}/edit-media`}
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
                                            {!selectOrgAttribute &&selectOrgAttribute.video_feature_1 && selectOrgAttribute.boolean_video_feature_1 === true && (
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

                                  {adminId && (
                                    <div>
                                      {!selectOrgAttribute &&selectOrgAttribute.boolean_video_feature_1 ? (
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

                              {/*  */}

                              {/* Experiences */}

                              {((selectOrgAttribute && Array.isArray(selectOrgAttribute.experiences.data) &&
                                selectOrgAttribute.experiences.data.length !== 0) ||
                                adminId) && (
                                <div
                                  className="xxs:mt-12 xs:mt-12 sm:mt-12 md:mt-16 lg:mt-10 xl:mt-10 col-span-2 
                          xs:block sm:block md:block lg:hidden xl:hidden"
                                >
                                  <div className="flex flex-row justify-between">
                                    <h3 className="px-4 -mb-12">Experiences</h3>

                                    {adminId && (
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

                                  {selectOrgAttribute && selectOrgAttribute.experiences.data && foundOrganisation.id ? (
                                    <CardGrid
                                      style1={
                                        'grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4'
                                      }
                                      className="mt-8"
                                    >
                                      {selectOrgAttribute &&selectOrgAttribute.experiences.data && foundOrganisation.id && (
                                        <div>
                                          {foundOrganisation.experiences.map(experience => (
                                            <div>
                                              <CardExperienceOrganisation
                                                experienceId={experience.id}
                                                experience={experience}
                                                image_profile={experience.attributes.image_profile}
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
                              {((selectOrgAttribute && Array.isArray(selectOrgAttribute.achievements.data) &&
                                selectOrgAttribute.achievements.data.length !== 0) ||
                                adminId) && (
                                <div
                                  className="xxs:mt-12 xs:mt-12 sm:mt-12 md:mt-16 lg:mt-10 xl:mt-10 col-span-2 
                          xs:block sm:block md:block lg:hidden xl:hidden"
                                >
                                  <div className="flex flex-row justify-between">
                                    <h3 className="px-4 -mb-12">Achievements</h3>

                                    {adminId && (
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

                                  {selectOrgAttribute &&selectOrgAttribute.achievements.data && foundOrganisation.id ? (
                                    <CardGrid
                                      style1={
                                        'grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4'
                                      }
                                      className="mt-8"
                                    >
                                      {selectOrgAttribute &&selectOrgAttribute.achievements.data && foundOrganisation.id && (
                                        <div>
                                          {foundOrganisation.achievements.map(achievement => (
                                            <div>
                                              <CardAchievementOrganisation
                                                achievementId={achievement.id}
                                                achievement={achievement}
                                                image_profile={achievement.attributes.image_profile}
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

                              {/*  */}

                              {selectOrgAttribute &&selectOrgAttribute.games ? (
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
                                    {selectOrgAttribute &&selectOrgAttribute.games.data
                                      .sort(() => Math.random() - 0.5)
                                      .map(game => (
                                        <CardGame
                                          id={game.id}
                                          game={game}
                                          username={game.attributes.username}
                                          image_profile={game.attributes.image_profile}
                                          name={game.attributes.name}
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
                                  {selectedProfileOrganisation.id ===
                                  selectedProfileOrganisation.id ? (
                                    <Link
                                      to={`/organisation/${id}/edit`}
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
                          </section>

                          {/* Right */}
                          <div className="lg:-mt-1 xl:-mt-1 col-span-2">
                            <div className="flex flex-col gap-5 sm:w-full xs:w-full">
                              {(selectOrgAttribute &&selectOrgAttribute.stream_twitch || adminId) && (
                                <div className="flex flex-col xs:hidden sm:hidden md:hidden lg:block xl:block">
                                  <div className="mb-4">
                                    {selectOrgAttribute.stream_twitch && selectOrgAttribute.boolean_stream_twitch === true ? (
                                      <CardTwitch twitchId={selectOrgAttribute.stream_twitch} />
                                    ) : (
                                      <div>
                                        {!selectOrgAttribute &&selectOrgAttribute.stream_twitch && adminId ? (
                                          <div
                                            className="rounded-3xl border-none p-4 sm:w-full h-40 bg-cover bg-no-repeat"
                                            style={{
                                              backgroundImage: `url(${hexagon_background})`,
                                            }}
                                          >
                                            <Link
                                              to={`/community/${id}/edit-media`}
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
                                            {!selectOrgAttribute &&selectOrgAttribute.stream_twitch && selectOrgAttribute.boolean_stream_twitch === true && (
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

                                  {adminId && (
                                    <div>
                                      {!selectOrgAttribute &&selectOrgAttribute.boolean_stream_twitch ? (
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

                              {(selectOrgAttribute &&selectOrgAttribute.video_feature_1 || adminId) && (
                                <div className="flex flex-col xs:hidden sm:hidden md:hidden lg:block xl:block">
                                  <div className="mb-4">
                                    {selectOrgAttribute.video_feature_1 && selectOrgAttribute.boolean_video_feature_1 === true ? (
                                      <CardYoutube video1={selectOrgAttribute.video_feature_1} />
                                    ) : (
                                      <div>
                                        {!selectOrgAttribute &&selectOrgAttribute.video_feature_1 && adminId ? (
                                          <div
                                            className="rounded-3xl border-none p-4 sm:w-full h-40 bg-cover bg-no-repeat"
                                            style={{
                                              backgroundImage: `url(${hexagon_background})`,
                                            }}
                                          >
                                            <Link
                                              to={`/community/${id}/edit-media`}
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
                                            {!selectOrgAttribute &&selectOrgAttribute.video_feature_1 && selectOrgAttribute.boolean_video_feature_1 === true && (
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

                                  {adminId && (
                                    <div>
                                      {!selectOrgAttribute &&selectOrgAttribute.boolean_video_feature_1 ? (
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
                              {((selectOrgAttribute &&Array.isArray(selectOrgAttribute.experiences.data) &&
                                selectOrgAttribute.experiences.data.length !== 0) ||
                                adminId) && (
                                <div
                                  className="xxs:-mt-4 xs:-mt-4 sm:-mt-6 md:-mt-16 lg:mt-10 xl:mt-10 col-span-2 
                          xs:hidden sm:hidden md:hidden lg:block xl:block"
                                >
                                  <div className="flex flex-row justify-between">
                                    <h3 className="px-4 -mb-12">Experiences</h3>

                                    {adminId && (
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

                                  {selectOrgAttribute &&selectOrgAttribute.experiences && foundOrganisation.id ? (
                                    <CardGrid
                                      style1={
                                        'grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4'
                                      }
                                      className="mt-8"
                                    >
                                      {selectOrgAttribute &&selectOrgAttribute.experiences && foundOrganisation.id && (
                                        <div>
                                          {foundOrganisation.experiences.map(experience => (
                                            <div>
                                              <CardExperienceOrganisation
                                                experienceId={experience.id}
                                                experience={experience}
                                                image_profile={experience.attributes.image_profile}
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
                              {((selectOrgAttribute &&Array.isArray(selectOrgAttribute.achievements.data) &&
                                selectOrgAttribute.achievements.data.length !== 0) ||
                                adminId) && (
                                <div
                                  className="xxs:-mt-4 xs:-mt-4 sm:-mt-6 md:-mt-16 lg:mt-10 xl:mt-10 col-span-2 
                            xs:hidden sm:hidden md:hidden lg:block xl:block"
                                >
                                  <div className="flex flex-row justify-between">
                                    <h3 className="px-4 -mb-12">Achievements</h3>

                                    {adminId && (
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

                                  {selectOrgAttribute &&selectOrgAttribute.achievements && foundOrganisation.id ? (
                                    <CardGrid
                                      style1={
                                        'grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4'
                                      }
                                      className="mt-8"
                                    >
                                      {selectOrgAttribute &&selectOrgAttribute.achievements && foundOrganisation.id && (
                                        <div>
                                          {foundOrganisation.achievements.map(achievement => (
                                            <div>
                                              <CardAchievementOrganisation
                                                achievementId={achievement.id}
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

                              {/*  */}

                              {(selectOrgAttribute &&selectOrgAttribute.image_feature_1 || adminId) && (
                                <div>
                                  <div className="mb-4">
                                    {selectOrgAttribute &&selectOrgAttribute.image_feature_1.data!==null && selectOrgAttribute.boolean_image_feature_1 === true ? (
                                      <div className="bg-light rounded-3xl border-none p-4 sm:w-full h-auto bg-cover bg-no-repeat">
                                        <img
                                          src={selectOrgAttribute.image_feature_1 && selectOrgAttribute.image_feature_1.data!==null && selectOrgAttribute.image_feature_1.data.attributes.url}
                                          className="h-full w-full rounded-3xl"
                                        />
                                      </div>
                                    ) : (
                                      <div>
                                        {!selectOrgAttribute &&selectOrgAttribute.image_feature_1.data!==null && adminId ? (
                                          <div
                                            className="rounded-3xl border-none p-4 sm:w-full h-40 bg-cover bg-no-repeat"
                                            style={{
                                              backgroundImage: `url(${hexagon_background})`,
                                            }}
                                          >
                                            <Link
                                              to={`/organisation/${id}/edit-media`}
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
                                            {!selectOrgAttribute &&selectOrgAttribute.image_feature_1.data!==null && selectOrgAttribute.boolean_image_feature_1 === true && (
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

                                  {adminId && (
                                    <div>
                                      {!selectOrgAttribute &&selectOrgAttribute.boolean_image_feature_1 ? (
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
                          tab1title="Experience"
                          tab1={
                            <div className=" mb-8 ">
                              <div className="flex">
                                {adminId && (
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
                                  <div className="bg-light px-4 py-5 shadow rounded-lg ">
                                    Filter
                                  </div>
                                </div>
                                {/* Content */}
                                <div className="xxs:-mt-4 xs:-mt-4 sm:-mt-6 md:-mt-16 lg:-mt-10 xl:-mt-10 col-span-2">
                                  {selectOrgAttribute &&selectOrgAttribute.experiences && foundOrganisation.id ? (
                                    <CardGrid
                                      style1={
                                        'grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4'
                                      }
                                      className="mt-8"
                                    >
                                      {selectOrgAttribute &&selectOrgAttribute.experiences && foundOrganisation.id && (
                                        <div>
                                          {selectOrgAttribute &&selectOrgAttribute.experiences &&
                                            foundOrganisation.experiences.data.map(experience => (
                                              <div>
                                                <CardExperienceOrganisation
                                                  experienceId={experience.id}
                                                  experience={experience}
                                                  image_profile={experience.attributes.image_profile}
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
                            <div className=" mb-8 grid grid-cols-1 lg:gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                              {/* Filters */}
                              <section className="xs:my-8 lg:col-start-1 w-full">
                                <div className="bg-light px-4 py-5 shadow rounded-lg ">Filter</div>
                              </section>
                              {/* Content */}
                              <div className="lg:-mt-10 xl:-mt-10 col-span-2"></div>
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

                    {/* Tab 2 */}
                    <div className="" label="Highlights">
                      {/* Highlight videos */}
                      <div className="mx-4 mt-8 mb-12">
                        <TabsHeadlessUi
                          tab1title="Videos"
                          tab1={
                            <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
                              {selectOrgAttribute &&selectOrgAttribute.video_highlight_1 ? (
                                <div className="">
                                  {selectOrgAttribute &&selectOrgAttribute.video_highlight_1.data!==null && <CardYoutube video1={selectOrgAttribute.video_highlight_1} />}
                                </div>
                              ) : (
                                <div
                                  className="rounded-3xl border-none p-4 sm:w-full h-40 bg-cover bg-no-repeat"
                                  style={{ backgroundImage: `url(${hexagon_background})` }}
                                >
                                  {adminId ? (
                                    <Link
                                      to={`${id}/edit`}
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

                              {selectOrgAttribute &&selectOrgAttribute.video_highlight_2 && (
                                <div className="">
                                  {selectOrgAttribute &&selectOrgAttribute.video_highlight_2.data!==null && <CardYoutube video1={selectOrgAttribute.video_highlight_2} />}
                                </div>
                              )}

                              {selectOrgAttribute &&selectOrgAttribute.video_highlight_3 && (
                                <div className="">
                                  {selectOrgAttribute &&selectOrgAttribute.video_highlight_3.data!==null && <CardYoutube video1={selectOrgAttribute.video_highlight_3} />}
                                </div>
                              )}

                              {selectOrgAttribute &&selectOrgAttribute.video_highlight_4 && (
                                <div className="">
                                  {selectOrgAttribute &&selectOrgAttribute.video_highlight_4.data!==null && <CardYoutube video1={selectOrgAttribute.video_highlight_4} />}
                                </div>
                              )}
                            </div>
                          }
                          tab2title="Images"
                          tab2={
                            <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
                              {selectOrgAttribute &&selectOrgAttribute.image_highlight_1 ? (
                                <div className="bg-light rounded-3xl border-none p-4 sm:w-full h-auto bg-cover bg-no-repeat">
                                  <img
                                    src={selectOrgAttribute &&selectOrgAttribute.image_highlight_1.data!==null && selectOrgAttribute.image_highlight_1.data.attributes.url}
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
                                      to={`${id}/edit`}
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

                              {selectOrgAttribute &&selectOrgAttribute.image_highlight_2 && (
                                <div className="bg-light rounded-3xl border-none p-4 sm:w-full h-auto bg-cover bg-no-repeat">
                                  <img
                                    src={selectOrgAttribute &&selectOrgAttribute.image_highlight_2.data!==null && selectOrgAttribute.image_highlight_2.data.attributes.url}
                                    className="h-full w-full rounded-3xl"
                                  />
                                </div>
                              )}

                              {selectOrgAttribute &&selectOrgAttribute.image_highlight_3 && (
                                <div className="bg-light rounded-3xl border-none p-4 sm:w-full h-auto bg-cover bg-no-repeat">
                                  <img
                                    src={selectOrgAttribute &&selectOrgAttribute.image_highlight_3.data!==null && selectOrgAttribute.image_highlight_3.data.attributes.url}
                                    className="h-full w-full rounded-3xl"
                                  />
                                </div>
                              )}

                              {selectOrgAttribute &&selectOrgAttribute.image_highlight_4 && (
                                <div className="bg-light rounded-3xl border-none p-4 sm:w-full h-auto bg-cover bg-no-repeat">
                                  <img
                                    src={selectOrgAttribute &&selectOrgAttribute.image_highlight_4.data!==null && selectOrgAttribute.image_highlight_4.data.attributes.url}
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
                        <TabsHeadlessUi
                          tab1title="Members"
                          tab1={
                            <div>
                              {selectOrgAttribute &&
                              selectOrgAttribute.members !== undefined &&
                              selectOrgAttribute.members.data.length <= 0 ? (
                                <div>
                                  {adminId ? (
                                    <Link
                                      to={`${id}/organisations`}
                                      className="inline-flex items-center justify-center h-12 lg:mt-20 xl:mt-20  
                                              px-6 mr-2 mb-2 font-medium tracking-wide transition 
                                              duration-200 bg-primary text-dark rounded-full hover:bg-dark hover:text-light
                                              focus:shadow-outline focus:outline-none"
                                    >
                                      Add a member
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
                                    'grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4'
                                  }
                                >
                                  {selectOrgAttribute &&selectOrgAttribute.members!==undefined && Array.isArray(selectOrgAttribute.members.data) &&
                                    selectOrgAttribute.members.data
                                      .sort(() => Math.random() - 0.5)
                                      .map(user => (
                                        <div>
                                          <Link
                                            to={`/user/${user.attributes.username}`}
                                            className="z-20 hover:bg-primary"
                                          >
                                            <CardTwitch
                                              twitchId={user.attributes.stream_twitch}
                                              height="99.99%"
                                              link1={`/user/${user.attributes.username}`}
                                              gamertag={user.attributes.gamertag}
                                              games={user.attributes.games!==undefined && user.attributes.games.data.map(sub => sub.attributes.name)}
                                            />
                                          </Link>
                                        </div>
                                      ))}
                                </CardGrid>
                              )}
                            </div>
                          }
                          tab2title="Teams"
                          tab2={
                            <div>
                              {selectOrgAttribute &&
                              selectOrgAttribute.teams !== undefined &&
                              selectOrgAttribute.teams.data.length <= 0 ? (
                                <div>
                                  {adminId ? (
                                    <Link
                                      to={`${id}/teams`}
                                      className="inline-flex items-center justify-center h-12 lg:mt-20 xl:mt-20 
                                              px-6 mr-2 mb-2 font-medium tracking-wide transition 
                                              duration-200 bg-primary text-dark rounded-full hover:bg-dark hover:text-light
                                              focus:shadow-outline focus:outline-none"
                                    >
                                      Add a team
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
                                    'grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4'
                                  }
                                >
                                  {Array.isArray(teamTwitch) &&
                                    teamTwitch
                                      .sort(() => Math.random() - 0.5)
                                      .map(team => (
                                        <div>
                                          <Link
                                            to={`/team/${team.attributes.username}`}
                                            className="z-20 hover:bg-primary"
                                          >
                                            <CardTwitch
                                              twitchId={team.attributes.stream_twitch}
                                              height="99.99%"
                                              link1={`/team/${team.attributes.username}`}
                                              name={team.attributes.name}
                                              games={team.attributes.games!==undefined && team.attributes.games.data.map(sub => sub.attributes.name)}
                                            />
                                          </Link>
                                        </div>
                                      ))}
                                </CardGrid>
                              )}
                            </div>
                          }
                        />
                      </div>
                    </div>

                    {/* Tab 3 */}
                    <div label="Members">
                      <div className="mx-4 mt-8 mb-12">
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
                                {selectOrgAttribute &&
                                selectOrgAttribute.members !== undefined &&
                                selectOrgAttribute.members.data.length <= 0 ? (
                                  <div>
                                    {adminId ? (
                                      <Link
                                        to={`${id}/edit-members`}
                                        className="inline-flex items-center justify-center h-12 lg:mt-20 xl:mt-20  
                                              px-6 mr-2 mb-2 font-medium tracking-wide transition 
                                              duration-200 bg-primary text-dark rounded-full hover:bg-dark hover:text-light
                                              focus:shadow-outline focus:outline-none"
                                      >
                                        Add members
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
                                    {selectOrgAttribute &&
                                      selectOrgAttribute.members !== undefined &&
                                      Array.isArray(selectOrgAttribute.members.data) &&
                                      selectOrgAttribute.members.data?.map(user => (
                                        <CardUser
                                          id={user.id}
                                          user={user}
                                          username={user.attributes.username}
                                          image_profile={user.attributes.image_profile}
                                          email={user.attributes.email}
                                          gamertag={user.attributes.gamertag}
                                          team={user.attributes.teams.data?.map(teamList => teamList.attributes.name)}
                                          games={user.attributes.games.date?.map(sub => sub.attributes.name)}
                                          full={true}
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
                              <div className="lg:-mt-10 xl:-mt-10 col-span-2"></div>
                            </div>
                          }
                        />
                      </div>
                    </div>

                    {/* Tab 4 */}
                    <div label="Teams">
                      <div className="mx-4 mt-8 mb-12">
                        {/* Section 1 */}
                        <div className=" mb-8 grid grid-cols-1 lg:gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                          {/* Filters */}
                          <section className="xs:my-8 lg:col-start-1 w-full">
                            <div className="bg-light px-4 py-5 shadow rounded-lg ">Filter</div>
                          </section>
                          {/* Content */}
                          <div className="lg:-mt-10 xl:-mt-10 col-span-2">
                            {selectOrgAttribute &&
                            selectOrgAttribute.teams !== undefined &&
                            selectOrgAttribute.teams.data.length <= 0 ? (
                              <div>
                                {adminId ? (
                                  <Link
                                    to={`${id}/edit-teams`}
                                    className="inline-flex items-center justify-center h-12 lg:mt-20 xl:mt-20  
                                                px-6 mr-2 mb-2 font-medium tracking-wide transition 
                                                duration-200 bg-primary text-dark rounded-full hover:bg-dark hover:text-light
                                                focus:shadow-outline focus:outline-none"
                                  >
                                    Add a team
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
                                {selectOrgAttribute &&
                                  selectOrgAttribute.teams !== undefined &&
                                  Array.isArray(selectOrgAttribute.teams.data) &&
                                  selectOrgAttribute.teams.data.map(team => (
                                    <CardTeam
                                      id={team.id}
                                      team={team}
                                      username={team.attributes.username}
                                      image_profile={team.attributes.image_profile}
                                      name={team.name}
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
                      <div className="mx-4 mt-8 mb-12">
                        {/* Section 1 */}
                        <div className=" mb-8 grid grid-cols-1 lg:gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                          {/* Filters */}
                          <section className="xs:my-8 lg:col-start-1 w-full">
                            <div className="bg-light px-4 py-5 shadow rounded-lg ">Filter</div>
                          </section>
                          {/* Content */}
                          <div className="lg:-mt-10 xl:-mt-10 col-span-2">
                            {selectOrgAttribute &&
                            selectOrgAttribute.communities !== undefined &&
                            selectOrgAttribute.communities.data.length <= 0 ? (
                              <div>
                                {adminId ? (
                                  <Link
                                    to={`${id}/edit-communities`}
                                    className="inline-flex items-center justify-center h-12 lg:mt-20 xl:mt-20  
                                              px-6 mr-2 mb-2 font-medium tracking-wide transition 
                                              duration-200 bg-primary text-dark rounded-full hover:bg-dark hover:text-light
                                              focus:shadow-outline focus:outline-none"
                                  >
                                    Add a community
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
                                {selectOrgAttribute &&
                            selectOrgAttribute.communities !== undefined &&  Array.isArray(selectOrgAttribute.communities.data) &&
                            selectOrgAttribute.communities.data.map(community => (
                                    <CardCommunity
                                      id={community.id}
                                      community={community}
                                      username={community.attributes.username}
                                      image_profile={community.attributes.image_profile}
                                      name={community.attributes.name}
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

                  <CreateExperienceModalOrganisation
                    id={id}
                    showCreateExperienceModal={showCreateExperienceModal}
                    setShowCreateExperienceModal={setShowCreateExperienceModal}
                  />

                  <CreateAchievementModalOrganisation
                    id={id}
                    selectedProfileOrganisation={selectedProfileOrganisation}
                    showCreateAchievementModal={showCreateAchievementModal}
                    setShowCreateAchievementModal={setShowCreateAchievementModal}
                  />
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

export default ProfileOrganisation;
