import {getRequest, postRequest, postMultipartRequest, patchRequest} from '../../Common/network-call';
import {BASE_URL,itemCount} from '../../Common/constant';


export const CUSTOMERS_LISTS = 'CUSTOMERS_LISTS';
export const CUSTOMER_CREATE_MODEL = 'CUSTOMER_CREATE_MODEL';
export const UPDATE_CUSTOMER_KYC_FILES = 'UPDATE_CUSTOMER_KYC_FILES';
export const CUSTOMER_PAYMENT_MODEL = 'CUSTOMER_PAYMENT_MODEL';
export const CUSTOMER_APPROVE_MODAL = 'CUSTOMER_APPROVE_MODAL';
export const SELECTED_CUSTOMER = 'SELECTED_CUSTOMER';
export const SINGLE_CUSTOMER_PAYMENTS = 'SINGLE_CUSTOMER_PAYMENTS';

export function fetchCustomers(session, pageCount = 0, callback) {
    var perPage = itemCount;
    var offset = pageCount <= 1 ? 0 : (pageCount-1) * perPage;
    var offSetQuery = `&limit=${perPage}&offset=${offset}`;

    var url = `${BASE_URL}/api/customers?include_count=true&order=createdon&by=DESC${offSetQuery}`;
    
    return (dispatch) => {
        getRequest(url, session, dispatch, (response) => {
            // console.log('response : - ', response)
            dispatch({type:CUSTOMERS_LISTS, payload: {data:response.resource, count:response.count ? response.count : ''}});
            callback({success: 1});
        }, (error) => {
            // callback({success: 0, error: error});
        });
    };
}

export function searchCustomers(session, search, pageCount = 0, callback) {
    var perPage = itemCount;
    var offset = pageCount <= 1 ? 0 : (pageCount-1) * perPage;
    var offSetQuery = `&limit=${perPage}&offset=${offset}`;
    let searchVal = encodeURI(search);

    var url = `${BASE_URL}/api/searchcustomers?search=${searchVal}&include_count=true&order=createdon&by=DESC${offSetQuery}`;
    
    return (dispatch) => {
        getRequest(url, session, dispatch, (response) => {
            // console.log('response : - ', response)
            dispatch({type:CUSTOMERS_LISTS, payload: {data:response.resource, count:response.count ? response.count : ''}});
            callback({success: 1});
        }, (error) => {
            // callback({success: 0, error: error});
        });
    };
}

export function activateDeactivateCustomer(session, values, callback) {
    var url = `${BASE_URL}/api/activatedeactivatecustomer`;
    var body = new URLSearchParams(values);

    return (dispatch) => {
        postMultipartRequest(url, body, session, dispatch, (response) => {
            // console.log('response : - ', response)
            
            if(response.success == 1) {
                callback({success: 1, data: response.resource});
            }
            else {
                callback({success: 0});
            }
        }, (error) => {
            // callback({success: 0, error: error});
        });
    }
}

export function openCustomerCreateModal(obj) {
    return { type: CUSTOMER_CREATE_MODEL, payload: obj};
}

export function customerKycFiles(files) {
    return { type: UPDATE_CUSTOMER_KYC_FILES, payload: files};
}

export function addCustomer(session, values, callback) {
    var url = `${BASE_URL}/api/addcustomer`;
    var body = new URLSearchParams(values);
    // console.log('body : - ', body)

    return (dispatch) => {
        postMultipartRequest(url, body, session, dispatch, (response) => {
            // console.log('response : - ', response)
            
            if(response.success == 1) {
                callback({success: 1, data: response.resource});
            }
            else if(response.success == 2) {
                callback({success: 2, data: response.resource});
            }
            else {
                callback({success: 0});
            }
        }, (error) => {
            // callback({success: 0, error: error});
        });
    };
}

export function addCustomerPlan(session, values, callback) {
    var url = `${BASE_URL}/api/addcustomerplan`;
    var body = new URLSearchParams(values);
    // console.log('body : - ', body)

    return (dispatch) => {
        postMultipartRequest(url, body, session, dispatch, (response) => {
            // console.log('response : - ', response)
            
            if(response.success == 1) {
                callback({success: 1, data: response.resource});
            }
            else {
                callback({success: 0});
            }
        }, (error) => {
            // callback({success: 0, error: error});
        });
    };
}

export function openCustomerPaymentModal(obj) {
    return { type: CUSTOMER_PAYMENT_MODEL, payload: obj};
}

export function customerPaymentReceived(session, values, callback) {
    var url = `${BASE_URL}/api/customerpaymentreceived`;
    var body = new URLSearchParams(values);
    // console.log('body : - ', body)

    return (dispatch) => {
        postMultipartRequest(url, body, session, dispatch, (response) => {
            // console.log('response : - ', response)
            
            if(response.success == 1) {
                callback({success: 1, data: response.resource});
            }
            else if(response.success == 2) {
                callback({success: 2, data: response.resource});
            }
            else {
                callback({success: 0});
            }
        }, (error) => {
            // callback({success: 0, error: error});
        });
    };
}

export function openCustomerApproveModal(obj) {
    return { type: CUSTOMER_APPROVE_MODAL, payload: obj};
}

export function approveCustomer(session, values, callback) {
    var url = `${BASE_URL}/api/approvecustomer`;
    var body = new URLSearchParams(values);

    return (dispatch) => {
        postMultipartRequest(url, body, session, dispatch, (response) => {
            // console.log('response : - ', response)
            
            if(response.success == 1) {
                callback({success: 1, data: response.resource});
            }
            else {
                callback({success: 0});
            }
        }, (error) => {
            // callback({success: 0, error: error});
        });
    }
}

export function selectedCustomerDetails(customer) {
    // console.log('customer', customer)
    return (dispatch) => {
        dispatch({type: SELECTED_CUSTOMER, payload: customer});
    }
}

export function fetchSingleCustomer(session, id, callback) {
    var url = `${BASE_URL}/api/customer/${id}`;

    return (dispatch) => {
        getRequest(url, session, dispatch, (response) => {
            // console.log('response : - ', response)
            dispatch({type: SELECTED_CUSTOMER, payload: {details: response.resource[0]}});
            callback({success: 1});
        }, (error) => {
            // callback({success: 0, error: error});
        });
    };
}

export function fetchSingleCustomerPayments(session, planid, callback) {
    var url = `${BASE_URL}/api/customerpayments/${planid}`;

    return (dispatch) => {
        getRequest(url, session, dispatch, (response) => {
            // console.log('response : - ', response)
            dispatch({type: SINGLE_CUSTOMER_PAYMENTS, payload: {data: response.resource}});
            callback({success: 1});
        }, (error) => {
            // callback({success: 0, error: error});
        });
    };
}