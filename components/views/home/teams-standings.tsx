
import { GameType } from '@/data/games.2024';
import { SelectableTeam } from '@/data/teams.2024';
import React from 'react';

const calculateStandings = (games: Array<Array<GameType>>, teams: SelectableTeam[]) => {
    let standings = teams.map(team => ({
      team: team,
      points: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
    }));
  
    games.flat().forEach(game => {
      if (game.end && game.local && game.visitor) {
        const localIndex = standings.findIndex((s: { team: { name: string; }; }) => s.team.name === (game.local as SelectableTeam).name);
        const visitorIndex = standings.findIndex((s: { team: { name: string; }; }) => s.team.name === (game.visitor as SelectableTeam).name);
  
        standings[localIndex].goalsFor += game.localScore;
        standings[localIndex].goalsAgainst += game.visitorScore;
        standings[visitorIndex].goalsFor += game.visitorScore;
        standings[visitorIndex].goalsAgainst += game.localScore;
  
        if (game.localScore > game.visitorScore) {
          standings[localIndex].points += 3;
        } else if (game.localScore < game.visitorScore) {
          standings[visitorIndex].points += 3;
        } else {
          standings[localIndex].points += 1;
          standings[visitorIndex].points += 1;
        }
  
        standings[localIndex].goalDifference = standings[localIndex].goalsFor - standings[localIndex].goalsAgainst;
        standings[visitorIndex].goalDifference = standings[visitorIndex].goalsFor - standings[visitorIndex].goalsAgainst;
      }
    });
  
    return standings.sort((a, b) => b.points - a.points || b.goalDifference - a.goalDifference || b.goalsFor - a.goalsFor);
  };
  
export const TeamStandings = ({games, teams, gameTypeRounds}: {
    games: Array<Array<GameType>>;
    teams: SelectableTeam[];
    gameTypeRounds: string[]
}) => {
    const leagueGames = games.filter((_, index) => gameTypeRounds[index] === 'League');
    
    const eliminationGames = games.filter((_, index) => gameTypeRounds[index] !== 'League');
    const standings = calculateStandings(leagueGames, teams);

    return (
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg leading-6 font-medium text-gray-900">Clasificación de la Liga</h2>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              {standings.map((team, i) => (
                <div key={i} className={`${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'} px-4 py-5 grid grid-cols-3 gap-4 sm:px-6`}>
                  <dt className="text-sm font-medium text-gray-500 col-span-1">
                    {team.team.name}
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 col-span-2">
                    Puntos: {team.points}, GF: {team.goalsFor}, GC: {team.goalsAgainst}, DG: {team.goalDifference}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
    
          {/* Eliminatorias */}
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg leading-6 font-medium text-gray-900">Eliminatorias</h2>
          </div>
          {eliminationGames.map((round, index) => (
            <div key={index} className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <h3 className="text-md font-medium text-gray-900">{gameTypeRounds[index]}</h3>
              {round.map((game, gameIndex) => (
                <p key={gameIndex} className="text-sm text-gray-600">
                  {game.local?.name || 'TBD'} vs {game.visitor?.name || 'TBD'} - {game.end ? `${game.localScore} : ${game.visitorScore}` : 'Pendiente'}
                </p>
              ))}
            </div>
          ))}
        </div>
      );
    };