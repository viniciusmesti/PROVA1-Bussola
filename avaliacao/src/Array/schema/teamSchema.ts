
app.use(express.json());


const TeamSchema = new mongoose.Schema({
  trainerName: String,
  team: [{
    name: String
  }]
});


const Team = mongoose.model('Team', TeamSchema);


app.post('/teams', async (req, res) => {
  try {
    const { trainerName, team } = req.body;

    
    const newTeam = await Team.create({ trainerName, team });

    res.status(201).json({ team: newTeam });
  } catch (error) {
    console.error('Erro ao criar o time de Pokémon:', error);
    res.status(500).json({ error: 'Erro ao criar o time de Pokémon' });
  }
});


app.get('/teams', async (req, res) => {
  try {
   
    const teams = await Team.find();

    res.status(200).json({ teams });
  } catch (error) {
    console.error('Erro ao listar os times de Pokémon:', error);
    res.status(500).json({ error: 'Erro ao listar os times de Pokémon' });
  }
});

app.get('/teams/:id', async (req, res) => {
  try {
    const teamId = req.params.id;

    
    const team = await Team.findById(teamId);

    if (!team) {
      return res.status(404).json({ error: 'Time de Pokémon não encontrado' });
    }

    res.status(200).json({ team });
  } catch (error) {
    console.error('Erro ao obter o time de Pokémon:', error);
    res.status(500).json({ error: 'Erro ao obter o time de Pokémon' });
  }
});


app.put('/teams/:id', async (req, res) => {
  try {
    const teamId = req.params.id;
    const { trainerName, team } = req.body;

    
    const updatedTeam = await Team.findByIdAndUpdate(teamId, { trainerName, team }, { new: true });

    if (!updatedTeam) {
      return res.status(404).json({ error: 'Time de Pokémon não encontrado' });
    }

    res.status(200).json({ team: updatedTeam });
  } catch (error) {
    console.error('Erro ao atualizar o time de Pokémon:', error);
    res.status(500).json({ error: 'Erro ao atualizar o time de Pokémon' });
  }
});

// Rota para excluir um time de Pokémon pelo ID
app.delete('/teams/:id', async (req, res) => {
  try {
    const teamId = req.params.id;

    
    const deletedTeam = await Team.findByIdAndRemove(teamId);

    if (!deletedTeam) {
      return res.status(404).json({ error: 'Time de Pokémon não encontrado' });
    }

    res.status(200).json({ message: 'Time de Pokémon excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir o time de Pokémon:', error);
    res.status(500).json({ error: 'Erro ao excluir o time de Pokémon' });
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
