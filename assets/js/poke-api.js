import { Pokemon } from './pokemon-model.js';

export const pokeApi = {}

function pokeApiToPokemon(pokemonDetail) {
  const pokemon = new Pokemon();
  pokemon.name = pokemonDetail.name;
  pokemon.number = pokemonDetail.id;
  pokemon.types = pokemonDetail.types.map(typeSlot => typeSlot.type.name);
  pokemon.mainType = pokemon.types[0];
  pokemon.image = pokemonDetail.sprites.other['official-artwork'].front_default;
  return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then(response => response.json())
    .then(pokeApiToPokemon);
};

pokeApi.getPokemons = (offset=0, limit=10) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
  return fetch(url)
    .then(response => response.json())
    .then(jsonBody => jsonBody.results)
    .then(pokemons => pokemons.map(pokeApi.getPokemonDetail))
    .then(detailRequests => Promise.all(detailRequests))
    .catch(error => console.log(error));
};