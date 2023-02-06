import { useEffect, useState } from 'react';
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


const HeaderShowcaseOrganisations = () => {

    /* Redux */
    const dispatch = useDispatch();


    const organisations = useSelector((state) => state.allData.organisations);

console.log("organisations",organisations)
    return (

        <div className='py-12 bg-light'>

            <div className='px-8'>
                <h1 class="mb-3 text-3xl font-bold leading-tight text-center text-gray-900 md:text-4xl">Join the organisations</h1>
                <p class="text-lg text-center text-gray-600 ">Build your brand, find new talent and create new opportunities.</p>
            </div>


        <section className="flex flex-col mx-4 overflow-visible lg:flex-row border-none rounded-3xl mt-12">

            
            <div className="w-full relative flex items-center justify-center lg:py-0 py-10 lg:justify-start -ml-24">

                {organisations.data && (
                <div className="relative w-full transform lg:my-4 xl:my-4 mx-12 space-y-6 h-full flex md:px-0 px-10 flex-col items-center justify-center">
                    <ul className="flex items-center justify-center transform space-x-7 xl:space-x-10">

                            {
                                organisations.data.sort(() => Math.random() - 0.5).map(user => (
                                    <li className="bg-white w-1/5 h-1/5 md:w-32 md:h-32 p-4 sm:p-5 md:p-7 rounded-3xl flex items-center justify-center shadow-xl">
                                        {user.attributes.image_profile &&user.attributes.image_profile.data!==null ? (
                                            <div className="mx-auto bg-cover bg-no-repeat image-placeholder rounded-3xl border-4 border-light absolute
                                            xs:w-12 xs:h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-32 lg:h-32"
                                            style={{
                                                backgroundImage: `url(${user.attributes.image_profile.data.attributes.url})`
                                                }}
                                                alt={`Profile name ${user.attributes.username}`}
                                        >

                                        </div>
                                        ) : (
                                            <div
                                                className="mx-auto bg-cover bg-no-repeat image-placeholder rounded-3xl border-4 border-light absolute
                                                xs:w-12 xs:h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-32 lg:h-32"
                                                style={{ backgroundImage: `url(${ProfilePlaceholder})` }}
                                                    alt={`Profile name ${user.attributes.username}`}
                                            >
                                            </div>
                                            )
                                        }
                                    </li>
                                ))
                            }
                        
                        
                    </ul>

                    <ul className="flex space-x-7 xl:space-x-10 ml-40">
                        {
                            organisations.data.sort(() => Math.random() - 0.5).map(organisation => (
                                <li className="bg-white w-1/5 h-1/5 md:w-32 md:h-32 p-4 sm:p-5 md:p-7 rounded-3xl flex items-center justify-center shadow-xl">
                                    {organisation.attributes.image_profile &&organisation.attributes.image_profile.data!==null ? (
                                        <div className="mx-auto bg-cover bg-no-repeat image-placeholder rounded-3xl border-4 border-light absolute
                                        xs:w-12 xs:h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-32 lg:h-32"
                                        style={{
                                            backgroundImage: `url(${organisation.attributes.image_profile.data.attributes.url})`
                                            }}
                                            alt={`Profile name ${organisation.attributes.username}`}
                                    >

                                    </div>
                                    ) : (
                                        <div
                                            className="mx-auto bg-cover bg-no-repeat image-placeholder rounded-3xl border-4 border-light absolute
                                            xs:w-12 xs:h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-32 lg:h-32"
                                            style={{ backgroundImage: `url(${ProfilePlaceholder})` }}
                                                alt={`Profile name ${organisation.attributes.username}`}
                                        >
                                        </div>
                                        )
                                    }
                                </li>
                            ))
                        }
                    </ul>

                    <ul className="flex items-center justify-center transform space-x-7 xl:space-x-10">
                    {
                                organisations.data.sort(() => Math.random() - 0.5).map(organisation => (
                                    <li className="bg-white w-1/5 h-1/5 md:w-32 md:h-32 p-4 sm:p-5 md:p-7 rounded-3xl flex items-center justify-center shadow-xl">
                                        {organisation.attributes.image_profile &&organisation.attributes.image_profile.data!==null ? (
                                            <div className="mx-auto bg-cover bg-no-repeat image-placeholder rounded-3xl border-4 border-light absolute
                                            xs:w-12 xs:h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-32 lg:h-32"
                                            style={{
                                                backgroundImage: `url(${organisation.attributes.image_profile.data.attributes.url})`
                                                }}
                                                alt={`Profile name ${organisation.attributes.username}`}
                                        >

                                        </div>
                                        ) : (
                                            <div
                                                className="mx-auto bg-cover bg-no-repeat image-placeholder rounded-3xl border-4 border-light absolute
                                                xs:w-12 xs:h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-32 lg:h-32"
                                                style={{ backgroundImage: `url(${ProfilePlaceholder})` }}
                                                    alt={`Profile name ${organisation.attributes.username}`}
                                            >
                                            </div>
                                            )
                                        }
                                    </li>
                                ))
                            }
                        

                    </ul>
                </div>
                )}

            </div>

            
        </section>

        <div className="relative flex flex-col items-center mt-10 w-full">
            <Link to={'/authportal'} className="relative inline-block w-64 px-5 py-3 mt-2 text-center text-white bg-gray-900 hover:text-black hover:bg-primary rounded-full">Join Hivefolio</Link>
            <Link to={'/authportal'} className="w-64 mt-3 text-sm font-medium text-center text-black hover:text-primary">Sign in</Link>
        </div>

        </div>

        
    )
}

export default HeaderShowcaseOrganisations