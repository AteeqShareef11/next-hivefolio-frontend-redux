import { useEffect } from 'react';
import { Link } from 'react-router-dom';

/* Contexts */
import { useCurrentUser } from '../../context/AuthContext';

/* Redux */
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnnouncements } from '../../redux/actions/coreActions';

const BannerAnnouncement = () => {

    const loggedInUser = useCurrentUser();

    /* Redux */
    const dispatch = useDispatch();

    const announcements = useSelector((state) => state.allData.announcements);

    const activeAnnouncements = Array.isArray(announcements) && announcements.filter((announcement) => {
        return announcement.boolean_active === true;
    })

    /* useEffect(() => {
        dispatch(fetchAnnouncements(announcements));
      }, []); */

    return (
        <div className="max-width">
            {activeAnnouncements && (
                <div >
                    {
                    announcements.sort(() => Math.random() - 0.5).slice(0,1).map(announcement => (
                        <div className='flex flex-row justify-between bg-gray-300 border-none rounded-full xxs:mx-4 xs:mx-4 sm:mx-4 mb:mx-0 lg:mx-0 xl:mx-0 mb-4 p-2'>
                            <div className='flex items-center pl-4'>
                                <div className='font-bold'>{announcement.title} </div>
                                {/* <div className='xs:hidden sm:hidden md:block lg:block xl:block'><p>  </p>{announcement.description}</div> */}
                            </div>
                            {loggedInUser.id === undefined && (
                                <div className='xxs:hidden xs:block sm:block md:block lg:block xl:block'>
                                    <Link to={'/authportal'}>
                                        <button type="submit" 
                                            className="inline-flex items-center justify-center h-8  
                                            px-6 font-medium tracking-wide transition 
                                            duration-200 bg-dark text-light rounded-full hover:bg-light hover:text-dark
                                            focus:shadow-outline focus:outline-none">
                                            
                                            Sign up
                                        </button>
                                    </Link>
                                </div>
                            )}                   
                        </div>
                    ))
                    } 
                </div>
            )}
        </div>
    )
}

export default BannerAnnouncement