import React, { useRef, useState } from 'react';
import { 
    IonInput, 
    IonItem, 
    IonLabel,
    IonToast, 
  } from '@ionic/react';

import { callApi } from "../../utils/utils";

const Reset = ({ steps, setSelectedStep }) => {

    const [password, setPassword] = useState("");
    const passwordRef = useRef();
    const [passwordConfirm, setPasswordConfirm] = useState("null");
    const [errors, setErrors] = useState({});
    const [errorMsg, setErrorMsg] = useState(null);

    const [showToast1, setShowToast1] = useState(false);

    const handleReset = async () => {
        /* e.preventDefault()
        setErrorMsg(null) */
  
        try {
            const params = new URLSearchParams(window.location.search)
            const code = params.get("code")

            const response = await callApi({
                path: "/auth/reset-password", method: "POST", body: {
                    code,
                    password: password,
                    /* password: passwordRef.current.value, */
                    passwordConfirmation: passwordConfirm
                }
            });
  
            if (!response.user) {
                throw "Cannot reset password"
            }
  
            setTimeout(() => {
                window.history.replaceState(null, null, window.location.pathname)

                const login = steps.find(step => step.label === "Login")
                setSelectedStep(steps.indexOf(login))
            }, 3000)
            
        } catch (err) {
            setErrorMsg(err)
        }
    }

    /* const handleReset = async (e) => {
        e.preventDefault()
        setErrorMsg(null)
  
        const data = {
            token: ,
            password: ,
            password_confirm: 
        }
    } */


    return (
        <div>
            <h3 class="mb-6 text-2xl font-medium text-center">Reset password</h3>

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

            <IonItem className="mb-4">
                <IonLabel position="stacked">Password confirm</IonLabel>
                <IonInput 
                        placeholder="Password confirm"
                        type="password"
                        onIonChange={(event) => setPasswordConfirm(event.target.value)}
                    >
                </IonInput>
            </IonItem> 

            {password === passwordConfirm ? ( 
                
                <button 
                    className="w-full px-3 py-4 font-medium text-dark bg-primary hover:bg-dark hover:text-light rounded-lg"
                    onClick={() => {
                        setShowToast1(true)
                        handleReset()
                    }}
                >
                    Reset password
                </button>  
            ) : (
                <div 
                    className="w-full px-3 py-4 font-medium text-dark bg-gray-300 rounded-lg text-center"
                >
                    Reset password
                </div>  
            )}

            

            <IonToast
                isOpen={showToast1}
                onDidDismiss={() => setShowToast1(false)}
                message={`Password reset`}
                duration={1000}
            />

        </div>
    )

}

export default Reset