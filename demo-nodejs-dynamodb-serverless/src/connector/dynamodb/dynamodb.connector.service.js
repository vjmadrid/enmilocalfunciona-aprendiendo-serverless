'use strict';
//Imports
const uuid = require('uuid');

const CommonHandlerCallback = require('../../common/common.handler.callback');
const DynamodbConnectorCallback = require('./dynamodb.connector.callback');
const DynamodbConnectorConstantMessage = require('./dynamodb.connector.constant.message');

//Service
class DynamodbConnectorService {

    constructor(instance) {
        if (!instance) {
            throw DynamodbConnectorConstantMessage.DYNAMODB_CONNECTOR_MESSAGE_ERROR.INVALID_DYNAMODB_INSTANCE;
        }
        this.dynamodbInstance = instance;
    }

    list(tableName) {
        console.log('info', '[SERVICE] [DYNAMODB] list -> tableName :: '+ tableName); 
        
        if (!tableName) {
            throw DynamodbConnectorConstantMessage.SQS_CONNECTOR_MESSAGE_ERROR.INVALID_TABLE_NAME;
        }    

        const params = {
            TableName: tableName,
        };

        return new Promise(resolve => {
            this.dynamodbInstance.scan(params, (error, result) => {
                resolve(DynamodbConnectorCallback.defaultDynamodbCallbackPromise(error,result)); 
            });
        });
    }

    delete(tableName, id) {
        console.log('info', '[SERVICE] [DYNAMODB] delete -> tableName :: '+ tableName+ " | id ::"+ id); 
        
        if (!tableName) {
            throw DynamodbConnectorConstantMessage.SQS_CONNECTOR_MESSAGE_ERROR.INVALID_TABLE_NAME;
        }
        
        if (!id) {
            throw DynamodbConnectorConstantMessage.SQS_CONNECTOR_MESSAGE_ERROR.INVALID_ID;
        }    

        const params = {
            TableName: tableName,
            Key: {
                id: id,
            }
        };

        let idDeletedResponse = "{ id : "+id+"}"
        return new Promise(resolve => {
            this.dynamodbInstance.delete(params, (error, result) => {
                resolve(DynamodbConnectorCallback.defaultDynamodbCallbackPromise(error,idDeletedResponse))
            });
        });
    }

    deleteAll(tableName) {
        console.log('info', '[SERVICE] [DYNAMODB] deleteAll ...'); 
        
        if (!tableName) {
            throw DynamodbConnectorConstantMessage.SQS_CONNECTOR_MESSAGE_ERROR.INVALID_TABLE_NAME;
        }
        
        const params = {
            TableName: tableName
        };
        
        let idDeletedList = [];
        return new Promise(resolve => {
            let instanceLocal = this.dynamodbInstance;
            instanceLocal.scan(params, (error, result) => {
                if (error) {
                    callback(null, CommonHandlerCallback.genericErrorCallback(error.statusCode || 501, error));
                    return;
                }

                result.Items.forEach(function(item,i){
                    //console.log(i);
                    //console.log(item);
              
                    var paramsDelete = {
                        TableName: tableName,
                        Key: {
                            id: item.id,
                        },
                        ReturnValues: 'NONE', // optional (NONE | ALL_OLD)
                        ReturnConsumedCapacity: 'NONE', // optional (NONE | TOTAL | INDEXES)
                        ReturnItemCollectionMetrics: 'NONE', // optional (NONE | SIZE)
                    };
                
                    instanceLocal.delete(paramsDelete, function(err, data) {
                        if (error) {
                          callback(null, CommonHandlerCallback.genericErrorCallback(error.statusCode || 501, error));
                          return;
                        }
                    });
              
                    idDeletedList.push("{ id : "+item.id+"}")
                  }); 

                resolve(CommonHandlerCallback.genericResponseCallback(200,{'deleted_list' : '{'+idDeletedList.toString() +'}' }));
            });
        });
    }

    insert(tableName, value) {
        console.log('info', '[SERVICE] [DYNAMODB] insert -> tableName :: '+ tableName+ " | value ::"+ value); 
        
        if (!tableName) {
            throw DynamodbConnectorConstantMessage.SQS_CONNECTOR_MESSAGE_ERROR.INVALID_TABLE_NAME;
        }

        if (!value) {
            throw DynamodbConnectorConstantMessage.SQS_CONNECTOR_MESSAGE_ERROR.INVALID_VALUE;
        }    

        const timestamp = new Date().getTime();

        let contentDataFormatter = JSON.parse(value);
      
        const params = {
          TableName: tableName,
          Item: {
            id: uuid.v1(),        
            text: contentDataFormatter,
            checked: false,
            createdAt: timestamp,
            updatedAt: timestamp,
          }
        };
        
        return new Promise((resolve, reject) => {
            this.dynamodbInstance.put(params, (error) => {
              if (error) {
                reject(CommonHandlerCallback.genericErrorCallback(error.statusCode || 501, 'Couldn\'t create the message'));
              }
              resolve({'status': 'create', 'message': contentDataFormatter});
            });
        });

    }

}

module.exports = {
    DynamodbConnectorService
}
