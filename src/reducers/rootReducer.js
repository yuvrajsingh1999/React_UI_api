const initState = {
    appId: "",
    intId:"",
    flowId:"",
    totalApp: "1",
    totalInt: "1",
    totalFlow: "1",
    totalPayload: "1",
    userName: "",
    password: "",
    errorMsg: "",
    showError: false,
    copied: false,    
    currentPageFlow: "1",
    currentPageApp: "1",
    currentPageInt: "1",
    currentPagePayload: "1",
    appData: [],
    integrationData: [],
    flowData: [],
    flowRequestData: [],
    directionFilter: [],
    typeFilter: [],
    valueFilter: []
}

const rootReducer = (state = initState, action) => {
    console.log(action);
    console.log(state);
    switch (action.type) {
        case 'APP':{
        console.log("APP ID: "+action.value);
        // APPId= state.appId;
        return {
        ...state,
        appId: action.value,
        }
    }
    case 'INT':{
        console.log("INT ID: "+action.value);
        // APPId= state.appId;
        return {
        ...state,
        intId: action.value,
        }
    }
    case 'FLOW':{
        console.log("FLOW ID: "+action.value);
        // APPId= state.appId;
        return {
        ...state,
        flowId: action.value,
        }
    }
    case 'TOTAL_APP':{
        console.log("TOTAL APP: "+action.value);
        // APPId= state.appId;
        return {
        ...state,
        totalApp: action.value,
        }
    }
    case 'TOTAL_INT':{
        console.log("TOTAL INT: "+action.value);
        // APPId= state.appId;
        return {
        ...state,
        totalInt: action.value,
        }
    }
    case 'TOTAL_FLOW':{
        console.log("TOTAL FLOW: "+action.value);
        // APPId= state.appId;
        return {
        ...state,
        totalFlow: action.value,
        }
    }
    case 'TOTAL_PAYLOAD':{
        console.log("TOTAL PAYLOAD: "+action.value);
        // APPId= state.appId;
        return {
        ...state,
        totalPayload: action.value,
        }
    }
    case 'USERNAME':{
        console.log("USERNAME: "+action.value);
        // APPId= state.appId;
        return {
        ...state,
        userName: action.value,
        }
    }case 'PASSWORD':{
        console.log("PASSWORD: "+action.value);
        // APPId= state.appId;
        return {
        ...state,
        password: action.value,
        }
    }case 'ERROR_MSG':{
        console.log("ERROR MSG: "+action.value);
        // APPId= state.appId;
        return {
        ...state,
        errorMsg: action.value,
        }
    }
    case 'SHOW_ERROR':{
        console.log("SHOW ERROR: "+action.value);
        // APPId= state.appId;
        return {
        ...state,
        showError: action.value,
        }
    }
    case 'COPIED':{
        console.log("COPIED: "+action.value);
        // APPId= state.appId;
        return {
        ...state,
        copied: action.value,
        }
    }
    case 'CURRENT_PAGE_FLOW':{
        console.log("CURRENT PAGE FLOW: "+action.value);
        // APPId= state.appId;
        return {
        ...state,
        currentPageFlow: action.value,
        }
    }
    case 'CURRENT_PAGE_APP':{
        console.log("CURRENT PAGE APP: "+action.value);
        // APPId= state.appId;
        return {
        ...state,
        currentPageApp: action.value,
        }
    }
    case 'CURRENT_PAGE_INT':{
        console.log("CURRENT PAGE INT: "+action.value);
        // APPId= state.appId;
        return {
        ...state,
        currentPageInt: action.value,
        }
    }
    case 'CURRENT_PAGE_PAYLOAD':{
        console.log("CURRENT PAGE PAYLOAD: "+action.value);
        // APPId= state.appId;
        return {
        ...state,
        currentPagePayload: action.value,
        }
    }
    case 'APP_DATA':{
        console.log("APP DATA: "+action.value);
        // APPId= state.appId;
        return {
        ...state,
        appData: action.value,
        }
    }
    case 'INTEGRATION_DATA':{
        console.log("INTEGRATION DATA: "+action.value);
        // APPId= state.appId;
        return {
        ...state,
        integrationData: action.value,
        }
    }
    case 'FLOW_DATA':{
        console.log("FLOW DATA: "+action.value);
        // APPId= state.appId;
        return {
        ...state,
        flowData: action.value,
        }
    }
    case 'FLOW_REQUEST_DATA':{
        console.log("FLOW REQUEST DATA: "+action.value);
        // APPId= state.appId;
        return {
        ...state,
        flowRequestData: action.value,
        }
    }
    case 'DIRECTION_FILTER_DATA':{
        console.log("DIRECTION FILTER DATA: "+action.value);
        // APPId= state.appId;
        return {
        ...state,
        directionFilter: action.value,
        }
    }
    case 'TYPE_FILTER_DATA':{
        console.log("TYPE FILTER DATA: "+action.value);
        // APPId= state.appId;
        return {
        ...state,
        typeFilter: action.value,
        }
    }
    case 'VALUE_FILTER_DATA':{
        console.log("VALUE FILTER DATA: "+action.value);
        // APPId= state.appId;
        return {
        ...state,
        valueFilter: action.value,
        }
    }

    default:
    return state;
}
}

export default rootReducer