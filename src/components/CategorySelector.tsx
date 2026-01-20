import type {TMode} from "../types.ts";

interface CategorySelectorProps {
  categories: (TMode | null)[];
  onCategoryChange: (category: TMode | null) => void;
}

export const CategorySelector: React.FC<CategorySelectorProps> = (
  {
    categories,
    onCategoryChange
  }) => {

  return (
    <div className="mb-6 text-sm">
      <div className="grid grid-cols-2 gap-2">
        {categories.map((category, categoryIndex) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`${categoryIndex % 2 === 0 && categoryIndex === categories.length - 1 ? 'col-span-2' : ''} px-3 py-2 rounded-lg text-center transition-colors cursor-pointer hover:bg-white/10 text-white/60 hover:text-white"`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};