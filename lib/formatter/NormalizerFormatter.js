const AbstractFormatter = require('./AbstractFormatter');
const util = require('util');


class NormalizerFormatter extends AbstractFormatter {

  format(record) {
    return this.normalize(Object.create(record));
  }

  normalize(record) {
    var value;
    for (let key in record) {
      value = record[key];
      record[key] = this.doNormalize(value);
    }
    return record;
  };

  doNormalize(data) {
    var _ref1;
    if ((_ref1 = typeof data) === 'string' || _ref1 === 'number' || _ref1 === 'function' || _ref1 === 'boolean') {
      return data.toString();
    } else if (data instanceof Date) {
      return util.format('%s-%s-%s %s:%s:%s', data.getFullYear(), data.getMonth() + 1, data.getDate(), data.getHours(), data.getMinutes(), data.getSeconds());
    } else if (data === null || data === void 0) {
      return null;
    } else {
      return data.toString() + " ( " + JSON.stringify(data) + " ) ";
    }
  };
}

module.exports = NormalizerFormatter;
