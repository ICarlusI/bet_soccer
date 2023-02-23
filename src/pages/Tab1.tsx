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
  const [disqualifiedTeams, setDisqualifiedTeams] = useState<Array<string>>([]);

  const teams = [
    'PSG',
    'Bayern',
    'Real Madrid',
    'Barcelona',
    'Manchester United',
    'Liverpool',
    'Chelsea',
    'Manchester City',
    'Juventus',
    'AC Milan',
    'Inter Milan',
    'Napoli',
    'Ajax',
    'Benfica',
    'Porto',
    'Sporting CP',
  ];

  const createMatch = () => {
    let team1Index, team2Index;
    do {
      team1Index = Math.floor(Math.random() * teams.length);
      team2Index = Math.floor(Math.random() * teams.length);
    } while (team1Index === team2Index);
  
    const team1 = teams[team1Index];
    const team2 = teams[team2Index];
  
    if (disqualifiedTeams.includes(team1) || disqualifiedTeams.includes(team2)) {
      console.log("Une ou les deux équipes ont été disqualifiées. Pas de nouveau match.");
      return;
    }
  
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
    setMatches(prevMatches => {
      const matchIndex = prevMatches.findIndex(match => match.id === matchId);
      if (matchIndex === -1) {
        return prevMatches;
      }
    
      const match = prevMatches[matchIndex];
      const team1Score = Math.floor(Math.random() * 5);
      const team2Score = Math.floor(Math.random() * 5);
      const score = `${team1Score} - ${team2Score}`;
    
      const result =
        team1Score > team2Score
          ? Result.Win
          : team1Score < team2Score
          ? Result.Lose
          : Result.Draw;
    
      const updatedMatch: Match = {
        ...match,
        result,
        endTime: Date.now(),
        score,
      };
    
      const updatedBets = bets.map((bet) => {
        if (bet.matchId === matchId) {
          const betResult =
            (bet.team === match.team1 && result === Result.Win) ||
            (bet.team === match.team2 && result === Result.Lose) ||
            (bet.team === null && result === Result.Draw)
              ? Result.Win
              : Result.Lose;
          return {
            ...bet,
            result: betResult,
          };
        } else {
          return bet;
        }
      });
    
      setBets(updatedBets);
    
      const updatedMatches = [...prevMatches];
      updatedMatches[matchIndex] = updatedMatch;
    
      const remainingTeams = new Set(updatedMatches.filter((match) => !match.endTime && !match.result).map((match) => match.team1));
      if (remainingTeams.size === 1) {
        const winner = remainingTeams.values().next().value;
        alert(`Le vainqueur est ${winner}`);
      }
    
      const disqualifiedTeams = new Set(updatedMatches.filter((match) => match.result === Result.Lose).map((match) => match.team1));
      if (disqualifiedTeams.size > 0) {
        const disqualifiedTeam = disqualifiedTeams.values().next().value;
        alert(`l'équipe ${disqualifiedTeam} est disqualifié!`);
        
        const remainingMatches = updatedMatches.filter((match) => !match.endTime && !disqualifiedTeams.has(match.team1) && !disqualifiedTeams.has(match.team2));
        if (remainingMatches.length === 1 && remainingMatches[0].result) {
          const winner = remainingMatches[0].result === Result.Win ? remainingMatches[0].team1 : remainingMatches[0].team2;
          alert(`Le vainqueur est ${winner}`);
        }
      }
    
      return updatedMatches;
    });
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
   <IonButton onClick={() => placeBet(match.id, match.team1,Result.Draw)}>Parier sur match nul</IonButton>

 </IonItem>
  ))}
</IonList>
        <IonList>
          <IonItem>
            <IonLabel>
              <h2>Create a new match</h2>
            </IonLabel>
            <IonButton onClick={() => createMatch()}>Create</IonButton>
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