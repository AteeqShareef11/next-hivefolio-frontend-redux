import { IonCol, IonContent, IonGrid, IonRow } from "@ionic/react";

export default function CardGrid({titleText, style1, children}) {

    return (
        <div className="">

            <h2 className="">{titleText}</h2>
                <ul>
                    <li className={style1}>{children}</li>
                </ul>
        </div>
        /* <IonContent >
            <h2 className="">{props.titleText}</h2>
            <IonGrid>
                <IonRow>
                    <IonCol >
                        <ul className="">
                            <li className="">{props.children}</li>
                        </ul>
                    </IonCol>
                    
                </IonRow>
            </IonGrid>
        </IonContent> */
    )
}