import { collection, addDoc, deleteDoc, doc, updateDoc, onSnapshot, query } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Item } from '../types/types';

export const subscribeToItems = (callback: (items: Item[]) => void) => {
  const q = query(collection(db, 'items'));
  return onSnapshot(q, (querySnapshot) => {
    const itemsData = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Item[];
    callback(itemsData);
  });
};

export const addItem = async (name: string, category: string) => {
  try {
    await addDoc(collection(db, 'items'), {
      name: name.trim(),
      category,
      completed: false,
      createdAt: new Date()
    });
  } catch (error) {
    console.error('Erro ao adicionar item:', error);
    throw error;
  }
};

export const toggleItemCompletion = async (id: string, completed: boolean) => {
  try {
    await updateDoc(doc(db, 'items', id), { completed: !completed });
  } catch (error) {
    console.error('Erro ao atualizar item:', error);
    throw error;
  }
};

export const removeItem = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'items', id));
  } catch (error) {
    console.error('Erro ao remover item:', error);
    throw error;
  }
};

export const updateItemDetails = async (id: string, field: 'price' | 'quantity', value: number) => {
  try {
    await updateDoc(doc(db, 'items', id), { [field]: value });
  } catch (error) {
    console.error('Erro ao atualizar detalhes:', error);
    throw error;
  }
}; 