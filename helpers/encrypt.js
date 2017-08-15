'use strict'

const crypto = require('crypto');

module.exports = (secret, password) => {
  return crypto.createHmac('sha256', secret).update(password).digest('hex')
}
