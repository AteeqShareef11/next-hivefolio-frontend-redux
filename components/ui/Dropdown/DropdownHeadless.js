import React, { useState } from 'react';
import { IonPopover, IonButton, IonContent, IonItem, IonLabel, IonList, IonListHeader, useIonPopover, IonPage } from '@ionic/react';

const PopoverList = ({ onHide }) => (
    <IonList>
      <IonListHeader>Account</IonListHeader>
      <IonItem button>Learn Ionic</IonItem>
      <IonItem button>Documentation</IonItem>
      <IonItem button>Showcase</IonItem>
      <IonItem button>GitHub Repo</IonItem>
      <IonItem lines="none" detail={false} button onClick={onHide}>
        Close
      </IonItem>
    </IonList>
  );
  
  const DropdownHeadless = () => {
    const [present, dismiss] = useIonPopover(PopoverList, {
      onHide: () => dismiss(),
    });
  
    return (

          <IonButton
            //expand="block"
            onClick={(e) =>
              present({
                event: e.nativeEvent,
              })
            }
          >
            Show Popover
          </IonButton>

    );
  };

export default DropdownHeadless