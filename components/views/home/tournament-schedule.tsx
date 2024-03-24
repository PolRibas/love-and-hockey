import React from 'react';
import { motion } from 'framer-motion';
import { GameType } from '@/data/games.2024';
import { SelectableTeam } from '@/data/teams.2024';

interface MatchProps {
  local: SelectableTeam | undefined;
  visitor: SelectableTeam | undefined;
  localScore: number;
  visitorScore: number;
  time: string;
  end: boolean;
}

const Match: React.FC<MatchProps> = ({ local, visitor, localScore, visitorScore, time, end }) => {
  return (
    <motion.div
      className={`match ${end ? 'bg-green-100' : 'bg-gray-100'} p-4  shadow`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="time text-sm font-semibold">{time}</div>
      <div className="teams text-lg font-bold">
        <span>{local?.name || 'Pendiente'}</span> vs <span>{visitor?.name || 'Pendiente'}</span>
      </div>
      <div className="score text-md">
        {end ? `${localScore} - ${visitorScore}` : 'Pendiente'}
      </div>
    </motion.div>
  );
};

export const TournamentSchedule: React.FC<{ games: Array<Array<GameType>>; gameTypeRounds: string[] }> = ({ games, gameTypeRounds }) => {
  return (
    <div className="tournament-schedule space-y-4">
      {games.map((round, index) => (
        <motion.div key={index} className="round" initial="hidden" animate="visible" variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { delay: index * 0.2 } },
        }}>
          <h3 className="text-xl font-bold mb-2">{
            gameTypeRounds[index] === 'League' ? 'Jornada ' + (index + 1) : gameTypeRounds[index] === 'SemiFinal' ? 'Semifinales' : gameTypeRounds[index] === 'Final' ? 'Final' : gameTypeRounds[index] === 'ThirdPlace' ? 'Tercer y cuarto puesto' : 'Quinto y sexto puesto'
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
