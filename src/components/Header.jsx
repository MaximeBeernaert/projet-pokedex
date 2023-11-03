import React from 'react'
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <div className="header-items">
        <Link className="header-listes" to="/">Listes des pokemons</Link>
        <Link className="header-pokedex" to="/pokedex">Pokedex</Link>
      </div>
    </header>
  )
}
