// components/TeamModal.jsx

import { SelectableTeam } from '@/data/teams.2024';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';


export const TeamModal = ({ team, isOpen, onClose }: {
  team: SelectableTeam;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const teamsT = useTranslations('teams');
  const modalT = useTranslations('modal');

  if (!isOpen) return null;


  const { color, textColor = "text-white", captain, members } = team;

  // Estilos dinámicos basados en los colores del equipo
  const headerStyle = `bg-opacity-90 ${color} ${textColor} p-5 rounded-t-lg`;
  const captainStyle = `${textColor} font-semibold`;

  const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const modalVariants = {
    hidden: { scale: 0.5, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { delay: 0.2, type: "spring", stiffness: 100 }
    },
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-lg bg-white rounded-lg shadow-xl mx-6"
        variants={modalVariants}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={headerStyle}>
          <h2 className="text-xl font-semibold">{teamsT(team.name)}</h2>
          <p className={captainStyle}>{modalT('captain')}: {captain}</p>
        </div>
        <div className="p-5">
          <h3 className="text-lg mb-2">{modalT('members')}:</h3>
          <ul className="list-inside list-disc">
            {members.map((member, index) => (
              <li key={index} className="text-gray-700">{member}</li>
            ))}
          </ul>
        </div>
        <div className="flex justify-center p-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 transition"
          >
            {modalT('close')}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
