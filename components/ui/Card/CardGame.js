import { Link } from 'react-router-dom';
import { 
    IonCardContent, 
  } from '@ionic/react';


/* Redux */
import { useSelector } from 'react-redux';

/* Images */
import ProfilePlaceholder from '../../assets/images/profile_placeholder.png';

const CardGame = ({id, image_profile, name, organisations, game, full, responsive, list, noLink}) => {

    const games = useSelector(state => state.allData.games);
    // console.log("games========",games)
    // console.log("game========",game)
    let foundGame = null;
    if(games && games.data !== undefined && game && game !== undefined) {
        const matchGame = Array.isArray(games.data) ? games.data?.find((person) => {
        return person?.id === game?.id;
        }) : {}
        foundGame = matchGame
    }
    // console.log("foundGame========",foundGame)
    return (
        <div >
            {full === true && (
                <IonCardContent className="text-center border-none rounded-3xl bg-light hover:bg-primary">
                <Link to={`/game/${id}`} >
                    <div className="">
                        <div>
                            {image_profile && image_profile.data ? image_profile.data!==null: image_profile ? (
                                <div
                                    className="mx-auto bg-cover bg-no-repeat rounded-3xl h-44 w-32 image-placeholder"
                                    style={{
                                        backgroundImage: `url(${image_profile.data? image_profile.data.attributes.url:image_profile.url})`
                                    }}
                                    alt={`Profile name ${name}`}
                                >
                                    <svg className="clip-svg">
                                        <defs >
                                            <clipPath id="clip-shape" clipPathUnits="objectBoundingBox" >
                                                <path d="M1,0.284 C1,0.428,1,0.572,1,0.716 C0.999,0.718,0.998,0.72,0.998,0.722 C0.993,0.747,0.979,0.766,0.954,0.779 C0.818,0.849,0.681,0.919,0.545,0.988 C0.515,1,0.484,1,0.454,0.988 C0.318,0.919,0.182,0.849,0.046,0.779 C0.015,0.764,0,0.74,0,0.709 C0,0.569,0,0.431,0,0.292 C0,0.26,0.015,0.236,0.046,0.221 C0.182,0.151,0.318,0.081,0.454,0.012 C0.484,-0.004,0.515,-0.004,0.545,0.012 C0.681,0.081,0.818,0.151,0.954,0.222 C0.968,0.229,0.979,0.243,0.989,0.255 C0.995,0.263,0.996,0.274,1,0.284">
                                                </path>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                            ) : (
                                
                                <div
                                    className="mx-auto bg-cover bg-no-repeat h-44 w-32 image-placeholder rounded-3xl placeholder overflow-hidden text-transparent"
                                    style={{ backgroundImage: `url(${ProfilePlaceholder})` }}
                                    alt={`Profile name ${name}`}    
                                >
                                </div>
                            )}
                        </div>
                        <div className="pt-4">
                            <p>{name}</p>
                        </div>
                        
                        {foundGame &&(

                            <div className="isolate flex -space-x-1 justify-center">
                            {foundGame.attributes.players!==undefined && Array.isArray(foundGame.attributes.players.data) && foundGame.attributes.players.data?.sort(() => Math.random() - 0.5).slice(0, 8)?.map(user => (
                                <img
                                className="relative z-30 inline-block h-6 w-6 rounded-full ring-2 ring-white bg-white bg-cover bg-no-repeat image-placeholder"
                                style={{
                                    backgroundImage: `url(${user.attributes.image_profile && user.attributes.image_profile.data && user.attributes.image_profile.data && user.attributes.image_profile.data.attributes.url})`
                                }}
                                alt=""
                            />
                            ))}
                            </div>

                        )}

                    </div>
                </Link>

            </IonCardContent>
            )}

            { responsive === true && (

            <div>

            <div className='xxs:hidden xs:hidden sm:hidden md:block lg:block xl:block'>
            <IonCardContent className="grid text-center border-none rounded-3xl bg-light hover:bg-primary">
            <Link to={`/game/${id}`}>
                <div className="">
                <div>
                    {image_profile && image_profile.data ? image_profile.data!==null: image_profile? (
                    <div
                        className="mx-auto bg-cover bg-no-repeat rounded-3xl h-44 w-32 image-placeholder"
                        /* className="hexagonImage element image-placeholder" */
                        style={{
                        backgroundImage: `url(${image_profile.data? image_profile.data.attributes.url:image_profile.url})`,
                        }}
                        alt={`Profile name ${name}`}
                    >
                        <svg className="clip-svg">
                        <defs>
                            <clipPath id="clip-shape" clipPathUnits="objectBoundingBox">
                            <path d="M1,0.284 C1,0.428,1,0.572,1,0.716 C0.999,0.718,0.998,0.72,0.998,0.722 C0.993,0.747,0.979,0.766,0.954,0.779 C0.818,0.849,0.681,0.919,0.545,0.988 C0.515,1,0.484,1,0.454,0.988 C0.318,0.919,0.182,0.849,0.046,0.779 C0.015,0.764,0,0.74,0,0.709 C0,0.569,0,0.431,0,0.292 C0,0.26,0.015,0.236,0.046,0.221 C0.182,0.151,0.318,0.081,0.454,0.012 C0.484,-0.004,0.515,-0.004,0.545,0.012 C0.681,0.081,0.818,0.151,0.954,0.222 C0.968,0.229,0.979,0.243,0.989,0.255 C0.995,0.263,0.996,0.274,1,0.284"></path>
                            </clipPath>
                        </defs>
                        </svg>
                    </div>
                    ) : (
                    <div
                        className="mx-auto bg-cover bg-no-repeat rounded-3xl h-44 w-32 image-placeholder placeholder overflow-hidden text-transparent"
                        /* className="hexagonImage element placeholder overflow-hidden text-transparent" */
                        style={{ backgroundImage: `url(${ProfilePlaceholder})` }}
                        alt={`Profile name ${name}`}
                    ></div>
                    )}
                </div>
                <div className="pt-4">
                    <p>{name}</p>
                </div>

                {foundGame  && (

                    <div className="isolate flex -space-x-1 justify-center">
                    {foundGame.attributes.players!==undefined && Array.isArray(foundGame.attributes.players.data) && foundGame.attributes.players.data?.sort(() => Math.random() - 0.5).slice(0, 8)?.map(user => (
                        <img
                        className="relative z-30 inline-block h-6 w-6 rounded-full ring-2 ring-white bg-white bg-cover bg-no-repeat image-placeholder"
                        style={{
                            backgroundImage: `url(${user.attributes.image_profile &&user.attributes.image_profile.data && user.attributes.image_profile.data.attributes.url})`
                        }}
                        alt=""
                    />
                    ))}
                    </div>

                )}
                
                </div>
            </Link>
            
            </IonCardContent>
            </div>


            <IonCardContent className="flex flex-row flex-wrap w-full xxs:block xs:block sm:block md:hidden lg:hidden xl:hidden">
            <Link to={`/game/${id}`}>
            <div class="flex flex-row bg-light w-full px-6 py-4 whitespace-nowrap">
                <div class="flex justify-between items-center w-full">
                <div className="flex flex-row">

                    <div class="flex-shrink-0 h-10 ">
                    {image_profile && image_profile.data ? image_profile.data!==null: image_profile ? (
                        <div
                        className=" h-10 w-10 rounded-full bg-cover bg-no-repeat my-auto "
                        style={{
                            backgroundImage: `url(${image_profile.data? image_profile.data.attributes.url:image_profile.url})`,
                        }}
                        alt={`Profile name ${name}`}
                        >
                        <svg className="clip-svg ">
                            <defs>
                            <clipPath id="clip-shape" clipPathUnits="objectBoundingBox">
                                <path d="M1,0.284 C1,0.428,1,0.572,1,0.716 C0.999,0.718,0.998,0.72,0.998,0.722 C0.993,0.747,0.979,0.766,0.954,0.779 C0.818,0.849,0.681,0.919,0.545,0.988 C0.515,1,0.484,1,0.454,0.988 C0.318,0.919,0.182,0.849,0.046,0.779 C0.015,0.764,0,0.74,0,0.709 C0,0.569,0,0.431,0,0.292 C0,0.26,0.015,0.236,0.046,0.221 C0.182,0.151,0.318,0.081,0.454,0.012 C0.484,-0.004,0.515,-0.004,0.545,0.012 C0.681,0.081,0.818,0.151,0.954,0.222 C0.968,0.229,0.979,0.243,0.989,0.255 C0.995,0.263,0.996,0.274,1,0.284"></path>
                            </clipPath>
                            </defs>
                        </svg>
                        </div>
                    ) : (
                        <div
                        className=" h-10 w-10 rounded-full bg-cover bg-no-repeat my-auto text-transparent"
                        style={{ backgroundImage: `url(${ProfilePlaceholder})` }}
                        alt={`Profile name ${name}`}
                        >
                        {/* Change default to placeholder image */}
                        {/* <Gravatar
                            email={email}
                            size={1600}
                            rating="pg"
                            default={ProfilePlaceholder}
                            className="CustomAvatar-image overflow-hidden h-10 w-10 rounded-full bg-cover bg-no-repeat my-auto "
                        /> */}
                        </div>
                    )}
                    </div>
                    <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{name}</div>
                    <div class="text-sm text-gray-500">{name}</div>
                    </div>
                </div>
                <div class="px-6 py-4 whitespace-nowrap">
                    {/* <div class="text-sm text-gray-900">Regional Paradigm Technician</div>
                                        <div class="text-sm text-gray-500">Optimization</div> */}
                </div>
                
                </div>
            </div>
            </Link>
            </IonCardContent>

            </div>
            )
            }


            { list === true && (

            <IonCardContent className="flex flex-row flex-wrap w-full">
            <Link to={`/game/${id}`}>
            <div class="flex flex-row bg-light w-full px-6 py-4 whitespace-nowrap">
            <div class="flex justify-between items-center w-full">
                <div className="flex flex-row">

                <div class="flex-shrink-0 h-10 ">
                    {image_profile && image_profile.data ? image_profile.data!==null: image_profile ? (
                    <div
                        className=" h-10 w-10 rounded-full bg-cover bg-no-repeat my-auto "
                        style={{
                        backgroundImage: `url(${image_profile.data? image_profile.data.attributes.url:image_profile.url})`,
                        }}
                        alt={`Profile name ${name}`}
                    >
                        <svg className="clip-svg ">
                        <defs>
                            <clipPath id="clip-shape" clipPathUnits="objectBoundingBox">
                            <path d="M1,0.284 C1,0.428,1,0.572,1,0.716 C0.999,0.718,0.998,0.72,0.998,0.722 C0.993,0.747,0.979,0.766,0.954,0.779 C0.818,0.849,0.681,0.919,0.545,0.988 C0.515,1,0.484,1,0.454,0.988 C0.318,0.919,0.182,0.849,0.046,0.779 C0.015,0.764,0,0.74,0,0.709 C0,0.569,0,0.431,0,0.292 C0,0.26,0.015,0.236,0.046,0.221 C0.182,0.151,0.318,0.081,0.454,0.012 C0.484,-0.004,0.515,-0.004,0.545,0.012 C0.681,0.081,0.818,0.151,0.954,0.222 C0.968,0.229,0.979,0.243,0.989,0.255 C0.995,0.263,0.996,0.274,1,0.284"></path>
                            </clipPath>
                        </defs>
                        </svg>
                    </div>
                    ) : (
                    <div
                        className=" h-10 w-10 rounded-full bg-cover bg-no-repeat my-auto text-transparent"
                        style={{ backgroundImage: `url(${ProfilePlaceholder})` }}
                        alt={`Profile name ${name}`}
                    >
                        {/* Change default to placeholder image */}
                        {/* <Gravatar
                        email={email}
                        size={1600}
                        rating="pg"
                        default={ProfilePlaceholder}
                        className="CustomAvatar-image overflow-hidden h-10 w-10 rounded-full bg-cover bg-no-repeat my-auto "
                        /> */}
                    </div>
                    )}
                </div>
                <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{name}</div>
                    <div class="text-sm text-gray-500">{name}</div>
                </div>
                </div>
                <div class="px-6 py-4 whitespace-nowrap">
                {/* <div class="text-sm text-gray-900">Regional Paradigm Technician</div>
                                    <div class="text-sm text-gray-500">Optimization</div> */}
                </div>
            
            </div>
            </div>
            </Link>
            </IonCardContent>

            )
            }

            {noLink === true && (
                <IonCardContent className="text-center border-none rounded-3xl">
                    <div className="">
                        <div>
                            {image_profile && image_profile.data ? image_profile.data!==null: image_profile ? (
                                <div
                                    className="mx-auto bg-cover bg-no-repeat rounded-3xl h-44 w-32 image-placeholder"
                                    style={{
                                        backgroundImage: `url(${image_profile.data? image_profile.data.attributes.url:image_profile.url})`
                                    }}
                                    alt={`Profile name ${name}`}
                                >
                                    <svg className="clip-svg">
                                        <defs >
                                            <clipPath id="clip-shape" clipPathUnits="objectBoundingBox" >
                                                <path d="M1,0.284 C1,0.428,1,0.572,1,0.716 C0.999,0.718,0.998,0.72,0.998,0.722 C0.993,0.747,0.979,0.766,0.954,0.779 C0.818,0.849,0.681,0.919,0.545,0.988 C0.515,1,0.484,1,0.454,0.988 C0.318,0.919,0.182,0.849,0.046,0.779 C0.015,0.764,0,0.74,0,0.709 C0,0.569,0,0.431,0,0.292 C0,0.26,0.015,0.236,0.046,0.221 C0.182,0.151,0.318,0.081,0.454,0.012 C0.484,-0.004,0.515,-0.004,0.545,0.012 C0.681,0.081,0.818,0.151,0.954,0.222 C0.968,0.229,0.979,0.243,0.989,0.255 C0.995,0.263,0.996,0.274,1,0.284">
                                                </path>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                            ) : (
                                
                                <div
                                    className="mx-auto bg-cover bg-no-repeat h-44 w-32 image-placeholder rounded-3xl placeholder overflow-hidden text-transparent"
                                    style={{ backgroundImage: `url(${ProfilePlaceholder})` }}
                                    alt={`Profile name ${name}`}    
                                >
                                </div>
                            )}
                        </div>
                        <div className="pt-4">
                            <p>{name}</p>
                        </div>
                        <div className="">
                            <p>{organisations}</p>
                        </div>
                    </div>
            </IonCardContent>
            )}

        </div>
          
    )
}

export default CardGame;