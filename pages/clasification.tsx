import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';

interface Team {
  team: string;
  points: number;
  scored: number;
  conceded: number;
  captain: string;
}

const fetchClassification = async () => {
  try {
    const res = await fetch('/api/standings');
    const { data } = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching classification:', error);
    return [];
  }
};

const Classification = () => {
  const [standings, setStandings] = useState<Team[]>([]);

  useEffect(() => {
    const updateClassification = async () => {
      const data = await fetchClassification();
      setStandings(data);
    };

    updateClassification();
    const interval = setInterval(updateClassification, 300000); // 5 minutos

    return () => clearInterval(interval);
  }, []);

  const gradient = {
    animate: {
      background: [
        "linear-gradient(to top right, #db36a4, #24c6dc)", "linear-gradient(to top right, #24c6dc, #db36a4)", "linear-gradient(to top right, #db36a4, #24c6dc)",
        "linear-gradient(to top right, #db36a4, #24c6dc)", "linear-gradient(to top right, #24c6dc, #db36a4)", "linear-gradient(to top right, #db36a4, #24c6dc)",
        "linear-gradient(to top right, #db36a4, #24c6dc)", "linear-gradient(to top right, #24c6dc, #db36a4)", "linear-gradient(to top right, #db36a4, #24c6dc)",
        "linear-gradient(to top right, #db36a4, #24c6dc)", "linear-gradient(to top right, #24c6dc, #db36a4)", "linear-gradient(to top right, #db36a4, #24c6dc)",
      ],
      transition: {
        duration: 40,
        ease: "easeInOut",
        loop: Infinity,
        repeatDelay: 1
      }
    }
  };

  return (
    <>
      <Head>
        <title>Clasificación - Love & Hockey 2024</title>
      </Head>
      <motion.div
        className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-tr from-blue-500 to-pink-500 relative"
        variants={gradient}
        initial="background"
        animate="animate"
      >
        <div className="bg-white shadow-lg rounded-lg p-4 max-w-4xl w-full z-10 flex flex-col items-center" style={{
            background: "#F8F8FA"
        }}>
          <motion.img 
            src="/logo.webp" 
            alt="Love & Hockey 2024" 
            className="w-24 h-24 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
          <h1 className="text-3xl font-bold mb-6 text-center">Clasificación</h1>
          <div className="overflow-x-auto w-full" >
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="py-2 px-4 text-left">Equipo</th>
                  <th className="py-2">GF</th>
                  <th className="py-2">GC</th>
                  <th className="py-2">DG</th>
                  <th className="py-2 font-black">P</th>
                </tr>
              </thead>
              <tbody>
                {standings.map((team, index) => (
                  <tr key={index} className="text-center">
                    <td className="px-4 py-2 text-lg text-left">
                      {index + 1}. {team.team}
                    </td>
                    <td className="px-4 py-2 text-lg">{team.scored}</td>
                    <td className="px-4 py-2 text-lg">{team.conceded}</td>
                    <td className="px-4 py-2 text-lg">{team.scored - team.conceded}</td>
                    <td className="px-4 py-2 text-lg font-black">{team.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Classification;
