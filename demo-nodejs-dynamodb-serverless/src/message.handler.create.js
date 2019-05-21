'use strict';
//Imports
const Boom = require('boom');
const uuid = require('uuid');

const CommonHandlerCallback = require('./common/common.handler.callback');
const DynamodbConnectorConfig = require('./connector/dynamodb/dynamodb.connector.config');

const MessageService = require('./message/message.service').MessageService;
const DynamodbConnectorService = require('./connector/dynamodb/dynamodb.connector.service').DynamodbConnectorService;

//Attributes
let messageService = new MessageService();
let dynamodbService = new DynamodbConnectorService(DynamodbConnectorConfig.dynamodb_instance);

//Functions
function insertDynamoDb(content){
  console.log('info', '[insertDynamoDb] ... Content : '+ content );
  const timestamp = new Date().getTime();

  let contentDataFormatter = JSON.parse(content);

  const params = {
    TableName: DynamodbConnectorConfig.DYNAMODB_TABLE,
    Item: {
      id: uuid.v1(),        
      text: contentDataFormatter,
      checked: false,
      createdAt: timestamp,
      updatedAt: timestamp,
    }
  }; 
  
  return new Promise((resolve, reject) => {
    DynamodbConnectorConfig.dynamodb_instance.put(params, (error) => {
      if (error) {
        resolve(CommonHandlerCallback.genericErrorCallback(error.statusCode || 501, 'Couldn\'t create the message'));
      }
      resolve({'status': 'create', 'message': contentDataFormatter});
    });
  });
} 

//Handler Function
module.exports.createMessage = (event, context, callback) => {
  console.log('info', '[HANDLER] [MESSAGE] createMessage ...');

  messageService.generate(event.body)
  .then((message)=> {
      return insertDynamoDb(message);
  })
  .then((value)=> {
      callback(null, CommonHandlerCallback.genericResponseCallback(200,value));
  })
  .catch((err) => {
      console.log('info', 'ERROR' );
      throw Boom.badRequest(err);
  });
};

//Handler Function
module.exports.createMessageService = (event, context, callback) => {
  console.log('info', '[HANDLER] [MESSAGE] createMessageService ...');

  messageService.generate(event.body)
  .then((message)=> {
      return dynamodbService.insert(DynamodbConnectorConfig.DYNAMODB_TABLE ,message);
  })
  .then((value)=> {
      callback(null, CommonHandlerCallback.genericResponseCallback(200,value));
  })
  .catch((err) => {
      console.log('info', 'ERROR' );
      throw Boom.badRequest(err);
  });
};