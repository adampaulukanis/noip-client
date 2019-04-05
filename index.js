#!/usr/local/bin/node

'use strict'

/*
 * 1. Check current IP
 *  - write it to config.json under currentIP
 * 2. Update noip
 *  - if (currentIP !== previousIP)
 *      - update noip
 *      - write IP to config.json under previousIP
 *    else
 *      - do nothing
 * 3. exit
 */

const config = require('./config')
const http = require('http')
const fs = require('fs')

function isItIPv4 (pretender) {
  let match = pretender.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/)
  return match != null &&
    match[1] <= 255 && match[2] <= 255 &&
    match[3] <= 255 && match[3] <= 255
}

http.get(config.url, (res) => {
  const { statusCode } = res

  let error
  if (statusCode !== 200) {
    error = new Error(`Request Failed. Status Code: ${statusCode}`)
    console.error(error.message)

    // Consume response data to free up memory
    res.resume()
  } else {
    res.setEncoding('utf8')
    let rawData = ''
    res.on('data', (chunk) => { rawData += chunk })
    res.on('end', () => {
      console.log(`Your external IP is ${rawData}`)
      if (isItIPv4(rawData)) {
        // Test if current and last IP's are the same
        if (rawData !== config.lastKnownIP) {
          // Update noip
          console.log('updating noip...')
          // Write to the file
          // fs.writeFileSync('./config.json', JSON.stringify(config))
          console.log('Writing you new IP to config.json')
        } else {
          // you have to do nothing
        }
      } else {
        error = new Error(`Request OK but received ${rawData} which is not a proper IPv4`)
        console.error(error)
      }
    })
  }
}).on('error', (e) => {
  console.log(`Got error: ${e.message}`)
})
