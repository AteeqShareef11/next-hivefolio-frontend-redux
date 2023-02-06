import { Link } from 'react-router-dom';
import { 
    IonCardContent, 
  } from '@ionic/react';

/* Images */
import ProfilePlaceholder from '../../assets/images/profile_placeholder.png';
import Gravatar from 'react-gravatar';

const CardProfileSkeleton = () => {
    return (
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
            </div>


        </div>
          
    )
}

export default CardProfileSkeleton;