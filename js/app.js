import { getPokemons } from './API/Calls.js';
import { goToCombat } from './Functions/functions.js';
/* Limit of Pokemons */
export const LIMIT = 151;
/* URL to search ⬆️ pokemons */
const URL_ALL_POKEMONS = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${LIMIT}`;
document.addEventListener('DOMContentLoaded', getPokemons(URL_ALL_POKEMONS));

const btnStart = document.getElementById('btnStart');
btnStart.addEventListener('click', goToCombat);
