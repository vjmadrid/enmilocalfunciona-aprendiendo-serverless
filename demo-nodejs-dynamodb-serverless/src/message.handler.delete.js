'use strict';
//Imports
const Boom = require('boom');

const DynamodbConnectorCallback = require('./connector/dynamodb/dynamodb.connector.callback');
const DynamodbConnectorConfig = require('./connector/dynamodb/dynamodb.connector.config');

const DynamodbConnectorService = require('./connector/dynamodb/dynamodb.connector.service').DynamodbConnectorService;

//Attributes
let dynamodbService = new DynamodbConnectorService(DynamodbConnectorConfig.dynamodb_instance);

//Handler Function
module.exports.deleteMessage = (event, context, callback) => {
  console.log('info', '[HANDLER] [MESSAGE] deleteMessage -> id :: '+ event.pathParameters.id );
  
  const params = {
    TableName: DynamodbConnectorConfig.DYNAMODB_TABLE,
      Key: {
        id: event.pathParameters.id,
      }
  };

  let idDeletedResponse = "{ id : "+event.pathParameters.id+"}"
  DynamodbConnectorConfig.dynamodb_instance.delete(params, (error, result) => {
    callback(null, DynamodbConnectorCallback.defaultDynamodbCallbackPromise(error,idDeletedResponse))
  });

};

//Handler Function
module.exports.deleteMessageService = (event, context, callback) => {
  console.log('info', '[HANDLER] [MESSAGE] deleteMessageService -> id :: '+ event.pathParameters.id );
  
  dynamodbService.delete(DynamodbConnectorConfig.DYNAMODB_TABLE, event.pathParameters.id)
  .then((responseCallback)=> {
    callback(null, responseCallback)
  })
  .catch((err) => {
      console.log('info', 'ERROR' );
      throw Boom.badRequest(err);
  });

};

