import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../style.css';
import axios from 'axios';

function Login() {
    const [credentials, setCredentials] = useState({
        correo: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState(null);
    const [error, setError] = useState(null);
    
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita que el formulario recargue la página
        setLoading(true);
        setError(null);
    
        try {
            const response = await axios.post(
                'http://localhost:5000/api/usuarios/login',
                {
                correo: credentials.correo,
                password: credentials.password,
                },
                {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            );
            console.log('Response JSON:', response.data); // Aquí puedes inspeccionar el JSON
            const {token} = response.data.data;
            //setToken(response.data.token); // Ajusta según la estructura de la respuesta
            if (token) {
                localStorage.setItem('token', token); // Guardar el token en localStorage
                console.log('Token guardado:', token);
                navigate('/eventManager'); 
            }
            } catch (err) {
            setError(err.response?.data?.message );
            } finally {
            setLoading(false);
            }
    };
    
    return (
        <div className='login template d-flex justify-content-center align-items-center w-100 vh-100 custom-bg'>
            <div className="form_container p-5 rounded bg-white">
                <form onSubmit={handleSubmit}>
                    <h3 className='text-center'>Sign In</h3>
                    <div className="mb-2">
                        <label htmlFor="email">Email</label>
                        <input 
                        name="correo"
                        type="email" 
                        placeholder="Enter email" 
                        className ="form-control" 
                        onChange={handleChange}
                        value={credentials.correo}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="password">Password</label>
                        <input 
                        name="password"
                        type="password"
                        placeholder="Enter password" 
                        className ='form-control' 
                        onChange={handleChange} 
                        value = {credentials.password}
                        />
                    </div>
                    <div className="mb-2">
                        <input type="checkbox" className='custom-control custom-checkbox' id="check"/>
                        <label htmlFor="check" className='custom-control-label'>
                            Remember me
                        </label>
                    </div>
                    <div className="d-grid">
                        <button className="btn btn-primary" type="submit" disabled={loading} >{loading ? 'Autenticando...' : 'Sign In'}</button>
                    </div>
                    <p className="text-center mt-3">
                    Crear una cuenta <Link to="/signup">Sign Up</Link>    
                    </p>
                    {error && <p style={{ color: 'red' }}>Error: {error}</p>}
                </form>
            </div>
        </div>
    )
}

export default Login
