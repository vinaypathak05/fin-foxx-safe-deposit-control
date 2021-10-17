import {
  getRequest,
  postRequest,
  postMultipartRequest,
  patchRequest,
} from "../../Common/network-call";
import { BASE_URL, itemCount } from "../../Common/constant";

export const ALL_PLANS_LISTS = "ALL_PLANS_LISTS";
export const PLANS_LISTS = "PLANS_LISTS";
export const PLANS_CREATE_MODEL = "PLANS_CREATE_MODEL";

export function fetchAllPlans(session, callback) {
  var url = `${BASE_URL}/api/plans?include_count=true&order=createdon&by=DESC`;

  return (dispatch) => {
    getRequest(
      url,
      session,
      dispatch,
      (response) => {
        // console.log('response : - ', response)
        dispatch({
          type: ALL_PLANS_LISTS,
          payload: {
            data: response.resource,
            count: response.count ? response.count : "",
          },
        });
        callback({ success: 1 });
      },
      (error) => {
        // callback({success: 0, error: error});
      }
    );
  };
}

export function fetchPlans(session, pageCount = 0, callback) {
  var perPage = itemCount;
  var offset = pageCount <= 1 ? 0 : (pageCount - 1) * perPage;
  var offSetQuery = `&limit=${perPage}&offset=${offset}`;

  var url = `${BASE_URL}/api/plans?include_count=true&order=createdon&by=DESC${offSetQuery}`;

  return (dispatch) => {
    getRequest(
      url,
      session,
      dispatch,
      (response) => {
        // console.log('response : - ', response)
        dispatch({
          type: PLANS_LISTS,
          payload: {
            data: response.resource,
            count: response.count ? response.count : "",
          },
        });
        callback({ success: 1 });
      },
      (error) => {
        // callback({success: 0, error: error});
      }
    );
  };
}

export function searchPlans(session, search, pageCount = 0, callback) {
  var perPage = itemCount;
  var offset = pageCount <= 1 ? 0 : (pageCount - 1) * perPage;
  var offSetQuery = `&limit=${perPage}&offset=${offset}`;
  let searchVal = encodeURI(search);

  var url = `${BASE_URL}/api/searchplans?search=${searchVal}&include_count=true&order=createdon&by=DESC${offSetQuery}`;

  return (dispatch) => {
    getRequest(
      url,
      session,
      dispatch,
      (response) => {
        // console.log('response : - ', response)
        dispatch({
          type: PLANS_LISTS,
          payload: {
            data: response.resource,
            count: response.count ? response.count : "",
          },
        });
        callback({ success: 1 });
      },
      (error) => {
        // callback({success: 0, error: error});
      }
    );
  };
}

export function openPlanCreateModal(obj) {
  return { type: PLANS_CREATE_MODEL, payload: obj };
}

export function validatedPlanName(session, values, callback) {
  var url = `${BASE_URL}/api/validateplanname?planname=${values.planname}`;

  return (dispatch) => {
    getRequest(
      url,
      session,
      dispatch,
      (response) => {
        // console.log('response : - ', response)
        if (
          response.success == 1 &&
          response.resource &&
          response.resource.length == 0
        ) {
          callback({ success: 1 });
        } else {
          callback({ success: 2 });
        }
      },
      (error) => {
        // callback({success: 0, error: error});
      }
    );
  };
}

export function addNewPlan(session, values, callback) {
  var url = `${BASE_URL}/api/addPlan`;
  var body = new URLSearchParams(values);
  // console.log('body : - ', body)

  return (dispatch) => {
    postMultipartRequest(
      url,
      body,
      session,
      dispatch,
      (response) => {
        // console.log('response : - ', response)

        if (response.success == 1) {
          callback({ success: 1, data: response.resource });
        } else if (response.success == 2) {
          callback({ success: 2, data: response.resource });
        } else {
          callback({ success: 0 });
        }
      },
      (error) => {
        // callback({success: 0, error: error});
      }
    );
  };
}

export function activateDeactivatePlan(session, values, callback) {
  var url = `${BASE_URL}/api/activatedeactivateplan`;
  var body = new URLSearchParams(values);

  return (dispatch) => {
    postMultipartRequest(
      url,
      body,
      session,
      dispatch,
      (response) => {
        // console.log('response : - ', response)

        if (response.success == 1) {
          callback({ success: 1, data: response.resource });
        } else {
          callback({ success: 0 });
        }
      },
      (error) => {
        // callback({success: 0, error: error});
      }
    );
  };
}
