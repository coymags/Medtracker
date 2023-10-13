import { useState } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Login({ setJwt }) {

    const [loginInputs, setloginInputs] = useState({ email:"", password:"" })
    const navigate = useNavigate()

    function handleOnchange(e) {
        const {name, value} = e.target
        setloginInputs((prev) =>{
            return {...prev,[name] : value}
        })
        //console.log(loginInputs)
    }

    async function handleOnsubmit(e){
        e.preventDefault()
        try {
            const login = await axios.post("http://localhost:8000/api/v1/login", loginInputs)
            console.log(login.data)
            if(login.status === 200){
                const userData = localStorage.setItem('user',JSON.stringify(login.data))
                setJwt(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null)
                navigate('/dashboard')
            }
        } catch (error) {
            // console.log('Error: ', error)
            alert(error.message)
        }

    }

    return(
        <>
            <div className ="flex items-center justify-center w-full h-screen p-3 bg-gray-700">
                <form onSubmit={handleOnsubmit} className="flex flex-col items-center justify-center w-[20rem] h-[20rem] bg-gray-900 rounded text-white p-2 gap-3">SIGN IN
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="" className="text-gray-500">Email</label>
                        <input type="text" name="email" required onChange={handleOnchange}  className="bg-gray-500 rounded w-[15rem] h-[1.5rem]"/>
                    </div>
                    <div className="flex flex-col mb-2 space-y-2">
                        <label htmlFor="" className="text-gray-500">Password</label>
                        <input type="password" name="password" required onChange={handleOnchange} className="bg-gray-500 rounded w-[15rem] h-[1.5rem]" />
                    </div>
                    {/* <div className="flex items-center">
                        <h5>Not a member? <span className="text-teal-700 ">Register here</span></h5>
                    </div> */}
                    <div>
                        <button type="submit" className="bg-emerald-500 w-[7rem] h-[2rem] rounded">Login</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Login;