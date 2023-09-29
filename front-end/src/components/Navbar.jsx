import { FaBars } from 'react-icons/fa'
import { useEffect ,useState } from 'react';
import { useNavigate } from "react-router-dom"


function Navbar() {

    const[toggleNav, setToggleNav] = useState(false)
    const navigate = useNavigate()
    
    function handleToggle() {
        setToggleNav(prev => !prev)
    }

    return(
        <>
            <div className="flex justify-between items-center p-3 bg-gray-900 w-full h-[4rem] border-white relative">
                <h1 className="cursor-pointer text-rose-500" onClick={() =>{ navigate('/')}}>Med<span className="text-blue-600">Tracker</span></h1>
                <button className='md:hidden' onClick={handleToggle}>
                <FaBars size={15} className='text-white'/>
                </button>
            </div>
                
                {
                    toggleNav && <div className='absolute flex w-full h-screen p-3 text-white bg-gray-600 opacity-90 md:bg-white'>
                        <ul className='flex flex-col justify-start items-center w-full gap-3 font-serif md:absolute md:top-0 md:left-0 md:flex-row md:justify-end  md:w-full  h-full md:h-[4rem] md:items-center md:p-3 md:gap-7'>
                                <li className='flex item-center justify-center border w-[50%] h-[2rem] bg-gray-900 rounded-2xl hover:text-lg' onClick={() =>{
                                    navigate('/register')
                                }}>Register</li>
                                <li className='flex item-center justify-center border w-[50%] h-[2rem] bg-gray-900 rounded-2xl hover:text-lg' onClick={() => {
                                    navigate('login')
                                }}>Login</li>
                        </ul> 
                    </div>
                }
                
        </>
    )
}

export default Navbar;