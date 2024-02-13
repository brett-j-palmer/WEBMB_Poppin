import logo from './logo.svg';
import './App.css';
import List from './List/List';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <List text="This is some text.." />
      </header>
    </div>
  );
}

export default App;
