import React, { useState } from 'react'
import Input from './Input';
import { useAuth } from '../context/Auth-Context';
const SignupForm = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        first_name: "",
        last_name: "",
    });
    const { signup } = useAuth();
    function handleSubmit(event) {
        event.preventDefault();
        signup(formData);
    }
    function handleChange(event) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };
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
            <Input
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                label="First Name"
            />
            <Input
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                label="Last Name"
            />
            <button type="submit">Create Account</button>
        </form>
    );
};

export default SignupForm;