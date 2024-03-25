
import { GameType } from '@/data/games.2024';
import { SelectableTeam } from '@/data/teams.2024';
import { useTranslations } from 'next-intl';
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

export const TeamStandings = ({ games, teams, gameTypeRounds }: {
  games: Array<Array<GameType>>;
  teams: SelectableTeam[];
  gameTypeRounds: string[]
}) => {
  const teamsT = useTranslations('teams');
  const classificationT = useTranslations('classification');
  const gameType = useTranslations('gameType');


  const leagueGames = games.filter((_, index) => gameTypeRounds[index] === 'League');

  const standings = calculateStandings(leagueGames, teams);

  return (
    <div className="bg-white">
      <div className="border-gray-200">
        <dl>
          <div className={`px-4 py-5 grid grid-cols-6 gap-4 sm:px-6 `}>
            <dt className="font-medium text-gray-500 col-span-2">
              <h2 className="text-md leading-6 font-medium text-gray-500">{classificationT('title')}</h2>
            </dt>
            <dd className="mt-1 text-sm text-gray-500 sm:mt-0 col-span-1 text-center font-medium">
              {classificationT('gf')}
            </dd>
            <dd className="mt-1 text-sm text-gray-500 sm:mt-0 col-span-1 text-center font-medium">
              {classificationT('gc')}
            </dd>
            <dd className="mt-1 text-sm text-gray-500 sm:mt-0 col-span-1 text-center font-medium">
              {classificationT('dg')}
            </dd>
            <dd className="mt-1 text-sm text-gray-500 sm:mt-0 col-span-1 text-black text-center font-medium">
              {classificationT('points')}
            </dd>
          </div>
          {standings.map((team, i) => (
            <div key={i} className={`${i % 2 === 0 ? 'bg-gray-100' : 'bg-white'} px-4 py-5 grid grid-cols-6 gap-4 sm:px-6`}>
              <dt className="text-sm font-medium text-gray-500 col-span-2">
                {teamsT(team.team.name)}
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 col-span-1 text-center">
                {team.goalsFor}
              </dd>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 col-span-1 text-center">
                {team.goalsAgainst}
              </dd>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 col-span-1 text-center">
                {team.goalDifference}
              </dd>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 col-span-1 text-black  text-center">
                {team.points}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="px-4 py-5 sm:px-6 mt-4">
        <h2 className="text-lg leading-6 font-medium text-gray-900">Eliminatorias</h2>
      </div>
      {games.map((round, index) => gameTypeRounds[index] === 'League' ? null : (
        <div key={index} className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <h3 className="text-md font-medium text-gray-900">{
            gameTypeRounds[index] === 'League' ? `${gameType('League')} ` + (index + 1) : gameTypeRounds[index] === 'SemiFinal' ? `${gameType('semiFinal')} ` : gameTypeRounds[index] === 'Final' ? `${gameType('final')} ` : gameTypeRounds[index] === 'ThirdPlace' ? `${gameType('thirdPlace')} ` : `${gameType('fifthPlace')} `
          }</h3>
          {round.map((game, gameIndex) => (
            <p key={gameIndex} className="text-sm text-gray-600">
              {game.local?.name || 'TBD'} vs {game.visitor?.name || 'TBD'} - {game.end ? `${game.localScore} : ${game.visitorScore}` : teamsT('pending')}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};