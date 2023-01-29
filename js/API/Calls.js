import { paintPokemonsOptions, paintPokemon } from '../UI/UI.js';

/* URL for a single pokemon data */
const URL_POKEMON = 'https://pokeapi.co/api/v2/pokemon/';

/* Array for save all pokemons */
const pokemons = [];

/* Function to fetch all pokemons */
export async function getPokemons(url) {
  const response = await fetch(url);
  const result = await response.json();
  /* For each pokemon create an object with their id and their name */
  result.results.forEach((pokemon, i) => {
    let pObj = {
      'id': i + 1,
      'name': pokemon.name,
    };
    /* Push the pokemon object into the array */
    pokemons.push(pObj);
  });
  /* Paint names on select */
  paintPokemonsOptions(pokemons);
}

/* Function to fecth a single pokemon, searching by name */
export async function getPokemon(e) {
  const name = e.target.value;
  const response = await fetch(URL_POKEMON + e.target.value);
  const result = await response.json();
  /* Save which parameters i need */
  const { sprites, abilities, types } = result;
  //console.log(result);
  /* Paint pokemon name and image on html */
  paintPokemon(sprites.other.home.front_default, name, e);
}
