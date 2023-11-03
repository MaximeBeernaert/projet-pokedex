import React, { useEffect, useState } from 'react'

import CartePokemon from '../Autre/Carte/CartePokemon';

export default function AffichagePokedex() {

  // Initialisation de l'état du pokedex avec le contenu du local storage
  const [pokedexItems, setPokedexItems] = useState(() => {
    const savedPokedex = localStorage.getItem("pokedex");
    if (savedPokedex) {
        return JSON.parse(savedPokedex);
    } else {
        return [];
    }
  });

  useEffect(() => {
    // À chaque mise à jour du pokedex, sauvegardez-le à nouveau dans le local storage
    localStorage.setItem("pokedex", JSON.stringify(pokedexItems));
  }, [pokedexItems]);

  //API request for 

  return (
    <div>
        <h1>Mon Pokedex de zinzin</h1>
        {/* <CartePokemon pokemonURL={}/> */}

    </div>
  )
}
