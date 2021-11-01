const router = require('express').Router()

const Accounts = require('./accounts-model');

const {
  checkAccountId,
  checkAccountPayload
} = require('./accounts-middleware');

router.get('/', (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.getAll()
    .then( accounts => {
      res.status(200).json(accounts);
    })
    .catch(next);
})

router.get('/:id', checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  res.status(200).json(req.specifiedAccount);
})

router.post('/', checkAccountPayload, (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.create(req.body)
    .then(account => {
      res.status(201).json(account)
    })
    .catch(next);
})

router.put('/:id', (req, res, next) => {
  // DO YOUR MAGIC
});

router.delete('/:id', (req, res, next) => {
  // DO YOUR MAGIC
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status(err.status || 500).json({
    custom: 'something went wrong',
    message: err.message
  })
})





module.exports = router;
