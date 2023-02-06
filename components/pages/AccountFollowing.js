import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonLoading,
  IonModal,
  IonPage,
  IonRouterLink,
  IonSpinner,
  IonToast,
  IonToolbar,
} from '@ionic/react';
import { useState, useEffect } from 'react';

import { Link, useHistory } from 'react-router-dom';

/* User */
import { useCurrentUser, useDispatchCurrentUser } from '../context/AuthContext';
import { callApi } from '../utils/utils';

/* Components */
import { NavButtons } from '../ui/Buttons/NavButtons';
import Hexagon from '../ui/Hexagon/Hexagon';
import NavigationAccordion from '../ui/Navigation/NavigationAccordion';
import Footer from '../ui/Footer/Footer';

import CarouselCards from '../ui/Carousel/CarouselCards';
import CardGrid from '../ui/CardGrid/CardGrid';
import CardTeam from '../ui/Card/CardTeam';
import CardOrganisation from '../ui/Card/CardOrganisation';
import CardGame from '../ui/Card/CardGame';
import CarouselProfiles from '../ui/Carousel/CarouselProfiles';
import CardCharacter from '../ui/Card/CardCharacter';

const AccountFollowing = ({ match }) => {
  const { id } = match.params;

  const user = useCurrentUser();
  const [users, setUsers] = useState({});
  const [team, setTeam] = useState({});
  const [organisations, setOrganisations] = useState({});
  const [games, setGames] = useState({});
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`https://hivefolio.herokuapp.com/api/users/${id}?populate=*`);
        const data = await res.json();

        setUsers(data);
        setShowLoading(false);
      } catch (err) {
        setShowLoading(false);
        console.error(err);
      }
    };

    fetchUser();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <title>Account Following - {user.username}</title>
        <IonToolbar className="">
            <IonRouterLink 
              routerLink="/" 
              className="flex pl-4 xs:hidden sm:hidden md:block lg:block xl:block"
            >
              <Hexagon/>
            </IonRouterLink>
            <IonButtons 
              slot="start"
              className='xs:block sm:block md:hidden lg:hidden xl:hidden'
            >
              <IonBackButton />
            </IonButtons>
            <IonButtons slot="end">
              <NavButtons/>
            </IonButtons>
          </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="">
        <div className="max-width">
          <div className="m-auto">
            <IonLoading
              cssClass='my-custom-class'
              isOpen={showLoading}
              onDidDismiss={() => setShowLoading(false)}
              message={'Please wait...'}
            />
          </div>
          <div className="mt-8 mx-8">
            <h1>{user.gamertag}</h1>
            <Link to={`/user/${user.username}`}>
              <button className="bg-primary sm-mt-4 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-dark hover:bg-dark hover:text-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500">
                View {user.gamertag}'s profile
              </button>
            </Link>
          </div>

          <main className="relative ">
            <div className="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8">
              <NavigationAccordion
                header="Menu"
                link_01="account"
                link_01_title="Overall"
                style_01="hover:bg-primary"

                link_02="account-media"
                link_02_title="Media"
                style_02="hover:bg-primary"

                link_03="account-social"
                link_03_title="Social"
                style_03="hover:bg-primary"

                link_04="account-streams"
                link_04_title="Streams"
                style_04="hover:bg-primary"

                link_05="account-following"
                link_05_title="Following"
                style_05="bg-primary"

                link_06="account-settings"
                link_06_title="Settings"
                style_06="hover:bg-primary"
              />
              <h3>Following</h3>
              <div className="mb-8 bg-white rounded-lg shadow overflow-hidden">
                {/* Form */}
                <form
                  className="divide-y divide-gray-200 lg:col-span-9" /* onSubmit={handleEditSubmit} */
                >
                  {/* Section 1 */}
                  <div className="bg-light mb-8 grid grid-cols-1 lg:gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                    {/* Title */}
                    <section className="lg:col-start-1 w-full">
                      <div className="px-4 py-5">
                        <h4>Users</h4>
                      </div>
                    </section>

                    {/* Content */}
                    <section className="col-span-2">
                      {/* <CardGrid
                        style1={
                          'grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 gap-4'
                        }
                      >
                        {user.teams.map(team => (
                          <CardTeam
                          id={team.id}
                          image_profile={team.image_profile}
                          name={team.name}
                        />
                        ))}
                      </CardGrid> */}
                    </section>
                  </div>

                  {/* Section 3 */}
                  <div className="bg-light mb-8 grid grid-cols-1 lg:gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                    {/* Title */}
                    <section className="lg:col-start-1 w-full">
                      <div className="px-4 py-5">
                        <h4>Teams</h4>
                      </div>
                    </section>

                    {/* Content */}
                    <section className="col-span-2">
                      <div className="px-4 py-5">
                        {/* <CarouselCards>
                                  {            
                                    user.teams.map(team => (
                                      <CardGame 
                                        id={team.id}
                                        image_profile={team.image_profile}
                                        name={team.name}
                                    />
                                  ))}
                                </CarouselCards> */}
                      </div>
                    </section>
                  </div>

                  {/* Section 3 */}
                  <div className="bg-light mb-8 grid grid-cols-1 lg:gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                    {/* Title */}
                    <section className="lg:col-start-1 w-full">
                      <div className="px-4 py-5">
                        <h4>Organisations</h4>
                      </div>
                    </section>

                    {/* Content */}
                    <section className="col-span-2">
                      <div className="px-4 py-5">
                        {/* <CarouselCards>
                                  {            
                                    user.organisations.map(organisation => (
                                      <CardGame 
                                        id={organisation.id}
                                        image_profile={organisation.image_profile}
                                        name={organisation.name}
                                    />
                                  ))}
                                </CarouselCards> */}
                      </div>
                    </section>
                  </div>

                  {/* Section 4 */}
                  <div className="bg-light mb-8 grid grid-cols-1 lg:gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                    {/* Title */}
                    <section className="lg:col-start-1 w-full">
                      <div className="px-4 py-5">
                        {/* <p>{games.name}</p>
                              <p>{user.username}</p> */}
                        <h4>Games</h4>
                      </div>
                    </section>

                    {/* Content */}
                    <section className="col-span-2">
                      <div className="px-4 py-5">
                        {/* <CarouselCards>
                                  {            
                                    user.games.map(game => (
                                      <CardGame 
                                        id={game.id}
                                        image_profile={game.image_profile}
                                        name={game.name}
                                    />
                                  ))}
                                </CarouselCards> */}
                      </div>
                    </section>
                  </div>

                  {/* Section 1 */}
                  <div className="bg-light mb-8 grid grid-cols-1 lg:gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                    {/* Title */}
                    <section className="lg:col-start-1 w-full">
                      <div className="px-4 py-5">
                        <h4>Characters</h4>
                      </div>
                    </section>

                    {/* Content */}
                    <section className="col-span-2">
                      <div className="px-4 py-5">
                        {/* <CarouselCards>
                                  {            
                                    user.followcharacter.id.character.map(character => (
                                      <CardGame 
                                        id={character.id}
                                        image_profile={character.image_profile}
                                        name={character.name}
                                    />
                                  ))}
                                </CarouselCards> */}
                      </div>
                    </section>
                  </div>

                  {/* <div className="pt-6 divide-y divide-gray-200">
                            
                          
                            <div className="mt-4 py-4 px-4 flex justify-end sm:px-6">
                              <button type="button" className="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500">
                                Cancel
                              </button>
                              <button  className="ml-5 bg-primary border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-dark hover:bg-dark hover:text-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
                              onClick={() => setShowToast1(true)} expand="block"
                              >
                                Save
                              </button>
                              <IonToast
                                isOpen={showToast1}
                                onDidDismiss={() => setShowToast1(false)}
                                message="Your settings have been saved."
                                duration={1000}
                              />
                            </div>
                          </div> */}
                </form>
              </div>
            </div>
          </main>
        </div>
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default AccountFollowing;
