import { Outlet } from 'react-router-dom'
const Header = () => {
  return (
    <div>
        <nav className='d-flex justify-content-between'>
            <div className="btn-group">
                <button className="btn btn-danger">Home</button>
            </div>
            <div className="">
                <button className="btn btn-danger mx-1" onClick={()=>{localStorage.removeItem("room");window.location.reload()}}>Exit Room</button>
                <button className="btn btn-danger mx-1">Logout</button>
            </div>

        </nav>

        <Outlet/>
    </div>
  )
}

export default Header