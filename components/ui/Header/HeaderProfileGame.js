import { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationIcon } from '@heroicons/react/outline';

import hexagon_background from '../../assets/images/hexagon_background.png';

/* Design */
import { play as playIcon } from 'ionicons/icons';
import { IonButton, IonIcon, IonInput, IonItem, IonLabel, IonModal, IonToast } from '@ionic/react';
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

/* User */
import { callApi } from '../../utils/utils';
import { useCurrentUser } from '../../context/AuthContext';

/* Follow */
import { FollowsGamesContext } from '../../context/FollowsGamesContext';

const HeaderProfileUser = ({
  id,
  image_profile,
  image_background,
  username,
  name,
  introduction,
  tagline,
  type_game,
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
}) => {
  const user = useCurrentUser();

  /* Remove http Links */
  const RemoveHTTP = (socialLink) => {
    return socialLink.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "");
  }

  const [game1, setGame1] = useState({});
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [showToast1, setShowToast1] = useState(false);
  const cancelButtonRef = useRef();
  const [showModal, setShowModal] = useState(false);

  const { followsGiven, reloader } = useContext(FollowsGamesContext);

  const isGameAlreadyFollowed = () => {
    return (
      followsGiven &&
      game1 &&
      user &&
      game1.followgame_events &&
      game1.followgame_events.length > 0 &&
      game1.followgame_events[0].user === user.id
    );
  };

  //Handle follow
  const handleFollow = async () => {
    try {
      const response = await callApi({
        path: '/followgames',
        method: 'POST',
        body: {
          game: id,
        },
      });
      fetchGame();
      reloader();
    } catch (err) {
      console.log('Exception ', err);
    }
  };

  //Handle remove follow
  const handleRemoveFollow = async () => {
    try {
      const response = await callApi({
        path: `/followgames/${id}`,
        method: 'DELETE',
      });
      fetchGame();
      reloader();
    } catch (err) {
      console.log('Exception ', err);
    }
  };

  // Used for the edit form

  const fetchGame = async () => {
    try {
      const res = await fetch(`https://hivefolio.herokuapp.com/api/games/${id}`);
      const data = await res.json();

      setGame1(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchGame();
  }, []);

  return (
    <section className="flex flex-col xs:flex-col-reverse mx-4 overflow-hidden bg-white lg:flex-row mt-6 border-none rounded-3xl ">
      <div className="flex justify-end p-8 bg-light lg:py-20 lg:px-16 lg:pl-10 lg:w-1/2 border-none">
        <div className="flex flex-col items-start justify-center w-full ">
          <div className="mb-2 leading-none">
            <h1 className="mb-2">{name}</h1>
            {username && <h5>@{username}</h5>}
          </div>

          <div className="flex flex-wrap b-4">
          {type_game && (
            <div
              className="inline-flex items-center justify-center h-8  
                          px-6 mr-2 mb-2 font-medium tracking-wide transition 
                          duration-200 bg-gray-300 text-dark rounded-full
                          focus:shadow-outline focus:outline-none"
            >
              {type_game.sort(() => Math.random() - 0.5).slice(0,1).map(type => (type.name))}
            </div>
          )}
          </div>

          {!tagline ? <></> : <p className="mb-4">{tagline}</p>}

          {/* Social */}

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
              <a href={(`https://${RemoveHTTP(discord)}`)} target="_blank">
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
              <a href={(`https://${RemoveHTTP(facebook)}`)} target="_blank">
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

            {/* Social End */}
          </div>

          <div className="flex flex-wrap">
            {/* Follow */}

            {user && (
              <>
                {isGameAlreadyFollowed() && (
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
                {!isGameAlreadyFollowed() && (
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

            {/* Buy game modal button */}
            {/* <div
              class="inline-flex items-center justify-center h-12  
              px-6 mr-2 font-medium tracking-wide transition 
              duration-200 bg-primary text-dark rounded-full hover:bg-dark hover:text-light
              focus:shadow-outline focus:outline-none"
              onClick={() => setShowModal(true)}
            >
              Buy game
            </div> */}
          </div>
        </div>
      </div>
      <div className="flex sm:flex-row-reverse items-center justify-center relative lg:w-1/2">
        {image_background ? (
          <img
            src={image_background && image_background.url}
            alt={`Profile name ${name}`}
            className="object-cover w-full lg:absolute xs:h-48 md:h-52 lg:h-full"
          />
        ) : (
          <img
            src={hexagon_background}
            className="object-cover w-full lg:absolute xs:h-48 md:h-52 lg:h-full"
          />
        )}

        {/* <button
          className="inline-flex items-center justify-center h-12  
                    px-4  font-medium tracking-wide transition 
                    duration-200 bg-light text-dark border-dark border-2 border-solid rounded-full hover:bg-primary hover:text-dark
                    focus:shadow-outline focus:outline-none absolute top-4 right-4"
        >
          Share
        </button> */}

        <div className="mx-auto bg-cover bg-no-repeat h-44 w-32 image-placeholder rounded-3xl absolute">
          <div
            className="mx-auto bg-cover bg-no-repeat h-44 w-32 image-placeholder rounded-3xl border-4 border-light absolute"
            style={{
              backgroundImage: `url(${image_profile})`,
            }}
            alt={`Profile name ${name}`}
          >
          </div>
        </div>
      </div>

      {/* Model */}

      <IonModal
        isOpen={showModal}
        swipeToClose={true}
        onDidDismiss={() => setShowModal(false)}>

        <div className="sm:items-start m-8">
          <div className="sm:flex">
          <div className="mx-auto flex-shrink-0 flex items-center justify-center mt-2 h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <ExclamationIcon
              className="h-6 w-6 text-red-600"
              aria-hidden="true"
            />
          </div>
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left mb-4 w-full">
            <div className="mt-2">
                {/* <h3>{gamertag}</h3> */}

                <ul className="mt-2 divide-y divide-gray-200">
                  <li className="py-4 flex items-center justify-between">
                    <div className="flex flex-col">
                      <p
                        className="text-sm font-medium text-gray-900"
                        id="privacy-option-1-label"
                      >
                        Playstation
                      </p>
                      <p className="text-sm text-gray-500" id="privacy-option-1-description">
                        Nulla amet tempus sit accumsan. Aliquet turpis sed sit lacinia.
                      </p>
                    </div>
                    {/* <!-- Enabled: "bg-teal-500", Not Enabled: "bg-gray-200" --> */}
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                      /* onClick={handleAddAdmin} */
                    >
                      {error && <p>{error}</p>}
                      Add to admin
                    </button>
                  </li>

                  <li className="py-4 flex items-center justify-between">
                    <div className="flex flex-col">
                      <p
                        className="text-sm font-medium text-gray-900"
                        id="privacy-option-1-label"
                      >
                        Xbox
                      </p>
                      <p className="text-sm text-gray-500" id="privacy-option-1-description">
                        Nulla amet tempus sit accumsan. Aliquet turpis sed sit lacinia.
                      </p>
                    </div>
                    {/* <!-- Enabled: "bg-teal-500", Not Enabled: "bg-gray-200" --> */}
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                      /* onClick={handleRemoveUser} */
                    >
                      {error && <p>{error}</p>}
                      Add to coach
                    </button>
                  </li>
                </ul>
                <br />
                <p className="text-sm text-gray-500">
                  Are you sure you want to deactivate your account? All of your data will be
                  permanently removed from our servers forever. This action cannot be undone.
                </p>
              </div>
          </div>
          </div>
        </div>
        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <IonToast
            isOpen={showToast1}
            onDidDismiss={() => setShowToast1(false)}
            message={`Your account ${user.username} has been deleted`}
            duration={1000}
          />
        </div>
          
        <IonButton onClick={() => setShowModal(false)}>Close Modal</IonButton>
      </IonModal>


    </section>
  );
};

export default HeaderProfileUser;
