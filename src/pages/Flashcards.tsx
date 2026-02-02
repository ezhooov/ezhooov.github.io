import { useEffect, useRef, useState } from 'react'
import { ProgressCounter } from '../components/ProgressCounter.tsx'
import { CompletionScreen } from '../components/ComplectionScreen.tsx'
import { CategorySelector } from '../components/CategorySelector.tsx'
import type { TMode } from '../types.ts'
import { shuffleArray } from '../utils/shuffleArray.ts'

const verbs = {
  Приходить: 'Келу',
  Уходить: 'Кету',
  Входить: 'Кіру',
  Выходить: 'Шығу',
  Искать: 'Іздеу',
  Находить: 'Табу',
  Торопиться: 'Асығу',
  Опаздывать: 'Кешігу',
  Работать: 'Жұмыс істеу',
  Писать: 'Жазу',
  Разговаривать: 'Сөйлесу',
  Брать: 'Алу',
  Давать: 'Беру',
  Видеть: 'Көру',
  Смотреть: 'Қарау'
} as const

const numbersUpToNine = {
  '0': 'Нөл',
  '1': 'Бір',
  '2': 'Екі',
  '3': 'Үш',
  '4': 'Төрт',
  '5': 'Бес',
  '6': 'Алты',
  '7': 'Жеті',
  '8': 'Сегіз',
  '9': 'Тоғыз'
} as const

const numbersUpToNinety = {
  '10': 'Он',
  '20': 'Жиырма',
  '30': 'Отыз',
  '40': 'Қырық',
  '50': 'Елу',
  '60': 'Алпыс',
  '70': 'Жетпіс',
  '80': 'Сексен',
  '90': 'Тоқсан'
} as const

const numbersVocabulary = {
  ...numbersUpToNine,
  ...numbersUpToNinety,
  '100': 'Жүз',
  '1000': 'Мың',
  Мало: 'Аз',
  Много: 'Көп',
  Сколько: 'Қанша/Неше'
} as const

const hiVocabulary = {
  'Привет (фамильярное, между друзьями)': 'Сәлем',
  'Здравствуйте (к одному человеку)': 'Сәлеметсіз бе',
  'Здравствуйте (ко многим людям)': 'Сәлеметсіздер ме',
  'Здравствуйте (между мужчинами)': 'Ассалаумағалейкум',
  'Ответ на Здравствуйте (между мужчинами)': 'Уағалейкумассалам',
  'Пока / Будь здоров (одному человеку, фамильярно)': 'Сау бол',
  'Пока / Будьте здоровы (ко многим людям, фамильярно)': 'Сау болыңдар',
  'До свидания / Будьте здоровы (к одному человеку, уважительно)':
    'Сау болыңыз',
  'До свидания / Будьте здоровы (ко многим людям, уважительно)':
    'Сау болыңыздар',
  'Доброе утро': 'Қайырлы таң',
  'Добрый день': 'Қайырлы күн',
  'Добрый вечер': 'Қайырлы кеш / Кеш жарық',
  Спасибо: 'Рақмет / Рахмет',
  'Рад(а) знакомству': 'Танысқаныма қуаныштымын',
  'До встречи': 'Көріскенше / Кездескенше'
} as const

const adjectivesVocabulary = {
  Красивый: 'Әдемі/сұлу',
  Умный: 'Ақылды',
  Щедрый: 'Жомарт',
  Скупой: 'Сараң',
  Богатый: 'Бай',
  Бедный: 'Кедей',
  Молодой: 'Жас',
  Толстый: 'Семіз',
  Хороший: 'Жақсы',
  Плохой: 'Жаман'
} as const

const othersVocabulary = {
  Книга: 'Кітап',
  Земля: 'Жер',
  Вода: 'Су',
  Слово: 'Сөз',
  Город: 'Қала',
  Улица: 'Көше',
  Работа: 'Жұмыс',
  Специальность: 'Мамандық',
  Имя: 'Ат',
  Школа: 'Мектеп',
  Машина: 'Көлік',
  Квартира: 'Пәтер',
  Ручка: 'Қалам',
  Мозг: 'Ми',
  Медведь: 'Аю',
  Голова: 'Бас',
  Рука: 'Қол',
  Глаз: 'Көз',
  Язык: 'Тіл',
  Платье: 'Көйлек',
  Класс: 'Сынып',
  Дело: 'Іс',
  Нога: 'Аяқ'
} as const

const professionsVocabulary = {
  Учитель: 'Мұғалім',
  Ученый: 'Ғалым',
  Врач: 'Дәрігер',
  Юрист: 'Заңгер',
  Пенсионер: 'Зейнеткер',
  Бухгалтер: 'Есепші',
  Безработный: 'Жұмыссыз',
  Рабочий: 'Жұмысшы',
  Начальник: 'Бастық',
  Проводник: 'Жолсерік',
  Поэт: 'Ақын',
  Писатель: 'Жазушы',
  Водитель: 'Жүргізуші',
  Бизнесмен: 'Кәсіпкер',
  Читатель: 'Оқырман',
  Повар: 'Аспаз',
  Специалист: 'Маман'
} as const

const personVocabulary = {
  Враг: 'Жау',
  Казах: 'Қазақ',
  Русский: 'Орыс',
  Ученик: 'Оқушы',
  Студент: 'Студент',
  Человек: 'Адам',
  Парень: 'Жігіт',
  Одноклассник: 'Сыныптас'
} as const

const questionsVocabulary = {
  'Кто?': 'Кім?',
  'Что?': 'Не?',
  'Какой?': 'Қандай?',
  'Как?': 'Қалай?'
} as const

const friendsFamilyVocabulary = {
  Друг: 'Дос',
  Подруга: 'Құрбы',
  'Девушка, дочь': 'Қыз',
  Сын: 'Ұл',
  Сосед: 'Көрші',
  Коллега: 'Әріптес',
  Гость: 'Қонақ',
  Родственник: 'Туыс',
  Знакомый: 'Таныс',
  Ребенок: 'Бала',
  Отец: 'Әке',
  Мать: 'Ана',
  Бабушка: 'Әже/апа',
  Дедушка: 'Ата',
  Тетя: 'Тәте',
  'Дядя, старший брат': 'Аға',
  'Младший брат': 'Іні',
  'Старшая сестра': 'Әпке',
  'Младшая сестра (по отношению к брату)': 'Қарындас',
  'Младшая сестра (по отношению к сестре)': 'Сіңлі',
  Близнец: 'Егіз',
  Семья: 'Отбасы',
  Предок: 'Баба'
} as const

const pronounVocabulary = {
  Я: 'Мен',
  Мы: 'Біз',
  Ты: 'Сен',
  'Вы (ко многим людям на Ты)': 'Сендер',
  'Вы (к одному человеку уважительно)': 'Сіз',
  'Вы (ко многим людям уважительно)': 'Сіздер',
  'Он, она, оно': 'Ол',
  Они: 'Олар',
  Мой: 'Менің',
  Твой: 'Сенің',
  'Ваш (к одному человеку уважительно)': 'Сіздің',
  'Его/ее/этого': 'Оның',
  Наш: 'Біздің',
  'Ваш (ко многим людям на ты)': 'Сендердің',
  'Ваш (ко многим людям уважительно)': 'Сіздердің',
  Их: 'Олардың'
} as const

const vocabulary = {
  ...personVocabulary,
  ...othersVocabulary,
  ...pronounVocabulary,
  ...hiVocabulary,
  ...numbersVocabulary,
  ...adjectivesVocabulary,
  ...professionsVocabulary,
  ...friendsFamilyVocabulary,
  ...questionsVocabulary,
  ...verbs
} as const

const vocabularyMap = {
  'Все слова': vocabulary,
  Местоимения: pronounVocabulary,
  'Прочие о человеке': personVocabulary,
  Профессии: professionsVocabulary,
  'Семья и друзья': friendsFamilyVocabulary,
  Вопросы: questionsVocabulary,
  Приветственные: hiVocabulary,
  'Цифры (0-9)': numbersUpToNine,
  'Цифры (10-90)': numbersUpToNinety,
  Цифры: numbersVocabulary,
  Прочие: othersVocabulary,
  Прилагательные: adjectivesVocabulary,
  Глаголы: verbs
} as const

type Keys = keyof typeof vocabulary

function maskWord(word: string | null) {
  return (
    word
      ?.slice(0, 10)
      .split('')
      .map(() => '•')
      .join('') ?? ''
  )
}

interface IProps {
  onBack?: () => void
}

export default function FlashcardApp({ onBack }: IProps) {
  const [mode, setMode] = useState<TMode | null>(null)

  const [shuffledKeys, setShuffledKeys] = useState<Keys[]>([])

  const inputRef = useRef<HTMLInputElement>(null)
  const successButtonRef = useRef<HTMLButtonElement>(null)
  const errorButtonRef = useRef<HTMLButtonElement>(null)

  const [userInput, setUserInput] = useState('')
  const [isRevealed, setIsRevealed] = useState(false)
  const [isCorrect, setIsCorrect] = useState<null | boolean>(null)

  const isFinished = shuffledKeys.length === 0 && mode !== null
  const currentWord = !isFinished ? shuffledKeys[0] : null
  const currentAnswer = currentWord ? vocabulary[currentWord] : null

  useEffect(() => {
    inputRef.current?.focus()
  }, [shuffledKeys])

  useEffect(() => {
    if (!isRevealed) {
      return
    }

    if (isCorrect) {
      successButtonRef.current?.focus()
    } else {
      errorButtonRef.current?.focus()
    }
  }, [isRevealed, isCorrect])

  const restart = () => {
    if (mode) {
      setShuffledKeys(
        shuffleArray(Object.keys(vocabularyMap[mode]) as Keys[]) as Keys[]
      )
    }
  }

  const reset = () => {
    setMode(null)
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (!isRevealed && currentAnswer) {
      setIsRevealed(true)
      setIsCorrect(
        userInput.toLowerCase().trim() === currentAnswer.toLowerCase().trim()
      )
    }
  }

  const handleRight = () => {
    setShuffledKeys(([, ...keys]) => keys)
    setUserInput('')
    setIsRevealed(false)
    setIsCorrect(null)
  }

  const handleWrong = () => {
    setShuffledKeys(([wrong, ...keys]) => [...keys, wrong])
    setUserInput('')
    setIsRevealed(false)
    setIsCorrect(null)
  }

  const onCategoryChange = (category: TMode | null) => {
    if (!category) {
      return
    }

    setMode(category)
    setShuffledKeys(
      shuffleArray(Object.keys(vocabularyMap[category]) as Keys[]) as Keys[]
    )
  }

  if (isFinished) {
    return (
      <CompletionScreen
        totalCards={mode ? Object.keys(vocabularyMap[mode]).length : 0}
        restart={restart}
        reset={reset}
      />
    )
  }

  return (
    <>
      {mode && (
        <ProgressCounter
          completed={
            Object.keys(vocabularyMap[mode]).length - shuffledKeys.length
          }
          total={Object.keys(vocabularyMap[mode]).length}
        />
      )}
      {!mode && (
        <button
          onClick={onBack}
          className='inline-flex items-center gap-2 rounded-lg text-white mb-2 font-medium text-base bg-transparent border-none cursor-pointer transition-opacity hover:opacity-80'
        >
          <span className='text-xl'>←</span>
          <span>Назад</span>
        </button>
      )}
      <div className='bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20'>
        {!mode && (
          <>
            <h3 className='text-white text-xl font-semibold mb-5 text-center'>
              Выберите категорию слов
            </h3>
            <CategorySelector
              categories={['Все слова']}
              onCategoryChange={onCategoryChange}
            />
            <hr className='my-4 border-t border-gray-300/40' />
            <CategorySelector
              categories={[
                'Приветственные',
                'Местоимения',
                'Прилагательные',
                'Глаголы',
                'Прочие'
              ]}
              onCategoryChange={onCategoryChange}
            />
            <hr className='my-4 border-t border-gray-300/40' />
            <CategorySelector
              categories={['Семья и друзья', 'Профессии', 'Прочие о человеке']}
              onCategoryChange={onCategoryChange}
            />
            <hr className='my-4 border-t border-gray-300/40' />
            <CategorySelector
              categories={['Цифры (0-9)', 'Цифры (10-90)', 'Цифры']}
              onCategoryChange={onCategoryChange}
            />
          </>
        )}
        {mode && (
          <>
            <div className='text-center mb-8'>
              <span className='text-xs uppercase tracking-wider text-white/40 mb-2 block'>
                Слово
              </span>
              <h2 className='text-3xl font-bold text-white'>{currentWord}</h2>
            </div>
            <div className='text-center mb-8'>
              <span className='text-xs uppercase tracking-wider text-white/40 mb-2 block'>
                Перевод
              </span>
              <div className='text-2xl font-mono transition-all duration-300'>
                {isRevealed ? (
                  isCorrect ? (
                    // Полностью правильно - показываем только currentAnswer серым
                    <span className='text-green-400'>{currentAnswer}</span>
                  ) : (
                    (() => {
                      if (!currentAnswer) {
                        return null
                      }

                      // Проверяем, есть ли совпадение в начале
                      let matchLength = 0
                      const minLength = Math.min(
                        userInput.length,
                        currentAnswer.length
                      )
                      for (let i = 0; i < minLength; i++) {
                        if (
                          userInput[i].toLowerCase() ===
                          currentAnswer[i].toLowerCase()
                        ) {
                          matchLength++
                        } else {
                          break
                        }
                      }

                      if (matchLength > 0) {
                        return (
                          <>
                            <span className='text-green-400'>
                              {userInput.slice(0, matchLength)}
                            </span>
                            <span className='text-red-400'>
                              {userInput.slice(matchLength)}
                            </span>
                            <span className='text-white/50'> - </span>
                            <span className='text-green-400'>
                              {currentAnswer.slice(0, matchLength)}
                            </span>
                            <span className='text-white/50'>
                              {currentAnswer.slice(matchLength)}
                            </span>
                          </>
                        )
                      } else {
                        return (
                          <>
                            {userInput.length > 0 && (
                              <>
                                <span className='text-red-400'>
                                  {userInput}
                                </span>
                                <span className='text-white/50'> - </span>
                              </>
                            )}
                            <span className='text-white/50'>
                              {currentAnswer}
                            </span>
                          </>
                        )
                      }
                    })()
                  )
                ) : (
                  <span className='text-white/50'>
                    {maskWord(currentAnswer)}
                  </span>
                )}
              </div>
            </div>

            <form onSubmit={handleSubmit} className='space-y-4'>
              <input
                ref={inputRef}
                type='text'
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder='Введите перевод...'
                disabled={isRevealed}
                className='w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all disabled:opacity-50'
                autoFocus
              />

              {!isRevealed ? (
                <button
                  type='submit'
                  className='w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white font-semibold rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg'
                >
                  Проверить
                </button>
              ) : (
                <div className='space-y-3'>
                  <div className='flex gap-4 w-full'>
                    {!isCorrect && (
                      <button
                        ref={errorButtonRef}
                        type='button'
                        onClick={handleWrong}
                        className='flex-1 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white font-semibold rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg'
                      >
                        Неверно
                      </button>
                    )}
                    <button
                      ref={successButtonRef}
                      type='button'
                      onClick={handleRight}
                      className='flex-1 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white font-semibold rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg'
                    >
                      Верно
                    </button>
                  </div>
                </div>
              )}
            </form>
          </>
        )}
      </div>
    </>
  )
}
