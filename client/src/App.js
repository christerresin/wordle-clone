import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

/*
  - guess input
  - letter holders
  - indicators for status (correct, incorrect, misplaced) colored letters?
  - winner? name input
*/

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/to-2-false')
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>{!data ? 'loading...' : console.log(data)}</p>
      </header>
    </div>
  );
}

export default App;
