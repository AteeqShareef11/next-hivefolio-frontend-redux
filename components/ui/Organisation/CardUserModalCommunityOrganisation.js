import { 
    IonButton,
    IonCardContent, 
    IonItem, 
    IonModal, 
    IonToast, 
} from '@ionic/react';

import {Fragment, useRef, useState} from 'react';
import { useParams } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationIcon } from '@heroicons/react/outline';

/* Components */
import ModalTest from '../Modal/ModalTest';

/* Images */
import ProfilePlaceholder from '../../assets/images/profile_placeholder.png';
import Gravatar from 'react-gravatar';
import Axios from 'axios';

/* Redux */
import { useDispatch, useSelector } from 'react-redux';
import { fetchOganisationId, organisationRemoveCommunity } from '../../redux/actions/organisationActions';



const CardUserModalCommunityOrganisation = ({ CommunityId, name, email, game, image_profile }) => {
    const { id } = useParams();
    const dispatch = useDispatch();

    //const communities = useSelector((state) => state.allCommunities.communities);
    const organisation = useSelector(state => state.organisation);

    const [open, setOpen] = useState(false)

    const cancelButtonRef = useRef()

    const [teamData, setTeamData] = useState({})
    const [clickedUser, setClickedUser] = useState('');
    const [error, setError] = useState('');
    const [showToast1, setShowToast1] = useState(false);

    /* Remove user */
    const handleRemoveCommunity = async (event) => {
        //event.preventDefault()
        dispatch(organisationRemoveCommunity(id, CommunityId, organisation ))
    }

    return (
        <IonCardContent className="flex flex-row flex-wrap w-full">

            <div class="flex flex-row bg-light w-full px-6 py-4 whitespace-nowrap">
                <div class="flex justify-between items-center w-full">
                    <div className="flex flex-row">
                        <div class="flex-shrink-0 h-10 ">
                        {image_profile ? (
                                <div
                                className=" h-10 w-10 rounded-full bg-cover bg-no-repeat my-auto "
                                style={{
                                    backgroundImage: `url(${image_profile && image_profile.url})`
                                }}
                                /* alt={`Profile name ${gamertag}`} */
                            >
                                <svg className="clip-svg ">
                                    <defs >
                                        <clipPath id="clip-shape" clipPathUnits="objectBoundingBox" >
                                            <path d="M1,0.284 C1,0.428,1,0.572,1,0.716 C0.999,0.718,0.998,0.72,0.998,0.722 C0.993,0.747,0.979,0.766,0.954,0.779 C0.818,0.849,0.681,0.919,0.545,0.988 C0.515,1,0.484,1,0.454,0.988 C0.318,0.919,0.182,0.849,0.046,0.779 C0.015,0.764,0,0.74,0,0.709 C0,0.569,0,0.431,0,0.292 C0,0.26,0.015,0.236,0.046,0.221 C0.182,0.151,0.318,0.081,0.454,0.012 C0.484,-0.004,0.515,-0.004,0.545,0.012 C0.681,0.081,0.818,0.151,0.954,0.222 C0.968,0.229,0.979,0.243,0.989,0.255 C0.995,0.263,0.996,0.274,1,0.284">
                                            </path>
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                            ) : (
                                
                            <div
                                className=" h-10 w-10 rounded-full bg-cover bg-no-repeat my-auto "
                                style={{ backgroundImage: `url(${ProfilePlaceholder})` }}
                                    /* alt={`Profile name ${gamertag}`} */
                            >
                                {/* Change default to placeholder image */}
                                <Gravatar email={email} size={1600} rating="pg" default={ProfilePlaceholder} className="CustomAvatar-image overflow-hidden h-10 w-10 rounded-full bg-cover bg-no-repeat my-auto " />
                                
                            </div>
                        )}
                        </div>
                        <div class="ml-4">
                            <div class="text-sm font-medium text-gray-900">
                            {name}
                            </div>
                            {/* <div class="text-sm text-gray-500">
                            {username}
                            </div> */}
                        </div>
                    </div>
                    <div class="px-6 py-4 whitespace-nowrap">
                        {/* <div class="text-sm text-gray-900">Regional Paradigm Technician</div>
                        <div class="text-sm text-gray-500">Optimization</div> */}
                    </div>
                    <div class="rounded-3xl mr-4 py-4 px-4 bg-dark text-white hover:bg-primary hover:text-dark"
                    onClick={() => {
                        setClickedUser(id)
                        setOpen(true)}}>
                            Options
                    </div>

                    {/* Modal */}

                    <Transition.Root show={open} as={Fragment}>
                        <Dialog
                            as="div"
                            static
                            className="fixed z-10 inset-0 overflow-y-auto"
                            initialFocus={cancelButtonRef}
                            open={open}
                            onClose={setOpen}
                        >
                            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-" />
                            </Transition.Child>

                            {/* This element is to trick the browser into centering the modal contents. */}
                            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                                &#8203;
                            </span>
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left mb-4">
                                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                        Member options
                                    </Dialog.Title>
                                    {/* <div className="mt-2">
                                        <h3>{game}</h3>

                                        <ul className="mt-2 divide-y divide-gray-200">
                                            <li className="py-4 flex items-center justify-between">
                                                <div className="flex flex-col">
                                                <p className="text-sm font-medium text-gray-900" id="privacy-option-1-label">
                                                    Admin
                                                </p>
                                                <p className="text-sm text-gray-500" id="privacy-option-1-description">
                                                    Nulla amet tempus sit accumsan. Aliquet turpis sed sit lacinia.
                                                </p>
                                                </div>
                                                
                                                <button type="button" className="bg-gray-200 ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500" aria-pressed="true" aria-labelledby="privacy-option-1-label" aria-describedby="privacy-option-1-description">
                                                <span className="sr-only">Use setting</span>
                                                
                                                <span aria-hidden="true" className="translate-x-0 inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"></span>
                                                </button>
                                            </li>

                                            <li className="py-4 flex items-center justify-between">
                                                <div className="flex flex-col">
                                                <p className="text-sm font-medium text-gray-900" id="privacy-option-1-label">
                                                    organisation coach
                                                </p>
                                                <p className="text-sm text-gray-500" id="privacy-option-1-description">
                                                    Nulla amet tempus sit accumsan. Aliquet turpis sed sit lacinia.
                                                </p>
                                                </div>
                                               
                                                <button type="button" className="bg-gray-200 ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500" aria-pressed="true" aria-labelledby="privacy-option-1-label" aria-describedby="privacy-option-1-description">
                                                <span className="sr-only">Use setting</span>
                                             
                                                <span aria-hidden="true" className="translate-x-0 inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"></span>
                                                </button>
                                            </li>
                                        </ul>
                                        <br />
                                        <p className="text-sm text-gray-500">
                                        Are you sure you want to deactivate your account? All of your data will be permanently removed
                                        from our servers forever. This action cannot be undone.
                                        </p>
                                    </div> */}
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="button"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={handleRemoveCommunity}
                                    >
                                    {error && <p>{error}</p>}
                                    Remove community
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                                        onClick={() => setOpen(false)}
                                        ref={cancelButtonRef}
                                    >
                                    Cancel
                                    </button>
                                    <IonToast
                                        isOpen={showToast1}
                                        onDidDismiss={() => setShowToast1(false)}
                                        message={`User has been removed from organisation ${id.name}`}
                                        duration={1000}
                                    />
                                </div>
                                </div>
                            </Transition.Child>
                            </div>
                            </Dialog>
                        </Transition.Root>

                </div>
            </div>


                    
        </IonCardContent>
    )
}

export default CardUserModalCommunityOrganisation