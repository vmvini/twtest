module.exports = function getErrorDetails(err) {
  if ( err.length > 1 ) {
    return multipleErrors();
  }
  return singleError();

  function singleError() {
    return createErrorResponse(err[0].code, err[0].message );
  }

  function multipleErrors() {
    return createErrorResponse(400, concatErrorsMsgs(err));
  }

};

function concatErrorsMsgs(errors) {
  return errors
  .map(err => 'code: ' + err.code + ' msg: ' + err.message )
  .join(';');
}

function createErrorResponse(message_code, message) {
  return {
    success: false, 
    message_code: message_code,
    message: message
  };
}

