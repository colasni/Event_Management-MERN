import {Router} from 'express';
import {register,login} from '../controllers/controllerAuth.js';

const rutas = Router();

rutas.post('/api/usuarios/registrar', register);
rutas.post('/api/usuarios/login', login);

export default rutas;