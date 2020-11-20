'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ERRORS = require('./ERRORS');

var _ERRORS2 = _interopRequireDefault(_ERRORS);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULT_GET_LIST_PAGINATION = {
  nbperpage: 100,
  pagenum: 1
};

var DEFAULT_GET_LIST_ORDER = {
  direction: 'ASC',
  order: 'item_name'
};

var Document = function () {
  function Document(sellsy) {
    _classCallCheck(this, Document);

    this.sellsy = sellsy;
  }

  _createClass(Document, [{
    key: 'getList',
    value: function getList(_ref) {
      var type = _ref.type,
          search = _ref.search,
          _ref$pagination = _ref.pagination,
          pagination = _ref$pagination === undefined ? DEFAULT_GET_LIST_PAGINATION : _ref$pagination,
          _ref$order = _ref.order,
          order = _ref$order === undefined ? DEFAULT_GET_LIST_ORDER : _ref$order;

      return this.sellsy.api({
        method: 'Catalogue.getList',
        params: {
          type: type,
          search: search,
          order: order,
          pagination: pagination
        }
      }).then(function (data) {
        if (data.status === 'success') {
          return data.response;
        } else {
          console.error(data);
          throw new Error(_ERRORS2.default.CATALOGUE_NOT_FOUND);
        }
      }).catch(function (e) {
        console.error(e);
        throw new Error(_ERRORS2.default.CATALOGUE_NOT_FOUND);
      });
    }
  }]);

  return Document;
}();

exports.default = Document;