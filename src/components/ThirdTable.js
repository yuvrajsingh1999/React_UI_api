
import React, { useMemo,  useState, useEffect } from "react";
import axios from 'axios';
import { CopyToClipboard } from "react-copy-to-clipboard";
import { MdContentCopy } from "react-icons/md";
import { getFlowUrl } from "../url";
import { useHistory, Redirect } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import yellow from '@material-ui/core/colors/yellow';
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import MaterialTooltip from "@material-ui/core/Tooltip";
import ReactTooltip from "react-tooltip";
import { Divider } from "@material-ui/core";
import {FcRefresh} from 'react-icons/fc';
import { Dropdown } from 'semantic-ui-react';


const Container = styled.div`
  background-color: lightblue;
  width: 300px;
  margin: 40px auto;
  padding: 10px;
  text-align: center;
`;
const LightTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11
  },
  arrow: {
    color: "white"
  }
}))(MaterialTooltip);

export default function ThirdTable() {
  
  let history = useHistory();

  const [isCopied, setIsCopied] = useState(false);
    const warning = yellow[600];
  var AppId = localStorage.getItem('AppId');
  var IntId = localStorage.getItem('IntId');
  var FlowId = localStorage.getItem('FlowId');
  const [data, setData] = useState([]);
  const [Total, setTotal] = useState(1);
  const [CurrentPage, setCurrentPage] = useState(1);
  const [RequestFilter, setRequestFilter] = useState("");
  const [Selected, setSelected] = useState("");
  const [TypeFilter, setTypeFilter] = useState("");
  const [values, setvalues] = useState([""]);
  
    // let user = JSON.parse(localStorage.getItem('user-info'));
   
    let userToken = localStorage.getItem('token');
    
    const onCopyText = () => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    };
    const options = [
      { key:'', text: 'None', value: '' },
      { key:'outgoing', text: 'Outgoing', value: 'outgoing' },
      { key:'incomming', text: 'Incomming', value: 'incomming' },
      { key:'login', text: 'Login', value: 'login' },
    ]
    // const options = [
    //   {  value: '', label:'None' },
    //   {  value: 'outgoing', label:'Outgoing' },
    //   {  value: 'incomming', label:'Incomming' },
    //   {  value: 'login', label:'Login' },
    // ]
    const getTableData = () => {
      var filterVal;
      // filterVal = JSON.stringify(values)
      values.map((item) => {filterVal=item})
      var getData = getFlowUrl+FlowId+"?current_page="+CurrentPage;
      axios.get(getData,{params: { 'filter' :filterVal}}).then((response) => {
      console.log(response.data);  
      // window.location.reload();
   
      setData(response.data.data);
      setTotal(response.data.last_page);
      });
    }
  useEffect(() => { console.log("Total page data changed data changed");}, [Total]);
  useEffect(() => { console.log("AppId is"+AppId);
                    console.log("Integration id is "+IntId);
                    console.log("Flow id is "+FlowId); 
                    if(!FlowId){}else( nextPage()) }, [FlowId]);
  
function nextPage(){
  localStorage.setItem('FlowId',FlowId);
//   history.push('/Thirdtable');
}
function handlePageClick({ selected: selectedPage }){
    // console.log(selectedPage+1);
    setCurrentPage(selectedPage+1);
 
    // getData();
    // handleFilterChange();
  }
  function truncate(string) {
   var str = string.substring(0,20)+"...";
   return str;
  }
  useEffect(() => getTableData(), []);
  useEffect(() => { console.log("Current page data changed data changed");getTableData(); }, [CurrentPage]);
  useEffect(() => { console.log("Multiple Filter data changed: " + Selected); }, [Selected]);
  useEffect(() => { console.log(values); }, [values]);
  function copyCodeToClipboard() {
    const el = this.textArea
    el.select()
    document.execCommand("copy")
    this.setState({copySuccess: true})
  }
    const handleSelect = (e, {value}) => {
       setvalues(oldArray => [value]);
      // e.map((item) => {setSelected(oldArray => [...oldArray, item.value])})
    
    }
    return (
        <div>
          
          {!localStorage.getItem('user-info') ? (<React.Fragment><Redirect to="/signin" /> </React.Fragment>) : ( (<React.Fragment>
            <div className="filter" style={{'width':'100%'}}>
            <fieldset style={{'border':'1px solid #333','width':'70%','justifyContent':'right'}}>
      <legend style={{'borderBottom':'none','marginBottom':'10px','width':'20%','borderRadius':'6px'}}>Filters</legend>
           
    <Dropdown placeholder='Request Type'  onChange={handleSelect}  fluid multiple selection options={options} style={{'width':'50%','float':'left'}}/>
  <button className="filter-button" onClick={() => getTableData()} style={{'marginLeft':'34px','marginBottom':'5px','padding':'9px','float':'right'}}>Apply</button>
      </fieldset>
      </div>

      <div style={{'overflowX':'auto'}}>
        <button onClick={() => getTableData()} data-tip data-for="refresh" className="refresh" style={{
    'padding': 'revert',
    'width': '2%','float':'right','marginRight':'12%','paddingTop':'30px'}}>
            <FcRefresh />
          </button>
          <ReactTooltip id="refresh" >
        <span>Refresh</span>
      </ReactTooltip>
      <h3 style={{'float':'left','marginLeft':'13%'}}>Flow Request ({FlowId})</h3>

        <table className="css-serial dashboard-table final-table" striped="true" bordered="true" hover="true" responsive="sm" style={{'color':'white','border': '1px solid white',
  'borderCollapse': 'collapse','overflowX':'auto'
  
  }}  variant="dark">


  <thead  >
    <tr>
      <th>#</th>
      <th >Url</th>
      <th>Payload</th>
      <th>Request type</th>
      <th>Channel Name</th>
      <th>Message</th>
      <th>Time</th>
    </tr>
  </thead>
  <tbody >{(data=="") ? (<React.Fragment><tr> No Data Available </tr></React.Fragment>) : (<React.Fragment>
    {data.map((col) => (
      
      <tr key={col.time} style={{'backgroundColor': (col.type=='success' || col.type=='complete') ? '#c6ffb3': (col.type=='info') ? '#d9d9d9' : '#ffb3b3'}}>
        
      <td></td>
      {/* <td>{(col.type=='info') ? (<React.Fragment><Button variant="contained" style={{'background-color':'#cccccc'}}>{col.type} </Button></React.Fragment>) : ((col.type=='error') ? (<React.Fragment><Button variant="contained" style={{'background-color':'#ff0000'}}>{col.type} </Button></React.Fragment>) : ((col.type=='success') ? (<React.Fragment><Button variant="contained" style={{'background-color':'#66ff33'}}>{col.type} </Button></React.Fragment>) : ((col.type=='complete') ? (<React.Fragment><Button variant="contained" style={{'background-color':'#66ff33'}}>{col.type} </Button></React.Fragment>) : (<React.Fragment></React.Fragment>))))}</td> */}
      <td  >{col.url}</td>
      <td >
      <div className="tooltip" style={{'display':"initial",'fontSize':'unset','fontFamily':'Lato','position':'unset'}}>
      <LightTooltip
        interactive
        arrow
        PopperProps={{
          modifiers: {
            offset: {
              enabled: true,
              offset: "0px, -10px"
            }
          }
        }}
        title={
          <label className="tooltiptext">
            <CopyToClipboard text={col.payload} data-tip data-for="copy-clipboard" onCopy={onCopyText}>
            <span>{isCopied ? "Copied!" : <MdContentCopy size={20}/>}</span>
          </CopyToClipboard>

          <ReactTooltip id="copy-clipboard" style={{'borderRadius':'11px'}}>
        <span>Copy To Clipboard</span>
      </ReactTooltip>
          <Divider />
          <pre style={{'overflowX':'scroll'}}>{JSON.stringify(JSON.parse(col.payload) ,null, "\t")}</pre>
          </label>
        }
      >
        <div>
        {truncate(col.payload)}
        </div>
       </LightTooltip>
       </div>
      </td>
      <td>{col.request_type}</td>
      <td>{col.channelName}</td>
      <td >
        <div className="tooltip" style={{'display':"initial",'fontSize':'unset','position':'unset'}}>
        <LightTooltip
        interactive
        arrow
        PopperProps={{
          modifiers: {
            offset: {
              enabled: true,
              offset: "0px, -10px"
            }
          }
        }}
        title={
          <label className="tooltiptext">
            <CopyToClipboard text={col.message} data-tip data-for="copy-clipboard" onCopy={onCopyText}>
            <span>{isCopied ? "Copied!" : <MdContentCopy size={20}/>}</span>
          </CopyToClipboard>
          <ReactTooltip id="copy-clipboard" style={{'borderRadius':'11px'}}>
        <span>Copy To Clipboard</span>
      </ReactTooltip>
          <Divider />{
            (col.message.charAt(0)=='{') ? <React.Fragment><pre style={{'overflowX':'scroll'}}>{JSON.stringify(JSON.parse(col.message) ,null, "\t")}</pre></React.Fragment> : <React.Fragment>{col.message}</React.Fragment>
          }
          
          </label>
        }
      >
        <div>
        {truncate(col.message)}
        </div>
       </LightTooltip>
       </div>
       </td>
      {/* <td>{col.app_id}</td>
      <td>{col.integration_id}</td>
      <td>{col.flow_id}</td> */}
      <td>{col.time} </td>

        </tr>
      
     ))}</React.Fragment> )}
  </tbody>
</table>
</div>
<ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        pageCount={Total}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      />
      
      
      
      </React.Fragment>))}
        </div>
    )
}

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);