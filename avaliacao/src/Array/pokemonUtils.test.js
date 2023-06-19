const axios = require('axios');
const { fetchPokemonData } = require('./pokemonUtils');

jest.mock('axios');

describe('fetchPokemonData', () => {
  it('deve retornar um array de objetos contendo os dados dos Pokémon', async () => {
    const mockResponse = {
      data: [
        {
          name: 'Charizard',
          type: 'Fire/Flying',
          status: 'Healthy',
          dex: [
            { version: 'FIRE RED', number: 6 },
            { version: 'LEAF GREEN', number: 6 },
          ],
          height: 1.7,
          weight: 90.5,
          moves: ['Flamethrower', 'Fly', 'Dragon Claw', 'Fire Blast', 'Air Slash'],
        },
        
      ],
    };

    axios.get.mockResolvedValue(mockResponse);

    const expectedPokemonArray = [
      {
        name: 'Charizard',
        type: 'Fire/Flying',
        status: 'Healthy',
        dexNumber: 6,
        height: 1.7,
        weight: 90.5,
        moves: ['Flamethrower', 'Fly', 'Dragon Claw', 'Fire Blast'],
      },
      
    ];

    const pokemonArray = await fetchPokemonData();

    expect(pokemonArray).toEqual(expectedPokemonArray);
  });

  it('deve retornar um array vazio em caso de erro na requisição', async () => {
    axios.get.mockRejectedValue(new Error('Erro de requisição'));

    const pokemonArray = await fetchPokemonData();

    expect(pokemonArray).toEqual([]);
  });
});


