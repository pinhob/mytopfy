import './App.css';
import { useEffect, useState } from 'react';
import { accessToken } from './helpers/handleTokens';

function App() {
  const [token, getToken] = useState(null);


  useEffect(() => {
    getToken(accessToken);
  }, []);


  return (
    <div className="App">
      <header className="App-header">
        {
          token
            ? <p>Logged in</p>
            : <a
              className="App-link"
              href="http://localhost:8888/login"
            >
              Log in to Spotify
            </a>
        }
      </header>
    </div>
  );
}

export default App;
