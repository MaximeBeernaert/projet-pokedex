import React, { useEffect, useState } from 'react';
import Type from './Type'

import Button from '@mui/material/Button';

export default function CartePokemon({ pokemonURL }) {

  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    // Définition de la fonction asynchrone pour le call API
    const fetchPokemonData = async () => {
        const response = await fetch(pokemonURL);
        const data = await response.json();
        setPokemon(data);
      }
    fetchPokemonData();
  }, [pokemonURL]);


  
  const addToPokedex = () => {
    // Récupérez le pokedex du local storage
    let pokedex = JSON.parse(localStorage.getItem("pokedex")) || [];

    pokedex.push(pokemon.id);

    // Sauvegarde du pokedex dans le local storage
    localStorage.setItem("pokedex", JSON.stringify(pokedex));

    console.log(localStorage);
    localStorage.clear(); //DEV => REMOVE AFTER
  }


  return (
    // corps de la carte
    <div className='carte-pokemon'>
        { pokemon ? 
          <>
          <div className='image-pokemon-div'>
            <img src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + pokemon.id + '.png'} alt="" className='image-pokemon'/>
          </div>

          <div className='nom-pokemon'>
            <h2>{pokemon.name}</h2> 
          </div>

          <div className='numero-pokemon'>
            <p>{pokemon.id}</p>
          </div>

          <Type type={pokemon.types}/>

          <Button variant="outlined" onClick={addToPokedex}>Ajouter</Button>
          </>
          :
          <></>
        }
    </div>
  )
}
