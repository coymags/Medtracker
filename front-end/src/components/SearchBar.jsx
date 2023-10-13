import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import  useStore  from "../data/Store"

function SearchBar() {
  const navigate = useNavigate()
  const [requestData, setRequestData] = useState({ name: ''})
  //Get the requestData from database using axios.get method
  const [responseData, setResponseData] = useState([])

  //onChange funtion to get the medicine name input
  function handleOnchange(e) {
    const { name, value} = e.target
    setRequestData((prev) =>{
      return {...prev, [name] : value}
    })
  }

  async function detectKeydown(e){
    //console.log('clicked:', e.key)
    if(e.key == 'Enter'){
      //console.log('You Hit Enter')
      try {
        //console.log(requestData)
        const resData = await axios.get(`http://localhost:8000/api/v1/products/search/${requestData.name}`)
        //console.log(resData.data)
        setResponseData(resData.data)
      } catch (error) {
        console.log(error)
      }
    }
  }

  //Get user current position
  const { setUserLocation } = useStore()
  navigator.geolocation.getCurrentPosition((position) => {
      setUserLocation(position.coords)
    }, (error) => {
      console.log(error)
  }, {enableHighAccuracy: true})

  //setLocationData to pass into another component
  const { setLocationData } = useStore()

  function handleClick(index) {
    console.log(index)
    console.log(responseData[index])
    setLocationData(responseData[index])
    navigate('/storemap')
  }
  

  return (
    <>
      <div className="flex flex-col items-start justify-center w-full h-screen gap-4 p-3 bg-gray-700">
        <input type="text" placeholder="Search medicine here...." name="name" onChange={handleOnchange} onKeyDown={detectKeydown} className="rounded-2xl w-[100%] h-[2.5rem] p-2" />
      
        <div className="flex flex-col w-full h-screen gap-2 overflow-auto text-white bg-gray-700">
          {
            responseData.map((data, index) =>{
              return(
                <div key={index} className="p-2 text-white bg-gray-800 border border-separate border-slate-400">
                  <h3>Pharmacy name: {data.pharmacy_name}</h3>
                  <h3>Medicine name: {data.name}</h3>
                  <h3>milligram: {data.mg}</h3>
                  <h3>Price: {data.price}</h3>
                  <h3>Description: {data.description}</h3>
                  <button onClick={() => handleClick(index)} className="border border-white w-[100%] rounded-2xl bg-emerald-500" >Location</button>
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  )
}

export default SearchBar