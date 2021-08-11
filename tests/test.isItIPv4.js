'use strict'

const assert = require('assert').strict
const isItIPv4 = require('../lib/isItIPv4')

const arrayOfIPs = [
  { 'ip': '127.0.0.001', 'valid': true },
  { 'ip': '448.90210.0.65535', 'valid': false },
  { 'ip': '1.2.3.4', 'valid': true },
  { 'ip': '11.22.33.44', 'valid': true },
  { 'ip': '192.168.1.123', 'valid': true },
  { 'ip': '1.002.342.22', 'valid': false },
  { 'ip': '-1.002.342.22', 'valid': false },
  { 'ip': '1111.2.42.22', 'valid': false },
  { 'ip': '1111.002.42.22', 'valid': false },
  { 'ip': '111.2222.42.22', 'valid': false },
  { 'ip': '111.22.342.22', 'valid': false },
  { 'ip': '111.222.42.2232', 'valid': false },
  { 'ip': '111.222.42.222', 'valid': true },
  { 'ip': '0.0.0.0', 'valid': true },
  { 'ip': '000.0.0.0', 'valid': true },
  { 'ip': '111.22.342.22.22', 'valid': false }
]

arrayOfIPs.forEach((entry) => {
  assert.deepEqual(isItIPv4(entry.ip), entry.valid, `Tested IP (${entry.ip}) is valid? ${entry.valid}`)
})
