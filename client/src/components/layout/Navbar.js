import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/AuthContext";
import ContactContext from "../../context/contact/ContactContext"

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const contactContext=useContext(ContactContext)

  const { isAuthenticated, logout, user } = authContext;
  const { clearContacts} =contactContext
 const onLogout = () =>{
     logout();
     clearContacts();
 }
  const authLinks = (
    <div>
      <li>Hello {user && user.name}</li>
      <li>
        <a onClick={onLogout} href="#!">
          <i className="fas fa-sign-out-alt"></i>
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </div>
  );
  const guestLinks = (
    <div>
        <ul>
      <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        </ul>
    </div>
  );
  return (
    <div className="navbar bg-primary">
      <h1>
        <i className={icon} />
        {title}
      </h1>
      <ul>
       {isAuthenticated ? authLinks : guestLinks}
      </ul>
    </div>
  );
};
Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};
Navbar.defaultProps = {
  title: "contact Keeper",
  icon: "fas fa-id-card-alt",
};

export default Navbar;
