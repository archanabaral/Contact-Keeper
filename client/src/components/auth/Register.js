import React, { useState, useContext, useEffect } from "react";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/AuthContext";

const Register = (props) => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { setAlert } = alertContext;
  const { register, error, clearErrors, isAuthenticated } = authContext;

  useEffect(
    () => {
       if (isAuthenticated === true) {
        props.history.push("/"); //redirect to the home page
      }
      if (error === `User with this email ${email} already exists`) {
        setAlert(error, "danger");
        clearErrors();
      }
      //eslint-disable-next-line
    },
    [error,
    isAuthenticated,
    props.history]
  );

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = user;
  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "") {
      setAlert("Please enter all the fields", "danger");
    } else if (password !== password2) {
      setAlert("password do not match", "danger");
    } else {
      register({
        name,
        email,
        password,
      });
    }
  };

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <lable htmlFor="name">Name</lable>
          <input type="text" name="name" value={name} onChange={onChange} />
        </div>
        <div className="form-group">
          <lable htmlFor="email">Email Address</lable>
          <input type="email" name="email" value={email} onChange={onChange} />
        </div>
        <div className="form-group">
          <lable htmlFor="Password">Password</lable>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <lable htmlFor="Password2">Confirm Password</lable>
          <input
            type="password"
            name="password2"
            value={password2}
            onChange={onChange}
          />
        </div>
        <input
          type="submit"
          value="Register"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};
export default Register;
