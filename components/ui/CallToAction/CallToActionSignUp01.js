import { Link } from 'react-router-dom';

/* Redux */
import { useDispatch, useSelector } from 'react-redux';

const CallToActionSignUp01 = ({game}) => {

    const { image_background } = game;

    return (

        <div className='mb-12'>

            
            {/* <section className="relative py-24 bg-white bg-bottom bg-cover" 
            style={{
                backgroundImage: `url('https://cdn.devdojo.com/images/december2020/cta-bg.jpeg)`
            }}
            >
                <div className="absolute inset-0 block w-full h-full opacity-25 bg-gradient-to-br from-transparent via-black to-transparent lg:hidden"></div>
                <div className="flex flex-col items-center justify-between px-10 mx-auto max-w-7xl xl:px-12 lg:flex-row">
                    <div className="relative mb-6 lg:mb-0">
                        <h2 className="w-full mx-auto mb-2 text-4xl font-extrabold leading-none text-center text-white md:text-5xl xl:text-6xl lg:text-left">Designed with you in mind.</h2>
                        <p className="w-full max-w-3xl mx-auto text-base text-center text-gray-100 xl:text-xl lg:text-left">We have hand-crafted the best designs and templates, optimized for conversion.</p>
                    </div>
                    <a href="#_" className="relative flex-shrink-0 px-10 py-5 text-xl font-medium text-center text-white bg-blue-600 rounded-lg lg:text-2xl focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50 focus:outline-none">Sign Up Today</a>
                </div>
            </section> */}

            {game && (
            <section className="relative py-24 bg-white bg-bottom bg-cover" style={{
                    backgroundImage: `url(${image_background && image_background.url})`
                }}>

                <div className="flex flex-col items-center justify-between px-10 mx-auto max-w-7xl py-4 xl:px-12 lg:flex-row bg-gradient-to-r from-primary">
                    <div className="relative mb-6 lg:mb-0">
                        <h2 className="w-full mx-auto mb-2 text-4xl font-extrabold leading-none text-center text-white md:text-5xl xl:text-6xl lg:text-left ">
                            <span className="relative">
                                <span className="absolute bottom-0 left-0 inline-block w-full h-4 mb-1 -ml-1 transform -skew-x-3 bg-indigo-500"></span>
                                <span className="relative">Ready to level-up your esports career?</span>
                            </span>
                            
                        </h2>
                        <p className="w-full max-w-3xl mx-auto text-base text-center text-gray-100 xl:text-xl lg:text-left">Join the community of Esports players and specialists.</p>
                    </div>
                    
                    <div className="relative flex flex-col items-center mt-10">
                        <Link to={'/authportal'} className="relative inline-block w-64 px-5 py-3 mt-2 text-center text-white bg-gray-900 hover:text-black hover:bg-primary rounded-full border-4 border-light">Join Hivefolio</Link>
                        <Link to={'/authportal'} className="w-64 mt-3 text-sm font-bold text-center text-white hover:text-primary">Sign in</Link>
                    </div>
                </div>
            </section>
            )}

        </div>

        
    )
}

export default CallToActionSignUp01