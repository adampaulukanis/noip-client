'use strict'

// https://www.noip.com/integrate/request

/*
 * My NoIP client
 */

const http = require('http')
const version = require('./package.json').version

require('dotenv').config()

// SQLite part
let sqlite3 = require('sqlite3').verbose()
let db = new sqlite3.Database('my.db')
db.run('CREATE TABLE IF NOT EXISTS responses (date TEXT, reqheader TEXT, status TEXT)')

const options = {
  auth: `${process.env.USERNAME}:${process.env.PASSWORD}`,
  headers: {
    // version is hard-coded here; do I expect anyone else to run it besides me? Nee
    'User-Agent': `Adams Update Client OpenBSD/${version} ${process.env.EMAIL}`
  },
  host: `dynupdate.no-ip.com`,
  path: `/nic/update?hostname=${process.env.HOSTNAME}&myip=${process.env.IP}`
}

/**
 * Checks if the input string looks like correct IPv4
 */
const isItIPv4 = require('./lib/isItIPv4')

// Replace IP with the current IP
if (isItIPv4(process.argv[2])) {
  options.path = options.path.replace(process.env.IP, process.argv[2])
}

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
    db.run('INSERT INTO responses (date, reqheader, status) VALUES ($date, $reqheader, $status)', {
      $date: new Date().toUTCString(),
      $reqheader: JSON.stringify(options),
      $status: rawData
    })
    db.close()
  })
}).on('error', (e) => {
  console.error(`Got error: ${e.message}`)
})
