import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

/* Design */
import { play as playIcon } from 'ionicons/icons';
import { IonButton, IonIcon, IonModal, IonToast } from '@ionic/react';
import { FaFacebookSquare, FaPlaystation, FaTwitch } from 'react-icons/fa';
import { FaTwitterSquare } from 'react-icons/fa';
import { FaDiscord } from 'react-icons/fa';
import { FaXbox } from 'react-icons/fa';
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
import hexagon_background from '../../assets/images/hexagon_background.png';
import Gravatar from 'react-gravatar';

/* User */
import { callApi } from '../../utils/utils';
import { useCurrentUser } from '../../context/AuthContext';
import { FollowsUsersContext } from '../../context/FollowsUsersContext';

/* Redux */
import { useSelector } from 'react-redux';

/* Analytics */
import ReactGA from 'react-ga';

const HeaderProfileUser = ({ }) => {
  const user = useCurrentUser();
  const [user1, setUser1] = useState({});

  const selectedProfileUser = useSelector(state => state.user);
  const { 
    id,
    image_profile,
    image_background,
    username,
    gamertag,
    email,
    games,
    type_user,
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
    verified_profile 
  } = selectedProfileUser;


  /* Remove http Links */
  const RemoveHTTP = (socialLink) => {
    return socialLink.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "");
  }

  /* Follow */
  const { followsGiven, reloader } = useContext(FollowsUsersContext);

  const isUserAlreadyFollowed = () => {
    return (
      followsGiven &&
      user1 &&
      user &&
      user1.followuser_events &&
      user1.followuser_events.length > 0 &&
      user1.followuser_events[0].user === user.id
    );
  };

  const handleFollow = async () => {
    try {
      const response = await callApi({
        path: '/followusers',
        method: 'POST',
        body: {
          user: id,
        },
      });
      fetchUser();
      reloader();
    } catch (err) {
      console.log('Exception ', err);
    }
  };

  //Handle remove follow
  const handleRemoveFollow = async () => {
    try {
      const response = await callApi({
        path: `/followusers/${id}`,
        method: 'DELETE',
      });
      fetchUser();
      reloader();
    } catch (err) {
      console.log('Exception ', err);
    }
  };

  // Used for the edit form

  const fetchUser = async () => {
    try {
      const res = await fetch(`https://hivefolio.herokuapp.com/api/users/${id}?populate=*`);
      /* const res = await fetch(`http://localhost:1337/users/${id}`); */
      const data = await res.json();

      setUser1(data);
    } catch (err) {
      console.error(err);
    }
  };



  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <section className="flex flex-col xs:flex-col-reverse mx-4 overflow-hidden bg-white lg:flex-row mt-6 border-none rounded-3xl ">
      <div className="justify-end p-8 bg-light lg:py-20 lg:px-16 lg:pl-10 lg:w-1/2 border-none">
        <div className="flex flex-col items-start justify-center w-full ">
          <div className="mb-2 leading-none">
            <h1 className="mb-2">{gamertag}</h1>
            {username && <h5>@{username}</h5>}
          </div>

          <div className="flex flex-wrap b-4">
          {Array.isArray(type_user) && type_user.length!==0 && type_user[0] ? (
            <div
              className="inline-flex items-center justify-center h-8  
                          px-6 mr-2 mb-2 font-medium tracking-wide transition 
                          duration-200 bg-gray-300 text-dark rounded-full
                          focus:shadow-outline focus:outline-none"
            >
              {type_user.sort(() => Math.random() - 0.5).slice(0,1).map(type => (type.name))}
            </div>
          ) : (
            <div>
            {id === user.id && (
                <Link
                  to={`/account`}
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

          {Array.isArray(games) && games.length!==0 &&games[0] ? (
            <div
              className="inline-flex items-center justify-center h-8  
                          px-6 mr-2 mb-2 font-medium tracking-wide transition 
                          duration-200 bg-gray-300 text-dark rounded-full
                          focus:shadow-outline focus:outline-none"
            >
              {games.sort(() => Math.random() - 0.5).slice(0,1).map(game => (game.name))}
            </div>
          ) : (
            <div>
            {id === user.id && (
                <Link
                  to={`/account`}
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

          {/* {!tagline ? <></> : <p className="mb-4">{tagline}</p>} */}

          {/* Social */}

          <div className="flex flex-wrap b-4">

          {(!facebook && !twitter && !instagram && !twitch && !tiktok && !youtube && !discord && !linkedin && !xbox && !playstation && !nintendo && !steam && !epic && !website && !store) && (id === user.id) ? (
              <Link
                to={`/account-social`}
                className="inline-flex items-center justify-center h-12  
                              px-6 mr-2 mb-2 font-medium tracking-wide transition 
                              duration-200 bg-dark text-light rounded-full hover:bg-primary hover:text-dark
                              focus:shadow-outline focus:outline-none"
              >
                Add social links
              </Link>
            ) : (
              <div className='flex flex-wrap'>
            {facebook ? (
              <a href={(`https://${RemoveHTTP(facebook)}`)} target="_blank">
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
              <a href={(`https://${RemoveHTTP(twitter)}`)} target="_blank">
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
              <a href={(`https://${RemoveHTTP(instagram)}`)} target="_blank">
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
              <a href={(`https://${RemoveHTTP(twitch)}`)} target="_blank">
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
              <a href={(`https://${RemoveHTTP(tiktok)}`)} target="_blank">
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
              <a href={(`https://${RemoveHTTP(youtube)}`)} target="_blank">
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
              <a href={(`https://discord.com/invite/${discord}`)} target="_blank">
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
              <a href={(`https://${RemoveHTTP(linkedin)}`)} target="_blank">
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
              <a href={(`https://${RemoveHTTP(xbox)}`)} target="_blank">
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
              <a href={(`https://${RemoveHTTP(playstation)}`)} target="_blank">
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
              <a href={(`https://${RemoveHTTP(nintendo)}`)} target="_blank">
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
              <a href={(`https://${RemoveHTTP(steam)}`)} target="_blank">
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
              <a href={(`https://${RemoveHTTP(epic)}`)} target="_blank">
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
              <a href={(`https://${RemoveHTTP(website)}`)} target="_blank">
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
              <a href={(`https://${RemoveHTTP(store)}`)} target="_blank">
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
            {id === user.id && (
              <Link
                to={'/account'}
                className="inline-flex items-center justify-center h-12  
                            px-6 mr-2 mb-2 font-medium tracking-wide transition 
                            duration-200 bg-dark text-light rounded-full hover:bg-primary hover:text-dark
                            focus:shadow-outline focus:outline-none"
              >
                Edit profile
              </Link>
            )}

            {/* Follow */}

            {/* {user && (
              <>
                {isUserAlreadyFollowed() && (
                  <button
                    onClick={handleRemoveFollow}
                    className="inline-flex items-center justify-center h-12  
                            px-6 mr-2 font-medium tracking-wide transition 
                            duration-200 bg-dark text-light rounded-full hover:bg-primary hover:text-dark
                            focus:shadow-outline focus:outline-none"
                  >
                    Unfollow 
                  </button>
                )}
                {!isUserAlreadyFollowed() && (
                  <button
                    onClick={handleFollow}
                    className="inline-flex items-center justify-center h-12  
                            px-6 mr-2 font-medium tracking-wide transition 
                            duration-200 bg-primary text-dark rounded-full hover:bg-dark hover:text-light
                            focus:shadow-outline focus:outline-none"
                  >
                    Follow
                  </button>
                )}
              </>
            )} */}
          </div>

          
        </div>
      </div>
      <div className="flex sm:flex-row-reverse items-center justify-center relative lg:w-1/2">
      { image_background ? (
                    <img 
                    src={image_background && image_background.url} 
                    alt={`Profile name ${gamertag}`} 
                    className="object-cover w-full lg:absolute h-40 lg:h-full md:h-60"
                    />
                ) : (
                    <img src={hexagon_background} className="object-cover w-full lg:absolute h-40 lg:h-full"/>
                )}
                
                <div className="mx-auto bg-cover bg-no-repeat h-32 w-32 image-placeholder rounded-full absolute bg-white">
                    {image_profile ? (
                        <div className="mx-auto bg-cover bg-no-repeat h-32 w-32 image-placeholder rounded-full border-4 border-light absolute"
                        style={{
                            backgroundImage: `url(${image_profile && image_profile.url})`
                            }}
                            alt={`Profile name ${gamertag}`}
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
                      className="mx-auto bg-cover bg-no-repeat h-28 w-28 image-placeholder rounded-full placeholder overflow-hidden text-transparent"
                      /* className="hexagonImage element placeholder overflow-hidden text-transparent" */
                      style={{ backgroundImage: `url(${ProfilePlaceholder})` }}
                      alt={`Profile name ${gamertag}`}
                    >
                      {/* /* Change default to placeholder image */}
                      <Gravatar
                        size={1600}
                        rating="pg"
                        default={ProfilePlaceholder}
                        email={email}
                        className="CustomAvatar-image overflow-hidden"
                      />
                    </div>
                    )
                }
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
  );
};

export default HeaderProfileUser;
