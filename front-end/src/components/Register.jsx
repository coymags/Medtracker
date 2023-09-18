import { useState } from "react";
import axios from "axios";


function Register() {

    const[registerInputs, setRegisterInputs] = useState({ email:"", pharmacy_name:"", address:"", password:"" })

    function handleOnchange(e) {
        const {name, value} = e.target
        setRegisterInputs((prev) =>{
            return {...prev,[name] : value}
        })
        //console.log(registerInputs)
    }

    
async function handleOnsubmit(e){
    e.preventDefault()
    try {
        const register = await axios.post("http://localhost:8000/users", registerInputs)
        console.log(register.data)
        if(register.data){
            //navigate to user profile
            console.log('Register Successfully')
        } else{
            console.log('Register Failed')
        }
        
    } catch (error) {
        console.log('Error: ', error)
    }

}

    return(
        <>
            <div className="flex items-center justify-center w-full h-[35rem] bg-gray-700 p-2">
                <form onSubmit={handleOnsubmit} className="flex flex-col items-center justify-center w-[20rem] h-[29rem] bg-gray-900 rounded text-white p-2 gap-3">
                    <div>
                        <h1 className="text-2xl">REGISTER</h1>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="" className="text-gray-500">Email</label>
                        <input type="text" name="email" onChange={handleOnchange} className="bg-gray-500 rounded w-[15rem] h-[1.5rem]"/>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="" className="text-gray-500">Pharmacy name</label>
                        <input type="text" name="pharmacy_name" onChange={handleOnchange} className="bg-gray-500 rounded w-[15rem] h-[1.5rem]"/>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="" className="text-gray-500">Pharmacy address</label>
                        <input type="text" name="address" onChange={handleOnchange} className="bg-gray-500 rounded w-[15rem] h-[1.5rem]"/>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="" className="text-gray-500">Password</label>
                        <input type="password" name="password" onChange={handleOnchange} className="bg-gray-500 rounded w-[15rem] h-[1.5rem]"/>
                    </div>
                    <div className="flex items-center">
                        <h5 className="text-sm">Already a member?<span className="text-teal-700 underline">Login here</span></h5>
                    </div>
                    <div>
                        <button type="submit" className="bg-emerald-500 w-[7rem] h-[2rem] rounded">Register</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Register;