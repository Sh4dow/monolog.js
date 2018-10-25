
const util = require('util');
const events = require('events');

class Logger extends events.EventEmitter
{

  constructor(name, handlers, processors) {
    super();
    this.name = name != null ? name : "";
    this.handlers = handlers != null ? handlers : [];
    this.processors = processors != null ? processors : [];
  }

  static get LOG() { return "log"; }
  static get DEBUG() { return 100; }
  static get INFO() { return 200; }
  static get NOTICE() { return 250; }
  static get WARNING() { return 300; }
  static get ERROR() { return 400; }
  static get CRITICAL() { return 500; }
  static get ALERT() { return 550; }
  static get EMERGENCY() { return 600; }

  static get API() { return 1; }

  static get levels() { 
    return {
      100: 'DEBUG',
      200: 'INFO',
      250: 'NOTICE',
      300: 'WARNING',
      400: 'ERROR',
      500: 'CRITICAL',
      550: 'ALERT',
      600: 'EMERGENCY'
    };
  }  

  getName() {
    return this.name;
  };

  addHandler(handler) {
    this.handlers.unshift(handler);
    return this;
  };

  removeHandler() {
    return this.handlers.pop();
  };
  
  addProcessor(processor) {
    this.processors.unshift(processor);
    return this;
  };

  removeProcessor() {
    return this.processors.pop();
  };

  addRecord(level, message, context) {

    let record = {
      message: message,
      context: context,
      level: level,
      level_name: Logger.levels[level] || Logger.levels[100],
      channel: this.name,
      datetime: new Date,
      extra: {}
    };
    
    for (let processor of this.processors) {
      if (typeof processor.format === 'function') {
        record = processor.format(record);
      }
    }
    
    for (let handler of this.handlers) {
      
      if (handler.isHandling(record)) {
        handler.handle(record, (err, res, record, handler) => {
          return this.emit(Logger.LOG, err, res, record, handler);
        });
      }
    }

    return true;
  };

  debug(message, context) {
    return this.addRecord(Logger.DEBUG, message, context);
  };

  info(message, context) {
    return this.addRecord(Logger.INFO, message, context);
  };

  notice(message, context) {
    return this.addRecord(Logger.NOTICE, message, context);
  };

  warning(message, context) {
    return this.addRecord(Logger.WARNING, message, context);
  };

  error(message, context) {
    return this.addRecord(Logger.ERROR, message, context);
  };

  critical(message, context) {
    return this.addRecord(Logger.CRITICAL, message, context);
  };

  alert(message, context) {
    return this.addRecord(Logger.ALERT, message, context);
  };

  emergency(message, context) {
    return this.addRecord(Logger.EMERGENCY, message, context);
  };

  isHandling(level) {
    var record;
    record = {
      level: level
    };
    return this.handlers.some(handler => {
      return handler.isHandling(record);
    });
  };

  log(level, message, context) {
    if (typeof level === "string") {
      level = this[level];
    }
    return this.addRecord(level, message, context);
  };

}


module.exports = Logger;
