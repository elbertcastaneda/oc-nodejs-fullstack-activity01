const http = require('http');
const app = require('./app');


const server = http.createServer(app);

server.listen(3000, '0.0.0.0', () => {
  console.info('Server is listening: http://localhost:3000/');
});
