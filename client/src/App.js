import './App.css';
import { useEffect, useState } from 'react';
import { accessToken } from './api';
import Profile from './pages';


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
            ? <Profile />
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
