import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useStore from "../data/Store";

function Register() {

    const { mapEventLocation, RegisterFormInputField, setRegisterForm } = useStore()
    

    //const[registerInputs, setRegisterInputs] = useState({ email:"", pharmacy_name:"", password:"" })

    
    function handleOnchange(e) {
        const {name, value} = e.target
        setRegisterForm(name, value)
        //console.log(registerInputs)
        console.log(mapEventLocation)//console for _latlang mapEventLocation
    }

    
async function handleOnsubmit(e){
    e.preventDefault()
    try {
        RegisterFormInputField.location = mapEventLocation 
        const register = await axios.post("http://localhost:8000/users", RegisterFormInputField)
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


    const navigate = useNavigate()

    return(
        <>
            <div className="flex items-center justify-center w-full h-[35rem] bg-gray-700 p-2">
                <form onSubmit={handleOnsubmit} className="flex flex-col items-center justify-center w-[20rem] h-[30rem] bg-gray-900 rounded text-white p-2 gap-3">
                    <div>
                        <h1 className="text-2xl">REGISTER</h1>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="" className="text-gray-500">Email</label>
                        <input type="text" defaultValue={RegisterFormInputField.email} name="email" onChange={handleOnchange} className="bg-gray-500 rounded w-[15rem] h-[1.5rem]"/>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="" className="text-gray-500">Pharmacy name</label>
                        <input type="text" defaultValue={RegisterFormInputField.pharmacy_name} name="pharmacy_name" onChange={handleOnchange} className="bg-gray-500 rounded w-[15rem] h-[1.5rem]"/>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="" className="text-gray-500">Password</label>
                        <input type="password" defaultValue={RegisterFormInputField.password} name="password" onChange={handleOnchange} className="bg-gray-500 rounded w-[15rem] h-[1.5rem]"/>
                    </div>
                    <div className="flex flex-col">
                        <button type="submit" className="bg-emerald-500 w-[7rem] h-[2rem] rounded" onClick={() => navigate("/")}>Map</button>
                        <label htmlFor="" className="text-gray-500">Latitude</label>
                        <input type="text" readOnly name="latitude" value={mapEventLocation.lat} className="bg-gray-500 rounded w-[15rem] h-[1.5rem]"/>
                        <label htmlFor="" className="text-gray-500">Longhitude</label>
                        <input type="text" readOnly name="longhitude" value={mapEventLocation.lng}  className="bg-gray-500 rounded w-[15rem] h-[1.5rem]"/>
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