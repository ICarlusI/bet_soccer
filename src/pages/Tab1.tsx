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
    score?: string;
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
      score: '',
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
  const match = matches.find(match => match.id === matchId);
  if (!match) {
    return;
  }

  const team1Score = Math.floor(Math.random() * 5);
  const team2Score = Math.floor(Math.random() * 5);
  const score = `${team1Score} - ${team2Score}`;

  const updatedMatches = matches.map(m => {
    if (m.id === matchId) {
      const result = team1Score > team2Score ? Result.Win : team1Score < team2Score ? Result.Lose : Result.Draw;
      const updatedMatch: Match = {
        ...m,
        result,
        endTime: Date.now(),
        score,
      };
      const betsForMatch = bets.filter(bet => bet.matchId === matchId);
      const updatedBets = betsForMatch.map(bet => {
        const betResult =
          bet.team === m.team1 && result === Result.Win ||
          bet.team === m.team2 && result === Result.Lose ||
          bet.result === Result.Draw ? Result.Draw : Result.Lose;
        return {
          ...bet,
          result: betResult,
        };
      });
      setBets([...bets.filter(bet => bet.matchId !== matchId), ...updatedBets]);
      return updatedMatch;
    } else {
      return m;
    }
  });

  setMatches(updatedMatches);
};

  



  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <ExploreContainer name="Tab 1 page" />
        <IonList>
  {matches.map(match => (
   <IonItem key={match.id}>
   <IonLabel>
     <h2>
       {match.team1} vs. {match.team2}
     </h2>
     <p>{match.score ? match.score : "Match à venir"}</p>
   </IonLabel>
   {match.endTime ? (
     <IonButton disabled>Match terminé</IonButton>
   ) : (
     <IonButton onClick={() => endMatch(match.id)}>Terminer le match</IonButton>
   )}
   <IonButton onClick={() => placeBet(match.id, match.team1, Result.Win)}>Parier sur {match.team1}</IonButton>
   <IonButton onClick={() => placeBet(match.id, match.team2, Result.Win)}>Parier sur {match.team2}</IonButton>
 </IonItem>
  ))}
</IonList>
        <IonList>
          <IonItem>
            <IonLabel>
              <h2>Create a new match</h2>
            </IonLabel>
            <IonButton onClick={() => createMatch('PSG', ' Bayern')}>Create</IonButton>
          </IonItem>
        </IonList>
        <IonList>
          <IonItem>
            <IonLabel>
              <h2>Your bets</h2>
            </IonLabel>
          </IonItem>
          {bets.map(bet => (
            <IonItem key={bet.id}>
              <IonLabel>
                <p>
                  You bet {bet.result} on {bet.team} in the match {bet.matchId}
                </p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};
export default Tab1;