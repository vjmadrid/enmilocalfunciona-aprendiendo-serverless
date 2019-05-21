'use strict';

const CommonHandlerCallback = require('../../common/common.handler.callback');

function defaultDynamodbCallbackPromise(error, data) {
  if (error) {
      return CommonHandlerCallback.genericErrorCallback(error.statusCode || 501, error)
  } 
      
  return  CommonHandlerCallback.genericResponseCallback(200,data);
};

module.exports = {
  defaultDynamodbCallbackPromise
}