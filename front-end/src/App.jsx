import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from "./components/Login"
import Register from "./components/Register"
import Navbar from "./components/Navbar"
import SearchBar from './components/SearchBar'



function App() {

  return (
    <>
      <Navbar/>
      <UserContext.Provider value={value}>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<SearchBar/>} />
        <Route path='/home' element={<SearchBar/>}/>
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/user' element={<Useraccount/>} />
      </Routes>
      </BrowserRouter>
      </UserContext.Provider>
    </>
  )
}

export default App;
