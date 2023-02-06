import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
    IonInput, 
    IonItem, 
    IonLabel, 
  } from '@ionic/react';

  import FeatureSignedOut from '../../assets/images/FeatureSignedOut.png';

import { useCurrentUser, useDispatchCurrentUser } from '../../context/AuthContext';

const Complete = ({steps, setSelectedStep}) => {
    const user = useCurrentUser();


    const viewProfile = () => {
        history.push(`/user/${user.username}`)
    }

    const navigateSignIn = () => {
        const login = steps.find(step => step.label === "Login") 
        setSelectedStep(steps.indexOf(login))
    }

    return (
        <div>
            <div className=''>
                <div className='text-center mb-8'>
                    <h1 class="mb-6">Good Game</h1>
                    <p>Your profile has been created</p>
                </div>

                <div 
                    className="px-3 py-4 font-medium text-dark bg-primary hover:bg-dark hover:text-light rounded-lg mb-4 text-center"
                    onClick={navigateSignIn}
                >
                    Sign and enjoy
                </div>
            
                <div className="relative rounded-md">
                    <img src={FeatureSignedOut} className="z-10 object-cover w-full h-full"/>
                </div>
            </div>
            
            
        </div>
    )

}

export default Complete