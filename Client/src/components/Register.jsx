import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { PacmanLoader } from 'react-spinners';
import Error from './Error';
import Success from './Success';

function Register() {
    const [formData, setFormData] = useState({name: '', email: '', password: '', repeatPassword: ''})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    async function handleSubmit(e){
        e.preventDefault();
        if(formData.password === formData.repeatPassword){
            try {
                setLoading(true)
                const result = (await axios.post('/api/v1/users/register', formData)).data
                setLoading(false)
                setSuccess(true)

                window.location.href='/login'

                // console.log(result);
            } catch (err) {
                setLoading(false);
                console.log(err);
                if (err.response && err.response.data && err.response.data.message) {
                    setError(err.response.data.message);
                } else {
                    setError("An unexpected error occurred");
                }
                console.log(err);
            }
        }
        else{
            setError("Passwords do not match");
        }
    }


    function handleChange(e){
        const {name, value} = e.target
        setFormData({...formData, [name]: value})
    }
    
    return (
        <>
        {loading && <div className='w-full flex mt-[1vw] justify-center'>
          <PacmanLoader  color="#4CAF50" />
        </div>}
        {error && <Error message={error}/>}
        {success && <Success message={"Registration success"}/>}
        <div className='mt-8 md:mt-[2vw] border shadow-xl w-[80%] md:w-[30%] mx-auto px-3 py-5'>
            <form class="max-w-sm mx-auto" onSubmit={(e) => handleSubmit(e)}>
                <div class="mb-5">
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                    <input onChange={(e) => handleChange(e)} type="text" id="name" name='name' class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="XYZ" required />
                </div>
                <div class="mb-5">
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input onChange={(e) => handleChange(e)} type="email" id="email" name='email' class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required />
                </div>
                <div class="mb-5">
                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                    <input onChange={(e) => handleChange(e)} type="password" name='password' id="password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                </div>
                <div class="mb-5">
                    <label for="repeatPassword" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repeat password</label>
                    <input onChange={(e) => handleChange(e)} type="password" name='repeatPassword' id="repeatPassword" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                </div>

                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register new account</button>
                <div className='mt-2 flex flex-row'>
                <p className='mr-2 text-sm text-gray-500'>Already have an account? </p>
                <Link
                to='/login'
                className='text-sm text-blue-600 underline font-semibold'
                >
                Login
                </Link>
                    </div>
            </form>

        </div>
        </>
    )
}

export default Register
