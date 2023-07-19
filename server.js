// server.js
const express = require('express');
const cron = require('node-cron');
const childProcess = require('child_process');
const axios = require('axios');

const app = express();
const PORT = 3002; // Porta da sua aplicação principal (Next.js)

// Rota para reproduzir o vídeo
app.get('/executar-video', (req, res) => {
  // Adicione aqui a lógica real para reproduzir o vídeo
  // Por exemplo, você pode buscar o vídeo em um servidor ou armazenamento em nuvem e reproduzi-lo.
  console.log('Vídeo executado!');
  res.status(200).json({ message: 'Vídeo executado com sucesso.' });
});

// Função para agendar a execução do vídeo
const agendarExecucaoDoVideo = () => {
  // Agendando a execução da mensagem 'teste' para ocorrer todos os dias às 12:00 (horário do servidor)
  cron.schedule('* * * * *', async () => {
    try {
      // Executar o worker externo usando um processo filho com a porta 4000
      childProcess.exec('node worker.js', { env: { PORT: 4000 } }, (error, stdout, stderr) => {
        if (error) {
          console.error('Erro ao executar o worker:', error);
        } else {
          console.log('Worker executado com sucesso!');
          console.log(stdout);
        }
      });
      
      // Enviar uma requisição HTTP para a URL da sua aplicação Next.js para exibir a mensagem
      await axios.get('http://localhost:3000/live/liveTest');
      console.log('Mensagem exibida na página!');
    } catch (error) {
      console.error('Erro ao agendar a execução do vídeo:', error.message);
    }
  });
};

// Inicie o servidor e agende a execução do vídeo
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  agendarExecucaoDoVideo();
});
