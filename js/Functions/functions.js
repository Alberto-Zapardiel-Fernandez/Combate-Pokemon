import { showAlert, startGame, paintCombatResult } from '../UI/UI.js';
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

export function calculateCombatResult(pokemonsCombatSelected, pokemonsCombatRandom) {
  const pCS = pokemonsCombatSelected.map((name) => capitalizeFirstLetter(name.name));
  const pCR = pokemonsCombatRandom.map((name) => capitalizeFirstLetter(name.name));
  let winMessages = [];
  do {
    let winner = getWinner();
    if (winner === 0) {
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
  } while (pokemonsCombatSelected.length > 0 && pokemonsCombatRandom.length > 0);
  pokemonsCombatRandom.length > 0
    ? winMessages.push(`El equipo rival formado por ${pCR[0]}, ${pCR[1]} y ${pCR[2]} ha GANADO!`)
    : winMessages.push(`Tu equipo formado por ${pCS[0]}, ${pCS[1]} y ${pCS[2]} ha GANADO!`);

  paintCombatResult(winMessages);
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getWinner() {
  return Math.floor(Math.random() * 2);
}

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
