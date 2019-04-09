'use strict'

// https://www.noip.com/integrate/request

const http = require('http')

const options = {
  auth: 'adam.paulukanis@gmail.com:xfilez123',
  headers: {
    'User-Agent': 'Adams Update Client OpenBSD/1.0 adam.paulukanis@gmail.com'
  },
  host: 'dynupdate.no-ip.com',
  path: '/nic/update?hostname=jesiotry.ddns.net&myip=92.22.144.175'
}

/**
 * Checks if the input string looks like correct IPv4
 */
function isItIPv4 (pretender = '') {
  let match = pretender.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/)
  return match != null &&
    match[1] <= 255 && match[2] <= 255 &&
    match[3] <= 255 && match[3] <= 255
}

// Replace IP with the current IP
let newIP = '92.22.144.175'
if (isItIPv4(process.argv[2])) {
  newIP = process.argv[2]
}
options.path = options.path.replace(/92.22.144.175/, newIP)

http.get(options, (res) => {
  let error
  if (res.statusCode !== 200) {
    error = new Error(`Request failed. Status code ${res.statusCode}`)
    // Consume response data to free up memory
    res.resume()
    return console.error(error.message)
  }

  res.setEncoding('utf8')
  let rawData = ''
  res.on('data', (chunk) => { rawData += chunk })
  res.on('end', () => {
    console.log(`NOIP response: ${rawData}`)
  })
}).on('error', (e) => {
  console.error(`Got error: ${e.message}`)
})
