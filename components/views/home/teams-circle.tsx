import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { TeamModal } from './team-modal';
import { useTranslations } from 'next-intl';
import { ITeamPlatform } from '@/models';

const getTeamColor = (color: string) => {
  switch (color) {
    case 'Rojo':
      return `bgRed`;
    case 'Amarillo':
      return `bg-yellow-500`;
    case 'Verde':
      return `bg-green-500`;
    case 'Azul':
      return `bgBlue`;
    case 'Blanco':
      return `bg-white`;
  }
  return `bg-black`;
}

export const TeamsCircle = () => {
  const [teams, setTeams] = useState<ITeamPlatform[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<ITeamPlatform | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = useTranslations('teams');

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await fetch('/api/teams');
        const { data } = await res.json();
        setTeams(data);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    fetchTeams();
  }, []);

  const handleCircleClick = (team: ITeamPlatform) => {
    setSelectedTeam(team);
    setIsModalOpen(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
  };

  const circleVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };
  return (
    <motion.div
      className="flex flex-wrap justify-center items-center mb-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {teams.map((team, index) => (
        <motion.div
          key={index}
          onClick={() => handleCircleClick(team)}
          className={`m-4 w-36 h-36 rounded-full flex justify-center items-center ${getTeamColor(team.color)} shadow-lg cursor-pointer ${team.color === 'Blanco' ? 'text-black' : 'text-white'}`}
          variants={circleVariants}
        >
          <div className={`text-center p-2`}>
            <p className="font-bold text-md">Amigos de</p>
            <p className='text-sm'>{team.captain || t('pending')}</p>
          </div>
        </motion.div>
      ))}
      {selectedTeam && <TeamModal
        team={selectedTeam}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />}
    </motion.div>
  );
};
