import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import GameBoard from './components/GameBoard.jsx';
import AdminPanel from './components/AdminPanel.jsx';
import RoundTransition from './components/RoundTransition.jsx';
import TeamSetup from './components/TeamSetup.jsx';
import FinalRound from './components/FinalRound.jsx';
import { questions as initialQuestions, rounds, finalQuestions } from './data/questions.js';
import { Settings, Home, Trophy } from 'lucide-react';

function App() {
  const [questions, setQuestions] = useState(initialQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showRoundTransition, setShowRoundTransition] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [showFinalPrompt, setShowFinalPrompt] = useState(false);
  const [inFinalRound, setInFinalRound] = useState(false);
  const [teams, setTeams] = useState({
    team1Name: 'Команда 1',
    team2Name: 'Команда 2',
    team1Score: 0,
    team2Score: 0
  });

  const currentQuestion = questions[currentQuestionIndex];
  const currentRound = rounds[currentQuestion?.round || 0];

  useEffect(() => {
    // Show transition when round changes
    if (gameStarted) {
      const prevQuestion = questions[currentQuestionIndex - 1];
      if (prevQuestion && prevQuestion.round !== currentQuestion.round) {
        setShowRoundTransition(true);
      }
    }
  }, [currentQuestionIndex, gameStarted]);

  const handleStartGame = ({ team1Name, team2Name }) => {
    setTeams({
      team1Name,
      team2Name,
      team1Score: 0,
      team2Score: 0
    });
    setGameStarted(true);
    setShowRoundTransition(true);
  };

  const handleNextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;
    
    // Check if we've completed all questions
    if (nextIndex >= questions.length) {
      // Show final round prompt
      setShowFinalPrompt(true);
      return;
    }
    
    const nextQuestion = questions[nextIndex];
    
    // Check if we're moving to a new round
    if (nextQuestion.round !== currentQuestion.round) {
      setShowRoundTransition(true);
    }
    
    setCurrentQuestionIndex(nextIndex);
  };

  const handleStartFinalRound = () => {
    setShowFinalPrompt(false);
    setInFinalRound(true);
  };

  const handleSkipFinalRound = () => {
    setShowFinalPrompt(false);
    // Show winner based on current scores
  };

  const handleCompleteFinalRound = () => {
    setInFinalRound(false);
    setGameStarted(false);
    setCurrentQuestionIndex(0);
    setShowRoundTransition(false);
    setTeams({
      team1Name: 'Команда 1',
      team2Name: 'Команда 2',
      team1Score: 0,
      team2Score: 0
    });
  };

  const getWinningTeam = () => {
    if (teams.team1Score > teams.team2Score) {
      return { teamName: teams.team1Name, teamNumber: 1, score: teams.team1Score };
    } else if (teams.team2Score > teams.team1Score) {
      return { teamName: teams.team2Name, teamNumber: 2, score: teams.team2Score };
    } else {
      // Tie - use team 1
      return { teamName: teams.team1Name, teamNumber: 1, score: teams.team1Score };
    }
  };

  const handleSaveQuestions = (newQuestions) => {
    setQuestions(newQuestions);
    setShowAdmin(false);
    setCurrentQuestionIndex(0);
  };

  const handleTeamScoreUpdate = (teamNumber, pointsToAdd) => {
    setTeams(prev => ({
      ...prev,
      [`team${teamNumber}Score`]: prev[`team${teamNumber}Score`] + pointsToAdd
    }));
  };

  const handleBackToSetup = () => {
    setGameStarted(false);
    setCurrentQuestionIndex(0);
    setShowRoundTransition(false);
    setShowFinalPrompt(false);
    setInFinalRound(false);
    setTeams({
      team1Name: 'Команда 1',
      team2Name: 'Команда 2',
      team1Score: 0,
      team2Score: 0
    });
  };

  const winningTeam = getWinningTeam();

  return (
    <div className="relative min-h-screen">
      <AnimatePresence mode="wait">
        {!gameStarted ? (
          <TeamSetup onStart={handleStartGame} />
        ) : inFinalRound ? (
          <FinalRound 
            team={winningTeam}
            questions={finalQuestions}
            onComplete={handleCompleteFinalRound}
          />
        ) : showFinalPrompt ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex items-center justify-center p-8"
          >
            <motion.div
              initial={{ scale: 0.8, rotate: -5 }}
              animate={{ scale: 1, rotate: 0 }}
              className="max-w-4xl w-full"
            >
              <div className="text-center mb-8">
                <h1 className="text-8xl font-game text-yellow-300 text-stroke mb-4">
                  ОСНОВНАЯ ИГРА ЗАВЕРШЕНА!
                </h1>
              </div>

              {/* Scores */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className={`rounded-3xl p-8 border-4 ${
                  teams.team1Score >= teams.team2Score 
                    ? 'bg-gradient-to-br from-green-500 to-emerald-600 border-yellow-400' 
                    : 'bg-gradient-to-br from-slate-600 to-slate-800 border-white'
                }`}>
                  <div className="text-3xl font-bold text-white mb-4">{teams.team1Name}</div>
                  <div className="text-7xl font-game text-yellow-300">{teams.team1Score}</div>
                  {teams.team1Score >= teams.team2Score && (
                    <div className="text-6xl mt-4">👑</div>
                  )}
                </div>

                <div className={`rounded-3xl p-8 border-4 ${
                  teams.team2Score > teams.team1Score 
                    ? 'bg-gradient-to-br from-green-500 to-emerald-600 border-yellow-400' 
                    : 'bg-gradient-to-br from-slate-600 to-slate-800 border-white'
                }`}>
                  <div className="text-3xl font-bold text-white mb-4">{teams.team2Name}</div>
                  <div className="text-7xl font-game text-yellow-300">{teams.team2Score}</div>
                  {teams.team2Score > teams.team1Score && (
                    <div className="text-6xl mt-4">👑</div>
                  )}
                </div>
              </div>

              {/* Final Round Prompt */}
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-12 border-4 border-yellow-400 text-center mb-8">
                <Trophy className="w-32 h-32 text-yellow-300 mx-auto mb-6" />
                <h2 className="text-6xl font-game text-white text-stroke mb-6">
                  БОЛЬШАЯ ИГРА
                </h2>
                <p className="text-3xl text-white mb-4">
                  {winningTeam.teamName} побеждают со счётом {winningTeam.score}!
                </p>
                <p className="text-2xl text-yellow-300 mb-8">
                  Хотите сыграть в финальный раунд?<br/>
                  Два участника команды должны набрать 200 очков!
                </p>
                
                <div className="flex gap-6 justify-center">
                  <button
                    onClick={handleStartFinalRound}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-12 py-6 rounded-2xl font-bold text-3xl shadow-xl border-4 border-white hover:scale-105 transition-transform"
                  >
                    ДА! ИГРАЕМ! 🎯
                  </button>
                  <button
                    onClick={handleBackToSetup}
                    className="bg-gradient-to-r from-gray-600 to-gray-800 text-white px-12 py-6 rounded-2xl font-bold text-3xl shadow-xl border-4 border-white hover:scale-105 transition-transform"
                  >
                    Завершить игру
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : showRoundTransition ? (
          <RoundTransition
            key={`round-${currentRound?.name}`}
            round={currentRound}
            onContinue={() => setShowRoundTransition(false)}
          />
        ) : (
          <GameBoard
            key={currentQuestion?.id}
            question={currentQuestion}
            round={currentRound}
            teams={teams}
            onNextQuestion={handleNextQuestion}
            onReset={() => {}}
            onTeamScoreUpdate={handleTeamScoreUpdate}
          />
        )}
      </AnimatePresence>

      {/* Control Buttons */}
      {gameStarted && !inFinalRound && (
        <>
          {/* Admin Button */}
          <button
            onClick={() => setShowAdmin(true)}
            className="fixed top-8 right-8 bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full shadow-2xl border-4 border-white z-40 transition-transform hover:scale-110"
          >
            <Settings className="w-8 h-8" />
          </button>

          {/* Home Button */}
          <button
            onClick={handleBackToSetup}
            className="fixed top-8 left-8 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-2xl border-4 border-white z-40 transition-transform hover:scale-110"
          >
            <Home className="w-8 h-8" />
          </button>
        </>
      )}

      {/* Admin Panel */}
      <AnimatePresence>
        {showAdmin && (
          <AdminPanel
            questions={questions}
            onSave={handleSaveQuestions}
            onClose={() => setShowAdmin(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
