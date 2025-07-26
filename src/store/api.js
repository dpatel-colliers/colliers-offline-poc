import axios from 'axios';
import Dexie from 'dexie';

const db = new Dexie('ColliersOfflineDB');
db.version(1).stores({
  messages: '++id,message,createdAt',
});

const api = axios.create({
  baseURL: 'https://688126ca66a7eb81224a3c8f.mockapi.io',
});

export const postMessage = async (message) => {
  const payload = {
    message,
    createdAt: new Date().toISOString(),
  };

  if (navigator.onLine) {
    const response = await api.post('/messages', payload);
    return response.data;
  } else {
    await db.messages.add(payload);
    return { ...payload, offlineSaved: true };
  }
};

export const getOfflineMessages = () => db.messages.toArray();
export const clearOfflineMessages = () => db.messages.clear();
