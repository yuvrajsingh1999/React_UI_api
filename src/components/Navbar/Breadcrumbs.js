import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import withBreadcrumbs from "react-router-breadcrumbs-hoc";

 function Breadcrumbs({ breadcrumbs }) {

var AppId=(localStorage.getItem('AppId') ? localStorage.getItem('AppId') : "");
var IntId=(localStorage.getItem('IntId') ? localStorage.getItem('IntId') : "");
var FlowId=(localStorage.getItem('FlowId') ? localStorage.getItem('FlowId') : "");
  return (
    <div className="breadcrumb-div" style={{'textAlign':'left'}}>
      <div className="breadcrumbs" style={{'justifyContent':'-webkit-box','color':'white'}}>
    {breadcrumbs.map(({ breadcrumb, match }, index) => (
        console.log(breadcrumb),
        // console.log(AppId,IntId,FlowId),
      <div className="bc" key={match.url} >
        <Link to={match.url} style={{'color':'white'}}> {(breadcrumb.props.children=='Appid') ? (AppId) : ((breadcrumb.props.children=='Integrationid') ? (IntId) : ((breadcrumb.props.children=='Flowid') ? (FlowId) : ((breadcrumb.props.children=='Dashboard') ? (breadcrumb.props.children) :(breadcrumb.props.children))))}</Link>
        {index < breadcrumbs.length - 1 && " > "}
        {/* {breadcrumbs} */}
      </div>
    ))}
  </div>    
    </div>
  )
}

var AppId=(localStorage.getItem('AppId') ? localStorage.getItem('AppId') : "");
var IntId=(localStorage.getItem('IntId') ? localStorage.getItem('IntId') : "");
var FlowId=(localStorage.getItem('FlowId') ? localStorage.getItem('FlowId') : "");

const PureBreadcrumbs = ({ breadcrumbs }) => (
      Breadcrumbs({breadcrumbs})
  // <div className="breadcrumbs" style={{'width':'90%','display':'flex','justifyContent':'left','color':'white'}}>
  //   {breadcrumbs.map(({ breadcrumb, match }, index) => (
  //       console.log(breadcrumb),
  //       console.log(AppId,IntId,FlowId),
  //     <div className="bc" key={match.url} >
  //       <Link to={match.url} style={{'color':'white'}}>{(breadcrumb.props.children=='Firsttable') ? (AppId) : ((breadcrumb.props.children=='Secondtable') ? (IntId) : ((breadcrumb.props.children=='Thirdtable') ? (FlowId) : ((breadcrumb.props.children=='Dashboard') ? (breadcrumb.props.children) :(breadcrumb.props.children))))}</Link>
  //       {index < breadcrumbs.length - 1 && " > "}
  //       {/* {breadcrumbs} */}
  //     </div>
  //   ))}
  // </div>
);

export default withBreadcrumbs()(PureBreadcrumbs);
