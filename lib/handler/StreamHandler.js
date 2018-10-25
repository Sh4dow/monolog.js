
const stream = require('stream');
const fs = require('fs');
const Abstractprocessinghandler = require('./AbstractProcessingHandler');


class StreamHandler extends Abstractprocessinghandler
{
  constructor(_stream, level, bubble) {
    if (level == null) {
      level = 100;
    }
    if (bubble == null) {
      bubble = true;
    }

    super(level, bubble);
    
    if (_stream instanceof stream.Stream) {
      this.stream = _stream;
    } else {
      this.url = _stream;
    }
  }

  write(record, cb) 
  {
    if (typeof record.formatted == 'object') {
      record.formatted = JSON.stringify(record.formatted);
    }
    if (this.stream === void 0) {
      if (this.url === null) {
        if (cb instanceof Function) {
          return cb(new Error('Missing stream url'));
        }
      } else {
        
        return fs.writeFile(
          this.url, 
          record.formatted + "\r\n", 
          {flag: "a"}, 
          (err, res) => {
            return cb(err, res, record, this);
          }
        );
      }
    } else {
      return this.stream.write(
        record.formatted, 
        (err, res) => {
          return cb(err, res, record, this);
        }
      );
    }
  };
}

module.exports = StreamHandler;
