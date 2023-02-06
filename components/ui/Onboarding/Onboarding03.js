import React, { useRef, useEffect, useState } from 'react';
import { 
    IonButtons, 
    IonContent, 
    IonHeader, 
    IonInput, 
    IonItem, 
    IonLabel, 
    IonPage,
    IonRouterLink,
    IonTitle, 
    IonToast, 
    IonToolbar 
  } from '@ionic/react';

  import axios from 'axios';

  import { callApi } from "../../utils/utils";
  import { useCurrentUser, useDispatchCurrentUser } from '../../context/AuthContext';
  import { useHistory, useLocation } from 'react-router-dom';

const Onboarding03 = ({ steps, setSelectedStep, password, setPassword }) => {

    const [values, setValue] = useState({
        email: "",
        password: ""
    });

    const [email, setEmail] = useState("");
    const user = useCurrentUser();
    const dispatch = useDispatchCurrentUser();
    const history = useHistory();
    const location = useLocation();
    const [forgot, setForgot] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [errors, setErrors] = useState({});
    const [visible, setVisible] = useState(false);

    const [showToast1, setShowToast1] = useState(false);

    /* const fields = {
        email: {
            helperText: "Invald email",
            placeholder: "Email",
            type: "text" 
        },
        password: {
            helperText: "Invald password",
            placeholder: "Password",
            type: "text" 
        }
    }; */

    /* const detailsRemove = () => {
        if(email !== null) {
            setEmail("")
        }
    } */

    const { state = {}} = location

    if (user.isAuthenticated) {
        if (state && state.from) {
            history.replace(state.from)
        }  
    } 

    const navigateSignUp = () => {
       const signUp = steps.find(step => step.label === "Sign Up") 
       setSelectedStep(steps.indexOf(signUp))
    }

    const handleSignIn = async (e) => {
        e.preventDefault()
        setErrorMsg(null)
  
        try {
            const response = await callApi({
                path: "/auth/local", method: "POST", body: {
                    identifier: email,
                    password: password,
                }
            });
  
            if (!response.user) {
                throw "Cannot sign in. Please try again"
            }
  
            localStorage.setItem('token', response.jwt);
            dispatch({ type: "LOGIN", user: response.user })

            if (state && state.from) {
                history.replace(state.from)
            }
            else {
                setEmail(null)
                setPassword(null)
                history.push("/home")
            }

            setPassword("")
            
        } catch (err) {
            setErrorMsg(err)
        }
    }

    const handleForgot = async () => {
        axios.post('https://hivefolio.herokuapp.com/api/auth/forgot-password', {
            email: email,
        }).then(response => {
            setTimeout(() => {
                setForgot(false)
            }, 3000)
        }).catch(error => {
            // Handle error.
            console.log('An error occurred:', error.response);
        });
    }

    const handleFacebookLogin = () => {
        axios.get('https://hivefolio.herokuapp.com/api/connect/facebook')
    }

    

    return (
        <form onSubmit={handleSignIn}>
            <h3 class="mb-6 text-2xl font-medium text-center">Sign in</h3>

            <IonItem className="mb-4">
                <IonLabel position="stacked">Email address</IonLabel>
                <IonInput 
                    /* ref={emailRef} */
                    type="email" 
                    placeholder="Email"
                    onIonChange={(event) => setEmail(event.target.value)}  
                    >
                </IonInput>
            </IonItem> 

            {!forgot && (
                <IonItem className="mb-4">
                    <IonLabel position="stacked">Password</IonLabel>
                    <IonInput 
                         /* ref={passwordRef} */
                         type="password"
                         placeholder="Password"
                         onIonChange={(event) => setPassword(event.target.value)} 
                        >
                    </IonInput>
                </IonItem> 
            )}
            

            <div className="block">
                {forgot ? (

                    <div>
                        <button 
                            className="w-full px-3 py-4 font-medium text-dark bg-primary hover:bg-dark hover:text-light rounded-lg"
                            onClick={() => {
                                setShowToast1(true)
                                handleForgot()
                            }}
                        >
                            Reset password
                        </button>
                        <IonToast
                            isOpen={showToast1}
                            onDidDismiss={() => setShowToast1(false)}
                            message={`Reset code sent`}
                            duration={1000}
                        />

                        <div className="w-full mt-4 text-sm text-center ">
                            <p 
                                className="text-blue-500 underline"
                                onClick={() => setForgot(false)}
                            >
                                Sign in
                            </p>
                        </div>
                    </div>
                    
                ) : (
                    <div>
                        <button 
                            className="w-full px-3 py-4 font-medium text-dark bg-primary hover:bg-dark hover:text-light rounded-lg mb-4"
                        >
                            Sign in
                        </button>

                        {/* <button className="w-full px-3 py-4 font-medium text-light bg-blue-500 hover:bg-dark hover:text-light rounded-lg"
                            onClick={handleFacebookLogin}
                        >
                            Facebook
                        </button> */}

                        <div className="w-full mt-4 text-sm text-center ">
                            <p 
                                className="text-blue-500 underline"
                                onClick={() => setForgot(true)}
                            >Forgotton password</p>
                            
                            <div className="mt-4">
                                <p className="text-gray-500">Don't have an account?</p> 
                                <p 
                                    className="text-blue-500 underline"
                                    onClick={navigateSignUp}
                                >
                                    Sign up
                                </p>
                            </div>
                        </div>
                    </div>
                                  
                )}
                
                

                
                
            </div>

        </form>
    )
}

export default Onboarding03