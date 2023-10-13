import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from "./components/Login"
import Register from "./components/Register"
import SearchBar from './components/SearchBar'
import Useraccount from './components/Useraccount.jsx'
import StoreMap from './components/StoreMap.jsx'
import PageNotFound from './components/PageNotFound';
import Dashboard from './components/Dashboard';

let userToken = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null

function App() {
  const [jwt, setJwt] = useState(userToken)
  
  // Reload if jwt changes
  useEffect(() => {
    console.log("JWT: ", jwt)
  }, [jwt])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SearchBar/>}/>
          {jwt ? (
              <>
                <Route path='/register' element={<Register/>} />
                <Route path='/user' element={<Useraccount/>} />
                <Route path='/storemap' element={<StoreMap/>}/>
                <Route path='/dashboard' element={<Dashboard setJwt={setJwt} />}/>
              </>
            ) : (
              <>
                <Route path='/admin' element={<Login setJwt={setJwt} />} />
                <Route path='/register' element={<PageNotFound/>} />
                <Route path='/user' element={<PageNotFound/>} />
                <Route path='/storemap' element={<PageNotFound/>}/>
                <Route path='/dashboard' element={<PageNotFound />}/>
              </>
            )
          }
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
