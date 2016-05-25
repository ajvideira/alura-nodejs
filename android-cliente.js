var http = require('http');

var configuracoes = {
  host: 'localhost',
  port: 3000,
  path: '/produtos',
  headers: {
    'Accept': 'application/json'
  }
};

http.get(configuracoes, function(response){
  console.log(response.statusCode);

  response.on('data', function(body){
    console.log('Corpo: ' + body);
  });
});
