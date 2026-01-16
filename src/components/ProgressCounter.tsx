interface ProgressCounterProps {
  completed: number;
  total: number;
}

export const ProgressCounter: React.FC<ProgressCounterProps> = ({ completed, total }) => {
  return (
    <div className="mb-6 flex items-center justify-between text-white/60 text-sm">
      <span>Пройдено слов - {completed} из {total}</span>
    </div>
  );
};
