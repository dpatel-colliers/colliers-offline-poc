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

export const syncOfflineMessages = async () => {
  const all = await db.messages.toArray();
  if (!all.length) return;

  const failed = [];

  for (const item of all) {
    try {
      await api.post('/messages', {
        message: item.message,
        createdAt: item.createdAt,
      });
    } catch (err) {
      failed.push(item);
    }
  }

  await db.messages.clear(); // clear all
  if (failed.length) {
    // re-store failed ones
    await db.messages.bulkAdd(failed);
  }

  return {
    total: all.length,
    synced: all.length - failed.length,
    failed: failed.length,
  };
};

export const getOfflineMessages = () => db.messages.toArray();
export const clearOfflineMessages = () => db.messages.clear();
