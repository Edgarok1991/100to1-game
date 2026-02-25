import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Play } from 'lucide-react';

const TeamSetup = ({ onStart }) => {
  const [team1Name, setTeam1Name] = useState('Команда 1');
  const [team2Name, setTeam2Name] = useState('Команда 2');

  const handleStart = () => {
    if (team1Name.trim() && team2Name.trim()) {
      onStart({ team1Name: team1Name.trim(), team2Name: team2Name.trim() });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-yellow-300/20 rounded-full"
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.8 }}
        className="relative z-10 max-w-4xl w-full"
      >
        {/* Title */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-8xl font-game text-yellow-300 text-stroke mb-4 drop-shadow-2xl">
            100 к 1
          </h1>
          <p className="text-3xl text-white font-bold">
            Настройка команд
          </p>
        </motion.div>

        {/* Teams Container */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Team 1 */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
            className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 border-4 border-yellow-400 shadow-2xl"
          >
            <div className="text-center mb-6">
              <Users className="w-20 h-20 text-yellow-300 mx-auto mb-4" />
              <h2 className="text-4xl font-game text-white text-stroke-sm mb-2">
                КОМАНДА 1
              </h2>
            </div>
            <input
              type="text"
              value={team1Name}
              onChange={(e) => setTeam1Name(e.target.value)}
              maxLength={20}
              className="w-full bg-white/20 backdrop-blur-sm text-white text-center text-3xl font-bold px-6 py-4 rounded-xl border-4 border-yellow-300 focus:border-yellow-400 focus:outline-none placeholder-white/50"
              placeholder="Название команды"
            />
          </motion.div>

          {/* VS Divider */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
          >
            <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-6xl font-game px-8 py-4 rounded-full border-8 border-white shadow-2xl">
              VS
            </div>
          </motion.div>

          {/* Team 2 */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
            className="bg-gradient-to-br from-red-600 to-red-800 rounded-3xl p-8 border-4 border-yellow-400 shadow-2xl"
          >
            <div className="text-center mb-6">
              <Users className="w-20 h-20 text-yellow-300 mx-auto mb-4" />
              <h2 className="text-4xl font-game text-white text-stroke-sm mb-2">
                КОМАНДА 2
              </h2>
            </div>
            <input
              type="text"
              value={team2Name}
              onChange={(e) => setTeam2Name(e.target.value)}
              maxLength={20}
              className="w-full bg-white/20 backdrop-blur-sm text-white text-center text-3xl font-bold px-6 py-4 rounded-xl border-4 border-yellow-300 focus:border-yellow-400 focus:outline-none placeholder-white/50"
              placeholder="Название команды"
            />
          </motion.div>
        </div>

        {/* Start Button */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStart}
            disabled={!team1Name.trim() || !team2Name.trim()}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-16 py-6 rounded-2xl font-game text-4xl shadow-2xl border-6 border-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-4 mx-auto"
          >
            <Play className="w-10 h-10" />
            НАЧАТЬ ИГРУ
          </motion.button>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-center text-white text-xl"
        >
          <p className="mb-2">🎮 Команды по очереди отвечают на вопросы</p>
          <p className="mb-2">❌ 3 ошибки - ход переходит сопернику</p>
          <p>🏆 Побеждает команда с наибольшим счётом!</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TeamSetup;
