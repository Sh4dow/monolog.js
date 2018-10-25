const Logger = require('../Logger');
const LineFormatter = require('../formatter/LineFormatter');

class AbstractHandler {

  constructor(level, bubble) {
    this.level = level != null ? level : Logger.DEBUG;
    this.bubble = bubble != null ? bubble : true;
    this.processors = [];
  }

  isHandling(record) {
    return record.level >= this.level;
  };

  handle(record, cb) {
    if (cb instanceof Function) {
      cb(void 0, void 0, record, this);
    }
    return false;
  };

  handleBatch(records) {
    var record, _i, _len;
    for (_i = 0, _len = records.length; _i < _len; _i++) {
      record = records[_i];
      this.handle(record);
    }
  };

  close() {};

  pushProcessor(callback) {
    if (callback instanceof Function) {
      return this.processors.unshift(callback);
    }
  };

  popProcessor() {
    this.processors.shift();
    return this;
  };

  setFormatter(formatter) {
    this.formatter = formatter;
  };

  getFormatter() {
    return this.formatter = !this.formatter ? new LineFormatter : this.formatter;
  };

  setLevel(level) {
    this.level = level;
  };

  getLevel() {
    return this.level;
  };

  setBubble(bubble) {
    this.bubble = bubble;
  };

  getBubble() {
    return this.bubble;
  };

  processRecord(record) {
    var processor, _i, _len, _ref;
    if (this.processors) {
      _ref = this.processors;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        processor = _ref[_i];
        record = processor(record);
      }
    }
    return record;
  };
}

module.exports = AbstractHandler;
