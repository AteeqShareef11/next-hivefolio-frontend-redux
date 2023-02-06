import { Link } from 'react-router-dom';
import { 
    IonCardContent, 
  } from '@ionic/react';

/* Images */
import ProfilePlaceholder from '../../assets/images/profile_placeholder.png';
import hexagon_background from '../../assets/images/hexagon_background.png';
import Gravatar from 'react-gravatar';

/* Redux */
import { useDispatch, useSelector } from 'react-redux';


const FeatureCardUser = ({ user, style1 }) => {

    const {username, image_profile, image_background, gamertag, type_user, games, email} = user;

    return (
        
        <section className="w-full bg-white pt-7 pb-7 md:pt-20 md:pb-24">
            <div className="box-border flex flex-col items-center content-center px-8 mx-auto leading-6 text-black border-0 border-gray-300 border-solid md:flex-row max-w-7xl lg:px-16">

                <div className="box-border relative w-full max-w-md px-4 mt-5 mb-4 -ml-5 text-center bg-no-repeat bg-contain border-solid md:ml-0 md:mt-0 md:max-w-none lg:mb-0 md:w-1/2 xl:pl-10">
                    
                    


                <section className="flex flex-col mx-4 overflow-hidden bg-white mt-6 border-none rounded-3xl ">
      
                    <div className="flex items-center w-full justify-center h-40">
                        { image_background ? (
                            <img 
                            src={image_background.url} 
                            alt={`Profile name ${gamertag}`} 
                            className="object-cover w-full h-40 lg:h-full md:h-60 rounded-md"
                            />
                            ) : (
                                <img src={hexagon_background} className="object-cover w-full h-40 lg:h-full md:h-60 rounded-md"/>
                            )}
                            
                            <div className="mx-auto bg-cover bg-no-repeat h-32 w-32 image-placeholder rounded-full absolute bg-white">
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
                                    className="CustomAvatar-image overflow-hidden text-transparent"
                                />
                                </div>
                                )
                            }
                            </div>

                        </div>

                    <div className={style1}>
                        <div className="flex flex-col items-start w-full ">
                        <div className="mb-2 leading-none items-start">
                            <h1 className="mb-2">{gamertag}</h1>
                            {username && <h5>@{username}</h5>}
                        </div>

                        <div className="flex flex-wrap b-4">
                        {type_user && (
                            <div
                            className="inline-flex items-center justify-center h-8  
                                        px-6 mr-2 mb-2 font-medium tracking-wide transition 
                                        duration-200 bg-gray-300 text-dark rounded-full
                                        focus:shadow-outline focus:outline-none"
                            >
                            {type_user.sort(() => Math.random() - 0.5).slice(0,1).map(type => (type.name))}
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


                </div>

                {/* <div className="box-border order-first w-full text-black border-solid md:w-1/2 md:pl-10 md:order-none">
                    <h2 className="m-0 text-xl font-semibold leading-tight border-0 border-gray-300 lg:text-3xl md:text-2xl">
                        Personalized profile
                    </h2>
                    <p className="pt-4 pb-8 m-0 leading-7 text-gray-700 border-0 border-gray-300 sm:pr-12 xl:pr-32 lg:text-lg">
                        Create your own personalised profile, centralize your social activities and activities.
                    </p>
                    <ul className="p-0 m-0 leading-6 border-0 border-gray-300">
                        <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
                            <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-primary rounded-full"><span className="text-sm font-bold">✓</span></span> Build your brand
                        </li>
                        <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
                            <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-primary rounded-full"><span className="text-sm font-bold">✓</span></span> Show your experiences
                        </li>
                        <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
                            <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-primary rounded-full"><span className="text-sm font-bold">✓</span></span> Social and game integrations
                        </li>
                    </ul>
                </div> */}
            </div>

            {/* <div className="box-border flex flex-col items-center content-center px-8 mx-auto mt-2 leading-6 text-black border-0 border-gray-300 border-solid md:mt-20 xl:mt-0 md:flex-row max-w-7xl lg:px-16">

                <div className="box-border w-full text-black border-solid md:w-1/2 md:pl-6 xl:pl-32">
                    <h2 className="m-0 text-xl font-semibold leading-tight border-0 border-gray-300 lg:text-3xl md:text-2xl">
                        Automated Tasks
                    </h2>
                    <p className="pt-4 pb-8 m-0 leading-7 text-gray-700 border-0 border-gray-300 sm:pr-10 lg:text-lg">
                        Save time and money with our revolutionary services. We are the leaders in the industry.
                    </p>
                    <ul className="p-0 m-0 leading-6 border-0 border-gray-300">
                        <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
                            <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-yellow-300 rounded-full"><span className="text-sm font-bold">✓</span></span> Automated task management workflow
                        </li>
                        <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
                            <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-yellow-300 rounded-full"><span className="text-sm font-bold">✓</span></span> Detailed analytics for your data
                        </li>
                        <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
                            <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-yellow-300 rounded-full"><span className="text-sm font-bold">✓</span></span> Some awesome integrations
                        </li>
                    </ul>
                </div>

                <div className="box-border relative w-full max-w-md px-4 mt-10 mb-4 text-center bg-no-repeat bg-contain border-solid md:mt-0 md:max-w-none lg:mb-0 md:w-1/2">
                    <img src="https://cdn.devdojo.com/images/december2020/settings.png" className="pl-4 sm:pr-10 xl:pl-10 lg:pr-32">
                </div>
            </div> */}
        </section>

    )
}

export default FeatureCardUser;