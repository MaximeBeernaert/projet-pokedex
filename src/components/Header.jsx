import React from 'react'
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header>
        <Link className="header-pokemon" to="/">Pokemon</Link>
        <Link className="header-listes" to="/listes">Listes des pokemons</Link>
        <Link className="header-pokedex" to="/pokedex">Pokedex</Link>
    </header>
  )
}
