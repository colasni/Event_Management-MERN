import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ModalAddEvent = ({ show, handleClose }) => {
    const [formData, setFormData] = useState({
        nombre: "",
        descripcion: "",
        ubicacion: "",
        hora: "",
        fecha: new Date(),
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDateChange = (date) => {
        setFormData({ ...formData, fecha: date });
    };

    // Función para enviar los datos del formulario al servidor
    // se hizo con fetch y no con axios ya que queria probar con fetch además de que no tengo que importar axios
    // ahora puede que sea mala practica la verdad no se pero para este proyecto lo hice así y aprender de futuros errores o problemas
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token'); // Obtener el token

        const apiUrl = "http://localhost:5000/api/eventos/crear"; // Reemplaza con tu URL de API
        const formattedData = {
            ...formData,
            fecha: formData.fecha.toLocaleDateString(), // Convertir la fecha a string según el formato local (dd/MM/yyyy)
        };

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // Enviar el token en los headers
                    //'Cache-Control': 'no-cache', // Deshabilitar la caché
                },
                body: JSON.stringify(formattedData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Evento guardado con éxito:", data);
                handleClose();
            } else {
                console.error("Error al guardar el evento:", response.statusText);
            }
        } catch (error) {
            console.error("Error de red:", error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Agregar Evento</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            name="nombre"
                            placeholder="Nombre del evento"
                            value={formData.nombre}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="descripcion"
                            placeholder="Descripción del evento"
                            value={formData.descripcion}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Ubicación</Form.Label>
                        <Form.Control
                            type="text"
                            name="ubicacion"
                            placeholder="Ubicación del evento"
                            value={formData.ubicacion}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Hora</Form.Label>
                        <Form.Control
                            type="time"
                            name="hora"
                            value={formData.hora}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Fecha</Form.Label>
                        <DatePicker
                            selected={formData.fecha}
                            onChange={handleDateChange}
                            dateFormat="dd/MM/yyyy"
                            className="form-control"
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" type="submit">
                        Guardar
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default ModalAddEvent;
