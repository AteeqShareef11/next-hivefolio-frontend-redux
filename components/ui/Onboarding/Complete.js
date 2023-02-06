import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
    IonInput, 
    IonItem, 
    IonLabel, 
  } from '@ionic/react';

import { useCurrentUser, useDispatchCurrentUser } from '../../context/AuthContext';

const Complete = () => {
    const user = useCurrentUser();


    const viewProfile = () => {
        history.push(`/user/${user.username}`)
    }

    return (
        <div>
            <h3 class="mb-6 text-2xl font-medium text-center">Profile created</h3>
            <Link to={`/user/${user.username}`}
                className="w-full px-3 py-4 font-medium text-dark bg-primary hover:bg-dark hover:text-light rounded-lg mb-4"
                onClick={viewProfile}
            >
                View profile
            </Link>
        </div>
    )

}

export default Complete