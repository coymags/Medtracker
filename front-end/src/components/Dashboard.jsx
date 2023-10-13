import Navbar from "./Navbar"



const Dashboard = ({ setJwt }) => {
  return (
    <div className='relative w-full h-screen'>
        <Navbar className='absolute top-0 left-0' setJwt={setJwt} />
        <div>Dashboard</div>
    </div>
  )
}

export default Dashboard