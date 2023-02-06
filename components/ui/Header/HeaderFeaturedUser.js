import { useState } from 'react';
import { Link } from 'react-router-dom';

import hexagon_background from '../../assets/images/hexagon_background.png';

/* Design */
import { play as playIcon, } from 'ionicons/icons';
import { IonButton, IonIcon, IonModal, IonToast } from '@ionic/react';
import {FaFacebookSquare} from 'react-icons/fa';
import {FaTwitterSquare} from 'react-icons/fa';

/* Images */
import ProfilePlaceholder from '../../assets/images/profile_placeholder.png';
import Gravatar from 'react-gravatar';

/* Redux */
import { useSelector } from 'react-redux';

const HeaderFeaturedUser = ({id, image_profile, username, image_background, gamertag, email, type_users, games}) => {

    /* const users = useSelector((state) => state.allUsers.users);  
    const {} = users */

    return (
        <section className="flex flex-col mx-4 overflow-hidden bg-white lg:flex-row border-none rounded-3xl xs:flex-col-reverse sm:flex-col-reverse">
            <div className="flex justify-end p-8 bg-light lg:py-8 lg:px-16 lg:pl-10 lg:w-1/2 border-none relative">

            <div className="flex flex-wrap mb-4">
                <button
                className="inline-flex items-center justify-center h-12  
                                        px-6 mr-2 mb-2 font-medium tracking-wide transition 
                                        duration-200 bg-primary border-light border-2 border-solid text-dark rounded-full
                                        focus:shadow-outline focus:outline-none absolute top-4 right-4"
                >
                Player
                </button>
            </div>

                <div className="flex flex-col items-start justify-center w-full">
                    <h1 className="xs:mb-2 sm:mb-2 md:mb-2 lg:mb-2 leading-none ">
                        {gamertag}
                    </h1>
                    {username && 
                        <p className="pb-4">@{username}</p>
                    }

                    <div className="flex flex-wrap b-4">
                        {Array.isArray(type_users) && type_users[0] && (
                            <div
                            className="inline-flex items-center justify-center h-8  
                                        px-6 mr-2 mb-2 font-medium tracking-wide transition 
                                        duration-200 bg-gray-300 text-dark rounded-full
                                        focus:shadow-outline focus:outline-none"
                            >
                            {type_users.sort(() => Math.random() - 0.5).slice(0,1).map(type => (type.name))}
                            </div>
                        )}

                        {Array.isArray(games) && games[0] && (
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

                    <div className="flex items-center mb-4">
                                               
                        {/* <div className="text-light">
                            <button type="submit" 
                                className="inline-flex items-center justify-center h-12  
                                px-6 mr-6 font-medium tracking-wide transition 
                                duration-200 bg-dark  rounded-full hover:bg-primary hover:text-dark
                                focus:shadow-outline focus:outline-none">
                                
                                Follow
                            </button>
                        </div> */}
                        <div className="text-light">
                            <Link to={`/user/${username}`}>
                                <button type="submit" 
                                    className="inline-flex items-center justify-center h-12  
                                    px-6 mr-6 font-medium tracking-wide transition 
                                    duration-200 bg-dark  rounded-full hover:bg-primary hover:text-dark
                                    focus:shadow-outline focus:outline-none">
                                    
                                    View profile
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center relative lg:w-1/2 ">
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
                            className="mx-auto bg-cover bg-no-repeat h-32 w-32 image-placeholder rounded-full border-4 border-light absolute"
                            style={{ backgroundImage: `url(${ProfilePlaceholder})` }}
                                alt={`Profile name ${gamertag}`}
                        >
                            {/* Change default to placeholder image */}
                            <Gravatar email={email} size={1600} rating="pg" default="none" className="CustomAvatar-image" />
                            
                        </div>
                    )
                }
                </div>
                
            </div>
        </section>
    )
}

export default HeaderFeaturedUser