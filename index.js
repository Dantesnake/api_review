const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
require('dotenv').config()

const app = express();

// cors
const cors = require('cors');
var corsOptions = {
    origin: '*', // Reemplazar con dominio
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

// capturar body
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

// Conexión a Base de datos
const uri = process.env.URLDB;


mongoose.connect(uri,
    {useNewUrlParser: true, useUnifiedTopology: true}
)
    .then(() => console.log('Base de datos conectada'))
    .catch(e => console.log('error db:', e))

// import routes
const authRoutes = require('./app/routes/auth');
const rutaProtegida = require('./app/routes/rutaPrueba.js');
const reviewsRoutes = require('./app/routes/reviews.js');
const verifyToken = require('./app/routes/validate-token');
// route middlewares
app.use('/api/user', authRoutes);

app.use('/api/prueba', verifyToken, rutaProtegida);
app.use('/api/reviews', verifyToken, reviewsRoutes);

// iniciar server
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
    console.log(`servidor andando en: ${PORT}`)
})
