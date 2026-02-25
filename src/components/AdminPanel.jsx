import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Save, X } from 'lucide-react';

const AdminPanel = ({ questions, onSave, onClose }) => {
  const [editedQuestions, setEditedQuestions] = useState(JSON.parse(JSON.stringify(questions)));

  const addQuestion = () => {
    const newQuestion = {
      id: Date.now(),
      round: 0,
      question: "Новый вопрос",
      answers: [
        { text: "Ответ 1", points: 40 },
        { text: "Ответ 2", points: 30 },
        { text: "Ответ 3", points: 15 },
        { text: "Ответ 4", points: 10 },
        { text: "Ответ 5", points: 3 },
        { text: "Ответ 6", points: 2 },
      ]
    };
    setEditedQuestions([...editedQuestions, newQuestion]);
  };

  const roundNames = [
    "Простой раунд",
    "Двойной раунд",
    "Тройной раунд",
    "Обратный раунд"
  ];

  const removeQuestion = (index) => {
    setEditedQuestions(editedQuestions.filter((_, i) => i !== index));
  };

  const updateQuestion = (index, field, value) => {
    const updated = [...editedQuestions];
    updated[index][field] = value;
    setEditedQuestions(updated);
  };

  const updateAnswer = (qIndex, aIndex, field, value) => {
    const updated = [...editedQuestions];
    updated[qIndex].answers[aIndex][field] = field === 'points' ? parseInt(value) || 0 : value;
    setEditedQuestions(updated);
  };

  const handleSave = () => {
    onSave(editedQuestions);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-8 overflow-y-auto"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-4 border-purple-500"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-4xl font-game text-purple-400">Панель управления</h2>
          <button
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          {editedQuestions.map((q, qIndex) => (
            <div key={q.id} className="bg-slate-700 rounded-xl p-6 border-2 border-slate-600">
              <div className="flex gap-4 mb-4">
                <select
                  value={q.round || 0}
                  onChange={(e) => updateQuestion(qIndex, 'round', parseInt(e.target.value))}
                  className="bg-slate-600 text-white px-4 py-3 rounded-lg font-bold border-2 border-slate-500 focus:border-purple-500 focus:outline-none"
                >
                  {roundNames.map((name, idx) => (
                    <option key={idx} value={idx}>{name}</option>
                  ))}
                </select>
                <input
                  type="text"
                  value={q.question}
                  onChange={(e) => updateQuestion(qIndex, 'question', e.target.value)}
                  className="flex-1 bg-slate-600 text-white px-4 py-3 rounded-lg text-xl font-bold border-2 border-slate-500 focus:border-purple-500 focus:outline-none"
                  placeholder="Вопрос"
                />
                <button
                  onClick={() => removeQuestion(qIndex)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {q.answers.map((answer, aIndex) => (
                  <div key={aIndex} className="flex gap-2">
                    <div className="bg-slate-600 text-white px-3 py-2 rounded-lg font-bold flex items-center justify-center w-10">
                      {aIndex + 1}
                    </div>
                    <input
                      type="text"
                      value={answer.text}
                      onChange={(e) => updateAnswer(qIndex, aIndex, 'text', e.target.value)}
                      className="flex-1 bg-slate-600 text-white px-3 py-2 rounded-lg border-2 border-slate-500 focus:border-purple-500 focus:outline-none"
                      placeholder="Ответ"
                    />
                    <input
                      type="number"
                      value={answer.points}
                      onChange={(e) => updateAnswer(qIndex, aIndex, 'points', e.target.value)}
                      className="w-20 bg-slate-600 text-white px-3 py-2 rounded-lg text-center font-bold border-2 border-slate-500 focus:border-purple-500 focus:outline-none"
                      placeholder="Очки"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-4 mt-8">
          <button
            onClick={addQuestion}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Добавить вопрос
          </button>
          <button
            onClick={handleSave}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2"
          >
            <Save className="w-5 h-5" />
            Сохранить изменения
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AdminPanel;
