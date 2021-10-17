import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { loadState } from "./localStorage";
import { ErrorBarReducer } from "../components/Common/errorbar";
import { LOGIN, LOGIN_USER_DETAILS } from "../components/action";
import {
  allAgentsList,
  agentsList,
  agentCreateModal,
  editAgent,
  uploadedAgentKycFiles,
  agentApproveModal,
  selectedAgent,
  agentWalletRecharges,
  agentCustomers,
  agentWalletRechrgeModal,
} from "../components/agents/reducer";
import {
  customersList,
  customerCreateModal,
  editCustomer,
  customerKYCFiles,
  customerPaymentReceiveModal,
  customerRewardModal,
  customerApproveModal,
  selectedCustomer,
  singelCustomerPayments,
  openCurrentPlan,
  currentPlanTransactions,
  customerNewPlanModal,
} from "../components/customers/reducer";
import {
  allPlansList,
  plansList,
  planCreateModal,
} from "../components/plans/reducer";
import { trackedPlans } from "../components/trackcustomerplan/reducers";

var LoginReducer = (state = {}, action) => {
  // need to change it to false
  let loadstate = loadState();
  // console.log('loadstate...login :- ', loadstate)

  if (loadstate === undefined) {
    state = { isLoggedIn: false };
  } else {
    state = { isLoggedIn: loadstate.isLoggedIn };
  }

  if (action.type === LOGIN) {
    state.isLoggedIn = action.payload;
  }
  return state.isLoggedIn;
};

var TokensReducer = (state = {}, action) => {
  var loadstate = loadState();

  if (loadstate === undefined || state === undefined) {
    state = {
      session: {
        emailid: "",
        userid: "",
        usertype: "",
        username: "",
        firstname: "",
        lastname: "",
        status: "",
      },
    };
  } else {
    state = {
      session: {
        emailid: state.emailid,
        userid: state.userid,
        usertype: state.usertype,
        username: state.username,
        firstname: state.firstname,
        lastname: state.lastname,
        status: state.status,
      },
    };
  }

  if (action.type === LOGIN_USER_DETAILS) {
    if (action.payload.adminid) {
      state.session.userid = action.payload.adminid;
      state.session.emailid = action.payload.email;
      state.session.usertype = action.payload.admintype;
      state.session.username = action.payload.username;
      state.session.firstname = action.payload.firstname;
      state.session.lastname = action.payload.lastname;
      state.session.status = action.payload.status;
    } else {
      state = {
        session: {
          emailid: "",
          userid: "",
          usertype: "",
          username: "",
          firstname: "",
          lastname: "",
          status: "",
        },
      };
    }
  }

  return state.session;
};

var rootReducer = combineReducers({
  form: formReducer,
  isLoggedIn: LoginReducer,
  session: TokensReducer,
  errorBar: ErrorBarReducer,

  // Agents
  allAgentsList: allAgentsList,
  agentsList: agentsList,
  agentCreateModal: agentCreateModal,
  editAgent: editAgent,
  uploadedAgentKycFiles: uploadedAgentKycFiles,
  agentApproveModal: agentApproveModal,
  selectedAgent: selectedAgent,
  agentWalletRecharges: agentWalletRecharges,
  agentCustomers: agentCustomers,
  agentWalletRechrgeModal: agentWalletRechrgeModal,

  // Customers
  customersList: customersList,
  customerCreateModal: customerCreateModal,
  editCustomer: editCustomer,
  customerKYCFiles: customerKYCFiles,
  customerPaymentReceiveModal: customerPaymentReceiveModal,
  customerRewardModal: customerRewardModal,
  customerApproveModal: customerApproveModal,
  selectedCustomer: selectedCustomer,
  singelCustomerPayments: singelCustomerPayments,
  openCurrentPlan: openCurrentPlan,
  currentPlanTransactions: currentPlanTransactions,
  customerNewPlanModal: customerNewPlanModal,

  // Plans
  allPlansList: allPlansList,
  plansList: plansList,
  planCreateModal: planCreateModal,

  // Track Customer Plan
  trackedPlans: trackedPlans,
});

export default rootReducer;
