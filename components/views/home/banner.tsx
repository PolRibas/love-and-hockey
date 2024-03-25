import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';


export const HomeBanner = () => {
  const t = useTranslations('banner');
  const bannerVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
        when: "beforeChildren",
        staggerChildren: 0.3
      }
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <motion.div
      className="text-white rounded-lg  mx-3 md:mx-16 my-8 mt-0 p-6 text-center"
      initial="hidden"
      animate="visible"
      variants={bannerVariants}
    >
      <motion.h2
        className="text-2xl md:text-3xl font-bold mb-3"
        variants={itemVariants}
      >
        {t('title')}
      </motion.h2>
      <motion.p
        className="text-md md:text-xl"
        variants={itemVariants}
      >
        {t('subtitle')}
      </motion.p>
    </motion.div>
  );
};

