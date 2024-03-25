import { motion } from "framer-motion"
import { useState, useEffect, useCallback } from "react";
import Countdown from "react-countdown"
import Image from 'next/image';

export const HomeHero = () => {
  const [isComplete, setIsComplete] = useState(false);
  const [countdownKey, setCountdownKey] = useState<number | null>(null);

  const countdownRenderer = useCallback(({ days, hours, minutes, seconds, total }: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    total: number
  }) => {
    return (
      <dl className="text-center w-full">
        <div className="grid grid-cols-4 sm:grid-cols-4 gap-0 w-full ">
          {[
            { value: days, unit: 'Días' },
            { value: hours, unit: 'Horas' },
            { value: minutes, unit: 'Minutos' },
            { value: seconds, unit: 'Segundos' },
          ].map((time, index) => (
            <dd key={index} className="font-bold text-white p-4 flex flex-col items-center justify-center">
              <div className="text-lg sm:text-3xl">{time.value}</div>
              <div className="text-xs sm:text-base uppercase mt-2">{time.unit}</div>
            </dd>
          ))}
        </div>
      </dl>
    );
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
      className='flex flex-col items-center justify-center w-full max-w-md bg-white rounded-lg shadow-lg'
      >
      <Image src="/logo.webp" alt="Event Logo" width={300} height={300} />
    </motion.div>
      {countdownKey && !isComplete && (
        <motion.div
          className="mb-0 w-full max-w-md"
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
  </div>
}