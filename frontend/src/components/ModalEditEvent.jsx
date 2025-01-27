import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const ModalEditEvent = ({ show, handleClose, id }) => {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        const apiUrl = `http://localhost:5000/api/eventos/actualizar/${id}`;

        const formattedData = {
            ...formData,
            fecha: formData.fecha.toLocaleDateString(), // Convertir fecha a string (dd/MM/yyyy)
        };

        try {
            const response = await axios.put(apiUrl, formattedData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                console.log("Evento modificado con éxito:", response.data);
                handleClose(); // Cerrar modal después de éxito
            } else {
                console.error("Error al modificar el evento:", response.statusText);
            }
        } catch (error) {
            console.error("Error de red:", error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Editar Evento</Modal.Title>
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
                        Guardar Cambios
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default ModalEditEvent;
