import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GameType } from '@/data/games.2024';
import { TournamentSchedule } from './tournament-schedule';
import { TeamStandings } from './teams-standings';
import { SelectableTeam } from '@/data/teams.2024';
// Importa aquí tu componente de clasificación cuando lo tengas listo
// import TeamStandings from './TeamStandings';

export const HomeTabs = ({ games, gameTypeRounds, teams }: { games: Array<Array<GameType>> ; gameTypeRounds: string[], teams: SelectableTeam[]}) => {
  const [activeTab, setActiveTab] = useState('schedule');

  const tabVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="max-w-4xl md:mx-auto mt-16 mx-2">
      <div className="bg-white rounded-lg shadow-lg">
        <div className="flex border-b">
          <button
            className={`flex-1 py-2 text-xl font-semibold ${activeTab === 'schedule' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('schedule')}
          >
            Calendario
          </button>
          <button
            className={`flex-1 py-2 text-xl font-semibold ${activeTab === 'standings' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('standings')}
          >
            Clasificación
          </button>
        </div>
        <div className="p-4">
          <AnimatePresence>
            {activeTab === 'schedule' && (
              <motion.div
                key="schedule"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={tabVariants}
                transition={{ duration: 0.2 }}
              >
                <TournamentSchedule games={games} gameTypeRounds={gameTypeRounds} />
              </motion.div>
            )}
            {/* Descomenta la siguiente línea cuando tengas el componente de clasificación listo */}
            {activeTab === 'standings' && (
              <motion.div
                key="standings"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={tabVariants}
                transition={{ duration: 0.2 }}
              >
                <TeamStandings games={games} gameTypeRounds={gameTypeRounds} teams={teams} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
