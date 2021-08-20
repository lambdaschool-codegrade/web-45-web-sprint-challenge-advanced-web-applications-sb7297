import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const history = useHistory();

  const [form, setForm] = useState({
    username: "",
    password: ""
  });
  
  const handleChange = ev => {
    setForm({
      ...form,
      [ev.target.name]: ev.target.value
    });
  }

  const [error, setError] = useState("");
  
  const handleSubmit = ev => {
    ev.preventDefault();

    if (form.username === "" || form.password === "") {
      setError("Username or Password not valid");
    } else if (form.username === "Lambda" && form.password === "School") {
      setError("");
      axios.post("http://localhost:5000/api/login", {
        username: form.username,
        password: form.password
      })
        .then(res => {
          localStorage.setItem('token', res.data.payload);
          history.push("/bubble");
          
        })
        .catch(err => {
          console.log("Authentication error: ", err);
        })
    } else {
      setError("");
    }
  }

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <div data-testid="loginForm" className="login-form">
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input name="username" type="text" id="username" onChange={handleChange} value={form.username} />
          <label htmlFor="password">Password</label>
          <input name="password" type="password" id="password" onChange={handleChange} value={form.password} />
          <input type="submit" value="submit" id="submit" />
        </form>
      </div>

      <p id="error" className="error">{error}</p>
    </div>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state necessary for form functioning.
//4. If either the username or password is not entered, display the following words with the p tag provided: Username or Password not valid.
//5. If the username / password is equal to "Lambda" / "School", save that token to localStorage and redirect to a BubblePage route.
//6. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE id="username" and id="password"
//7. MAKE SURE YOUR SUBMIT BUTTON INCLUDES id="submit"
//8. MAKE SURE YOUR ERROR p tag contains the id="error"