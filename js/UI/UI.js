import { getPokemon, getPokemonCombat } from '../API/Calls.js';
import { capitalizeFirstLetter } from '../Functions/functions.js';
const selectPokemons = document.getElementsByClassName('selectPokemons');

/* For Each pokemon write an option into select */

export function paintPokemonsOptions(pokemons) {
  pokemons.map((pokemon) => {
    for (let i = 0; i < selectPokemons.length; i++) {
      selectPokemons[i].innerHTML += `<option id="${pokemon.id}" value="${pokemon.name}">${pokemon.id} - ${pokemon.name}</option>`;
      selectPokemons[i].addEventListener('change', getPokemon);
    }
  });
}

/* Function for paint the pokemon name,types and image on html */
export function paintPokemon(imgSrc, name, abilities, types, e) {
  const id = e.target.id.slice(e.target.id.length - 1);
  document.getElementById(`pokemonName${id}`).textContent = capitalizeFirstLetter(name);
  document.getElementById(`imgPokemon${id}`).src = imgSrc;
  const typeParagraph = document.getElementById(`typeParagraph${id}`);
  typeParagraph.textContent = 'Tipo: ';
  paintTypes(types, typeParagraph);
  const abilitiesList = document.getElementById(`abilitiesList${id}`);
  paintAbilities(abilitiesList, abilities);
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
export function startGame(pokemonsSelected, pokemonsRandom) {
  showCombatUI();
  pokemonsSelected.forEach((pokemon) => getPokemonCombat(pokemon));
  pokemonsRandom.forEach((pokemon) => getPokemonCombat(pokemon));
}

export function paintCombatResult(messages) {
  console.log(messages);
}
/* Functions */

function showCombatUI() {
  document.getElementById('empezar').classList.add('d-none');
  document.getElementById('seleccion').classList.add('d-none');
  document.getElementById('combate').classList.remove('d-none');
}

function paintTypes(types, typeParagraph) {
  if (types.length > 1) {
    types.forEach((type, i) => {
      i < types.length - 1
        ? (typeParagraph.textContent += capitalizeFirstLetter(type.type.name) + '/')
        : (typeParagraph.textContent += capitalizeFirstLetter(type.type.name));
    });
  } else {
    typeParagraph.textContent += capitalizeFirstLetter(types[0].type.name);
  }
}

function paintAbilities(abilitiesList, abilities) {
  abilitiesList.textContent = 'Habilidades';
  abilities.forEach((ability) => {
    const li = document.createElement('li');
    li.textContent = capitalizeFirstLetter(ability.ability.name);
    li.className = 'text-white ';
    abilitiesList.appendChild(li);
  });
}
