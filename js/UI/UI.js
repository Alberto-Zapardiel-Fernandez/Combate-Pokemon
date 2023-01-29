import { getPokemon } from '../API/Calls.js';
const selectPokemons = document.getElementsByClassName('selectPokemons');

/* For Each pokemon write an option into select */

export function paintPokemonsOptions(pokemons) {
  pokemons.map((pokemon) => {
    for (let i = 0; i < selectPokemons.length; i++) {
      selectPokemons[
        i
      ].innerHTML += `<option id="${pokemon.id}" value="${pokemon.name}">${pokemon.name}</option>`;
      selectPokemons[i].addEventListener('change', getPokemon);
    }
  });
}

/* Function for paint the pokemon name and image on html */
export function paintPokemon(imgSrc, name, e) {
  const id = e.target.id.slice(e.target.id.length - 1);
  document.getElementById(`pokemonName${id}`).textContent = name;
  document.getElementById(`imgPokemon${id}`).src = imgSrc;
}

/* Function to show the alert */
export function showAlert(message) {
  const divAlert = document.getElementById('divAlert').classList;
  const alertMessage = document.getElementById('alertMessage');

  setTimeout(() => {
    divAlert.add('opacity1');
    divAlert.remove('opacity0');
    alertMessage.textContent = message;
  }, 300);
  setTimeout(() => {
    divAlert.add('opacity0');
    divAlert.remove('opacity1');
  }, 4000);
  alertMessage.textContent = '';
}

/* Function to start a new Game */
export function startGame(pokemons) {}
