import { Link } from 'react-router-dom';
import { IonCardContent } from '@ionic/react';
import { useSelector } from 'react-redux';

/* Images */
import ProfilePlaceholder from '../../assets/images/profile_placeholder.png';
import Gravatar from 'react-gravatar';

const CardUsers = () => {

    const users = useSelector((state) => state.allUsers.users);

    const renderList = users.sort(() => Math.random() - 0.5).map(user => {
        const {id, username, image_profile, gamertag, teams, games} = user;
        return (

            <div>
                <p>{username}</p>
            </div>
            
        /* <div className="text-center border-none rounded-3xl bg-light hover:bg-primary h-full">
            <IonCardContent className="flex flex-col h-full" key={id}>
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
                        </div>
                    ) : (
                        <div
                        className="mx-auto bg-cover bg-no-repeat h-28 w-28 image-placeholder rounded-full placeholder overflow-hidden text-transparent"
                        
                        style={{ backgroundImage: `url(${ProfilePlaceholder})` }}
                        alt={`Profile name ${gamertag}`}
                        >
                       
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
                    {teams <= 0 ? (
                        <div>
                        Independent
                        </div>
                    ) : (
                        <p>
                        {teams?.sort(() => Math.random() - 0.5).slice(0, 1) ||
                            teams?.name.sort(() => Math.random() - 0.5).slice(0, 1)}
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
        </div> */
      );
    })

    return(
        <>
            {renderList}
        </>
    )
}

export default CardUsers