import { IonCardContent } from '@ionic/react';
import ReactPlayer from "react-player"
import { Link } from 'react-router-dom';

const CardTwitch = ({ twitchId, link1, height, gamertag, games, id }) => {
  return (
    <div className="relative">
      {link1 && (
        <Link to={link1} className="w-full h-full z-30 hover:bg-primary absolute -mb-4 rounded-3xl">
          
        </Link>
      )}
      <IonCardContent className="bg-purple-300 flex flex-col text-center rounded-3xl border-none p-4 sm:w-full z-10">
        
          <ReactPlayer
            url={`https://www.twitch.tv/${twitchId}`}
            width="99.99%"
            height={height}
            controls={false}
            muted={true}
            playing={true}
          />
          {gamertag && (
          <div className="pt-4">
            <h1>{gamertag}</h1>
          </div>
          )}
          {games && (
            <div className="items-end rounded-3xl mt-2 p-1 body-small text-xs bg-dark text-white hover:bg-white hover:text-dark">
              {games <= 0 ? (
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
            </div>
          )}
      </IonCardContent>
    </div>
  );
};

export default CardTwitch;
