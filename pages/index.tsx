import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Countdown from 'react-countdown';
import Head from 'next/head';


// Renderer para el contador regresivo
const countdownRenderer = ({ days, hours, minutes, seconds }: {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}) => {
  return (
    <span className="text-3xl font-semibold">
      {days}d {hours}h {minutes}m {seconds}s
    </span>
  );
};

const Home = () => {
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // setTimeout(() => {
    //   window.scrollY({
    //     top: window.innerHeight,
    //     behavior: 'smooth'
    //   })
    // }, 10000);
    if (isComplete) {
      // Acciones a realizar cuando se complete el contador regresivo
      console.log('The countdown has completed!');
    }
  }, [isComplete]);

  const eventDate = new Date('2024-06-29T12:00:00Z').getTime();

  return (
    <>
      <Head>
        <title>Love & Hockey 2024</title>
        <meta name="description" content="Se avecina el torneo de hockey hierba senior del club: habilidad en la cancha, cerveza en la mano, pizza en el plato y fiesta al caer la noche. Trae tu mejor atuendo y espíritu competitivo. ¡Empecemos el verano con amor y buen hockey!" />
        <meta property="og:title" content="Se avecina el torneo de hockey hierba senior del club - Catalonia Senior" />
        <meta property="og:description" content="Se avecina el torneo de hockey hierba senior del club: habilidad en la cancha, cerveza en la mano, pizza en el plato y fiesta al caer la noche.  Trae tu mejor atuendo y espíritu competitivo. ¡Empecemos el verano con amor y buen hockey!" />
        <meta property="og:image" content="/logo.webp" />
        <meta property="og:url" content="https://love-and-hockey.vercel.app/" />
      </Head>
      <main>
        <div className="flex flex-col items-center justify-center h-screen p-4 bg-gradient-to-r from-blue-500 to-pink-500">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ backgroundColor: '#f7f7f7' }}
            className='flex flex-col items-center justify-center w-full max-w-2xl p-8 bg-white rounded-lg shadow-lg'
          >
            <Image src="/logo.webp" alt="Event Logo" width={500} height={500} />
            <motion.div
              className="mt-8"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Countdown
                date={eventDate}
                renderer={countdownRenderer}
                onComplete={() => setIsComplete(true)}
              />
            </motion.div>
            {/* <div className="mt-8">
          <p>Información principal del torneo</p>
          <p>Premios</p>
          <p>Equipos</p>
          <p>Horarios / Partidos Resultados</p>
        </div> */}
          </motion.div>
        </div>
        {/* <div className='bg-yellow-100 w-full h-screen'>
        </div> */}
      </main>
    </>
  );
};

export default Home;
