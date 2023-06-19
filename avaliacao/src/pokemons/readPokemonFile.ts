

function readPokemonFile(filename) {
  const pokemonData = fs.readFileSync(filename, 'utf8');
  return JSON.parse(pokemonData);
}

function groupPokemonsByType(pokemonArray) {
  const pokemonByType = {};

  pokemonArray.forEach((pokemon) => {
    const { type } = pokemon;

    if (!pokemonByType[type]) {
      pokemonByType[type] = [];
    }

    pokemonByType[type].push(pokemon);
  });

  for (const type in pokemonByType) {
    pokemonByType[type].sort((a, b) => a.dexNumber - b.dexNumber);
  }

  return pokemonByType;
}


function savePokemonByType(pokemonByType) {
  const filename = 'pokemon_by_type.json';
  fs.writeFileSync(filename, JSON.stringify(pokemonByType));
  console.log(`Pokémon agrupados por tipo salvos no arquivo: ${filename}`);
}


const pokemonArray = readPokemonFile('pokemon_data.json');


const pokemonByType = groupPokemonsByType(pokemonArray);


savePokemonByType(pokemonByType);
  