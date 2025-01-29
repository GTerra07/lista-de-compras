import { Plus } from 'lucide-react';
import { Item } from '../Item/Item';
import { Item as ItemType } from '../../types/types';
import { categories } from '../../types/types';

type ItemListProps = {
  items: ItemType[];
  newItem: string;
  setNewItem: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  onAddItem: () => void;
  onToggleItem: (id: string) => void;
  onRemoveItem: (id: string) => void;
  onUpdateItemDetails: (id: string, field: 'price' | 'quantity', value: number) => void;
  totalBudget: number;
};

export const ItemList = ({
  items,
  newItem,
  setNewItem,
  selectedCategory,
  setSelectedCategory,
  onAddItem,
  onToggleItem,
  onRemoveItem,
  onUpdateItemDetails,
  totalBudget
}: ItemListProps) => {
  return (
    <div className="space-y-6">
      <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h2 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">
          Total da Compra
        </h2>
        <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">
          R$ {totalBudget.toFixed(2)}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Adicionar novo item..."
          className="flex-1 px-4 py-2 border dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          onKeyPress={(e) => e.key === 'Enter' && onAddItem()}
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          <option value="">Selecione uma categoria</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.icon} {category.name}
            </option>
          ))}
        </select>
        <button
          onClick={onAddItem}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2 text-sm sm:text-base transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span className="hidden sm:inline">Adicionar</span>
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <Item
            key={item.id}
            item={item}
            onToggle={onToggleItem}
            onRemove={onRemoveItem}
            onUpdateDetails={onUpdateItemDetails}
          />
        ))}
        {items.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 py-8 text-sm sm:text-base">
            Nenhum item encontrado
          </p>
        )}
      </div>
    </div>
  );
}; 