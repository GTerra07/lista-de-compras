import React, { useState, useEffect } from 'react';
import { Search, Plus, X, Filter, Moon, Sun } from 'lucide-react';

type Category = {
  id: string;
  name: string;
  icon: string;
};

type Item = {
  id: string;
  name: string;
  category: string;
  completed: boolean;
  price?: number;
  quantity?: number;
};

const categories: Category[] = [
  { id: 'hortifruti', name: 'Hortifruti', icon: '🥬' },
  { id: 'laticinios', name: 'Laticínios', icon: '🥛' },
  { id: 'proteinas', name: 'Proteínas', icon: '🥩' },
  { id: 'graos', name: 'Grãos e Cereais', icon: '🌾' },
  { id: 'padaria', name: 'Padaria', icon: '🥖' },
  { id: 'enlatados', name: 'Enlatados e Conservas', icon: '🥫' },
  { id: 'condimentos', name: 'Condimentos e Temperos', icon: '🧂' },
  { id: 'bebidas', name: 'Bebidas', icon: '🥤' },
  { id: 'limpeza', name: 'Produtos de Limpeza', icon: '🧹' },
  { id: 'higiene', name: 'Higiene Pessoal', icon: '🧴' },
  { id: 'congelados', name: 'Congelados', icon: '🧊' },
  { id: 'petiscos', name: 'Petiscos e Lanches', icon: '🍿' },
  { id: 'mercearia', name: 'Mercearia', icon: '🏪' },
  { id: 'outros', name: 'Outros', icon: '📦' },
];

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true';
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const addItem = () => {
    if (newItem.trim() && selectedCategory) {
      setItems([
        ...items,
        {
          id: Date.now().toString(),
          name: newItem.trim(),
          category: selectedCategory,
          completed: false,
        },
      ]);
      setNewItem('');
    }
  };

  const toggleItem = (id: string) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const updateItemDetails = (id: string, field: 'price' | 'quantity', value: number) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === '' || item.category === selectedCategory)
  );

  const totalBudget = items
    .filter((item) => item.completed && item.price && item.quantity)
    .reduce((total, item) => total + (item.price || 0) * (item.quantity || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-4xl mx-auto p-3 sm:p-4">
        <div className="flex justify-between items-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
            Lista de Compras
          </h1>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            aria-label="Alternar modo escuro"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 mb-6">
          {/* Total Budget Display */}
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h2 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">
              Total da Compra
            </h2>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">
              R$ {totalBudget.toFixed(2)}
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar itens..."
                  className="w-full pl-10 pr-4 py-2 border dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500 h-5 w-5" />
              </div>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center gap-2 text-sm sm:text-base transition-colors"
            >
              <Filter className="h-5 w-5" />
              Filtros
            </button>
          </div>

          {/* Categories Filter */}
          {showFilters && (
            <div className="mb-6 overflow-x-auto">
              <div className="flex flex-wrap gap-2 pb-2">
                <button
                  onClick={() => setSelectedCategory('')}
                  className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                    selectedCategory === ''
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Todas
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-3 py-1.5 rounded-full text-sm flex items-center gap-1.5 whitespace-nowrap transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <span>{category.icon}</span>
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add Item Form */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Adicionar novo item..."
              className="flex-1 px-4 py-2 border dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              onKeyPress={(e) => e.key === 'Enter' && addItem()}
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
              onClick={addItem}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2 text-sm sm:text-base transition-colors"
            >
              <Plus className="h-5 w-5" />
              <span className="hidden sm:inline">Adicionar</span>
            </button>
          </div>

          {/* Items List */}
          <div className="space-y-3">
            {filteredItems.map((item) => {
              const category = categories.find((c) => c.id === item.category);
              return (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 sm:p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                >
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => toggleItem(item.id)}
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
                          onChange={(e) => updateItemDetails(item.id, 'price', parseFloat(e.target.value) || 0)}
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
                          onChange={(e) => updateItemDetails(item.id, 'quantity', parseInt(e.target.value) || 0)}
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
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 p-1 ml-auto"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              );
            })}
            {filteredItems.length === 0 && (
              <p className="text-center text-gray-500 dark:text-gray-400 py-8 text-sm sm:text-base">
                Nenhum item encontrado
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;