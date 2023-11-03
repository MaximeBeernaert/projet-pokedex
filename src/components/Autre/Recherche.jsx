import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import CartePokemon from './Carte/CartePokemon';


export default function Recherche() {
    // on récupère la recherche de l'utilisateur dès qu'il ajoute des élèments à l'input
    // avec ces infos, on fait une recherche dans l'API pour voir si cela correspond à un pokémon

    const [search, setSearch] = useState();
    const [pokemonList, setPokemonList] = useState(null);
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        // Définition de la fonction asynchrone pour le call API
        const fetchPokemonData = async () => {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
            const data = await response.json();
            setPokemonList(data);
          }
        fetchPokemonData();
      }, [pokemonList]);

    const preventDefault = (e) => {
        e.preventDefault();
    }
    
    // let listeRecherche = [];

    const searchPokemon = (e) => {
        let trouve = false;
        const listeRecherche = [];

        pokemonList.results.map((pokemon) => {
            // permet la liste des pokémons correspondant à la recherche
            if(pokemon.name.slice(0, search.length) === search){
                console.log(pokemon.name);
                listeRecherche.push(<p>{pokemon.name}</p>);
            }

            // permet de trouver le pokémon correspondant à la recherche
            if(pokemon.name === search){
                setPokemon(pokemon.url);
                trouve = true;
            }else if(!trouve){
                setPokemon("");
            }
        });
        return listeRecherche;
    }

  return (
    <div className='recherche'>
        {/* input de la recherche (l'utilisateur entre le nom du pokémon) */}
        <div className='recherche-input'>
            <Box component="form" sx={{'& > :not(style)': { m: 1, width: '25ch' }, }} noValidate autoComplete="off" onSubmit={e => preventDefault(e)}>
                <TextField id="outlined-basic" label="Entrez le Pokémon à rechercher" variant="outlined" onKeyUp={e => searchPokemon(e.target.value)} onInput={ e=>setSearch(e.target.value)}/>
                {/* <Button color="inherit" type="submit">Rechercher</Button> */}
            </Box>
        </div>

        {/* listage des options de recherche */}
        <div className='recherche-liste'>
            {listeRecherche}
        </div>

        {/* carte du pokémon recherché */}
        <div className='carte-recherche'>
            <CartePokemon pokemonURL={pokemon}/>
        </div>
    </div>
  )
}
