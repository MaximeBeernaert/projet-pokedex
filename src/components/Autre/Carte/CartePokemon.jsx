import React, { useEffect, useState } from 'react';
import Type from './Type';
import Button from '@mui/material/Button';

export default function CartePokemon({ pokemonURL }) {
  const [pokemon, setPokemon] = useState(null);

  // Possible d'ajouter un état pour gérer le pokedex
  // const [pokedexItems, setPokedexItems] = useState([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch(pokemonURL);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setPokemon(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données du Pokémon:', error);
      }
    };

    if (pokemonURL) {
      fetchPokemonData();
    }
  }, [pokemonURL]);

  const addToPokedex = () => {
    let pokedex = JSON.parse(localStorage.getItem("pokedex")) || [];
    pokedex.push(pokemon.id);
    localStorage.setItem("pokedex", JSON.stringify(pokedex));
    setPokedexItems(pokedex);
  };

  const removeFromPokedex = () => {
    let pokedex = JSON.parse(localStorage.getItem("pokedex")) || [];
    pokedex = pokedex.filter(id => id !== pokemon.id);
    localStorage.setItem("pokedex", JSON.stringify(pokedex));
    setPokedexItems(pokedex);
  };

  const isInPokedex = (pokemonId) => {
    const pokedex = JSON.parse(localStorage.getItem("pokedex")) || [];
    return pokedex.includes(pokemonId);
  };

  return (
    <div className='carte-pokemon'>
      {pokemon && (
        <>
          <div className='image-pokemon-div'>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} alt={pokemon.name} className='image-pokemon' />
          </div>

          <div className='nom-pokemon'>
            <h2>{pokemon.name}</h2> 
          </div>

          <div className='numero-pokemon'>
            <p>{pokemon.id}</p>
          </div>

          <Type type={pokemon.types} />

          {isInPokedex(pokemon.id) ? (
            <Button variant="outlined" onClick={removeFromPokedex}>Retirer</Button>
          ) : (
            <Button variant="outlined" onClick={addToPokedex}>Ajouter</Button>
          )}
        </>
      )}
    </div>
  );
}
