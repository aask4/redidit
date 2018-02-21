const app = require('./server.js');
const port = 3000;

app.listen(port, function () {
  console.log('Server going live on port: ' + port);
});