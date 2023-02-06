import { 
  IonBackButton,
  IonButtons, 
  IonContent, 
  IonHeader, 
  IonInput, 
  IonItem, 
  IonLabel, 
  IonPage, 
  IonRouterLink, 
  IonSpinner, 
  IonTitle, 
  IonToast, 
  IonToolbar 
} from '@ionic/react';
import { useEffect, useState } from 'react';
import {Link, useHistory} from 'react-router-dom'
import { useCurrentUser } from '../context/AuthContext';
import { callApi } from '../utils/utils';

/* Components */
import { NavButtons } from '../ui/Buttons/NavButtons';
import Hexagon from '../ui/Hexagon/Hexagon';
import Footer from '../ui/Footer/Footer';

/* Captcha */
import Recaptcha from 'react-google-invisible-recaptcha';

/* Redux */
import { useDispatch } from 'react-redux';
import { createTeam, fetchTeam } from '../redux/actions/coreActions'

const CreateTeam = () => {

  const [loading, setLoading] = useState(true);
  const [showToast1, setShowToast1] = useState(false);

  const [name, setName] = useState(''); 
  const [username, setUsername] = useState(''); 
  const [file, setFile] = useState(null);
  const [errorName, setErrorName] = useState('');
  const [errorUsername, setErrorUsername] = useState('');
  const [errorImageProfile, setErrorImageProfile] = useState('');
  const [error, setError] = useState('');

  const history = useHistory();

  const user = useCurrentUser();

  const dispatch = useDispatch();

  useEffect(() => {
    !user && (
    history.push(`/`))
  }, []);


  const handleSubmit = async (event) => {
    event.preventDefault()

    /* if(!user) {
      setError('Please sign in first') 
      return
    } */

    if(!name) {
        setErrorName('Please add a name')
        return
    }

    if(!username) {
      setErrorUsername('Please add a username')
      return
    }

    if(!file) {
        setErrorImageProfile('Please add a file')
        return
    }
    

    const formData = new FormData();
    formData.append('data', JSON.stringify({name, username: username.split(' ').join('')}));
    formData.append('files.image_profile', file)

    dispatch(createTeam(formData, history, fetchTeam))

}

  /* Test image preview */

  const [imagePreview, setImagePreview] = useState(null);
  

  const handleImageChange = (e) => {
    const selected = e.target.files[0];
    
    const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];
    if(selected && ALLOWED_TYPES.includes(selected.type)) {
      
      let reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result)        
      }
      reader.readAsDataURL(selected);
    } else {
      setError(true)
    }
  }

  return (
    <IonPage >
      <IonHeader >
        <title>Create Team</title>
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
      <IonContent fullscreen >
        <div className="max-width">
          {/* <div className="m-auto">
            {loading &&
              <IonSpinner/>
            }
          </div> */}
          <div className="mt-8 mx-8">
            <h1>Create a team</h1>
          </div>

              <main className="relative ">

                  <div className="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8">

                    <div className="mb-8 bg-white rounded-lg shadow overflow-hidden">
                      <div className="divide-y divide-gray-200 lg:grid lg:divide-y-0 lg:divide-x">
 
                        {/* Form */}
                        <form className="divide-y divide-gray-200 lg:col-span-9" onSubmit={handleSubmit}>
                          {/* Section 1 */}
                          <div className="bg-light mb-8 grid grid-cols-1 lg:gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">

                            {/* Title */}
                            <section className="lg:col-start-1 w-full">
                              <div className="px-4 py-5">  
                                <h4>Basic information</h4>
                              </div>
                            </section>

                            {/* Content */}
                            <section className="col-span-2">
                              <div className="px-4 py-5">
                                
                                <IonItem className="mb-4 rounded-lg" >
                                  <IonLabel position="stacked">Team name</IonLabel>
                                  <IonInput 
                                    placeholder="Name"
                                    value={name}
                                    onIonChange={(event) => setName(event.target.value)}
                                  ></IonInput>
                                </IonItem>
                                {errorName && <p>{errorName}</p>}

                                <IonItem className="mb-4 rounded-lg" >
                                  <IonLabel position="stacked">Team username</IonLabel>
                                  <IonInput 
                                    placeholder="Username"
                                    value={username}
                                    onIonChange={(event) => setUsername(event.target.value)}
                                  ></IonInput>
                                </IonItem>
                                {errorUsername && <p>{errorUsername}</p>}                                
                              </div>

                            </section>
                            </div>


                          {/* Section 2 */}
                          <div className="bg-light mb-8 grid grid-cols-1 lg:gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">

                          {/* Title */}
                          <section className="lg:col-start-1 w-full">
                            <div className="px-4 py-5">  
                              <h4>Image</h4>
                            </div>
                          </section>

                          {/* Content */}
                          <section className="col-span-2">
                            

                            
                            {!imagePreview ? ( 
                              <div>
                            <label className="px-4 py-5"
                            htmlFor="fileUpload">
                            </label>  
                            <input 
                              type="file"
                              placeholder="Add a file"
                              /* onChange={
                                (event) => setFile(event.target.files[0]),
                                handleImageChange} */
                              className="sr-only" />  
                              
                              <div className="mt-1 sm:mt-0 sm:col-span-2 px-4">
                                <div className="w-full flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                  <div className="space-y-1 text-center ">
                                    <svg
                                      className="mx-auto h-12 w-12 text-gray-400"
                                      stroke="currentColor"
                                      fill="none"
                                      viewBox="0 0 48 48"
                                      aria-hidden="true"
                                    >
                                      <path
                                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                    
                                    <div className="flex text-sm text-gray-600">
                                     
                                      <input 
                                        type="file"
                                        placeholder="Add a file"
                                        id="fileUpload"
                                        onChange={
                                          (event) => setFile(event.target.files[0])
                                        }
                                        /* onChange={
                                          handleImageChange
                                        } */
                                        /* onClick={(event) => {
                                          setFile(event.target.files[0]);
                                          handleImageChange;
                                        }} */
                                        className="relative cursor-pointer bg-primary sm-mt-4 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-dark hover:bg-dark hover:text-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
                                      />
                                   
                                    </div>
                                    <p className="">or drag and drop</p>
                                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                  </div>
                                </div>
                                <br/>
                                {errorImageProfile && <p>{errorImageProfile}</p>}
                              </div>
                              </div>
                            ) : (
                              <div
                                className="h-full w-full flex flex-col content-center items-center text-center text-light bg:primary px-8 py-12"
                                  style={{background: imagePreview ? `url("${imagePreview}") no-repeat center` : "blue"}}
                                ></div>

                            
                            )}
                            {imagePreview && (
                                  <button onClick={() => setImagePreview(null)}>Remove image</button>
                                )}
                            
                          </section>
                          </div>

                          {/* Section 3 */}
                          {/* <div className="bg-light mb-8 grid grid-cols-1 lg:gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">

                        
                          <section className="lg:col-start-1 w-full">
                            <div className="px-4 py-5">  
                              <h4>Image</h4>
                            </div>
                          </section>

                          
                          <section className="col-span-2">
                            {!imagePreview && 
                            <label className="px-4 py-5">
                            <input 
                              type="file"
                              placeholder="Add a file"
                              onChange={handleImageChange}
                              className="sr-only" />  
                              <div className="mt-1 sm:mt-0 sm:col-span-2 px-4">
                                <div className="w-full flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer">
                                  <div className="space-y-1 text-center ">
                                    <svg
                                      className="mx-auto h-12 w-12 text-gray-400"
                                      stroke="currentColor"
                                      fill="none"
                                      viewBox="0 0 48 48"
                                      aria-hidden="true"
                                    >
                                      <path
                                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                    <div className="flex text-sm text-gray-600">
                                     
                                      <input 
                                        type="file"
                                        placeholder="Add a file"
                                        onChange={handleImageChange}
                                        className="relative cursor-pointer bg-primary sm-mt-4 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-dark hover:bg-dark hover:text-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
                                      />
                                   
                                    </div>
                                    <p className="">or drag and drop</p>
                                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                  </div>
                                </div>
                                <br/>
                                {error && <p>{error}</p>}
                              </div>
                            </label>
                            }
                          </section>
                          </div> */}

                          {/* Section 3 */}
                          {/* <div className="bg-light mb-8 grid grid-cols-1 lg:gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">

                           
                            <section className="lg:col-start-1 w-full">
                              <div className="px-4 py-5">  
                                <h4>Testing</h4>
                              </div>
                            </section>

                            
                            <section className="col-span-2">
                              <div className="px-4 py-5 w-full h-full flex" >
                                <div>
                                  {error && <p>File not supported</p>} 
                                </div>

                                <div
                                className="h-full w-full flex flex-col content-center items-center text-center text-light bg:primary px-8 py-12"
                                  style={{background: imagePreview ? `url("${imagePreview}") no-repeat center` : "blue"}}
                                >
                                  {!imagePreview && (
                                    <>
                                      <p>Add an image</p>
                                      <label 
                                        htmlFor="fileUpload"
                                        className="h-120 w-30 text-primary cursor-pointer"
                                      >
                                        Choose file
                                      </label>
                                      <input 
                                        type="file"
                                        id="fileUpload"
                                        className="hidden "
                                        onChange={
                                          (event) => setFile(event.target.files[0]),
                                          handleImageChange}
                                      />
                                      <span>(jpg, jpeg or png)</span>
                                    </>
                                  )}
                                </div>
                                {imagePreview && (
                                  <button onClick={() => setImagePreview(null)}>Remove image</button>
                                )}
                                                     
                              </div>
                            </section>
                            </div> */}

                          {/* <!-- Privacy section --> */}
                          <div className="pt-6 divide-y divide-gray-200">
                            
                            {/* Save */}
                            <div className="mt-4 py-4 px-4 flex justify-end sm:px-6">
                              <Link to="/create" className="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500">
                                Cancel
                              </Link>
                              <button  className="ml-5 bg-primary border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-dark hover:bg-dark hover:text-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
                              onClick={() => setShowToast1(true)} expand="block"
                              >
                                Save
                              </button>
                              {!error && 
                              <IonToast
                                isOpen={showToast1}
                                onDidDismiss={() => setShowToast1(false)}
                                message="Your settings have been saved."
                                duration={1000}
                              />
                              }
                            </div>
                          </div>

                          <Recaptcha
                            sitekey="6LeZxd8bAAAAAK_mWS39jVK8Q2vyaRn25eMEHkeA"
                          />

                        </form>

                      </div>
                    </div>
                    
                  </div>
                </main>
                
                
              
                
            </div>
        <Footer/>
      </IonContent>
    </IonPage>
    )
}

export default CreateTeam

