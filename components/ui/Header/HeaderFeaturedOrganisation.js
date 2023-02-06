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
import { useDispatch, useSelector } from 'react-redux';


const HeaderFeaturedOrganisation = ({organisation}) => {

    /* const teams = useSelector((state) => state.allTeams.teams); */

    const {name, username, games, members, image_profile} = organisation.attributes

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
                Organisation
                </button>
            </div>
                <div className="flex flex-col items-start justify-center w-full ">
                    <h1 className="xs:mb-2 sm:mb-2 md:mb-2 lg:mb-2 leading-none ">
                        {name}
                    </h1>
                    {username && 
                        <p className="pb-4">@{username}</p>
                    }

                    {games.data[0] && (
                        <div
                        className="inline-flex items-center justify-center h-8  
                                    px-6 mr-2 mb-2 font-medium tracking-wide transition 
                                    duration-200 bg-gray-300 text-dark rounded-full
                                    focus:shadow-outline focus:outline-none"
                        >
                        {games.data.sort(() => Math.random() - 0.5).slice(0,1).map(game => (game.attributes.name))}
                        </div>
                    )}

                    <div className="flex items-center mb-4">
                                               
                        <div className="text-light">
                            <Link to={`/organisation/${username}`}>
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

            <div className="w-full relative flex items-center justify-center lg:py-0 py-10 lg:justify-start bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-700">
                <div className="absolute left-0 w-full h-full overflow-hidden opacity-10">
                    
                </div>
                <div className="relative w-full transform lg:my-4 xl:my-4 mx-12 space-y-6 h-full flex md:px-0 px-10 flex-col items-center justify-center">
                    <ul className="flex items-center justify-center transform space-x-7 xl:space-x-10">
                        
                        {members.data[4] && (
                            <li className="bg-white w-1/5 h-1/5 md:w-32 md:h-32 p-4 sm:p-5 md:p-7 rounded-full flex items-center justify-center shadow-xl">
                                {members.data[4].attributes.image_profile ? (
                                    <div className="mx-auto bg-cover bg-no-repeat image-placeholder rounded-full border-4 border-light absolute
                                    xs:w-12 xs:h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-32 lg:h-32"
                                    style={{
                                        backgroundImage: `url(${members.data[4].attributes.image_profile && members.data[4].attributes.image_profile.data.attributes.url})`
                                        }}
                                        alt={`Profile name ${name}`}
                                >

                                </div>
                                ) : (
                                    <div
                                        className="mx-auto bg-cover bg-no-repeat image-placeholder rounded-full border-4 border-light absolute
                                        xs:w-12 xs:h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-32 lg:h-32"
                                        style={{ backgroundImage: `url(${ProfilePlaceholder})` }}
                                            alt={`Profile name ${name}`}
                                    >
                                    </div>
                                    )
                                }
                            </li>
                        )}

                        {members.data[5] && (
                            <li className="bg-white w-1/5 h-1/5 md:w-32 md:h-32 p-4 sm:p-5 md:p-7 rounded-full flex items-center justify-center shadow-xl">
                                {members.data[5].attributes.image_profile? (
                                    <div className="mx-auto bg-cover bg-no-repeat image-placeholder rounded-full border-4 border-light absolute
                                    xs:w-12 xs:h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-32 lg:h-32"
                                    style={{
                                        backgroundImage: `url(${members.data[5].attributes.image_profile && members.data[5].attributes.image_profile.data.attributes.url})`
                                        }}
                                        alt={`Profile name ${name}`}
                                >

                                </div>
                                ) : (
                                    <div
                                        className="mx-auto bg-cover bg-no-repeat image-placeholder rounded-full border-4 border-light absolute
                                        xs:w-12 xs:h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-32 lg:h-32"
                                        style={{ backgroundImage: `url(${ProfilePlaceholder})` }}
                                            alt={`Profile name ${name}`}
                                    >
                                    </div>
                                    )
                                }
                            </li>
                        )}
                    </ul>
                    <ul className="flex space-x-7 xl:space-x-10">
                        {members.data[0] && (
                            <li className="bg-white w-1/5 h-1/5 md:w-32 md:h-32 p-4 sm:p-5 md:p-7 rounded-full flex items-center justify-center shadow-xl">
                                {members.data[0].attributes.image_profile ? (
                                    <div className="mx-auto bg-cover bg-no-repeat image-placeholder rounded-full border-4 border-light absolute
                                    xs:w-12 xs:h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-32 lg:h-32"
                                    style={{
                                        backgroundImage: `url(${members.data[0].attributes.image_profile && members.data[0].attributes.image_profile.data.attributes.url})`
                                        }}
                                        alt={`Profile name ${name}`}
                                >

                                </div>
                                ) : (
                                    <div
                                        className="mx-auto bg-cover bg-no-repeat image-placeholder rounded-full border-4 border-light absolute
                                        xs:w-12 xs:h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-32 lg:h-32"
                                        style={{ backgroundImage: `url(${ProfilePlaceholder})` }}
                                            alt={`Profile name ${name}`}
                                    >
                                    </div>
                                    )
                                }
                            </li>
                        )}

                        {image_profile && (
                            <li className="bg-white w-1/5 h-1/5 md:w-32 md:h-32 p-4 sm:p-5 md:p-7 rounded-md flex items-center justify-center shadow-xl">
                                {image_profile ? (
                                    <div className="mx-auto bg-cover bg-no-repeat image-placeholder rounded-md border-4 border-primary absolute
                                    xs:w-12 xs:h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-32 lg:h-32"
                                    style={{
                                        backgroundImage: `url(${image_profile && image_profile.data.attributes.url})`
                                        }}
                                        alt={`Profile name ${name}`}
                                >

                                </div>
                                ) : (
                                    <div
                                        className="mx-auto bg-cover bg-no-repeat image-placeholder rounded-md border-4 border-light absolute
                                        xs:w-12 xs:h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-32 lg:h-32"
                                        style={{ backgroundImage: `url(${ProfilePlaceholder})` }}
                                            alt={`Profile name ${name}`}
                                    >
                                    </div>
                                    )
                                }
                            </li>
                        )}

                        {members.data[1] && (
                            <li className="bg-white w-1/5 h-1/5 md:w-32 md:h-32 p-4 sm:p-5 md:p-7 rounded-full flex items-center justify-center shadow-xl">
                                {members.data[1].attributes.image_profile ? (
                                    <div className="mx-auto bg-cover bg-no-repeat image-placeholder rounded-full border-4 border-light absolute
                                    xs:w-12 xs:h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-32 lg:h-32"
                                    style={{
                                        backgroundImage: `url(${members.data[1].attributes.image_profile && members.data[1].attributes.image_profile.data.attributes.url})`
                                        }}
                                        alt={`Profile name ${name}`}
                                >

                                </div>
                                ) : (
                                    <div
                                        className="mx-auto bg-cover bg-no-repeat image-placeholder rounded-full border-4 border-light absolute
                                        xs:w-12 xs:h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-32 lg:h-32"
                                        style={{ backgroundImage: `url(${ProfilePlaceholder})` }}
                                            alt={`Profile name ${name}`}
                                    >
                                    </div>
                                    )
                                }
                            </li>
                        )}
                        {/* <li className="bg-white w-1/5 h-1/5 md:w-32 md:h-32 p-4 sm:p-5 md:p-7 rounded-full flex items-center justify-center shadow-xl">
                            <svg className="w-full h-full" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M16 .396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183.803.151 1.093-.344 1.093-.772 0-.38-.009-1.385-.015-2.719-4.453.964-5.391-2.151-5.391-2.151-.729-1.844-1.781-2.339-1.781-2.339-1.448-.989.115-.968.115-.968 1.604.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328.14-1.031.557-1.74 1.011-2.135-3.552-.401-7.287-1.776-7.287-7.907 0-1.751.62-3.177 1.645-4.297-.177-.401-.719-2.031.141-4.235 0 0 1.339-.427 4.4 1.641a15.436 15.436 0 0 1 4-.541c1.36.009 2.719.187 4 .541 3.043-2.068 4.381-1.641 4.381-1.641.859 2.204.317 3.833.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891.556.479 1.077 1.464 1.077 2.959 0 2.14-.02 3.864-.02 4.385 0 .416.28.916 1.104.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z" className=""></path></svg>
                        </li> */}
                    </ul>
                    <ul className="flex items-center justify-center transform space-x-7 xl:space-x-10">
                        {members.data[2] && (
                            <li className="bg-white w-1/5 h-1/5 md:w-32 md:h-32 p-4 sm:p-5 md:p-7 rounded-full flex items-center justify-center shadow-xl">
                                {members.data[2].attributes.image_profile ? (
                                    <div className="mx-auto bg-cover bg-no-repeat image-placeholder rounded-full border-4 border-light absolute
                                    xs:w-12 xs:h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-32 lg:h-32"
                                    style={{
                                        backgroundImage: `url(${members.data[2].attributes.image_profile && organisation.attributes.members[2].attributes.image_profile.data.attributes.url})`
                                        }}
                                        alt={`Profile name ${organisation.attributes.name}`}
                                >

                                </div>
                                ) : (
                                    <div
                                        className="mx-auto bg-cover bg-no-repeat image-placeholder rounded-full border-4 border-light absolute
                                        xs:w-12 xs:h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-32 lg:h-32"
                                        style={{ backgroundImage: `url(${ProfilePlaceholder})` }}
                                            alt={`Profile name ${organisation.attributes.name}`}
                                    >
                                    </div>
                                    )
                                }
                            </li>
                        )}
                        
                        {organisation.attributes.members[3] && (
                            <li className="bg-white w-1/5 h-1/5 md:w-32 md:h-32 p-4 sm:p-5 md:p-7 rounded-full flex items-center justify-center shadow-xl">
                                {organisation.attributes.members[3].attributes.image_profile ? (
                                    <div className="mx-auto bg-cover bg-no-repeat image-placeholder rounded-full border-4 border-light absolute
                                    xs:w-12 xs:h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-32 lg:h-32"
                                    style={{
                                        backgroundImage: `url(${organisation.attributes.members[3].attributes.image_profile && organisation.attributes.members[3].attributes.image_profile.data.attributes.url})`
                                        }}
                                        alt={`Profile name ${organisation.attributes.name}`}
                                >

                                </div>
                                ) : (
                                    <div
                                        className="mx-auto bg-cover bg-no-repeat image-placeholder rounded-full border-4 border-light absolute
                                        xs:w-12 xs:h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-32 lg:h-32"
                                        style={{ backgroundImage: `url(${ProfilePlaceholder})` }}
                                            alt={`Profile name ${organisation.attributes.name}`}
                                    >
                                    </div>
                                    )
                                }
                            </li>
                        )}

                        {/* <li className="bg-white w-1/5 h-1/5 md:w-32 md:h-32 p-4 sm:p-5 md:p-7 rounded-full flex items-center justify-center shadow-xl">
                            <svg className="w-full h-full p-1 -ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 434.016 434.016" style="enable-background:new 0 0 434.016 434.016" ><path style="fill:#69b4e5" d="M416.049 52.27c-10.508-11.324-25.72-17.356-45.207-17.928-55.02-1.774-93.932 27.496-115.651 86.986a8.833 8.833 0 0 0 1.814 9.041 8.78 8.78 0 0 0 8.812 2.534c6.246-1.718 12.44-2.588 18.412-2.588 8.018 0 18.689 1.474 24.001 8.497 4.077 5.39 4.632 13.472 1.649 24.02-2.518 8.899-15.476 32.721-31.515 57.929-19.539 30.712-30.333 44.48-33.445 44.48-10.31 0-47.565-165.194-48.589-168.817-10.686-37.86-16.05-56.864-50.798-56.864-26.483 0-85.551 48.362-134.051 90.495-2.983 2.591-5.495 4.774-7.44 6.436a11.525 11.525 0 0 0-1.607 15.849l9.038 11.644a11.517 11.517 0 0 0 15.812 2.331l.497-.354c15.691-11.163 30.514-21.706 41.704-22.284 12.16-.597 22.711 18.4 35.29 63.605 23.957 87.803 60.355 192.468 97.709 192.468 39.036 0 85.605-33.091 145.802-111.429 54.482-70.902 83.655-127.135 85.529-168.048 1.407-30.901-4.57-53.78-17.766-68.003z" class=""></path></svg>
                        </li> */}
                    </ul>
                </div>
            </div>




            {/* <div className="flex items-center justify-center relative lg:w-1/2">
                { image_background ? (
                    <img 
                    src={image_background && image_background.url} 
                    alt={`Profile name ${gamertag}`} 
                    className="object-cover w-full lg:absolute h-40 lg:h-full md:h-60"
                    />
                ) : (
                    <img src={hexagon_background} className="object-cover w-full lg:absolute h-40 lg:h-full"/>
                )}
                
                <div className="mx-auto bg-cover bg-no-repeat h-32 w-32 image-placeholder rounded-full absolute">
                    {image_profile ? (
                        <div className="mx-auto bg-cover bg-no-repeat h-32 w-32 image-placeholder rounded-full border-4 border-light absolute"
                        style={{
                            backgroundImage: `url(${image_profile && image_profile.url})`
                            }}
                            alt={`Profile name ${gamertag}`}
                    >

                    </div>
                    ) : (
                        <div
                            className="mx-auto bg-cover bg-no-repeat h-32 w-32 image-placeholder rounded-full border-4 border-light absolute"
                            style={{ backgroundImage: `url(${ProfilePlaceholder})` }}
                                alt={`Profile name ${gamertag}`}
                        >
                            
                            <Gravatar email={email} size={1600} rating="pg" default="none" className="CustomAvatar-image" />
                            
                        </div>
                        )
                    }
                </div>
                
            </div> */}
        </section>

        /*  */

        /* <section className="w-full flex lg:flex-row flex-col h-full bg-white opacity-80">
            <div className="w-full lg:w-7/12 h-full flex flex-col justify-end items-end">
                <div className="py-20 md:py-32 w-full h-full max-w-4xl pr-10 pl-10 md:pl-16 md:pr-0">
                    <p className="text-purple-600 uppercase font-medium">Feature</p>
                    <h1 className="text-5xl sm:text-6xl max-w-lg font-bold mt-4">Integrations You will love.</h1>
                    <p className="text-gray-500 text-lg sm:text-xl md:text-2xl max-w-lg mt-5 leading-normal">We've built integrations with some of your favorite services. Don't see an integration? <a className="text-blue-500 underline">Suggest one here</a>, and we'll take it into consideration.</p>
                    <div className="flex sm:flex-row flex-col sm:space-y-0 space-y-4 sm:space-x-4 mt-8">
                        <a href="#_" className="bg-purple-600 text-white px-8 font-medium cursor-pointer rounded py-4 sm:w-auto w-full text-center">Signup Today</a>
                        <a href="#_" className="px-8 py-4 hover:bg-gray-100 bg-gray-50 text-gray-900 underline sm:w-auto w-full text-center cursor-pointer rounded font-medium">Learn More</a>
                    </div>
                </div>
            </div>
            <div className="w-full lg:w-5/12 relative flex items-center justify-center lg:py-0 py-10 lg:justify-start bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-700">
                <div className="absolute left-0 w-full h-full overflow-hidden opacity-10">
                    
                </div>
                <div className="relative w-full transform lg:ml-20 xl:-ml-20 max-w-2xl space-y-6 h-full flex md:px-0 px-10 flex-col items-center justify-center">
                    <ul className="flex items-center justify-center transform space-x-7 xl:space-x-10">
                        <li className="bg-white w-1/5 h-1/5 md:w-32 md:h-32 p-4 sm:p-5 md:p-7 rounded-full flex items-center justify-center shadow-xl">
                            <svg className="w-full h-full" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path d="M19.712.133a5.381 5.381 0 0 0-5.376 5.387 5.381 5.381 0 0 0 5.376 5.386h5.376V5.52A5.381 5.381 0 0 0 19.712.133m0 14.365H5.376A5.381 5.381 0 0 0 0 19.884a5.381 5.381 0 0 0 5.376 5.387h14.336a5.381 5.381 0 0 0 5.376-5.387 5.381 5.381 0 0 0-5.376-5.386" fill="#36C5F0"></path><path d="M53.76 19.884a5.381 5.381 0 0 0-5.376-5.386 5.381 5.381 0 0 0-5.376 5.386v5.387h5.376a5.381 5.381 0 0 0 5.376-5.387m-14.336 0V5.52A5.381 5.381 0 0 0 34.048.133a5.381 5.381 0 0 0-5.376 5.387v14.364a5.381 5.381 0 0 0 5.376 5.387 5.381 5.381 0 0 0 5.376-5.387" fill="#2EB67D"></path><path d="M34.048 54a5.381 5.381 0 0 0 5.376-5.387 5.381 5.381 0 0 0-5.376-5.386h-5.376v5.386A5.381 5.381 0 0 0 34.048 54m0-14.365h14.336a5.381 5.381 0 0 0 5.376-5.386 5.381 5.381 0 0 0-5.376-5.387H34.048a5.381 5.381 0 0 0-5.376 5.387 5.381 5.381 0 0 0 5.376 5.386" fill="#ECB22E"></path><path d="M0 34.249a5.381 5.381 0 0 0 5.376 5.386 5.381 5.381 0 0 0 5.376-5.386v-5.387H5.376A5.381 5.381 0 0 0 0 34.25m14.336-.001v14.364A5.381 5.381 0 0 0 19.712 54a5.381 5.381 0 0 0 5.376-5.387V34.25a5.381 5.381 0 0 0-5.376-5.387 5.381 5.381 0 0 0-5.376 5.387" fill="#E01E5A" className=""></path></g></svg>
                        </li>
                        <li className="bg-white w-1/5 h-1/5 md:w-32 md:h-32 p-4 sm:p-5 md:p-7 rounded-full flex items-center justify-center shadow-md">
                            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 447.232 447.232" style="enable-background:new 0 0 447.232 447.232" ><path style="fill:#1587ea" d="M207.527 251.676 92.903 177.758a10.272 10.272 0 0 0-12.007.63L3.833 240.403c-5.458 4.392-5.015 12.839.873 16.636l114.624 73.918a10.272 10.272 0 0 0 12.007-.63l77.063-62.014c5.458-4.393 5.015-12.84-.873-16.637zM238.833 268.312l77.063 62.014a10.272 10.272 0 0 0 12.007.63l114.624-73.918c5.888-3.797 6.331-12.244.873-16.636l-77.063-62.014a10.272 10.272 0 0 0-12.007-.63l-114.624 73.918c-5.887 3.797-6.331 12.244-.873 16.636zM208.4 74.196l-77.063-62.014a10.272 10.272 0 0 0-12.007-.63L4.706 85.47c-5.888 3.797-6.331 12.244-.873 16.636l77.063 62.014a10.272 10.272 0 0 0 12.007.63l114.624-73.918c5.888-3.797 6.331-12.244.873-16.636zM442.527 85.47 327.903 11.552a10.272 10.272 0 0 0-12.007.63l-77.063 62.014c-5.458 4.392-5.015 12.839.873 16.636l114.625 73.918a10.272 10.272 0 0 0 12.007-.63l77.063-62.014c5.457-4.393 5.014-12.84-.874-16.636z"></path><path style="fill:#1587ea" d="m218 279.2-86.3 68.841a9.319 9.319 0 0 1-10.861.547L99.568 334.87c-6.201-3.999-14.368.453-14.368 7.831v7.416a9.32 9.32 0 0 0 4.488 7.969l128.481 77.884a9.317 9.317 0 0 0 9.661 0l128.481-77.884a9.319 9.319 0 0 0 4.488-7.969v-6.619c0-7.378-8.168-11.83-14.368-7.831l-20.024 12.913a9.318 9.318 0 0 1-10.876-.559l-85.893-68.809A9.32 9.32 0 0 0 218 279.2z"></path></svg>
                        </li>
                        <li className="bg-white w-1/5 h-1/5 md:w-32 md:h-32 p-4 sm:p-5 md:p-7 rounded-full flex items-center justify-center shadow-xl">
                            <svg className="w-full h-full" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z"></path><path fill="#34A853" d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987Z"></path><path fill="#4A90E2" d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21Z"></path><path fill="#FBBC05" d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067Z"></path></svg>
                        </li>
                    </ul>
                    <ul className="flex space-x-7 xl:space-x-10">
                        <li className="bg-white w-1/5 h-1/5 md:w-32 md:h-32 p-4 sm:p-5 md:p-7 rounded-full flex items-center justify-center shadow-xl">
                            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.002 512.002" style="enable-background:new 0 0 512.002 512.002" ><path style="fill:#73a1fb" d="M500.398 94.784a194.219 194.219 0 0 1-24.763 9.023 109.468 109.468 0 0 0 22.287-39.193 8.258 8.258 0 0 0-12.078-9.619c-17.945 10.643-37.305 18.292-57.605 22.764-20.449-19.981-48.222-31.353-76.934-31.353-60.606 0-109.913 49.306-109.913 109.91 0 4.773.302 9.52.9 14.201-75.206-6.603-145.124-43.568-193.136-102.463a8.259 8.259 0 0 0-13.537 1.061c-9.738 16.709-14.886 35.82-14.886 55.265 0 26.484 9.455 51.611 26.158 71.246a93.118 93.118 0 0 1-14.711-6.568 8.26 8.26 0 0 0-12.267 7.03c-.012.487-.012.974-.012 1.468 0 39.531 21.276 75.122 53.805 94.52a94.762 94.762 0 0 1-8.362-1.214 8.254 8.254 0 0 0-7.731 2.638 8.25 8.25 0 0 0-1.681 7.994c12.04 37.591 43.039 65.24 80.514 73.67-31.082 19.468-66.626 29.665-103.939 29.665-7.786 0-15.616-.457-23.279-1.364A8.258 8.258 0 0 0 3.8 418.617c47.935 30.735 103.361 46.98 160.284 46.98 111.903 0 181.907-52.769 220.926-97.037 48.657-55.199 76.562-128.261 76.562-200.451 0-3.016-.046-6.061-.139-9.097 19.197-14.463 35.724-31.967 49.173-52.085a8.256 8.256 0 0 0-.545-9.906 8.245 8.245 0 0 0-9.663-2.237z" className=""></path></svg>
                        </li>
                        <li className="bg-white w-1/5 h-1/5 md:w-32 md:h-32 p-4 sm:p-5 md:p-7 rounded-full flex items-center justify-center shadow-xl">
                            <svg className="w-full h-full" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><path d="M128.08 0c7.231.013 14.343.624 21.256 1.78V76.3l52.831-52.696a128.425 128.425 0 0 1 16.34 13.789 128.468 128.468 0 0 1 13.84 16.312L179.513 106.4h74.715A127.58 127.58 0 0 1 256 127.587v.173c0 7.226-.613 14.306-1.772 21.2H179.5l52.847 52.682a129.615 129.615 0 0 1-13.824 16.312h-.015a128.254 128.254 0 0 1-16.326 13.789l-52.846-52.696v74.52a130.321 130.321 0 0 1-21.243 1.781h-.186a130.26 130.26 0 0 1-21.23-1.78v-74.52l-52.831 52.695a128.401 128.401 0 0 1-30.18-30.1L76.5 148.96H1.785A126.984 126.984 0 0 1 0 127.72v-.371c.012-1.875.135-4.166.311-6.536l.055-.713c.522-6.671 1.419-13.7 1.419-13.7H76.5L23.666 53.705a126.265 126.265 0 0 1 13.81-16.286l.026-.026a127.746 127.746 0 0 1 16.344-13.789L106.677 76.3V1.78A130.278 130.278 0 0 1 127.933 0h.147Zm-.013 95.76h-.122c-9.509 0-18.616 1.74-27.034 4.902a76.662 76.662 0 0 0-4.915 26.952v.12a76.383 76.383 0 0 0 4.927 26.951 76.608 76.608 0 0 0 27.022 4.902h.122c9.51 0 18.617-1.74 27.022-4.902a76.146 76.146 0 0 0 4.915-26.952v-.12c0-9.484-1.747-18.57-4.915-26.951a76.614 76.614 0 0 0-27.022-4.902Z" fill="#FF4A00" className=""></path></svg>
                        </li>
                        <li className="bg-white w-1/5 h-1/5 md:w-32 md:h-32 p-4 sm:p-5 md:p-7 rounded-full flex items-center justify-center shadow-xl">
                            <svg className="w-full h-full fill-current text-blue-600" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M5.438 30.113h4.606v-4.6H5.438zm-3.851-8.45v3.85h3.85v-3.85zm29.138-10.607c-1.438-4.637-5.15-8.331-9.788-9.787C10.306-2.05.499 5.856.499 15.994h5.988c0-6.362 6.312-11.281 13.006-8.856a8.968 8.968 0 0 1 5.363 5.356c2.444 6.688-2.481 12.988-8.837 13v.019H16v5.988c10.163 0 18.05-9.8 14.725-20.444zM16.019 25.494v-5.956h-5.975v5.975H16v-.019z" className=""></path></svg>
                        </li>
                        <li className="bg-white w-1/5 h-1/5 md:w-32 md:h-32 p-4 sm:p-5 md:p-7 rounded-full flex items-center justify-center shadow-xl">
                            <svg className="w-full h-full" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M16 .396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183.803.151 1.093-.344 1.093-.772 0-.38-.009-1.385-.015-2.719-4.453.964-5.391-2.151-5.391-2.151-.729-1.844-1.781-2.339-1.781-2.339-1.448-.989.115-.968.115-.968 1.604.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328.14-1.031.557-1.74 1.011-2.135-3.552-.401-7.287-1.776-7.287-7.907 0-1.751.62-3.177 1.645-4.297-.177-.401-.719-2.031.141-4.235 0 0 1.339-.427 4.4 1.641a15.436 15.436 0 0 1 4-.541c1.36.009 2.719.187 4 .541 3.043-2.068 4.381-1.641 4.381-1.641.859 2.204.317 3.833.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891.556.479 1.077 1.464 1.077 2.959 0 2.14-.02 3.864-.02 4.385 0 .416.28.916 1.104.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z" className=""></path></svg>
                        </li>
                    </ul>
                    <ul className="flex items-center justify-center transform space-x-7 xl:space-x-10">
                        <li className="bg-white w-1/5 h-1/5 md:w-32 md:h-32 p-4 sm:p-5 md:p-7 rounded-full flex items-center justify-center shadow-xl">
                            <svg className="w-full h-full -mt-2" viewBox="0 0 412 412" xmlns="http://www.w3.org/2000/svg"><g fill-rule="nonzero" fill="none"><path d="M281 296c11-26-4-38-19-38l-148-2c-4 0-4-6 1-7l150-2c17-1 37-15 43-33 0 0 10-21 9-24-8.9-42.943-45.506-74.572-89.285-77.147-43.78-2.575-83.842 24.544-97.715 66.147-38-25-78 9-69 46-48 3-65 46-60 72 0 1 1 2 3 2h274c1 0 3-1 3-3Z" fill="#F38020"></path><path d="M331 194c-4 0-6-1-7 1l-5 21c-5 16 3 30 20 31l32 2c4 0 4 6-1 7l-33 1c-36 4-46 39-46 39 0 2 0 3 2 3h113l3-2a81 81 0 0 0-78-103" fill="#FAAE40"></path></g></svg>
                        </li>
                        <li className="bg-white w-1/5 h-1/5 md:w-32 md:h-32 p-7 md:p-10 rounded-full flex items-center justify-center shadow-xl">
                            <svg className="w-full h-full" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M10 9V0h12v9zm12 5h10v18H0V14h10v9h12z"></path></svg>
                        </li>
                        <li className="bg-white w-1/5 h-1/5 md:w-32 md:h-32 p-4 sm:p-5 md:p-7 rounded-full flex items-center justify-center shadow-xl">
                            <svg className="w-full h-full p-1 -ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 434.016 434.016" style="enable-background:new 0 0 434.016 434.016" ><path style="fill:#69b4e5" d="M416.049 52.27c-10.508-11.324-25.72-17.356-45.207-17.928-55.02-1.774-93.932 27.496-115.651 86.986a8.833 8.833 0 0 0 1.814 9.041 8.78 8.78 0 0 0 8.812 2.534c6.246-1.718 12.44-2.588 18.412-2.588 8.018 0 18.689 1.474 24.001 8.497 4.077 5.39 4.632 13.472 1.649 24.02-2.518 8.899-15.476 32.721-31.515 57.929-19.539 30.712-30.333 44.48-33.445 44.48-10.31 0-47.565-165.194-48.589-168.817-10.686-37.86-16.05-56.864-50.798-56.864-26.483 0-85.551 48.362-134.051 90.495-2.983 2.591-5.495 4.774-7.44 6.436a11.525 11.525 0 0 0-1.607 15.849l9.038 11.644a11.517 11.517 0 0 0 15.812 2.331l.497-.354c15.691-11.163 30.514-21.706 41.704-22.284 12.16-.597 22.711 18.4 35.29 63.605 23.957 87.803 60.355 192.468 97.709 192.468 39.036 0 85.605-33.091 145.802-111.429 54.482-70.902 83.655-127.135 85.529-168.048 1.407-30.901-4.57-53.78-17.766-68.003z" class=""></path></svg>
                        </li>
                    </ul>
                </div>
            </div>
        </section> */
    )
}

export default HeaderFeaturedOrganisation