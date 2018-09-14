const getClient = require('./../lib/twitter.client');
const responseHandler = require('./../lib/response.handlers').responseHandler;
const sendResponse = require('./../lib/response.handlers').sendResponse;
const getTwitterCredentials = require('./../configs/index').getTwitterCredentials;
const util = require('util')

module.exports = function(req, res) {

  if ( req.files && req.files.length < 1 ) {
    return res.status(400).json({
        success: false, 
        message: 'image is missing',
        message_code: 400
    });
  }

  getClient(getTwitterCredentials(req.params.token))
  .postImage(getImageBytes(), (err, media) => responseHandler(res, err, success(media) ));
  
  function success(media) {
    return (defaultData) => sendResponse(res, 201, {
      media: media,
      ...defaultData,
      message_code: 201,
      message: 'image uploaded with success'
    });
  }

  function getImageBytes() {
    return req.files[0].buffer;
  }

};