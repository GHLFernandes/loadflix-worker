// server.js
const express = require('express');
const cron = require('node-cron');
const childProcess = require('child_process');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3002; // Adicione a opção process.env.PORT para obter a porta dinamicamente do Heroku


app.get('/', (req, res) => {
  // Adicione aqui a lógica real para reproduzir o vídeo
  // Por exemplo, você pode buscar o vídeo em um servidor ou armazenamento em nuvem e reproduzi-lo.
  console.log('Funcionou!');
  res.status(200).json({ message: 'Olá.' });
});
// Rota para reproduzir o vídeo
app.get('/executar-video', (req, res) => {
  // Adicione aqui a lógica real para reproduzir o vídeo
  // Por exemplo, você pode buscar o vídeo em um servidor ou armazenamento em nuvem e reproduzi-lo.
  console.log('Vídeo executado!');
  res.status(200).json({ message: 'Vídeo executado com sucesso.' });
});


// Função para executar o worker
const executarWorker = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/videosPlaylist', {
      headers: {
        Cookie: 'next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..JDm2JkCoJ4gWf9p1._Jj9TeS2GZv-nhzTPrfAboibAeXZfNLe0zhWACEsZD9LBFKgPUX3BA3yGVxjCJVYAnbjlgVwDc9VzbGI9tYyqV6nJb_AQMjFkrbEguYPuV-9TlGEnaeFV5VFYIH_OIh3QxBevO-U1i8QkpOLpxyZSt9ZloIT7w3rmURcGK-tzE0kpj1mS3WCx4Z_a9KniadcwkRIVzOeaAJpSYl-yl3vn2gxzxrJtQnU2A4a_sS7D_ARwHlQdOncBv6Ryygd20nWB3tA0I9YTqgwBua4uh8RJ6de8Y_Itp8OxEvxqHFq8NvQkb3foSazxfVKq4FT8xHkyV6PvK8kzwpWTxWaW1akqyPlYJtHPK2t3QBwBP2OWmoUolZXdeBBPm3t86Q.55w5NK0vn4UfFD98GE6iRA; Path=/; Expires=Sat, 19 Aug 2023 00:16:37 GMT; HttpOnly; SameSite=Lax'
      }
    });

    let playlist = [];

    response.data.forEach((item) => {
      if (!playlist.includes(item.videoId)) {
        playlist.push(item.videoId);
      }
    });

    // Enviar uma requisição HTTP para a URL da sua aplicação Next.js para exibir a mensagem
    await axios.get('http://localhost:3000/api/job', {
      params: { mensagem: playlist[0] }
    });
    console.log('Mensagem enviada com sucesso!');
  } catch (error) {
    console.error('Erro ao enviar a mensagem:', error.message);
  }
};

// Rota para iniciar o worker manualmente
app.get('/start-worker', (req, res) => {
  executarWorker();
  res.status(200).json({ message: 'Worker iniciado manualmente.' });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  
  // Agendar a execução do vídeo usando cron
  cron.schedule('*/20 * * * *', () => {
    executarWorker();
  });
});
