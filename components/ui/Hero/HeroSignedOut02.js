import { Link } from 'react-router-dom';
import { 
    IonCardContent, 
  } from '@ionic/react';

/* Image */
import OrganisationCustom from '../../assets/images/OrganisationCustom.png';
import OrganisationCenter from '../../assets/images/OrganisationCenter.png';


const HeroSignedOut02 = ({  }) => {
    return (


            <section class="relative z-20 w-full pt-24 pb-32 bg-white">
                <div class="px-8 mx-auto max-w-7xl xl:px-8">
                    <div class="flex flex-col md:flex-row">
                        <div class="flex flex-col items-center justify-center w-full mb-16 md:items-start md:mb-0 md:w-1/2 lg:w-1/2">
                            {/* <h1 class="mb-2 text-5xl font-black text-center text-black md:text-3xl lg:text-5xl md:text-left">All-in-One <br/>Page Builder</h1> */}

                            <h1 className="relative z-20 font-sans text-4xl font-extrabold leading-none text-black sm:text-5xl xl:text-6xl sm:text-center lg:text-left">
                                <span className="relative">
                                    <span className="absolute bottom-0 left-0 inline-block w-full h-4 mb-1 -ml-1 transform -skew-x-3 bg-primary"></span>
                                    <span className="relative">Grow Your Organisation</span>
                                </span>
                                <span className="relative block text-primary">For Esports.</span>
                            </h1>


                            <p class="mb-12 text-xl tracking-wide text-center text-gray-700 md:text-left">Create, grow, and manage your organisation.</p>
                            <div className="relative flex flex-col items-center mt-10">
                                <Link to={'/authportal'} className="relative inline-block w-64 px-5 py-3 mt-2 text-center text-white bg-gray-900 hover:text-black hover:bg-primary rounded-full">Join Hivefolio</Link>
                                <Link to={'/authportal'} className="w-64 mt-3 text-sm font-medium text-center text-black hover:text-primary">Sign in</Link>
                            </div>
                        </div>

                        <div className="relative w-full px-8 mb-12 rounded-lg cursor-pointer md:px-0 lg:mb-0 lg:pl-10 md:w-full lg:1/2 group">
                            <div className="relative rounded-md">
                                <img src={OrganisationCenter} className="z-10 object-cover w-full h-full"/>
                            </div>
                            
                        </div>

                    </div>
                </div>
            </section>


          
    )
}

export default HeroSignedOut02;