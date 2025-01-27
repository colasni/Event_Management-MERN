import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Card, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ModalAddEvent from '../components/ModalAddEvent';

const DataTable = () => {
    const [data, setData] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const navigate = useNavigate();

    // Modal state
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Fetch data from the API
    useEffect(() => {
        const fetchEvents = async () => {
            const token = localStorage.getItem('token'); // Obtener el token
        
            try {
                const response = await axios.get('http://localhost:5000/api/eventos/listar', {
                headers: {
                    Authorization: `Bearer ${token}`, // Enviar el token en los headers
                    'Cache-Control': 'no-cache', // Deshabilitar la caché
                },
                });
                console.log('Response JSON:', response.data.eventos); // Aquí puedes inspeccionar el JSON
                setData(response.data.eventos);
            } catch (err) {
                console.error('Error al cargar eventos:', err);
            }
        };
    
        fetchEvents();
    }, []);

    
    // Handle DELETE request
    const handleDelete = (id) => {
        axios.delete(`https://api.example.com/data/${id}`)
        .then(() => setData(data.filter(item => item.id !== id)))
        .catch(error => console.error('Error deleting data:', error));
    };

    // Handle PUT request (example: updating description)
    const handleEdit = (id, updatedDescription) => {
        axios.put(`https://api.example.com/data/${id}`, { description: updatedDescription })
        .then(response => {
            setData(data.map(item => item.id === id ? response.data : item));
        })
        .catch(error => console.error('Error updating data:', error));
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // Eliminar el token de localStorage
        navigate('/');
    };
    

    return (
        <>
            <Card className="p-3 m-3 shadow" style={{ backgroundColor: '#1c1c1c', color: 'white', borderRadius: '10px' }}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Gestión de Eventos</h5>
                <div>
                    <Button
                        variant="success"
                        size="sm"
                        className="me-2"
                        onClick={handleShow}
                    >
                        +
                    </Button>
                    <Button
                        variant="danger"
                        size="sm"
                        onClick={handleLogout}
                    >
                        Cerrar sesión
                    </Button>
                </div>
            </div>
            <Row className="mb-3">
                <Col md={2} className="d-flex flex-column">
                <Form.Group controlId="dateFilter" className="mb-3">
                    <Form.Label className="mb-1">Fecha</Form.Label>
                    <div>
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        className="form-control"
                        dateFormat="yyyy/MM/dd"
                    />
                    </div>
                </Form.Group>
                </Col>
                <Col md={4} className="d-flex flex-column">
                <Form.Group controlId="locationFilter" className="mb-3">
                    <Form.Label className="mb-1">Lugar</Form.Label>
                    <Form.Select>
                    <option>Desplegar varias opciones</option>
                    <option value="Cali">Cali</option>
                    <option value="Bogotá">Bogotá</option>
                    <option value="Medellín">Medellín</option>
                    </Form.Select>
                </Form.Group>
                </Col>
            </Row>
            <Table striped bordered hover variant="dark">
                <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th>Ubicación</th>
                    <th>Descripción</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item) => (
                    <tr key={item._id}>
                    <td>{item.nombre}</td>
                    <td>{item.fecha}</td>
                    <td>{item.hora}</td>
                    <td>{item.ubicacion}</td>
                    <td>{item.descripcion}</td>
                    <td>
                        <Button variant="danger" size="sm" onClick={() => handleDelete(item.id)}>–</Button>{' '}
                        <Button variant="secondary" size="sm" onClick={() => handleEdit(item.id, 'Updated Description')}>
                        ✏️
                        </Button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            </Card>
            <ModalAddEvent show={show} handleClose={handleClose} />
        </>
    );
};

export default DataTable;
