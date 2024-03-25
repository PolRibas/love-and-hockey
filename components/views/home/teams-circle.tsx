
import { motion } from 'framer-motion';
import { useState } from 'react';
import { TeamModal } from './team-modal';
import { SelectableTeam } from '@/data/teams.2024';
import { useTranslations } from 'next-intl';


export const TeamsCircle = ({ teams }: { teams: SelectableTeam[] }) => {
  const [selectedTeam, setSelectedTeam] = useState<SelectableTeam | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = useTranslations('teams');

  const handleCircleClick = (team: SelectableTeam) => {
    setSelectedTeam(team);
    setIsModalOpen(true);
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
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
          className={`m-4 w-36 h-36 rounded-full flex justify-center items-center ${team.color} shadow-lg cursor-pointer`}
          variants={circleVariants}
        >
          <div className={`text-center ${team.textColor || "text-white"} p-2`}>
            <p className="font-bold text-md">{t(team.name)}</p>
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
