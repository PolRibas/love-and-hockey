import Head from 'next/head';
import { HomeBanner, HomeHero, TeamsCircle } from '@/components';
import { teams2024 } from '@/data/teams.2024';
import { gameTypeList, games2024 } from '@/data/games.2024';
import { HomeTabs } from '@/components/views/home/home-tabs';


const Home = () => {


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
      <main className='bg-gradient-to-tr from-blue-500 to-pink-500'>
        <HomeHero />
        <HomeBanner />
        <TeamsCircle teams={teams2024} />
        <HomeTabs teams={teams2024} games={games2024} gameTypeRounds={gameTypeList as unknown as string[]}/>
        {/* <HomeBannerTwo />
        <PrizesBlock />
        <TournamentDescription /> */}
        <div className='p-10'></div>
      </main>
    </>
  );
};

export default Home;
