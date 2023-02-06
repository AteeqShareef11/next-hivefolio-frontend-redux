import { IonButton, IonContent, IonLoading, IonMenuButton, IonPopover, IonSearchbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

/* Components */
import ProfilePlaceholder from '../../assets/images/profile_placeholder.png';
import Gravatar from 'react-gravatar';

import PopoverAccount from '../../ui/Popover/PopoverAccount';
import PopoverNavigation from '../Popover/PopoverNavigation';

import OnboardingModal01 from '../Onboarding/OnboardingModal01';

import { BellIcon, } from '@heroicons/react/outline';

/* Contexts */
import { useCurrentUser } from '../../context/AuthContext';
import { callApi } from '../../utils/utils';

/* Redux */
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoreData, fetchTeams } from '../../redux/actions/coreActions';
import { fetchUsers } from '../../redux/actions/userActions';

export const NavButtons = () => {
  const loggedInUser = useCurrentUser();
  const { id } = loggedInUser;  

  const dispatch = useDispatch();
  const [showLoading, setShowLoading] = useState(true);

  const users = useSelector((state) => state.allData.users);
  const allUsers = useSelector((state) => state.allUsers.users);
  const allTeams = useSelector((state) => state.allTeams.teams);
  const selectedStateUser = useSelector(state => state.user);

  const typeusers = useSelector((state) => state.allData.typeusers);

  const selectedUser = users?.find((person) => {
    return person.id === loggedInUser.id;
  })

  // console.log("NavButtons users", users);
  // console.log("NavButtons allUsers", allUsers);
  // console.log("NavButtons allTeams", allTeams);

  const notifications = useSelector((state) => state.allData.notifications) || [];

  const history = useHistory();
  const [showModal01, setShowModal01] = useState(false);

  let combinedNotifications = [];
  let notificationAmountRead = [];
  if (notifications.length !== undefined && notifications.length > 0) {
    const receiverUser = notifications?.filter(notification => {
      return notification.receiveruser?.id === loggedInUser?.id
    })   
  
    const receiverTeam = notifications?.filter(notification => {
      return notification.receiverteam?.admins.includes(loggedInUser.id);
    })
  
    const receiverOrganisation = notifications?.filter(notification => {
      return notification.receiverorganisation?.admins.includes(loggedInUser.id);
    })
  
    const receiverCommunity = notifications?.filter(notification => {
      return notification.receivercommunity?.admins.includes(loggedInUser.id);
    })
  
    /* const isIterable = (value) => {
      return Symbol.iterator in Object(value);
    } */
    
    combinedNotifications = [...receiverUser, ...receiverTeam, ...receiverOrganisation, ...receiverCommunity];
  
    
    notificationAmountRead = combinedNotifications?.filter(notification => {
      return notification.boolean_read === false;
    })
  
    
  }

  /* if(selectedUser !== undefined && selectedUser.onboarding === false) {
    history.push(`/onboarding`)
  }  */

  /* const handleLogout = async () => {
    localStorage.removeItem('token');
  }; */

  /* const tokenCheck = () => {
    if(localStorage.token) {
      setTimeout(() => {
        if(loggedInUser && !loggedInUser.isAuthenticated && localStorage.token) {
          localStorage.removeItem('token');
          console.log("NavButtons token removed")
        }
        console.log("NavButtons time out")
      }, 2000)
    }
  } */

  const tokenCheck = () => {
   
      if(allTeams.length !== 0) {
        //localStorage.getItem('token')
        
          if(allTeams.length > 0 && loggedInUser && !loggedInUser.isAuthenticated && localStorage.token) {
            localStorage.removeItem('token');
            console.log("NavButtons token removed")
          }
          console.log("NavButtons time out")
          //localStorage.setItem('token')
        
      }

  }

  /* const tokenCheck = () => {
    setTimeout(() => {
      if(localStorage.token && !loggedInUser.isAuthenticated) {
        localStorage.getItem('token')
        setTimeout(() => {
          if(loggedInUser && !loggedInUser.isAuthenticated && localStorage.token) {
            localStorage.removeItem('token');
            console.log("NavButtons token removed")
          }
          console.log("NavButtons time out")
          localStorage.setItem('token')
        }, 2000)
      }
    }, 2000)
  } */

  useEffect(() => {
    //tokenCheck();
  }, []);
  

  useEffect(() => {

    /* if(selectedUser && selectedUser.onboarding !== undefined && selectedUser.onboarding !== true) {
      dispatch(fetchUserId(selectedUser.id))
    } */

    /* if(user.onboarding !== undefined && user.onboarding !== true) {
      history.push(`/onboarding`)
    } */

    /* if(users.length !== 0 && !loggedInUser.isAuthenticated) {
      localStorage.removeItem('token');
    } */

    tokenCheck();

    if(selectedUser !== undefined && selectedUser.onboarding === false) {
      history.push(`/onboarding`)
    } 
    dispatch(fetchTeams());

    dispatch(fetchCoreData());
  }, []);

  return (
    
        <div className="flex justify-center items-center">

          {/* <div className="clear-both">
            <OnboardingModal01
              showModal01={showModal01}
              setShowModal01={setShowModal01}
              users={users}
            />
            
          </div> */}

          {/* <div className="m-auto">
            <IonLoading
              cssClass="my-custom-class"
              isOpen={showLoading}
              onDidDismiss={() => setShowLoading(false)}
              message={'Please wait...'}
            />
          </div> */}
          
          {/* <IonButton routerLink={'/jobs'} className="xxs:hidden xs:block sm:block md:block lg:block xl:block">Jobs</IonButton> */}
          <IonButton routerLink={'/players'} className="xs:block sm:block md:block lg:block xl:block">Players</IonButton>
          <IonButton routerLink={'/specialists'} className="xxs:hidden xs:hidden sm:block md:block lg:block xl:block">Specialists</IonButton>
          <IonButton routerLink={'/teams'} className="xxs:hidden xs:hidden sm:block md:block lg:block xl:block">Teams</IonButton>
          <IonButton routerLink={'/organisations'} className="xxs:hidden xs:hidden sm:block md:block lg:block xl:block">Organisations</IonButton>
          <IonButton routerLink={'/communities'} className="xxs:hidden xs:hidden sm:hidden md:hidden lg:block xl:block">Communities</IonButton>
          {/* <IonButton routerLink={'/jobs'} className="xxs:hidden xs:hidden sm:hidden md:hidden lg:block xl:block">Jobs</IonButton> */}
          {/* <IonButton routerLink={'/events'} className="xxs:hidden xs:hidden sm:hidden md:hidden lg:hidden xl:block">Events</IonButton> */}
          {/* <IonButton routerLink={'/games'} className="xxs:hidden xs:hidden sm:hidden md:hidden lg:hidden xl:block">Games</IonButton> */}

          <div className="xs:block sm:block md:block lg:block xl:hidden mr-2">
            <PopoverNavigation/>
          </div>
          

          {loggedInUser.isAuthenticated && <IonButton routerLink={'/create'} className="xxs:hidden xs:hidden sm:hidden md:block lg:block xl:block">Create</IonButton>}

          {/* {!loggedInUser.isAuthenticated && <IonButton routerLink={'/authportal'}>Sign In</IonButton>} */}
          {!loggedInUser.isAuthenticated && (
            <IonButton
              routerLink={'/authportal'}
              className="bg-black text-white hover:bg-primary hover:text-black rounded-full px-2"
            >
              Sign Up / In
            </IonButton>
          )}

          {loggedInUser.isAuthenticated && (
            <div className='relative'>
              {(!notificationAmountRead.length <= 0) && (
                <div className='absolute -top-1 -right-1 bg-primary rounded-full text-xs h-4 w-4 place-content-center text-center'>{notificationAmountRead.length}</div>
              )}
              
              <Link to={'/notifications'}>
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-8 w-8 bg-light p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" aria-hidden="true" />
              </Link>
            </div>
            
          )}

          {/* <IonButton id="click-trigger">Left-Click Me</IonButton>
          <IonPopover trigger="click-trigger" triggerAction="click">
            <IonContent class="ion-padding">Hello World</IonContent>
          </IonPopover> */}

          {loggedInUser.isAuthenticated && (
            <PopoverAccount
            id={id}
            />
          )}

          {/* {loggedInUser.onboarding === false && (
            setShowModal(true)
          )} */}

          {/* {loggedInUser.isAuthenticated && (
            <PopoverAccount2/>
          )} */}

          {/* {loggedInUser.isAuthenticated && (
            <Link to={'/account'}>
              <IonButton
                gamertag={loggedInUser.gamertag}
                image_profile={loggedInUser.image_profile}
                className="relative w-12"
              >
                
                <div>
                  <img
                    className="h-8 w-8 m-auto bg-no-repeat bg-cover rounded-full z-20 absolute top-0 left-0 border-2 border-primary"
                    style={{
                      backgroundImage: `url(${loggedInUser.image_profile && loggedInUser.image_profile.url})`,
                    }}
                  />

                  <div
                    className="h-8 w-8 m-auto bg-no-repeat bg-cover absolute top-0 left-0 "
                  >
                    <div
                      
                      style={{ backgroundImage: `url(${ProfilePlaceholder})` }}
                      alt={`Profile name ${loggedInUser.gamertag}`}
                    >
                      <Gravatar
                        size={1600}
                        rating="pg"
                        default={ProfilePlaceholder}
                        email={loggedInUser.email}
                        className="bg-no-repeat bg-cover rounded-full overflow-hidden absolute top-0 left-0 "
                      />
                    </div>
                  </div>
                </div>
              </IonButton>
            </Link>
          )}   */}       
          
          <IonMenuButton className="" />
 
        </div>

        

  );
};
