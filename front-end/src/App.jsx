import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Lmap from "./components/Lmap";
import Login from "./components/Login"
import Register from "./components/Register"
import Navbar from "./components/Navbar"
import SearchBar from './components/SearchBar'
import Useraccount from './components/Useraccount.jsx'
import StoreMap from './components/StoreMap.jsx'


function App() {

  //for Lmap component
  return (
    <>
      <BrowserRouter>
      {/*<Navbar/>*/}
      <Routes>
        <Route path='/' element={<App/>} />
        <Route path='/home' element={<SearchBar/>}/>
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/user' element={<Useraccount/>} />
        <Route path='/storemap' element={<StoreMap/>}/>
      </Routes>
      </BrowserRouter>

      <Lmap />

    </>
  )
}

export default App;
