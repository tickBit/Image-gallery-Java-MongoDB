import { useState } from "react";
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

import { useAuth } from "./../AuthContext.js";

function Login() {

    const navigate = useNavigate();
    
    const { login } = useAuth();



    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            await login(username, password);
        } catch (err) {
            console.error(err);
            toast.error("Login failed. Please check your credentials.\nPerhaps the user does not exist in the database.");
        }

        navigate('/');
    }

  return (
    <div className="page">
        <h2>Log in</h2>
        <div className="login-register">

        <div className="card bg-glass">
          <div className="card-body px-4 py-5 px-md-5">

        <form onSubmit={(e) => handleLogin(e)}>

    <div data-mdb-input-init className="form-outline mb-4">
        <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required className="form-control" />
        <label className="form-label" htmlFor="username">Username</label>
    </div>

    <div data-mdb-input-init className="form-outline mb-4">
        <input type="password" id='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} required className="form-control" />
        <label className="form-label" htmlFor="password">Password</label>
    </div>

    <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block mb-4">Sign in</button>

    </form>
    </div>
    </div>
    </div>
    </div>
    )
}

export default Login