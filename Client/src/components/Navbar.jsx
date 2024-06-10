import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
function Navbar() {

    const user = JSON.parse(localStorage.getItem("currentUser"))
    const [isClicked, setIsClicked] = useState(false)
    function handleClick() {
        setIsClicked(!isClicked)
    }
    function logout(){
        localStorage.removeItem("currentUser")
        window.location.href = '/login'
    }
    return (
        <nav className="bg-gray-800 w-full">
            <div className="mx-auto max-w-7xl px-6 md:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <h3 className='text-white font-bold md:text-xl'>Room Booking is easy!</h3>
                    </div>
                    <div className="relative ml-3">
                        {user ?<> <div>
                            <button type="button" className="relative  rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white flex focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true"
                                onClick={handleClick}>
                                <span className="absolute -inset-1.5"></span>
                                <span className="sr-only">Open user menu</span>
                                <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                            </button>
                        </div>
                        <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5  focus:outline-none" style={{ display: isClicked ? 'block' : 'none' }} role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
                            <Link to='/profile' className="block px-4 py-2 text-sm text-gray-700 " role="menuitem" tabIndex="-1" id="user-menu-item-0">Your Profile</Link>
                            <Link to='/' className="block px-4 py-2 text-sm text-gray-700 " role="menuitem" tabIndex="-1" id="user-menu-item-0">Home</Link>
                            <Link onClick={logout} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-2">Sign out</Link>
                        </div> </> : <><Link className='text-white font-semibold' to='/register'>Register</Link> <Link className='text-white font-semibold ml-2' to='/login'> Login</Link> </>}
                        
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
