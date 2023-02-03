import { paintPokemonsOptions, paintPokemon } from '../UI/UI.js';
import { calculateCombatResult } from '../Functions/functions.js';

/* URL for a single pokemon data */
const URL_POKEMON = 'https://pokeapi.co/api/v2/pokemon/';

/* Array for save all pokemons */
export const pokemons = [],
  pokemonsCombatSelected = [],
  pokemonsCombatRandom = [];

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
  /* Paint pokemon name and image on html */
  paintPokemon(sprites.other.home.front_default, name, abilities, types, e);
}

/* Function to fetach a single pokemon for combat result */
export async function getPokemonCombat(identifier) {
  const response = await fetch(URL_POKEMON + identifier);
  const result = await response.json();
  const { id, name, weight, sprites } = result;
  let pObj = {
    'id': id + 1,
    name,
    weight,
    'sprite': sprites.front_default,
  };
  /* Push the pokemon object into the array */
  /* Comprobar si es texto o número */
  Number(identifier) ? pokemonsCombatRandom.push(pObj) : pokemonsCombatSelected.push(pObj);
  if (pokemonsCombatSelected.length === 3 && pokemonsCombatRandom.length === 3) {
    calculateCombatResult(pokemonsCombatSelected, pokemonsCombatRandom);
  }
}
