// Importamos los módulos y componentes necesarios
import React, { useState, useEffect } from 'react'; // Manejo de estado y efectos
import { Table, Button, Form, Card, Row, Col } from 'react-bootstrap'; // Componentes de react-bootstrap
import DatePicker from 'react-datepicker'; // Componente para selección de fecha
import 'react-datepicker/dist/react-datepicker.css'; // Estilos del selector de fecha
import axios from 'axios'; // Cliente HTTP para realizar solicitudes a la API
import { useNavigate } from 'react-router-dom'; // Navegación entre rutas
import ModalAddEvent from '../components/ModalAddEvent'; // Componente modal para agregar eventos
import ModalEditEvent from '../components/ModalEditEvent'; // Componente modal para editar eventos

// Componente principal
const DataTable = () => {
    // Estados para manejar datos y filtros
    const [data, setData] = useState([]); // Datos originales obtenidos de la API
    const [filteredData, setFilteredData] = useState([]); // Datos filtrados según los criterios
    const [selectedDate, setSelectedDate] = useState(new Date()); // Fecha seleccionada
    const [selectedLocation, setSelectedLocation] = useState(''); // Ubicación seleccionada
    const [selectedEventId, setSelectedEventId] = useState(null); // ID del evento seleccionado para editar

    // Estados para manejar la visibilidad de los modales
    const [showAdd, setShowAdd] = useState(false); // Modal para agregar eventos
    const [showEdit, setShowEdit] = useState(false); // Modal para editar eventos
    const handleCloseAdd = () => setShowAdd(false); // Cierra el modal de agregar
    const handleCloseEdit = () => setShowEdit(false); // Cierra el modal de editar

    const navigate = useNavigate(); // Navegador para redireccionar a otras rutas

    // Efecto para cargar datos de la API al montar el componente
    useEffect(() => {
        const fetchEvents = async () => {
            const token = localStorage.getItem('token'); // Obtener token del almacenamiento local
            try {
                // Solicitud GET a la API
                const response = await axios.get('http://localhost:5000/api/eventos/listar', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Agregar token en el encabezado
                        'Cache-Control': 'no-cache', // Evitar datos cacheados
                    },
                });
                setData(response.data.eventos); // Guardar datos originales
                setFilteredData(response.data.eventos); // Inicializar datos filtrados con todos los eventos
            } catch (err) {
                console.error('Error al cargar eventos:', err); // Manejo de errores
            }
        };
        fetchEvents(); // Llamar a la función al montar el componente
    }, []);

    // Maneja la acción de editar un evento
    const handleEditClick = (id) => {
        setSelectedEventId(id); // Guardar el ID del evento seleccionado
        setShowEdit(true); // Mostrar el modal de edición
    };

    // Maneja la eliminación de un evento
    const handleDelete = async (deleteId) => {
        const token = localStorage.getItem('token'); // Obtener token del almacenamiento local
        try {
            // Solicitud DELETE a la API
            await axios.delete(`http://localhost:5000/api/eventos/eliminar/${deleteId}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Agregar token en el encabezado
                },
            });
            // Filtrar datos para excluir el evento eliminado
            const updatedData = data.filter((item) => item._id !== deleteId);
            setData(updatedData); // Actualizar datos originales
            setFilteredData(updatedData); // Actualizar datos filtrados
        } catch (error) {
            console.error('Error al eliminar el evento:', error); // Manejo de errores
        }
    };

    // Maneja el cierre de sesión
    const handleLogout = () => {
        localStorage.removeItem('token'); // Eliminar token del almacenamiento local
        navigate('/'); // Redireccionar a la página de inicio
    };

    // Filtrar eventos por fecha
    const filterByDate = () => {
        const formattedSelectedDate = selectedDate.toISOString().split('T')[0]; // Formatear la fecha seleccionada
        const filtered = data.filter((item) => {
            const eventDate = new Date(item.fecha).toISOString().split('T')[0]; // Formatear la fecha del evento
            return eventDate === formattedSelectedDate; // Comparar fechas
        });
        setFilteredData(filtered); // Actualizar datos filtrados
    };

    // Filtrar eventos por ubicación
    const filterByLocation = () => {
        const filtered = data.filter((item) => {
            return selectedLocation && item.ubicacion === selectedLocation; // Comparar ubicaciones
        });
        setFilteredData(filtered); // Actualizar datos filtrados
    };

    // Filtrar eventos por fecha y ubicación
    const filterByDateAndLocation = () => {
        const formattedSelectedDate = selectedDate.toISOString().split('T')[0]; // Formatear la fecha seleccionada
        const filtered = data.filter((item) => {
            const eventDate = new Date(item.fecha).toISOString().split('T')[0]; // Formatear la fecha del evento
            return eventDate === formattedSelectedDate && item.ubicacion === selectedLocation; // Comparar fecha y ubicación
        });
        setFilteredData(filtered); // Actualizar datos filtrados
    };

    // Mostrar todos los eventos sin filtros
    const handleShowAll = () => {
        setFilteredData(data); // Restaurar todos los datos
    };

    // Renderizar el componente
    return (
        <>
            {/* Tarjeta principal */}
            <Card className="p-3 m-3 shadow" style={{ backgroundColor: '#1c1c1c', color: 'white', borderRadius: '10px' }}>
                {/* Encabezado con botones */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="mb-0">Gestión de Eventos</h5>
                    <div>
                        <Button variant="success" size="sm" className="me-2" onClick={() => setShowAdd(true)}>+</Button>
                        <Button variant="danger" size="sm" onClick={handleLogout}>Cerrar sesión</Button>
                    </div>
                </div>
                {/* Filtros */}
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
                            <Form.Label className="mb-1">Ubicación</Form.Label>
                            <Form.Select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
                                <option value="">Todas</option>
                                <option value="Cali">Cali</option>
                                <option value="Bogotá">Bogotá</option>
                                <option value="Medellín">Medellín</option>
                                <option value="Cartagena">Cartagena</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                {/* Botones de acción */}
                <Row>
                    <Col>
                        <Button variant="primary" className="me-2" onClick={filterByDate}>Filtrar por fecha</Button>
                        <Button variant="secondary" className="me-2" onClick={filterByLocation}>Filtrar por ubicación</Button>
                        <Button variant="warning" className="me-2" onClick={filterByDateAndLocation}>Filtrar por fecha y ubicación</Button>
                        <Button variant="info" onClick={handleShowAll}>Mostrar todos los eventos</Button>
                    </Col>
                </Row>
                {/* Tabla de eventos */}
                <Table striped bordered hover variant="dark" className="mt-3">
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
                                    <Button variant="secondary" size="sm" onClick={() => handleEditClick(item._id)}>✏️</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card>
            {/* Modales */}
            <ModalAddEvent 
            show={showAdd} 
            handleClose={handleCloseAdd} 
            setData={setData} 
            setFilteredData={setFilteredData}  />
            <ModalEditEvent show={showEdit} handleClose={handleCloseEdit} id={selectedEventId} />
        </>
    );
};

export default DataTable;
