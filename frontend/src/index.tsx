/* import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/index.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
); */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GameScreen from './components/GameScreen'; // Your main game component
import ChallengeLanding from './components/ChallengeLanding';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GameScreen />} /> {/* Default game route */}
        <Route path="/challenge" element={<ChallengeLanding />} /> {/* Challenge route */}
      </Routes>
    </Router>
  );
};

export default App;