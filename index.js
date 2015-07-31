// based on: https://github.com/hinderberg/yo-api-node
// yoLink added and pimped

var Promise = require('bluebird');
var request = require('request-promise');

module.exports = Yo;

function Yo (token) {
  if (!token) throw new Error('Token is needed to make an api call');
  this.base = 'https://api.justyo.co';
  this.token = token;
}

var proto = Yo.prototype;

proto.yo = function (username, callback) {
  return Promise.resolve(request.post(this.base + '/yo/', {
    form: {
      username:   username,
      api_token:  this.token
    },
    json: true
  })).nodeify(callback);
};

proto.yoAll = function (link, callback) {
  return Promise.resolve(request.post(this.base + '/yoall/', {
    form: {
      api_token:  this.token,
      link:       link
    },
    json: true
  })).nodeify(callback);
};

proto.yoLink = function (username, link, callback) {
  return Promise.resolve(request.post(this.base + '/yo/', {
    form: {
      link:       link,
      username:   username,
      api_token:  this.token
    },
    json: true
  })).nodeify(callback);
};

proto.getSubscriberCount = function (callback) {
  return Promise.resolve(request.get(this.base + '/subscribers_count/', {
    qs: {
      api_token:  this.token
    },
    json: true
  }))
  .get('count')
  .nodeify(callback);
};

// aliases
proto.countOfSubscribers = proto.getSubscriberCount;
