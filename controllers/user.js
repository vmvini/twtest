const getClient = require('./../lib/twitter.client');
const responseHandler = require('./../lib/response.handlers').responseHandler;
const sendResponse = require('./../lib/response.handlers').sendResponse;
const getTwitterCredentials = require('./../configs/index').getTwitterCredentials;

module.exports = function(req, res) {
  getClient(getTwitterCredentials(req.params.token))
  .userinfo((err, user) => responseHandler(res, err, success(user) ));
  
  function success(user) {
    return (defaultData) => sendResponse(res, 200, {
      user: user,
      ...defaultData
    });
  }
};