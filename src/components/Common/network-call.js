import axios from 'axios';
import axiosFileupload from 'axios-fileupload';

import { getHeaders,getImageHeaders,getMultiPartHeaders,getHeadersWithParams } from './common-utils';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { logout } from '../action/index';

export function getRequest(url, session=null, dispatch, successCallback, errorCallback) {
  
  if(dispatch){
    dispatch(hideLoading());
    dispatch(showLoading());
  }

  _handleResponse(axios.get(url, getHeaders(session)), dispatch, session, successCallback, errorCallback);
}

export function getCustomRequest(url, params, session, dispatch, successCallback, errorCallback) {
  if(dispatch){
    dispatch(hideLoading());
    dispatch(showLoading());
  }
  _handleResponse(axios.get(url, getHeadersWithParams(session,params)), dispatch, session, successCallback, errorCallback);
}


export function postMultipartRequest(url, postBody, session, dispatch, successCallback, errorCallback) {
  if(dispatch){
    dispatch(hideLoading());
    dispatch(showLoading());
  }
  _handleResponse(axios.post(url, postBody, getMultiPartHeaders(session)), dispatch, session, successCallback, errorCallback);
}

export function postRequest(url, postBody, session, dispatch, successCallback, errorCallback) {
  if(dispatch){
    dispatch(hideLoading());
    dispatch(showLoading());
  }
  _handleResponse(axios.post(url, postBody, getHeaders(session)), dispatch, session, successCallback, errorCallback);
}

export function patchRequest(url, patchBody, session, dispatch, successCallback, errorCallback) {
  dispatch(hideLoading());
  dispatch(showLoading());
  _handleResponse(axios.patch(url, patchBody, getHeaders(session)), dispatch, session, successCallback, errorCallback);
}

export function deleteRequest(url, session, dispatch, successCallback, errorCallback) {
  if(dispatch){
    dispatch(hideLoading());
    dispatch(showLoading());
  }
  _handleResponse(axios.delete(url, getHeaders(session)), dispatch, session, successCallback, errorCallback);
}

export function deleteBulkRequest(url, session, deleteBody, dispatch, successCallback, errorCallback) {
  if(dispatch){
    dispatch(hideLoading());
    dispatch(showLoading());
  }
  _handleResponse(axios.delete(url, {data: deleteBody,headers:getHeaders(session)}), dispatch, session, successCallback, errorCallback);
}

export function fileUploadRequest(url, fileData, dispatch, successCallback, errorCallback) {
  if(dispatch){
    dispatch(hideLoading());
    dispatch(showLoading());
  }
  _handleResponse(axiosFileupload(url, fileData), dispatch, successCallback, errorCallback);
}

export function uploadEncodedFile(url, session, filedata, dispatch, successCallback, errorCallback) {
  if(dispatch){
    dispatch(hideLoading());
    dispatch(showLoading());
  }
  _handleFileResponse(axios.post(url, filedata,getImageHeaders(session)), dispatch, successCallback, errorCallback);
}

function _handleFileResponse(response, dispatch, successCallback, errorCallback){
  response.then(
    (response)=>{
      if(dispatch)
        dispatch(hideLoading());
      successCallback(response.data.resource[0]);
    },
    (error)=>{
      if(dispatch)
        dispatch(hideLoading());
      errorCallback(error);
    }
  );
}

function _handleResponse(response, dispatch, session = null, successCallback, errorCallback) {
  // console.log('successCallback :- ', successCallback)
  // console.log('errorCallback :- ', errorCallback)


  // console.log('response :  - ', response)
  response.then(({data}) => {
    // console.log('data :  - ', data)
    // console.log('dispatch :  - ', dispatch)
    if(dispatch)
      dispatch(hideLoading());

    successCallback(data);
  }).catch((error) => {
    // console.log('error :  - ', error)
    if(dispatch)
      dispatch(hideLoading());
      
    // if (error.response && (error.response.status === 401 || error.response.status === 403)) {
    //   if(dispatch){
    //     if (session) dispatch(logout(session));
    //     console.log('error.....api call')
    //   }
    // } else {
    //   if(error.response)
    //     errorCallback(error.response.data.error);
    //   else
        errorCallback(error);
    // }
  });
}
