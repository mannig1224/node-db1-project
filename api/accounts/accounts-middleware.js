const Accounts = require('./accounts-model');
const checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
}

const checkAccountId = (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.getById(req.params.id)
    .then(possibleAccount => {
      if (possibleAccount) {
        req.specifiedAccount = possibleAccount
        next()
      } else {
        next({ status: 404, message: 'account not found'})
      }
    })
    .catch(next)

}

const checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const error = { status: 400};
  const { name, budget } = req.body;
  
  if (name === undefined || budget === undefined) {
    error.message = 'name and budget are required'
  } else if (typeof name !== 'string') {
    error.message = 'name of account must be a string'
  } else if (name.trim().length < 3 || name.trim().length > 100) {
    error.message = 'name of account must be between 3 and 100'
  } else if (typeof budget !== 'number' || isNaN(budget)) {
    error.message = 'budget of account must be a number'
  } else if (budget < 0 || budget > 1000000) {
    error.message = 'budget of account is too large or too small'
  }

  if (error.message) {
    next(error)
  } else {
    next()
  }
}

module.exports = {checkAccountPayload, checkAccountNameUnique, checkAccountId}