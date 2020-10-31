const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();

//conecting to db

mongoose.connect('mongodb://localhost/crud-mongo-compras')
    .then(db => console.log('Db connected'))
    .catch(err => console.log(err));

//import routes
const indexRoutes = require('./routes/index')

//settings
app.set('port', process.env.PORT || 27017);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middlewares -- procesar datos antes de que lleguen a las rutas
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false })); //entender los datos que me esta enviando un formulario

//routes
app.use('/', indexRoutes);

//staring server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});