import React, { useEffect, useState } from 'react'

import CartePokemon from '../Autre/Carte/CartePokemon';

export default function AffichagePokedex() {

  const updatePokedex = (newPokedex) => {
    setPokedex(newPokedex);
    localStorage.setItem('pokedex', JSON.stringify(newPokedex));
  }
  
  //Récupération du local storage 'pokedex'
  const [pokedex, setPokedex] = useState([])
  useEffect(() => {
    const pokedex = JSON.parse(localStorage.getItem('pokedex'))
    setPokedex(pokedex)
  }, [])

  pokedex.sort((a, b) => a - b)

  //Call API pour récupérer les infos des pokemons en fonction des id du local storage
  const pokemonCards = [];
  for (let i = 0; i <pokedex.length ; i++) {
    const pokemonURL = `https://pokeapi.co/api/v2/pokemon-form/${pokedex[i]}`;
    pokemonCards.push(<CartePokemon key={i} pokemonURL={pokemonURL} />);
  }

  return (
    <div>
        <h1>Mon Pokedex de zinzin</h1>

        <div className="cartes-pokemon">
        {pokemonCards}
        </div>
    </div>
  )
}