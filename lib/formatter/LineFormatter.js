const NormalizerFormatter = require('./NormalizerFormatter');

class LineFormatter extends NormalizerFormatter {

  constructor(...args) {
    super(args);
  }

  format(record) {
    record = super.format(record);
    return `[${record.datetime}] ${record.channel}.${record.level_name}: ${record.message} :: ${record.context}`;
  }

  formatBatch(records) {
    return records.map(r => {
      return _this.format(r);
    }).join();
  };
}


module.exports = LineFormatter;
