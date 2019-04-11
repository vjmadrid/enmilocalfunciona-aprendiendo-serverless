'use strict';
//Imports
const Boom = require('boom');

const MessageService = require('./message/message.service').MessageService;

//Attributes
let messageService = new MessageService();

//Handler Function
module.exports.createMessage = (event, context, callback) => {
  console.log('info', '[HANDLER] [MESSAGE] createMessage ...');

  messageService.generate(event.body)
  .then((message)=> {
      
    const response = {
        statusCode: 200,
        body: JSON.stringify(message),
    };
    
    callback(null, response);
  })
  .catch((err) => {
      console.log('info', 'ERROR' );
      throw Boom.badRequest(err);
  });
};
