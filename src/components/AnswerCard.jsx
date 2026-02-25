import { motion } from 'framer-motion';

const AnswerCard = ({ answer, index, isRevealed, onClick, multiplier = 1, isReverse = false, displayPoints }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative group cursor-pointer"
      onClick={onClick}
      whileHover={{ scale: isRevealed ? 1 : 1.05, y: isRevealed ? 0 : -5 }}
    >
      <div className="relative h-20 perspective-1000">
        <motion.div
          className="w-full h-full relative"
          initial={false}
          animate={{ rotateY: isRevealed ? 180 : 0 }}
          transition={{ duration: 0.6, type: "spring" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front (Hidden) */}
          <motion.div 
            className="absolute inset-0 backface-hidden rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 border-4 border-yellow-400 shadow-2xl flex items-center justify-center overflow-hidden"
            style={{ backfaceVisibility: 'hidden' }}
            whileHover={{ borderColor: '#fbbf24' }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ['-200%', '200%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            <div className="text-center relative z-10">
              <motion.div 
                className="text-5xl font-game text-yellow-300 text-stroke"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {index + 1}
              </motion.div>
            </div>
          </motion.div>

          {/* Back (Revealed) */}
          <motion.div 
            className="absolute inset-0 backface-hidden rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 border-4 border-yellow-400 shadow-2xl flex items-center justify-between px-6 overflow-hidden"
            style={{ 
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)'
            }}
            animate={{
              boxShadow: [
                '0 0 20px rgba(34, 197, 94, 0.5)',
                '0 0 40px rgba(34, 197, 94, 0.8)',
                '0 0 20px rgba(34, 197, 94, 0.5)',
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <div className="text-2xl font-bold text-white text-stroke-sm uppercase flex-1 relative z-10">
              {answer.text}
            </div>
            <div className="flex flex-col items-end relative z-10">
              <motion.div 
                className="text-4xl font-game text-yellow-300 text-stroke ml-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                {displayPoints || answer.points}
              </motion.div>
              {multiplier > 1 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-sm font-bold text-yellow-200"
                >
                  (×{multiplier})
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AnswerCard;
