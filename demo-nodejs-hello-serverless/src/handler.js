'use strict';

const IS_OFFLINE = eval(process.env.IS_OFFLINE);

exports.hello = (event, context, callback) => {
    console.log('info', '[HANDLER] hello...' );
    console.log('info', '[*] IS_OFFLINE : '+ IS_OFFLINE);

    const params_body = {
        message: "Hello World!" + new Date().toTimeString(), 
        method: event.httpMethod,
        url: event.path,
        payload: event.body,
        headers: event.headers,
        validate: false
    };

    const response = {
        statusCode: 200,
        body: JSON.stringify({
            params_body
        }),
      };
    
    callback(null, response);

};
