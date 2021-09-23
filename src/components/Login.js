import React,{useState} from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { Redirect } from 'react-router-dom';
import { loginUrl } from "../url";
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {FaRegWindowClose} from 'react-icons/fa';

export default function Login() {
    let history = useHistory();
    const [username, setUsername] = useState("");
    const [ErrorMsg, setErrorMsg] = useState();
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  var refresh = window.localStorage.getItem('page');
  console.log(refresh);
  if (refresh==='logout'){
      window.location.reload();
      window.localStorage.setItem('page', "home");
  }

  const handleSubmit = (event) => {
    console.log(`
    username: ${username}
      Password: ${password}
    `);
    event.preventDefault();
    const user = {
      username: `${username}`,
        password: `${password}`,
    };
    // window.localStorage.setItem("user-info", Object.values(user));
    // history.push("/dashboard");
    console.log(loginUrl);
    axios.post(loginUrl,user).then((response) => {
      console.log(response);
        if(response.status==201){
            console.log(response.data);
            let userinfo = JSON.stringify(response.data.user);
            window.localStorage.setItem("token", response.data.token);
            window.localStorage.setItem("user-info", userinfo);
            window.localStorage.setItem("page", "home");
            
            history.push("/dashboard");
        }
        else{

          setErrorMsg(response.data.message);
          setShow(true);
          <Redirect to="/signin" />
        }
        }).catch(err => {
            console.log(err);
          });
  }
   

    return (
        <div className="login">
          <Collapse in={show}>
        <Alert severity="error"className="alert-login" style={{'fontSize':'initial','marginLeft':'auto','marginRight':'auto'}}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setShow(false);
              }}
            >

            </IconButton>
          }
        >

          <div className="alert-msg">
          {ErrorMsg}

          <button onClick={() => setShow(false)} style={{backgroundColor:'transparent','padding':'0px','color':'black'}}>
          <FaRegWindowClose />
          </button>  
          </div>
          </Alert>
    </Collapse>
            <form onSubmit={handleSubmit}>
      <h1 className="heading">Login</h1>
      
      <label>
        UserName:
        <input
          name="username"
          type="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
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


      <button style={{'marginTop':'10px'}}>Submit</button>
    </form>
        </div>
    )
}
