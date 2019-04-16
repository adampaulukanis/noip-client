'use strict'

// https://www.noip.com/integrate/request

const http = require('http')
const config = require('./config.json')
const version = require('./package.json').version

const options = {
  auth: `${config.username}:${config.password}`,
  headers: {
    'User-Agent': `${config['User-Agent']}`
  },
  host: `${config.host}`,
  path: `${config.path}`
}
options.headers['User-Agent'] = options.headers['User-Agent'].replace('VERSION', version)

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
