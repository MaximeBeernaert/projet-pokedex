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
      let trouve = false;

    const preventDefault = (e) => {
        e.preventDefault();
    }

    const searchPokemon = (e) => {
        console.log(e);
        let trouve = false;
        // if(search == ""){
        //     setPokemon();
        // }
        pokemonList.results.map((pokemon) => {
            if(pokemon.name === search){
                setPokemon(pokemon.url);
                console.log('trouvé');
                trouve = true;
            }else if(!trouve){
                setPokemon("");
                console.log('pas trouvé');
            }
        });
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

        {/* bouton rechercher */}
        <div className='recherche-bouton'>

        </div>

        {/* carte du pokémon recherché */}
        <div className='carte-recherche'>
            <CartePokemon pokemonURL={pokemon}/>
        </div>
    </div>
  )
}
