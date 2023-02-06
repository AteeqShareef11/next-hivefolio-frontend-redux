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

/* Components */

/* User */
import { callApi } from '../../utils/utils';
import { useCurrentUser } from '../../context/AuthContext';
import { FollowsUsersContext } from '../../context/FollowsUsersContext';

/* Redux */
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserId } from '../../redux/actions/userActions';

const HeaderProfileOrganisationOnboarding = ({style1}) => {
  const user = useCurrentUser();

  const dispatch = useDispatch();

  const loggedInUser = useSelector(state => state.user);
  const organisation = useSelector(state => state.organisation);

  const {
    id,
    image_profile,
    image_background,
    username,
    name,
    gamertag,
    tagline,
    email,
    games,
    claim_profile,
    type_user,
    type_organisation,
    featured_profile,
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
  } = organisation

  /* useEffect(() => {

    dispatch(fetchUserId(id));
        if(loggedInUser.id === undefined) {
        dispatch(fetchUserId(id));
    }

}, [user]); */

  return (
    <section className="flex flex-col mx-4 overflow-hidden bg-white mt-6 border-none rounded-3xl ">
      
      <div className="flex items-center w-full justify-center">
        { image_background ? (
            <img 
            src={image_background.url} 
            alt={`Profile name ${name}`} 
            className="object-cover w-full h-40 lg:h-full md:h-60 rounded-md"
            />
            ) : (
                <img src={hexagon_background} className="object-cover w-full h-40 lg:h-full md:h-60 rounded-md"/>
            )}
            
            <div className="mx-auto bg-cover bg-no-repeat h-32 w-32 image-placeholder rounded-full absolute bg-white">
              {image_profile && (
                <div className="mx-auto bg-cover bg-no-repeat h-32 w-32 image-placeholder rounded-full border-4 border-light absolute"
                style={{
                    backgroundImage: `url(${image_profile && image_profile.url})`
                    }}
                    alt={`Profile name ${name}`}
                >
                </div>
                )
            }
            </div>

        </div>

      <div className={style1}>
        <div className="flex flex-col items-start w-full ">
          <div className="mb-2 leading-none items-start">
            <h1 className="mb-2">{name}</h1>
            {username && <h5>@{username}</h5>}
          </div>

          <div className="flex flex-wrap b-4">
          {type_organisation && (
            <div
              className="inline-flex items-center justify-center h-8  
                          px-6 mr-2 mb-2 font-medium tracking-wide transition 
                          duration-200 bg-gray-300 text-dark rounded-full
                          focus:shadow-outline focus:outline-none"
            >
              {type_organisation.sort(() => Math.random() - 0.5).slice(0,1).map(type => (type.name))}
            </div>
          )}

          {games[0] && (
            <div
              className="inline-flex items-center justify-center h-8  
                          px-6 mr-2 mb-2 font-medium tracking-wide transition 
                          duration-200 bg-gray-300 text-dark rounded-full
                          focus:shadow-outline focus:outline-none"
            >
              {games.sort(() => Math.random() - 0.5).slice(0,1).map(game => (game.name))}
            </div>
          )}
          </div>

          
        </div>
      </div>
    </section>
  );
};

export default HeaderProfileOrganisationOnboarding;
