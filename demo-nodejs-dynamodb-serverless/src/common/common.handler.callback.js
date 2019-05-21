'use strict';

function genericResponseCallback(type, value) {
  return {
      statusCode: type,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(value)
  }
};

function genericErrorCallback(errorCode, errorMessage) {
  console.error(errorMessage);
  return {
    statusCode: errorCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({"error": errorMessage})
  };
};
  
module.exports = {
    genericResponseCallback,
    genericErrorCallback
}