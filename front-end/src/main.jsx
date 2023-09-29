import { BrowserRouter, Routes, Route} from 'react-router-dom'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Login from "./components/Login"
import Register from "./components/Register"
import Navbar from "./components/Navbar"
import SearchBar from './components/SearchBar'
import Useraccount from './components/Useraccount.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<App/>} />
        <Route path='/home' element={<SearchBar/>}/>
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/user' element={<Useraccount/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
