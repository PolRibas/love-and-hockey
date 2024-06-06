import Head from 'next/head';
import { HomeBanner, HomeHero, TeamsCircle } from '@/components';
// import { teams2024 } from '@/data/teams.2024';
// import { gameTypeList, games2024 } from '@/data/games.2024';
// import { HomeTabs } from '@/components/views/home/home-tabs';
import { motion } from 'framer-motion';



const Home = () => {
  const gradient = {
    animate: {
      background: [
        "linear-gradient(to top right, #db36a4, #24c6dc)", "linear-gradient(to top right, #f7ff00, #db36a4)", "linear-gradient(to top right, #db36a4, #514a9d)"
      ],
      transition: {
        duration: 10,
        ease: "easeInOut",
        loop: Infinity,
        repeatDelay: 1
      }
    }
  };

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
      <motion.main
        className='bg-gradient-to-tr from-blue-500 to-pink-500'
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        variants={gradient}
        initial="background"
        animate="animate"
      >
        <HomeHero />
        {/* <TeamsCircle teams={teams2024} /> */}
        <HomeBanner />
        {/* <HomeTabs teams={teams2024} games={games2024} gameTypeRounds={gameTypeList as unknown as string[]}/> */}
        {/* <HomeBannerTwo />
        <PrizesBlock />
        <TournamentDescription /> */}
        <div className='p-10'></div>
      </motion.main>
    </>
  );
};

export default Home;
