import Jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import mongoose from 'mongoose';
import {JWT_SECRET, JWT_EXPIRES} from '../config/envConfig.js';

const esquema = new mongoose.Schema({
    nombre:String, correo:String, password:String
},{versionKey:false});

const UsuarioModel = new mongoose.model('usuarios', esquema);

export const register = async (req, res) => {
    try{
        const {nombre, correo, password} = req.body;
        const validacion = validar(nombre, correo, password);
        if(validacion == ''){
            let pass = await bcryptjs.hash(password, 8);
            const newUser = new UsuarioModel({
                nombre: nombre, correo: correo, password: pass
            });
            await newUser.save();
            return res.status(200).json({status: true, message: 'Usuario registrado con éxito'});
        }else{
            return res.status(400).json({status: false, message: validacion});
        }
    }catch(error){
        return res.status(500).json({status: false, message: [error.message]});
    }
}

const validar = (nombre, correo, password) => {
    var errors = [];
    if(nombre === undefined || nombre.trim() === ''){
        errors.push('El nombre es requerido');
    }
    if(correo === undefined || correo.trim() === ''){
        errors.push('El correo es requerido');
    }
    if(password === undefined || password.trim() === '' || password.length < 4){
        errors.push('La contraseña No debe de estar vacia y debe de tener al menos 4 caracteres');
    }
    return errors;
}