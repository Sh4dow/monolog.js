
const http = require('http');
const AbstractProcessingHandler = require('./AbstractProcessingHandler');
const JSONFormatter = require('../formatter/JSONFormatter');


class CouchDBHandler extends AbstractProcessingHandler
{
  
  defaultOptions = {
    host: 'localhost',
    dbname: 'logger',
    port: 5984
  };
  request = http.request;
  constructor(options, level, bubble) {

    if (level == null) {
      level = 100;
    }
    if (bubble == null) {
      bubble = true;
    }
    this.options = Object.assign({}, this.defaultOptions, options);
    super(level, bubble);
    this.formatter = new JSONFormatter;
  }

  getStreamOptions() {
    if (this._streamOptions == null) {
      this._streamOptions = {
        hostname: this.options.host,
        method: "POST",
        port: this.options.port ? this.options.port : 80,
        path: "/" + this.options.dbname,
        auth: this.options.username !== void 0 && this.options.password !== void 0 ? "" + this.options.username + ":" + this.options.password : "",
        headers: {
          "content-type": "application/json"
        }
      };
    }
    return this._streamOptions;
  };

  write(record, cb) {
    var r,
      _this = this;
    if (cb == null) {
      cb = noop;
    }
    r = this.request(this.getStreamOptions(), function(res) {
      res.setEncoding('utf8');
      return res.on('data', function(data) {
        var ignore;
        try {
          data = JSON.parse(data);
        } catch (_error) {
          ignore = _error;
        }
        return cb(void 0, data, record, _this);
      });
    });
    r.on("error", function(err, res) {
      return cb(err, res, record, _this);
    });
    r.end(JSON.stringify(record));
    return this.bubble;
  };
}

module.exports = CouchDBHandler;
