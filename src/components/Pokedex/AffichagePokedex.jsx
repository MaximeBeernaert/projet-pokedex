import React, { useState, useEffect } from 'react'
import CartePokemon from '../Autre/Carte/CartePokemon';
import Button from '@mui/material/Button';

export default function AffichagePokedex() {

  //Récupération du local storage 'pokedex'
  const [pokedex, setPokedex] = useState([])
  useEffect(() => {
    const pokedex = JSON.parse(localStorage.getItem('pokedex'))
    setPokedex(pokedex)  
  }, [])

  //Lors de l'actualisation du local storage, on actualise les pokemons du pokedex
  window.addEventListener("click", () => {
    const pokedex = JSON.parse(localStorage.getItem('pokedex'))
    setPokedex(pokedex)
  })

  
  const deletePokedex = () => {
    localStorage.clear();
  }

  //Call API pour récupérer les infos des pokemons en fonction des id du local storage
  const pokemonCards = [];
  if(pokedex !== null && pokedex.length > 0){
    pokedex.sort((a, b) => a - b)
    for (let i = 0; i <pokedex.length ; i++) {
      const pokemonURL = `https://pokeapi.co/api/v2/pokemon-form/${pokedex[i]}`;
      pokemonCards.push(<CartePokemon key={i} pokemonURL={pokemonURL}/>);
    }
  }
  
  return (
    <div className='affichage-pokedex'>    
      <div className="cartes-pokemon-titre">
            <h1>Mon Pokedex</h1>
          </div>
      {(pokedex === null) ? 
        <h2>Vous n'avez pas encore de pokemon dans votre pokedex !</h2> 
        : 
        <div className="cartes-pokemon">
          {/* Button delete pokedex */}
          <div className='delete-pokedex'>
            <Button variant="contained" onClick={deletePokedex}>Supprimer le Pokédex</Button>
          </div>
          <div className="cartes-pokemon-content">
            {pokemonCards}
          </div>
        </div>
      }
    </div>
  )
}