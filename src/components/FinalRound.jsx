import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Timer, User, CheckCircle, XCircle } from 'lucide-react';

const FinalRound = ({ team, questions, onComplete }) => {
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [player1Answers, setPlayer1Answers] = useState([]);
  const [player2Answers, setPlayer2Answers] = useState([]);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [revealIndex, setRevealIndex] = useState(-1);
  const [currentInput, setCurrentInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(20);
  const [isTimerActive, setIsTimerActive] = useState(false);

  // Отладка - вывод вопросов в консоль
  useEffect(() => {
    console.log('=== ФИНАЛЬНЫЙ РАУНД ===');
    console.log('Количество вопросов:', questions.length);
    console.log('Вопросы:', questions.map((q, i) => `${i + 1}. ${q.question}`));
    console.log('Первый вопрос:', questions[0]);
  }, [questions]);

  useEffect(() => {
    if (isTimerActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && currentQuestion < questions.length) {
      handleSubmitAnswer('');
    }
  }, [timeLeft, isTimerActive]);

  const handleStartPlayer = (playerNum) => {
    setCurrentPlayer(playerNum);
    setCurrentQuestion(0);
    setTimeLeft(20);
    setIsTimerActive(true);
    setCurrentInput('');
  };

  const handleSubmitAnswer = (answer) => {
    const ans = answer || currentInput;
    
    if (currentPlayer === 1) {
      setPlayer1Answers([...player1Answers, ans]);
    } else {
      setPlayer2Answers([...player2Answers, ans]);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setCurrentInput('');
      setTimeLeft(20);
    } else {
      setIsTimerActive(false);
      if (currentPlayer === 1) {
        // Подсчитаем очки первого игрока
        let score1 = 0;
        const allAnswers = [...player1Answers, ans];
        allAnswers.forEach((answer, idx) => {
          const question = questions[idx];
          const matchedAnswer = question.answers.find(a => 
            a.text.toLowerCase().includes(answer.toLowerCase()) || 
            answer.toLowerCase().includes(a.text.toLowerCase())
          );
          if (matchedAnswer) {
            score1 += matchedAnswer.points;
          }
        });
        setPlayer1Score(score1);
        
        // Переход ко второму игроку
        setTimeout(() => {
          setCurrentPlayer(2);
          setCurrentQuestion(0);
          setCurrentInput('');
          setTimeLeft(20);
        }, 1000);
      } else {
        // Показать результаты
        calculateScores();
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && currentInput.trim()) {
      handleSubmitAnswer(currentInput);
    }
  };

  const calculateScores = () => {
    // Очки первого игрока уже подсчитаны, используем их
    let score2 = 0;

    player2Answers.forEach((answer, idx) => {
      const question = questions[idx];
      // Проверяем, не совпадает ли с ответом первого игрока
      const isSameAsPlayer1 = player1Answers[idx] && 
        (player1Answers[idx].toLowerCase().trim() === answer.toLowerCase().trim());
      
      if (isSameAsPlayer1) {
        // Если совпал с ответом первого игрока, даём только базовые очки
        const matchedAnswer = question.answers.find(a => 
          a.text.toLowerCase().includes(answer.toLowerCase())
        );
        if (matchedAnswer) {
          score2 += matchedAnswer.points;
        }
      } else {
        const matchedAnswer = question.answers.find(a => 
          a.text.toLowerCase().includes(answer.toLowerCase()) || 
          answer.toLowerCase().includes(a.text.toLowerCase())
        );
        if (matchedAnswer) {
          score2 += matchedAnswer.points;
        }
      }
    });

    setPlayer2Score(score2);
    setShowResults(true);
  };

  const revealAnswer = (idx) => {
    setRevealIndex(idx);
  };

  const totalScore = player1Score + player2Score;
  const isWinner = totalScore >= 200;

  if (showResults) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-yellow-300/20 rounded-full"
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
          className="relative z-10 max-w-6xl w-full"
        >
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-7xl font-game text-yellow-300 text-stroke text-center mb-4"
          >
            БОЛЬШАЯ ИГРА
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold text-white text-center mb-8"
          >
            Команда: <span className="text-yellow-300">{team.teamName}</span>
          </motion.div>

          {/* Results Table */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 border-4 border-yellow-400 mb-8">
            <div className="grid grid-cols-1 gap-4">
              {questions.map((q, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.2 }}
                  className="bg-slate-700 rounded-xl p-6"
                >
                  <div className="text-xl font-bold text-yellow-300 mb-4">{q.question}</div>
                  <div className="grid grid-cols-2 gap-4">
                    {/* Player 1 */}
                    <div className="bg-blue-600/30 rounded-lg p-4">
                      <div className="text-sm text-blue-300 mb-2">Участник 1 ({team.teamName})</div>
                      <div className="text-2xl font-bold text-white mb-2">{player1Answers[idx] || '—'}</div>
                      {revealIndex >= idx && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="flex items-center gap-2"
                        >
                          {q.answers.find(a => 
                            a.text.toLowerCase().includes(player1Answers[idx]?.toLowerCase()) ||
                            player1Answers[idx]?.toLowerCase().includes(a.text.toLowerCase())
                          ) ? (
                            <>
                              <CheckCircle className="text-green-400" />
                              <span className="text-green-400 font-bold">
                                +{q.answers.find(a => 
                                  a.text.toLowerCase().includes(player1Answers[idx]?.toLowerCase())
                                )?.points || 0}
                              </span>
                            </>
                          ) : (
                            <>
                              <XCircle className="text-red-400" />
                              <span className="text-red-400">+0</span>
                            </>
                          )}
                        </motion.div>
                      )}
                    </div>

                    {/* Player 2 */}
                    <div className="bg-red-600/30 rounded-lg p-4">
                      <div className="text-sm text-red-300 mb-2">Участник 2 ({team.teamName})</div>
                      <div className="text-2xl font-bold text-white mb-2">{player2Answers[idx] || '—'}</div>
                      {revealIndex >= idx && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="flex items-center gap-2"
                        >
                          {q.answers.find(a => 
                            a.text.toLowerCase().includes(player2Answers[idx]?.toLowerCase()) ||
                            player2Answers[idx]?.toLowerCase().includes(a.text.toLowerCase())
                          ) ? (
                            <>
                              <CheckCircle className="text-green-400" />
                              <span className="text-green-400 font-bold">
                                +{q.answers.find(a => 
                                  a.text.toLowerCase().includes(player2Answers[idx]?.toLowerCase())
                                )?.points || 0}
                              </span>
                            </>
                          ) : (
                            <>
                              <XCircle className="text-red-400" />
                              <span className="text-red-400">+0</span>
                            </>
                          )}
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {revealIndex < idx && (
                    <button
                      onClick={() => revealAnswer(idx)}
                      className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded-lg font-bold w-full"
                    >
                      Открыть ответы
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Score Display */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-6 text-center border-4 border-white">
              <User className="w-12 h-12 text-yellow-300 mx-auto mb-2" />
              <div className="text-xl text-white font-bold mb-2">Участник 1</div>
              <div className="text-sm text-yellow-200 mb-2">{team.teamName}</div>
              <div className="text-5xl font-game text-yellow-300">{player1Score}</div>
            </div>

            <div className={`bg-gradient-to-br ${isWinner ? 'from-green-500 to-emerald-600' : 'from-orange-500 to-red-600'} rounded-xl p-6 text-center border-4 border-white`}>
              <Trophy className="w-16 h-16 text-yellow-300 mx-auto mb-2" />
              <div className="text-2xl text-white font-bold mb-2">ИТОГО</div>
              <div className="text-6xl font-game text-yellow-300">{totalScore}</div>
              <div className="text-xl text-white mt-2">из 200</div>
            </div>

            <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-xl p-6 text-center border-4 border-white">
              <User className="w-12 h-12 text-yellow-300 mx-auto mb-2" />
              <div className="text-xl text-white font-bold mb-2">Участник 2</div>
              <div className="text-sm text-yellow-200 mb-2">{team.teamName}</div>
              <div className="text-5xl font-game text-yellow-300">{player2Score}</div>
            </div>
          </div>

          {/* Result Message */}
          {revealIndex === questions.length - 1 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.5 }}
              className="text-center"
            >
              {isWinner ? (
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-12 border-4 border-yellow-400 mb-6">
                  <div className="text-8xl mb-4">🎉</div>
                  <h2 className="text-6xl font-game text-white text-stroke mb-4">
                    ПОБЕДА!
                  </h2>
                  <p className="text-3xl text-white mb-4">
                    Команда "{team.teamName}" выиграла БОЛЬШУЮ ИГРУ!
                  </p>
                  <p className="text-2xl text-yellow-300">
                    Два участника команды набрали {totalScore} очков!
                  </p>
                </div>
              ) : (
                <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-3xl p-12 border-4 border-yellow-400 mb-6">
                  <div className="text-8xl mb-4">😢</div>
                  <h2 className="text-6xl font-game text-white text-stroke mb-4">
                    НЕ ХВАТИЛО!
                  </h2>
                  <p className="text-3xl text-white">
                    Всего {200 - totalScore} очков до победы!
                  </p>
                </div>
              )}

              <button
                onClick={onComplete}
                className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-12 py-6 rounded-2xl font-bold text-3xl shadow-xl border-4 border-white"
              >
                Завершить игру
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    );
  }

  if (currentPlayer === 1 && currentQuestion === 0 && player1Answers.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <h1 className="text-8xl font-game text-yellow-300 text-stroke mb-4">
            БОЛЬШАЯ ИГРА
          </h1>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold text-white mb-8"
          >
            🏆 Команда: <span className="text-yellow-300">{team.teamName}</span>
          </motion.div>
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-12 border-4 border-yellow-400 max-w-3xl">
            <User className="w-32 h-32 text-yellow-300 mx-auto mb-6" />
            <h2 className="text-5xl font-bold text-white mb-4">Первый участник</h2>
            <div className="text-2xl text-yellow-300 mb-6">из команды "{team.teamName}"</div>
            <p className="text-2xl text-white mb-4">
              Ответьте на 5 вопросов за 20 секунд каждый!
            </p>
            <p className="text-xl text-yellow-300 mb-4">
              Цель: набрать 200 очков вместе со вторым участником команды
            </p>
            <div className="bg-white/10 rounded-xl p-4 mb-8">
              <p className="text-lg text-white">
                ⚡ После вас второй участник вашей команды<br/>
                ответит на те же вопросы
              </p>
            </div>
            <button
              onClick={() => handleStartPlayer(1)}
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-12 py-6 rounded-2xl font-bold text-3xl"
            >
              НАЧАТЬ!
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (currentPlayer === 2 && currentQuestion === 0 && player2Answers.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <h1 className="text-8xl font-game text-yellow-300 text-stroke mb-4">
            БОЛЬШАЯ ИГРА
          </h1>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold text-white mb-8"
          >
            🏆 Команда: <span className="text-yellow-300">{team.teamName}</span>
          </motion.div>
          <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-3xl p-12 border-4 border-yellow-400 max-w-3xl">
            <User className="w-32 h-32 text-yellow-300 mx-auto mb-6" />
            <h2 className="text-5xl font-bold text-white mb-4">Второй участник</h2>
            <div className="text-2xl text-yellow-300 mb-6">из команды "{team.teamName}"</div>
            <p className="text-2xl text-white mb-4">
              Ваша очередь! Ответьте на те же вопросы!
            </p>
            <div className="bg-green-500/20 rounded-xl p-4 mb-4 border-2 border-green-400">
              <p className="text-2xl font-bold text-green-300">
                ✅ Первый участник набрал: {player1Score} очков
              </p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 mb-8">
              <p className="text-lg text-white">
                🎯 Вам нужно набрать ещё {Math.max(0, 200 - player1Score)} очков<br/>
                для победы в Большой игре!
              </p>
            </div>
            <button
              onClick={() => handleStartPlayer(2)}
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-12 py-6 rounded-2xl font-bold text-3xl"
            >
              НАЧАТЬ!
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className={`bg-gradient-to-r ${currentPlayer === 1 ? 'from-blue-600 to-blue-800' : 'from-red-600 to-red-800'} rounded-xl px-8 py-4 border-4 border-white`}>
          <div className="text-2xl font-bold text-white">
            Участник {currentPlayer}
          </div>
          <div className="text-sm text-yellow-300">
            {team.teamName}
          </div>
        </div>

          <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-xl px-8 py-4 border-4 border-white flex items-center gap-3">
            <Timer className="w-8 h-8 text-white" />
            <div className="text-5xl font-game text-white">{timeLeft}</div>
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl px-8 py-4 border-4 border-white">
            <div className="text-2xl font-bold text-white">
              Вопрос {currentQuestion + 1}/5
            </div>
          </div>
        </div>

        {/* Question */}
        <motion.div
          key={currentQuestion}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 mb-8 border-4 border-yellow-400 text-center"
        >
          <h2 className="text-5xl font-bold text-white text-stroke-sm">
            {questions[currentQuestion].question}
          </h2>
        </motion.div>

        {/* Input */}
        <div className="bg-white rounded-2xl p-8 border-4 border-yellow-400 mb-8">
          <input
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ваш ответ..."
            autoFocus
            className="w-full text-4xl font-bold text-center px-6 py-4 border-4 border-blue-300 rounded-xl focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={() => handleSubmitAnswer(currentInput)}
          disabled={!currentInput.trim()}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white px-12 py-8 rounded-2xl font-bold text-4xl shadow-xl border-4 border-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ОТВЕТИТЬ
        </button>
      </div>
    </div>
  );
};

export default FinalRound;
