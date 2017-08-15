'use strict'

module.exports = nilai => {
  if (nilai == undefined) {
    return 'empty'
  }
  else if (nilai > 85) {
    return 'A'
  }
  else if (nilai>70) {
    return 'B'
  }
  else if (nilai>55) {
    return 'C'
  }
  else if (nilai <= 55) {
    return 'E'
  }
}
