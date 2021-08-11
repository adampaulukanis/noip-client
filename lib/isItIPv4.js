'use strict'

module.exports = function isItIPv4 (pretender = '') {
  let match = pretender.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/)
  return match != null &&
    match[1] <= 255 && match[2] <= 255 &&
    match[3] <= 255 && match[4] <= 255
}
