import React from 'react'
import { useState } from 'react'

function Adminlogin() {

    const [ loginInput, setLoginInput ] = useState({ email: "", password: "" })

    function handleOnChange(e){
        const { name, value } = e.target
        setLoginInput((prev) =>{
            console.log(prev)
            return {...prev,[name] : value}
        })
    }
  return (
    <>
            <div className ="flex items-center justify-center w-full h-[30rem] bg-gray-700     p-3">
                <form className="flex flex-col items-center justify-center w-[20rem] h-[20rem] bg-gray-900 rounded text-white p-2 gap-3">ADMIN
                    <div className="flex flex-col">
                        <label htmlFor="" className="text-gray-500">Email</label>
                        <input type="text" onChange={handleOnChange} name="email"  className="bg-gray-500 rounded w-[15rem] h-[1.5rem]"/>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="" className="text-gray-500">Password</label>
                        <input type="password" onChange={handleOnChange} name="password"  className="bg-gray-500 rounded w-[15rem] h-[1.5rem]" />
                    </div>
                    <div>
                        <button type="submit" className="bg-emerald-500 w-[7rem] h-[2rem] rounded">Login</button>
                    </div>
                </form>
            </div>
    </>
  )
}

export default Adminlogin