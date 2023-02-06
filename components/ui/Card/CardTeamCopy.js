import { Link } from 'react-router-dom';
import { IonCardContent } from '@ionic/react';

/* Images */
import ProfilePlaceholder from '../../assets/images/profile_placeholder.png';

const CardTeamCopy = ({ id, image_profile, name, username, games, organisation }) => {
  return (
    <div className="grid text-center border-none rounded-3xl bg-light hover:bg-primary">
      <IonCardContent>
        <Link to={`/team/${username}`}>
          <div className="">
            <div>
              {image_profile ? (
                <div
                  className="mx-auto bg-cover bg-no-repeat h-28 w-28 image-placeholder rounded-full"
                  /* className="hexagonImage element image-placeholder" */
                  style={{
                    backgroundImage: `url(${image_profile && image_profile.url})`,
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
            <div className="">
              {organisation <= 0 ? (
                <div>Independent</div>
              ) : (
                <p>
                  {organisation?.sort(() => Math.random() - 0.5).slice(0, 1) ||
                    organisation?.name?.sort(() => Math.random() - 0.5).slice(0, 1)}
                </p>
              )}
            </div>
          </div>
        </Link>
        {!games ? (
          <div className="items-end rounded-3xl mt-2 p-1 body-small text-xs bg-dark text-white hover:bg-white hover:text-dark"> 
            No game
          </div>
        ) : (
          <Link
            to={`/game/${id}`}
            className="items-end rounded-3xl mt-2 p-1 body-small text-xs bg-dark text-white hover:bg-white hover:text-dark"
          >
            {games?.sort(() => Math.random() - 0.5).slice(0, 1) ||
              games?.name.sort(() => Math.random() - 0.5).slice(0, 1)}
          </Link>
        )}
      </IonCardContent>
    </div>
  );
};

export default CardTeamCopy;
