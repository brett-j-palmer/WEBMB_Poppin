import logo from './logo.svg';
import './App.css';
import List from './List/List';
import icon from './icon.svg';
import Post from './Post/Post'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <img src={icon} className="App-icon" alt="icon" />

        <List text="This is some text.." />
        <Post text ="Thisis some text...2" />
      </header>
    </div>
  );
}

export default App;
