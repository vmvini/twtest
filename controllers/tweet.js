const getClient = require('./../lib/twitter.client');
const responseHandler = require('./../lib/response.handlers').responseHandler;
const sendResponse = require('./../lib/response.handlers').sendResponse;
const getTwitterCredentials = require('./../configs/index').getTwitterCredentials;

module.exports = function(req, res) {

  const data = processData(req.body);
  console.log(req.body);

  getClient(getTwitterCredentials(req.params.token))
  .postTweet(data, (err, tweet) => responseHandler(res, err, success(tweet) ));
  
  function success(tweet) {
    return (defaultData) => sendResponse(res, 201, {
      tweet: tweet,
      ...defaultData,
      message: 'post tweeted with success',
      message_code: 201
    });
  }

  function processData(data) {
      return {
        status: data.text,
        media_ids: data.media,
        attachment_url: data.source_url
      };
  }

};
