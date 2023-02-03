import { showAlert, startGame, paintCombatResult } from '../UI/UI.js';
import { LIMIT } from '../app.js';

const TOTAL_OPTIONS = 3;
/* Function to validate all pokemons are selected and start game */
export function goToCombat() {
  const imagenes = document.querySelectorAll('.seleccion img');
  let flag = 0;
  /* Comprueba que todos los selects tienen algo seleccionado */
  imagenes.forEach((e) => {
    if (e.src === '') {
      showAlert('Necesitas seleccionar todos los Pokemons');
      return;
    }
    flag++;
  });
  /* Si están todos comprobamos si se han seleccionado repetidos */
  if (flag === TOTAL_OPTIONS) {
    const pokemonsSelected = getPokemonsSelected(),
      pokemonsRandom = getRandomPokemons();
    let repetidos = new Set(pokemonsSelected);
    /* Si están repetido mandamos error y seleccionar otro */
    if (repetidos.size < TOTAL_OPTIONS) {
      showAlert('¡Sin repetir el mismo Pokemon!');
      return;
    } else {
      /* Si todo está bien, a jugar */
      startGame(pokemonsSelected, pokemonsRandom);
    }
  }
}

/* Función que calcula el resultado final */
export function calculateCombatResult(pokemonsCombatSelected, pokemonsCombatRandom) {
  /* Guardamos las imágenes de los pokemon y sus nombres */
  let images = pokemonsCombatSelected.map((pokemonImage) => pokemonImage.sprite);
  pokemonsCombatRandom.forEach((pokemonImage) => images.push(pokemonImage.sprite));
  const namesPCS = pokemonsCombatSelected.map((name) => capitalizeFirstLetter(name.name));
  const namesPCR = pokemonsCombatRandom.map((name) => capitalizeFirstLetter(name.name));
  let winMessages = [];
  do {
    /* Obtenemos un ganador aleatoriamente */
    let winner = getWinner();
    /* Si es de los seleccionados mandamos mensaje */
    if (winner === 0) {
      /* Si el pokemon rival es más fuerte mandamos un mensaje y si no otro */
      pokemonsCombatSelected[0].weight < pokemonsCombatRandom[0].weight
        ? winMessages.push(
            `${capitalizeFirstLetter(pokemonsCombatSelected[0].name)} de tu equipo, ha ganado contra todo pronóstico a ${capitalizeFirstLetter(
              pokemonsCombatRandom[0].name
            )}`
          )
        : winMessages.push(
            `${capitalizeFirstLetter(pokemonsCombatSelected[0].name)} de tu equipo, ha ganado a ${capitalizeFirstLetter(
              pokemonsCombatRandom[0].name
            )}`
          );
      /* Sacamos al pokemon del combate */
      pokemonsCombatRandom.shift();
    } else {
      pokemonsCombatRandom[0].weight < pokemonsCombatSelected[0].weight
        ? winMessages.push(
            `${capitalizeFirstLetter(pokemonsCombatRandom[0].name)} del equipo rival, ha ganado contra todo pronóstico a ${capitalizeFirstLetter(
              pokemonsCombatSelected[0].name
            )}`
          )
        : winMessages.push(
            `${capitalizeFirstLetter(pokemonsCombatRandom[0].name)} del equipo rival, ha ganado a ${capitalizeFirstLetter(
              pokemonsCombatSelected[0].name
            )}`
          );
      pokemonsCombatSelected.shift();
    }
    /* Todo mientras quede algún Pokemon en juego hasta que un equipo no tiene más */
  } while (pokemonsCombatSelected.length > 0 && pokemonsCombatRandom.length > 0);
  /* Mensaje final del ganador */
  pokemonsCombatRandom.length > 0
    ? winMessages.push(`El equipo rival formado por ${namesPCR[0]}, ${namesPCR[1]} y ${namesPCR[2]} ha GANADO!`)
    : winMessages.push(`Tu equipo formado por ${namesPCS[0]}, ${namesPCS[1]} y ${namesPCS[2]} ha GANADO!`);
  /* Mandamos a pintar el resultado */
  paintCombatResult(winMessages, images, namesPCS, namesPCR);
}

/* Pone la primera letra en mayúsculas */
export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
/* Saca un ganador aleatorio */
function getWinner() {
  return Math.floor(Math.random() * 2);
}
/* Obtenemos los pokemon seleccionados */
function getPokemonsSelected() {
  const pokemonsSelected = [];
  const selects = document.querySelectorAll('#seleccion select');
  selects.forEach((select) => pokemonsSelected.push(select.nextElementSibling.textContent.toLocaleLowerCase()));
  return pokemonsSelected;
}

function getRandomPokemons() {
  let randomPokemons = [];
  do {
    /* Creamos una posición aleatoria en referencia a la longuitud del array de paises */
    let random = Math.floor(Math.random() * (LIMIT - 1) + 1);
    /* Si el array no incluye esta posición le hacemos push */
    if (!randomPokemons.includes(random)) randomPokemons.push(random);
    /* Hasta que el array tenga las 3 posiciones y esté completo */
  } while (randomPokemons.length !== TOTAL_OPTIONS);
  return randomPokemons;
}
/* Reproduce la música final */
export function playMusic() {
  const audio = document.createElement('audio');
  audio.src = '../assets/pokemon.mp3';
  audio.play();
}
