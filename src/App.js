
import React from "react";
import Navbar from "./components/Navbar/index";
import { BrowserRouter as Router, Switch, Link, Route, Redirect,  NavLink   } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from './components/Dashboard';
import SecondTable from './components/SecondTable';
import ThirdTable from './components/ThirdTable';
import FirstTable from './components/FirstTable';
import ReactDOM from 'react-dom'



var AppId = (localStorage.getItem('AppId') ? localStorage.getItem('AppId') : "");

function App() {
  
  return (
    <div className="App">
      <Router>
    <Navbar />
  
    <Switch>
        <Route path="/signin" exact default component={Login} />
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path='/dashboard/appid' exact component={FirstTable} />
        <Route path="/dashboard/appid/integrationid" exact component={SecondTable} />
        <Route path="/dashboard/appid/integrationid/flowid" exact component={ThirdTable} />
        <Route path="/sign-up" component={Register}/>
      </Switch>
      </Router>
      
      
       </div>
  );
}

export default App;

// ReactDOM.render(<App />, document.getElementById('example'));