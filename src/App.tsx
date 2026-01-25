import FlashcardApp from './Flashcards.tsx'
import { useEffect, useState } from 'react'

function App() {
  const [page, setPage] = useState<string | null>(() => {
    const params = new URLSearchParams(window.location.search)

    const pageParam = params.get('page')

    if (pageParam === 'flashcard' || pageParam === 'multiple') {
      return pageParam
    }

    return null
  })

  useEffect(() => {
    const handler = () => {
      const params = new URLSearchParams(window.location.search)

      const pageParam = params.get('page')

      if (
        pageParam === 'flashcard' ||
        pageParam === 'multiple' ||
        pageParam === null
      ) {
        setPage(pageParam)
      }
    }

    window.addEventListener('popstate', handler)

    return () => window.removeEventListener('popstate', handler)
  }, [])

  const onBack = () => {
    window.history.pushState({}, '', `${window.location.pathname}`)

    setPage(null)
  }

  const onPageChange = (page: string) => {
    const params = new URLSearchParams()
    params.set('page', page)

    window.history.pushState({}, '', `${window.location.pathname}?${params}`)

    setPage(page)
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center p-4'>
      <div className='w-full max-w-md'>
        {!page && (
          <div className='bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20'>
            <div className='grid grid-cols-2 gap-2'>
              <button
                onClick={() => onPageChange('multiple')}
                className={`px-3 py-2 rounded-lg text-center transition-colors cursor-pointer hover:bg-white/10 text-white/60 hover:text-white`}
              >
                Множественные окончания
              </button>
              <button
                onClick={() => onPageChange('flashcard')}
                className={`px-3 py-2 rounded-lg text-center transition-colors cursor-pointer hover:bg-white/10 text-white/60 hover:text-white`}
              >
                Слова
              </button>
            </div>
          </div>
        )}
        {page === 'flashcard' && <FlashcardApp onBack={onBack} />}
      </div>
    </div>
  )
}

export default App
