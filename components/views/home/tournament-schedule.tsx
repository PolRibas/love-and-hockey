import React from 'react';
import { motion } from 'framer-motion';
import { GameType } from '@/data/games.2024';
import { SelectableTeam } from '@/data/teams.2024';
import { useTranslations } from 'next-intl';

interface MatchProps {
  local: SelectableTeam | undefined;
  visitor: SelectableTeam | undefined;
  localScore: number;
  visitorScore: number;
  time: string;
  end: boolean;
}

const Match: React.FC<MatchProps> = ({ local, visitor, localScore, visitorScore, time, end }) => {
  const teamsT = useTranslations('teams');

  return (
    <motion.div
      className={`match ${end ? '' : 'bg-gray-50'} p-4  shadow`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="time text-sm font-semibold">{time}</div>
      <div className="teams text-lg font-bold">
        <span>{local?.name && teamsT(local.name) || teamsT('pending')}</span> vs <span>{visitor?.name && teamsT(visitor.name) || teamsT('pending')}</span>
      </div>
      <div className="score text-md">
        {end ? `${localScore} - ${visitorScore}` : teamsT('pending')}
      </div>
    </motion.div>
  );
};

export const TournamentSchedule: React.FC<{ games: Array<Array<GameType>>; gameTypeRounds: string[] }> = ({ games, gameTypeRounds }) => {
  const gameType = useTranslations('gameType');

  return (
    <div className="tournament-schedule space-y-4 text-gray-500">
      {games.map((round, index) => (
        <motion.div key={index} className="round" initial="hidden" animate="visible" variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { delay: index * 0.2 } },
        }}>
          <h3 className="text-xl font-bold my-3">{
            gameTypeRounds[index] === 'League' ? `${gameType('League')} ` + (index + 1) : gameTypeRounds[index] === 'SemiFinal' ? `${gameType('semiFinal')} ` : gameTypeRounds[index] === 'Final' ? `${gameType('final')} ` : gameTypeRounds[index] === 'ThirdPlace' ? `${gameType('thirdPlace')} ` : `${gameType('fifthPlace')} `
          }</h3>
          {round.map((game, gameIndex) => (
            <Match
              key={gameIndex}
              local={game.local}
              visitor={game.visitor}
              localScore={game.localScore}
              visitorScore={game.visitorScore}
              time={game.time}
              end={game.end}
            />
          ))}
        </motion.div>
      ))}
    </div>
  );
};
