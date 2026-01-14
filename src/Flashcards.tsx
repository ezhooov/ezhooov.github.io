import { useState, useMemo } from 'react';

const vocabulary = {
  "Человек": "Адам",
  "Девушка, дочь": "Қыз",
  "Сын": "Ұл",
  "Парень": "Жігіт",
  "Книга": "Кітап",
  "Земля": "Жер",
  "Вода": "Су",
  "Слово": "Сөз",
  "Город": "Қала",
  "Улица": "Көше",
  "Привет (фамильярное, между друзьями)": "Сәлем",
  "Здравствуйте (к одному человеку)": "Сәлеметсіз бе / Саламатсыз ба",
  "Здравствуйте (ко многим людям)": "Сәлеметсіздер ме / Саламатсыздар ма",
  "Здравствуйте (между мужчинами)": "Ассалаумағалейкум",
  "Ответ на Здравствуйте (между мужчинами)": "Уағалейкумассалам"
};

function shuffleArray(array: string[]) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function maskWord(word: string) {
  return word.slice(10).split('').map(() => '•').join('');
}

export default function FlashcardApp() {
  const shuffledKeys = useMemo(() => shuffleArray(Object.keys(vocabulary)), []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [isRevealed, setIsRevealed] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  const isFinished = currentIndex >= shuffledKeys.length;
  const currentWord = !isFinished ? shuffledKeys[currentIndex] : null;
  const currentAnswer = currentWord ? vocabulary[currentWord] : null;

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!isRevealed && currentAnswer) {
      setIsRevealed(true);
      setIsCorrect(userInput.toLowerCase().trim() === currentAnswer.toLowerCase().trim());
    }
  };

  const handleNext = () => {
    setCurrentIndex(prev => prev + 1);
    setUserInput('');
    setIsRevealed(false);
    setIsCorrect(null);
  };

  if (isFinished) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 text-center shadow-2xl border border-white/20">
          <div className="text-6xl mb-6">🎉</div>
          <h1 className="text-4xl font-bold text-white mb-4">Всё!</h1>
          <p className="text-white/70 text-lg">Вы прошли все {shuffledKeys.length} карточек</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-6 flex items-center justify-between text-white/60 text-sm">
          <span>Карточка {currentIndex + 1} из {shuffledKeys.length}</span>
          <div className="flex gap-1">
            {shuffledKeys.map((_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx < currentIndex ? 'bg-green-400' : idx === currentIndex ? 'bg-white' : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
          <div className="text-center mb-8">
            <span className="text-xs uppercase tracking-wider text-white/40 mb-2 block">Слово</span>
            <h2 className="text-3xl font-bold text-white">{currentWord}</h2>
          </div>

          <div className="text-center mb-8">
            <span className="text-xs uppercase tracking-wider text-white/40 mb-2 block">Перевод</span>
            <div className={`text-2xl font-mono transition-all duration-300 ${
              isRevealed
                ? isCorrect
                  ? 'text-green-400'
                  : 'text-pink-400'
                : 'text-white/50'
            }`}>
              {isRevealed ? currentAnswer : maskWord(currentAnswer)}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Введите перевод..."
              disabled={isRevealed}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all disabled:opacity-50"
              autoFocus
            />

            {!isRevealed ? (
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white font-semibold rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
              >
                Проверить
              </button>
            ) : (
              <div className="space-y-3">
                {isCorrect !== null && (
                  <div className={`text-center py-2 rounded-lg ${
                    isCorrect ? 'bg-green-500/20 text-green-400' : 'bg-pink-500/20 text-pink-400'
                  }`}>
                    {isCorrect ? '✓ Правильно!' : `✗ Ваш ответ: "${userInput}"`}
                  </div>
                )}
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full py-3 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-400 hover:to-orange-400 text-white font-semibold rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                >
                  Следующая карточка →
                </button>
              </div>
            )}
          </form>
        </div>

        <p className="text-center text-white/30 text-xs mt-6">
          Нажмите Enter для проверки ответа
        </p>
      </div>
    </div>
  );
}