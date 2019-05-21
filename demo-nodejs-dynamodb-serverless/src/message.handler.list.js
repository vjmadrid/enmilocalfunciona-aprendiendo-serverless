'use strict';
//Imports
const Boom = require('boom');

const DynamodbConnectorCallback = require('./connector/dynamodb/dynamodb.connector.callback');
const DynamodbConnectorConfig = require('./connector/dynamodb/dynamodb.connector.config');

const DynamodbConnectorService = require('./connector/dynamodb/dynamodb.connector.service').DynamodbConnectorService;

//Attributes
let dynamodbService = new DynamodbConnectorService(DynamodbConnectorConfig.dynamodb_instance);

//Handler Function
exports.listMessages = (event, context, callback) => {
  console.log('info', '[HANDLER] [MESSAGE] listMessages ...');

  const params = {
    TableName: DynamodbConnectorConfig.DYNAMODB_TABLE,
  };

  DynamodbConnectorConfig.dynamodb_instance.scan(params, (error, result) => {
    callback(null, DynamodbConnectorCallback.defaultDynamodbCallbackPromise(error,result))
  });
};

//Handler Function
exports.listMessagesService = (event, context, callback) => {
  console.log('info', '[HANDLER] [MESSAGE] listMessagesService ...');

  dynamodbService.list(DynamodbConnectorConfig.DYNAMODB_TABLE)
  .then((responseCallback)=> {
    callback(null, responseCallback)
  })
  .catch((err) => {
      console.log('info', 'ERROR' );
      throw Boom.badRequest(err);
  });
};
