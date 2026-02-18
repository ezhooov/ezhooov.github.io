import FlashcardApp from './pages/Flashcards.tsx'
import { useCallback, useEffect, useState } from 'react'
import Multiple from './pages/Multiple.tsx'
import FirstPerson from './pages/FirstPerson.tsx'
import Verbs from './pages/Verbs.tsx'
import SpatialCases from './pages/SpatialCases.tsx'

function App() {
  const [page, setPage] = useState<string | null>(() => {
    const params = new URLSearchParams(window.location.search)

    const pageParam = params.get('page')

    if (
      pageParam === 'flashcard' ||
      pageParam === 'multiple' ||
      pageParam === 'firstPerson' ||
      pageParam === 'verbs' ||
      pageParam === 'spatialCases'
    ) {
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
        pageParam === 'firstPerson' ||
        pageParam === 'verbs' ||
        pageParam === 'spatialCases' ||
        pageParam === null
      ) {
        setPage(pageParam)
      }
    }

    window.addEventListener('popstate', handler)

    return () => window.removeEventListener('popstate', handler)
  }, [])

  const onBack = useCallback(() => {
    window.history.pushState({}, '', `${window.location.pathname}`)

    setPage(null)
  }, [setPage])

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
                onClick={() => onPageChange('flashcard')}
                className={`col-span-2 px-3 py-2 rounded-lg text-center transition-colors cursor-pointer hover:bg-white/10 text-white/60 hover:text-white`}
              >
                Слова
              </button>
              <button
                onClick={() => onPageChange('multiple')}
                className={`px-3 py-2 rounded-lg text-center transition-colors cursor-pointer hover:bg-white/10 text-white/60 hover:text-white`}
              >
                Множественные окончания
              </button>
              <button
                onClick={() => onPageChange('firstPerson')}
                className={`px-3 py-2 rounded-lg text-center transition-colors cursor-pointer hover:bg-white/10 text-white/60 hover:text-white`}
              >
                Личные окончания - 1 лицо
              </button>
              <button
                onClick={() => onPageChange('verbs')}
                className={`col-span-2 px-3 py-2 rounded-lg text-center transition-colors cursor-pointer hover:bg-white/10 text-white/60 hover:text-white`}
              >
                Глаголы
              </button>
              <button
                onClick={() => onPageChange('spatialCases')}
                className={`col-span-2 px-3 py-2 rounded-lg text-center transition-colors cursor-pointer hover:bg-white/10 text-white/60 hover:text-white`}
              >
                Пространственные падежи
              </button>
            </div>
          </div>
        )}
        {page === 'flashcard' && <FlashcardApp onBack={onBack} />}
        {page === 'multiple' && <Multiple onBack={onBack} />}
        {page === 'firstPerson' && <FirstPerson onBack={onBack} />}
        {page === 'verbs' && <Verbs onBack={onBack} />}
        {page === 'spatialCases' && <SpatialCases onBack={onBack} />}
      </div>
    </div>
  )
}

export default App
