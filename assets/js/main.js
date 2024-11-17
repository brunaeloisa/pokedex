import {pokeApi} from './poke-api.js';

const pokemonListElement = document.getElementById('pokemon-list');

// cria itens na lista de pokemons
pokeApi.getPokemons().then((pokemonList = []) => {
  pokemonListElement.innerHTML = pokemonList.map(generateHtml).join('');
});

function generateHtml(pokemon) {
  return `
    <li class="pokemon">
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
}

