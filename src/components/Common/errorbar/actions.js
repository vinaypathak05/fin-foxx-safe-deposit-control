export var SHOWBAR = 'errorbar/SHOW';
export var HIDEBAR = 'errorbar/HIDE';


export function showError(message){
  return{
    type:SHOWBAR,
    payload:{message:message, isError:true}
  };
}

export function showSuccess(message){
  return{
    type:SHOWBAR,
    payload:{message:message, isError:false}
  };
}


export function hideError(error){
  return{
    type:HIDEBAR,
    payload:{isError:error}
  }
}
