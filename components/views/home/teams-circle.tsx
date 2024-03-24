
import { motion } from 'framer-motion';
import { useState } from 'react';
import { TeamModal } from './team-modal';

export interface SelectableTeam {
  name: string;
  color: string;
  captain: string;
  textColor?: string;
  members: string[]
}

const teams: SelectableTeam[] = [
  { name: "Equipo Verde", color: "bg-green-500", captain: "Pendiente", members: ["1. ", "2. ", "3. ", "4. ", "5. ", "6. ", "7. ", "8. "] },
  { name: "Equipo Rojo", color: "bg-red-500", captain: "Pendiente", members: ["1. ", "2. ", "3. ", "4. ", "5. ", "6. ", "7. ", "8. "] },
  { name: "Equipo Azul", color: "bg-blue-500", captain: "Pendiente", members: ["1. ", "2. ", "3. ", "4. ", "5. ", "6. ", "7. ", "8. "] },
  { name: "Equipo Amarillo", color: "bg-yellow-500", captain: "Pendiente", members: ["1. ", "2. ", "3. ", "4. ", "5. ", "6. ", "7. ", "8. "] },
  { name: "Equipo Blanco", color: "bg-white", captain: "Pendiente", textColor: "text-black", members: ["1. ", "2. ", "3. ", "4. ", "5. ", "6. ", "7. ", "8. "] },
  { name: "Equipo Negro", color: "bg-black", captain: "Pendiente", textColor: "text-white", members: ["1. ", "2. ", "3. ", "4. ", "5. ", "6. ", "7. ", "8. "] },
];

export const TeamsCircle = () => {
  const [selectedTeam, setSelectedTeam] = useState<SelectableTeam | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      className="flex flex-wrap justify-center items-center mt-8 mb-8"
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
            <p className="font-bold text-md">{team.name}</p>
            <p className='text-sm'>{team.captain}</p>
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
