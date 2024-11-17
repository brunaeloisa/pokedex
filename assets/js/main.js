import {pokeApi} from './poke-api.js';

const pokemonListElement = document.getElementById('pokemon-list');
const loadButton = document.getElementById('load-button');
const maxRecords = 251;
let limit = 12;
let offset = 0;

function loadPokemonItems(offset, limit) {
  // gera item de lista com os dados do pokemon
  const generateHtml = pokemon => `
    <li class="pokemon ${pokemon.mainType}">
      <span class="number">#${String(pokemon.number).padStart(3,'0')}</span>
      <span class="name">${pokemon.name}</span>

      <div class="detail">
        <ol class="type-list">
          ${pokemon.types.map(type => `<li class="type">${type}</li>`).join('')}
        </ol>
        
        <img src="${pokemon.image}" alt="${pokemon.name}">
      </div>
    </li>
  `;

  // adiciona itens na lista de pokemons
  pokeApi.getPokemons(offset, limit).then((pokemonList = []) => {
    pokemonListElement.innerHTML += pokemonList.map((generateHtml)).join('');
  });
}

// inicializa com a primeira requisição
loadPokemonItems(offset, limit);

// adiciona click event para novas requisições
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