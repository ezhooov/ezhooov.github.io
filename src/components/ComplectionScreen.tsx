interface CompletionScreenProps {
  totalCards: number
  restart: () => void
  reset: () => void
}

export const CompletionScreen: React.FC<CompletionScreenProps> = ({
  totalCards,
  restart,
  reset
}) => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center p-4'>
      <div className='bg-white/10 backdrop-blur-lg rounded-3xl p-12 text-center shadow-2xl border border-white/20'>
        <div className='text-6xl mb-6'>🎉</div>
        <h1 className='text-4xl font-bold text-white mb-4'>Всё!</h1>
        <p className='text-white/70 text-lg mb-8'>
          Вы прошли все {totalCards} карточек
        </p>
        <div className='flex gap-4'>
          <button
            type='button'
            onClick={restart}
            className='flex-1 py-3 rounded-lg text-center transition-colors cursor-pointer hover:bg-white/10 text-white/60 hover:text-white'
          >
            Начать <br />
            заново
          </button>

          <button
            type='button'
            onClick={reset}
            className='flex-1 py-3 rounded-lg text-center transition-colors cursor-pointer hover:bg-white/10 text-white/60 hover:text-white'
          >
            Вернуться в меню
          </button>
        </div>
      </div>
    </div>
  )
}
