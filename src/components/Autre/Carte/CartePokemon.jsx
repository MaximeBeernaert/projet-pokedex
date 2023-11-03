import React, { useEffect, useState } from 'react';
import Type from './Type';

import Button from '@mui/material/Button';

export default function CartePokemon({ pokemonURL }) {
  const [pokemon, setPokemon] = useState(null);
  const [isInPokedex, setIsInPokedex] = useState(false);

  // Récupération des données du Pokémon
  useEffect(() => {
    const fetchPokemonData = async () => {
      if (!pokemonURL) return;

      try {
        const response = await fetch(pokemonURL);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setPokemon(data);
        setIsInPokedex(checkIsInPokedex(data.id)); // Check si le Pokémon est dans le pokedex au chargement du composant
      } catch (error) {
        console.error('Erreur lors de la récupération des données du Pokémon:', error);
      }
    };

    fetchPokemonData();
  }, [pokemonURL]);

  // Vérifie si le Pokémon est dans le pokedex
  const checkIsInPokedex = (pokemonID) => {
    const pokedex = JSON.parse(localStorage.getItem('pokedex')) || [];
    return pokedex.includes(pokemonID);
  };

  // Ajoute un Pokémon au pokedex
  const addToPokedex = (pokemonID) => {
    const pokedex = JSON.parse(localStorage.getItem('pokedex')) || [];
    if (!pokedex.includes(pokemonID)) {
      pokedex.push(pokemonID);
      localStorage.setItem('pokedex', JSON.stringify(pokedex));
      setIsInPokedex(true);

      console.log(localStorage);
    }
  };

  // Retire un Pokémon du pokedex
  const removeFromPokedex = (pokemonID) => {
    const pokedex = JSON.parse(localStorage.getItem('pokedex')) || [];
    const newPokedex = pokedex.filter(id => id !== pokemonID);
    localStorage.setItem('pokedex', JSON.stringify(newPokedex));
    setIsInPokedex(false);

    console.log(localStorage);
  };

  const majuscule = () =>{
    let nom = pokemon.name;
    return nom.charAt(0).toUpperCase() + nom.slice(1);
  }

  return (
    <div className={`carte-pokemon ${isInPokedex ? ("isInPokedex") : ""}`}>
      {pokemon && (
        <>
          <div className='image-pokemon-div'>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} alt={pokemon.name} className='image-pokemon' />
          </div>

          <div className='nom-pokemon'>
            <h2>{majuscule()}</h2> 
          </div>

          <div className='numero-pokemon'>
            ID : {pokemon.id}
          </div>

          <Type type={pokemon.types} />

          {isInPokedex ? (
            <Button variant="outlined" color="error" size="small" onClick={() => removeFromPokedex(pokemon.id)}>Retirer</Button>
          ) : (
            <Button variant="outlined" color="success" size="small" onClick={() => addToPokedex(pokemon.id)}>Ajouter</Button>
          )}
        </>
      )}
    </div>
  );
}
