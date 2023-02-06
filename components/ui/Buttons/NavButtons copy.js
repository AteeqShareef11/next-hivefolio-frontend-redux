import { IonButton, IonMenuButton, IonSearchbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { callApi } from '../../utils/utils';
import { Link } from 'react-router-dom';

/* User */
import { useCurrentUser, useDispatchCurrentUser } from '../../context/AuthContext';

/* Components */
import ProfilePlaceholder from '../../assets/images/profile_placeholder.png';
import Gravatar from 'react-gravatar';

export const NavButtons = (email, gamertag) => {
  const user = useCurrentUser();
  const dispatch = useDispatchCurrentUser();
  const history = useHistory();

  const handleLogout = async () => {
    localStorage.removeItem('token');
    await callApi({ path: '/logout', method: 'POST' });
    dispatch({ type: 'LOGOUT' });
    history.push('/');
  };

  const [mQuery, setQuery] = useState({
    matches: window.innerWidth > 900 ? true : false,
  });

  useEffect(() => {
    window.matchMedia('(min-width: 900px').addListener(setQuery);
  }, []);

  return (
    <div className="pr-4 relative">
      {mQuery && !mQuery.matches ? (
        /* Mobile */
        <div className="flex justify-center items-center">
          {user.isAuthenticated && (
            <Link to={'/account'}>
              <IonButton
                gamertag={user.gamertag}
                image_profile={user.image_profile}
                className="relative w-12"
              >
                <div>
                  <img
                    className="h-8 w-8 m-auto bg-no-repeat bg-cover rounded-full z-20 absolute top-0 left-0 border-2 border-primary"
                    style={{
                      backgroundImage: `url(${user.image_profile && user.image_profile.url})`,
                    }}
                  />

                  <div
                    className="h-8 w-8 m-auto bg-no-repeat bg-cover absolute top-0 left-0 "
                  >
                    <div
                      
                      style={{ backgroundImage: `url(${ProfilePlaceholder})` }}
                      alt={`Profile name ${gamertag}`}
                    >
                      {/* /* Change default to placeholder image */}
                      <Gravatar
                        size={1600}
                        rating="pg"
                        default={ProfilePlaceholder}
                        email={user.email}
                        className="bg-no-repeat bg-cover rounded-full overflow-hidden absolute top-0 left-0 "
                      />
                    </div>
                  </div>
                </div>
              </IonButton>
            </Link>
          )}

          <IonMenuButton className="" />
        </div>
      ) : (
        /* Desktop */
        <div className="flex justify-center items-center">
          <IonButton routerLink={'/players'}>Players</IonButton>
          <IonButton routerLink={'/commentators'}>Commentators</IonButton>
          <IonButton routerLink={'/teams'}>Teams</IonButton>
          <IonButton routerLink={'/organisations'}>Organisations</IonButton>
          <IonButton routerLink={'/communities'}>Communities</IonButton>
          <IonButton routerLink={'/games'}>Games</IonButton>
          {/* <IonButton routerLink={"/events"}>Events</IonButton> */}
          {user.isAuthenticated && <IonButton routerLink={'/create'}>Create</IonButton>}

          {!user.isAuthenticated && <IonButton routerLink={'/authportal'}>Sign In</IonButton>}
          {!user.isAuthenticated && (
            <IonButton
              routerLink={'/authportal'}
              className="bg-black text-white hover:bg-primary hover:text-black rounded-full px-2"
            >
              Sign Up
            </IonButton>
          )}

          {user.isAuthenticated && (
            <Link to={'/account'}>
              <IonButton
                gamertag={user.gamertag}
                image_profile={user.image_profile}
                className="relative w-12"
              >
                
                <div>
                  <img
                    className="h-8 w-8 m-auto bg-no-repeat bg-cover rounded-full z-20 absolute top-0 left-0 border-2 border-primary"
                    style={{
                      backgroundImage: `url(${user.image_profile && user.image_profile.url})`,
                    }}
                  />

                  <div
                    className="h-8 w-8 m-auto bg-no-repeat bg-cover absolute top-0 left-0 "
                  >
                    <div
                      
                      style={{ backgroundImage: `url(${ProfilePlaceholder})` }}
                      alt={`Profile name ${gamertag}`}
                    >
                      {/* /* Change default to placeholder image */}
                      <Gravatar
                        size={1600}
                        rating="pg"
                        default={ProfilePlaceholder}
                        email={user.email}
                        className="bg-no-repeat bg-cover rounded-full overflow-hidden absolute top-0 left-0 "
                      />
                    </div>
                  </div>
                </div>
              </IonButton>
            </Link>
          )}
          <IonMenuButton className="" />
        </div>
      )}
    </div>
  );
};
