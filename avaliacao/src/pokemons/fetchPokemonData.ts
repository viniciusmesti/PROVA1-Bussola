const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');
const Pokemon = require('./models/Pokemon');

const app = express();
app.use(express.json());


app.post('/pokemon', async (req, res) => {
  try {
    const shuffle = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    const fetchPokemonData = async () => {
      try {
        const response = await axios.get('https://api.example.com/pokemon');
        const pokemonData = response.data;
        const fireRedVersion = 'FIRE RED'; 
    
        const pokemonArray = pokemonData.map((pokemon) => {
          const fireRedDex = pokemon.dex.find((entry) => entry.version === fireRedVersion);
    
          const shuffledMoves = shuffle(pokemon.moves);
          const selectedMoves = shuffledMoves.slice(0, 4);
    
          return {
            name: pokemon.name,
            type: pokemon.type,
            status: pokemon.status,
            dexNumber: fireRedDex.number,
            height: pokemon.height,
            weight: pokemon.weight,
            moves: selectedMoves,
          };
        });
    
        return pokemonArray;
      } catch (error) {
        console.error('Erro ao obter dados da API:', error);
        return [];
      }
    };

    const pokemonArray = await fetchPokemonData();

   
    const filename = `pokemon_${uuidv4()}.json`;
    fs.writeFileSync(filename, JSON.stringify(pokemonArray));

   
    await Pokemon.insertMany(pokemonArray);

    res.status(200).json({ message: 'Pokémon salvos com sucesso' });
  } catch (error) {
    console.error('Erro ao salvar os Pokémon:', error);
    res.status(500).json({ error: 'Erro ao salvar os Pokémon' });
  }
});


mongoose.connect('mongodb://localhost/pokemon_db', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexão com o MongoDB estabelecida');
    
    app.listen(3000, () => {
      console.log('Servidor iniciado na porta 3000');
    });
  })
  .catch((error) => {
    console.error('Erro ao conectar com o MongoDB:', error);
  });
