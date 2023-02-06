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

  import { callApi } from "../../utils/utils";
  import { useCurrentUser, useDispatchCurrentUser } from '../../context/AuthContext';
  import { useHistory, useLocation } from 'react-router-dom';

const LoginMagic = ({ steps, setSelectedStep, password, setPassword }) => {

    /* const MAGIC_API_KEY = process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY;
    const magic = new Magic(MAGIC_API_KEY); */

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

    const { state = {}} = location

    /* if (user.isAuthenticated) {
        if (state && state.from) {
            history.replace(state.from)
        }  
    }  */

    const navigateSignUp = () => {
       const signUp = steps.find(step => step.label === "Sign Up") 
       setSelectedStep(steps.indexOf(signUp))
    }

    /* const handleSignIn = async (e) => {
        e.preventDefault()
        setErrorMsg(null)

        try {
            const jwt = await magic.auth.loginWithMagicLink({email})
            localStorage.setItem('token', jwt);
        } catch (err) {
            setErrorMsg(err)
        }

    } */

    const handleSignIn = async (e) => {
        e.preventDefault()
        setErrorMsg(null)
  
        try {
            /* const response = await callApi({
                path: "/auth/local", method: "POST", body: {
                    identifier: email,
                    password: password,
                }
            }); */

            //const jwt = await magic.auth.loginWithMagicLink({email})
  
            if (!response.user) {
                throw "Cannot sign in. Please try again"
            }
  
            localStorage.setItem('token', jwt);

            if (state && state.from) {
                history.replace(state.from)
            }
            else {
                setEmail(null)
                //setPassword(null)
                history.push("/home")
            }

            setPassword("")
            
        } catch (err) {
            setErrorMsg(err)
        }
    }

    

    return (
        <form onSubmit={handleSignIn}>
            <h3 class="mb-6 text-2xl font-medium text-center">Sign in</h3>

            <IonItem className="mb-4">
                <IonLabel position="stacked">Email address</IonLabel>
                <IonInput 
                    type="email" 
                    placeholder="Email"
                    onIonChange={(event) => setEmail(event.target.value)}  
                    >
                </IonInput>
            </IonItem> 

            {/* {!forgot && (
                <IonItem className="mb-4">
                    <IonLabel position="stacked">Password</IonLabel>
                    <IonInput 
                         type="password"
                         placeholder="Password"
                         onIonChange={(event) => setPassword(event.target.value)} 
                        >
                    </IonInput>
                </IonItem> 
            )} */}
            

            <div className="block">

                    <div>
                        <button 
                            className="w-full px-3 py-4 font-medium text-dark bg-primary hover:bg-dark hover:text-light rounded-lg mb-4"
                        >
                            Sign in
                        </button>

                        <div className="w-full mt-4 text-sm text-center ">
                            {/* <p 
                                className="text-blue-500 underline"
                                onClick={() => setForgot(true)}
                            >Forgotton password</p> */}
                            
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
                                  

                
                

                
                
            </div>

        </form>
    )
}

export default LoginMagic