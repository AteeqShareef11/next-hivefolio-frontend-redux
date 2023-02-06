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
  IonToast,
  IonToolbar,
} from '@ionic/react';
import { useState, useEffect } from 'react';

import { Link, useHistory, useParams } from 'react-router-dom';

/* User */
import { useCurrentUser } from '../context/AuthContext';

/* Components */
import { NavButtons } from '../ui/Buttons/NavButtons';
import Hexagon from '../ui/Hexagon/Hexagon';
import NavigationAccordion from '../ui/Navigation/NavigationAccordion';
import Footer from '../ui/Footer/Footer';
import ProfilePlaceholder from '../assets/images/profile_placeholder.png';
import hexagon_background from '../assets/images/hexagon_background.png';
import CardGrid from '../ui/CardGrid/CardGrid';

/* Redux */
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeamId } from '../redux/actions/teamActions';
import { fetchJob } from '../redux/actions/jobActions';

const EditJobMedia = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  /* const [user, setUser ] = useState({}) */
  const user = useCurrentUser();
  const history = useHistory();

  const team = useSelector(state => state.team);
  const job = useSelector(state => state.job);

  const [showToast1, setShowToast1] = useState(false);

  // Used for the edit form
  const [username, setUsername] = useState('');
  const [image, setImage] = useState(null);
  const [image_background, setimageBackground] = useState(null);
  const [image_1, setImage_1] = useState('');
  const [image_2, setImage_2] = useState('');
  const [image_3, setImage_3] = useState('');
  const [image_4, setImage_4] = useState('');
  const [image_feature_1, setImageFeature_1] = useState('');
  const [video_highlight_1, setVideo_1] = useState('');
  const [video_highlight_2, setVideo_2] = useState('');
  const [video_highlight_3, setVideo_3] = useState('');
  const [video_highlight_4, setVideo_4] = useState('');
  const [video_feature_1, setVideoFeature_1] = useState('');
  const [file, setFile] = useState(null);
  const [file2, setFile2] = useState(null);
  const [file3, setFile3] = useState(null);
  const [file4, setFile4] = useState(null);
  const [file5, setFile5] = useState(null);
  const [file6, setFile6] = useState(null);
  const [file7, setFile7] = useState(null);
  //const [team, setTeam] = useState({});
  const [error, setError] = useState('');
  const [showLoading, setShowLoading] = useState(true);
  const [update, setUpdate ] = useState(false);

  const fetchTeam = async () => {
    try {
      const res = await fetch(`https://hivefolio.herokuapp.com/api/jobs/${id}`);
      const data = await res.json();

      setUsername(data.username)
      setImage(data.image_profile);
      setimageBackground(data.image_background);
      setImage_1(data.image_highlight_1);
      setImage_2(data.image_highlight_2);
      setImage_3(data.image_highlight_3);
      setImage_4(data.image_highlight_4);
      setImageFeature_1(data.image_feature_1);
      setVideo_1(data.video_highlight_1);
      setVideo_2(data.video_highlight_2);
      setVideo_3(data.video_highlight_3);
      setVideo_4(data.video_highlight_4);
      setVideoFeature_1(data.video_feature_1);
      setShowLoading(false);
    } catch (err) {
      setShowLoading(false);
      console.error(err);
    }
  };

  /* const adminId = team.admins?.find((person) => {
    return person.id === user.id;
  }) */


  /* Upload file funtion */
  const uploadImage = async file => {
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
      const imageBackgroundId = jsonRes[0].id;
      const image_1Id = jsonRes[0].id;
      const image_2Id = jsonRes[0].id;
      const image_3Id = jsonRes[0].id;
      const image_4Id = jsonRes[0].id;
      const image_featured_1Id = jsonRes[0].id;
      return imageId, imageBackgroundId, image_1Id, image_2Id, image_3Id, image_4Id, image_featured_1Id;
    } catch (e) {
      console.error('Could not upload image');
      throw e;
    }
  };

  /* Edit data */
  const handleEditSubmit = async event => {
    event.preventDefault();
    setShowLoading(true);
    let imageId = '';
    let imageBackgroundId = '';
    let image_1Id = '';
    let image_2Id = '';
    let image_3Id = '';
    let image_4Id = '';
    let image_featured_1Id = '';
    const request = {
      video_highlight_1,
      video_highlight_2,
      video_highlight_3,
      video_highlight_4,
      video_feature_1
    };

    try {
      if (file) {
        imageId = await uploadImage(file);
        request['image_profile'] = imageId;
      }

      if (file2) {
        imageBackgroundId = await uploadImage(file2);
        request['image_background'] = imageBackgroundId;
      }

      if (file3) {
        image_1Id = await uploadImage(file3);
        request['image_highlight_1'] = image_1Id;
      }

      if (file4) {
        image_2Id = await uploadImage(file4);
        request['image_highlight_2'] = image_2Id;
      }

      if (file5) {
        image_3Id = await uploadImage(file5);
        request['image_highlight_3'] = image_3Id;
      }

      if (file6) {
        image_4Id = await uploadImage(file6);
        request['image_highlight_4'] = image_4Id;
      }

      if (file7) {
        image_featured_1Id = await uploadImage(file7);
        request['image_feature_1'] = image_featured_1Id;
      }

      const res = await fetch(`https://hivefolio.herokuapp.com/api/teams/${id}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(request),
      });
      const data = await res.json();
      fetchTeam();

    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    fetchTeam();
    dispatch(fetchJob(id));
  }, [job]);

  return (
    <IonPage>
      <IonHeader>
        <title>Edit Job Media - {team.title}</title>
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

        {/* <div className="m-auto">
          <IonLoading
            cssClass='my-custom-class'
            isOpen={showLoading}
            onDidDismiss={() => setShowLoading(false)}
            message={'Please wait...'}
          />
        </div> */}

          {/* {(!showLoading && !adminId) && (history.push(`/team/${team.username}`))} */}

          <div className="mt-8 mx-8">
            <h1>{job.title}</h1>
            <Link to={`/job/${id}`}>
              <button className="bg-primary sm-mt-4 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-dark hover:bg-dark hover:text-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500">
                View {job.title}'s profile
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
                style_02="bg-primary"

                link_03="edit-members"
                link_03_title="Members"
                style_03="hover:bg-primary"

                link_04="edit-settings"
                link_04_title="Settings"
                style_04="hover:bg-primary"
              />

              <h3>Media</h3>
              <div className="mb-8 bg-white rounded-lg shadow overflow-hidden">
                {/* Form */}
                <form
                  className="divide-y divide-gray-200 lg:col-span-9"
                  onSubmit={handleEditSubmit}
                >
                  {/* Section 1 */}
                  <div className="bg-light mb-8 grid grid-cols-1 lg:gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                    {/* Title */}
                    <section className="lg:col-start-1">
                      <div className="px-4 py-5">
                        <h4>Profile image</h4>
                      </div>
                    </section>

                    {/* Content */}
                    <section className="col-span-2">
                      <div className="px-4 py-5">
                        <div className="">
                          <div className=" relative rounded-full overflow-hidden mb-8">

                          {job.image_profile ? (
                              <div
                                className="mx-auto bg-cover bg-no-repeat h-28 w-28 image-placeholder rounded-full"
                                style={{
                                  backgroundImage: `url(${job.image_profile && job.image_profile.url})`,
                                }}
                                alt={`Profile name ${job.name}`}
                              >
                              </div>
                            ) : (
                              <div
                                className="mx-auto bg-cover bg-no-repeat h-28 w-28 image-placeholder rounded-full placeholder overflow-hidden text-transparent"
                                /* className="hexagonImage element placeholder overflow-hidden text-transparent" */
                                style={{ backgroundImage: `url(${ProfilePlaceholder})` }}
                                alt={`Profile name ${job.name}`}
                              >
                                
                              </div>
                            )}

                            <label
                              for="user-photo"
                              className="absolute inset-0  bg-black bg-opacity-75 flex items-center justify-center text-sm font-medium text-white opacity-0 hover:opacity-100 focus-within:opacity-100"
                            >
                              <span>Change</span>
                              <span className="sr-only">Profile image</span>
                              <input
                                type="file"
                                id="user-photo"
                                name="user-photo"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
                                onChange={event => setFile(event.target.files[0])}
                              />
                            </label>
                          </div>
                          {/* Button */}
                          <div className="ml-5 rounded-md shadow-sm">
                            <div className="group relative border bg-primary text-dark hover:bg-dark hover:text-white rounded-md py-2 px-3 flex items-center justify-center focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-light-blue-500">
                              <label
                                for="user_photo"
                                className="relative text-sm leading-4 font-medium text-gray-700 pointer-events-none"
                              >
                                <span>Change image</span>
                                <span className="sr-only">Profile image</span>
                              </label>
                              <input
                                id="user_photo"
                                name="user_photo"
                                type="file"
                                className="absolute w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
                                onChange={event => setFile(event.target.files[0])}
                              />
                              {error && <p>{error.message}</p>}
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>

                  {/* Section 2 */}
                  <div className="bg-light mb-8 grid grid-cols-1 lg:gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                    {/* Title */}
                    <section className="lg:col-start-1 w-full">
                      <div className="px-4 py-5">
                        <h4>Background image</h4>
                      </div>
                    </section>

                    {/* Content */}
                    <section className="col-span-2">
                      <div className="px-4 py-5">
                        <div className="flex m-auto w-full">
                          <div className="w-full">
                            <div className=" relative rounded-lg overflow-hidden w-full mb-8 bg-white">


                              { job.image_background ? (
                                  <img className="relative w-full h-80 bg-no-repeat bg-cover overflow-hidden " 
                                  style={{
                                      backgroundImage: `url(${job.image_background && job.image_background.url})`
                                  }}
                                  />
                              ) : (
                                <div
                                  className="rounded-3xl border-none p-4 sm:w-full h-40 bg-cover bg-no-repeat"
                                  style={{ backgroundImage: `url(${hexagon_background})` }}
                                ></div>
                              )}

                              <label
                                for="user-photo"
                                className="absolute inset-0  bg-black bg-opacity-75 flex items-center justify-center text-sm font-medium text-white opacity-0 hover:opacity-100 focus-within:opacity-100"
                              >
                                <span>Change</span>
                                <span className="sr-only">Background image</span>
                                <input
                                  type="file"
                                  id="user-photo"
                                  name="user-photo"
                                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
                                  onChange={event => setFile2(event.target.files[0])}
                                />
                              </label>
                            </div>

                           

                            {/* Button */}
                            <div className="rounded-md shadow-sm">
                              <div className="group relative border bg-primary text-dark hover:bg-dark hover:text-light rounded-md py-2 px-3 flex items-center justify-center focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-light-blue-500">
                                <label
                                  for="user_photo"
                                  className="relative text-sm leading-4 font-medium text-gray-700 pointer-events-none"
                                >
                                  <span>Change image</span>
                                  <span className="sr-only">Background image</span>
                                </label>
                                <input
                                  id="user_photo"
                                  name="user_photo"
                                  type="file"
                                  className="absolute w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
                                  onChange={event => setFile2(event.target.files[0])}
                                />
                                {error && <p>{error.message}</p>}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>

                  
                    
                  {/* Save */}
                  <div className="mt-4 py-4 px-4 flex justify-end sm:px-6 divide-y divide-gray-200">
                    <button
                      type="button"
                      className="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
                    >
                      Cancel
                    </button>
                    <button
                      className="ml-5 bg-primary text-dark hover:bg-dark hover:text-light border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
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

export default EditJobMedia;
