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
import { useLocation, useHistory } from 'react-router';

/* Components */
import { NavButtons } from '../ui/Buttons/NavButtons';
import HeaderProfileCommunity from '../ui/Header/HeaderProfileCommunity';
import HeaderFeaturedSkeleton from '../ui/Header/HeaderFeaturedSkeleton';
import CarouselCards from '../ui/Carousel/CarouselCards';
import CardGrid from '../ui/CardGrid/CardGrid';
import CardUser from '../ui/Card/CardUser';
import CardTeam from '../ui/Card/CardTeam';
import CardGame from '../ui/Card/CardGame';
import CardOrganisation from '../ui/Card/CardOrganisation';
import CardYoutube from '../ui/Card/CardYoutube';
import CardTwitch from '../ui/Card/CardTwitch';
import CardTwitter from '../ui/Card/CardTwitter';
import Hexagon from '../ui/Hexagon/Hexagon';
import TabSub from '../ui/Tabs/TabSub';
import Footer from '../ui/Footer/Footer';
import TabsHeadlessUi from '../ui/Tabs/TabsHeadlessUi';

import CardExperienceCommunity from '../ui/Community/CardExperienceCommunity';
//import CardAchievementCommunity from '../ui/Community/CardAchievementCommunity';

import CreateExperienceModalCommunity from '../ui/Community/CreateExperienceModalCommunity';
//import CreateAchievementModalCommunity from '../ui/Community/CreateAchievementModalCommunity';

/* User */
import { Link } from 'react-router-dom';
import { useCurrentUser } from '../context/AuthContext';

/* Design */
import hexagon_background from '../assets/images/hexagon_background.png';

/* Redux */
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCommunity,
  removeSelectedCommunity,
  editCommunity,
} from '../redux/actions/coreActions';
import { fetchExperiences } from '../redux/actions/experienceAction';
import { fetchAchievements } from '../redux/actions/achievementAction';
import { fetchCommunities } from '../redux/actions/communityActions';

const ProfileCommunity = ({ match }) => {
  const { username } = match.params;

  const user = useCurrentUser();

  const location = useLocation();
  const history = useHistory();
  const tabFromUrl = new URLSearchParams(location.search).get('tab');

  const community = useSelector(state => state.community);

  const dispatch = useDispatch();

  const [showLoading, setShowLoading] = useState(true);

  const [showCreateExperienceModal, setShowCreateExperienceModal] = useState(false);
  const [showCreateAchievementModal, setShowCreateAchievementModal] = useState(false);

  const selectedProfileCommunity = useSelector(state => state.community.data);

  const communities = useSelector(state => state.allCommunities.communities);
  const experiences = useSelector(state => state.allExperiences.experiences);
  const achievements = useSelector(state => state.allAchievements.achievements);
  const typeCommunities = useSelector(state => state.allData.typeCommunities);

  const [videoFeature1, setVideoFeature1] = useState(
    selectedProfileCommunity && selectedProfileCommunity.attributes.boolean_video_feature_1
  );
  const [imageFeature1, setImageFeature1] = useState(
    selectedProfileCommunity && selectedProfileCommunity.attributesboolean_image_feature_1
  );
  const [streamTwitchBoolean, setStreamTwitchBoolean] = useState(
    selectedProfileCommunity && selectedProfileCommunity.attributesboolean_stream_twitch
  );
  // console.log('selectedProfileCommunity=====>', selectedProfileCommunity);
  let foundCommunity = {};
  if (
    communities &&
    communities !== undefined &&
    selectedProfileCommunity &&
    selectedProfileCommunity !== undefined
  ) {
    const matchCommunity = Array.isArray(communities.data)
      ? communities?.data.find(person => {
          return person?.id === selectedProfileCommunity?.id;
        })
      : {};
    foundCommunity = matchCommunity;
  }

  useEffect(() => {
    if (communities === undefined) {
      dispatch(fetchCommunities());
    }
  }, [communities]);

  // console.log('selectedProfileCommunity=====>', selectedProfileCommunity);
  // console.log('communities=====>', communities);
  // console.log('experiences=====>', experiences);
  // console.log('achievements=====>', achievements);
  // console.log('typeCommunities=====>', typeCommunities);
  // console.log('foundCommunity=====>', foundCommunity);
  // const {
  //   id
  // } = selectedProfileCommunity;

  // const {
  //   members,
  //   teams,
  //   organisations,
  //   admins,
  //   image_profile,
  //   name,
  //   games,
  //   introduction,
  //   date_of_birth,
  //   country,
  //   languages,
  //   verified_profile,
  //   stream_twitch,
  //   video_feature_1,
  //   image_feature_1,
  //   video_highlight_1,
  //   video_highlight_2,
  //   video_highlight_3,
  //   video_highlight_4,
  //   image_highlight_1,
  //   image_highlight_2,
  //   image_highlight_3,
  //   image_highlight_4,
  //   boolean_video_feature_1,
  //   boolean_image_feature_1,
  //   boolean_stream_twitch,
  // } = selectedProfileCommunity;

  const adminId =
    selectedProfileCommunity &&
    selectedProfileCommunity.attributes.admins?.data.find(person => {
      return person.id === user.id;
    });

  /* useEffect(() => {
    if(selectedProfileCommunity.boolean_onboarding === false && adminId) {
      history.push(`/onboarding/community/${id}`)
    }
  }, [selectedProfileCommunity]) */

  const memberTwitch =
    selectedProfileCommunity &&
    selectedProfileCommunity.attributes.members?.data.filter(stream => {
      return stream.attributes.stream_twitch !== undefined;
    });

  const teamTwitch =
    selectedProfileCommunity &&
    selectedProfileCommunity.attributes.teams?.data.filter(stream => {
      return stream.attributes.stream_twitch !== undefined;
    });

  const organisationTwitch =
    selectedProfileCommunity &&
    selectedProfileCommunity.attributes.organisations.data?.filter(stream => {
      return stream.attributes.stream_twitch !== undefined;
    });

    // console.log('memberTwitch=====>', memberTwitch);
    // console.log('teamTwitch=====>', teamTwitch);
    // console.log('organisationTwitch=====>', organisationTwitch);

  useEffect(() => {
    dispatch(fetchCommunities());
    dispatch(fetchExperiences());
    dispatch(fetchAchievements());

    dispatch(fetchCommunity(username));
    return () => {
      dispatch(removeSelectedCommunity());
    };
  }, [username]);

  const handleFeatureVideo1Toggle = () => {
    selectedProfileCommunity && selectedProfileCommunity.attributes.videoFeature1 === 'true'
      ? setVideoFeature1('false')
      : setVideoFeature1('true');
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

    dispatch(editCommunity(body, selectedProfileCommunity && selectedProfileCommunity.id));
    dispatch(fetchCommunity(username));
    dispatch(fetchCommunity(username));
    dispatch(fetchCommunity(username));
  };

  const handleFeatureImage1Toggle = () => {
    selectedProfileCommunity && selectedProfileCommunity.attributes.imageFeature1 === 'true'
      ? setImageFeature1('false')
      : setImageFeature1('true');
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

    dispatch(editCommunity(body, selectedProfileCommunity && selectedProfileCommunity.id));
    dispatch(fetchCommunity(username));
    dispatch(fetchCommunity(username));
    dispatch(fetchCommunity(username));
  };

  const handleStreamTwitchToggle = () => {
    selectedProfileCommunity && selectedProfileCommunity.attributes.streamTwitchBoolean === 'true'
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

    console.log('ProfileOrganisation editCommunity dispatch');
    dispatch(
      editCommunity(body, selectedProfileCommunity && selectedProfileCommunity.id)
    );
    dispatch(fetchCommunity(username));
    dispatch(fetchCommunity(username));
    dispatch(fetchCommunity(username));
  };

  return (
    <IonPage>
      <IonHeader>
        {/* <title>{username} - Hivefolio</title> */}
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
          {!selectedProfileCommunity  && (
            <div className="mt-6">
              <HeaderFeaturedSkeleton />
            </div>
          )}

          {selectedProfileCommunity!==undefined  && (
            <div>
              {selectedProfileCommunity!==undefined && (
                <>
                  <HeaderProfileCommunity id={selectedProfileCommunity && selectedProfileCommunity.id} />

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

                                    {selectedProfileCommunity && selectedProfileCommunity.attributes.introduction || selectedProfileCommunity.attributes.date_of_birth || selectedProfileCommunity.attributes.country || selectedProfileCommunity.attributes.languages ? (
                                      <div>
                                        {selectedProfileCommunity.attributes.introduction && (
                                          <div className="flex flex-col w-full mb-4">
                                            <p className="font-bold">Introduction</p>
                                            <p className="flow-auto">{selectedProfileCommunity.attributes.introduction}</p>
                                          </div>
                                        )}

                                        {/* Date of birth */}
                                        {selectedProfileCommunity.attributes.date_of_birth && (
                                          <div className="flex flex-col mb-4">
                                            <p className="font-bold w-full">Date of birth </p>

                                            <p className="flow-auto">{selectedProfileCommunity.attributes.date_of_birth}</p>
                                          </div>
                                        )}

                                        {/* Country */}
                                        {selectedProfileCommunity.attributes.country && (
                                          <div className="flex flex-col mb-4">
                                            <p className="font-bold">Country</p>
                                            <p className="flow-auto">{selectedProfileCommunity.attributes.country}</p>
                                          </div>
                                        )}

                                        {/* Languages */}
                                        {selectedProfileCommunity.attributes.languages && (
                                          <div className="flex flex-col mb-4">
                                            <p className="font-bold">Languages</p>
                                            <p className="flow-auto">{selectedProfileCommunity.attributes.languages}</p>
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
                                        {adminId ? (
                                          <Link
                                            to={`/community/${selectedProfileCommunity.id}/edit`}
                                            className="inline-flex items-center justify-center h-12  
                                                px-6 mr-2 mb-2 font-medium tracking-wide transition 
                                                duration-200 bg-primary text-dark rounded-full hover:bg-dark hover:text-light
                                                focus:shadow-outline focus:outline-none"
                                          >
                                            Add community details
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
                                    {selectedProfileCommunity && selectedProfileCommunity.attributes.verified_profile && (
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

                                  {(selectedProfileCommunity && selectedProfileCommunity.attributes.stream_twitch || adminId) && (
                                    <div className="flex flex-col xs:block sm:block md:block lg:hidden xl:hidden">
                                      <div className="mb-4">
                                        {selectedProfileCommunity.attributes.stream_twitch && selectedProfileCommunity.attributes.boolean_stream_twitch === true ? (
                                          <CardTwitch twitchId={selectedProfileCommunity.attributes.stream_twitch} />
                                        ) : (
                                          <div>
                                            {!selectedProfileCommunity.attributes.stream_twitch && adminId ? (
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
                                                {!selectedProfileCommunity.attributes.stream_twitch && boolean_stream_twitch === true && (
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

                                  {/* YouTube */}

                                  {(selectedProfileCommunity.attributes.video_feature_1 || adminId) && (
                                    <div className="flex flex-col xs:block sm:block md:block lg:hidden xl:hidden">
                                      <div className="mb-4">
                                        {selectedProfileCommunity.attributes.video_feature_1 && selectedProfileCommunity.attributes.boolean_video_feature_1 === true ? (
                                          <CardYoutube video1={selectedProfileCommunity.attributes.video_feature_1} />
                                        ) : (
                                          <div>
                                            {!selectedProfileCommunity.attributes.video_feature_1 && adminId ? (
                                              <div
                                                className="rounded-3xl border-none p-4 sm:w-full h-40 bg-cover bg-no-repeat"
                                                style={{
                                                  backgroundImage: `url(${hexagon_background})`,
                                                }}
                                              >
                                                <Link
                                                  to={`${selectedProfileCommunity.id}/edit-media`}
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
                                                {!selectedProfileCommunity.attributes.video_feature_1 &&
                                                  selectedProfileCommunity.attributes.boolean_video_feature_1 === true && (
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
                                          {!selectedProfileCommunity.attributes.boolean_video_feature_1 ? (
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

                                  {(selectedProfileCommunity.attributes.experiences.data.length !== 0 ||
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

                                      {experiences && foundCommunity.id ? (
                                        <CardGrid
                                          style1={
                                            'grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4'
                                          }
                                          className="mt-8"
                                        >
                                          {experiences && foundCommunity.id && (
                                            <div>
                                              {foundCommunity.attributes.experiences.data.map(experience => (
                                                <div>
                                                  <CardExperienceCommunity
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

                                  {/*  */}

                                  <div className="bg-light rounded-3xl border-none p-8 sm:w-full xs:w-full">
                                    <h3 className="">Games</h3>
                                    {selectedProfileCommunity.attributes.games.data.length <= 0 ? (
                                      <Link
                                        to={`/community/${selectedProfileCommunity.id}/edit`}
                                        className="inline-flex items-center justify-center h-12  
                                  px-6 mr-2 mb-2 font-medium tracking-wide transition 
                                  duration-200 bg-dark text-light rounded-full hover:bg-primary hover:text-dark
                                  focus:shadow-outline focus:outline-none"
                                      >
                                        Add games
                                      </Link>
                                    ) : (
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
                                        {selectedProfileCommunity.attributes.games.data
                                          .sort(() => Math.random() - 0.5)
                                          .map(game => (
                                            <CardGame
                                              style1={
                                                'grid text-center border-none rounded-3xl bg-light hover:bg-primary'
                                              }
                                              style2={
                                                'mx-auto bg-cover bg-no-repeat h-24 w-24 sm:h-24 sm:w-24 lg:h-12 lg:w-12 xl:h-12 xl:w-12 image-placeholder rounded-full'
                                              }
                                              style3={
                                                'mx-auto bg-cover bg-no-repeat image-placeholder rounded-full placeholder overflow-hidden text-transparent'
                                              }
                                              id={game.id}
                                              game={game}
                                              image_profile={game.attributes.image_profile}
                                              name={game.attributes.name}
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
                                  {(selectedProfileCommunity.attributes.stream_twitch || adminId) && (
                                    <div className="flex flex-col xs:hidden sm:hidden md:hidden lg:block xl:block">
                                      <div className="mb-4">
                                        {selectedProfileCommunity.attributes.stream_twitch && selectedProfileCommunity.attributes.boolean_stream_twitch === true ? (
                                          <CardTwitch twitchId={selectedProfileCommunity.attributes.stream_twitch} />
                                        ) : (
                                          <div>
                                            {!selectedProfileCommunity.attributes.stream_twitch && adminId ? (
                                              <div
                                                className="rounded-3xl border-none p-4 sm:w-full h-40 bg-cover bg-no-repeat"
                                                style={{
                                                  backgroundImage: `url(${hexagon_background})`,
                                                }}
                                              >
                                                <Link
                                                  to={`/community/${selectedProfileCommunity.id}/edit-media`}
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
                                                {!selectedProfileCommunity.attributes.stream_twitch && selectedProfileCommunity.attributes.boolean_stream_twitch === true && (
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
                                          {!selectedProfileCommunity.attributes.boolean_stream_twitch ? (
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

                                  {(selectedProfileCommunity.attributes.video_feature_1 || adminId) && (
                                    <div className="flex flex-col xs:hidden sm:hidden md:hidden lg:block xl:block">
                                      <div className="mb-4">
                                        {selectedProfileCommunity.attributes.video_feature_1 && selectedProfileCommunity.attributes.boolean_video_feature_1 === true ? (
                                          <CardYoutube video1={selectedProfileCommunity.attributes.video_feature_1} />
                                        ) : (
                                          <div>
                                            {!selectedProfileCommunity.attributes.video_feature_1 && adminId ? (
                                              <div
                                                className="rounded-3xl border-none p-4 sm:w-full h-40 bg-cover bg-no-repeat"
                                                style={{
                                                  backgroundImage: `url(${hexagon_background})`,
                                                }}
                                              >
                                                <Link
                                                  to={`/community/${selectedProfileCommunity.id}/edit-media`}
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
                                                {!selectedProfileCommunity.attributes.video_feature_1 &&
                                                  selectedProfileCommunity.attributes.boolean_video_feature_1 === true && (
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
                                          {!selectedProfileCommunity.attributes.boolean_video_feature_1 ? (
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
                                  {(selectedProfileCommunity.attributes.experiences.data.length !== 0 ||
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

                                      {experiences && foundCommunity.id ? (
                                        <CardGrid
                                          style1={
                                            'grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4'
                                          }
                                          className="mt-8"
                                        >
                                          {experiences && foundCommunity.id && (
                                            <div>
                                              {foundCommunity.attributes.experiences.data.map(experience => (
                                                <div>
                                                  <CardExperienceCommunity
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

                                  {/*  */}

                                  {(selectedProfileCommunity.attributes.image_feature_1 || adminId) && (
                                    <div>
                                      <div className="mb-4">
                                        {selectedProfileCommunity.attributes.image_feature_1 && selectedProfileCommunity.attributes.boolean_image_feature_1 === true ? (
                                          <div className="bg-light rounded-3xl border-none p-4 sm:w-full h-auto bg-cover bg-no-repeat">
                                            <img
                                              src={selectedProfileCommunity.attributes.image_feature_1 && selectedProfileCommunity.attributes.image_feature_1.data.attributes.url}
                                              className="h-full w-full rounded-3xl"
                                            />
                                          </div>
                                        ) : (
                                          <div>
                                            {!selectedProfileCommunity.attributes.image_feature_1 && adminId ? (
                                              <div
                                                className="rounded-3xl border-none p-4 sm:w-full h-40 bg-cover bg-no-repeat"
                                                style={{
                                                  backgroundImage: `url(${hexagon_background})`,
                                                }}
                                              >
                                                <Link
                                                  to={`/community/${selectedProfileCommunity.id}/edit-media`}
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
                                                {!selectedProfileCommunity.attributes.image_feature_1 &&
                                                  selectedProfileCommunity.attributes.boolean_image_feature_1 === true && (
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
                                          {!selectedProfileCommunity.attributes.boolean_image_feature_1 ? (
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
                                      {experiences && foundCommunity.id ? (
                                        <CardGrid
                                          style1={
                                            'grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4'
                                          }
                                          className="mt-8"
                                        >
                                          {experiences && foundCommunity.id && (
                                            <div>
                                              {experiences &&
                                                foundCommunity.attributes.experiences.data.map(experience => (
                                                  <div>
                                                    <CardExperienceCommunity
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
                                    <div className="bg-light px-4 py-5 shadow rounded-lg ">
                                      Filter
                                    </div>
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
                                    <div className="bg-light px-4 py-5 shadow rounded-lg ">
                                      Filter
                                    </div>
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
                                  {selectedProfileCommunity.attributes.video_highlight_1 && selectedProfileCommunity.attributes.video_highlight_1.data!==null ? (
                                    <div className="">
                                      {selectedProfileCommunity.attributes.video_highlight_1 && (
                                        <CardYoutube video1={selectedProfileCommunity.attributes.video_highlight_1} />
                                      )}
                                    </div>
                                  ) : (
                                    <div
                                      className="rounded-3xl border-none p-4 sm:w-full h-40 bg-cover bg-no-repeat"
                                      style={{ backgroundImage: `url(${hexagon_background})` }}
                                    >
                                      {adminId ? (
                                        <Link
                                          to={`${selectedProfileCommunity.id}/edit-media`}
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

                                  {selectedProfileCommunity.attributes.video_highlight_2 && (
                                    <div className="">
                                      {selectedProfileCommunity.attributes.video_highlight_2 && (
                                        <CardYoutube video1={selectedProfileCommunity.attributes.video_highlight_2} />
                                      )}
                                    </div>
                                  )}

                                  {selectedProfileCommunity.attributes.video_highlight_3 && (
                                    <div className="">
                                      {selectedProfileCommunity.attributesvideo_highlight_3 && (
                                        <CardYoutube video1={selectedProfileCommunity.attributes.video_highlight_3} />
                                      )}
                                    </div>
                                  )}

                                  {selectedProfileCommunity.attributes.video_highlight_4 && (
                                    <div className="">
                                      {selectedProfileCommunity.attributes.video_highlight_4 && (
                                        <CardYoutube video1={selectedProfileCommunity.attributes.video_highlight_4} />
                                      )}
                                    </div>
                                  )}
                                </div>
                              }
                              tab2title="Images"
                              tab2={
                                <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
                                  {selectedProfileCommunity.attributes.image_highlight_1 && selectedProfileCommunity.attributes.image_highlight_1.data!==null ? (
                                    <div className=" rounded-3xl border-none p-4 sm:w-full h-auto bg-cover bg-no-repeat">
                                      <img
                                        src={selectedProfileCommunity.attributes.image_highlight_1 && selectedProfileCommunity.attributes.image_highlight_1.data!==null && selectedProfileCommunity.attributes.image_highlight_1.data.attributes.url}
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
                                          to={`${selectedProfileCommunity.id}/edit-media`}
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

                                  {selectedProfileCommunity.attributes.image_highlight_2 && selectedProfileCommunity.attributes.image_highlight_2.data!==null && (
                                    <div className="rounded-3xl border-none p-4 sm:w-full h-auto bg-cover bg-no-repeat">
                                      <img
                                        src={selectedProfileCommunity.attributes.image_highlight_2.data!==null && selectedProfileCommunity.attributes.image_highlight_2.data.attributes.url}
                                        className="h-full w-full rounded-3xl"
                                      />
                                    </div>
                                  )}

                                  {selectedProfileCommunity.attributes.image_highlight_3 &&selectedProfileCommunity.attributes.image_highlight_3!==null && (
                                    <div className="rounded-3xl border-none p-4 sm:w-full h-auto bg-cover bg-no-repeat">
                                      <img
                                        src={selectedProfileCommunity.attributes.image_highlight_3.data!==null && selectedProfileCommunity.attributes.image_highlight_3.data.attributes.url}
                                        className="h-full w-full rounded-3xl"
                                      />
                                    </div>
                                  )}

                                  {selectedProfileCommunity.attributes.image_highlight_4 && selectedProfileCommunity.attributes.image_highlight_4!==null && (
                                    <div className="rounded-3xl border-none p-4 sm:w-full h-auto bg-cover bg-no-repeat">
                                      <img
                                        src={selectedProfileCommunity.attributes.image_highlight_4.data!==null && selectedProfileCommunity.attributes.image_highlight_4.data.attributes.url}
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
                                  {selectedProfileCommunity.attributes.members!==undefined && selectedProfileCommunity.attributes.members.data!==null && selectedProfileCommunity.attributes.members.data.length <= 0 ? (
                                    <div>
                                      {adminId ? (
                                        <Link
                                          to={`${selectedProfileCommunity.id}/organisations`}
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
                                      {/* {memberTwitch
                                        .sort(() => Math.random() - 0.5)
                                        .map(user => (
                                          <div>
                                            <Link
                                              to={`/user/${user.username}`}
                                              className="z-20 hover:bg-primary"
                                            >
                                              <CardTwitch
                                                twitchId={user.stream_twitch}
                                                height="99.99%"
                                                link1={`/user/${user.username}`}
                                                gamertag={user.gamertag}
                                                games={user.games.map(sub => sub.name)}
                                              />
                                            </Link>
                                          </div>
                                        ))} */}
                                    </CardGrid>
                                  )}
                                </div>
                              }
                              tab2title="Teams"
                              tab2={
                                <div>
                                  {selectedProfileCommunity.attributes.teams.data.length <= 0 ? (
                                    <div>
                                      {adminId ? (
                                        <Link
                                          to={`${selectedProfileCommunity.id}/team`}
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
                                        'grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4'
                                      }
                                    >
                                      {Array.isArray(teamTwitch) && teamTwitch
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
                                                games={team.attributes.games!==undefined && team.attributes.games.data!==null &&team.attributes.games.data.map(sub => sub.attributes.name)}
                                              />
                                            </Link>
                                          </div>
                                        ))}
                                    </CardGrid>
                                  )}
                                </div>
                              }
                              tab3title="Organisations"
                              tab3={
                                <div>
                                  {selectedProfileCommunity.attributes.organisations.data.length <= 0 ? (
                                    <div>
                                      {adminId ? (
                                        <Link
                                          to={`${selectedProfileCommunity.id}/organisations`}
                                          className="inline-flex items-center justify-center h-12 lg:mt-20 xl:mt-20 
                                              px-6 mr-2 mb-2 font-medium tracking-wide transition 
                                              duration-200 bg-primary text-dark rounded-full hover:bg-dark hover:text-light
                                              focus:shadow-outline focus:outline-none"
                                        >
                                          Add an organisation
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
                                      {Array.isArray(organisationTwitch) && organisationTwitch
                                        .sort(() => Math.random() - 0.5)
                                        .map(organisation => (
                                          <div>
                                            <Link
                                              to={`/organisation/${organisation.attributes.username}`}
                                              className="z-20 hover:bg-primary"
                                            >
                                              <CardTwitch
                                                twitchId={organisation.attributes.stream_twitch}
                                                height="99.99%"
                                                link1={`/organisation/${organisation.attributes.username}`}
                                                name={organisation.attributes.name}
                                                games={organisation.attributes.games!==undefined &&organisation.attributes.games.data!==null && organisation.attributes.games.data.map(sub => sub.attributes.name)}
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
                            {/* Section 1 */}
                            <div className=" mb-8 grid grid-cols-1 lg:gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                              {/* Filters */}
                              <section className="xs:my-8 lg:col-start-1 w-full">
                                <div className="bg-light px-4 py-5 shadow rounded-lg ">Filter</div>
                              </section>
                              {/* Content */}
                              <div className="lg:-mt-10 xl:-mt-10 col-span-2">
                                {selectedProfileCommunity.attributes.members!==undefined && selectedProfileCommunity.attributes.members.data!==null&&selectedProfileCommunity.attributes.members.data.length <= 0 ? (
                                  <div>
                                    {adminId ? (
                                      <Link
                                        to={`${selectedProfileCommunity.id}/edit-members`}
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
                                      'grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4 xs:-mt-2 sm:-mt-2 md:-mt-2'
                                    }
                                  >
                                    {selectedProfileCommunity.attributes.members!==undefined && selectedProfileCommunity.attributes.members.data!==null&& selectedProfileCommunity.attributes.members.data.map(user => (
                                      <CardUser
                                        id={user.id}
                                        user={user}
                                        username={user.attributes.username}
                                        image_profile={user.attributes.image_profile}
                                        email={user.attributes.email}
                                        gamertag={user.attributes.gamertag}
                                        team={user.attributes.teams.data?.map(teamList => teamList.attributes.name)}
                                        games={user.attributes.games.data?.map(sub => sub.attributes.name)}
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
                                {selectedProfileCommunity.attributes.teams.data.length <= 0 ? (
                                  <div>
                                    {adminId ? (
                                      <Link
                                        to={`${selectedProfileCommunity.id}/edit-teams`}
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
                                    {selectedProfileCommunity.attributes.teams.data.map(team => (
                                      <CardTeam
                                        id={team.id}
                                        team={team}
                                        username={team.attributes.username}
                                        image_profile={team.attributes.image_profile}
                                        name={team.attributes.name}
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
                        <div label="Organisations">
                          <div className="mx-4 mt-8 mb-12">
                            {/* Section 1 */}
                            <div className=" mb-8 grid grid-cols-1 lg:gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                              {/* Filters */}
                              <section className="xs:my-8 lg:col-start-1 w-full">
                                <div className="bg-light px-4 py-5 shadow rounded-lg ">Filter</div>
                              </section>
                              {/* Content */}
                              <div className="lg:-mt-10 xl:-mt-10 col-span-2">
                                {selectedProfileCommunity.attributes.organisations.data.length <= 0 ? (
                                  <div>
                                    {adminId ? (
                                      <Link
                                        to={`${selectedProfileCommunity.id}/organisations`}
                                        className="inline-flex items-center justify-center h-12 lg:mt-20 xl:mt-20 
                                                px-6 mr-2 mb-2 font-medium tracking-wide transition 
                                                duration-200 bg-primary text-dark rounded-full hover:bg-dark hover:text-light
                                                focus:shadow-outline focus:outline-none"
                                      >
                                        Add an organisation
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
                                    {selectedProfileCommunity.attributes.organisations.data.map(organisation => (
                                      <CardOrganisation
                                        id={organisation.id}
                                        organisation={organisation}
                                        username={organisation.attributes.username}
                                        image_profile={organisation.attributes.image_profile}
                                        name={organisation.attributes.name}
                                        games={organisation.attributes.games!==undefined && Array.isArray(organisation.attributes.games.data) && organisation.attributes.games.data?.map(sub => sub.attributes.name)}
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

                      <CreateExperienceModalCommunity
                        id={selectedProfileCommunity.id}
                        showCreateExperienceModal={showCreateExperienceModal}
                        setShowCreateExperienceModal={setShowCreateExperienceModal}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default ProfileCommunity;
