import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnswerCard from './AnswerCard.jsx';
import { Sparkles, Trophy, RefreshCw, Zap, Flame, RotateCcw, Users, ArrowRight } from 'lucide-react';

const GameBoard = ({ 
  question, 
  round, 
  teams,
  onNextQuestion, 
  onReset, 
  onTeamScoreUpdate 
}) => {
  const [revealedAnswers, setRevealedAnswers] = useState(new Set());
  const [roundScore, setRoundScore] = useState(0);
  const [currentTeam, setCurrentTeam] = useState(1);
  const [teamMistakes, setTeamMistakes] = useState({ team1: 0, team2: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [showScorePopup, setShowScorePopup] = useState(false);
  const [stealMode, setStealMode] = useState(false);
  const [showStealPrompt, setShowStealPrompt] = useState(false);

  useEffect(() => {
    setRevealedAnswers(new Set());
    setRoundScore(0);
    setTeamMistakes({ team1: 0, team2: 0 });
    setGameOver(false);
    setStealMode(false);
    setShowStealPrompt(false);
    setCurrentTeam(1);
  }, [question.id]);

  const calculatePoints = (basePoints, index) => {
    // В обратном раунде инвертируем очки
    if (round.name === "Обратный раунд") {
      const answers = question.answers;
      const invertedPoints = answers[answers.length - 1 - index].points;
      return invertedPoints * round.multiplier;
    }
    return basePoints * round.multiplier;
  };

  const handleAnswerClick = (index) => {
    if (revealedAnswers.has(index) || gameOver) return;

    const newRevealed = new Set(revealedAnswers);
    newRevealed.add(index);
    setRevealedAnswers(newRevealed);
    
    const points = calculatePoints(question.answers[index].points, index);
    const newRoundScore = roundScore + points;
    setRoundScore(newRoundScore);

    // Show score popup
    setShowScorePopup(true);
    setTimeout(() => setShowScorePopup(false), 1500);

    // Check if all answers are revealed
    if (newRevealed.size === question.answers.length) {
      setTimeout(() => {
        // Award points to current team
        if (stealMode) {
          const otherTeam = currentTeam === 1 ? 2 : 1;
          onTeamScoreUpdate(otherTeam, newRoundScore);
        } else {
          onTeamScoreUpdate(currentTeam, newRoundScore);
        }
        setGameOver(true);
      }, 1000);
    }
  };

  const handleMistake = () => {
    if (gameOver) return;

    const teamKey = `team${currentTeam}`;
    const newMistakes = teamMistakes[teamKey] + 1;
    
    setTeamMistakes({
      ...teamMistakes,
      [teamKey]: newMistakes
    });

    // If team gets 3 strikes
    if (newMistakes === 3) {
      if (!stealMode) {
        // First team failed, offer steal to other team
        setShowStealPrompt(true);
      } else {
        // Steal team also failed, original team keeps points
        const originalTeam = currentTeam === 1 ? 2 : 1;
        onTeamScoreUpdate(originalTeam, roundScore);
        setTimeout(() => setGameOver(true), 1500);
      }
    }
  };

  const handleSteal = (accept) => {
    setShowStealPrompt(false);
    if (accept) {
      // Switch to other team for steal attempt
      setCurrentTeam(currentTeam === 1 ? 2 : 1);
      setStealMode(true);
    } else {
      // Other team declined, current team keeps the points
      onTeamScoreUpdate(currentTeam, roundScore);
      setGameOver(true);
    }
  };

  const switchTeam = () => {
    setCurrentTeam(currentTeam === 1 ? 2 : 1);
  };

  const handleReset = () => {
    setRevealedAnswers(new Set());
    setRoundScore(0);
    setTeamMistakes({ team1: 0, team2: 0 });
    setGameOver(false);
    setStealMode(false);
    setShowStealPrompt(false);
    setCurrentTeam(1);
  };

  const handleNext = () => {
    handleReset();
    onNextQuestion();
  };

  const getCurrentTeamMistakes = () => {
    return teamMistakes[`team${currentTeam}`];
  };

  const totalPossiblePoints = question.answers.reduce((sum, answer) => sum + answer.points, 0) * round.multiplier;

  const getRoundIcon = () => {
    switch(round.name) {
      case "Двойной раунд": return <Zap className="w-8 h-8" />;
      case "Тройной раунд": return <Flame className="w-8 h-8" />;
      case "Обратный раунд": return <RotateCcw className="w-8 h-8" />;
      default: return <Trophy className="w-8 h-8" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-yellow-300/30 rounded-full"
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-8 relative z-10"
      >
        <h1 className="text-7xl font-game text-yellow-300 text-stroke mb-2 drop-shadow-2xl">
          100 к 1
        </h1>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
          className={`inline-block bg-gradient-to-r ${round.color} px-6 py-3 rounded-xl border-4 border-white shadow-xl`}
        >
          <div className="flex items-center gap-3">
            {getRoundIcon()}
            <span className="text-2xl font-game text-white">{round.name}</span>
            {round.multiplier > 1 && (
              <span className="text-3xl font-game text-yellow-300">×{round.multiplier}</span>
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* Question */}
      <motion.div
        key={question.id}
        initial={{ scale: 0.9, opacity: 0, rotateX: -15 }}
        animate={{ scale: 1, opacity: 1, rotateX: 0 }}
        transition={{ delay: 0.2, type: "spring" }}
        className={`bg-gradient-to-r ${round.color} rounded-2xl p-8 mb-8 shadow-2xl border-4 border-yellow-400 max-w-4xl relative z-10`}
      >
        <motion.h2 
          className="text-4xl font-bold text-white text-center text-stroke-sm"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {question.question}
        </motion.h2>
      </motion.div>

      {/* Teams Display */}
      <div className="grid grid-cols-3 gap-4 mb-8 max-w-6xl w-full relative z-10">
        {/* Team 1 */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ 
            x: 0, 
            opacity: 1,
            scale: currentTeam === 1 && !gameOver ? 1.05 : 1
          }}
          className={`bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-6 shadow-xl border-4 ${
            currentTeam === 1 && !gameOver ? 'border-yellow-300 shadow-yellow-300/50' : 'border-white'
          } relative overflow-hidden`}
        >
          {currentTeam === 1 && !gameOver && (
            <motion.div
              className="absolute inset-0 bg-yellow-300/20"
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-6 h-6 text-yellow-300" />
              <div className="text-lg font-bold text-yellow-300">{teams.team1Name}</div>
            </div>
            <motion.div 
              className="text-5xl font-game text-white text-stroke-sm mb-2"
              key={teams.team1Score}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.3 }}
            >
              {teams.team1Score}
            </motion.div>
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`text-2xl ${i < teamMistakes.team1 ? 'opacity-100' : 'opacity-20'}`}
                >
                  ❌
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Round Score */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={`bg-gradient-to-r ${round.color} rounded-xl p-6 shadow-xl border-4 border-white flex flex-col items-center justify-center`}
        >
          <div className="text-sm font-bold text-white mb-2">НА КОНУ</div>
          <div className="text-6xl font-game text-yellow-300 text-stroke">
            {roundScore}
          </div>
          {stealMode && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="mt-2 bg-red-500 text-white px-4 py-1 rounded-full text-sm font-bold"
            >
              ОТБОЙ!
            </motion.div>
          )}
        </motion.div>

        {/* Team 2 */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ 
            x: 0, 
            opacity: 1,
            scale: currentTeam === 2 && !gameOver ? 1.05 : 1
          }}
          className={`bg-gradient-to-br from-red-600 to-red-800 rounded-xl p-6 shadow-xl border-4 ${
            currentTeam === 2 && !gameOver ? 'border-yellow-300 shadow-yellow-300/50' : 'border-white'
          } relative overflow-hidden`}
        >
          {currentTeam === 2 && !gameOver && (
            <motion.div
              className="absolute inset-0 bg-yellow-300/20"
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-6 h-6 text-yellow-300" />
              <div className="text-lg font-bold text-yellow-300">{teams.team2Name}</div>
            </div>
            <motion.div 
              className="text-5xl font-game text-white text-stroke-sm mb-2"
              key={teams.team2Score}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.3 }}
            >
              {teams.team2Score}
            </motion.div>
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`text-2xl ${i < teamMistakes.team2 ? 'opacity-100' : 'opacity-20'}`}
                >
                  ❌
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Current Team Indicator */}
      {!gameOver && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`mb-4 text-center relative z-10`}
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className={`inline-block bg-gradient-to-r ${
              currentTeam === 1 ? 'from-blue-500 to-blue-700' : 'from-red-500 to-red-700'
            } text-white px-8 py-3 rounded-full font-bold text-2xl border-4 border-yellow-300 shadow-xl`}
          >
            <div className="flex items-center gap-3">
              <ArrowRight className="w-6 h-6" />
              ХОД: {currentTeam === 1 ? teams.team1Name : teams.team2Name}
              <ArrowRight className="w-6 h-6" />
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Score Popup */}
      <AnimatePresence>
        {showScorePopup && (
          <motion.div
            initial={{ scale: 0, y: -100 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed top-1/3 left-1/2 -translate-x-1/2 z-50"
          >
            <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white text-6xl font-game px-12 py-8 rounded-3xl border-8 border-white shadow-2xl">
              +{calculatePoints(question.answers[[...revealedAnswers].pop()].points, [...revealedAnswers].pop())}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Answer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl w-full mb-8 relative z-10">
        {question.answers.map((answer, index) => (
          <AnswerCard
            key={index}
            answer={answer}
            index={index}
            isRevealed={revealedAnswers.has(index)}
            onClick={() => handleAnswerClick(index)}
            multiplier={round.multiplier}
            isReverse={round.name === "Обратный раунд"}
            displayPoints={calculatePoints(answer.points, index)}
          />
        ))}
      </div>

      {/* Wrong Answer Button */}
      {!gameOver && (
        <div className="flex gap-4 mb-4 relative z-10">
          <motion.button
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleMistake}
            className="bg-gradient-to-r from-red-600 to-red-800 text-white px-8 py-4 rounded-xl font-bold text-xl shadow-xl border-4 border-white overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-red-400"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.5 }}
            />
            <span className="relative z-10">Неправильный ответ ❌</span>
          </motion.button>

          <motion.button
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={switchTeam}
            className="bg-gradient-to-r from-purple-600 to-purple-800 text-white px-8 py-4 rounded-xl font-bold text-xl shadow-xl border-4 border-white flex items-center gap-2"
          >
            <ArrowRight className="w-6 h-6" />
            Передать ход
          </motion.button>
        </div>
      )}

      {/* Control Buttons */}
      <div className="flex gap-4 relative z-10">
        <motion.button
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleReset}
          className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-4 rounded-xl font-bold text-xl shadow-xl border-4 border-white flex items-center gap-2"
        >
          <RefreshCw className="w-6 h-6" />
          Сбросить
        </motion.button>

        <motion.button
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNext}
          className="bg-gradient-to-r from-green-600 to-green-800 text-white px-8 py-4 rounded-xl font-bold text-xl shadow-xl border-4 border-white flex items-center gap-2"
        >
          <Sparkles className="w-6 h-6" />
          Следующий вопрос
        </motion.button>
      </div>

      {/* Steal Prompt Modal */}
      <AnimatePresence>
        {showStealPrompt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.5, rotate: 10 }}
              className="bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl p-12 shadow-2xl border-8 border-white max-w-2xl"
            >
              <div className="text-center">
                <div className="text-8xl mb-6">⚡</div>
                <h2 className="text-6xl font-game text-white text-stroke mb-6">
                  ОТБОЙ!
                </h2>
                <p className="text-3xl text-white mb-4">
                  {currentTeam === 1 ? teams.team1Name : teams.team2Name} получили 3 ошибки!
                </p>
                <p className="text-2xl text-yellow-300 mb-8">
                  {currentTeam === 1 ? teams.team2Name : teams.team1Name}, хотите попробовать отобрать очки?
                </p>
                <div className="text-4xl font-bold text-white mb-8">
                  На кону: {roundScore} очков
                </div>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => handleSteal(true)}
                    className="bg-green-600 hover:bg-green-700 text-white px-12 py-6 rounded-xl font-bold text-3xl shadow-xl"
                  >
                    ДА! 🎯
                  </button>
                  <button
                    onClick={() => handleSteal(false)}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-12 py-6 rounded-xl font-bold text-3xl shadow-xl"
                  >
                    НЕТ
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Game Over Modal */}
      <AnimatePresence>
        {gameOver && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            onClick={() => setGameOver(false)}
          >
            <motion.div
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.5, rotate: 10 }}
              className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-3xl p-12 shadow-2xl border-8 border-white max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="text-8xl mb-6">
                  {revealedAnswers.size === question.answers.length ? '🎉' : '😢'}
                </div>
                <h2 className="text-6xl font-game text-white text-stroke mb-6">
                  {revealedAnswers.size === question.answers.length ? 'ПОБЕДА!' : 'ИГРА ОКОНЧЕНА'}
                </h2>
                <div className="text-4xl font-bold text-white mb-4">
                  Очков заработано: {roundScore}
                </div>
                <div className="text-3xl font-bold text-white mb-6">
                  {teams.team1Name}: {teams.team1Score} | {teams.team2Name}: {teams.team2Score}
                </div>
                <div className="text-2xl text-white mb-8">
                  Открыто ответов: {revealedAnswers.size} из {question.answers.length}
                </div>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => {
                      setGameOver(false);
                      handleReset();
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-xl shadow-xl"
                  >
                    Играть ещё раз
                  </button>
                  <button
                    onClick={() => {
                      setGameOver(false);
                      handleNext();
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold text-xl shadow-xl"
                  >
                    Следующий вопрос
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GameBoard;
