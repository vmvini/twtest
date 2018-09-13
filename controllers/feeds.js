const getClient = require('./../lib/twitter.client');
const responseHandler = require('./../lib/response.handlers').responseHandler;
const sendResponse = require('./../lib/response.handlers').sendResponse;
const getTwitterCredentials = require('./../configs').getTwitterCredentials;

module.exports = function(req, res) {
  getClient(getTwitterCredentials(req.params.token))
  .timeline((err, timeline) => responseHandler(res, err, success(timeline) ));
  
  function success(timeline) {
    return (defaultData) => sendResponse(res, 200, {
      feeds: timeline,
      ...defaultData
    });
  }
};