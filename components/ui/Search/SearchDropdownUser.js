import { 
    IonButton,
    IonCardContent, 
    IonModal, 
    IonToast, 
} from '@ionic/react';

import { useEffect } from 'react'

const SearchDropdownUser = ({gamertag}) => {

    const [showModal, setShowModal] = useState(false);

    return (
        <div>



            <IonModal isOpen={showModal} cssClass='my-custom-class'>
            {gamertag}

                <button 
                    class="rounded-3xl mr-4 py-4 px-4 bg-dark text-white hover:bg-primary hover:text-dark"
                    
                    onClick={handleAddUser}
                    onClick={() => setShowToast1(true)}
                    
                >
                    {error && <p>{error}</p>}
                    Add user to team
                </button>
                <IonToast
                    isOpen={showToast1}
                    onDidDismiss={() => setShowToast1(false)}
                    message={`User has been added to team ${team.name}`}
                    duration={1000}
                />
            
            <IonButton onClick={() => setShowModal(false)} className="flex flex-end">Close Modal</IonButton>
            </IonModal>

        </div>
    )
}

export default SearchDropdownUser