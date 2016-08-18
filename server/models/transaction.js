const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  description: {type: String, required: true},
  value: {type: Number, required: true},
  credit: {type: Boolean, required: true, default: false},
  createdAt: {type: Date, required: true, default: Date.now }
});

transactionSchema.statics.toggle = function(id, cb){
  this.findById(id, (err, trans)=>{
    if (err) return cb(err);
    trans.credit = !trans.credit;
    trans.save(cb);
  })
}

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
