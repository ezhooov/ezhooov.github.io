import { useStopwatch } from 'react-timer-hook'
import { useEffect, useState } from 'react'
import { shuffleArray } from '../utils/shuffleArray.ts'

interface IProps {
  words: readonly [string, string, string][]
  time: number
  onBack?: () => void
  disableTimer?: boolean
  submitMode?: 'length' | 'button'
}

export const TimeChallenge: React.FC<IProps> = ({
  time,
  words,
  onBack,
  disableTimer,
  submitMode = 'length'
}) => {
  const {
    totalMilliseconds,
    seconds,
    pause: pauseStopwatch,
    reset: resetStopwatch
  } = useStopwatch({
    autoStart: !disableTimer,
    interval: 50
  })

  const [dictionary] = useState(
    () =>
      [
        ...shuffleArray(words),
        ...shuffleArray(words),
        ...shuffleArray(words),
        ...shuffleArray(words),
        ...shuffleArray(words)
      ] as [string, string, string][]
  )
  const [index, setIndex] = useState(0)

  const [input, setInput] = useState('')
  const [failed, setFailed] = useState(0)
  const [fast, setFast] = useState(0)
  const [slow, setSlow] = useState(0)

  const [isHiddenTimer, setIsHiddenTimer] = useState(Boolean(disableTimer))

  const [isChecking, setIsChecking] = useState(false)

  const [translation, check, word] = dictionary[index]
  const checkLength = check.length

  const submit = (input: string) => {
    if (!disableTimer) {
      pauseStopwatch()
    }

    if (input.toLowerCase() === check.toLowerCase()) {
      if (seconds > time) {
        setSlow((slow) => slow + 1)
      } else {
        setFast((fast) => fast + 1)
      }
    } else {
      setFailed((failed) => failed + 1)
    }
    setIsChecking(true)
  }

  const next = () => {
    setInput('')
    setIndex((index) => index + 1)
    setIsChecking(false)

    if (!disableTimer) {
      resetStopwatch()
    }
  }

  useEffect(() => {
    if (dictionary.length - 1 === index) {
      onBack?.()
    }
  }, [dictionary, index, onBack])

  const progress = totalMilliseconds / (time * 10)
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
          <h2 className='text-xl font-bold text-white'>{translation}</h2>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault()

            if (isChecking) {
              next()
            }
            if (!isChecking && submitMode === 'button') {
              submit(input)
            }
          }}
          className='mb-8'
        >
          <div className='flex items-center justify-center gap-2 mb-6 h-12'>
            <span className='text-l font-semibold text-white'>{word} </span>
            {!isChecking && (
              <>
                <input
                  type='text'
                  value={input}
                  onChange={(e) => {
                    const value = e.target.value.slice(0, checkLength)

                    if (
                      submitMode === 'length' &&
                      value.length === checkLength
                    ) {
                      submit(value)
                    }

                    setInput(value)
                  }}
                  maxLength={checkLength}
                  className={
                    'w-28 px-0 py-1 text-center text-l font-semibold bg-white/20 border-2 border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/60 focus:bg-white/30 transition-all'
                  }
                  placeholder={'.'.repeat(checkLength)}
                  autoFocus
                />
                {submitMode === 'button' && (
                  <button
                    className='px-3 py-2 text-xs bg-white/20 border-white/30 border-2 rounded-lg text-white hover:bg-white/20 transition-colors'
                    type='submit'
                  >
                    →
                  </button>
                )}
              </>
            )}
            {isChecking && input.toLowerCase() === check.toLowerCase() && (
              <span className='text-l font-semibold text-green-400'>
                {check}
              </span>
            )}
            {isChecking && input.toLowerCase() !== check.toLowerCase() && (
              <>
                <span className='text-l font-semibold text-red-400 line-through'>
                  {input}
                </span>{' '}
                <span className='text-l font-semibold text-green-400'>
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
          <div
            className={`mb-6 h-3 ${isChecking || isHiddenTimer ? 'invisible' : 'visible'}`}
          >
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
          <div className='flex justify-around mb-8'>
            {!isHiddenTimer && (
              <>
                <div className='text-center flex-1'>
                  <div className='text-3xl font-bold text-green-400'>
                    {fast}
                  </div>
                  <div className='text-sm text-white/60 mt-1'>Быстро</div>
                </div>
                <div className='text-center flex-1'>
                  <div className='text-3xl font-bold text-yellow-400'>
                    {slow}
                  </div>
                  <div className='text-sm text-white/60 mt-1'>Медленно</div>
                </div>
              </>
            )}
            {isHiddenTimer && (
              <div className='text-center flex-1'>
                <div className='text-3xl font-bold text-green-400'>
                  {fast + slow}
                </div>
                <div className='text-sm text-white/60 mt-1'>Правильно</div>
              </div>
            )}
            <div className='text-center flex-1'>
              <div className='text-3xl font-bold text-red-400'>{failed}</div>
              <div className='text-sm text-white/60 mt-1'>Неправильно</div>
            </div>
          </div>
        </>
        <div>
          {!disableTimer && (
            <button
              className='w-full px-3 py-2 text-xs bg-white/10 border border-white/30 rounded-md text-white hover:bg-white/20 transition-colors'
              type='button'
              onClick={() => setIsHiddenTimer((prev) => !prev)}
            >
              {isHiddenTimer ? 'Показать таймер' : 'Скрыть таймер'}
            </button>
          )}
        </div>
      </div>
    </>
  )
}
