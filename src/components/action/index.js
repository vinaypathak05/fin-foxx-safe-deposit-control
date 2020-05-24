import axios from 'axios';
import {BASE_URL} from '../Common/constant';

export var LOGIN = 'LOGIN';
export var LOGIN_USER_DETAILS = 'LOGIN_USER_DETAILS';

export function mainLogin(values, session, callback) {
    //This function is used on Login screen only

    var config = {
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        }
    };

    // var config = {
    //     'content-type': 'application/x-www-form-urlencoded'
    // }

    const params = new URLSearchParams();
    params.append('email', values.email);
    params.append('password', values.password);
    
    var url = `${BASE_URL}/api/adminLogin`;
    var response = axios.post(url, params, config);
    
    return (dispatch) => {
        
        response.then(({data}) => {
            // console.log('login data :- ', data)
            if(data.success === 2) {
                callback({success: 2});
            }
            else if(data.success === 0) {
                callback({success: 0, message: data.message});
            }
            else {
                data.resource[0].username = data.resource[0].firstname+' '+data.resource[0].lastname;

                dispatch({type: LOGIN, payload: true});
                dispatch({type: LOGIN_USER_DETAILS, payload: data.resource[0]});
                callback({success: 1});
            }
        }).catch((error) => {
            callback({success: 0, message: error});
        });

        // axios({
        //     method: 'POST',
        //     url: url,
        //     data: params,
        //     headers: headers
        // })
        // .then(function (response) {
        //     //handle success
        //     console.log('response : - ', response);
        // })
        // .catch(function (response) {
        //     //handle error
        //     console.log('error:- ',  response);
        // });
    }
}

export function resetStore() {
    return(dispatch)=>{
        dispatch({type: LOGIN, payload: false});
        dispatch({type: LOGIN_USER_DETAILS, payload: {}});
    }
}

export function logout() {
    return (dispatch) => {
        dispatch({type: LOGIN, payload: false});
        dispatch({type: LOGIN_USER_DETAILS, payload: {}});
    }
}