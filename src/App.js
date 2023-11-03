import { Routes, Route } from 'react-router-dom';

import Accueil from './components/Accueil'
import ListePokemon from './components/Liste/ListePokemon';
import Pokedex from './components/Pokedex/Pokedex';

import Header from './components/Header'
import Footer from './components/Footer';

import './App.css';

function App() {
  return (
    <div className="App">
      <Header/>
      
      <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/listes" element={<ListePokemon />} />
          <Route path="/pokedex" element={<Pokedex/>} />
      </Routes>
      
      <Footer/> 
    </div>
  );
}

export default App;
