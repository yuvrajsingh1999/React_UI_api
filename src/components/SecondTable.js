
import React, { useMemo,  useState, useEffect } from "react";
import Table from '@material-ui/core/Table';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { getIntegrationUrl } from "../url";
import { useHistory, Redirect } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import ReactTooltip from "react-tooltip";
import {FcRefresh} from 'react-icons/fc';
import {MdOpenInNew} from 'react-icons/md';
import { Dropdown } from 'semantic-ui-react';

export default function SecondTable() {
  
  let history = useHistory();
   
  var AppId = localStorage.getItem('AppId');
  var IntId = localStorage.getItem('IntId');
  const [data, setData] = useState([]);
  const [Total, setTotal] = useState(1);
  const [FlowId, setFlowId] = useState();
  const [Dirvalues, setDirvalues] = useState([""]);
  const [Typvalues, setTypvalues] = useState([""]);
  const [CurrentPage, setCurrentPage] = useState(1);
    // let user = JSON.parse(localStorage.getItem('user-info'));
   
    let userToken = localStorage.getItem('token');
    const typeopt = [
      { key:'', text: 'None', value: '' },
      { key:'ok', text: 'Ok', value: 'ok' },
      { key:'inprogress', text: 'Inprogress', value: 'inprogress' },
      { key:'failure', text: 'Failure', value: 'failure' },
    ]
    const diropt = [
      { key:'', text: 'None', value: '' },
      { key:'2', text: 'Ameyo', value: '2' },
      { key:'1', text: 'Channel', value: '1' },
      { key:'0', text: 'Direct', value: '0' },
    ]
  
    const getTableData = () => {
      var dirFilter, typFilter;
      Dirvalues.map((item) => {dirFilter=item})
      Typvalues.map((items) => {typFilter=items})

    var getData = getIntegrationUrl+AppId+"/"+IntId+"?current_page="+CurrentPage;
      axios.get(getData,{params: { 'dirFilter' :dirFilter,'typFilter':typFilter}}).then((response) => {
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
  history.push('/dashboard/appid/integrationid/flowid');
}
function handlePageClick({ selected: selectedPage }){
    console.log(selectedPage+1);
    setCurrentPage(selectedPage+1);
 
    // getData();
    // handleFilterChange();
  }

  useEffect(() => getTableData(), []);
  useEffect(() => { console.log("Current page data changed data changed");getTableData(); }, [CurrentPage]);
  useEffect(() => { console.log("Direction Filter data changed: " + Dirvalues); }, [Dirvalues]);
  useEffect(() => { console.log("Direction Filter data changed: " + Typvalues); }, [Typvalues]);

  const handleDirSelect = (e, {value}) => {
    setDirvalues(oldArray => [value]);
   // e.map((item) => {setSelected(oldArray => [...oldArray, item.value])})
 
 }
 const handleTypSelect = (e, {value}) => {
  setTypvalues(oldArray => [value]);
 // e.map((item) => {setSelected(oldArray => [...oldArray, item.value])})

}

    return (
        <div>
          
          {!localStorage.getItem('user-info') ? (<React.Fragment><Redirect to="/signin" /> </React.Fragment>) : ((<React.Fragment>
          <div className="filter" style={{'width':'100%'}}>
          <fieldset style={{'border':'1px solid #333','width':'100%'}}> 
      <legend style={{'borderBottom':'none','marginBottom':'10px','width':'20%','borderRadius':'6px'}}>Filters</legend>
            
        <Dropdown placeholder='Direction'  onChange={handleDirSelect}  fluid multiple selection options={diropt} style={{'width':'50%','float':'left'}}/>
        <Dropdown placeholder='Type'  onChange={handleTypSelect}  fluid multiple selection options={typeopt} style={{'width':'50%','float':'left'}}/>
  
      <button className="filter-button" onClick={() => getTableData()} style={{'marginLeft':'34px','marginBottom':'5px','padding':'9px'}}>Apply</button>
      </fieldset>
      </div>

        <div style={{'overflowX':'auto'}}>
        <button onClick={() => getTableData()} data-tip data-for="refresh" className="refresh" style={{
    'padding': 'revert',
    'width': '2%','float':'right','marginRight':'10%','paddingTop':'30px'}}>
            <FcRefresh />
          </button>
          <ReactTooltip id="refresh" style={{'borderRadius':'11px'}}>
        <span>Refresh</span>
      </ReactTooltip>
      <h3 style={{'float':'left','marginLeft':'10%','fontSize':'1.8rem'}}>Integration id ({IntId})</h3>
        <Table className="css-serial dashboard-table" striped="true" bordered="true" hover="true" responsive="sm" style={{'color':'white','width':'100%','border': '1px solid white',
  'borderCollapse': 'collapse'
  
  }}  variant="dark">
    {/* <caption className="captions" style={{'captionSide':'top','fontSize':'18px','color':'black'}}>Integration Id ({IntId})</caption> */}
  <thead  >
    <tr><th>#</th><th>Direction</th>
      <th>Flow Id</th>
      <th>Time</th>
      <th className="view-detail"></th>
    </tr>
  </thead>
  <tbody >{(data=="") ? (<React.Fragment><tr style={{'color':'black'}}> No data available</tr></React.Fragment>) : (<React.Fragment>{data.map((col) => (
      
      <tr key={col.time} style={{'backgroundColor': (col.type=='ok') ? '#c6ffb3': (col.type=='inprogress') ? '#d9d9d9' : '#ffb3b3'}}>
        
      <td></td>
      <td >{(col.direction=='2') ? (<React.Fragment><strong> Ameyo</strong> </React.Fragment>) :((col.direction=='1') ? (<React.Fragment><strong> Channel</strong> </React.Fragment>) :((col.direction=='0') ? (<React.Fragment><strong> Direct</strong> </React.Fragment>) :(<React.Fragment> </React.Fragment>)))}</td>
      {/* <td>{(col.type=='ok') ? (<React.Fragment><Button variant="contained" style={{'background-color':'#66ff33'}}>{col.type} </Button></React.Fragment>) :((col.type=='inprogress') ? (<React.Fragment><Button variant="contained" style={{'background-color':'#cccccc'}}>{col.type} </Button></React.Fragment>) :((col.type=='failure') ? (<React.Fragment><Button variant="contained" style={{'background-color':'#ff0000'}}>{col.type} </Button></React.Fragment>) :(<React.Fragment></React.Fragment>)))}</td> */}
      <td>{col.flow_id}</td>
      <td>{col.time}</td>
      <td><Button className="button-table-view" data-tip data-for="view" style={{'boxShadow':'none','backgroundColor':'transparent'}} variant="contained" onClick={() => {setFlowId(col.flow_id)}} ><MdOpenInNew size={17}/></Button>
      <ReactTooltip id="view" style={{'borderRadius':'11px'}}>
        <span>View Detail</span>
      </ReactTooltip> </td>

        </tr>
      
     ))}</React.Fragment>)}
     
  </tbody>
</Table>
</div>
<ReactPaginate
        previousLabel={"??? Previous"}
        nextLabel={"Next ???"}
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
