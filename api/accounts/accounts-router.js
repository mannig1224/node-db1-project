const router = require('express').Router()

const Accounts = require('./accounts-model');

const {
  checkAccountId,
  checkAccountPayload,
  checkAccountNameUnique
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

router.post('/', checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.create(req.body)
    .then(account => {
      res.status(201).json(account)
    })
    .catch(next);
})

router.put('/:id', checkAccountId, checkAccountPayload, async (req, res, next) => {
  const updated = await Accounts.updateById(req.params.id, req.body)
  res.json(updated)
  // DO YOUR MAGIC
  try {
    res.json('update account')
  } catch (err) {
    next(err)
  }
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    await Accounts.deleteById(req.params.id)
    res.json(req.account)
  } catch (err) {
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status(err.status || 500).json({
    custom: 'something went wrong',
    message: err.message
  })
})





module.exports = router;
