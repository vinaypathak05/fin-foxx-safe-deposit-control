import { TRACKED_CUSTOMER_PLANS_LISTS } from "../actions";

export function trackedPlans(state = [], action) {
  if (action.type === TRACKED_CUSTOMER_PLANS_LISTS) {
    return action.payload;
  }
  return state;
}
