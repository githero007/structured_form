import React, { useState } from 'react'
import axios from 'axios'
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = () => {
        console.log(email, password);
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
            console.log(checking);
        })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (
        <>
            <label>Enter your email <input type="email" value={email} onChange={e => setEmail(e.target.value)} name="" id="" /></label>
            <br></br>
            <label>Enter your password <input type="text" value={password} onChange={e => setPassword(e.target.value)} name="" id="" /></label>
            <br></br>
            <button onClick={handleLogin}>Login</button>
        </>)
}
export default Login;