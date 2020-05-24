import {SHOWBAR,HIDEBAR,BARSHOWN,BARHIDDEN} from './actions';

var initialState = {
  message: '',
  toShowError: false,
  toHideError: false
}

export function ErrorBarReducer(state=initialState,action){
  //debugger;
  switch (action.type) {
    case SHOWBAR:
      return {toShowError:true,message:action.payload.message,isError:action.payload.isError};
    case HIDEBAR:
      return {toHideError:true,isError:state.isError};
    default:
      return state;
  }
}
