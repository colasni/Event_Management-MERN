import React from 'react'
import { Link } from 'react-router-dom'
import '../style.css';

function Login() {
    return (
        <div className='login template d-flex justify-content-center align-items-center w-100 vh-100 bg-primary'>
            <div className="form_container p-5 rounded bg-white">
                <form>
                    <h3 className='text-center'>Sign In</h3>
                    <div className="mb-2">
                        <label htmlFor="email">Email</label>
                        <input type="email" placeholder="Enter email" className ="form-control"/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder="Enter password" className ='form-control' />
                    </div>
                    <div className="mb-2">
                        <input type="checkbox" className='custom-control custom-checkbox' id="check"/>
                        <label htmlFor="check" className='custom-control-label'>
                            Remember me
                        </label>
                    </div>
                    <div className="d-grid">
                        <button className="btn btn-primary" type="submit">Sign In</button>
                    </div>
                    <p className="text-center mt-3">
                    Crear una cuenta <Link to="/signup">Sign Up</Link>    
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login
