const Twitter = require('twitter');

module.exports = function getClient(credentials = {
  consumer_key, 
  consumer_secret,
  access_token_key,
  access_token_secret
}) {
  return ClientFactory(credentials);
}

function ClientFactory(credentials) {

  const client = new Twitter(credentials);
  
  return {
    timeline: getAuthenticatedUserTimeline,
    userinfo: getAuthenticatedUserInfo,
    postImage: postImage,
    postTweet: postTweet
  };

  function getAuthenticatedUserTimeline(callback, count = 50) {
    client.get(
      'statuses/home_timeline',
      {
        count
      }, 
      (error, tweets, response) => callback(error, tweets, response)
    );
  }

  function getAuthenticatedUserInfo(callback) {
    client.get(
      'account/verify_credentials',
      {
        include_email: true,
        skip_status: false
      }, 
      (error, tweets, response) => callback(error, tweets, response)
    );
  }

  function postImage(image, callback) {
    client.post(
      'media/upload',
      {
        media: image
      }, 
      (error, tweets, response) => callback(error, tweets, response)
    );
  }

  function postTweet(data = {status, media_ids, attachment_url}, callback) {
    client.post(
      'statuses/update',
      data,
      (error, tweets, response) => callback(error, tweets, response)
    );
  }
}