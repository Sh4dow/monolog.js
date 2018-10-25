
const AbstractHandler = require('./AbstractHandler');

class NullHandler extends AbstractHandler
{

  handle(record, cb) {
    if (record.level < this.level) {
      cb(new Error('cant handle record'), void 0, record, this);
      return false;
    } else {
      ///dev/null
      return true;
    }
  };
  
}

module.exports = NullHandler;
