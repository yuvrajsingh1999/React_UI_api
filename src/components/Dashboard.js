
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
import { connect } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';


function Dashboard() {
  const appId = useSelector((state) => state.appId);
  const data = useSelector((state) => state.appData);
  const Total = useSelector((state) => state.totalApp);
  const CurrentPage = useSelector((state) => state.currentPageApp);
  
  const dispatch = useDispatch();
  let history = useHistory();
  var refresh = window.localStorage.getItem('page');
  if (refresh==='home'){
      window.location.reload();
      window.localStorage.removeItem('page');
  } 
    
    const getTableData = () => {
      var getUrl = getTableUrl;
      axios.get(getTableUrl,{params : {'current_page':CurrentPage}}).then((response) => {
      console.log(response.data);  
        dispatch({type:'APP_DATA', value:response.data.integrations});
        dispatch({type:'TOTAL_APP', value:response.data.last_page});
      
      });
    }

function handlePageClick({ selected: selectedPage }){
  dispatch({type:'CURRENT_PAGE_APP', value:selectedPage+1});
}

function handleApp(id) {
  console.log(id);
  dispatch({type:'APP', value:id});
  history.push('/dashboard/appid');
}

useEffect(() => getTableData(), []);
useEffect(() => getTableData(), [CurrentPage]);
  
    
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
      
      <tr key={col.CHANNEL_APP_ID}>

      <td></td>
      <td>{col.CHANNEL_APP_ID}</td>
      <td><Button className="button-table-view" data-tip data-for="view"   onClick={() => handleApp(col.CHANNEL_APP_ID)} ><MdOpenInNew size={17}/></Button> 
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

// const mapState = (state, props) => {
  
//   console.log(state.appId);
//   return {
//     appId: state.appId
//   }
// }
export default Dashboard