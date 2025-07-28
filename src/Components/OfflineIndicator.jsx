import { useEffect } from 'react';
import { useOfflineCount } from '../hooks/useOfflineCount';
import { syncOfflineMessages } from '../store/api';

function OfflineIndicator() {
  const count = useOfflineCount();

  

  useEffect(() => {
    const handleOnline = async () => {
      const result = await syncOfflineMessages();
      if (result && result.total > 0) {
        console.log(`🔁 Synced ${result.synced} / ${result.total} messages`);
      }
    };

    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, []);

  return (
    <div>
      {count > 0 ? (
        <p>📦 {count} unsynced message{count > 1 ? 's' : ''} saved locally</p>
      ) : (
        <p>✅ All data synced</p>
      )}
    </div>
  );
}

export default OfflineIndicator;
