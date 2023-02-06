import { useContext, useEffect, useState } from 'react';

/* Components */
import CardNotification from './CardNotification';

/* Search */
import {useQuery, useQueryClient} from 'react-query';


/* Contexts */
import { useCurrentUser } from '../../context/AuthContext';

/* Redux */
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotifications } from '../../redux/actions/notificationActions';
import { fetchTypenotifications } from '../../redux/actions/typenotificationActions';


const SelectListNotifications = ({userId, teamId, organisationId, gamesId}) => {

    const [page, setPage]  =  useState(0);

    /* const {data, 
      status, 
      isFetching,
      isPreviousData,} = useQuery(['users', {user: userId}, {team: teamId}, {games: gamesId}, page],  getUsersData) */

    const loggedInUser = useCurrentUser();

    const notifications = useSelector((state) => state.allData.notifications) || [];

    const dispatch = useDispatch();

    let combinedNotifications = [];
    if (notifications.length !== undefined && notifications.length > 0) {
    const receiverUser = notifications?.filter(notification => {
      return notification.receiveruser?.id === loggedInUser?.id
    })  
    console.log("receiverUser", receiverUser)
    
    const receiverTeam = notifications?.filter(notification => {
      return notification.receiverteam?.admins.includes(loggedInUser.id);
    })
    console.log("receiverTeam", receiverTeam);

    const receiverOrganisation = notifications?.filter(notification => {
      return notification.receiverorganisation?.admins.includes(loggedInUser.id);
    })
    console.log("receiverOrganisation", receiverOrganisation)

    const receiverCommunity = notifications?.filter(notification => {
      return notification.receivercommunity?.admins.includes(loggedInUser.id);
    })
    console.log("receiverCommunity", receiverCommunity)

    combinedNotifications = [...receiverUser, ...receiverTeam, ...receiverOrganisation, ...receiverCommunity ];
    console.log('combined', combinedNotifications);
    }
  
    useEffect(() => {
      //dispatch(fetchNotifications(notifications));
      //dispatch(fetchTypenotifications);
    }, []);


    return (
        <div>

                {combinedNotifications.length < 0 ? (
                  <p>No notification</p>
                ) :
                (
                  <div>
                    {
                      combinedNotifications.map((notification) => (
                        <CardNotification
                          notificationId={notification.id}
                          notificationData={notification}
                        />
                      ))
                    }
                  </div>
                )}
                

                {/* <div className="pt-16">
                  <span>Current Page: {page + 1}</span>
                    <button
                    onClick={() => setPage(old => Math.max(old - 1, 0))}
                    disabled={page === 0}
                    className="inline-flex items-center justify-center h-12  
                                px-6 mr-2 font-medium tracking-wide transition 
                                duration-200 bg-primary text-dark rounded-full hover:bg-dark hover:text-light
                                focus:shadow-outline focus:outline-none"
                    >
                    Previous Page
                    </button>{' '}
                    <button
                    onClick={() => {
                        console.log("isPreviousData:",isPreviousData);
                        console.log("data:",data);
                        if (!isPreviousData && data.length==10) {
                        setPage(old => old + 1)
                        }
                    }}
                    // Disable the Next Page button until we know a next page is available
                    // disabled={isPreviousData || !data?.hasMore}
                    className="inline-flex items-center justify-center h-12  
                                px-6 mr-2 font-medium tracking-wide transition 
                                duration-200 bg-primary text-dark rounded-full hover:bg-dark hover:text-light
                                focus:shadow-outline focus:outline-none"
                    >
                    Next Page
                    </button>
                    {isFetching ? <span> Loading...</span> : null}{' '}
                </div> */}

        </div>
    )
}

export default SelectListNotifications