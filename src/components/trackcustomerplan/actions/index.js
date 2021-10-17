import {
  getRequest,
  postRequest,
  postMultipartRequest,
  patchRequest,
} from "../../Common/network-call";
import { BASE_URL, itemCount } from "../../Common/constant";

export const TRACKED_CUSTOMER_PLANS_LISTS = "TRACKED_CUSTOMER_PLANS_LISTS";

export function trackPlan(session, values, callback) {
  var url = `${BASE_URL}/api/trackcustomerplan`;
  var body = new URLSearchParams(values);
  // console.log('body : - ', body)

  return (dispatch) => {
    postMultipartRequest(
      url,
      body,
      session,
      dispatch,
      (response) => {
        // console.log("response : - ", response);

        if (response.success == 1) {
          // dispatch({
          //   action: TRACKED_CUSTOMER_PLANS_LISTS,
          //   payload: { data: response.resource },
          // });
          callback({ success: 1, data: response.resource });
        } else if (response.success == 2) {
          // dispatch({
          //   action: TRACKED_CUSTOMER_PLANS_LISTS,
          //   payload: { data: [] },
          // });
          callback({ success: 2, data: response.resource });
        } else {
          // dispatch({
          //   action: TRACKED_CUSTOMER_PLANS_LISTS,
          //   payload: { data: [] },
          // });
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
