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
import { useRef, useEffect, useState } from 'react';
import { ExclamationIcon } from '@heroicons/react/outline';

import { Link, useHistory } from 'react-router-dom';

/* User */
import { useCurrentUser, useDispatchCurrentUser } from '../context/AuthContext';
import { callApi } from '../utils/utils';

/* Components */
import { NavButtons } from '../ui/Buttons/NavButtons';
import Hexagon from '../ui/Hexagon/Hexagon';
import NavigationAccordion from '../ui/Navigation/NavigationAccordion';
import Footer from '../ui/Footer/Footer';

const AccountSettings = ({ match }) => {
  const user = useCurrentUser();
  const { id } = user;

  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef();

  const dispatch = useDispatchCurrentUser();
  const [users, setUser] = useState({});
  const [showLoading, setShowLoading] = useState(true);

  const history = useHistory();

  const [showToast1, setShowToast1] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [edit, setEdit] = useState(false);
  const [accountValidate, setAccountValidate] = useState('');

  // Used for the edit form
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [tagline, setTagline] = useState('');
  const [team, setTeam] = useState({});
  const [error, setError] = useState('');

  const fetchUser = async () => {
    try {
      const res = await fetch(`https://hivefolio.herokuapp.com/api/users/${id}?populate=*`);
      const data = await res.json();

      setUser(data);
      setImage(data.image);
      setName(data.name);
      setIntroduction(data.introduction);
      setTagline(data.tagline);
      setShowLoading(false);
    } catch (err) {
      setShowLoading(false);
      console.error(err);
    }
  };

  /* Upload file funtion */
  const uploadImage = async () => {
    try {
      const formData = new FormData();
      formData.append('files', file);
      formData.append('fileInfo', JSON.stringify({ name: file.name }));
      const uploadRes = await fetch(`https://hivefolio.herokuapp.com/api/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      });
      if (!uploadRes.ok) {
        throw new Error('Could not upload file');
      }
      const jsonRes = await uploadRes.json();
      const imageId = jsonRes[0].id;
      return imageId;
    } catch (e) {
      console.error('Could not upload image');
      throw e;
    }
  };

  /* Edit data */
  const handleEditSubmit = async event => {
    event.preventDefault();
    let imageId = '';
    try {
      if (file) {
        imageId = await uploadImage();
      } else {
        imageId = image;
      }

      const res = await fetch(`https://hivefolio.herokuapp.com/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          name,
          image: imageId,
          introduction,
          tagline,
        }),
      });
      const data = await res.json();
      fetchUser();

      window.location.reload();
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  /* Delete data */
  const handleDelete = async () => {
    const res = await fetch(`https://hivefolio.herokuapp.com/api/users/${id}?populate=*`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const data = await res.json();
    setShowLoading(true);
    history.push('/');
  };

  return (
    <IonPage>
      <IonHeader>
        <title>Account Settings - {user.username}</title>
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

                link_05="account-settings"
                link_05_title="Settings"
                style_05="bg-primary"
              />
              <h3 className="">Settings</h3>
              <div className="mb-8 bg-white rounded-lg shadow overflow-hidden">
                <div className="divide-y divide-gray-200 lg:grid lg:divide-y-0 lg:divide-x">
                  {/* Form */}
                  <form
                    className="divide-y divide-gray-200 lg:col-span-9"
                    onSubmit={handleEditSubmit}
                  >
                    {/* Section 1 */}
                    <div className="bg-light mb-8 grid grid-cols-1 lg:gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                      {/* Title */}
                      <section className="lg:col-start-1 w-full">
                        <div className="px-4 py-5">
                          <h4>Delete user</h4>
                        </div>
                      </section>

                      {/* Content */}
                      <section className="col-span-2">
                        {/* IonModal */}

                        <IonButton 
                          /* className="bg-primary sm-mt-4 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-dark hover:bg-dark hover:text-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500" */
                          onClick={() => setShowModal(true)}
                        >
                            Delete user
                        </IonButton>

                        <IonModal
                          isOpen={showModal}
                          swipeToClose={true}
                          onDidDismiss={() => setShowModal(false)}>

                          <div className="sm:items-start m-8">
                            <div className="sm:flex">
                            <div className="mx-auto flex-shrink-0 flex items-center justify-center mt-2 h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                              <ExclamationIcon
                                className="h-6 w-6 text-red-600"
                                aria-hidden="true"
                              />
                            </div>
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left mb-4 w-full">
                              <h3>Account deletion</h3>
                              <div className="mt-2">
                                <h3 className="text-sm text-gray-500">
                                  Would you like to delete your account? 
                                </h3>
                                <p>Enter your username "{user.username}"</p>
                                <IonItem className="mb-4" >
                                  <IonLabel position="stacked">Write your username {user.username}</IonLabel>
                                  <IonInput 
                                    onIonChange={event => setAccountValidate(event.target.value)}
                                    placeholder="Username"
                                  ></IonInput>
                                </IonItem>
                              </div>
                              
                                {user.username === accountValidate && (
                                  <div className="mt-4">
                                    <p className="mb-4">CAUTION: This will permantely delete your account and you cannot recover it!</p>
                                    <button
                                      onClick={handleDelete}
                                      className="inline-flex items-center justify-center h-12  
                                          px-6 font-medium tracking-wide transition 
                                          duration-200 bg-dark text-light rounded-full hover:bg-primary hover:text-dark
                                          focus:shadow-outline focus:outline-none"
                                    >
                                      Delete this user
                                    </button>
                                  </div>
                                )}
                              
                            </div>
                            </div>
                          </div>
                          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                            <IonToast
                              isOpen={showToast1}
                              onDidDismiss={() => setShowToast1(false)}
                              message={`Your account ${user.username} has been deleted`}
                              duration={1000}
                            />
                          </div>
                            
                          <IonButton onClick={() => {setShowModal(false); setAccountValidate(null)}}>Close Modal</IonButton>
                        </IonModal>

                        
                        
                      </section>
                    </div>

                    {/* <!-- Privacy section --> */}
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
            </div>
          </main>
        </div>
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default AccountSettings;
