
import React, { useMemo,  useState, useEffect } from "react";
import Table from '@material-ui/core/Table';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { getAppIntUrl } from "../url";
import ReactTooltip from "react-tooltip";
import { useHistory, Redirect } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import {FcRefresh} from 'react-icons/fc';
import {MdOpenInNew} from 'react-icons/md';

export default function FirstTable() {

  console.log("abc");  
  let history = useHistory();
 
  const [data, setData] = useState([]);
  const [Total, setTotal] = useState(1);
  const [IntgId, setIntgId] = useState();
  const [CurrentPage, setCurrentPage] = useState(1);
    // let user = JSON.parse(localStorage.getItem('user-info'));
   
    let userToken = localStorage.getItem('token');
    var AppId = localStorage.getItem('AppId');

    
    const getTableData = () => {
      console.log("axios called");
        var url = getAppIntUrl+AppId+"/integrations";
      axios.get(url,{params : {'current_page':CurrentPage}}).then((response) => {
      console.log(response.data);  
      // window.location.reload();
   
      setData(response.data.integrations);
      setTotal(response.data.last_page);
      });
    }
  useEffect(() => { console.log("Total page data changed data changed");}, [Total]);
  useEffect(() => { 
                    console.log("Integration id is "+IntgId); 
                    if(!IntgId){}else( nextPage()) }, [IntgId]);
  
function nextPage(){
  localStorage.setItem('IntId',IntgId);
  // <Redirect to="/secondtable"/>
  history.push('/dashboard/appid/integrationid');
}
function handlePageClick({ selected: selectedPage }){
  console.log(selectedPage+1);
  setCurrentPage(selectedPage+1);

  // getData();
  // handleFilterChange();
}
useEffect(() => { console.log("is calling");getTableData();}, []);
useEffect(() => { console.log("Current page data changed data changed");getTableData(); }, [CurrentPage]);

    
    return (
        <div>
          
          {!localStorage.getItem('user-info') ? (<React.Fragment><Redirect to="/signin" /> </React.Fragment>) : ( (<React.Fragment>


        <div >
        
      {/* <input type="text" id="Applicationid" className="Applicationid" onkeyup="myFunction()" placeholder="Search for Application id" title="Type in a Appliction id" /> */}
        <div className="table-view" style={{'color':'white','width':'100%','border': '1px solid white',
  'borderCollapse': 'collapse','overflowX':'auto'
  
  }}>
    <button onClick={() => getTableData()} data-tip data-for="refresh" className="refresh" style={{
    'padding': 'revert',
    'width': '2%','float':'right','marginRight':'10%','paddingTop':'30px'}}>
            <FcRefresh />
          </button>
          <ReactTooltip id="refresh" style={{'borderRadius':'11px'}}>
        <span>Refresh</span>
      </ReactTooltip>
      <h3 style={{'float':'left','marginLeft':'10%','color':'black'}}>Application Id ({AppId})</h3>
        <Table className="css-serial dashboard-table" striped="true" bordered="true" hover="true" responsive="sm"  variant="dark">
  <thead  >
    <tr>
      <th>#</th>
      <th>Integration Id</th>
      <th>Type</th>
      <th>Business Name</th>
      <th className="view-detail" ></th>
    </tr>
  </thead>
  <tbody >{(data=="") ? (<React.Fragment ><tr style={{'color':'black'}}>No data available</tr></React.Fragment>) :(<React.Fragment>
    {data.map((col) => (
      
      <tr key={col._id}>

      <td></td>
      <td>{col._id}</td>
      <td>{col.type}</td>
      <td>{col.businessName}</td>
      <td><Button className="button-table-view" data-tip data-for="view"   onClick={() => {setIntgId(col._id)}}><MdOpenInNew size={17}/></Button>
      <ReactTooltip id="view" style={{'borderRadius':'11px'}}>
        <span>View Detail</span>
      </ReactTooltip> </td>

        </tr>
      
     ))}</React.Fragment>) }
  </tbody>
</Table>
</div>
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
