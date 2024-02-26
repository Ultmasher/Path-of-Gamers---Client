//import React from 'react';
import { useForm } from 'react-hook-form';
//import { BrowserRouter } from 'react-router-dom';

const RegisterForm = () => {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            Email:
            <input type="email" {...register("email", { required: true })} />
          </label>
          <label>
            Username:
            <input type="text" {...register("username", { required: true })} />
          </label>
          <label>
            Password:
            <input type="password" {...register("password", { required: true })} />
          </label>
          <button type="button" >Register with Discord</button>
          <button type="submit">Register</button>
        </form>
      );
    }



export default RegisterForm;