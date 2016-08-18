const express = require('express')
const router = express.Router();
const Transaction = require('../models/transaction')

//base url: /api/transactions

router.put('/:id/toggle', (req, res) =>{
  Transaction.toggle(req.params.id, (err, savedTransaction) =>{
    if(err){
      return res.status(400).send(err);
    }
    Transaction.find({}, (err, transactions) => {
      res.status(err ? 400: 200).send(err || transactions);
    })
  });
})

router.route('/')
  .get((req, res) =>{
    Transaction.find({}, (err, transactions) =>{
      res.status(err ? 400: 200).send(err || transactions);
    });
  })
  .post((req, res)=>{
    Transaction.create(req.body, (err, newTransaction) => {
      res.status(err ? 400: 200).send(err || newTransaction);
    });
  })

router.route('/:id')
  .get((req, res) =>{
    Transaction.findById(req.params.id, (err, transaction) =>{
      res.status(err ? 400 : 200).send(err || transaction);
    });
  })
  .delete((req, res) =>{
    Transaction.findByIdAndRemove(req.params.id, err =>{
      res.status(err ? 400 : 200).send(err);
    });
  })
  .put((req, res) =>{
    Transaction.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}, (err, transaction) =>{
      res.status(err ? 400: 200).send(err || transaction);

      if(err){
        return res.status(400).send(err);
      }
      Transaction.find({}, (err, transactions) => {
        res.status(err ? 400: 200).send(err || transactions);
      })
    });
  })

module.exports = router;
