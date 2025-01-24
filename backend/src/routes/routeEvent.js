import {Router} from 'express';
import {crearEvento, listarEventos, eliminarEvento} from '../controllers/controllerEvent.js';
import {verificar} from '../middleware/tokenValidator.js';
const rutas = Router();

rutas.post('/api/eventos/crear', verificar, crearEvento); //verodificar token y crear evento(se protege la ruta)
rutas.get('/api/eventos/listar', verificar, listarEventos); //verificar token y listar eventos(se protege la ruta)
rutas.delete ('/api/eventos/eliminar/:id', verificar, eliminarEvento); //verificar token y eliminar evento(se protege la ruta)

export default rutas;