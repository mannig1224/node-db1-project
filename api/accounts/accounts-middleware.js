const Accounts = require('./accounts-model');
const yup = require('yup');

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

const accountSchema = yup.object().shape({
  name: yup
    .string("name of account must be a string")
    .trim('whitespace alone does not count')
    .required('name and budget are required')
    .min(3, 'name needs to be 3 chars long')
    .max(100, 'name cannot be longer than 100'),
  budget: yup
    .number()
    .required('name and budget are required')
})

async function checkAccountPayload(req, res, next) {
  // DO YOUR MAGIC
  try { 
    const validated = await accountSchema.validate(req.body,
      { strict: false, stripUnknown: true })
    req.body = validated
    next()
  } catch (err) {
    next({ status: 400, message:"name and budget are required"})
  }
}

module.exports = {checkAccountPayload, checkAccountNameUnique, checkAccountId}