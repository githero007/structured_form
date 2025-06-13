import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleLogin = () => {
        console.log(email, password);
        if (email == '' || password == '') {
            alert("please enter all the details required");
            return;
        }
        axios.post('http://localhost:3000/login', {
            email: email,
            password: password
        }, {
            headers: {
                'Content-Type': 'application/json' // optional, Axios sets this automatically
            }
        }).then(function (response) {
            console.log(response);
            const userId = response.data.userId;
            localStorage.setItem("userId", userId);
            const checking = localStorage.getItem("userId");
            const username = response.data.username;
            localStorage.setItem("username", username);
            console.log(checking);
            navigate('/build')

        })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (
        <>
            <label>Enter your email <input type="text" value={email} onChange={e => setEmail(e.target.value)} name="" id="" /></label>
            <br></br>
            <label>Enter your password <input type="text" value={password} onChange={e => setPassword(e.target.value)} name="" id="" /></label>
            <br></br>
            <button onClick={handleLogin}>Login</button>
            <br></br>
            Dont have an account <Link to="/">SignIn</Link>
        </>)
}
export default Login; 