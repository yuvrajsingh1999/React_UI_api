import React from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { registerUrl } from "../url";


export default function Register() {
    let history = useHistory();
    const [email, setEmail] = React.useState("");
    const [name, setName] = React.useState("");
    const [password, setPassword] = React.useState("");
    

    const handleSubmit = (event) => {
      
        event.preventDefault();
        console.log(`
        Name: ${name}
        Email: ${email}
        Password: ${password}
        
      `);
      const user = {
          name:`${name}`,
        email: `${email}`,
        password: `${password}`,
    };
    // axios.post(registerUrl,user).then((response) => {
    //     console.log(response.data); 
    //         history.push("/signin");
        
    //     }).catch(err => {
    //         console.log(err);
    //       });
    }
    
    return (
        <div className="register">
            <form onSubmit={handleSubmit}>
      <h1 className="heading">Create Account</h1>
      <label>
        Name:
        <input
          name="name"
          type="name"
          value={name}
          onChange={e => setName(e.target.value)}
          required />
      </label>
      <label>
        Email:
        <input
          name="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required />
      </label>

      <label>
        Password:
        <input
          name="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required />
      </label>

      <button>Submit</button>
    </form>
        </div>
    )
}
