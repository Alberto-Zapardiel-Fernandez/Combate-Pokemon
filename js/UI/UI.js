import { getPokemon } from '../API/Calls.js';
const selectPokemons = document.getElementById('selectPokemons');

/* For Each pokemon write an option into select */

//TODO create 3 selects for make a team
export function paintPokemonsOptions(pokemons) {
  pokemons.map((pokemon) => {
    selectPokemons.innerHTML += `<option id="${pokemon.id}" value="${pokemon.name}">${pokemon.name}</option>`;
    selectPokemons.addEventListener('change', getPokemon);
  });
}

/* Function for paint the pokemon name an image on html */
export function paintPokemon(imgSrc, name) {
  document.getElementById('pokemonName').textContent = name;
  document.getElementById('imgPokemon').src = imgSrc;
}
