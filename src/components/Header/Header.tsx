import { Sun, Moon } from 'lucide-react';

type HeaderProps = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

export const Header = ({ darkMode, toggleDarkMode }: HeaderProps) => {
  return (
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
  );
}; 