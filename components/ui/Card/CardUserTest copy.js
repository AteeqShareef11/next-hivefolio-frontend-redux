import { Link } from 'react-router-dom';
import { IonCardContent } from '@ionic/react';

import { useSelector } from 'react-redux';

/* Images */
import ProfilePlaceholder from '../../assets/images/profile_placeholder.png';
import Gravatar from 'react-gravatar';

const CardUserTest = ({  }) => {

  const users = useSelector((state) => state.users.allUsers.users);
  const { id, username, image_profile, email, gamertag, teams, games } = users;
  
    return (

      <div className="text-center border-none rounded-3xl bg-light hover:bg-primary h-full" key={id}>
        <IonCardContent className="flex flex-col h-full">
          <Link to={`/usertest/${username}`}>
            <div className="">
              <div>
                {image_profile ? (
                  <div
                    className="mx-auto bg-cover bg-no-repeat h-28 w-28 image-placeholder rounded-full"
                    style={{
                      backgroundImage: `url(${image_profile && image_profile.url})`,
                    }}
                    alt={`Profile name ${gamertag}`}
                  >
                    {/* <svg viewBox="-75 -50 150 100">
                      <defs>
                        <clipPath id="clip-shape" clipPathUnits="objectBoundingBox">
                          <path d="M1,0.284 C1,0.428,1,0.572,1,0.716 C0.999,0.718,0.998,0.72,0.998,0.722 C0.993,0.747,0.979,0.766,0.954,0.779 C0.818,0.849,0.681,0.919,0.545,0.988 C0.515,1,0.484,1,0.454,0.988 C0.318,0.919,0.182,0.849,0.046,0.779 C0.015,0.764,0,0.74,0,0.709 C0,0.569,0,0.431,0,0.292 C0,0.26,0.015,0.236,0.046,0.221 C0.182,0.151,0.318,0.081,0.454,0.012 C0.484,-0.004,0.515,-0.004,0.545,0.012 C0.681,0.081,0.818,0.151,0.954,0.222 C0.968,0.229,0.979,0.243,0.989,0.255 C0.995,0.263,0.996,0.274,1,0.284"></path>
                        </clipPath>
                      </defs>
                    </svg> */}
                  </div>
                ) : (
                  <div
                    className="mx-auto bg-cover bg-no-repeat h-28 w-28 image-placeholder rounded-full placeholder overflow-hidden text-transparent"
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
                      className="CustomAvatar-image overflow-hidden"
                    />
                  </div>
                )}
              </div>
              <div className="pt-4">
                <h1>{gamertag}</h1>
              </div>
              <div className="">

                {/* {teams ? (
                  <p>
                    {teams.sort(() => Math.random() - 0.5).slice(0, 1).map((teamList) => teamList.name)}
                  </p>
                ) : (
                  
                  <div>
                    Independent
                  </div>
                )} */}

              {/* {teams <= 0 ? (
                <div>
                  Independent
                </div>
              ) : (
                <p>
                  {teams?.sort(() => Math.random() - 0.5).slice(0, 1) ||
                    teams?.name.sort(() => Math.random() - 0.5).slice(0, 1)}
                </p>
              )} */}
                
              </div>
            </div>
          </Link>
          {!games ? (
            <div className="items-end rounded-3xl mt-2 p-1 body-small text-xs bg-dark text-white hover:bg-white hover:text-dark"> 
              No game
            </div>
          ) : (
            <Link
              to={`/game/${games.id}`}
              className="items-end rounded-3xl mt-2 p-1 body-small text-xs bg-dark text-white hover:bg-white hover:text-dark"
            >
              {games.sort(() => Math.random() - 0.5).slice(0, 1).map((teamList) => teamList.name)}
            </Link>
          )}
        </IonCardContent>
      </div>
    );


  /* return (
    <>
      {renderList}
    </>
  ) */

  
};

export default CardUserTest;
