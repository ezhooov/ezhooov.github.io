import { useState } from 'react';

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
  "Здравствуйте (к одному человеку)": "Сәлеметсіз бе",
  "Здравствуйте (ко многим людям)": "Сәлеметсіздер ме",
  "Здравствуйте (между мужчинами)": "Ассалаумағалейкум",
  "Ответ на Здравствуйте (между мужчинами)": "Уағалейкумассалам"
} as const;

type Keys = keyof typeof vocabulary;

function shuffleArray(array: Keys[]) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function maskWord(word: string | null) {
  return word?.slice(0, 10).split('').map(() => '•').join('') ?? '';
}

export default function FlashcardApp() {
  const [shuffledKeys, setShuffledKeys]  = useState(() => shuffleArray(Object.keys(vocabulary) as Keys[]));

  const [userInput, setUserInput] = useState('');
  const [isRevealed, setIsRevealed] = useState(false);
  const [isCorrect, setIsCorrect] = useState<null | boolean>(null);

  const isFinished = shuffledKeys.length === 0;
  const currentWord = !isFinished ? shuffledKeys[0] : null;
  const currentAnswer = currentWord ? vocabulary[currentWord] : null;

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!isRevealed && currentAnswer) {
      setIsRevealed(true);
      setIsCorrect(userInput.toLowerCase().trim() === currentAnswer.toLowerCase().trim());
    }
  };

  const handleRight = () => {
    setShuffledKeys(([, ...keys]) => keys)
    setUserInput('');
    setIsRevealed(false);
    setIsCorrect(null);
  };

  const handleWrong = () => {
    setShuffledKeys(([wrong, ...keys]) => [...keys, wrong])
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
          <p className="text-white/70 text-lg">Вы прошли все {Object.keys(vocabulary).length} карточек</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-6 flex items-center justify-between text-white/60 text-sm">
          <span>Пройдено слов - {Object.keys(vocabulary).length - shuffledKeys.length} из {Object.keys(vocabulary).length}</span>
          <div className="flex gap-1">
            {Object.keys(vocabulary).map((_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx < Object.keys(vocabulary).length - shuffledKeys.length ? 'bg-green-400' : idx === Object.keys(vocabulary).length - shuffledKeys.length ? 'bg-white' : 'bg-white/20'
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
            <div className="text-2xl font-mono transition-all duration-300">
              {isRevealed ? (
                isCorrect ? (
                  // Полностью правильно - показываем только currentAnswer серым
                  <span className="text-green-400">{currentAnswer}</span>
                ) : (() => {
                  if (!currentAnswer) {
                    return null
                  }

                  // Проверяем, есть ли совпадение в начале
                  let matchLength = 0;
                  const minLength = Math.min(userInput.length, currentAnswer.length);
                  for (let i = 0; i < minLength; i++) {
                    if (userInput[i].toLowerCase() === currentAnswer[i].toLowerCase()) {
                      matchLength++;
                    } else {
                      break;
                    }
                  }

                  if (matchLength > 0) {
                    return (
                      <>
                        <span className="text-green-400">{userInput.slice(0, matchLength)}</span>
                        <span className="text-red-400">{userInput.slice(matchLength)}</span>
                        <span className="text-white/50"> - </span>
                        <span className="text-green-400">{currentAnswer.slice(0, matchLength)}</span>
                        <span className="text-white/50">{currentAnswer.slice(matchLength)}</span>
                      </>
                    );
                  } else {
                    return (
                      <>
                        {userInput.length > 0 && (
                          <>
                            <span className="text-red-400">{userInput}</span>
                            <span className="text-white/50"> - </span>
                          </>
                        )}
                        <span className="text-white/50">{currentAnswer}</span>
                      </>
                    );
                  }
                })()
              ) : (
                <span className="text-white/50">{maskWord(currentAnswer)}</span>
              )}
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
                <div className="flex gap-4 w-full">
                  {!isCorrect && (
                    <button
                      type="button"
                      onClick={handleWrong}
                      className="flex-1 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white font-semibold rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                    >
                      Неверно
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleRight}
                    className="flex-1 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white font-semibold rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                  >
                    Верно
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}