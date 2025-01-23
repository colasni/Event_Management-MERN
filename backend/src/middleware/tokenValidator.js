import {Router} from 'express';
import Jwt from 'jsonwebtoken';
import { JWT_SECRET} from '../config/envConfig.js';

export const verificar = Router();

verificar.use((req, res, next) => {
    let token = req.headers['x-access-token']|| req.headers['authorization'];
    if(!token){
        return res.status(401).json({status: false, errors: 'no autorizado'});
    }
    if(token.startsWith('Bearer')){
        token = token.slice(7, token.length);
        Jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if(err){
                return res.status(401).json({status: false, errors: 'token no válido'});
            }else{
                req.decoded = decoded;
                next();
            }
        })
    }    
})