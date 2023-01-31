import { showAlert, startGame } from '../UI/UI.js';
import { LIMIT } from '../app.js';

const TOTAL_OPTIONS = 3;
/* Function to validate all pokemons are selected and start game */
export function goToCombat() {
  const imagenes = document.querySelectorAll('.seleccion img');
  let flag = 0;
  imagenes.forEach((e) => {
    if (e.src === '') {
      showAlert('Necesitas seleccionar todos los Pokemons');
      return;
    }
    flag++;
  });
  if (flag === TOTAL_OPTIONS) {
    const pokemonsSelected = getPokemonsSelected(),
      pokemonsRandom = getRandomPokemons();
    startGame(pokemonsSelected, pokemonsRandom);
  }
}

export function calculateCombatResult(
  pokemonsCombatSelected,
  pokemonsCombatRandom
) {
  //paintCombatResult();
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getPokemonsSelected() {
  const pokemonsSelected = [];
  const selects = document.querySelectorAll('#seleccion select');
  selects.forEach((select) =>
    pokemonsSelected.push(
      select.nextElementSibling.textContent.toLocaleLowerCase()
    )
  );
  return pokemonsSelected;
}

function getRandomPokemons() {
  let randomPokemons = [];
  do {
    /* Creamos una posición aleatoria en referencia a la longuitud del array de paises */
    let random = Math.floor(Math.random() * LIMIT);
    /* Si el array no incluye esta posición le hacemos push */
    if (!randomPokemons.includes(random)) randomPokemons.push(random);
    /* Hasta que el array tenga las 3 posiciones y esté completo */
  } while (randomPokemons.length !== TOTAL_OPTIONS);
  return randomPokemons;
}
