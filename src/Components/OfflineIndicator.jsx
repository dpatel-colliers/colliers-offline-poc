import { useOfflineCount } from '../hooks/useOfflineCount';

function OfflineIndicator() {
  const count = useOfflineCount();

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
