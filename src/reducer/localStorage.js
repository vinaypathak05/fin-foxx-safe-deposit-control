export var loadState = () => {
  try {
    var serializedState = localStorage.getItem('state');
    if(serializedState === null) {
      return undefined;
    }
    else {
      return JSON.parse(serializedState);
    }
  }
  catch(err) {
    return undefined;
  }
};
  
export var saveState = (state) => {
  try {
    //Choose what we need to save in local storage to handle refresh
    var stateToSave = {
      isLoggedIn:state.isLoggedIn,
      session:state.session,            
    };
    var serializedState = JSON.stringify(stateToSave);
    localStorage.setItem('state',serializedState);
  }
  catch(err) {}
}