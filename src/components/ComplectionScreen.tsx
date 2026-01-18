interface CompletionScreenProps {
  totalCards: number;
  restart: () => void;
}

export const CompletionScreen: React.FC<CompletionScreenProps> = ({ totalCards, restart }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 text-center shadow-2xl border border-white/20">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-4xl font-bold text-white mb-4">Всё!</h1>
        <p className="text-white/70 text-lg mb-8">Вы прошли все {totalCards} карточек</p>
        <button
          type="button"
          onClick={restart}
          className="w-full py-3 rounded-lg text-center transition-colors cursor-pointer hover:bg-white/10 text-white/60 hover:text-white"
        >
          Начать заново
        </button>
      </div>
    </div>
  );
};