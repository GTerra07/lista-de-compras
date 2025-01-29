import { X } from 'lucide-react';
import { Item as ItemType } from '../../types/types';
import { categories } from '../../types/types';

type ItemProps = {
  item: ItemType;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
  onUpdateDetails: (id: string, field: 'price' | 'quantity', value: number) => void;
};

export const Item = ({ item, onToggle, onRemove, onUpdateDetails }: ItemProps) => {
  const category = categories.find((c) => c.id === item.category);

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 sm:p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <input
          type="checkbox"
          checked={item.completed}
          onChange={() => onToggle(item.id)}
          className="h-5 w-5 rounded text-blue-500 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500"
        />
        <div className="flex-1 min-w-0">
          <div
            className={`text-sm sm:text-base ${
              item.completed
                ? 'line-through text-gray-400 dark:text-gray-500'
                : 'text-gray-900 dark:text-white'
            }`}
          >
            {item.name}
          </div>
          <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
            {category?.icon} {category?.name}
          </div>
        </div>
      </div>

      {item.completed && (
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto ml-8 sm:ml-0">
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={item.price || ''}
              onChange={(e) => onUpdateDetails(item.id, 'price', parseFloat(e.target.value) || 0)}
              placeholder="Preço"
              step="0.01"
              min="0"
              className="w-24 px-2 py-1 border dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <span className="text-sm text-gray-500 dark:text-gray-400">R$</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={item.quantity || ''}
              onChange={(e) => onUpdateDetails(item.id, 'quantity', parseInt(e.target.value) || 0)}
              placeholder="Qtd"
              min="0"
              className="w-20 px-2 py-1 border dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <span className="text-sm text-gray-500 dark:text-gray-400">un</span>
          </div>
          {item.price && item.quantity && (
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Total: R$ {(item.price * item.quantity).toFixed(2)}
            </div>
          )}
        </div>
      )}

      <button
        onClick={() => onRemove(item.id)}
        className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 p-1 ml-auto"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
}; 