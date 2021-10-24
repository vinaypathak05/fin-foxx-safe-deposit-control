import {
  ALL_AGENTS_LISTS,
  AGENTS_LISTS,
  AGENTS_CREATE_MODAL,
  EDIT_AGENT,
  UPDATE_AGENTS_KYC_FILES,
  AGENTS_APPROVE_MODAL,
  SELECTED_AGENT,
  AGENT_WALLET_RECHARGES,
  AGENT_CUSTOMERS,
  AGENTS_WALLET_RECHARGE_MODAL,
  AGENTS_RECHARGE_DOWNLOAD_MODAL,
} from "../action";

export function allAgentsList(state = {}, action) {
  if (action.type === ALL_AGENTS_LISTS) {
    return action.payload;
  }
  return state;
}

export function agentsList(state = {}, action) {
  if (action.type === AGENTS_LISTS) {
    return action.payload;
  }
  return state;
}

export function agentCreateModal(state = {}, action) {
  if (action.type === AGENTS_CREATE_MODAL) {
    return action.payload;
  }
  return state;
}

export function editAgent(state = {}, action) {
  if (action.type === EDIT_AGENT) {
    return action.payload;
  }
  return state;
}

export function uploadedAgentKycFiles(state = {}, action) {
  if (action.type === UPDATE_AGENTS_KYC_FILES) {
    return action.payload;
  }
  return state;
}

export function agentApproveModal(state = {}, action) {
  if (action.type === AGENTS_APPROVE_MODAL) {
    return action.payload;
  }
  return state;
}

export function selectedAgent(state = {}, action) {
  if (action.type === SELECTED_AGENT) {
    return action.payload;
  }
  return state;
}

export function agentWalletRecharges(state = {}, action) {
  if (action.type === AGENT_WALLET_RECHARGES) {
    return action.payload;
  }
  return state;
}

export function agentCustomers(state = {}, action) {
  if (action.type === AGENT_CUSTOMERS) {
    return action.payload;
  }
  return state;
}

export function agentWalletRechrgeModal(state = {}, action) {
  if (action.type === AGENTS_WALLET_RECHARGE_MODAL) {
    return action.payload;
  }
  return state;
}

export function agentRechrgeDownloadModal(state = {}, action) {
  if (action.type === AGENTS_RECHARGE_DOWNLOAD_MODAL) {
    return action.payload;
  }
  return state;
}
