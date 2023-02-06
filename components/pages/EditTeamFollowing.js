import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonPage,
  IonRouterLink,
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

const EditFollowing = ({ match }) => {
  const { id } = match.params;

  const dispatch = useDispatchCurrentUser();
  /* const [user, setUser ] = useState({}) */
  const [loading, setLoading] = useState(true);
  const user = useCurrentUser();
  const history = useHistory();

  const [showToast1, setShowToast1] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [edit, setEdit] = useState(false);

  // Used for the edit form
  const [team, setTeam] = useState({});
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [tiktok, setTiktok] = useState('');
  const [twitch, setTwitch] = useState('');
  const [youtube, setYoutube] = useState('');
  const [discord, setDiscord] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [twitter, setTwitter] = useState('');
  const [xbox, setXbox] = useState('');
  const [playstation, setPlaystation] = useState('');
  const [nintendo, setNintendo] = useState('');
  const [steam, setSteam] = useState('');
  const [epic, setEpic] = useState('');
  const [website, setWebsite] = useState('');
  const [store, setStore] = useState('');

  const fetchTeam = async () => {
    try {
      const res = await fetch(`https://hivefolio.herokuapp.com/api/teams/${id}`);
      const data = await res.json();

      setTeam(data);
      setFacebook(data.facebook);
      setInstagram(data.instagram);
      setTiktok(data.tiktok);
      setTwitch(data.twitch);
      setYoutube(data.youtube);
      setDiscord(data.discord);
      setLinkedin(data.linkedin);
      setTwitter(data.twitter);
      setXbox(data.xbox);
      setPlaystation(data.playstation);
      setNintendo(data.nintendo);
      setSteam(data.steam);
      setEpic(data.epic);
      setWebsite(data.website);
      setStore(data.store);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  /* Edit data */

  const handleEditSubmit = async event => {
    event.preventDefault();

    const res = await fetch(`https://hivefolio.herokuapp.com/api/teams/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        facebook,
        twitter,
        instagram,
        twitch,
        tiktok,
        youtube,
        discord,
        linkedin,
        xbox,
        playstation,
        nintendo,
        steam,
        epic,
        website,
        store,
      }),
    });

    const data = await res.json();
    fetchTeam();
    window.location.reload();
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <title>Edit Team Following - {username}</title>
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
          <div className="mt-8 mx-8">
            <h1>{team.name}</h1>
            <Link to={`/team/${team.username}`}>
              <button className="bg-primary sm-mt-4 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-dark hover:bg-dark hover:text-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500">
                View {team.name}'s profile
              </button>
            </Link>
          </div>

          <main className="relative ">
            <div className="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8">
              <NavigationAccordion
                header="Menu"
                link_01="edit"
                link_01_title="Overall"
                style_01="hover:bg-primary"

                link_02="edit-media"
                link_02_title="Media"
                style_02="hover:bg-primary"

                link_03="edit-members"
                link_03_title="Members"
                style_03="hover:bg-primary"

                link_04="edit-social"
                link_04_title="Social"
                style_04="hover:bg-primary"

                link_05="edit-following"
                link_05_title="Following"
                style_05="bg-primary"

                link_06="edit-streams"
                link_06_title="Streams"
                style_06="hover:bg-primary"

                link_07="edit-settings"
                link_07_title="Settings"
                style_07="hover:bg-primary"
              />
              <h3>Following</h3>
              <div className="mb-8 bg-white rounded-lg shadow overflow-hidden">
                {/* Form */}
                <form
                  className="divide-y divide-gray-200 lg:col-span-9"
                  onSubmit={handleEditSubmit}
                >
                  {/* Section 3 */}
                  <div className="bg-light mb-8 grid grid-cols-1 lg:gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                    {/* Title */}
                    <section className="lg:col-start-1 w-full">
                      <div className="px-4 py-5">
                        <h4>Title here</h4>
                      </div>
                    </section>

                    {/* Content */}
                    <section className="col-span-2">
                      <div className="px-4 py-5">
                        <h4>Content here</h4>
                      </div>
                    </section>
                  </div>

                  <div className="pt-6 divide-y divide-gray-200">
                    {/* Save */}
                    <div className="mt-4 py-4 px-4 flex justify-end sm:px-6">
                      <button
                        type="button"
                        className="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
                      >
                        Cancel
                      </button>
                      <button
                        className="ml-5 bg-primary border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-dark hover:bg-dark hover:text-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
                        onClick={() => setShowToast1(true)}
                        expand="block"
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
                  </div>
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

export default EditFollowing;
