import './App.css';
import CurrentTime from './Components/CurrentTime';
import FormComponent from './Components/FormComponent';
import OfflineIndicator from './Components/OfflineIndicator';
import OnlineStatus from './Components/OnlineStatus';

function App() {

  return (
    <div className="App">
      <h1>Colliers - Offline POC</h1>
      <CurrentTime />
      <OnlineStatus />
      <FormComponent />
      <OfflineIndicator />
    </div>
  );
}

export default App;
