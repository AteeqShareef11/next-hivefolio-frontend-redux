import { Link } from 'react-router-dom';
import { 
    IonCardContent, 
  } from '@ionic/react';

  import FeatureJobs from '../../assets/images/Feature_Jobs.png';


const FeatureSignedOut02 = ({ header01, header02, subHeader }) => {
    return (
            <div className='bg-light py-8'>

                <section className="block py-24 leading-7 text-left text-gray-900">
                    <div className="relative w-full px-8 mx-auto leading-7 text-gray-900 max-w-7xl lg:px-16 xl:px-32">
                        <div className="flex flex-col flex-wrap items-center text-left md:flex-row">

                            <div className="flex-1 opacity-100 xl:pr-12 transform-none">
                                <h1 className="box-border mt-0 text-4xl font-normal tracking-tight text-center text-gray-900 sm:text-5xl md:text-4xl lg:text-5xl mb-7 md:text-left">
                                    {header01} 
                                    <br/>
                                    <span className="text-blue-600">{header02}</span>
                                </h1>
                                
                                <p className="box-border mt-0 mb-8 text-base font-normal text-center text-gray-500 lg:text-xl md:text-left lg:mb-8">
                                    {subHeader} 
                                </p>
                            </div>

                            <div className="relative flex justify-center flex-1 w-full px-5 mt-16 leading-7 text-gray-900 md:justify-end md:mt-0">
                                <img src={FeatureJobs} className="w-full max-w-md"/>
                            </div>

                        </div>
                    </div>
                </section>


            </div>
          
    )
}

export default FeatureSignedOut02;