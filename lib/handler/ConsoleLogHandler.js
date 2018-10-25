const AbstractProcessingHandler = require('./AbstractProcessingHandler');

class ConsoleLogHandler extends AbstractProcessingHandler
{
  
  // constructor(level, bubble) {
  //   super(level, bubble);
  // }

  write(record, cb) {
    console.log(record.formatted);
    if (cb instanceof Function) {
      return cb(void 0, record, this);
    }
  };
}

module.exports = ConsoleLogHandler;
