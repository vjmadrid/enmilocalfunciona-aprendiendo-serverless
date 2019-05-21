'use strict';
//Imports
const Boom = require('boom');

const CommonHandlerCallback = require('./common/common.handler.callback');
const DynamodbConnectorConfig = require('./connector/dynamodb/dynamodb.connector.config');

const DynamodbConnectorService = require('./connector/dynamodb/dynamodb.connector.service').DynamodbConnectorService;

//Attributes
let dynamodbService = new DynamodbConnectorService(DynamodbConnectorConfig.dynamodb_instance);

//Handler Function
module.exports.deleteAllMessages = (event, context, callback) => {
  console.log('info', '[HANDLER] [MESSAGE] deleteAllMessages');

  const params = {
    TableName: DynamodbConnectorConfig.DYNAMODB_TABLE
  };

  let idDeletedList = [];
  DynamodbConnectorConfig.dynamodb_instance.scan(params, (error, result) => {
    if (error) {
      callback(null, CommonHandlerCallback.genericErrorCallback(error.statusCode || 501, error));
      return;
    }

    result.Items.forEach(function(item,i){
      //console.log(i);
      //console.log(item);

      var paramsDelete = {
          TableName: DynamodbConnectorConfig.DYNAMODB_TABLE,
          Key: {
              id: item.id,
          },
          ReturnValues: 'NONE', // optional (NONE | ALL_OLD)
          ReturnConsumedCapacity: 'NONE', // optional (NONE | TOTAL | INDEXES)
          ReturnItemCollectionMetrics: 'NONE', // optional (NONE | SIZE)
      };
  
      DynamodbConnectorConfig.dynamodb_instance.delete(paramsDelete, function(err, data) {
          if (error) {
            callback(null, CommonHandlerCallback.genericErrorCallback(error.statusCode || 501, error));
            return;
          }
      });

      idDeletedList.push("{ id : "+item.id+"}")
    }); 
      
    callback(null, CommonHandlerCallback.genericResponseCallback(200,{'messages_deleted' : '{'+idDeletedList.toString() +'}' }));
  });

};

//Handler Function
module.exports.deleteAllMessagesService = (event, context, callback) => {
  console.log('info', '[HANDLER] [MESSAGE] deleteAllMessagesService');

  dynamodbService.deleteAll(DynamodbConnectorConfig.DYNAMODB_TABLE)
  .then((responseCallback)=> {
    callback(null, responseCallback)
  })
  .catch((err) => {
      console.log('info', 'ERROR' );
      throw Boom.badRequest(err);
  });

};