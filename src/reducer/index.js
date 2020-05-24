import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {loadState} from './localStorage';
import {ErrorBarReducer} from '../components/Common/errorbar';
import {LOGIN,LOGIN_USER_DETAILS} from '../components/action';
import {agentsList,agentCreateModal} from '../components/agents/reducer';

var LoginReducer = (state = {}, action) =>{  // need to change it to false
    let loadstate = loadState();
    // console.log('loadstate...login :- ', loadstate)

    if (loadstate === undefined) {
        state = { isLoggedIn: false}
    }
    else {
        state = {isLoggedIn: loadstate.isLoggedIn}
    }

    if (action.type === LOGIN) {
        state.isLoggedIn = action.payload;
    }
    return state.isLoggedIn;
}

var TokensReducer = (state = {}, action) => {
    var loadstate = loadState();  
  
    if (loadstate === undefined || state === undefined) {
        state = {
            session: {
                emailid: '',
                userid: '',
                usertype: '',
                username: '',
                firstname: '',
                lastname: '',
                status: ''
            }
        };
    }
    else {
        state = {
            session: {
                emailid: state.emailid,
                userid: state.userid,
                usertype: state.usertype,
                username: state.username,
                firstname: state.firstname,
                lastname: state.lastname,
                status: state.status
            }
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
        }
        else {
            state = {
                session: {
                    emailid: '',
                    userid: '',
                    usertype: '',
                    username: '',
                    firstname: '',
                    lastname: '',
                    status: ''
                }
            };
        }
    }

    return state.session;
}

var rootReducer = combineReducers({
    form: formReducer,
    isLoggedIn: LoginReducer,
    session: TokensReducer,
    errorBar: ErrorBarReducer,

    // Agents
    agentsList: agentsList,
    agentCreateModal: agentCreateModal,
});

export default rootReducer;