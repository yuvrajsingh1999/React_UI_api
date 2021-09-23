
import React, {  useState, useEffect } from "react";
import Table from '@material-ui/core/Table';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import ReactTooltip from "react-tooltip";
import { getTableUrl } from "../url";
import { useHistory, Redirect  } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import {FcRefresh} from 'react-icons/fc';
import {MdOpenInNew} from 'react-icons/md';


export default function Dashboard() {
  
  let history = useHistory();
  var refresh = window.localStorage.getItem('page');
  if (refresh==='home'){
      window.location.reload();
      window.localStorage.removeItem('page');
  } 
  const [data, setData] = useState([]);
  const [Total, setTotal] = useState(1);
  const [AppId, setAppId] = useState();
  // const [IntgId, setIntgId] = useState();
  const [CurrentPage, setCurrentPage] = useState(1);
    // let user = Object.values(localStorage.getItem('user-info'));
   
    // let userToken = localStorage.getItem('token');
    
    const getTableData = () => {
      var getUrl = getTableUrl;
      axios.get(getTableUrl,{params : {'current_page':CurrentPage}}).then((response) => {
      console.log(response.data);  
      // window.location.reload();
   
      setData(response.data.integrations);
      setTotal(response.data.last_page);
      });
    }
  useEffect(() => { console.log("Total page data changed data changed");}, [Total]);
  useEffect(() => { console.log("AppId is"+AppId);
                    if(!AppId){}else( nextPage()) }, [AppId]);
  
function nextPage(){
  localStorage.setItem('AppId',AppId);
  history.push('/dashboard/appid');
}
function handlePageClick({ selected: selectedPage }){
  // console.log(selectedPage+1);
  setCurrentPage(selectedPage+1);

  // getData();
  // handleFilterChange();
}

useEffect(() => getTableData(), []);
useEffect(() => { console.log("Current page data changed data changed");getTableData(); }, [CurrentPage]);

    
    return (
          <div>
          {!localStorage.getItem('user-info') ? (<React.Fragment><Redirect to="/signin" /> </React.Fragment>) : (<React.Fragment>

        <h3 style={{'color':'black'}}><u>Hello , Welcome</u></h3>
        <div className="table-view">
          <button onClick={() => getTableData()} data-tip data-for="refresh" className="refresh" style={{
    'padding': 'revert',
    'width': '2%','float':'right','marginRight':'10%','paddingTop':'30px'}}>
            <FcRefresh />
          </button>
          <ReactTooltip id="refresh" style={{'borderRadius':'11px'}}>
        <span>Refresh</span>
      </ReactTooltip>
      <h3 style={{'float':'left','marginLeft':'10%','color':'black'}}>Application Id</h3>
        <Table className="css-serial dashboard-table"  bordered="true" hover="true" responsive="sm" style={{'color':'white','width':'100%','border': '1px solid white',
  'borderCollapse': 'collapse','float':'left','marginRight':'25%','marginLeft':'10%','overflowX':'auto'
  
  }}  variant="dark">
    {/* <caption className="captions" style={{'captionSide':'top','fontSize':'18px','color':'black'}}>Application Id</caption> */}
  <thead  >
    <tr >
      <th style={{'textAlign':'center'}}>#</th>
      <th style={{'textAlign':'center'}}>App Id</th>
      <th className="view-detail" style={{'textAlign':'center'}}></th>
    </tr>
  </thead>
  <tbody >
    {data.map((col) => (
      
      <tr key={col}>

      <td></td>
      <td>{col.CHANNEL_APP_ID}</td>
      <td><Button className="button-table-view" data-tip data-for="view"   onClick={() => {setAppId(col.CHANNEL_APP_ID)}}><MdOpenInNew size={17}/></Button> 
      <ReactTooltip id="view" style={{'borderRadius':'11px'}}>
        <span>View Detail</span>
      </ReactTooltip></td>

        </tr>
      
     ))} 
  </tbody>
</Table>
</div>
<div className="paginate">
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
     </div> 
      
      
      </React.Fragment>)}
      </div>
    )
}
