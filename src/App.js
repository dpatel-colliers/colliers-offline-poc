import './App.css';
import CurrentTime from './Components/CurrentTime';
import OnlineStatus from './Components/OnlineStatus';

function App() {

  return (
    <div className="App">
      <h1>Colliers - Offline POC</h1>
      <CurrentTime />
      <OnlineStatus />
    </div>
  );
}

export default App;
