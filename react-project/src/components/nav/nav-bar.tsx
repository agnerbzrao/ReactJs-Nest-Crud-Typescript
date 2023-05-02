import { Link, NavLink } from 'react-router-dom';
import './styles.css';
function NavBar() {
  return (
    <header>
        <ul className="topnav">
          <li>
            <NavLink className={(navData) => navData.isActive ? "active" : "" }to="/">Home</NavLink>
          </li>
          <li>
            <Link to="/upload">Upload</Link>
          </li>
        </ul>
    </header>    
  )
}
export default NavBar
