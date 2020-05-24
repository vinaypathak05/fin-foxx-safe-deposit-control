export var getHeaders = session => ({
  headers: {
    'content-type': 'application/json; charset=utf-8',
  }
});

export var getMultiPartHeaders = session => ({
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});

export var getHeadersWithParams = (session,params) => ({
  headers: {
    'Content-Type': 'multipart/form-data'
  },
  params:params
});

export var getImageHeaders = session => ({
  headers: {
    'contentType': 'application/json; charset=utf-8'
  }
});