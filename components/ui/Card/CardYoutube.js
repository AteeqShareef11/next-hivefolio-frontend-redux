import { Link } from 'react-router-dom';
import { IonCardContent } from '@ionic/react';
import ReactPlayer from "react-player"

/* Images */
import ProfilePlaceholder from '../../assets/images/profile_placeholder.png';
import Gravatar from 'react-gravatar';

const CardYoutube = ({ video1 }) => {
  return (
    <IonCardContent className="bg-light rounded-3xl border-none p-4 sm:w-full">
      <ReactPlayer 
        url={`${video1}`}
        width="99.99%"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        controls={true}
        className="rounded-3xl w-full" 
      />
    </IonCardContent>
  );
};

export default CardYoutube;
