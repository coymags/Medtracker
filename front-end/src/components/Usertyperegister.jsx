import React from 'react'
import useStore from '../data/Store'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Usertyperegister() {

  const { userTypeFormInputField, setUserTypeFormInputField } = useStore()
  const navigate = useNavigate()

  function handleOnChange(e) {
    const { name, value } = e.target
    setUserTypeFormInputField(name, value)
    console.log(userTypeFormInputField)
  }

  async function handleOnSubmit(e) {
    e.preventDefault()
    
    try{
      userTypeFormInputField.user_type = "user"
      const userAcc = await axios.post('http://localhost:8000/api/v1/usertype', userTypeFormInputField)
      if (userAcc.data) {
        //navigate to login page
        console.log('Registration Complete: User Type')
      } else {
        console.log('Failed to Register')
      }
    } catch(error){
      console.log('Error: ', error)
    }
  }

  return (
    <>
      <div className="flex items-center justify-center w-full h-[35rem] bg-gray-700 p-2">
        <form onSubmit={handleOnSubmit} className="flex flex-col items-center justify-center w-[20rem] h-[30rem] bg-gray-900 rounded text-white p-2 gap-3">
            <div>
                <h1 className="text-2xl">User</h1>
            </div>
            <div className="flex flex-col">
                <label htmlFor="" className="text-gray-500">Fistname</label>
                <input type="text" onChange={handleOnChange} name="firstname" className="bg-gray-500 rounded w-[15rem] h-[1.5rem]"/>
            </div>
            <div className="flex flex-col">
                <label htmlFor="" className="text-gray-500">Lastname</label>
                <input type="text" onChange={handleOnChange} name="lastname" className="bg-gray-500 rounded w-[15rem] h-[1.5rem]"/>
            </div>
            <div className="flex flex-col">
                <label htmlFor="" className="text-gray-500">Email</label>
                <input type="text" onChange={handleOnChange} name="email" className="bg-gray-500 rounded w-[15rem] h-[1.5rem]"/>
            </div>
            <div className="flex flex-col">
                <label htmlFor="" className="text-gray-500">Password</label>
                <input type="password" onChange={handleOnChange} name="password" className="bg-gray-500 rounded w-[15rem] h-[1.5rem]"/>
            </div>
            <div>
                <button type="submit" className="bg-emerald-500 w-[7rem] h-[2rem] rounded">Register</button>
            </div>
        </form>
      </div>
    </>
  )
}

export default Usertyperegister