import {
  CUSTOMERS_LISTS,
  CUSTOMER_CREATE_MODEL,
  EDIT_CUSTOMER,
  UPDATE_CUSTOMER_KYC_FILES,
  CUSTOMER_PAYMENT_MODEL,
  CUSTOMER_REWARD_MODEL,
  CUSTOMER_APPROVE_MODAL,
  SELECTED_CUSTOMER,
  SINGLE_CUSTOMER_PAYMENTS,
  OPEN_CUSTOMER_CURRENT_PLAN,
  CUSTOMER_CURRENT_PLAN_TRANSACTIONS,
  CUSTOMER_NEW_PLAN_MODAL,
} from "../action";

export function customersList(state = {}, action) {
  if (action.type === CUSTOMERS_LISTS) {
    return action.payload;
  }
  return state;
}

export function customerCreateModal(state = {}, action) {
  if (action.type === CUSTOMER_CREATE_MODEL) {
    return action.payload;
  }
  return state;
}

export function editCustomer(state = {}, action) {
  if (action.type === EDIT_CUSTOMER) {
    return action.payload;
  }
  return state;
}

export function customerKYCFiles(state = {}, action) {
  if (action.type === UPDATE_CUSTOMER_KYC_FILES) {
    return action.payload;
  }
  return state;
}

export function customerPaymentReceiveModal(state = {}, action) {
  if (action.type === CUSTOMER_PAYMENT_MODEL) {
    return action.payload;
  }
  return state;
}

export function customerRewardModal(state = {}, action) {
  if (action.type === CUSTOMER_REWARD_MODEL) {
    return action.payload;
  }
  return state;
}

export function customerApproveModal(state = {}, action) {
  if (action.type === CUSTOMER_APPROVE_MODAL) {
    return action.payload;
  }
  return state;
}

export function selectedCustomer(state = {}, action) {
  if (action.type === SELECTED_CUSTOMER) {
    return action.payload;
  }
  return state;
}

export function singelCustomerPayments(state = {}, action) {
  if (action.type === SINGLE_CUSTOMER_PAYMENTS) {
    return action.payload;
  }
  return state;
}

export function openCurrentPlan(state = {}, action) {
  if (action.type === OPEN_CUSTOMER_CURRENT_PLAN) {
    return action.payload;
  }
  return state;
}

export function currentPlanTransactions(state = {}, action) {
  if (action.type === CUSTOMER_CURRENT_PLAN_TRANSACTIONS) {
    return action.payload;
  }
  return state;
}

export function customerNewPlanModal(state = {}, action) {
  if (action.type === CUSTOMER_NEW_PLAN_MODAL) {
    return action.payload;
  }
  return state;
}
