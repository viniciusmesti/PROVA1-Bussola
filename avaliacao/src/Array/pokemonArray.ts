const axios = require('axios');

async function fetchPokemonData() {
  try {
    const response = await axios.get('https://api.example.com/pokemon');
    const pokemonData = response.data;
    const fireRedVersion = 'FIRE RED'; 

    const pokemonArray = pokemonData.map((pokemon) => {
      const fireRedDex = pokemon.dex.find((entry) => entry.version === fireRedVersion);

      return {
        name: pokemon.name,
        type: pokemon.type,
        status: pokemon.status,
        dexNumber: fireRedDex.number,
        height: pokemon.height,
        weight: pokemon.weight,
        moves: pokemon.moves.slice(0, 4), 
      };
    });

    return pokemonArray;
  } catch (error) {
    console.error('Erro ao obter dados da API:', error);
    return [];
  }
}
