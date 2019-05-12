'use strict'

// https://www.noip.com/integrate/request

const http = require('http')
const config = require('./config.json')
const version = require('./package.json').version

// SQLite part
let sqlite3 = require('sqlite3').verbose()
let db = new sqlite3.Database('my.db')
db.run('CREATE TABLE IF NOT EXISTS responses (date TEXT, status TEXT)')

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
const isItIPv4 = require('./lib/isItIPv4')

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
    db.run('INSERT INTO responses (date, status) VALUES ($date, $status)', {
      $date: new Date().toUTCString(),
      $status: rawData
    })
    db.close()
  })
}).on('error', (e) => {
  console.error(`Got error: ${e.message}`)
})
