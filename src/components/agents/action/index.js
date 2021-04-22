import {
  getRequest,
  postRequest,
  postMultipartRequest,
  patchRequest,
} from "../../Common/network-call";
import { BASE_URL, itemCount } from "../../Common/constant";

export const ALL_AGENTS_LISTS = "ALL_AGENTS_LISTS";
export const AGENTS_LISTS = "AGENTS_LISTS";
export const AGENTS_CREATE_MODAL = "AGENTS_CREATE_MODAL";
export const UPDATE_AGENTS_KYC_FILES = "UPDATE_AGENTS_KYC_FILES";
export const AGENTS_APPROVE_MODAL = "AGENTS_APPROVE_MODAL";
export const SELECTED_AGENT = "SELECTED_AGENT";
export const AGENT_WALLET_RECHARGES = "AGENT_WALLET_RECHARGES";
export const AGENT_CUSTOMERS = "AGENT_CUSTOMERS";
export const AGENTS_WALLET_RECHARGE_MODAL = "AGENTS_WALLET_RECHARGE_MODAL";

export function fetchAllAgents(session, callback) {
  var url = `${BASE_URL}/api/agents?include_count=true&order=createdon&by=DESC`;

  return (dispatch) => {
    getRequest(
      url,
      session,
      dispatch,
      (response) => {
        // console.log('response : - ', response)
        dispatch({
          type: ALL_AGENTS_LISTS,
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

export function fetchAgents(session, pageCount = 0, callback) {
  var perPage = itemCount;
  var offset = pageCount <= 1 ? 0 : (pageCount - 1) * perPage;
  var offSetQuery = `&limit=${perPage}&offset=${offset}`;

  var url = `${BASE_URL}/api/agents?include_count=true&order=createdon&by=DESC${offSetQuery}`;

  return (dispatch) => {
    getRequest(
      url,
      session,
      dispatch,
      (response) => {
        // console.log('response : - ', response)
        dispatch({
          type: AGENTS_LISTS,
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

export function searchAgents(session, search, pageCount = 0, callback) {
  var perPage = itemCount;
  var offset = pageCount <= 1 ? 0 : (pageCount - 1) * perPage;
  var offSetQuery = `&limit=${perPage}&offset=${offset}`;
  let searchVal = encodeURI(search);

  var url = `${BASE_URL}/api/searchagents?search=${searchVal}&include_count=true&order=createdon&by=DESC${offSetQuery}`;

  return (dispatch) => {
    getRequest(
      url,
      session,
      dispatch,
      (response) => {
        // console.log('response : - ', response)
        dispatch({
          type: AGENTS_LISTS,
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

export function openAgentCreateModal(obj) {
  return { type: AGENTS_CREATE_MODAL, payload: obj };
}

export function agentKycFiles(files) {
  return (dispatch) => {
    dispatch({ type: UPDATE_AGENTS_KYC_FILES, payload: files });
  };
}

export function addAgent(session, values, callback) {
  var url = `${BASE_URL}/api/addagent`;
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

export function openAgentApproveModal(obj) {
  return { type: AGENTS_APPROVE_MODAL, payload: obj };
}

export function approveAgent(session, values, callback) {
  var url = `${BASE_URL}/api/approveagent`;
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

export function activateDeactivateAgent(session, values, callback) {
  var url = `${BASE_URL}/api/activatedeactivateagent`;
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

export function deleteAgent(session, values, callback) {
  var url = `${BASE_URL}/api/deleteagent`;
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

export function selectedAgentDetails(agent) {
  // console.log('agent', agent)
  return (dispatch) => {
    dispatch({ type: SELECTED_AGENT, payload: agent });
  };
}

export function fetchSingleAgent(session, id, callback) {
  var url = `${BASE_URL}/api/agent/${id}`;

  return (dispatch) => {
    getRequest(
      url,
      session,
      dispatch,
      (response) => {
        // console.log('response : - ', response)
        dispatch({
          type: SELECTED_AGENT,
          payload: { agentDetails: response.resource[0] },
        });
        callback({ success: 1 });
      },
      (error) => {
        // callback({success: 0, error: error});
      }
    );
  };
}

export function fetchSingleAgentWalletRecharges(
  session,
  id,
  pageCount = 0,
  callback
) {
  var perPage = 10;
  var offset = pageCount <= 1 ? 0 : (pageCount - 1) * perPage;

  var body = new URLSearchParams();
  body.append("agentid", id);
  body.append("limit", perPage);
  body.append("offset", offset);

  var url = `${BASE_URL}/api/agentwalletrecharges`;

  return (dispatch) => {
    postMultipartRequest(
      url,
      body,
      session,
      dispatch,
      (response) => {
        // console.log('response : - ', response)
        dispatch({
          type: AGENT_WALLET_RECHARGES,
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

export function fetchSingleAgentCustomers(
  session,
  id,
  pageCount = 0,
  callback
) {
  var perPage = 10;
  var offset = pageCount <= 1 ? 0 : (pageCount - 1) * perPage;

  var body = new URLSearchParams();
  body.append("agentid", id);
  body.append("limit", perPage);
  body.append("offset", offset);
  body.append("include_count", true);

  var url = `${BASE_URL}/api/agentcustomers`;

  return (dispatch) => {
    postMultipartRequest(
      url,
      body,
      session,
      dispatch,
      (response) => {
        // console.log('response : - ', response)
        dispatch({
          type: AGENT_CUSTOMERS,
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

export function openWalletRechargeModal(obj) {
  return { type: AGENTS_WALLET_RECHARGE_MODAL, payload: obj };
}

export function agentWalletRecharge(session, values, callback) {
  var url = `${BASE_URL}/api/agentwalletrecharge`;
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
