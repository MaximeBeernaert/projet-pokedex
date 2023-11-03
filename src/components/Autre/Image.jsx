import React, { useState, useEffect } from 'react'

export default function Image(url) {
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        // Définition de la fonction asynchrone pour le call API
        const fetchPokemonData = async () => {
            const response = await fetch(url.url);
            const data = await response.json();
            setPokemon(data);
          }
        fetchPokemonData();
      }, [pokemon]);

    return (
        <div className='image-recherche'>
            {(pokemon) ? <img src={pokemon.sprites.front_default} alt=""/> : <p>Chargement...</p>}
        </div>
    )
}
