import http from 'http';
import app from './app/app.js';

//create the server
const PORT = process.env.PORT || 9999;
const server = http.createServer(app);
server.listen(PORT, console.log(`Server is up and running ${PORT}`));