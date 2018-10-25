const AbstractHandler = require('./AbstractHandler');

class AbstractProcessingHandler extends AbstractHandler {

  // constructor(...args) {
  //   super(args);
  // }

  handle(record, cb) {
    if (this.isHandling(record)) {
      record = this.processRecord(record);
      record.formatted = this.getFormatter() ? this.getFormatter().format(record) : record.message;
      this.write(record, cb);
      this.bubble === false;
      return false;
    } else {
      return false;
    }
  };

  write(record, cb) {
    if (cb instanceof Function) {
      cb(void 0, void 0, record, this);
    }
    return this.bubble;
  };

}

module.exports = AbstractProcessingHandler;
