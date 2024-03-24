import { motion } from 'framer-motion';

export const TournamentDescription = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2,
        duration: 0.8,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8
      }
    }
  };

  return (
    <motion.div
      className="mx-4 my-8 p-6 bg-white rounded-lg shadow-lg"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h3
        className="text-xl md:text-2xl font-semibold mb-4"
        variants={itemVariants}
      >
        Detalles del Torneo
      </motion.h3>
      <motion.p
        className="text-md md:text-lg mb-3"
        variants={itemVariants}
      >
        ¡Prepárate para la emoción! Nuestro torneo cuenta con 6 equipos, cada uno liderado por un capitán elegido al azar.
      </motion.p>
      <motion.p
        className="text-md md:text-lg mb-3"
        variants={itemVariants}
      >
        La selección de capitanes será en un evento previo al torneo: un cóctel exclusivo donde el azar decidirá las tácticas en el campo.
      </motion.p>
      <motion.p
        className="text-md md:text-lg"
        variants={itemVariants}
      >
        No te pierdas la oportunidad de ser parte de esta experiencia única, llena de competición y camaradería.
      </motion.p>
    </motion.div>
  );
};

