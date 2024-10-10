import React, { useState } from 'react'
import Input from './Input';
import { useAuth } from '../context/Auth-Context';


const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const { login } = useAuth();

    function handleSubmit(event) {
        event.preventDefault();
        login(formData);

    }
    function handleChange(event) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }
    return (
        <form onSubmit={handleSubmit}>
            <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@mail.com"
                label="Email"
            />
            <Input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="******"
                label="Password"
            />
            <button type="submit">Login</button>
        </form>
    )
}

export default LoginForm