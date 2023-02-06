import { Link } from 'react-router-dom';
import { 
    IonCardContent, 
  } from '@ionic/react';

import FeatureSignedOut from '../../assets/images/FeatureSignedOut.png';

const HeroSignedOut01 = () => {
    return (                
        <section className="relative flex flex-col items-center justify-center bg-white bg-cover min-w-screen tails-bg lg:py-8">
            <div className="flex flex-col flex-col-reverse items-center justify-center p-8 mx-auto lg:flex-row lg:max-w-6xl lg:p-0">
                <div className="container relative z-20 flex flex-col w-full px-5 pr-12 mb-16  lg:w-1/2 sm:px-0 md:px-10 sm:items-center lg:items-start lg:mb-0">
                    <h1 className="relative z-20 font-sans text-4xl font-extrabold leading-none text-black sm:text-5xl xl:text-6xl sm:text-center lg:text-left">
                        <span className="relative">
                            <span className="absolute bottom-0 left-0 inline-block w-full h-4 mb-1 -ml-1 transform -skew-x-3 bg-primary"></span>
                            <span className="relative">Professional Network</span>
                        </span>
                        <span className="relative block text-primary">For Esports.</span>
                    </h1>
                    <p className="relative z-20 block mt-6 text-base text-gray-500 xl:text-lg sm:text-center lg:text-left">Take your esports and gaming career to the next level. Create a profile, bring your activies together and discover new opportunities.</p>
                    <div className="relative flex flex-col items-center mt-10">
                    <Link to={'/authportal'} className="relative inline-block w-64 px-5 py-3 mt-2 text-center border-2 border-white text-white bg-gray-900 hover:text-black hover:bg-primary rounded-full">Join Hivefolio</Link>
                            <Link to={'/authportal'} className="w-64 mt-3 text-sm font-medium text-center text-black hover:text-primary">Sign in</Link>
                    </div>

                </div>
                <div className="relative w-full px-8 mb-12 rounded-lg cursor-pointer md:px-0 lg:mb-0 lg:pl-10 md:w-full lg:w-full group">
                    <div className="relative rounded-md">
                        <img src={FeatureSignedOut} className="z-10 object-cover w-full h-full"/>
                    </div>
                    
                </div>
            </div>
        </section>
          
    )
}

export default HeroSignedOut01;