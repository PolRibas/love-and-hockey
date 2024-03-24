import { motion } from "framer-motion"
import { useState, useEffect, useCallback } from "react";
import Countdown from "react-countdown"
import Image from 'next/image';

export const HomeHero = () => {
  const [isComplete, setIsComplete] = useState(false);
  const [countdownKey, setCountdownKey] = useState<number | null>(null);

  const countdownRenderer = useCallback(({ days, hours, minutes, seconds }: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }) => {
    return (
      <span className="text-3xl font-semibold">
        {days}d {hours}h {minutes}m {seconds}s
      </span>
    )
  }, [])
  useEffect(() => {
    setCountdownKey(new Date('2024-06-29T12:00:00Z').getTime());
  }, []);

  useEffect(() => {
    if (isComplete) {
      console.log('The countdown has completed!');
    }
  }, [isComplete]);
  return <div className="flex flex-col items-center justify-center p-10">
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ backgroundColor: '#f7f7f7' }}
      className='flex flex-col items-center justify-center w-full max-w-md p-8 mt-8 bg-white rounded-lg shadow-lg'
    >
      <Image src="/logo.webp" alt="Event Logo" width={300} height={300} />
      {countdownKey && !isComplete && (
        <motion.div
          className="mt-1"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Countdown
            date={countdownKey}
            renderer={countdownRenderer}
            onComplete={() => setIsComplete(true)}
          />
        </motion.div>
      )}
    </motion.div>
  </div>
}