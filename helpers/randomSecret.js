'use strict'

module.exports = () => {
  var alphaNum = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  var result = ''
  for (let i = 8; i > 0; i--) {
    result += alphaNum[Math.ceil(Math.random() * alphaNum.length)]
  }
  return result
}
