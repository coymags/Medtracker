import { useState, useEffect} from 'react'

function UserProfile(){

    const[medicine, setMedicine] = useState([])

    useEffect(() =>{
        fetch('http://localhost:3000/medicine')
        .then(res =>{
            return res.json()
        })
        .then(data => setMedicine(data))
        .catch(err => console.log(err))
    },[])

    return(
        <div id="usersdatacontainer">
            <div id="nameandaddresscontainer">
                <h1>Pharmacy name here</h1>
                <ul>
                    <li>Email:admin@email.com</li>
                    <li>Username:admin@email.com</li>
                    <li>Address: Pharmacy address here</li>
                </ul>
            </div>
            <div id="databoxcontainer">
                <div id="inputformedicinecontainer">
                    <form action="" id="formformedicine">
                        <label htmlFor="medicinenameinput" id="formformedicinelabel">Medicine name:</label>
                        <input type="text"  id="medicinenameinput" name='medicinename'/>
                        <br />
                        <label htmlFor="miligraminput" id="miligramlabel">mg:</label>
                        <input type="text" id="miligraminput" name='miligram'/>
                        <br />
                        <label htmlFor="priceinput" id="formformedicinelabel">Price:</label>
                        <input type="text" id="priceinput" name='medicineprice'/>
                        <br />
                        <label htmlFor="dicriptioninput" id="formformedicinelabel">Description:</label>
                        <br />
                        <textarea name="discription" id="discriptioninput" cols="30" rows="5"></textarea>
                        <br />
                        <button >Add</button>
                    </form>
                </div>
                <div id="boxformedicine">
                    <table>
                        <thead>
                            <th>Medicine name</th>
                            <th>Price</th>
                            <th>Milligram</th>
                            <th>Discription</th>
                            <th>Action</th>
                        </thead>
                    
                        <tbody>
                            {
                                medicine.map((data, index) =>(
                                    <tr key={index}>
                                        <td>{data.medicinename}</td>
                                        <td>{data.price}</td>
                                        <td>{data.miligram}</td>
                                        <td>{data.discription}</td>
                                        <td><button>Edit</button><button>Delete</button></td>
                                    </tr>
                                )
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default UserProfile