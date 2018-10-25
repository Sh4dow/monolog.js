class AbstractFormatter {

  format(record) {
    throw 'not implemented';
  }

  formatBatch(records) {
    return records.map(r => {
      return this.format(r);
    }).join();
  }
}

module.exports = AbstractFormatter;