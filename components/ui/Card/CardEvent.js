import { Link } from 'react-router-dom';
import { 
    IonButton,
    IonCard,
    IonCardContent,
    IonIcon,
    IonItem,
    IonLabel, 
  } from '@ionic/react';

import { pin, wifi, wine, warning, walk } from 'ionicons/icons';

const CardEvent = ({ id, image_profile, name, description }) => {
    return (
        <div className="grid">
            <IonCardContent>

                <Link to={`/event/${id}`} >
                    <div>
                        <img 
                            src={image_profile && image_profile.url} 
                            alt={`Profile name ${name}`} 
                            className="rounded-3xl"/>
                    </div>
                    <div className="pt-4">
                        <p>{name}</p>
                    </div>
                    <div className="">
                        <p>{description}</p>
                    </div>
                </Link>

                {/* <Link to={`/event/${id}`} >
                    <IonCard>
                        <div>{image_profile}</div>
                        <IonItem>
                            <IonIcon icon={pin} slot="start" />
                            <IonLabel>{name}</IonLabel>
                            <IonButton fill="outline" slot="end">View more</IonButton>
                        </IonItem>

                        <IonCardContent>
                           {description}
                        </IonCardContent>
                    </IonCard>
                </Link> */}
            </IonCardContent>
        </div>
          
    )
}

export default CardEvent;