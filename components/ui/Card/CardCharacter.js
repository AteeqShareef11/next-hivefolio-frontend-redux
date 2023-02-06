import { Link } from 'react-router-dom';
import { IonCardContent } from '@ionic/react';

/* Images */
import ProfilePlaceholder from '../../assets/images/profile_placeholder.png';

/* Redux */
import { useSelector } from 'react-redux';

const CardCharacter = ({
  id,
  image_profile,
  name,
  games,
  style1,
  style2,
  style3,
  character,
  full,
  responsive,
  list,
  noLink,
}) => {
  const allCharacters = useSelector(state => state.allData.characters);
  // console.log("All Character Data is here ====> ",allCharacters.data);
  let foundCharacter = null;
  if (allCharacters && allCharacters.data !== undefined && character && character !== undefined) {
    const matchCharacter = Array.isArray(allCharacters.data)
      ? allCharacters.data?.find(person => {
          return person?.id === character?.id;
        })
      : {};
    foundCharacter = matchCharacter;
  }

  return (
    <div>
      {full === true && (
        <IonCardContent className={style1}>
          <Link to={`/character/${id}`}>
            <div className="mx-auto">
              <div>
                {image_profile && image_profile.data !== null ? (
                  <div
                    className={style2}
                    style={{
                      backgroundImage: `url(${image_profile && image_profile.data.attributes.url})`,
                    }}
                    alt={`Profile name ${name}`}
                  >
                    {/* <svg className="clip-svg">
                                        <defs >
                                            <clipPath id="clip-shape" clipPathUnits="objectBoundingBox" >
                                                <path d="M1,0.284 C1,0.428,1,0.572,1,0.716 C0.999,0.718,0.998,0.72,0.998,0.722 C0.993,0.747,0.979,0.766,0.954,0.779 C0.818,0.849,0.681,0.919,0.545,0.988 C0.515,1,0.484,1,0.454,0.988 C0.318,0.919,0.182,0.849,0.046,0.779 C0.015,0.764,0,0.74,0,0.709 C0,0.569,0,0.431,0,0.292 C0,0.26,0.015,0.236,0.046,0.221 C0.182,0.151,0.318,0.081,0.454,0.012 C0.484,-0.004,0.515,-0.004,0.545,0.012 C0.681,0.081,0.818,0.151,0.954,0.222 C0.968,0.229,0.979,0.243,0.989,0.255 C0.995,0.263,0.996,0.274,1,0.284">
                                                </path>
                                            </clipPath>
                                        </defs>
                                    </svg> */}
                  </div>
                ) : (
                  <div
                    className={style3}
                    style={{ backgroundImage: `url(${ProfilePlaceholder})` }}
                    alt={`Profile name ${name}`}
                  ></div>
                )}
              </div>
              <div className="pt-4">
                <p>{name}</p>
              </div>
              <div className="">
                <p>{''}</p>
              </div>
            </div>
          </Link>

          {foundCharacter && (
            <div className="isolate flex -space-x-1 justify-center">
              {foundCharacter.attributes.players !== undefined &&
                foundCharacter.attributes.players.data
                  ?.sort(() => Math.random() - 0.5)
                  .slice(0, 8)
                  ?.map(player => (
                    <img
                      className="relative z-30 inline-block h-6 w-6 rounded-full ring-2 ring-white bg-white bg-cover bg-no-repeat image-placeholder"
                      style={{
                        backgroundImage: `url(${
                          player.attributes.image_profile &&
                          player.attributes.image_profile.data.attributes.url
                        })`,
                      }}
                      alt=""
                    />
                  ))}
            </div>
          )}

          {foundCharacter &&
            foundCharacter.attributes.games !== undefined &&
            Array.isArray(foundCharacter.attributes.games.data) &&
            foundCharacter.attributes.games.data.length > 0 && (
              <div className="items-end rounded-3xl mt-2 p-1 body-small text-xs bg-dark text-white">
                {foundCharacter.attributes.games.data
                  ?.sort(() => Math.random() - 0.5)
                  .slice(0, 1)
                  ?.map(item => item.attributes.name)}
              </div>
            )}
        </IonCardContent>
      )}

      {responsive === true && (
        <div>
          <div className="xxs:hidden xs:hidden sm:hidden md:block lg:block xl:block">
            <IonCardContent className="grid text-center border-none rounded-3xl bg-light hover:bg-primary">
              <Link to={`/character/${id}`}>
                <div className="">
                  <div>
                    {image_profile && image_profile.data !== null ? (
                      <div
                        className="mx-auto bg-cover bg-no-repeat h-28 w-28 image-placeholder rounded-full"
                        /* className="hexagonImage element image-placeholder" */
                        style={{
                          backgroundImage: `url(${
                            image_profile && image_profile.data.attributes.url
                          })`,
                        }}
                        alt={`Profile name ${name}`}
                      >
                        <svg className="clip-svg">
                          <defs>
                            <clipPath id="clip-shape" clipPathUnits="objectBoundingBox">
                              <path d="M1,0.284 C1,0.428,1,0.572,1,0.716 C0.999,0.718,0.998,0.72,0.998,0.722 C0.993,0.747,0.979,0.766,0.954,0.779 C0.818,0.849,0.681,0.919,0.545,0.988 C0.515,1,0.484,1,0.454,0.988 C0.318,0.919,0.182,0.849,0.046,0.779 C0.015,0.764,0,0.74,0,0.709 C0,0.569,0,0.431,0,0.292 C0,0.26,0.015,0.236,0.046,0.221 C0.182,0.151,0.318,0.081,0.454,0.012 C0.484,-0.004,0.515,-0.004,0.545,0.012 C0.681,0.081,0.818,0.151,0.954,0.222 C0.968,0.229,0.979,0.243,0.989,0.255 C0.995,0.263,0.996,0.274,1,0.284"></path>
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                    ) : (
                      <div
                        className="mx-auto bg-cover bg-no-repeat h-28 w-28 image-placeholder rounded-full placeholder overflow-hidden text-transparent"
                        /* className="hexagonImage element placeholder overflow-hidden text-transparent" */
                        style={{ backgroundImage: `url(${ProfilePlaceholder})` }}
                        alt={`Profile name ${name}`}
                      ></div>
                    )}
                  </div>
                  <div className="pt-4">
                    <p>{name}</p>
                  </div>
                </div>
              </Link>
              {foundCharacter && (
                <div className="isolate flex -space-x-1 justify-center">
                  {foundCharacter.attributes.players !== undefined &&
                    foundCharacter.attributes.players.data
                      ?.sort(() => Math.random() - 0.5)
                      .slice(0, 8)
                      ?.map(player => (
                        <img
                          className="relative z-30 inline-block h-6 w-6 rounded-full ring-2 ring-white bg-white bg-cover bg-no-repeat image-placeholder"
                          style={{
                            backgroundImage: `url(${
                              player.attributes.image_profile &&
                              player.attributes.image_profile.data.attributes.url
                            })`,
                          }}
                          alt=""
                        />
                      ))}
                </div>
              )}

              {foundCharacter &&
                foundCharacter.attributes.games !== undefined &&
                Array.isArray(foundCharacter.attributes.games.data) &&
                foundCharacter.attributes.games.data.length > 0 && (
                  <div className="items-end rounded-3xl mt-2 p-1 body-small text-xs bg-dark text-white">
                    {foundCharacter.attributes.games.data
                      ?.sort(() => Math.random() - 0.5)
                      .slice(0, 1)
                      ?.map(item => item.attributes.name)}
                  </div>
                )}
            </IonCardContent>
          </div>

          <IonCardContent className="flex flex-row flex-wrap w-full xxs:block xs:block sm:block md:hidden lg:hidden xl:hidden">
            <Link to={`/character/${id}`}>
              <div class="flex flex-row bg-light w-full px-6 py-4 whitespace-nowrap">
                <div class="flex justify-between items-center w-full">
                  <div className="flex flex-row">
                    <div class="flex-shrink-0 h-10 ">
                      {image_profile && image_profile.data !== null ? (
                        <div
                          className=" h-10 w-10 rounded-full bg-cover bg-no-repeat my-auto "
                          style={{
                            backgroundImage: `url(${
                              image_profile && image_profile.data.attributes.url
                            })`,
                          }}
                          alt={`Profile name ${name}`}
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
                          alt={`Profile name ${name}`}
                        ></div>
                      )}
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{name}</div>
                      <div class="text-sm text-gray-500">{name}</div>
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
      )}

      {list === true && (
        <IonCardContent className="flex flex-row flex-wrap w-full">
          <Link to={`/character/${id}`}>
            <div class="flex flex-row bg-light w-full px-6 py-4 whitespace-nowrap">
              <div class="flex justify-between items-center w-full">
                <div className="flex flex-row">
                  <div class="flex-shrink-0 h-10 ">
                    {image_profile && image_profile.data !== null ? (
                      <div
                        className=" h-10 w-10 rounded-full bg-cover bg-no-repeat my-auto "
                        style={{
                          backgroundImage: `url(${
                            image_profile && image_profile.data.attributes.url
                          })`,
                        }}
                        alt={`Profile name ${name}`}
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
                        alt={`Profile name ${name}`}
                      ></div>
                    )}
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{name}</div>
                    <div class="text-sm text-gray-500">{name}</div>
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
      )}

      {noLink === true && (
        <IonCardContent className={style1}>
          <div className="mx-auto">
            <div>
              {image_profile && image_profile.data !== null ? (
                <div
                  className={style2}
                  style={{
                    backgroundImage: `url(${image_profile && image_profile.data.attributes.url})`,
                  }}
                  alt={`Profile name ${name}`}
                >
                  {/* <svg className="clip-svg">
                                        <defs >
                                            <clipPath id="clip-shape" clipPathUnits="objectBoundingBox" >
                                                <path d="M1,0.284 C1,0.428,1,0.572,1,0.716 C0.999,0.718,0.998,0.72,0.998,0.722 C0.993,0.747,0.979,0.766,0.954,0.779 C0.818,0.849,0.681,0.919,0.545,0.988 C0.515,1,0.484,1,0.454,0.988 C0.318,0.919,0.182,0.849,0.046,0.779 C0.015,0.764,0,0.74,0,0.709 C0,0.569,0,0.431,0,0.292 C0,0.26,0.015,0.236,0.046,0.221 C0.182,0.151,0.318,0.081,0.454,0.012 C0.484,-0.004,0.515,-0.004,0.545,0.012 C0.681,0.081,0.818,0.151,0.954,0.222 C0.968,0.229,0.979,0.243,0.989,0.255 C0.995,0.263,0.996,0.274,1,0.284">
                                                </path>
                                            </clipPath>
                                        </defs>
                                    </svg> */}
                </div>
              ) : (
                <div
                  className={style3}
                  style={{ backgroundImage: `url(${ProfilePlaceholder})` }}
                  alt={`Profile name ${name}`}
                ></div>
              )}
            </div>
            <div className="pt-4">
              <p>{name}</p>
            </div>
            <div className="">
              <p>{''}</p>
            </div>
          </div>
          {/* <Link to={`/${id}`} className="self-end rounded-3xl mt-2 p-1 body-small text-xs bg-dark text-white hover:bg-white hover:text-dark">  
                        {genres[0] || genres.name}
                </Link> */}

          {/* {!games ? (
                    <div className="items-end rounded-3xl mt-2 p-1 body-small text-xs bg-dark text-white hover:bg-white hover:text-dark"> 
                        No game
                    </div>
                    ) : (
                    <Link
                        to={`/game/${id}`}
                        className="items-end rounded-3xl mt-2 p-1 w-full body-small text-xs bg-dark text-white hover:bg-white hover:text-dark"
                    >
                        {games?.sort(() => Math.random() - 0.5).slice(0, 1) ||
                        games?.name.sort(() => Math.random() - 0.5).slice(0, 1)}
                    </Link>
                )} */}
        </IonCardContent>
      )}
    </div>
  );
};

export default CardCharacter;
