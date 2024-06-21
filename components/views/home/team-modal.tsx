import { ITeamPlatform } from '@/models';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

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

export const TeamModal = ({ team, isOpen, onClose }: {
  team: ITeamPlatform;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const teamsT = useTranslations('teams');
  const modalT = useTranslations('modal');

  if (!isOpen) return null;

  const { color, captain, players } = team;

  const textColor = color !== 'Blanco' ? "text-white" : "text-gray-800";

  const headerStyle = `bg-opacity-90 ${getTeamColor(color)} ${textColor} p-5 rounded-t-lg`;
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
          <h2 className="text-xl font-semibold">{color}</h2>
          <p className={captainStyle}>{modalT('captain')}: {captain}</p>
        </div>
        <div className="p-5">
          <h3 className="text-lg mb-2">{modalT('members')}:</h3>
          <ul className="list-inside list-disc">
            {players.map((member, index) => (
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
