import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton } from '@ionic/react';

import React, { useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';

const Tab1: React.FC = () => {
  interface Match {
    id: number;
    team1: string;
    team2: string;
    result?: Result;
    startTime?: number;
    endTime?: number;
  }
  
  enum Result {
    Win = 'Win',
    Lose = 'Lose',
    Draw = 'Draw',
  }

  interface Bet {
    id: number;
    matchId: number;
    team: string;
    result: Result;
    userId: string;
    createdAt: number;
  }
  const [matches, setMatches] = useState<Array<Match>>([]);
  const [bets, setBets] = useState<Array<Bet>>([]);

  const createMatch = (team1: string, team2: string) => {
    const newMatch: Match = {
      id: Date.now(),
      team1,
      team2,
      startTime: Date.now(),
    };
    setMatches([...matches, newMatch]);
  };

  const placeBet = (matchId: number, team: string, result: Result) => {
    const newBet: Bet = {
      id: Date.now(),
      matchId,
      team,
      result,
      userId: 'user1',
      createdAt: Date.now(),
    };
    setBets([...bets, newBet]);
  };

  const endMatch = (matchId: number) => {
    const updatedMatches = matches.map(match => {
      if (match.id === matchId) {
        return {
          ...match,
          result: Math.random() > 0.5 ? Result.Win : Result.Lose,
          endTime: Date.now(),
        };
      }
      return match;
    });
    setMatches(updatedMatches);
  };

  const match = matches.find(match => match.result === undefined);
  


  return (
    <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Tournoi de Foot</IonTitle>
        <IonButton slot="end">Connexion</IonButton>
      </IonToolbar>
    </IonHeader>
    <IonList>
      <IonItem>
        <IonLabel>
          <h2>Match en cours</h2>
        </IonLabel>
      </IonItem>
      {match && (
        <>
          <IonItem>
            <IonLabel>
            <h3>{match.team1} vs {match.team2}</h3>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>
                <p>Date: DD/MM/YYYY</p>
              </IonLabel>
              <IonLabel>
                <p>Minute de jeu: XX</p>
              </IonLabel>
            </IonItem>
          </>
        )}
      </IonList>
      <IonList>
        <IonItem>
          <IonLabel>
            <h2>Pariez sur le résultat</h2>
          </IonLabel>
        </IonItem>
        {match && (
          <>
            <IonItem>
              <IonLabel>Victoire {match.team1}</IonLabel>
              <IonButton onClick={() => placeBet(match.id, match.team1, Result.Win)}>Parier</IonButton>
            </IonItem>
            <IonItem>
              <IonLabel>Nul</IonLabel>
              <IonButton onClick={() => placeBet(match.id, '', Result.Draw)}>Parier</IonButton>
            </IonItem>
            <IonItem>
              <IonLabel>défaite {match.team2}</IonLabel>
              <IonButton onClick={() => placeBet(match.id, match.team2, Result.Lose)}>Parier</IonButton>
            </IonItem>
          </>
        )}
      </IonList>
    </IonPage>
  );
};

export default Tab1;
