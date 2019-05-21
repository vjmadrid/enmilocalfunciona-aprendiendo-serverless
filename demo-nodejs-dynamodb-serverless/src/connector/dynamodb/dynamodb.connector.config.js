'use strict';
//Imports
const AWS = require('aws-sdk');
const DynamodbConnectorConstant = require('./dynamodb.connector.constant');

// Global configuration
const NODE_ENV = process.env.NODE_ENV;
const IS_OFFLINE = eval(process.env.IS_OFFLINE);

console.log('info', '[CONFIG] [GLOBAL] NODE_ENV : '+ NODE_ENV);
console.log('info', '[CONFIG] [GLOBAL] IS_OFFLINE : '+ IS_OFFLINE);

// Global Dynamodb configuration
const DYNAMODB_TABLE_DEFAULT = "local-example-table"
const DYNAMODB_TABLE = process.env.DYNAMODB_TABLE || DYNAMODB_TABLE_DEFAULT

console.log('info', '[CONFIG] [DYNAMODB] Table : '+ DYNAMODB_TABLE);

let dynamodb_options = {};
if (IS_OFFLINE) {
  // Local Dynamodb configuration
  let CONFIG_LOCAL_DYNAMODB = process.env.CONFIG_LOCAL_DYNAMODB || DynamodbConnectorConstant.CONFIG_LOCAL_DYNAMODB_DEFAULT
  console.log('info', '[CONFIG] [TEST] [DYNAMODB] Mode : '+ CONFIG_LOCAL_DYNAMODB);

  if (CONFIG_LOCAL_DYNAMODB == "undefined"){
    console.error('CONFIG_LOCAL_DYNAMODB not defined for ENV : '+NODE_ENV);
  }

  dynamodb_options = DynamodbConnectorConstant.CONFIG_LOCAL_DYNAMODB_OPTIONS[CONFIG_LOCAL_DYNAMODB];

  if (!dynamodb_options) {
    throw "NO Dynamodb Options";
  }   
}

const dynamodb_instance = new AWS.DynamoDB.DocumentClient(dynamodb_options || {});

module.exports = {
  DYNAMODB_TABLE,
  dynamodb_instance
}

