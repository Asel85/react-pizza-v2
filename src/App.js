import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import Header from './components/Header';
import Home from './pages/Home';
import './scss/app.scss';
import NotFound from './pages/NotFound';

function App() {
  const [search, setSearch] = useState('');
  return (
    <div className="wrapper">
      <Header search={search} setSearch={setSearch} />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home search={search} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
