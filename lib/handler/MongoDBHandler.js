
const Abstractprocessinghandler = require('./AbstractProcessingHandler');

class MongoDBHandler extends Abstractprocessinghandler
{
  constructor(mongodb, collection, level, bubble) {
    this.mongodb = mongodb;
    this.collection = collection != null ? collection : "log";
    if (level == null) {
      level = 100;
    }
    if (bubble == null) {
      bubble = true;
    }
    super(level, bubble);
  }

  write(record, cb) {
    var _this = this;
    this.mongodb.collection(this.collection).insert(record, function(err, res) {
      _this.mongodb.close();
      return cb(err, res, record, _this);
    });
    return this.bubble;
  };
}
module.exports = MongoDBHandler;
