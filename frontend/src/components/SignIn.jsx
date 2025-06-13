import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";

function Signin() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleSignIn = async () => {
        if (email == '' || password == '' || name == '') {
            alert("please enter all the details required")
        }
        await axios.post('http://localhost:3000/signin', {
            name: name,
            email: email,
            password: password
        }).then(function (response) {
            const userId = response.data.userId;
            localStorage.setItem("userId", userId);
            const checking = localStorage.getItem("userId");
            const username = response.data.username;
            localStorage.setItem("username", username);
            console.log(checking);
            navigate('/build')
        }).catch(function (error) {
            console.log(error);
        })
    }
    return (<>
        <label>Enter your email</label>
        <input type="text" name="" placeholder="enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            id="" />
        <br />
        <label>Enter your password</label>
        <input type="text" name=""
            placeholder="enter your password"
            value={password}
            onChange={(e) => { setPassword(e.target.value) }}
            id="" />
        <br>
        </br>
        <label>Enter your username</label>
        <input type="text" name=""
            placeholder="enter your username"
            onChange={(e) => setName(e.target.value)}
            id="" />
        <button onClick={handleSignIn}>SignIn</button>
        <br></br>
        Already have an account <Link to="/login"> Login</Link>
    </>)
}
export default Signin;