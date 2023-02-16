import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonList, IonItem, IonLabel } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tournoi</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      <IonList>
      <IonItem>
        <IonLabel>
          <h2>Liste des équipes</h2>
        </IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel>Équipe 1</IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel>Équipe 2</IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel>Équipe 3</IonLabel>
      </IonItem>
      ...
      <IonItem>
        <IonLabel>Équipe 16</IonLabel>
      </IonItem>
    </IonList>
        
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
