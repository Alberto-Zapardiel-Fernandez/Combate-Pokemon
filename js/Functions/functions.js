import { showAlert, startGame } from '../UI/UI.js';

/* Function to validate all pokemons are selected and start game */
export function goToSelection() {
  const imagenes = document.querySelectorAll('.seleccion img');
  let flag = false;
  imagenes.forEach((e) => {
    if (e.src === '') {
      showAlert('Necesitas seleccionar todos los Pokemons');
      return;
    }
    flag = true;
  });
  if (flag) {
    const pokemonsSelected = [];
    startGame(pokemonsSelected);
  }
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
