
const Abstractprocessinghandler = require('./AbstractProcessingHandler');

class TestHandler extends Abstractprocessinghandler
{
  constructor(level, bubble) {
    this.records = [];
    super(level, bubble);
  }

  write(record, cb) {
    this.records.push(record.formatted);
    if (cb instanceof Function) {
      return cb(void 0, this.records, record, this);
    }
  };

}
module.exports = TestHandler;
