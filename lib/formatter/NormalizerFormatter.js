const AbstractFormatter = require('./AbstractFormatter');
const util = require('util');

Number.prototype.pad = function(size) {
  var s = String(this);
  while (s.length < (size || 2)) {s = "0" + s;}
  return s;
}

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
      return util.format('%s-%s-%s %s:%s:%s', data.getFullYear(), (data.getMonth() + 1).pad(2), data.getDate().pad(2), data.getHours().pad(2), data.getMinutes().pad(2), data.getSeconds().pad(2));
    } else if (data === null || data === void 0) {
      return null;
    } else {
      return JSON.stringify(data);
    }
  };
}

module.exports = NormalizerFormatter;
