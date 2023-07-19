// worker.js
const cron = require('node-cron');
const axios = require('axios');

cron.schedule('*/20 * * * * *', async () => {
  try {
    // Enviar uma requisição HTTP para a URL da sua aplicação Next.js para exibir a mensagem
    await axios.get('http://localhost:3000/api/job', {
      params: { mensagem: 'Mensagem de teste enviada pelo worker!' }
    });
    console.log('Mensagem enviada com sucesso!');
  } catch (error) {
    console.error('Erro ao enviar a mensagem:', error.message);
  }
});
