import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api', { method: 'get' })
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>{!data ? 'loading...' : data}</p>
      </header>
    </div>
  );
}

export default App;
