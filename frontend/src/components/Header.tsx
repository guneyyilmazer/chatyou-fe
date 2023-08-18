import { Outlet } from 'react-router-dom'
const Header = () => {
  return (
    <div>
        <nav className='d-flex justify-content-between'>
            <div className="btn-group">
                <button className="btn btn-danger">Home</button>
            </div>
            <div className="btn-group">
                <button className="btn btn-danger">Exit Room</button>
                <button className="btn btn-danger">Logout</button>
            </div>

        </nav>

        <Outlet/>
    </div>
  )
}

export default Header