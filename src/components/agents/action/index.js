import {getRequest, postRequest, patchRequest} from '../../Common/network-call';
import {BASE_URL,itemCount} from '../../Common/constant';


export const AGENTS_LISTS = 'AGENTS_LISTS';
export const AGENTS_CREATE_MODEL = 'AGENTS_CREATE_MODEL';

export function fetchAgents(session, pageCount = 0, callback) {
    var perPage = itemCount;
    var offset = pageCount <= 1 ? 0 : (pageCount-1) * perPage;
    var offSetQuery = `&limit=${perPage}&offset=${offset}`;

    var url = `${BASE_URL}/api/agents?include_count=true&order=createdon&by=DESC${offSetQuery}`;
    
    return (dispatch) => {
        getRequest(url, session, dispatch, (response) => {
            // console.log('response : - ', response)
            dispatch({type:AGENTS_LISTS, payload: {data:response.resource, count:response.count ? response.count : ''}});
            callback({success: 1});
        }, (error) => {
            // callback({success: 0, error: error});
        });
    };
}

export function openAgentCreateModal(obj) {
    return { type: AGENTS_CREATE_MODEL, payload: obj};
}