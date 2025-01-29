import { useState, useEffect } from 'react';
import { Header } from './components/Header/Header';
import { Filter } from './components/Filter/Filter';
import { ItemList } from './components/ItemList/ItemList';
import { useDarkMode } from './hooks/useDarkMode';
import * as firebaseService from './services/firebaseService';
import { Item } from './types/types';

function App() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const unsubscribe = firebaseService.subscribeToItems(setItems);
    return () => unsubscribe();
  }, []);

  const addItem = async () => {
    if (newItem.trim() && selectedCategory) {
      await firebaseService.addItem(newItem, selectedCategory);
      setNewItem('');
    }
  };

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterCategory === '' || item.category === filterCategory)
  );

  const totalBudget = items
    .filter((item) => item.completed && item.price && item.quantity)
    .reduce((total, item) => total + (item.price || 0) * (item.quantity || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-4xl mx-auto p-3 sm:p-4">
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 mb-6">
          <Filter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={filterCategory}
            setSelectedCategory={setFilterCategory}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
          />
          
          <ItemList
            items={filteredItems}
            newItem={newItem}
            setNewItem={setNewItem}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            onAddItem={addItem}
            onToggleItem={(id) => {
              const item = items.find((i) => i.id === id);
              if (item) firebaseService.toggleItemCompletion(id, item.completed);
            }}
            onRemoveItem={firebaseService.removeItem}
            onUpdateItemDetails={firebaseService.updateItemDetails}
            totalBudget={totalBudget}
          />
        </div>
      </div>
    </div>
  );
}

export default App;