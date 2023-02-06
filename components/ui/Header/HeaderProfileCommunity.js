import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

import hexagon_background from '../../assets/images/hexagon_background.png';

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
import { FollowsCommunitiesContext } from '../../context/FollowsCommunitiesContext';

/* Redux */
import { useSelector } from 'react-redux';

const HeaderProfileCommunity = ({ }) => {

  const user = useCurrentUser();

  const selectedProfileCommunity = useSelector(state => state.community.data);

  const id=selectedProfileCommunity!==undefined &&selectedProfileCommunity.id;
  // const {
  //   name,
  //   admins,
  //   members,
  //   username,
  //   users,
  //   community,
  //   type_community,
  //   games,
  //   image_profile,
  //   image_background,
  //   tagline,
  //   facebook,
  //   twitter,
  //   instagram,
  //   twitch,
  //   tiktok,
  //   youtube,
  //   discord,
  //   linkedin,
  //   xbox,
  //   playstation,
  //   nintendo,
  //   steam,
  //   epic,
  //   website,
  //   store,
  //   verified_profile
  // } =  selectedProfileCommunity;

// console.log("selectedProfileCommunity---------------->",selectedProfileCommunity);

  const [community1, setCommunity1] = useState(null);
  const [membersData, setMembersData] = useState({});
  const [openCommunity, setOpenCommunity] = useState();
  const [error, setError] = useState('');
  const { followsGiven, reloader } = useContext(FollowsCommunitiesContext);

  /* Remove http Links */
  const RemoveHTTP = (socialLink) => {
    return socialLink.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "");
  }

  const fetchCommunity = async () => {
    try {
      const communityRes = await fetch(`https://hivefolio.herokuapp.com/api/communities/${id}?populate=*`);
      const communityData = await communityRes.json();
      /* const communityOpen = await communityData.boolean_open_community; */
// console.log("communityData----------->",communityData)
      setCommunity1(communityData.data);
      setOpenCommunity(communityData.data.attributes.boolean_open_community)
    } catch (err) {
      console.error(err);
    }
  };
  // console.log("community1----------->",community1)
  const isCommunityAlreadyFollowed = () => {
    return (
      followsGiven &&
      community1!==null &&
      user &&
      community1.attributes.followcommunity_events!==undefined && community1.attributes.followcommunity_events.data!==null&&
      community1.attributes.followcommunity_events.data.length > 0 &&
      community1.attributes.followcommunity_events.data[0].attributes.user === user.id
    );
  };

  //Handle follow
  const handleFollow = async () => {
    try {
      const response = await callApi({
        path: '/followcommunities',
        method: 'POST',
        body: {
          community: id,
        },
      });
      fetchCommunity();
      reloader();
    } catch (err) {
      console.log('Exception ', err);
    }
  };

  //Handle remove follow
  const handleRemoveFollow = async () => {
    try {
      const response = await callApi({
        path: `/followcommunities/${id}`,
        method: 'DELETE',
      });
      fetchCommunity();
      reloader();
    } catch (err) {
      console.log('Exception ', err);
    }
  };

  // Used for the edit form

  

  useEffect(() => {
    fetchCommunity();
  }, []);

  useEffect(() => {
    Axios.get(`https://hivefolio.herokuapp.com/api/communities/${id}?populate=*`)
      .then(data => {
        // console.log("setMembersData----------->",data)
        setMembersData(data.data.attributes.members);
        console.log("data.data.members", data.data.attributes.members)
      })
      .catch(err => {
        console.log('ERR: ', err);
      });
  }, []);
  // console.log("membersData----------->",membersData)
  /* Is admin */
  const adminId = selectedProfileCommunity.attributes.admins!==undefined&& selectedProfileCommunity.attributes.admins.data!==null && selectedProfileCommunity.attributes.admins.data.find((person) => {
    return person.id === user.id;
  })

  /* Is member */
  const isMember = selectedProfileCommunity.attributes.members!==undefined&& selectedProfileCommunity.attributes.members.data!==null &&selectedProfileCommunity.attributes.members.data.find((person) => {
    return person.id === user.id;
  })

  /* Open Community is true */
  const communityIsOpen = openCommunity === true;
  

  console.log("+++communityIsOpen", communityIsOpen)

  /* Add user */
  const handleAddUser = async id => {
    event.preventDefault();

    /* if (user === community.members) {
      setError('Please sign in first');
      return;
    } */

    console.log('id', id);
    console.log('User', selectedProfileCommunity.attributes.users);
    console.log('Before issue', membersData);

    // first get the user object from users prop
    const newUser = selectedProfileCommunity.attributes.users!==undefined&& selectedProfileCommunity.attributes.users.data!==null &&selectedProfileCommunity.attributes.users.data.find(x => x.id == user.id);

    if (newUser) {
      // add it to members
      membersData!==undefined && membersData.data!==null & membersData.data.push(newUser.id);

      console.log('*****', membersData);

      let newMember = {
        members: membersData!==undefined && membersData.data!==null & membersData.data,
      };

      var config = {
        method: 'PUT',
        /* url: callApi({ path: `/communities/${id}`}), */
        url: `https://hivefolio.herokuapp.com/api/communities/${id}?populate=*`,
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        data: newMember,
      };
      Axios(config)
        .then(response => {
          console.log('RESP: ', response.data);
        })
        .catch(err => {
          console.log('ERR: ', err.response.data);
        });
    }
    /* window.location.reload(); */
  };

  /* Remover member */
  const handleRemoveUser = async event => {
    event.preventDefault();

    // Searches through the community member list for a matching member id
    const existingUser = selectedProfileCommunity.attributes.community['members'].find(x => x.id == user.id);

    if (existingUser) {
      var config = {
        method: 'PUT',
        url: `https://hivefolio.herokuapp.com/api/communities/${id}?populate=*`,
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        data: {
          ...selectedProfileCommunity.attributes.community,
          members: selectedProfileCommunity.attributes.community.data.attributes.members.data.filter(item => item.id !== user.id).map(item => item.id),
        },
      };
      Axios(config)
        .then(response => {
          console.log('RESP: ', response.data);
          /* window.location.reload(); */
        })
        .catch(err => {
          console.log('ERR: ', err.response.data);
        });
    }
  };


  return (
    <section className="flex xs:flex-col-reverse mx-4 overflow-hidden bg-white lg:flex-row mt-6 border-none rounded-3xl ">
      <div className="flex justify-end p-8 bg-light lg:py-20 lg:px-16 lg:pl-10 lg:w-1/2 border-none">
        <div className="flex flex-col items-start justify-center w-full ">
          <div className="mb-2 leading-none">
            <h1 className="mb-2">{selectedProfileCommunity.attributes.name}</h1>
            {selectedProfileCommunity.attributes.username && <h5>@{selectedProfileCommunity.attributes.username}</h5>}
          </div>

          <div className="flex flex-wrap b-4">
          {selectedProfileCommunity.attributes.type_community!==undefined&& selectedProfileCommunity.attributes.type_community.data!==null &&selectedProfileCommunity.attributes.type_community.data[0] ? (
            <div
              className="inline-flex items-center justify-center h-8  
                          px-6 mr-2 mb-2 font-medium tracking-wide transition 
                          duration-200 bg-gray-300 text-dark rounded-full
                          focus:shadow-outline focus:outline-none"
            >
              {selectedProfileCommunity.attributes.type_community!==undefined&& selectedProfileCommunity.attributes.type_community.data!==null &&selectedProfileCommunity.attributes.type_community.data.sort(() => Math.random() - 0.5).slice(0,1).map(type => (type.attributes.name))}
            </div>
          ) : (
            <div>
            {adminId && (
                <Link
                to={`/community/${id}/edit`}
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

          {selectedProfileCommunity.attributes.games!==undefined&& selectedProfileCommunity.attributes.games.data!==null &&selectedProfileCommunity.attributes.games.data[0] ? (
            <div
              className="inline-flex items-center justify-center h-8  
                          px-6 mr-2 mb-2 font-medium tracking-wide transition 
                          duration-200 bg-gray-300 text-dark rounded-full
                          focus:shadow-outline focus:outline-none"
            >
              {selectedProfileCommunity.attributes.games.data.sort(() => Math.random() - 0.5).slice(0,1).map(game => (game.attributes.name))}
            </div>
          ) : (
            <div>
            {adminId && (
                <Link
                  to={`/community/${id}/edit`}
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

          {/* {!tagline ? <></> : <p className="mb-5 ">{tagline}</p>} */}

          {/* Social */}

          <div className="flex flex-wrap b-4">

          {(!selectedProfileCommunity.attributes.facebook && !selectedProfileCommunity.attributes.twitter && !selectedProfileCommunity.attributes.instagram && !selectedProfileCommunity.attributes.twitch && !selectedProfileCommunity.attributes.tiktok && !selectedProfileCommunity.attributes.youtube && !selectedProfileCommunity.attributes.discord && !selectedProfileCommunity.attributes.linkedin && !selectedProfileCommunity.attributes.xbox && !selectedProfileCommunity.attributes.playstation && !selectedProfileCommunity.attributes.nintendo && !selectedProfileCommunity.attributes.steam && !selectedProfileCommunity.attributes.epic && !selectedProfileCommunity.attributes.website && !selectedProfileCommunity.attributes.store) && adminId ? (
              <Link
                to={`/community/${id}/edit-social`}
                className="inline-flex items-center justify-center h-12  
                              px-4 mr-2 mb-2 font-medium tracking-wide transition 
                              duration-200 bg-dark text-light rounded-full hover:bg-primary hover:text-dark
                              focus:shadow-outline focus:outline-none"
              >
                Add social links
              </Link>
            ) : (
              <div className='flex flex-wrap'>
            {selectedProfileCommunity.attributes.facebook ? (
              <a href={(`https://${RemoveHTTP(selectedProfileCommunity.attributes.facebook)}`)} target="_blank">
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

            {selectedProfileCommunity.attributes.twitter ? (
              <a href={(`https://${RemoveHTTP(selectedProfileCommunity.attributes.twitter)}`)} target="_blank">
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

            {selectedProfileCommunity.attributes.instagram ? (
              <a href={(`https://${RemoveHTTP(selectedProfileCommunity.attributes.instagram)}`)} target="_blank">
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

            {selectedProfileCommunity.attributes.twitch ? (
              <a href={(`https://${RemoveHTTP(selectedProfileCommunity.attributes.twitch)}`)} target="_blank">
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

            {selectedProfileCommunity.attributes.tiktok ? (
              <a href={(`https://${RemoveHTTP(selectedProfileCommunity.attributes.tiktok)}`)} target="_blank">
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

            {selectedProfileCommunity.attributes.youtube ? (
              <a href={(`https://${RemoveHTTP(selectedProfileCommunity.attributes.youtube)}`)} target="_blank">
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

            {selectedProfileCommunity.attributes.discord ? (
              <a href={(`https://${RemoveHTTP(selectedProfileCommunity.attributes.discord)}`)} target="_blank">
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

            {selectedProfileCommunity.attributes.linkedin ? (
              <a href={(`https://${RemoveHTTP(selectedProfileCommunity.attributes.linkedin)}`)} target="_blank">
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

            {selectedProfileCommunity.attributes.xbox ? (
              <a href={(`https://${RemoveHTTP(selectedProfileCommunity.attributes.xbox)}`)} target="_blank">
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

            {selectedProfileCommunity.attributes.playstation ? (
              <a href={(`https://${RemoveHTTP(selectedProfileCommunity.attributes.playstation)}`)} target="_blank">
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

            {selectedProfileCommunity.attributes.nintendo ? (
              <a href={(`https://${RemoveHTTP(selectedProfileCommunity.attributes.nintendo)}`)} target="_blank">
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

            {selectedProfileCommunity.attributes.steam ? (
              <a href={(`https://${RemoveHTTP(selectedProfileCommunity.attributes.steam)}`)} target="_blank">
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

            {selectedProfileCommunity.attributes.epic ? (
              <a href={(`https://${RemoveHTTP(selectedProfileCommunity.attributes.epic)}`)} target="_blank">
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

            {selectedProfileCommunity.attributes.website ? (
              <a href={(`https://${RemoveHTTP(selectedProfileCommunity.attributes.website)}`)} target="_blank">
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

            {selectedProfileCommunity.attributes.store ? (
              <a href={(`https://${RemoveHTTP(selectedProfileCommunity.attributes.store)}`)} target="_blank">
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
          <div className="flex flex-wrap mb-4">
            {adminId && (
              <Link
                to={`/community/${id}/edit`}
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
                {isCommunityAlreadyFollowed() && (
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
                {!isCommunityAlreadyFollowed() && (
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

          {(!adminId && communityIsOpen) && (
            <div>
            
            {!isMember ? (
              <button
                type="button"
                className="inline-flex items-center justify-center h-12  
                            px-6 mr-2 font-medium tracking-wide transition 
                            duration-200 bg-primary text-dark rounded-full hover:bg-dark hover:text-light
                            focus:shadow-outline focus:outline-none"
                onClick={() => {
                  handleAddUser(id);
                  handleFollow();
                  /* setShowToast1(true); */
                }}
              >
                {error && <p>{error}</p>}
                Join community
              </button>
            ) : (
              <button
                type="button"
                className="inline-flex items-center justify-center h-12  
                            px-6 mr-2 font-medium tracking-wide transition 
                            duration-200 bg-red-500 text-light rounded-full hover:bg-primary hover:text-dark
                            focus:shadow-outline focus:outline-none"
                onClick={handleRemoveUser}
              >
                {error && <p>{error}</p>}
                Leave community
              </button>
            )}
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center justify-center relative lg:w-1/2">
        {selectedProfileCommunity.attributes.image_background && selectedProfileCommunity.attributes.image_background.data!==null ? (
          <img
            src={selectedProfileCommunity.attributes.image_background && selectedProfileCommunity.attributes.image_background.data.attributes.url}
            alt={`Profile name ${selectedProfileCommunity.attributes.name}`}
            className="object-cover w-full lg:absolute h-40 lg:h-full md:h-60"
          />
        ) : (
          <img
            src={hexagon_background}
            className="object-cover w-full lg:absolute h-40 lg:h-full"
          />
        )}

        <div className="mx-auto bg-cover bg-no-repeat h-32 w-32 image-placeholder rounded-full absolute">
          {selectedProfileCommunity.attributes.image_profile &&selectedProfileCommunity.attributes.image_profile.data!=null ? (
            <div
              className="mx-auto bg-cover bg-no-repeat h-32 w-32 image-placeholder rounded-full border-4 border-light absolute"
              style={{
                backgroundImage: `url(${selectedProfileCommunity.attributes.image_profile && selectedProfileCommunity.attributes.image_profile.data.attributes.url})`,
              }}
              alt={`Profile name ${selectedProfileCommunity.attributes.name}`}
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
              className="mx-auto bg-cover bg-no-repeat h-32 w-32 image-placeholder rounded-full border-4 border-light absolute"
              style={{ backgroundImage: `url(${ProfilePlaceholder})` }}
              alt={`Profile name ${selectedProfileCommunity.attributes.name}`}
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
        {selectedProfileCommunity.attributes.verified_profile && (
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

export default HeaderProfileCommunity;
