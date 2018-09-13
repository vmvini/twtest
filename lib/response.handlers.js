const getErrorDetails = require('./twitter.errors');

exports.sendResponse = sendResponse;

const defaultSuccessData = {
  success: true, 
  message_code: 200,
  message: 'success'
};

exports.responseHandler = function responseHandler(res, err, success) {
  if (err) {
    e = getErrorDetails(err);
    return sendResponse(res, 400, e);
  } else {
    return success(defaultSuccessData);
  }
};

function sendResponse(res, status, data) {
  return res
  .status(status)
  .json(data);
}