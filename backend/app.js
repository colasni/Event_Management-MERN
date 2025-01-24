//configuración de express, middlewares y rutas
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import rutasAuth from './src/routes/routeAuth.js';
import rutasEvent from './src/routes/routeEvent.js';

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'));
app.use(rutasAuth);
app.use(rutasEvent);

//si la ruta no se encuentra
app.use ((req, res) => {
    res.status(404).json({status: false, errors: 'Recurso no encontrado'});
})

export default app;