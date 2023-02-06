import { Link } from 'react-router-dom';
import { 
    IonCardContent, 
  } from '@ionic/react';


const FeatureSignedOut01 = ({  }) => {
    return (

        <section className="pt-8 pb-16 sm:pt-10 sm:pb-20 md:pt-12 md:pb-24 bg-gray-50">
            <div className="px-5 mx-auto max-w-7xl md:px-8 lg:px-16 max-width">
                {/* <svg className="w-40 h-40 sm:w-48 sm:h-48" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 41"><defs></defs><defs><linearGradient x1="50%" x2="108.006%" y1="44.344%" y2="62.397%"><stop offset="0%" stop-color="#FDC530"></stop><stop offset="100%" stop-color="#FF42E9"></stop></linearGradient><linearGradient x1="50%" x2="108.006%" y1="48.828%" y2="52.569%"><stop offset="0%" stop-color="#FDC530"></stop><stop offset="100%" stop-color="#FF42E9"></stop></linearGradient><linearGradient x1="50%" x2="108.006%" y1="48.935%" y2="52.335%"><stop offset="0%" stop-color="#FDC530"></stop><stop offset="100%" stop-color="#FF42E9"></stop></linearGradient></defs><g fill="none" fill-rule="nonzero"><path fill="url(#a)" d="M42.82.11c11.81.69 23.5 6.44 30.55 16.05A480.23 480.23 0 012.31 23.9C8.54 8 26.24-1.12 42.82.11z"></path><path fill="url(#b)" d="M78.73 26.87c-13.7 1.8-27.46 3-41.23 4.1-12.44.65-24.87 1.42-37.33 1.33A33 33 0 01.71 29c11.86-.44 23.66-1.65 35.47-2.67C49.5 24.54 62.84 23 76 20.28"></path><path fill="url(#c)" d="M80 38.27C53.57 41.54 26.83 41.13.24 40.44 0 39.75.2 38.91 0 38.29v-2c26.56-.52 79.11-8.39 79.35-6.85"></path></g></svg> */}

                <div className="relative w-full">
                    <h2 className="text-4xl font-bold text-transparent sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading bg-clip-text bg-gradient-to-br from-purple-500 via-purple-700 to-purple-400">
                        Are you ready to take your skills to the next level?
                    </h2>
                    <p className="xs:-mt-8 sm:-mt-8 md:-mt-8 lg:-mt-16 xl:-mt-16 text-base leading-6 text-gray-600 sm:text-lg md:text-xl">
                        Use our platform to create your esports narrative and showcase your abilities
                    </p>
                </div>
                <div className="grid mt-16 gap-y-10 sm:grid-cols-2 sm:gap-x-8 md:gap-x-12 lg:grid-cols-3 lg:gap-20">
                    <div>
                        <div className="relative w-16 h-16 p-4 overflow-hidden rounded-full bg-gradient-to-br from-purple-500 via-purple-700 to-purple-400">
                            <div className="absolute top-0 left-0 w-full h-full mt-10 transform scale-150 -rotate-45 translate-x-1/2 bg-black opacity-5"></div>
                            <svg className="w-full h-full text-white stroke-current" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        <h3 className="mt-6 text-base font-black leading-6 text-gray-700">
                            User Profiles
                        </h3>
                        <p className="mt-2 text-sm leading-5 text-gray-800">
                            Build your brand with a personalized user profile for all your esports activities.
                        </p>
                    </div>
                    <div>
                        <div className="relative w-16 h-16 p-4 overflow-hidden rounded-full bg-gradient-to-br from-purple-500 via-purple-700 to-purple-400">
                            <div className="absolute top-0 left-0 w-full h-full mt-10 transform scale-150 -rotate-45 translate-x-1/2 bg-black opacity-5"></div>
                            <svg className="w-full h-full text-white stroke-current" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                        </div>
                        <h3 className="mt-6 text-base font-black leading-6 text-gray-700">
                            Find Esports Job
                        </h3>
                        <p className="mt-2 text-sm leading-5 text-gray-800">
                            Discover job opportunities to take your career to the next level.
                        </p>
                    </div>
                    <div>
                        <div className="relative w-16 h-16 p-4 overflow-hidden rounded-full bg-gradient-to-br from-purple-500 via-purple-700 to-purple-400">
                            <div className="absolute top-0 left-0 w-full h-full mt-10 transform scale-150 -rotate-45 translate-x-1/2 bg-black opacity-5"></div>
                            <svg className="w-full h-full text-white stroke-current" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path></svg>
                        </div>
                        <h3 className="mt-6 text-base font-black leading-6 text-gray-700">
                            Network with Esports
                        </h3>
                        <p className="mt-2 text-base leading-5 text-gray-800">
                            Follow and connect with your favourite players, team, organizations, communities and games.
                        </p>
                    </div>
                    {/* <div>
                        <div className="relative w-16 h-16 p-4 overflow-hidden rounded-full bg-gradient-to-br from-purple-500 via-purple-700 to-purple-400">
                            <div className="absolute top-0 left-0 w-full h-full mt-10 transform scale-150 -rotate-45 translate-x-1/2 bg-black opacity-5"></div>
                            <svg className="w-full h-full text-white stroke-current" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
                        </div>
                        <h3 className="mt-6 text-base font-black leading-6 text-gray-700">
                            Make New Friends
                        </h3>
                        <p className="mt-2 text-base leading-5 text-gray-800">
                            Join communities to connect with other like-minded people.
                        </p>
                    </div> */}
                    {/* <div>
                        <div className="relative w-16 h-16 p-4 overflow-hidden rounded-full bg-gradient-to-br from-purple-500 via-purple-700 to-purple-400">
                            <div className="absolute top-0 left-0 w-full h-full mt-10 transform scale-150 -rotate-45 translate-x-1/2 bg-black opacity-5"></div>
                            <svg className="w-full h-full text-white stroke-current" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                        </div>
                        <h3 className="mt-6 text-base font-black text-gray-700">
                            Notifications
                        </h3>
                        <p className="mt-2 text-sm leading-5 text-gray-800">
                            Ready-to-use Notification System which integrates with the default Laravel notification feature.
                        </p>
                    </div> */}

                    {/* <div>
                        <div className="relative w-16 h-16 p-4 overflow-hidden rounded-full bg-gradient-to-br from-purple-500 via-purple-700 to-purple-400">
                            <div className="absolute top-0 left-0 w-full h-full mt-10 transform scale-150 -rotate-45 translate-x-1/2 bg-black opacity-5"></div>
                            <svg className="w-full h-full text-white stroke-current" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        </div>
                        <h3 className="mt-6 text-base font-black leading-6 text-gray-700">
                            Fully Functional API
                        </h3>
                        <p className="mt-2 text-sm leading-5 text-gray-800">
                            Ready-to-consume API for your application. Create API tokens with role specific permissions.
                        </p>
                    </div> */}
                </div>
            </div>
        </section>

    )
}

export default FeatureSignedOut01;