interface CategorySelectorProps {
  categories: ('Приветственные' | 'Цифры' | 'Общие' | 'Все слова' | null)[];
  onCategoryChange: (category: 'Приветственные' | 'Цифры' | 'Общие' | 'Все слова' | null) => void;
}

export const CategorySelector: React.FC<CategorySelectorProps> = (
  {
    categories,
    onCategoryChange
  }) => {

  return (
    <div className="mb-6 text-sm">
      <h3 className="text-white text-xl font-semibold mb-5 text-center">Выберите категорию слов</h3>
      <div className="grid grid-cols-2 gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className="px-3 py-2 rounded-lg text-center transition-colors cursor-pointer hover:bg-white/10 text-white/60 hover:text-white"
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};