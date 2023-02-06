import { Link } from 'react-router-dom';
import { IonCardContent } from '@ionic/react';

import { useDispatch, useSelector } from 'react-redux';


const CardSkeleton = ({ full, responsive, list }) => {

  
  
  return (

    <div>
      {full === true && (
        <div className="flex flex-col border-none rounded-3xl p-4">

            <div className="flex flex-col space-y-4">
              <div>

                  <div
                    className="mx-auto bg-cover bg-no-repeat h-28 w-28 image-placeholder rounded-full bg-gray-400 animate-pulse"
                    /* style={{
                      backgroundImage: `url(${image_profile && image_profile.url})`,
                    }} */
                  >

                  </div>

              </div>
              <div className="flex flex-col space-y-2">
                <div className="w-full h-4 rounded-full bg-gray-400 animate-pulse"></div>
                <div className="w-full h-4 rounded-full bg-gray-400 animate-pulse"></div>
                <div className="w-full h-4 rounded-full bg-gray-400 animate-pulse"></div>
              </div>
            </div>


        </div>
      )}

      {/*  */}


      { responsive === true && (

      <div>

      <IonCardContent className="grid text-center border-none rounded-3xl bg-light hover:bg-primary xxs:hidden xs:hidden sm:hidden md:block lg:block xl:block">
      <Link to={`/user/${username}`}>
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
                {team <= 0 ? (
                  <div>
                    Independent
                  </div>
                ) : (
                  <p>
                    {team?.sort(() => Math.random() - 0.5).slice(0, 1) ||
                      team?.name.sort(() => Math.random() - 0.5).slice(0, 1)}
                  </p>
                )}
                
              </div>
            </div>
          </Link>
          {games <= 0 ? (
            <div className="items-end rounded-3xl mt-2 p-1 body-small text-xs bg-dark text-white hover:bg-white hover:text-dark"> 
              No game
            </div>
          ) : (
            <Link
              to={`/game/${games?.id}`}
              className="items-end rounded-3xl mt-2 p-1 body-small text-xs bg-dark text-white hover:bg-white hover:text-dark"
            >
              {games?.sort(() => Math.random() - 0.5).slice(0, 1) ||
                games?.name.sort(() => Math.random() - 0.5).slice(0, 1)}
            </Link>
          )}
      </IonCardContent>


      <IonCardContent className="m-0 flex flex-row flex-wrap w-full xxs:block xs:block sm:block md:hidden lg:hidden xl:hidden">
      <Link to={`/user/${username}`}>
        <div class="flex flex-row bg-light w-full px-6 py-4 whitespace-nowrap">
          <div class="flex justify-between items-center w-full">
            <div className="flex flex-row">

              <div class="flex-shrink-0 h-10 ">
                {image_profile ? (
                  <div
                    className=" h-10 w-10 rounded-full bg-cover bg-no-repeat my-auto "
                    style={{
                      backgroundImage: `url(${image_profile && image_profile.url})`,
                    }}
                    alt={`Profile name ${gamertag}`}
                  >
                    <svg className="clip-svg ">
                      <defs>
                        <clipPath id="clip-shape" clipPathUnits="objectBoundingBox">
                          <path d="M1,0.284 C1,0.428,1,0.572,1,0.716 C0.999,0.718,0.998,0.72,0.998,0.722 C0.993,0.747,0.979,0.766,0.954,0.779 C0.818,0.849,0.681,0.919,0.545,0.988 C0.515,1,0.484,1,0.454,0.988 C0.318,0.919,0.182,0.849,0.046,0.779 C0.015,0.764,0,0.74,0,0.709 C0,0.569,0,0.431,0,0.292 C0,0.26,0.015,0.236,0.046,0.221 C0.182,0.151,0.318,0.081,0.454,0.012 C0.484,-0.004,0.515,-0.004,0.545,0.012 C0.681,0.081,0.818,0.151,0.954,0.222 C0.968,0.229,0.979,0.243,0.989,0.255 C0.995,0.263,0.996,0.274,1,0.284"></path>
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                ) : (
                  <div
                    className=" h-10 w-10 rounded-full bg-cover bg-no-repeat my-auto text-transparent"
                    style={{ backgroundImage: `url(${ProfilePlaceholder})` }}
                    alt={`Profile name ${gamertag}`}
                  >
                    {/* Change default to placeholder image */}
                    <Gravatar
                      email={email}
                      size={1600}
                      rating="pg"
                      default={ProfilePlaceholder}
                      className="CustomAvatar-image overflow-hidden h-10 w-10 rounded-full bg-cover bg-no-repeat my-auto "
                    />
                  </div>
                )}
              </div>
              <div class="ml-4">
                <div class="text-sm font-medium text-gray-900">{gamertag}</div>
                <div class="text-sm text-gray-500">@{username}</div>
              </div>
            </div>
            <div class="px-6 py-4 whitespace-nowrap">
              {/* <div class="text-sm text-gray-900">Regional Paradigm Technician</div>
                                  <div class="text-sm text-gray-500">Optimization</div> */}
            </div>
          
          </div>
        </div>
        </Link>
      </IonCardContent>

      </div>
      )
      }


      { list === true && (

      <IonCardContent className="flex flex-row flex-wrap w-full m-0">
      <Link to={`/user/${username}`}>
      <div class="flex flex-row bg-light w-full px-6 py-4 whitespace-nowrap">
        <div class="flex justify-between items-center w-full">
          <div className="flex flex-row">

            <div class="flex-shrink-0 h-10 ">
              {image_profile ? (
                <div
                  className=" h-10 w-10 rounded-full bg-cover bg-no-repeat my-auto "
                  style={{
                    backgroundImage: `url(${image_profile && image_profile.url})`,
                  }}
                  alt={`Profile name ${gamertag}`}
                >
                  <svg className="clip-svg ">
                    <defs>
                      <clipPath id="clip-shape" clipPathUnits="objectBoundingBox">
                        <path d="M1,0.284 C1,0.428,1,0.572,1,0.716 C0.999,0.718,0.998,0.72,0.998,0.722 C0.993,0.747,0.979,0.766,0.954,0.779 C0.818,0.849,0.681,0.919,0.545,0.988 C0.515,1,0.484,1,0.454,0.988 C0.318,0.919,0.182,0.849,0.046,0.779 C0.015,0.764,0,0.74,0,0.709 C0,0.569,0,0.431,0,0.292 C0,0.26,0.015,0.236,0.046,0.221 C0.182,0.151,0.318,0.081,0.454,0.012 C0.484,-0.004,0.515,-0.004,0.545,0.012 C0.681,0.081,0.818,0.151,0.954,0.222 C0.968,0.229,0.979,0.243,0.989,0.255 C0.995,0.263,0.996,0.274,1,0.284"></path>
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              ) : (
                <div
                  className=" h-10 w-10 rounded-full bg-cover bg-no-repeat my-auto text-transparent"
                  style={{ backgroundImage: `url(${ProfilePlaceholder})` }}
                  alt={`Profile name ${gamertag}`}
                >
                  {/* Change default to placeholder image */}
                  <Gravatar
                    email={email}
                    size={1600}
                    rating="pg"
                    default={ProfilePlaceholder}
                    className="CustomAvatar-image overflow-hidden h-10 w-10 rounded-full bg-cover bg-no-repeat my-auto "
                  />
                </div>
              )}
            </div>
            <div class="ml-4">
              <div class="text-sm font-medium text-gray-900">{gamertag}</div>
              <div class="text-sm text-gray-500">@{username}</div>
            </div>
          </div>
          <div class="px-6 py-4 whitespace-nowrap">
            {/* <div class="text-sm text-gray-900">Regional Paradigm Technician</div>
                                <div class="text-sm text-gray-500">Optimization</div> */}
          </div>
        
        </div>
      </div>
      </Link>
      </IonCardContent>

      )
      }


    </div>


    
  );
};

export default CardSkeleton;
