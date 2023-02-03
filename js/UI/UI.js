import { getPokemon, getPokemonCombat } from '../API/Calls.js';
import { capitalizeFirstLetter, playMusic } from '../Functions/functions.js';
const selectPokemons = document.getElementsByClassName('selectPokemons'),
  finalMessages = document.getElementById('finalMessages'),
  cardSelected = document.getElementById('cardSelected'),
  cardRandom = document.getElementById('cardRandom');

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

/* Function for panit all results */
export function paintCombatResult(messages, images, namesPCS, namesPCR) {
  playMusic();
  paintImagesPokemonsSelected(images, namesPCS);
  paintImagesPokemonsRandom(images, namesPCR);
  showMessages(messages, finalMessages);
  showPokemonsImages();
}

/* Functions */
/* En el box final pone las imágenes de cada pokemon y su nombre de nuestro equipo */
function paintImagesPokemonsSelected(images, namesPCS) {
  const imagesPokemons = document.querySelectorAll('.card-selected img'),
    namesPokemons = document.querySelectorAll('.card-selected p');
  let i = 0;
  imagesPokemons.forEach((img) => {
    img.src = images[i];
    img.alt = images[i];
    i++;
  });
  i = 0;
  namesPokemons.forEach((name) => {
    name.textContent = namesPCS[i];
    i++;
  });
}

/* En el box final pone las imágenes de cada pokemon y su nombre del equipo rival */
function paintImagesPokemonsRandom(images, namesPCR) {
  const imagesPokemons = document.querySelectorAll('.card-random img'),
    namesPokemons = document.querySelectorAll('.card-random p');
  let i = 3;
  imagesPokemons.forEach((img) => {
    img.src = images[i];
    img.alt = images[i];
    i++;
  });
  i = 0;
  namesPokemons.forEach((name) => {
    name.textContent = namesPCR[i];
    i++;
  });
}

/* Muestra los boxes de imágenes */
function showPokemonsImages() {
  cardSelected.classList.remove('card-selected');
  cardSelected.classList.add('left-to-mid');
  cardRandom.classList.remove('card-random');
  cardRandom.classList.add('right-to-mid');
}
/* Muestra el box final con los mensajes y su resultado */
function showMessages(messages, finalMessages) {
  messages.forEach((message) => {
    const p = document.createElement('p');
    p.textContent = message;
    finalMessages.classList.add('top-to-mid');
    finalMessages.appendChild(p);
  });
}
/* Cambia la vista a la final ocultando las actuales */
function showCombatUI() {
  document.getElementById('empezar').classList.add('d-none');
  document.getElementById('seleccion').classList.add('d-none');
  document.getElementById('combate').classList.remove('d-none');
}

/* Dibuja los tipos de cada pokemon */
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
/* Muestra las habilidades de cada pokemon */
function paintAbilities(abilitiesList, abilities) {
  abilitiesList.textContent = 'Habilidades';
  abilities.forEach((ability) => {
    const li = document.createElement('li');
    li.textContent = capitalizeFirstLetter(ability.ability.name);
    li.className = 'text-warning ';
    abilitiesList.appendChild(li);
  });
}
