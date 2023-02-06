import React, { useState } from 'react';
import { 
    IonInput, 
    IonItem, 
    IonLabel, 
  } from '@ionic/react';

import { callApi } from "../../utils/utils";
import { useCurrentUser, useDispatchCurrentUser } from '../../context/AuthContext';
import axios from 'axios';

const SignUp = ({ steps, setSelectedStep }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gamertag, setGamertag] = useState('');
    const [username, setUsername] = useState('');
    const [info, setInfo] = useState(false);
    const [error, setError] = useState('');
    const dispatch = useDispatchCurrentUser();

    const handleNavigate = direction => {
        if (direction === "forward" ) {
            setInfo(true)
        } else {
            if (info) {
                setInfo(false)
            }
            /* const login = steps.find(step => step.label === "Login")
            setSelectedStep(step.indexOf(login)) */
        }
    }

    const navigateSignIn = () => {
        const login = steps.find(step => step.label === "Login") 
        setSelectedStep(steps.indexOf(login))
    }


    const handleComplete = async (event) => {
        /* event.preventDefault() */
  
        try{
            const response = await fetch('https://hivefolio.herokuapp.com/api/auth/local/register', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    username: username.split(' ').join(''),
                    gamertag: gamertag,
                    email,
                    password,
                    /* typeuser: Player */
                })
            })
            const data = await response.json()
            localStorage.removeItem('token');

            /* setTimeout(() => {
                const response = callApi({
                    path: "/auth/local", method: "POST", body: {
                        identifier: email,
                        password: password
                    }
                });
    
                localStorage.setItem('token', response.jwt);
                dispatch({ type: "LOGIN", user: response.user })

                const complete = steps.find(step => step.label === "Complete")
                setSelectedStep(steps.indexOf(complete))
            }, 3000) */

            const complete = steps.find(step => step.label === "Complete")
                setSelectedStep(steps.indexOf(complete))

            if(data.message){
                setError(data.message[0].messages[0].message)
                return
            }
  
        } catch(err){
            setError("Something went wrong ", err)
            console.log(err)
        }

        
    } 

    /* const handleFacebookSignUp = () => {
        axios.get('https://hivefolio.herokuapp.com/api/connect/facebook')
        axios.get(callApi({path: "/connect/facebook"}))
    } */


    return (
        <div /* onSubmit={handleComplete} */>
            <h3 class="mb-6 text-2xl font-medium text-center">Sign up</h3>

            {!info ? (
                <div>
                    <IonItem className="mb-4">
                    <IonLabel position="stacked">Username</IonLabel>
                        <IonInput 
                            type="username"
                            placeholder="username"
                            value={username}
                            onIonChange={(event) => setUsername(event.target.value)
                            }
                            class="block w-full px-4 py-3 border-2 border-transparent rounded-lg focus:border-blue-500 focus:outline-none">
                        </IonInput>                                    
                    </IonItem>

                    <IonItem className="mb-4">
                    <IonLabel position="stacked">Gamertag</IonLabel>
                        <IonInput 
                            type="gamertag"
                            placeholder="gamertag"
                            value={gamertag}
                            onIonChange={(event) => setGamertag(event.target.value)
                            }
                            class="block w-full px-4 py-3 border-2 border-transparent rounded-lg focus:border-blue-500 focus:outline-none">
                        </IonInput>
                    </IonItem>
                    {/* <a href="https://hivefolio.herokuapp.com/api/connect/facebook"
                        className="w-full px-3 py-4 font-medium text-light bg-blue-500 hover:bg-dark hover:text-light rounded-lg"
                        
                    >
                        Sign Up wirh Facebook
                    </a> */}
                </div>
            ) : (
                <div>
                    <IonItem className="mb-4">
                    <IonLabel position="stacked">Email address</IonLabel>
                        <IonInput 
                            type="email"
                            placeholder="email"
                            value={email}
                            onIonChange={(event) => setEmail(event.target.value)
                            }
                            class="block w-full px-4 py-3 border-2 border-transparent rounded-lg focus:border-blue-500 focus:outline-none">
                        </IonInput>
                    </IonItem>

                    <IonItem className="mb-4">
                        <IonLabel position="stacked">Password</IonLabel>
                        <IonInput 
                            type="password"
                            placeholder="password"
                            value={password}
                            onIonChange={(event) => setPassword(event.target.value)
                            }
                            class="block w-full px-4 py-3 border-2 border-transparent rounded-lg focus:border-blue-500 focus:outline-none" >
                        </IonInput>
                    </IonItem> 

                    <div className='bg-light my-4 p-4'>
                        <h4>Beta Acknowledgement</h4>
                        <p>I understand that I am entering a new portal that is currently in build mode, and I am happy to accept the fact that I will see bugs, glitches, typos and everything that comes with a beta platform, and I am OK with that because I get to be a part of something new!</p>
                    </div>

                    <button 
                        className="w-full px-3 py-4 font-medium text-dark bg-primary hover:bg-dark hover:text-light rounded-lg"
                        onClick={() => (info ? handleComplete() : null)}
                    >
                        Sign up
                    </button>  
                </div>
            )}

            

            

            <div className="flex mt-4">
                {info && (
                    <button className="grid px-3 py-4 font-medium text-dark bg-primary hover:bg-dark hover:text-light rounded-lg place-content-start"
                    onClick={() => handleNavigate("backward")}
                    >
                        Previous
                    </button>
                )}
                

                {!info && (
                    <button 
                        className=" px-3 py-4 font-medium text-dark bg-primary hover:bg-dark hover:text-light rounded-lg "
                        onClick={() => handleNavigate("forward")}
                    >
                        Next
                    </button>
                )}

                
            </div>

            {!info && (
                <div className="block">
                
                    <div className="w-full mt-4 text-sm text-center ">                   
                        <div className="mt-4">
                            <p className="text-gray-500">Have an account?</p> 
                            <p 
                                className="text-blue-500 underline"
                                onClick={navigateSignIn}
                            >
                                Sign In</p>
                        </div>
                    </div>

                </div>
            )}
            {error && <p>{error}</p>}

        </div>
    )
}

export default SignUp