'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _oauth = require('oauth');

var _oauth2 = _interopRequireDefault(_oauth);

var _Client = require('./Client');

var _Client2 = _interopRequireDefault(_Client);

var _Document = require('./Document');

var _Document2 = _interopRequireDefault(_Document);

var _Catalogue = require('./Catalogue');

var _Catalogue2 = _interopRequireDefault(_Catalogue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_ENDPOINT = 'https://apifeed.sellsy.com/0';

var api = {
  url: '/',
  requestTokenUrl: '/request_token',
  accessTokenUrl: '/access_token'
};

function Sellsy() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$creds = _ref.creds,
      creds = _ref$creds === undefined ? {} : _ref$creds,
      _ref$endPoint = _ref.endPoint,
      endPoint = _ref$endPoint === undefined ? DEFAULT_ENDPOINT : _ref$endPoint;

  this.creds = creds;
  this.endPoint = endPoint;
  this.Client = new _Client2.default(this);
  this.Document = new _Document2.default(this);
  this.Catalogue = new _Catalogue2.default(this);
}

Sellsy.prototype.api = function () {
  var _this = this;

  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref2$method = _ref2.method,
      method = _ref2$method === undefined ? 'Infos.getInfos' : _ref2$method,
      _ref2$params = _ref2.params,
      params = _ref2$params === undefined ? {} : _ref2$params;

  var getOauth = function getOauth() {

    return new _oauth2.default.OAuth(_this.endPoint + api.requestTokenUrl, _this.endPoint + api.accessTokenUrl, _this.creds.consumerKey, _this.creds.consumerSecret, '1.0', null, 'PLAINTEXT');
  };

  return new Promise(function (resolve, reject) {
    var postData = {
      request: 1,
      io_mode: 'json',
      do_in: JSON.stringify({
        method: method,
        params: params
      })
    };

    getOauth().post(_this.endPoint + api.url, _this.creds.userToken, _this.creds.userSecret, postData, function (e, data, res) {
      try {
        if (e) {
          console.log('oauth.error', e);
          console.log('Sellsy.api OAUTH ERROR', method, params);
          return reject(e);
        }
        if (data.error) {
          console.log('oauth.data.error', data.error);
          console.log('Sellsy.api ERROR', method, params);
          return reject(data.error);
        }
        //console.log('Sellsy.api', method, params, data);
        resolve(JSON.parse(data));
      } catch (err) {
        reject(err);
      }
    });
  });
};

exports.default = Sellsy;

module.exports = Sellsy;