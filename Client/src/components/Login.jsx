import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'

import { PacmanLoader } from 'react-spinners';
import Error from './Error';
import Success from './Success';


function Login() {

  const [formData, setFormData] = useState({email: '', password: ''})
  const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

  async function handleSubmit(e){
    e.preventDefault();

    try {
      console.log(formData);
      setLoading(true)
      const response = (await axios.post('/api/v1/users/login', formData)).data.data
      setLoading(false)
      setSuccess(true)
      console.log("Current User: ",response);
      localStorage.setItem("currentUser", JSON.stringify(response))
      window.location.href='/'

    } catch (error) {
      console.error('Login failed:', error);
      setLoading(false)
      setError(error.response.data.message);
    }
  }
  function handleChange(e){
    const name = e.target.name
    const value = e.target.value
    setFormData({...formData, [name]:value})
  }

  return (
    <div>
      {loading && <div className='w-full flex mt-[1vw] justify-center'>
          <PacmanLoader  color="#4CAF50" />
        </div>}
        {error && <Error message={error}/>}
        {success && <Success message={"Login success"}/>}
      <div className='mt-8 md:mt-[5vw] border shadow-xl w-[80%] md:w-[30%] mx-auto px-3 py-5'>
            <form class="max-w-sm mx-auto" onSubmit={(e) => handleSubmit(e)} >
                <div class="mb-5">
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input onChange={(e) => handleChange(e)} name='email' type="email" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required />
                </div>
                <div class="mb-5">
                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                    <input onChange={(e) => handleChange(e)} name='password' type="password" id="password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                </div>
               
                <button  type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
                <div className='mt-2 flex flex-row'>
                <p className='mr-2 text-gray-500 text-sm'>Don't have an account? </p>
                <Link
                to='/register'
                className='text-sm text-blue-600 underline font-semibold'
                >
                Register
                </Link>
                    </div>
            </form>

        </div>
    </div>
  )
}

export default Login
