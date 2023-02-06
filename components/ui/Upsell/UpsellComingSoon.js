import { Link } from 'react-router-dom';
import Twitter2 from '../../assets/images/twitter_2.png';

/* Contexts */
import { useCurrentUser } from '../../context/AuthContext';

const UpsellComingSoon = () => {

    const LoggedInUser = useCurrentUser();

    return (
        
        <section className="flex flex-col w-full bg-black md:flex-row">
            <div className="flex flex-col w-full p-10 md:w-1/2 lg:p-16 xl:p-24">
                
                <h2 className="max-w-lg text-4xl font-light leading-tight text-white md:text-3xl lg:text-4xl xl:text-5xl -mb-2">Feature coming soon...</h2>
                {!LoggedInUser && (
                    <div>
                        <p className="max-w-lg mt-5 text-xl text-gray-500 md:text-base lg:text-xl mb-4">Get notified when the feature gets released</p>

                        <Link to='/authportal'
                            className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-black transition duration-150 ease-in-out bg-primary border border-transparent rounded-md hover:text-white hover:bg-dark focus:outline-none focus:shadow-outline focus:border-indigo-300">
                            Sign up
                        </Link>
                    </div> 
                )}
            </div>

            <div className="w-full md:w-1/2">
                <img src={Twitter2} className="inset-0 object-cover"/>
            </div>
        </section>

    )
}

export default UpsellComingSoon