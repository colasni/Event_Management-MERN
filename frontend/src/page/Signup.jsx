import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        correo: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
        ...formData,
        [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/usuarios/signup',
                {
                    nombre: formData.name, // Claves esperadas en el backend
                    correo: formData.email,
                    password: formData.password,
                },
                {
                    headers: {
                    'Content-Type': 'application/json',
                    },
                }
            );
            alert('Usuario registrado exitosamente');
            console.log(response.data);
            } catch (error) {
            console.error('Error al registrar el usuario:', error);
            alert('Hubo un problema al registrar el usuario');
        }
    };

    return (
        <div className='signup template d-flex justify-content-center align-items-center w-100 vh-100 custom-bg'>
        <div className="form_container p-5 rounded bg-white">
            <form onSubmit={handleSubmit}>
            <h3 className='text-center'>Sign Up</h3>
            <div className="mb-2">
                <label htmlFor="name">Name</label>
                <input
                type="text"
                name="name"
                placeholder="Enter name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                />
            </div>
            <div className="mb-2">
                <label htmlFor="email">Email</label>
                <input
                type="email"
                name="email"
                placeholder="Enter email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                />
            </div>
            <div className="mb-2">
                <label htmlFor="password">Password</label>
                <input
                type="password"
                name="password"
                placeholder="Enter password"
                className='form-control'
                value={formData.password}
                onChange={handleChange}
                />
            </div>
            <div className="mb-2">
                <input type="checkbox" className='custom-control custom-checkbox' id="check" />
                <label htmlFor="check" className='custom-control-label'>
                Remember me
                </label>
            </div>
            <div className="d-grid">
                <button className="btn btn-primary" type="submit">Sign Up</button>
            </div>
            <p className="text-center mt-3">
                Ya registrado? <Link to="/">Sign In</Link>
            </p>
            </form>
        </div>
        </div>
    );
};

export default Signup;
