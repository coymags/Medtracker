import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

function Useraccount() {

  const [data, setData] = useState([]) //data comming from localStorage
  const [storeId, setStorId] = useState() //Only getting the store id
  const navigate = useNavigate()
  const [changeSwitch, setChangeSwitch] = useState(0)
  
  //Getting data user information from local storage
  useEffect(()=>{
    const localData = JSON.parse(localStorage.getItem('user'))
    setData(localData)
    setStorId(localData.user_id)
    // console.log(localData[0].user_id)
    console.log("localStorage", localData)
    console.log(`useEffect is running`)
    return
  }, [])

  //Post request body form to database
  const [productInput, setProductInput] = useState({
    name: '',
    mg: '',
    price: '',
    description: ''
  })

  //Onchacge function in input
  function handleOnchange(e){
    const {name, value} = e.target
    setProductInput((prev) =>{
      return {...prev,[name] : value}
    })
  console.log(productInput)
  }

  //Onsubmit function when submitting data to database
  async function handleOnsubmit(e){
    e.preventDefault()
    try{
      productInput.user_id = 1
      const product = await axios.post('http://localhost:8000/api/v1/products', productInput)
      console.log(product.data)
      if(product.data){
        console.log('Product added to database!')
        setChangeSwitch(0)
      }else{
        console.log('Adding failed!')
      }
    }catch(error){
      console.log('Error: ', error)
    }
  }

  //Logout function, removing data in local storage
  function handleLogout() {
    localStorage.removeItem('user')
    navigate('/login')
  }

  const [medicine, setMedicine] = useState([]) //medicine data comming from database

  //Getting specific data from database with a specific id number, with every render dependency
  useEffect(() => {
    //console.log(data[0])
    axios.get(`http://localhost:8000/api/v1/products/${storeId}`)
    .then(res =>{
      setMedicine(res.data)
    })
    .catch(err => console.log(err))
  }, [handleOnsubmit])//dependency -- must render every send data to database

  //Checking data length from local storage
  if (data.length === 0) {
    return(
      <div>
        Loading
      </div>
    )
  }

  // console.log("store_id: ", storeId)

  return (
    <>
      {/**Pharmacy data information */}
      <div className="w-full h-[8rem] bg-gray-700 p-3 text-white">
        {
          data.map((d, index) => {
            return(
              <div key={index}>
                <div>Email: {d.email}</div>
                <div>Pharmacy name: {d.pharmacy_name}</div>
              </div>
              )
            })
        }
        <button type="submit" onClick={handleLogout} className="bg-emerald-500 w-[7rem] h-[2rem] rounded">Logout</button>
      </div>

      {/**Medicine input divi */}
      <div className="flex items-start justify-center w-full h-[25rem] p-3 bg-gray-700">
          <form onSubmit={handleOnsubmit} className="flex flex-col items-center justify-center w-[20rem] h-[23rem] bg-gray-900 rounded text-white p-2 gap-3">
              <div>
                  <h1 className="text-2xl">Medicine input</h1>
              </div>
              <div className="flex flex-col">
                  <label htmlFor="" className="text-gray-500">Name</label>
                  <input type="text" name="name" onChange={handleOnchange} className="bg-gray-500 rounded w-[15rem] h-[1.5rem]"/>
              </div>
              <div className="flex flex-col">
                  <label htmlFor="" className="text-gray-500">mg</label>
                  <input type="text" name="mg" onChange={handleOnchange} className="bg-gray-500 rounded w-[15rem] h-[1.5rem]"/>
              </div>
              <div className="flex flex-col">
                  <label htmlFor="" className="text-gray-500">price</label>
                  <input type="text" name="price" onChange={handleOnchange} className="bg-gray-500 rounded w-[15rem] h-[1.5rem]"/>
              </div>
              <div className="flex flex-col">
                  <label htmlFor="" className="text-gray-500">description</label>
                  <textarea name="description" cols={30} rows={5} onChange={handleOnchange} className="bg-gray-500 rounded w-[15rem] h-[1.5rem]"/>
              </div>
              <div>
                  <button type="submit" className="bg-emerald-500 w-[7rem] h-[2rem] rounded">SUBMIT</button>
              </div>
          </form>
        </div>

        {/**Medicine table. medicine display div */}
        <div className="flex items-start justify-center w-full h-screen p-3 bg-gray-700">
          <table className="border-collapse table-auto border-slate-100 ">
              <thead>
                  <th className="p-2 text-white border border-slate-300">Name</th>
                  <th className="p-2 text-white border border-slate-300">Price</th>
                  <th className="p-2 text-white border border-slate-300">Mg</th>
                  <th className="p-2 text-white border border-slate-300">Discription</th>
                  {/*<th>Action</th>*/}
              </thead>
                    
              <tbody>
                {
                  medicine.map((data, index) =>(
                    <tr key={index} className="text-white">
                        <td>{data.name}</td>
                        <td>{data.mg}</td>
                        <td>{data.price}</td>
                        <td>{data.description}</td>
                        {/*<td><button>Edit</button><button>Delete</button></td>*/}
                    </tr>
                  ))
                }
              </tbody>
          </table>
      </div>
    </>
  )
}

export default Useraccount