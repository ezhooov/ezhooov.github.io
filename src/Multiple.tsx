import { useEffect, useEffectEvent, useState } from 'react'
import { useStopwatch } from 'react-timer-hook'
import { shuffleArray } from './utils/shuffleArray.ts'

const data = [
  ['дети', 'лар', 'бала'],
  ['города', 'лар', 'қала'],
  ['статья', 'лар', 'мақала'],
  ['ситуации', 'лар', 'жағдай'],
  ['мысли', 'лар', 'ой'],
  ['мамы', 'лар', 'ана'],
  ['месяцы', 'лар', 'ай'],
  ['программы', 'лар', 'бағдарлама'],
  ['стены', 'лар', 'қабырға'],
  ['недели', 'лар', 'апта'],
  ['ряды', 'лар', 'қатар'],
  ['цены', 'лар', 'баға'],
  ['планы', 'лар', 'жоспар'],
  ['проекты', 'лар', 'жоба'],
  ['дома', 'лер', 'үй'],
  ['системы', 'лер', 'жүйе'],
  ['отцы', 'лер', 'әке'],
  ['проблемы', 'лер', 'мәселе'],
  ['образы', 'лер', 'бейне'],
  ['результаты', 'лер', 'нәтиже'],
  ['уровни', 'лер', 'деңгей'],
  ['улицы', 'лер', 'көше'],
  ['комнаты', 'лер', 'бөлме'],
  ['квартиры', 'лер', 'пәтер'],
  ['окна', 'лер', 'терезе'],
  ['беседы', 'лер', 'әңгіме'],
  ['мужья', 'лер', 'күйеу'],
  ['правила', 'лер', 'ереже'],
  ['люди', 'дар', 'адам'],
  ['руки', 'дар', 'қол'],
  ['места', 'дар', 'орын'],
  ['законы', 'дар', 'заң'],
  ['пути', 'дар', 'жол'],
  ['души', 'дар', 'жан'],
  ['сыновья', 'дар', 'ұл'],
  ['ученые', 'дар', 'ғылым'],
  ['девушки', 'дар', 'қыз'],
  ['леса', 'дар', 'орман'],
  ['шаги', 'дар', 'қадам'],
  ['примеры', 'дар', 'мысал'],
  ['игры', 'дар', 'ойын'],
  ['районы', 'дар', 'аудан'],
  ['дни', 'дер', 'күн'],
  ['слова', 'дер', 'сөз'],
  ['глаза', 'дер', 'көз'],
  ['страны', 'дер', 'ел'],
  ['женщины', 'дер', 'әйел'],
  ['решения', 'дер', 'шешім'],
  ['столы', 'дер', 'үстел'],
  ['имена', 'дер', 'есім'],
  ['страны', 'дер', 'ел'],
  ['языки', 'дер', 'тіл'],
  ['чувства', 'дер', 'сезім'],
  ['сроки', 'дер', 'мерзім'],
  ['цветы', 'дер', 'гүл'],
  ['озёра', 'дер', 'көл'],
  ['работы', 'тар', 'жұмыс'],
  ['друзья', 'тар', 'дос'],
  ['вопросы', 'тар', 'сұрақ'],
  ['сады', 'тар', 'бақ'],
  ['головы', 'тар', 'бас'],
  ['ноги', 'тар', 'аяқ'],
  ['отношения', 'тар', 'қатынас'],
  ['войны', 'тар', 'соғыс'],
  ['книги', 'тар', 'кітап'],
  ['области', 'тар', 'обылыс'],
  ['народы', 'тар', 'халық'],
  ['группы', 'тар', 'топ'],
  ['суды', 'тар', 'сот'],
  ['цели', 'тар', 'мақсат'],
  ['дела', 'тер', 'іс'],
  ['лица', 'тер', 'бет'],
  ['части', 'тер', 'бөлік'],
  ['машины', 'тер', 'көлік'],
  ['двери', 'тер', 'есік'],
  ['возможности', 'тер', 'мүмкіндік'],
  ['процессы', 'тер', 'үдеріс'],
  ['вечера', 'тер', 'кеш'],
  ['действия', 'тер', 'әрекет'],
  ['школы', 'тер', 'мектеп'],
  ['мужчины', 'тер', 'еркек'],
  ['советы', 'тер', 'кеңес'],
  ['сердца', 'тер', 'жүрек'],
  ['газеты', 'тер', 'газет']
]

interface IProps {
  onBack?: () => void
}

export default function Multiple({ onBack }: IProps) {
  const {
    totalMilliseconds,
    seconds,
    pause: pauseStopwatch,
    reset: resetStopwatch
  } = useStopwatch({
    autoStart: true,
    interval: 50
  })

  const [dictionary] = useState(
    () =>
      [
        ...shuffleArray(data),
        ...shuffleArray(data),
        ...shuffleArray(data),
        ...shuffleArray(data),
        ...shuffleArray(data)
      ] as [string, string, string][]
  )
  const [index, setIndex] = useState(0)

  const [input, setInput] = useState('')
  const [failed, setFailed] = useState(0)
  const [fast, setFast] = useState(0)
  const [slow, setSlow] = useState(0)

  const [isChecking, setIsChecking] = useState(false)

  const [translation, check, word] = dictionary[index]

  const submit = useEffectEvent((input: string) => {
    pauseStopwatch()

    if (input.toLowerCase() === check.toLowerCase()) {
      if (seconds > 5) {
        setSlow((slow) => slow + 1)
      } else {
        setFast((fast) => fast + 1)
      }
    } else {
      setFailed((failed) => failed + 1)
    }
    setIsChecking(true)
  })

  const next = () => {
    setInput('')
    setIndex((index) => index + 1)
    setIsChecking(false)
    resetStopwatch()
  }

  useEffect(() => {
    if (input.length === 3) {
      submit(input)
    }
  }, [input])

  useEffect(() => {
    if (dictionary.length - 1 === index) {
      onBack?.()
    }
  }, [dictionary, index, onBack])

  const progress = totalMilliseconds / 50
  const progressLimited = progress < 100 ? progress : 100

  return (
    <>
      <button
        onClick={onBack}
        className='inline-flex items-center gap-2 rounded-lg text-white mb-2 font-medium text-base bg-transparent border-none cursor-pointer transition-opacity hover:opacity-80'
      >
        <span className='text-xl'>←</span>
        <span>Назад</span>
      </button>

      <div className='bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 w-full max-w-md'>
        <div className='text-center mb-8'>
          <h2 className='text-3xl font-bold text-white'>{translation}</h2>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault()

            next()
          }}
          className='mb-8'
        >
          <div className='flex items-center justify-center gap-2 mb-6 h-12'>
            <span className='text-2xl font-semibold text-white'>{word} </span>
            {!isChecking && (
              <input
                type='text'
                value={input}
                onChange={(e) => setInput(e.target.value.slice(0, 3))}
                maxLength={3}
                className='w-16 px-2 py-1 text-center text-xl font-semibold bg-white/20 border-2 border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/60 focus:bg-white/30 transition-all'
                placeholder='...'
                autoFocus
              />
            )}
            {isChecking && input.toLowerCase() === check.toLowerCase() && (
              <span className='text-2xl font-semibold text-green-400'>
                {check}
              </span>
            )}
            {isChecking && input.toLowerCase() !== check.toLowerCase() && (
              <>
                <span className='text-2xl font-semibold text-red-400 line-through'>
                  {input}
                </span>{' '}
                <span className='text-2xl font-semibold text-green-400'>
                  {check}
                </span>
              </>
            )}
            {isChecking && (
              <button
                className='px-3 py-2 text-xs bg-white/10 border border-white/30 rounded-md text-white hover:bg-white/20 transition-colors ml-2'
                autoFocus
                type='submit'
              >
                →
              </button>
            )}
          </div>
        </form>

        <>
          <div className={`mb-6 h-3 ${isChecking ? 'invisible' : 'visible'}`}>
            {!isChecking && (
              <div className='w-full h-2 bg-white/20 rounded-full overflow-hidden'>
                <div
                  className='h-full bg-white rounded-full transition-all duration-100'
                  style={{
                    width: `${progressLimited}%`,
                    backgroundColor: `hsl(${120 - progressLimited * 1.2}, 70%, 50%)`
                  }}
                />
              </div>
            )}
          </div>
          <div className='flex justify-around'>
            <div className='text-center flex-1'>
              <div className='text-3xl font-bold text-green-400'>{fast}</div>
              <div className='text-sm text-white/60 mt-1'>Быстро</div>
            </div>
            <div className='text-center flex-1'>
              <div className='text-3xl font-bold text-yellow-400'>{slow}</div>
              <div className='text-sm text-white/60 mt-1'>Медленно</div>
            </div>
            <div className='text-center flex-1'>
              <div className='text-3xl font-bold text-red-400'>{failed}</div>
              <div className='text-sm text-white/60 mt-1'>Неправильно</div>
            </div>
          </div>
        </>
      </div>
    </>
  )
}
