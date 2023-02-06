import { Link } from 'react-router-dom';
import { IonCardContent } from '@ionic/react';

const CardDiscord = ({ discord_channel }) => {
  return (
    <iframe 
      src={`https://discord.com/widget?id=${discord_channel}&theme=dark`} 
      //src="https://discord.com/widget?id=880931336611844096&theme=dark"
      width="99.99%"
      height="500" 
      allowtransparency="true" 
      frameborder="0" 
      sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
    >
    </iframe>
  );
};

export default CardDiscord;
