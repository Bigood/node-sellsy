'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ERRORS = require('./ERRORS');

var _ERRORS2 = _interopRequireDefault(_ERRORS);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Client = function Client(sellsy) {
  var _this = this;

  _classCallCheck(this, Client);

  this.upsert = function (data) {
    var method = data.clientid ? 'update' : 'create';
    return _this.sellsy.api({
      method: 'Client.' + method,
      params: data
    })
    /**
      {
          "response": {
              "client_id": ***** // Et non clientid, comme on pourrait s'y attendre
          },
          "error": "",
          "status": "success"
      }
     */
    .then(function (data) {
      if (data.status === 'success') {
        return data.response;
      } else {
        console.error(data);
        throw new Error(_ERRORS2.default.CUSTOMER_CREATE_ERROR);
      }
    });
  };

  this.getList = function (_ref) {
    var order = _ref.order,
        search = _ref.search,
        pagination = _ref.pagination;

    return _this.sellsy.api({
      method: 'Client.getList',
      params: {
        order: order,
        search: search,
        pagination: pagination
      }
    }).then(function (data) {
      return data.response.result;
    }).catch(function (e) {
      throw new Error(_ERRORS2.default.SERVER_ERROR);
    });
  };

  this.getFirstMatchWithGetList = function (search) {
    return _this.sellsy.api({
      method: 'Client.getList',
      params: {
        search: search
      }
    }).then(function (data) {
      if (data.response.infos.nbtotal !== '0') {
        // always return first result
        var keys = Object.keys(data.response.result);
        return data.response.result[keys[0]];
      } else {
        throw new Error(_ERRORS2.default.CUSTOMER_NOT_FOUND);
      }
    }).catch(function (e) {
      throw new Error(_ERRORS2.default.CUSTOMER_NOT_FOUND);
    });
  };

  this.getOne = function (clientid) {
    return _this.sellsy.api({
      method: 'Client.getOne',
      params: {
        clientid: clientid
      }
    }).then(function (data) {
      return data.response.client;
    }).catch(function (e) {
      throw new Error(_ERRORS2.default.CUSTOMER_NOT_FOUND);
    });
  };

  /**
   * https://api.sellsy.fr/documentation/methodes#clientsupdate
   */
  this.udpate = this.upsert;
  /**
   * https://api.sellsy.fr/documentation/methodes#clientscreate
   */
  this.create = this.upsert;
  this.sellsy = sellsy;
}
/**
 * Search a client, with an identifier
 * @param {"ident" : "****"} search 
 */

/**
 * Search a client, with an identifier
 * @param {"ident" : "****"} search 
 */

/**
 * Get a client with its id
 * @param {string} clientid 
 */
;

exports.default = Client;