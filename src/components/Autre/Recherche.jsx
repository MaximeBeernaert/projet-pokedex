import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import CartePokemon from './Carte/CartePokemon';
import Image from './Image';

import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';





export default function Recherche() {
    // on récupère la recherche de l'utilisateur dès qu'il ajoute des élèments à l'input
    // avec ces infos, on fait une recherche dans l'API pour voir si cela correspond à un pokémon

    const [search, setSearch] = useState();
    const [pokemonList, setPokemonList] = useState(null);
    const [pokemon, setPokemon] = useState(null);
    const [listeRecherche, setListeRecherche] = useState([]);

    useEffect(() => {
      // Définition de la fonction asynchrone pour le call API
      const fetchPokemonData = async () => {
          const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10435&offset=0');
          const data = await response.json();
          setPokemonList(data);
        }
      fetchPokemonData();
    }, [pokemonList]);

    const preventDefault = (e) => {
        e.preventDefault();
    }

    const setSearchBar = (pokemon) => {
        let elem = document.getElementById("outlined-basic");
        elem.value = pokemon.name;
        setPokemon(pokemon.url);
    }
    const searchPokemon = (e) => {

        let trouve = false;
        let tempTrouve = false;
        setListeRecherche(listeRecherche.splice(0, listeRecherche.length));
        pokemonList.results.map((pokemon) => {
            // permet la liste des pokémons correspondant à la recherche
            if(pokemon.name.slice(0, search.length) === search && search !== "" && listeRecherche.length<5){
                // listeRecherche.push(pokemon.name);
                listeRecherche.push(<ListItemButton onClick={ e => setSearchBar(pokemon)}> <ListItemIcon> <Image url={pokemon.url}/> </ListItemIcon> <ListItemText primary={pokemon.name} /> </ListItemButton>)
                setListeRecherche(listeRecherche);
                // permet de trouver le pokémon correspondant à la recherche
                if(tempTrouve != true){
                    setPokemon(pokemon.url);
                    tempTrouve = true;
                }
            }
            // permet de vider la liste des pokémons correspondant à la recherche
            if(search === ""){
                setListeRecherche([]);
            }
            if(pokemon.name === search){
                setPokemon(pokemon.url);
                trouve = true;
            }else if(!trouve && tempTrouve == false){
                setPokemon("");
            }
        });
    }

  return (
    <div className='recherche'>
        {/* input de la recherche (l'utilisateur entre le nom du pokémon) */}
        <div className='recherche-input'>
            <Box component="form" sx={{'& > :not(style)': { m: 1, width: '25ch' }, }} noValidate autoComplete="off" onSubmit={e => preventDefault(e)}>
                <TextField id="outlined-basic" label="Entrez le Pokémon à rechercher" variant="outlined" onKeyUp={e=>searchPokemon(e)} onInput={ e=>setSearch(e.target.value)}/>
            </Box>
        </div>

        {/* listage des options de recherche */}
        <div className='recherche-liste'>
         <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                      <ListSubheader component="div" id="nested-list-subheader">
                        Propositions de Pokémons
                      </ListSubheader>
                    }
                >
                    <div className='recherche-liste-proposition'>{listeRecherche}</div> 
             </List>
        </div>

        {/* carte du pokémon recherché */}
        <div className='carte-recherche'>
            <CartePokemon pokemonURL={pokemon}/>
        </div>
    </div>
  )
}
