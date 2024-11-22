import {pokeApi} from './poke-api.js';
import { generateListItem, generateModal } from './utils.js';

const pokemonListElement = document.getElementById('pokemon-list');
const loadButton = document.getElementById('load-button');
const maxRecords = 251;
let limit = 12;
let offset = 0;

function loadPokemonItems(offset, limit) {
  pokeApi.getPokemons(offset, limit)
    .then(pokemonList => {
      // adiciona itens na lista de pokemons
      pokemonListElement.innerHTML += pokemonList.map((generateListItem)).join('');
    })
    .then(() => {
      // adiciona click event para cada pokemon da lista
      document.querySelectorAll('.pokemon').forEach(pokemon => {
        pokemon.addEventListener('click', () => {
          const { pokemonId } = pokemon.dataset;

          // faz requisição de informações usando o id do pokemon
          pokeApi.getPokemonData(pokemonId).then((pokemon) => {
            const modalHtml = generateModal(pokemon);
            const modalElement = document.getElementById('modal-overlay');

            // cria e exibe a janela modal
            modalElement.innerHTML = modalHtml;
            modalElement.classList.add('open');

            // fecha modal ao apertar o botão de voltar
            modalElement.addEventListener('click', (e) => {
              if (e.target.id == 'modal-overlay') {
                modalElement.classList.remove('open');
              }
            });
            // fecha modal ao apertar a tecla Esc
            window.addEventListener('keydown', (e) => {
              if (e.key == 'Escape') {
                modalElement.classList.remove('open');
              }
            });
            // fecha modal ao clicar fora da janela
            document.getElementById('back-button').addEventListener('click', () => {
              modalElement.classList.remove('open');
            });
          });
        });
      });
    });
}

// inicializa com a primeira requisição
loadPokemonItems(offset, limit);

// adiciona click event para carregar mais pokemons
loadButton.addEventListener('click', () => {
  offset += limit;

  if ((offset + limit) < maxRecords) {
    loadPokemonItems(offset, limit);
  } else {
    const newLimit = maxRecords - offset;
    loadPokemonItems(offset, newLimit);

    // remove botão ao atingir o máximo de registros
    loadButton.parentElement.removeChild(loadButton);
  }
});