import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"
import Useraccount from "./Useraccount";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Login() {

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
            const login = await axios.post("http://localhost:8000/login", loginInputs)
            //console.log(login.data)
            if(login.data){
                //navigate to user profile
                //console.log('Successfully Login')
                const userData = localStorage.setItem('user',JSON.stringify(login.data))
                navigate('/user')
            } 
        } catch (error) {
            console.log('Error: ', error)
        }

    }


    return(
        <>
            <div className ="flex items-center justify-center w-full h-[30rem] bg-gray-700 p-3">
                <form onSubmit={handleOnsubmit} className="flex flex-col items-center justify-center w-[20rem] h-[20rem] bg-gray-900 rounded text-white p-2 gap-3">SIGN IN
                    <div className="flex flex-col">
                        <label htmlFor="" className="text-gray-500">Email</label>
                        <input type="text" name="email" required onChange={handleOnchange}  className="bg-gray-500 rounded w-[15rem] h-[1.5rem]"/>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="" className="text-gray-500">Password</label>
                        <input type="password" name="password" required onChange={handleOnchange} className="bg-gray-500 rounded w-[15rem] h-[1.5rem]" />
                    </div>
                    <div className="flex items-center">
                        <h5>Not a member?<span className="text-teal-700 underline">Register here</span></h5>
                    </div>
                    <div>
                        <button type="submit" className="bg-emerald-500 w-[7rem] h-[2rem] rounded">Login</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Login;