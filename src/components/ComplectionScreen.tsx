interface CompletionScreenProps {
  totalCards: number;
}

export const CompletionScreen: React.FC<CompletionScreenProps> = ({ totalCards }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 text-center shadow-2xl border border-white/20">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-4xl font-bold text-white mb-4">Всё!</h1>
        <p className="text-white/70 text-lg">Вы прошли все {totalCards} карточек</p>
      </div>
    </div>
  );
};