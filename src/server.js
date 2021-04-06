const express = require('express');
const server = express();
const routes = require('./routes');
const path = require('path');

//usando template engine
server.set('view engine', 'ejs');

// Registrar a localização da view
server.set('views', path.join(__dirname + '/views'))

//habilitar o "req.body" 
server.use(express.urlencoded({ extended: true}))

//habilitar arquivos statics
server.use(express.static('public'));

server.use(routes);

server.listen(3000, () =>{
    console.log('Server running on port 3000');
});