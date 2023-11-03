import React, { useState, useEffect } from 'react';
import CartePokemon from '../Autre/Carte/CartePokemon';
import Recherche from '../Autre/Recherche';

function ListePokemon() {


  const [page, setPage] = useState(1); // La page initiale est 1
  const pokemonsParPage = 10; // Nombre de Pokémons par page

  // Calcul de l'offset basé sur la page actuelle
  let offset = (page - 1) * pokemonsParPage;

  // Générer les composants CartePokemon pour la page actuelle
  const pokemonCards = [];
  for (let i = 0; i < pokemonsParPage; i++) {
    const pokemonURL = `https://pokeapi.co/api/v2/pokemon-form/${offset + i + 1}`;
    pokemonCards.push(<CartePokemon key={i} pokemonURL={pokemonURL} />);
  }

  // Fonction pour aller à la page suivante
  const goToNextPage = () => {
    setPage(page + 1);
  };

  // Fonction pour revenir à la page précédente
  const goToPrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className='liste-pokemon'>

      <div className='recherche'>
        <Recherche/>
      </div>


      {/* Affichage des cartes de Pokémon */}
      <div className="cartes-pokemon">
        {pokemonCards}

        {/* Boutons de pagination */}
        <div className="pagination">

          {page > 1 && <button onClick={goToPrevPage}>Précédent</button>}

          <button onClick={goToNextPage}>Suivant</button>
        </div>
      </div>
    </div>
  );
}

export default ListePokemon;