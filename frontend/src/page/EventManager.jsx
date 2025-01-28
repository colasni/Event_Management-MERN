import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Card, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ModalAddEvent from '../components/ModalAddEvent';
import ModalEditEvent from '../components/ModalEditEvent';

const DataTable = () => {
    const [data, setData] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showAll, setShowAll] = useState(false); // Nuevo estado para mostrar todos los datos
    const [selectedEventId, setSelectedEventId] = useState(null); // Nuevo estado para el ID seleccionado

    // Modal state
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const handleCloseAdd = () => setShowAdd(false);
    const handleCloseEdit = () => setShowEdit(false);

    const navigate = useNavigate();

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

    const handleEditClick = (id) => {
        setSelectedEventId(id); // Establecer el ID seleccionado
        setShowEdit(true); // Mostrar el modal de edición
    };

    
    // Handle DELETE request
    const handleDelete = async (deleteId) => {
        const token = localStorage.getItem('token');

        try {
            await axios.delete(`http://localhost:5000/api/eventos/eliminar/${deleteId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setData(data.filter((item) => item._id !== deleteId));
        } catch (error) {
            console.error('Error al eliminar el evento:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // Eliminar el token de localStorage
        navigate('/');
    };

    const handleShowAll = () => {
        setShowAll(!showAll); // Cambiar el estado para mostrar todos los datos
    };
    
    // Filtrar los datos por fecha
    const filteredData = showAll
    ? data // Si "Mostrar todos" está activo, muestra todos los datos
    : data.filter((item) => {
        // Convertimos selectedDate a "yyyy-MM-dd" sin zona horaria
        const formattedSelectedDate = selectedDate.toISOString().split('T')[0];
        // Aseguramos que la fecha del evento también sea "yyyy-MM-dd"
        const eventDate = new Date(item.fecha).toISOString().split('T')[0];
        return eventDate === formattedSelectedDate;
    });
    
    

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
                        onClick={() => setShowAdd(true)}
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
                <Col md={2}  className="d-flex flex-column mt-4">
                        <Button  variant="primary" onClick={handleShowAll}>
                            Mostrar todos los datos
                        </Button>
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
                {filteredData.map((item) => (
                    <tr key={item._id}>
                    <td>{item.nombre}</td>
                    <td>{item.fecha}</td>
                    <td>{item.hora}</td>
                    <td>{item.ubicacion}</td>
                    <td>{item.descripcion}</td>
                    <td>
                        <Button variant="danger" size="sm" onClick={() => handleDelete(item._id)}>–</Button>{' '}
                        <Button variant="secondary" size="sm" onClick={() =>handleEditClick(item._id)}>
                        ✏️
                        </Button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            </Card>
            <ModalAddEvent show={showAdd} handleClose={handleCloseAdd} />
            <ModalEditEvent show={showEdit} handleClose={handleCloseEdit} id={selectedEventId} />
        </>
    );
};

export default DataTable;
