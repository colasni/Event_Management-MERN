import mongoose from 'mongoose';

//modelo de evento
const esquema = new mongoose.Schema({
    nombre: String,
    descripcion: String,
    ubicacion: String,
    hora: String,
    fecha: Date,
},{versionKey: false});

const EventoModel = new mongoose.model('eventos', esquema);


export const crearEvento = async(req, res)=>{
    try{
        const {nombre, descripcion, ubicacion, hora, fecha} = req.body; //destructura el objeto req.body
        const newEvento = new EventoModel({nombre, descripcion, ubicacion, hora, fecha}); //crea un objeto evento
        await newEvento.save(); //guarda el evento en la base de datos
        return res.status(200).json({status: true, message: 'Evento creado con éxito'}); //respuesta exitosa
    }catch(error){
        return res.status(500).json({status: false, message: [error.message]}); 
    }
};

export const listarEventos = async(req, res)=>{
    try{
        const eventos = await EventoModel.find(); //busca todos los eventos
        return res.status(200).json({status: true, eventos}); 
    }catch(error){
        return res.status(500).json({status: false, message: [error.message]}); 
    }
};

export const eliminarEvento = async(req, res)=>{
    try{
        await EventoModel.findByIdAndDelete(req.params.id); //busca y elimina un evento por su id
        res.status(200).json({status: true, massage: 'Evento eliminado con éxito'});
    }catch(error){
        res.status(500).json({status: false, message: [error.message]});
    }
};