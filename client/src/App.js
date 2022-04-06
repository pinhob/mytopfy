import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { accessToken } from './api';
import Profile, { TopArtists, TopTracks } from './pages';

function App() {
  const [token, getToken] = useState(null);


  useEffect(() => {
    getToken(accessToken);
  }, []);


  return (
    <div className="App">
      <header className="App-header">
        {
          !token
            ? <a
              className="App-link"
              href="http://localhost:8888/login"
            >
              Log in to Spotify
            </a>
            : <Router>
              <Switch>
                <Route path="/top-tracks">
                  <TopTracks />
                </Route>
                <Route path="/top-artists">
                  <TopArtists />
                </Route>
                <Route path="/">
                  <Profile />
                </Route>
              </Switch>
            </Router>
        }
      </header>
    </div>
  );
}

export default App;
