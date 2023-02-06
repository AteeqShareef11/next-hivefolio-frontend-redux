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

import { useLocation, useHistory } from 'react-router';
import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

/* Components */
import { NavButtons } from '../ui/Buttons/NavButtons';
import Hexagon from '../ui/Hexagon/Hexagon';
import HeaderProfileTeam from '../ui/Header/HeaderProfileTeam';
import HeaderFeaturedSkeleton from '../ui/Header/HeaderFeaturedSkeleton';
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

import CardExperienceTeam from '../ui/Team/CardExperienceTeam';
//import CardAchievementTeam from '../ui/Team/CardAchievementTeam';

import CreateExperienceModalTeam from '../ui/Team/CreateExperienceModalTeam';
//import CreateAchievementModalTeam from '../ui/Team/CreateAchievementModalTeam';

/* Contexts */
import { useCurrentUser } from '../context/AuthContext';

/* Redux */
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeam, removeSelectedTeam, editTeam } from '../redux/actions/coreActions';
import { fetchExperiences } from '../redux/actions/experienceAction';
import { fetchAchievements } from '../redux/actions/achievementAction';
import { fetchTeams, booleanToogle } from '../redux/actions/teamActions';



const ProfileTeam = ({  }) => {
  const [id, setId] = useState()
  const [name, setName] = useState("")
  const [organisations, setOrganisations] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [image_profile, setImage_profile] = useState('');
  const [games, setGames] = useState([])
  const [introduction, setIntroduction] = useState("")
  const [ate_of_birth, setAte_of_birth] = useState("")
  const [stream_twitch, setSream_twitch] = useState('');
  const [image_feature_1, setimage_feature_1] = useState("")
  const [verified_profile, setVerifiedProfile] = useState(null)
  const [video_highlight_1, setVideo_highlight_1] = useState("");
  const [video_highlight_2, setVideo_highlight_2] = useState("");
  const [video_highlight_3, setVideo_highlight_3] = useState("");
  const [video_highlight_4, setVideo_highlight_4] = useState("");
  const [image_highlight_1, setImage_highlight_1] = useState({})
  const [image_highlight_2, setImage_highlight_2] = useState({})
  const [image_highlight_3, setImage_highlight_3] = useState({})
  const [image_highlight_4, setImage_highlight_4] = useState({});
  const [video_feature_1, setVideo_feature_1] = useState("");
  const [boolean_video_feature_1, setBoolean_video_feature_1] = useState(false);
  const [boolean_image_feature_1, setBoolean_image_feature_1] = useState(false);
  const [boolean_stream_twitch, setBoolean_stream_twitch] = useState(false);


 
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const tabFromUrl = new URLSearchParams(location.search).get('tab');

  const { username } = useParams();

  const user = useCurrentUser();

  // const team = useSelector(state => state.team);
  const selectedProfileTeam = useSelector(state => state.team);

  const teams = useSelector(state => state.allTeams.teams);
  const experiences = useSelector(state => state.allExperiences.experiences);
  const achievements = useSelector(state => state.allAchievements.achievements);
  const typeUsers = useSelector(state => state.allData.typeTeams);

  const [showCreateExperienceModal, setShowCreateExperienceModal] = useState(false);
  const [showCreateAchievementModal, setShowCreateAchievementModal] = useState(false);

  const [videoFeature1, setVideoFeature1] = useState();
  const [imageFeature1, setImageFeature1] = useState();
  const [streamTwitchBoolean, setStreamTwitchBoolean] = useState();

  // console.log('All Single team is here', team);
  // console.log('All experiences is here', experiences);
  // console.log('All achievements is here', achievements);
  // console.log('All typeUsers is here', typeUsers);
  // console.log('Single Team Data is here', selectedProfileTeam);

  let foundTeam = {};
  if (teams && teams !== undefined && selectedProfileTeam && selectedProfileTeam !== undefined) {
    const matchTeam = Array.isArray(teams.data)
      ? teams.data.find(person => {
          return person?.id === selectedProfileTeam?.data?.id;
        })
      : {};
    foundTeam = matchTeam;
  };
  // console.log('Found Team is Here', foundTeam);

  useEffect(() => {
    if (teams === undefined) {
      dispatch(fetchTeams());
    }
  }, [teams]);

  console.log(selectedProfileTeam);


const setvalues = () => {
if(selectedProfileTeam !== null || undefined){
  setName(selectedProfileTeam?.data?.attributes?.name);
  console.log(name)
}
};






  // const { id } = selectedProfileTeam.data;
  // console.log(selectedProfileTeam.data.attributes);
  // const {
  //   name,
  //   organisations,
  //   communities,
  // //  admins,
  // //members,
  //   image_profile,
  //   email,
  //   gamertag,
  //   games,
  //   discord,
  //   discord_channel,
  //   characters,
  //   firstname,
  //   lastname,
  //   introduction,
  //   date_of_birth,
  //   country,
  //   languages,
  //   verified_profile,
  //   selectedProfileTeam?.data?.attributes?.stream_twitch,
  //   selectedProfileTeam?.data?.attributes?.video_feature_1,
  //   selectedProfileTeam?.data?.attributes?.image_feature_1,
  //   selectedProfileTeam?.data?.attributes?.video_highlight_1,
  //   selectedProfileTeam?.data?.attributes?.video_highlight_2,
  //   selectedProfileTeam?.data?.attributes?.video_highlight_3,
  //   selectedProfileTeam?.data?.attributes?.video_highlight_4,
  //   selectedProfileTeam?.data?.attributes?.image_highlight_1,
  //   selectedProfileTeam?.data?.attributes?.image_highlight_2,
  //   selectedProfileTeam?.data?.attributes?.image_highlight_3,
  //   selectedProfileTeam?.data?.attributes?.image_highlight_4,
  //   selectedProfileTeam?.data?.attributes?.boolean_video_feature_1,
  //   selectedProfileTeam?.data?.attributes?.boolean_image_feature_1,
  //   selectedProfileTeam?.data?.attributes?.boolean_stream_twitch,
  // } = selectedProfileTeam.data && selectedProfileTeam.data.attributes;

  // const adminId = admins?.find(person => {
  //   return person.id === user.id;
  // });

  // const memberTwitch = members?.filter(stream => {
  //   return stream.stream_twitch !== undefined;
  // });

  /* useEffect(() => {
    if(selectedProfileTeam.boolean_onboarding === false && adminId) {
      history.push(`/onboarding/team/${id}`)
    }
  }, [selectedProfileTeam]) */

  useEffect( async() => {
    dispatch(fetchTeams());
    dispatch(fetchExperiences());
    dispatch(fetchAchievements());
    dispatch(fetchTeam(username));
    setvalues();
    return () => {
      dispatch(removeSelectedTeam());
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

    dispatch(editTeam(body, selectedProfileTeam?.data?.id));
    dispatch(fetchTeam(username));
    // dispatch(fetchTeam(username));
    // dispatch(fetchTeam(username));
  };

  // const handleFeatureImage1Toggle = () => {
  //   imageFeature1 === 'true' ? setImageFeature1('false') : setImageFeature1('true');
  //   document.body.classList.toggle('false');

  //   const formData = new FormData();
  //   formData.append(
  //     'data',
  //     JSON.stringify({
  //       boolean_image_feature_1: imageFeature1,
  //     })
  //   );

    // const body = {
    //   boolean_image_feature_1: imageFeature1,
    // };

  //   dispatch(editTeam(body, id));
  //   dispatch(fetchTeam(username));
  //   dispatch(fetchTeam(username));
  //   dispatch(fetchTeam(username));
  // };

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

    dispatch(editTeam(body, id));
    dispatch(fetchTeam(username));
  };

  // =================Not Found==================
  //   admins,
  //   firstname,
  //   lastname,
  //   members,
  //    characters,
  //   country,
  //   languages,
  //=====================Founded Here ===============
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

  // console.log('Name is Here', selectedProfileTeam?.data?.attributes?.name);
  // console.log('organization is Here', selectedProfileTeam?.data?.attributes?.organisations);
  // console.log('Communities is Here', selectedProfileTeam?.data?.attributes?.communities);
  // console.log('Name is Here', selectedProfileTeam?.data?.attributes?.stream_twitch);
  // console.log('Name is Here', selectedProfileTeam?.data?.attributes?.video_feature_1);
  // console.log('Image profile is Here', selectedProfileTeam?.data?.attributes?.image_profile);
  // console.log('Name is Here', selectedProfileTeam?.data?.attributes?.boolean_stream_twitch);
  console.log('games is Here', selectedProfileTeam?.data?.attributes?.games);
  // console.log('discord is Here', selectedProfileTeam?.data?.attributes?.discord);
  // console.log('discord_channel is Here', selectedProfileTeam?.data?.attributes?.discord_channel);
  // console.log('Name is Here', selectedProfileTeam?.data?.attributes?.video_highlight_3);
  // console.log('introduction is Here', selectedProfileTeam?.data?.attributes?.introduction);
  // console.log('ate_of_birth is Here', selectedProfileTeam?.data?.attributes?.ate_of_birth);
  // console.log('verified_profile is Here', selectedProfileTeam?.data?.attributes?.verified_profile);

  return selectedProfileTeam !== null || undefined ? (
    <IonPage id="PageId">
      <IonHeader>
        <title>{selectedProfileTeam?.data?.attributes?.name} - Hivefolio</title>
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
      <IonContent fullscreen>
        <div>
          {!foundTeam && (
            <div className="mt-6">
              <HeaderFeaturedSkeleton />
            </div>
          )}

          {foundTeam && selectedProfileTeam && (
            <div>
              <HeaderProfileTeam id={selectedProfileTeam?.data?.id} />

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

                              {selectedProfileTeam?.data?.attributes?.name ||
                              selectedProfileTeam?.data?.attributes?.introduction ||
                              selectedProfileTeam?.data?.attributes?.ate_of_birth ? (
                                <div>
                                  {selectedProfileTeam?.data?.attributes?.name && (
                                    <div className="flex flex-col w-full mb-4">
                                      <p className="font-bold">Name</p>
                                      <p className="flow-auto">
                                        {selectedProfileTeam?.data?.attributes?.name}
                                      </p>
                                    </div>
                                  )}
                                  {selectedProfileTeam?.data?.attributes?.introduction && (
                                    <div className="flex flex-col w-full mb-4">
                                      <p className="font-bold">Introduction</p>
                                      <p className="flow-auto">
                                        {selectedProfileTeam?.data?.attributes?.introduction}
                                      </p>
                                    </div>
                                  )}

                                  {/* Date of birth */}
                                  {selectedProfileTeam?.data?.attributes?.ate_of_birth && (
                                    <div className="flex flex-col mb-4">
                                      <p className="font-bold w-full">Date of birth </p>

                                      <p className="flow-auto">
                                        {selectedProfileTeam?.data?.attributes?.ate_of_birth}
                                      </p>
                                    </div>
                                  )}

                                  {/* Country */}
                                  {/* {country && (
                                    <div className="flex flex-col mb-4">
                                      <p className="font-bold">Country</p>
                                      <p className="flow-auto">{country}</p>
                                    </div>
                                  )} */}

                                  {/* Languages */}
                                  {/* {languages && (
                                    <div className="flex flex-col mb-4">
                                      <p className="font-bold">Languages</p>
                                      <p className="flow-auto">{languages}</p>
                                    </div>
                                  )} */}

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
                                  {/* {adminId ? (
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
                                  )} */}
                                </div>
                              )}

                              {/* Verified profile */}
                              {selectedProfileTeam?.data?.attributes?.verified_profile && (
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

                            {selectedProfileTeam?.data?.attributes?.stream_twitch && (
                              <div className="flex flex-col xs:block sm:block md:block lg:hidden xl:hidden">
                                <div className="mb-4">
                                  {selectedProfileTeam?.data?.attributes?.stream_twitch &&
                                  selectedProfileTeam?.data?.attributes?.boolean_stream_twitch ===
                                    true ? (
                                    <CardTwitch
                                      twitchId={
                                        selectedProfileTeam?.data?.attributes?.stream_twitch
                                      }
                                    />
                                  ) : (
                                    <div>
                                      {!selectedProfileTeam?.data?.attributes?.stream_twitch ? (
                                        <div
                                          className="rounded-3xl border-none p-4 sm:w-full h-40 bg-cover bg-no-repeat"
                                          style={{ backgroundImage: `url(${hexagon_background})` }}
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
                                          {!selectedProfileTeam?.data?.attributes?.stream_twitch &&
                                            selectedProfileTeam?.data?.attributes
                                              ?.boolean_stream_twitch === true && (
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

                                {
                                  <div>
                                    {!selectedProfileTeam?.data?.attributes
                                      ?.boolean_stream_twitch ? (
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
                                }
                              </div>
                            )}

                            {/* YouTube */}

                            {selectedProfileTeam?.data?.attributes?.video_feature_1 && (
                              <div className="flex flex-col xs:block sm:block md:block lg:hidden xl:hidden">
                                <div className="mb-4">
                                  {selectedProfileTeam?.data?.attributes?.video_feature_1 &&
                                  selectedProfileTeam?.data?.attributes?.boolean_video_feature_1 ===
                                    true ? (
                                    <CardYoutube
                                      video1={
                                        selectedProfileTeam?.data?.attributes?.video_feature_1
                                      }
                                    />
                                  ) : (
                                    <div>
                                      {!selectedProfileTeam?.data?.attributes?.video_feature_1 ? (
                                        <div
                                          className="rounded-3xl border-none p-4 sm:w-full h-40 bg-cover bg-no-repeat"
                                          style={{ backgroundImage: `url(${hexagon_background})` }}
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
                                          {!selectedProfileTeam?.data?.attributes
                                            ?.video_feature_1 &&
                                            selectedProfileTeam?.data?.attributes
                                              ?.boolean_video_feature_1 === true && (
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

                                {
                                  <div>
                                    {!selectedProfileTeam?.data?.attributes
                                      ?.boolean_video_feature_1 ? (
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
                                }
                              </div>
                            )}

                            {/*  */}

                            {/* Experiences */}

                            {selectedProfileTeam.experiences?.length !== 0 && (
                              <div
                                className="xxs:mt-12 xs:mt-12 sm:mt-12 md:mt-16 lg:mt-10 xl:mt-10 col-span-2 
                          xs:block sm:block md:block lg:hidden xl:hidden"
                              >
                                <div className="flex flex-row justify-between">
                                  <h3 className="px-4 -mb-12">Experiences</h3>

                                  {
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
                                  }
                                </div>

                                {experiences && foundTeam.id ? (
                                  <CardGrid
                                    style1={
                                      'grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4'
                                    }
                                    className="mt-8"
                                  >
                                    {experiences && foundTeam.id && (
                                      <div>
                                        {foundTeam?.attributes?.experiences?.data?.map(
                                          experience => (
                                            <div>
                                              <CardExperienceTeam
                                                experienceId={experience?.id}
                                                experience={experience}
                                                image_profile={experience?.image_profile}
                                                responsive={true}
                                                cardLink01={true}
                                              />
                                            </div>
                                          )
                                        )}
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
                                {Array.isArray(selectedProfileTeam?.data?.attributes?.games.data) &&
                                  selectedProfileTeam?.data?.attributes?.games.data
                                    .sort(() => Math.random() - 0.5)
                                    .map(game => (
                                      <CardGame
                                        id={game.id}
                                        game={game}
                                        username={game.attributes.username}
                                        // image_profile={game.image_profile}
                                        name={game.attributes.name}
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
                            {selectedProfileTeam?.data?.attributes?.stream_twitch && (
                              <div className="flex flex-col xs:hidden sm:hidden md:hidden lg:block xl:block">
                                <div className="mb-4">
                                  {selectedProfileTeam?.data?.attributes?.stream_twitch &&
                                  selectedProfileTeam?.data?.attributes?.boolean_stream_twitch ===
                                    true ? (
                                    <CardTwitch
                                      twitchId={
                                        selectedProfileTeam?.data?.attributes?.stream_twitch
                                      }
                                    />
                                  ) : (
                                    <div>
                                      {!selectedProfileTeam?.data?.attributes?.stream_twitch ? (
                                        <div
                                          className="rounded-3xl border-none p-4 sm:w-full h-40 bg-cover bg-no-repeat"
                                          style={{ backgroundImage: `url(${hexagon_background})` }}
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
                                          {!selectedProfileTeam?.data?.attributes?.stream_twitch &&
                                            selectedProfileTeam?.data?.attributes
                                              ?.boolean_stream_twitch === true && (
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

                                {
                                  <div>
                                    {!selectedProfileTeam?.data?.attributes
                                      ?.boolean_stream_twitch ? (
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
                                }
                              </div>
                            )}

                            {selectedProfileTeam?.data?.attributes?.video_feature_1 && (
                              <div className="flex flex-col xs:hidden sm:hidden md:hidden lg:block xl:block">
                                <div className="mb-4">
                                  {selectedProfileTeam?.data?.attributes?.video_feature_1 &&
                                  selectedProfileTeam?.data?.attributes?.boolean_video_feature_1 ===
                                    true ? (
                                    <CardYoutube
                                      video1={
                                        selectedProfileTeam?.data?.attributes?.video_feature_1
                                      }
                                    />
                                  ) : (
                                    <div>
                                      {!selectedProfileTeam?.data?.attributes?.video_feature_1 ? (
                                        <div
                                          className="rounded-3xl border-none p-4 sm:w-full h-40 bg-cover bg-no-repeat"
                                          style={{ backgroundImage: `url(${hexagon_background})` }}
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
                                          {!selectedProfileTeam?.data?.attributes
                                            ?.video_feature_1 &&
                                            selectedProfileTeam?.data?.attributes
                                              ?.boolean_video_feature_1 === true && (
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

                                {
                                  <div>
                                    {!selectedProfileTeam?.data?.attributes
                                      ?.boolean_video_feature_1 ? (
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
                                }
                              </div>
                            )}

                            {/* Experiences */}
                            {selectedProfileTeam.experiences?.length !== 0 && (
                              <div
                                className="xxs:-mt-4 xs:-mt-4 sm:-mt-6 md:-mt-16 lg:mt-10 xl:mt-10 col-span-2 
                          xs:hidden sm:hidden md:hidden lg:block xl:block"
                              >
                                <div className="flex flex-row justify-between">
                                  <h3 className="px-4 -mb-12">Experiences</h3>

                                  {
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
                                  }
                                </div>

                                {experiences && foundTeam.id ? (
                                  <CardGrid
                                    style1={
                                      'grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4'
                                    }
                                    className="mt-8"
                                  >
                                    {experiences && foundTeam.id && (
                                      <div>
                                        {foundTeam?.experiences?.data.map(experience => (
                                          <div>
                                            <CardExperienceTeam
                                              experienceId={experience.id}
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

                            {selectedProfileTeam?.data?.attributes?.image_feature_1 && (
                              <div>
                                <div className="mb-4">
                                  {selectedProfileTeam?.data?.attributes?.image_feature_1 &&
                                  selectedProfileTeam?.data?.attributes?.boolean_image_feature_1 ===
                                    true ? (
                                    <div className="bg-light rounded-3xl border-none p-4 sm:w-full h-auto bg-cover bg-no-repeat">
                                      <img
                                        src={
                                          selectedProfileTeam?.data?.attributes?.image_feature_1 &&
                                          selectedProfileTeam?.data?.attributes?.image_feature_1.url
                                        }
                                        className="h-full w-full rounded-3xl"
                                      />
                                    </div>
                                  ) : (
                                    <div>
                                      {!selectedProfileTeam?.data?.attributes?.image_feature_1 ? (
                                        <div
                                          className="rounded-3xl border-none p-4 sm:w-full h-40 bg-cover bg-no-repeat"
                                          style={{ backgroundImage: `url(${hexagon_background})` }}
                                        >
                                          <Link
                                            to={`${id}/edit-media`}
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
                                          {!selectedProfileTeam?.data?.attributes
                                            ?.image_feature_1 &&
                                            selectedProfileTeam?.data?.attributes
                                              ?.boolean_image_feature_1 === true && (
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

                                {
                                  <div>
                                    {!selectedProfileTeam?.data?.attributes
                                      ?.boolean_image_feature_1 ? (
                                      <button
                                        type="submit"
                                        // onClick={event => {
                                        //   handleFeatureImage1Toggle(event);
                                        // }}
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-dark hover:bg-dark hover:text-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                      >
                                        Show image
                                      </button>
                                    ) : (
                                      <button
                                        type="submit"
                                        // onClick={event => {
                                        //   handleFeatureImage1Toggle(event);
                                        // }}
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                      >
                                        Hide image
                                      </button>
                                    )}
                                  </div>
                                }
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/*  */}
                    </div>
                  </div>

                  {/* Tab 3 */}
                  <div label="Career">
                    {/*  */}

                    <div className="max-width px-4">
                      <TabsHeadlessUi
                        tab1title="Experience"
                        tab1={
                          <div className=" mb-8 ">
                            <div className="flex">
                              {
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
                              }
                            </div>

                            <div className="grid grid-cols-1 lg:gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                              {/* Filters */}
                              <div className="xs:my-8 lg:col-start-1 w-full">
                                <div className="bg-light px-4 py-5 shadow rounded-lg ">Filter</div>
                              </div>
                              {/* Content */}
                              <div className="xxs:-mt-4 xs:-mt-4 sm:-mt-6 md:-mt-16 lg:-mt-10 xl:-mt-10 col-span-2">
                                {experiences && foundTeam.id ? (
                                  <CardGrid
                                    style1={
                                      'grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4'
                                    }
                                    className="mt-8"
                                  >
                                    {experiences && foundTeam.id && (
                                      <div>
                                        {experiences &&
                                          foundTeam?.experiences?.data?.map(experience => (
                                            <div>
                                              <CardExperienceTeam
                                                experienceId={experience.id}
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
                            {selectedProfileTeam?.data?.attributes?.video_highlight_1 ? (
                              <div className="">
                                {selectedProfileTeam?.data?.attributes?.video_highlight_1 && (
                                  <CardYoutube
                                    video1={
                                      selectedProfileTeam?.data?.attributes?.video_highlight_1
                                    }
                                  />
                                )}
                              </div>
                            ) : (
                              <div
                                className="rounded-3xl border-none p-4 sm:w-full h-40 bg-cover bg-no-repeat"
                                style={{ backgroundImage: `url(${hexagon_background})` }}
                              >
                                {user.id !== selectedProfileTeam?.data?.id ? (
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

                            {selectedProfileTeam?.data?.attributes?.video_highlight_2 && (
                              <div className="">
                                {selectedProfileTeam?.data?.attributes?.video_highlight_2 && (
                                  <CardYoutube
                                    video1={
                                      selectedProfileTeam?.data?.attributes?.video_highlight_2
                                    }
                                  />
                                )}
                              </div>
                            )}

                            {selectedProfileTeam?.data?.attributes?.video_highlight_3 && (
                              <div className="">
                                {selectedProfileTeam?.data?.attributes?.video_highlight_3 && (
                                  <CardYoutube
                                    video1={
                                      selectedProfileTeam?.data?.attributes?.video_highlight_3
                                    }
                                  />
                                )}
                              </div>
                            )}

                            {selectedProfileTeam?.data?.attributes?.video_highlight_4 && (
                              <div className="">
                                {selectedProfileTeam?.data?.attributes?.video_highlight_4 && (
                                  <CardYoutube
                                    video1={
                                      selectedProfileTeam?.data?.attributes?.video_highlight_4
                                    }
                                  />
                                )}
                              </div>
                            )}
                          </div>
                        }
                        tab2title="Images"
                        tab2={
                          <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
                            {selectedProfileTeam?.data?.attributes?.image_highlight_1 ? (
                              <div className="rounded-3xl border-none p-4 sm:w-full h-auto bg-cover bg-no-repeat">
                                <img
                                  src={
                                    selectedProfileTeam?.data?.attributes?.image_highlight_1 &&
                                    selectedProfileTeam?.data?.attributes?.image_highlight_1.url
                                  }
                                  className="h-full w-full rounded-3xl"
                                />
                              </div>
                            ) : (
                              <div
                                className="rounded-3xl border-none p-4 sm:w-full h-40 bg-cover bg-no-repeat"
                                style={{ backgroundImage: `url(${hexagon_background})` }}
                              >
                                {user.id === selectedProfileTeam?.data?.id ? (
                                  <Link
                                    to={`${selectedProfileTeam?.data?.id}/edit`}
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

                            {selectedProfileTeam?.data?.attributes?.image_highlight_2 && (
                              <div className="rounded-3xl border-none p-4 sm:w-full h-auto bg-cover bg-no-repeat">
                                <img
                                  src={
                                    selectedProfileTeam?.data?.attributes?.image_highlight_2 &&
                                    selectedProfileTeam?.data?.attributes?.image_highlight_2.url
                                  }
                                  className="h-full w-full rounded-3xl"
                                />
                              </div>
                            )}

                            {selectedProfileTeam?.data?.attributes?.image_highlight_3 && (
                              <div className="rounded-3xl border-none p-4 sm:w-full h-auto bg-cover bg-no-repeat">
                                <img
                                  src={
                                    selectedProfileTeam?.data?.attributes?.image_highlight_3 &&
                                    selectedProfileTeam?.data?.attributes?.image_highlight_3.url
                                  }
                                  className="h-full w-full rounded-3xl"
                                />
                              </div>
                            )}

                            {selectedProfileTeam?.data?.attributes?.image_highlight_4 && (
                              <div className="rounded-3xl border-none p-4 sm:w-full h-auto bg-cover bg-no-repeat">
                                <img
                                  src={
                                    selectedProfileTeam?.data?.attributes?.image_highlight_4 &&
                                    selectedProfileTeam?.data?.attributes?.image_highlight_4.url
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
                  <div label="Streams">
                    <div className="mx-4 mt-8 mb-12">
                      <div className="xs:mb-8">
                        <h2>Members Streams</h2>
                      </div>

                      {/* Section 1 */}

                      {/* {members <= 0 ? (
                        <div>
                          {adminId ? (
                            <Link
                              to={`${id}/edit-members`}
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
                            'grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4'
                          }
                        >
                          {Array.isArray(memberTwitch) &&
                            memberTwitch
                              .sort(() => Math.random() - 0.5)
                              .map(user => (
                                <div>
                                  <Link
                                    to={`/user/${user.username}`}
                                    className="z-20 hover:bg-primary"
                                  >
                                    <CardTwitch
                                      twitchId={
                                        user.selectedProfileTeam?.data?.attributes?.stream_twitch
                                      }
                                      height="99.99%"
                                      link1={`/user/${user.username}`}
                                      gamertag={user.gamertag}
                                      games={user.games.map(sub => sub.name)}
                                    />
                                  </Link>
                                </div>
                              ))}
                        </CardGrid>
                      )} */}
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
                              {/* {members <= 0 ? (
                                <div>
                                  {adminId ? (
                                    <Link
                                      to={`${id}/edit-members`}
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
                                  {members?.map(user => (
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
                              )} */}
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
                          {selectedProfileTeam?.data?.attributes?.organisations <= 0 ? (
                            <div>
                              {/* {adminId ? (
                                <Link
                                  to={`${id}/organisations`}
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
                              )} */}
                            </div>
                          ) : (
                            <CardGrid
                              style1={
                                'grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4'
                              }
                            >
                              {Array.isArray(
                                selectedProfileTeam?.data?.attributes?.organisations
                              ) &&
                                selectedProfileTeam?.data?.attributes?.organisations.map(
                                  organisation => (
                                    <CardOrganisation
                                      id={organisation.id}
                                      organisation={organisation}
                                      username={organisation.username}
                                      image_profile={organisation.image_profile}
                                      name={organisation.name}
                                      /* games={user.games.map((sub) =>
                                      sub.name
                                    )} */
                                      responsive={true}
                                    />
                                  )
                                )}
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
                          {selectedProfileTeam?.data?.attributes?.communities <= 0 ? (
                            <div>
                              {/* {adminId ? (
                                <Link
                                  to={`${id}/communities`}
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
                              )} */}
                            </div>
                          ) : (
                            <CardGrid
                              style1={
                                'grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4'
                              }
                            >
                              {Array.isArray(selectedProfileTeam?.data?.attributes?.communities) &&
                                selectedProfileTeam?.data?.attributes?.communities.map(
                                  community => (
                                    <CardCommunity
                                      id={community.id}
                                      community={community}
                                      username={community.username}
                                      image_profile={community.image_profile}
                                      name={community.name}
                                      responsive={true}
                                    />
                                  )
                                )}
                            </CardGrid>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </TabSub>

                <CreateExperienceModalTeam
                  id={selectedProfileTeam?.data?.id}
                  selectedProfileTeam={selectedProfileTeam}
                  showCreateExperienceModal={showCreateExperienceModal}
                  setShowCreateExperienceModal={setShowCreateExperienceModal}
                />
              </div>
            </div>
          )}
        </div>
        <Footer />
      </IonContent>
    </IonPage>
  ) : (
    <IonPage id="PageId">
      <h1>Hello Loading</h1>
    </IonPage>
  );
};

export default ProfileTeam;
