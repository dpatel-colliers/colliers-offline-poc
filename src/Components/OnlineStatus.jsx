import { useEffect, useState } from 'react';
function OnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);


  // Track online/offline changes
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return <p>Status: <strong>{isOnline ? '🟢 Online' : '🔴 Offline'}</strong></p>;
}

export default OnlineStatus;
