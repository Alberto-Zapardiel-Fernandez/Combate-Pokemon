import { showAlert, startGame } from '../UI/UI.js';

/* Function to validate all pokemons are selected and start game */
export function goToSelection() {
  const imagenes = document.querySelectorAll('.seleccion img');
  imagenes.forEach((e) => {
    if (e.src === '') {
      showAlert('Necesitas seleccionar todos los Pokemons');
      return;
    } else {
      const pokemonsSelected = [];
      startGame(pokemonsSelected);
    }
  });
}
