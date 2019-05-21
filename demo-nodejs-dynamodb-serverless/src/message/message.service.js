'use strict';
//Imports
const Request = require('request');

const MessageConfig = require('./message.config');

class MessageService {

    constructor() {
    }

    invokeURL(urlTarget,payload) {
        //console.log('info', '[SERVICE][MESSAGE] invokeURL -> urlTarget: ' + urlTarget);
        return new Promise((resolve, reject) => {

            Request(urlTarget, function (error, response, body) {
                //console.log('error:', error); // Print the error if one occurred
                //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                //console.log('body:', body); // Print the HTML for the Google homepage.
                 if (error || response.statusCode != 200) {
                    reject(error);
                }
                //console.log(body)
                resolve(body);
            });

        });
    }

    generate(payload) {
        console.log('info', '[SERVICE] [MESSAGE] generate -> url: ' + MessageConfig.API_YES_OR_NO_OPTIONS.endpoint);
        return this.invokeURL(MessageConfig.API_YES_OR_NO_OPTIONS.endpoint,payload)
    }

}

module.exports = {
    MessageService
}