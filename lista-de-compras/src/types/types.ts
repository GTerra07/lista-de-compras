export type Category = {
  id: string;
  name: string;
  icon: string;
};

export type Item = {
  id: string;
  name: string;
  category: string;
  completed: boolean;
  price?: number;
  quantity?: number;
};

export const categories: Category[] = [
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