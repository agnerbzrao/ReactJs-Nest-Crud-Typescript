import {  NavLink } from 'react-router-dom';
import './nav.css';
function NavBar() {
  return (
    <header>
        <ul className="topnav">
          <li>
            <NavLink className={(navData) => navData.isActive ? "active" : "" }to="/">Home</NavLink>
          </li>
          <li>
            <NavLink className={(navData) => navData.isActive ? "active" : "" } to="/upload">Upload</NavLink>
          </li>          
          <li>
            <NavLink className={(navData) => navData.isActive ? "active" : "" } to="/balance-productor">Saldo Produtor</NavLink>
          </li>
        </ul>
    </header>    
  )
}
export default NavBar
