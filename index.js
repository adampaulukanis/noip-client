#!/usr/local/bin/node

'use strict'

const config = require('./config')
const http = require('http')
const fs = require('fs')

const isItIPv4RegExp = /\d.\d.\d.\d/

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
      if (isItIPv4RegExp.test(rawData)) {
        // Test if current and last IP's are the same
        if (rawData !== config.lastKnownIP) {
          // Update noip
          console.log('updating noip...')
          // Write to the file
          fs.writeFileSync('./config.json', JSON.stringify(config))
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
