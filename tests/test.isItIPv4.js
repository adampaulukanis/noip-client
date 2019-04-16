'use strict'

const assert = require('assert').strict
const isItIPv4 = require('../lib/isItIPv4')

const arrayOfIPs = [
  { 'ip': '127.0.0.001', 'valid': true },
  { 'ip': '448.90210.0.65535', 'valid': false },
  { 'ip': '1.2.3.4', 'valid': true },
  { 'ip': '11.22.33.44', 'valid': true },
  { 'ip': '192.168.1.123', 'valid': true },
  { 'ip': '1.002.342.22', 'valid': false }
]

arrayOfIPs.forEach((entry) => {
  assert.deepEqual(isItIPv4(entry.ip), entry.valid, 'Tested IP is not what it should be')
})
