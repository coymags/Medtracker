import { useEffect, useState } from "react"
import axios from "axios"

function SearchBar() {

  const [requestData, setRequestData] = useState({ name:''})

  //onChange funtion to get the medicine name input
  function handleOnchange(e) {
    const { name, value} = e.target
    setRequestData((prev) =>{
      return {...prev, [name] : value}
    })
    //console.log(requestData)
  }

  //Get the requestData from database using axios.get method
  const [reponseData, setResponseData] = useState([])

  async function detectKeydown(e){
    //console.log('clicked:', e.key)
    if(e.key == 'Enter'){
      //console.log('You Hit Enter')
      try {
        //console.log(requestData)
        const resData = await axios.get(`http://localhost:8000/products/search/${requestData.name}`)
        //console.log(resData.data)
        setResponseData(resData.data)
      } catch (error) {
        console.log(error)
      }
    }
  }


  return (
    <>
      <div className="flex flex-col items-start justify-center w-full h-screen gap-4 p-3 bg-gray-700">
        <input type="text" placeholder="Search medicine here...." name="name" onChange={handleOnchange} onKeyDown={detectKeydown} className="rounded-2xl w-[100%] h-[2.5rem] p-2" />
      
        <div className="flex flex-col w-full h-screen gap-2 overflow-auto text-white bg-gray-700">
          {
            reponseData.map((data, index) =>{
              return(
                <div key={index} className="p-2 text-white bg-gray-800 border border-separate border-slate-400">
                  <h3>Pharmacy name: {data.pharmacy_name}</h3>
                  <h3>Pharmacy address: {data.address}</h3>
                  <h3>Medicine name: {data.name}</h3>
                  <h3>milligram: {data.mg}</h3>
                  <h3>Price: {data.price}</h3>
                  <h3>Description: {data.description}</h3>
                  <button className="border border-white w-[100%]  rounded-2xl bg-emerald-500">Navigation</button>
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