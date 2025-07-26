import { useEffect, useState } from 'react';
import Dexie from 'dexie';

// Access the same DB defined in api.js
const db = new Dexie('ColliersOfflineDB');
db.version(1).stores({
  messages: '++id,message,createdAt',
});

export function useOfflineCount(pollIntervalMs = 1000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const updateCount = async () => {
      const c = await db.messages.count();
      if (isMounted) setCount(c);
    };

    updateCount();
    const interval = setInterval(updateCount, pollIntervalMs);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [pollIntervalMs]);

  return count;
}
