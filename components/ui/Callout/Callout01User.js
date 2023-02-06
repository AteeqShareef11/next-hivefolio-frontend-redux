import { Link } from 'react-router-dom';

/* Images */
import ProfilePlaceholder from '../../assets/images/profile_placeholder.png';
import hexagon_background from '../../assets/images/hexagon_background.png';
import Gravatar from 'react-gravatar';

const Callout01User = ({user, styleProfile01, style01, style02, subtitle, title01, title02, text01, bulletTitle01, bullet01, bulletTitle02, bullet02, buttonText, buttonLink, image01, item01}) => {

    const {username, image_profile, image_background, gamertag, type_user, games, email} = user;

    return (
        <div className={style01}>

            <div className="relative w-full mb-10 lg:text-left sm:text-center lg:w-1/2 xl:w-7/12 lg:mb-0">
                <p className="text-sm font-semibold tracking-wide uppercase">{subtitle}</p>
                <h2 className="text-5xl font-bold sm:text-6xl mt-7">{title01}
                <br className="hidden lg:block"/> {title02}</h2>
                <p className="text-gray-600 lg:max-w-sm mt-9">{text01}</p>
                <ul className="relative max-w-md mx-auto lg:mx-0">
                    <li className="flex pl-6 mt-5">
                        <svg className="absolute left-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                        <span className="text-sm text-gray-600"><span className="font-bold text-gray-900">{bulletTitle01}</span> {bullet01}</span>
                    </li>
                    <li className="flex pl-6 mt-5">
                        <svg className="absolute left-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                        <span className="text-sm text-gray-600"><span className="font-bold text-gray-900">{bulletTitle02}</span> {bullet02}</span>
                    </li>
                </ul>
                {buttonLink && (
                    <div className="relative flex flex-col items-center mt-10 w-full">
                        <Link to={'/authportal'} className="relative inline-block w-64 px-5 py-3 mt-2 text-center text-white bg-gray-900 hover:text-black hover:bg-primary rounded-full">Join Hivefolio</Link>
                        <Link to={'/authportal'} className="w-64 mt-3 text-sm font-medium text-center text-black hover:text-primary">Sign in</Link>
                    </div>
                )}
            </div>

            <div className={style02}>

            <section className="flex flex-col mx-4 overflow-hidden bg-white mt-6 border-none rounded-3xl lg:w-11/12 xl:w-11/12 px-4">
      
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

                    <div className={styleProfile01}>
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

        </div>
    )
}

export default Callout01User