// worker.js
const cron = require('node-cron');
const axios = require('axios');

cron.schedule('*/20 * * * * *', async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/videosPlaylist', {
      headers: {
        Cookie: 'next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..JDm2JkCoJ4gWf9p1._Jj9TeS2GZv-nhzTPrfAboibAeXZfNLe0zhWACEsZD9LBFKgPUX3BA3yGVxjCJVYAnbjlgVwDc9VzbGI9tYyqV6nJb_AQMjFkrbEguYPuV-9TlGEnaeFV5VFYIH_OIh3QxBevO-U1i8QkpOLpxyZSt9ZloIT7w3rmURcGK-tzE0kpj1mS3WCx4Z_a9KniadcwkRIVzOeaAJpSYl-yl3vn2gxzxrJtQnU2A4a_sS7D_ARwHlQdOncBv6Ryygd20nWB3tA0I9YTqgwBua4uh8RJ6de8Y_Itp8OxEvxqHFq8NvQkb3foSazxfVKq4FT8xHkyV6PvK8kzwpWTxWaW1akqyPlYJtHPK2t3QBwBP2OWmoUolZXdeBBPm3t86Q.55w5NK0vn4UfFD98GE6iRA; Path=/; Expires=Sat, 19 Aug 2023 00:16:37 GMT; HttpOnly; SameSite=Lax'
      }
    });

    // if(response){
    //   console.log('RESULT', response.data);
    // }

    let playlist = [];
    //let videosPlaylist = [];

    response.data.forEach((item) => {
      if(playlist.length > 0){
        if(playlist.indexOf(item.playlistId) === -1){
          playlist.push(item.videoId);
        }
      }else{
        playlist.push(item.videoId);
      }

    
    })

    //console.log(playlist);

    // Enviar uma requisição HTTP para a URL da sua aplicação Next.js para exibir a mensagem
    await axios.get('http://localhost:3000/api/job', {
      params: { mensagem: playlist[0] }
    });
    console.log('Mensagem enviada com sucesso!');
  } catch (error) {
    console.error('Erro ao enviar a mensagem:', error.message);
  }
});
