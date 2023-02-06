import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import backgroundImg from '../../assets/images/hexagon_background.png'

/* Design */
import { play as playIcon } from 'ionicons/icons';
import { IonButton, IonIcon, IonModal, IonToast } from '@ionic/react';
import { FaFacebookSquare, FaTwitch } from 'react-icons/fa';
import { FaTwitterSquare } from 'react-icons/fa';
import { FaDiscord } from 'react-icons/fa';
import { FaXbox } from 'react-icons/fa';
import { FaPlaystation } from 'react-icons/fa';
import { FaYoutube } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa';
import { SiNintendoswitch } from 'react-icons/si';
import { FaSteam } from 'react-icons/fa';
import { SiEpicgames } from 'react-icons/si';
import { FaGlobeAfrica } from 'react-icons/fa';
import { AiFillShopping } from 'react-icons/ai';

/* Images */
import ProfilePlaceholder from '../../assets/images/profile_placeholder.png';
import Gravatar from 'react-gravatar';

/* User */
import { callApi } from '../../utils/utils';
import { useCurrentUser } from '../../context/AuthContext';

/* Follow */
import { FollowsOrganisationsContext } from '../../context/FollowsOrganisationsContext';

/* Redux */
import { useSelector } from 'react-redux';

const HeaderProfileOrganisation = ({}) => {
  const user = useCurrentUser();

  const selectedProfileOrganisation = useSelector(state => state.organisation);

  console.log(selectedProfileOrganisation);

  const { id } = selectedProfileOrganisation;
  const {
    name,
    username,
    organisation,
    type_organisations,
    games,
    image_profile,
    image_background,
    tagline,
    facebook,
    twitter,
    instagram,
    twitch,
    tiktok,
    youtube,
    discord,
    linkedin,
    xbox,
    playstation,
    nintendo,
    steam,
    epic,
    website,
    store,
    verified_profile,
    boolean_onboarding,
  } = selectedProfileOrganisation.attributes;

  /* Remove http Links */
  const RemoveHTTP = socialLink => {
    return socialLink.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '');
  };

  const [organisation1, setOrganisation1] = useState({});

  const { followsGiven, reloader } = useContext(FollowsOrganisationsContext);

  const isOrganisationAlreadyFollowed = () => {
    return (
      followsGiven &&
      organisation1 &&
      user &&
      organisation1.followorganisation_events &&
      organisation1.followorganisation_events.length > 0 &&
      organisation1.followorganisation_events[0].user === user.id
    );
  };

  // console.log('selectedProfileOrganisation===>', selectedProfileOrganisation.attributes);

  const adminId = selectedProfileOrganisation.attributes.members!==undefined &&
    Array.isArray(selectedProfileOrganisation.attributes.members.data) &&
    selectedProfileOrganisation.attributes.members.data.find(person => {
      return person.id === user.id;
    });

  //Handle follow
  const handleFollow = async () => {
    try {
      const response = await callApi({
        path: '/followorganisations',
        method: 'POST',
        body: {
          organisation: id,
        },
      });
      fetchOrganisation();
      reloader();
    } catch (err) {
      console.log('Exception ', err);
    }
  };

  //Handle remove follow
  const handleRemoveFollow = async () => {
    try {
      const response = await callApi({
        path: `/followorganisations/${id}`,
        method: 'DELETE',
      });
      fetchOrganisation();
      reloader();
    } catch (err) {
      console.log('Exception ', err);
    }
  };

  // Used for the edit form

  const fetchOrganisation = async () => {
    try {
      const res = await fetch(`https://hivefolio.herokuapp.com/api/organisations/${id}?populate=*`);
      const data = await res.json();

      setOrganisation1(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrganisation();
  }, []);

  return (
    <div>
      {selectedProfileOrganisation && (
        <section className="flex xs:flex-col-reverse mx-4 overflow-hidden bg-white lg:flex-row mt-6 border-none rounded-3xl ">
          <div className="flex justify-end p-8 bg-light lg:py-20 lg:px-16 lg:pl-10 lg:w-1/2 border-none">
            <div className="flex flex-col items-start justify-center w-full ">
              <div className="mb-2 leading-none">
                <h1 className="mb-2">{name}</h1>
                {username && <h5>@{username}</h5>}
              </div>

              <div className="flex flex-wrap b-4">
                {Array.isArray(type_organisations.data) && type_organisations.data[0] ? (
                  <div
                    className="inline-flex items-center justify-center h-8  
                          px-6 mr-2 mb-2 font-medium tracking-wide transition 
                          duration-200 bg-gray-300 text-dark rounded-full
                          focus:shadow-outline focus:outline-none"
                  >
                    {Array.isArray(type_organisations.data) &&
                      type_organisations.data
                        .sort(() => Math.random() - 0.5)
                        .slice(0, 1)
                        .map(type => type.attributes.name)}
                  </div>
                ) : (
                  <div>
                    {adminId && (
                      <Link
                        to={`/organisation/${id}/edit`}
                        className="inline-flex items-center justify-center h-8  
                                px-6 mr-2 mb-2 font-medium tracking-wide transition 
                                duration-200 bg-dark text-light rounded-full hover:bg-primary hover:text-dark
                                focus:shadow-outline focus:outline-none"
                      >
                        Add type
                      </Link>
                    )}
                  </div>
                )}

                {Array.isArray(games.data) && games.data[0] ? (
                  <div
                    className="inline-flex items-center justify-center h-8  
                          px-6 mr-2 mb-2 font-medium tracking-wide transition 
                          duration-200 bg-gray-300 text-dark rounded-full
                          focus:shadow-outline focus:outline-none"
                  >
                    {games.data
                      .sort(() => Math.random() - 0.5)
                      .slice(0, 1)
                      .map(game => game.attributes.name)}
                  </div>
                ) : (
                  <div>
                    {adminId && (
                      <Link
                        to={`/organisation/${id}/edit`}
                        className="inline-flex items-center justify-center h-8  
                                px-6 mr-2 mb-2 font-medium tracking-wide transition 
                                duration-200 bg-dark text-light rounded-full hover:bg-primary hover:text-dark
                                focus:shadow-outline focus:outline-none"
                      >
                        Add game
                      </Link>
                    )}
                  </div>
                )}
              </div>

              {/* {!tagline ? <></> : <p className="py-5 ">{tagline}</p>} */}

              {/* Social */}

              <div className="flex flex-wrap b-4">
                {!facebook &&
                !twitter &&
                !instagram &&
                !twitch &&
                !tiktok &&
                !youtube &&
                !discord &&
                !linkedin &&
                !xbox &&
                !playstation &&
                !nintendo &&
                !steam &&
                !epic &&
                !website &&
                !store &&
                adminId ? (
                  <Link
                    to={`/organisation/${id}/edit-social`}
                    className="inline-flex items-center justify-center h-12  
                              px-6 mr-2 mb-2 font-medium tracking-wide transition 
                              duration-200 bg-dark text-light rounded-full hover:bg-primary hover:text-dark
                              focus:shadow-outline focus:outline-none"
                  >
                    Add social links
                  </Link>
                ) : (
                  <div className="flex flex-wrap">
                    {facebook ? (
                      <a href={`https://${RemoveHTTP(facebook)}`} target="_blank">
                        <button
                          type="submit"
                          className="inline-flex items-center justify-center h-12  
                                px-4 mr-2 mb-2 font-medium tracking-wide transition 
                                duration-200 bg-dark text-light rounded-full hover:bg-primary hover:text-dark
                                focus:shadow-outline focus:outline-none"
                        >
                          <FaFacebookSquare />
                          {/* <FaFacebookSquare icon={playIcon} slot="start" className="mr-2"/> */}
                        </button>
                      </a>
                    ) : (
                      <div></div>
                    )}

                    {twitter ? (
                      <a href={`https://${RemoveHTTP(twitter)}`} target="_blank">
                        <button
                          type="submit"
                          className="inline-flex items-center justify-center h-12  
                                    px-4 mr-2 mb-2 font-medium tracking-wide transition 
                                    duration-200 bg-dark text-light rounded-full hover:bg-primary hover:text-dark
                                    focus:shadow-outline focus:outline-none"
                        >
                          <FaTwitterSquare />
                        </button>
                      </a>
                    ) : (
                      <div></div>
                    )}

                    {instagram ? (
                      <a href={`https://${RemoveHTTP(instagram)}`} target="_blank">
                        <button
                          type="submit"
                          className="inline-flex items-center justify-center h-12  
                                px-4 mr-2 mb-2 font-medium tracking-wide transition 
                                duration-200 bg-dark text-light rounded-full hover:bg-primary hover:text-dark
                                focus:shadow-outline focus:outline-none"
                        >
                          <FaInstagram />
                          {/* <FaFacebookSquare icon={playIcon} slot="start" className="mr-2"/> */}
                        </button>
                      </a>
                    ) : (
                      <div></div>
                    )}

                    {twitch ? (
                      <a href={`https://${RemoveHTTP(twitch)}`} target="_blank">
                        <button
                          type="submit"
                          className="inline-flex items-center justify-center h-12  
                                    px-4 mr-2 mb-2 font-medium tracking-wide transition 
                                    duration-200 bg-dark text-light rounded-full hover:bg-primary hover:text-dark
                                    focus:shadow-outline focus:outline-none"
                        >
                          <FaTwitch />
                        </button>
                      </a>
                    ) : (
                      <div></div>
                    )}

                    {tiktok ? (
                      <a href={`https://${RemoveHTTP(tiktok)}`} target="_blank">
                        <button
                          type="submit"
                          className="inline-flex items-center justify-center h-12  
                                px-4 mr-2 mb-2 font-medium tracking-wide transition 
                                duration-200 bg-dark text-light rounded-full hover:bg-primary hover:text-dark
                                focus:shadow-outline focus:outline-none"
                        >
                          <SiTiktok />
                          {/* <FaFacebookSquare icon={playIcon} slot="start" className="mr-2"/> */}
                        </button>
                      </a>
                    ) : (
                      <div></div>
                    )}

                    {youtube ? (
                      <a href={`https://${RemoveHTTP(youtube)}`} target="_blank">
                        <button
                          type="submit"
                          className="inline-flex items-center justify-center h-12  
                                    px-4 mr-2 mb-2 font-medium tracking-wide transition 
                                    duration-200 bg-dark text-light rounded-full hover:bg-primary hover:text-dark
                                    focus:shadow-outline focus:outline-none"
                        >
                          <FaYoutube />
                        </button>
                      </a>
                    ) : (
                      <div></div>
                    )}

                    {discord ? (
                      <a href={`https://${RemoveHTTP(discord)}`} target="_blank">
                        <button
                          type="submit"
                          className="inline-flex items-center justify-center h-12  
                                px-4 mr-2 mb-2 font-medium tracking-wide transition 
                                duration-200 bg-dark text-light rounded-full hover:bg-primary hover:text-dark
                                focus:shadow-outline focus:outline-none"
                        >
                          <FaDiscord />
                          {/* <FaFacebookSquare icon={playIcon} slot="start" className="mr-2"/> */}
                        </button>
                      </a>
                    ) : (
                      <div></div>
                    )}

                    {linkedin ? (
                      <a href={`https://${RemoveHTTP(linkedin)}`} target="_blank">
                        <button
                          type="submit"
                          className="inline-flex items-center justify-center h-12  
                                    px-4 mr-2 mb-2 font-medium tracking-wide transition 
                                    duration-200 bg-dark text-light rounded-full hover:bg-primary hover:text-dark
                                    focus:shadow-outline focus:outline-none"
                        >
                          <FaLinkedin />
                        </button>
                      </a>
                    ) : (
                      <div></div>
                    )}

                    {xbox ? (
                      <a href={`https://${RemoveHTTP(xbox)}`} target="_blank">
                        <button
                          type="submit"
                          className="inline-flex items-center justify-center h-12  
                                px-4 mr-2 mb-2 font-medium tracking-wide transition 
                                duration-200 bg-dark text-light rounded-full hover:bg-primary hover:text-dark
                                focus:shadow-outline focus:outline-none"
                        >
                          <FaXbox />
                          {/* <FaFacebookSquare icon={playIcon} slot="start" className="mr-2"/> */}
                        </button>
                      </a>
                    ) : (
                      <div></div>
                    )}

                    {playstation ? (
                      <a href={`https://${RemoveHTTP(playstation)}`} target="_blank">
                        <button
                          type="submit"
                          className="inline-flex items-center justify-center h-12  
                                    px-4 mr-2 mb-2 font-medium tracking-wide transition 
                                    duration-200 bg-dark text-light rounded-full hover:bg-primary hover:text-dark
                                    focus:shadow-outline focus:outline-none"
                        >
                          <FaPlaystation />
                        </button>
                      </a>
                    ) : (
                      <div></div>
                    )}

                    {nintendo ? (
                      <a href={`https://${RemoveHTTP(nintendo)}`} target="_blank">
                        <button
                          type="submit"
                          className="inline-flex items-center justify-center h-12  
                                px-4 mr-2 mb-2 font-medium tracking-wide transition 
                                duration-200 bg-dark text-light rounded-full hover:bg-primary hover:text-dark
                                focus:shadow-outline focus:outline-none"
                        >
                          <SiNintendoswitch />
                          {/* <FaFacebookSquare icon={playIcon} slot="start" className="mr-2"/> */}
                        </button>
                      </a>
                    ) : (
                      <div></div>
                    )}

                    {steam ? (
                      <a href={`https://${RemoveHTTP(steam)}`} target="_blank">
                        <button
                          type="submit"
                          className="inline-flex items-center justify-center h-12  
                                    px-4 mr-2 mb-2 font-medium tracking-wide transition 
                                    duration-200 bg-dark text-light rounded-full hover:bg-primary hover:text-dark
                                    focus:shadow-outline focus:outline-none"
                        >
                          <FaSteam />
                        </button>
                      </a>
                    ) : (
                      <div></div>
                    )}

                    {epic ? (
                      <a href={`https://${RemoveHTTP(epic)}`} target="_blank">
                        <button
                          type="submit"
                          className="inline-flex items-center justify-center h-12  
                                px-4 mr-2 mb-2 font-medium tracking-wide transition 
                                duration-200 bg-dark text-light rounded-full hover:bg-primary hover:text-dark
                                focus:shadow-outline focus:outline-none"
                        >
                          <SiEpicgames />
                          {/* <FaFacebookSquare icon={playIcon} slot="start" className="mr-2"/> */}
                        </button>
                      </a>
                    ) : (
                      <div></div>
                    )}

                    {website ? (
                      <a href={`https://${RemoveHTTP(website)}`} target="_blank">
                        <button
                          type="submit"
                          className="inline-flex items-center justify-center h-12  
                                px-4 mr-2 mb-2 font-medium tracking-wide transition 
                                duration-200 bg-dark text-light rounded-full hover:bg-primary hover:text-dark
                                focus:shadow-outline focus:outline-none"
                        >
                          <FaGlobeAfrica />
                          {/* <FaFacebookSquare icon={playIcon} slot="start" className="mr-2"/> */}
                        </button>
                      </a>
                    ) : (
                      <div></div>
                    )}

                    {store ? (
                      <a href={`https://${RemoveHTTP(store)}`} target="_blank">
                        <button
                          type="submit"
                          className="inline-flex items-center justify-center h-12  
                                px-4 mr-2 mb-2 font-medium tracking-wide transition 
                                duration-200 bg-dark text-light rounded-full hover:bg-primary hover:text-dark
                                focus:shadow-outline focus:outline-none"
                        >
                          <AiFillShopping />
                          {/* <FaFacebookSquare icon={playIcon} slot="start" className="mr-2"/> */}
                        </button>
                      </a>
                    ) : (
                      <div></div>
                    )}
                  </div>
                )}

                {/* Social End */}
              </div>
              <div className="flex flex-wrap">
                {adminId && boolean_onboarding === false && (
                  <Link
                    to={`/onboarding/organisation/${id}`}
                    className="inline-flex items-center justify-center h-12  
                            px-6 mr-2 mb-2 font-medium tracking-wide transition 
                            duration-200 bg-primary text-dark rounded-full hover:bg-dark hover:text-white
                            focus:shadow-outline focus:outline-none"
                  >
                    Onboarding
                  </Link>
                )}

                {adminId && (
                  <Link
                    to={`/organisation/${id}/edit`}
                    className="inline-flex items-center justify-center h-12  
                            px-6 mr-2 mb-2 font-medium tracking-wide transition 
                            duration-200 bg-dark text-light rounded-full hover:bg-primary hover:text-dark
                            focus:shadow-outline focus:outline-none"
                  >
                    Edit profile
                  </Link>
                )}

                {/* claim account */}

                {/* {user.isAuthenticated === team.admins.find(admins).id && (
                            <Link 
                            className="inline-flex items-center justify-center h-12  
                            px-6 mr-2 mb-2 font-medium tracking-wide transition 
                            duration-200 bg-dark text-light rounded-full hover:bg-primary hover:text-dark
                            focus:shadow-outline focus:outline-none"
                            >
                                Claim account
                            </Link>
                        ) } */}

                {/* Follow */}

                {user && (
                  <>
                    {isOrganisationAlreadyFollowed() && (
                      <button
                        onClick={handleRemoveFollow}
                        className="inline-flex items-center justify-center h-12  
                            px-6 mr-2 font-medium tracking-wide transition 
                            duration-200 bg-dark text-light rounded-full hover:bg-primary hover:text-dark
                            focus:shadow-outline focus:outline-none"
                      >
                        Unfollow {/* {follows} */}
                      </button>
                    )}
                    {!isOrganisationAlreadyFollowed() && (
                      <button
                        onClick={handleFollow}
                        className="inline-flex items-center justify-center h-12  
                            px-6 mr-2 font-medium tracking-wide transition 
                            duration-200 bg-primary text-dark rounded-full hover:bg-dark hover:text-light
                            focus:shadow-outline focus:outline-none"
                      >
                        Follow {/* {follows} */}
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center relative lg:w-1/2">
            {image_background ? (
              <img
                src={
                  image_background &&
                  image_background.data !== null &&
                  image_background.data.attributes.url
                }
                alt={`Profile name ${name}`}
                className="object-cover w-full lg:absolute h-40 lg:h-full md:h-60"
              />
            ) : (
              <img
                src={backgroundImg}
                className="object-cover w-full lg:absolute h-40 lg:h-full"
              />
            )}

            <div className="mx-auto bg-cover bg-no-repeat h-32 w-32 image-placeholder rounded-md absolute">
              {image_profile &&image_profile.data !== null ? (
                <div
                  className="mx-auto bg-cover bg-no-repeat h-32 w-32 image-placeholder rounded-md border-4 border-light absolute"
                  style={{
                    backgroundImage: `url(${image_profile && image_profile.data !== null && image_profile.data.attributes.url})`,
                  }}
                  alt={`Profile name ${name}`}
                >
                  {/* <svg className="clip-svg">
                            <defs >
                                <clipPath id="clip-shape" clipPathUnits="objectBoundingBox" >
                                    <path d="M1,0.284 C1,0.428,1,0.572,1,0.716 C0.999,0.718,0.998,0.72,0.998,0.722 C0.993,0.747,0.979,0.766,0.954,0.779 C0.818,0.849,0.681,0.919,0.545,0.988 C0.515,1,0.484,1,0.454,0.988 C0.318,0.919,0.182,0.849,0.046,0.779 C0.015,0.764,0,0.74,0,0.709 C0,0.569,0,0.431,0,0.292 C0,0.26,0.015,0.236,0.046,0.221 C0.182,0.151,0.318,0.081,0.454,0.012 C0.484,-0.004,0.515,-0.004,0.545,0.012 C0.681,0.081,0.818,0.151,0.954,0.222 C0.968,0.229,0.979,0.243,0.989,0.255 C0.995,0.263,0.996,0.274,1,0.284">
                                    </path>
                                </clipPath>
                            </defs>
                        </svg> */}
                </div>
              ) : (
                <div
                  className="mx-auto bg-cover bg-no-repeat h-32 w-32 image-placeholder rounded-md border-4 border-light absolute"
                  style={{ backgroundImage: `url(${ProfilePlaceholder})` }}
                  alt={`Profile name ${name}`}
                ></div>
              )}
            </div>

            {/* <button
          className="inline-flex items-center justify-center h-12  
                    px-4  font-medium tracking-wide transition 
                    duration-200 bg-light text-dark border-dark border-2 border-solid rounded-full hover:bg-primary hover:text-dark
                    focus:shadow-outline focus:outline-none absolute top-4 right-4"
        >
          Share
        </button> */}

            {/* Verified profile */}
            {verified_profile && (
              <div className="flex flex-wrap mb-4">
                <button
                  className="inline-flex items-center justify-center h-12  
                                      px-6 mr-2 mb-2 font-medium tracking-wide transition 
                                      duration-200 bg-primary border-light border-2 border-solid text-dark rounded-full
                                      focus:shadow-outline focus:outline-none absolute top-4 left-4"
                >
                  Verified
                </button>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default HeaderProfileOrganisation;
