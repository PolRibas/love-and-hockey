import { motion } from 'framer-motion';

export const PrizesBlock = () => {
  const prizeList = [
    { title: "Equipo Ganador", description: "Premio X", color: "bg-purple-500" },
    { title: "Mejor Atuendo", description: "Premio X", color: "bg-pink-500" },
    { title: "Crossbar Challenge", description: "Premio X", color: "bg-yellow-500" },
    { title: "Mejor Árbitro", description: "Premio X", color: "bg-green-500" },
  ];

  const containerVariants = {
    visible: {
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const circleVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      className="flex flex-wrap justify-center items-center p-5"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 1 }} // El elemento se anima cuando el 20% de él esté visible y solo ocurre una vez
    >
      {prizeList.map((prize, index) => (
        <motion.div
          key={index}
          className={`m-4 w-48 h-48 rounded-full flex flex-col justify-center items-center ${prize.color} shadow-lg`}
          variants={circleVariants}
          whileInView="visible"
          initial="hidden"
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold text-white text-center">{prize.title}</h3>
          <p className="text-white mt-2 text-center">{prize.description}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};
