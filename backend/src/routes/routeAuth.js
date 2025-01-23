import {Router} from 'express';
import {register} from '../controllers/controllerAuth.js';

const rutas = Router();

rutas.post('/api/usuarios/registrar', register);

export default rutas;