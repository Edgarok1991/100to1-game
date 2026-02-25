import { motion } from 'framer-motion';
import { Trophy, Zap, Flame, RotateCcw } from 'lucide-react';

const RoundTransition = ({ round, onContinue }) => {
  const icons = {
    0: <Trophy className="w-32 h-32" />,
    1: <Zap className="w-32 h-32" />,
    2: <Flame className="w-32 h-32" />,
    3: <RotateCcw className="w-32 h-32" />
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 200, 
          damping: 15,
          duration: 0.8
        }}
        className="text-center"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 2,
            ease: "easeInOut"
          }}
          className={`text-yellow-300 mb-8 inline-block`}
        >
          {icons[round.multiplier - 1] || icons[3]}
        </motion.div>

        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={`text-8xl font-game bg-gradient-to-r ${round.color} bg-clip-text text-transparent mb-6`}
          style={{ WebkitTextStroke: '3px rgba(255, 255, 255, 0.3)' }}
        >
          {round.name}
        </motion.h1>

        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-4xl text-white font-bold mb-4"
        >
          {round.description}
        </motion.p>

        {round.multiplier > 1 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.7, type: "spring" }}
            className="text-7xl font-game text-yellow-300 mb-8"
            style={{ textShadow: '0 0 30px rgba(251, 191, 36, 0.8)' }}
          >
            ×{round.multiplier}
          </motion.div>
        )}

        <motion.button
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onContinue}
          className={`bg-gradient-to-r ${round.color} text-white px-12 py-6 rounded-2xl font-bold text-3xl shadow-2xl border-4 border-white mt-8`}
        >
          НАЧАТЬ РАУНД
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default RoundTransition;
