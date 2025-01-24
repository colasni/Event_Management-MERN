import {Router} from 'express';
import {crearEvento} from '../controllers/controllerEvent.js';
import {verificar} from '../middleware/tokenValidator.js';
const rutas = Router();

rutas.post('/api/eventos/crear', verificar, crearEvento); //verodificar token y crear evento(se protege la ruta)

export default rutas;