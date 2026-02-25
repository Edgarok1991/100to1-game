export const rounds = [
  {
    name: "Простой раунд",
    multiplier: 1,
    color: "from-blue-600 to-blue-800",
    description: "Обычные очки"
  },
  {
    name: "Двойной раунд",
    multiplier: 2,
    color: "from-purple-600 to-purple-800",
    description: "Все очки удваиваются!"
  },
  {
    name: "Тройной раунд",
    multiplier: 3,
    color: "from-red-600 to-red-800",
    description: "Все очки утраиваются!"
  },
  {
    name: "Обратный раунд",
    multiplier: 1,
    color: "from-green-600 to-green-800",
    description: "Наименее популярные ответы дают больше очков!"
  }
];

// Вопросы для финального раунда (Большая игра)
export const finalQuestions = [
  {
    question: "Популярное место для отпуска",
    answers: [
      { text: "Море/Пляж", points: 40 },
      { text: "Горы", points: 25 },
      { text: "Заграница", points: 15 },
      { text: "Дача", points: 10 },
      { text: "Дом/Город", points: 5 },
    ]
  },
  {
    question: "Что люди забывают чаще всего?",
    answers: [
      { text: "Ключи", points: 35 },
      { text: "Телефон", points: 30 },
      { text: "Имена", points: 15 },
      { text: "Кошелёк", points: 10 },
      { text: "Пароли", points: 5 },
    ]
  },
  {
    question: "Самая важная комната в доме",
    answers: [
      { text: "Кухня", points: 38 },
      { text: "Спальня", points: 30 },
      { text: "Ванная", points: 15 },
      { text: "Гостиная", points: 10 },
      { text: "Детская", points: 5 },
    ]
  },
  {
    question: "Что покупают в последний момент?",
    answers: [
      { text: "Подарок", points: 40 },
      { text: "Хлеб", points: 25 },
      { text: "Билеты", points: 15 },
      { text: "Цветы", points: 10 },
      { text: "Еду", points: 5 },
    ]
  },
  {
    question: "Самый популярный фрукт",
    answers: [
      { text: "Яблоко", points: 42 },
      { text: "Банан", points: 28 },
      { text: "Апельсин", points: 15 },
      { text: "Груша", points: 8 },
      { text: "Виноград", points: 5 },
    ]
  }
];

export const questions = [
  // Простой раунд (1x)
  {
    id: 1,
    round: 0,
    question: "Что люди боятся потерять больше всего?",
    answers: [
      { text: "Близких людей", points: 42 },
      { text: "Здоровье", points: 28 },
      { text: "Деньги", points: 15 },
      { text: "Работу", points: 8 },
      { text: "Память", points: 5 },
      { text: "Свободу", points: 2 },
    ]
  },
  {
    id: 2,
    round: 0,
    question: "Причины опоздания на работу",
    answers: [
      { text: "Пробки на дорогах", points: 38 },
      { text: "Проспал", points: 30 },
      { text: "Транспорт не пришёл", points: 15 },
      { text: "Проблемы с детьми", points: 9 },
      { text: "Плохое самочувствие", points: 5 },
      { text: "Забыл документы", points: 3 },
    ]
  },
  {
    id: 3,
    round: 0,
    question: "Что заставляет людей менять работу?",
    answers: [
      { text: "Низкая зарплата", points: 45 },
      { text: "Плохой начальник", points: 25 },
      { text: "Нет карьерного роста", points: 15 },
      { text: "Скучная работа", points: 8 },
      { text: "Дальний путь", points: 4 },
      { text: "Плохой коллектив", points: 3 },
    ]
  },
  {
    id: 4,
    round: 0,
    question: "О чём чаще всего врут в резюме?",
    answers: [
      { text: "Опыт работы", points: 40 },
      { text: "Знание языков", points: 28 },
      { text: "Навыки и умения", points: 18 },
      { text: "Причина увольнения", points: 8 },
      { text: "Образование", points: 4 },
      { text: "Возраст", points: 2 },
    ]
  },
  {
    id: 5,
    round: 0,
    question: "Что раздражает людей в общественном транспорте?",
    answers: [
      { text: "Толпа и давка", points: 35 },
      { text: "Громкие разговоры", points: 30 },
      { text: "Неприятный запах", points: 18 },
      { text: "Громкая музыка", points: 10 },
      { text: "Невоспитанные люди", points: 5 },
      { text: "Жара или холод", points: 2 },
    ]
  },
  
  // Двойной раунд (2x)
  {
    id: 6,
    round: 1,
    question: "За что люди готовы переплатить?",
    answers: [
      { text: "Качество", points: 38 },
      { text: "Бренд", points: 25 },
      { text: "Удобство", points: 18 },
      { text: "Экономия времени", points: 10 },
      { text: "Статус", points: 6 },
      { text: "Гарантия", points: 3 },
    ]
  },
  {
    id: 7,
    round: 1,
    question: "Что люди скрывают от своих родителей?",
    answers: [
      { text: "Отношения", points: 35 },
      { text: "Плохие оценки", points: 30 },
      { text: "Вредные привычки", points: 18 },
      { text: "Финансовые проблемы", points: 10 },
      { text: "Неудачи", points: 5 },
      { text: "Настоящих друзей", points: 2 },
    ]
  },
  {
    id: 8,
    round: 1,
    question: "Признаки того, что человек нервничает",
    answers: [
      { text: "Потеют руки", points: 32 },
      { text: "Заикается", points: 28 },
      { text: "Избегает взгляда", points: 20 },
      { text: "Суетится", points: 12 },
      { text: "Грызёт ногти", points: 5 },
      { text: "Краснеет", points: 3 },
    ]
  },
  {
    id: 9,
    round: 1,
    question: "Что мешает людям похудеть?",
    answers: [
      { text: "Лень", points: 40 },
      { text: "Любовь к еде", points: 28 },
      { text: "Нет силы воли", points: 15 },
      { text: "Стресс", points: 9 },
      { text: "Здоровье", points: 5 },
      { text: "Нет времени", points: 3 },
    ]
  },
  {
    id: 10,
    round: 1,
    question: "Что люди делают, когда им скучно?",
    answers: [
      { text: "Сидят в телефоне", points: 42 },
      { text: "Смотрят сериалы", points: 30 },
      { text: "Едят", points: 15 },
      { text: "Спят", points: 8 },
      { text: "Играют в игры", points: 3 },
      { text: "Убираются", points: 2 },
    ]
  },

  // Тройной раунд (3x)
  {
    id: 11,
    round: 2,
    question: "Почему люди не высыпаются?",
    answers: [
      { text: "Поздно ложатся", points: 40 },
      { text: "Стресс", points: 28 },
      { text: "Сидят в телефоне", points: 18 },
      { text: "Бессонница", points: 8 },
      { text: "Шум", points: 4 },
      { text: "Маленький ребёнок", points: 2 },
    ]
  },
  {
    id: 12,
    round: 2,
    question: "Что выдаёт в человеке туриста?",
    answers: [
      { text: "Фотоаппарат", points: 38 },
      { text: "Карта в руках", points: 30 },
      { text: "Рюкзак", points: 15 },
      { text: "Растерянный вид", points: 10 },
      { text: "Яркая одежда", points: 5 },
      { text: "Селфи-палка", points: 2 },
    ]
  },
  {
    id: 13,
    round: 2,
    question: "Что люди обещают, но не выполняют?",
    answers: [
      { text: "Похудеть", points: 35 },
      { text: "Бросить вредные привычки", points: 30 },
      { text: "Начать заниматься спортом", points: 20 },
      { text: "Выучить язык", points: 8 },
      { text: "Откладывать деньги", points: 5 },
      { text: "Перезвонить", points: 2 },
    ]
  },
  {
    id: 14,
    round: 2,
    question: "О чём люди жалеют в старости?",
    answers: [
      { text: "Упущенные возможности", points: 38 },
      { text: "Мало путешествовали", points: 28 },
      { text: "Не сказали важные слова", points: 18 },
      { text: "Мало времени с семьёй", points: 10 },
      { text: "Много работали", points: 4 },
      { text: "Плохое здоровье", points: 2 },
    ]
  },
  {
    id: 15,
    round: 2,
    question: "Что раздражает людей в социальных сетях?",
    answers: [
      { text: "Хвастовство", points: 40 },
      { text: "Фейковые новости", points: 25 },
      { text: "Политика", points: 18 },
      { text: "Спам и реклама", points: 10 },
      { text: "Идеальная жизнь других", points: 5 },
      { text: "Навязчивые френды", points: 2 },
    ]
  },

  // Обратный раунд (reverse)
  {
    id: 16,
    round: 3,
    question: "Необычные способы заработка",
    answers: [
      { text: "Обниматель панд", points: 2 },
      { text: "Тестировщик отелей", points: 3 },
      { text: "Переворачиватель пингвинов", points: 5 },
      { text: "Дегустатор еды", points: 10 },
      { text: "Тестировщик игр", points: 30 },
      { text: "Блогер", points: 50 },
    ]
  },
  {
    id: 17,
    round: 3,
    question: "Странные законы в разных странах",
    answers: [
      { text: "Нельзя кормить голубей", points: 3 },
      { text: "Запрет на жвачку", points: 5 },
      { text: "Нельзя умирать в парламенте", points: 8 },
      { text: "Запрет на высокие каблуки", points: 14 },
      { text: "Налог на бороду", points: 20 },
      { text: "Запрет на шум после 22:00", points: 50 },
    ]
  },
  {
    id: 18,
    round: 3,
    question: "Что делают люди, когда никто не видит?",
    answers: [
      { text: "Танцуют", points: 2 },
      { text: "Поют", points: 4 },
      { text: "Ковыряют в носу", points: 8 },
      { text: "Разговаривают сами с собой", points: 16 },
      { text: "Проверяют себя в зеркале", points: 20 },
      { text: "Едят что-то вкусное", points: 50 },
    ]
  },
  {
    id: 19,
    round: 3,
    question: "Необычные фобии",
    answers: [
      { text: "Боязнь дырок", points: 3 },
      { text: "Боязнь клоунов", points: 5 },
      { text: "Боязнь пуговиц", points: 7 },
      { text: "Боязнь чисел", points: 15 },
      { text: "Боязнь людей", points: 20 },
      { text: "Боязнь темноты", points: 50 },
    ]
  },
  {
    id: 20,
    round: 3,
    question: "Редкие таланты",
    answers: [
      { text: "Двигать ушами", points: 2 },
      { text: "Сворачивать язык в трубочку", points: 4 },
      { text: "Абсолютный слух", points: 8 },
      { text: "Фотографическая память", points: 16 },
      { text: "Гибкость", points: 20 },
      { text: "Хорошо рисовать", points: 50 },
    ]
  },
];
