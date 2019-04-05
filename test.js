'use strict'

const http = require('http')

const options = {
  hostname: 'dynupdate.no-ip.com',
  port: '80',
  auth: 'adam.paulukanis@gmail.com:xfilez123',
  path: '/nic/update',
  method: 'GET',
  headers: {
    'User-Agent': 'Adams Update Client/1.0.0 adam.paulukanis@gmail.com'
  }
}

const postData = require('querystring').stringify({
  'hostname': 'jesiotry.ddns.net',
  'myip': '79.71.251.132'
})

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`)
  res.setEncoding('utf8')
  let rawData = ''
  res.on('data', (chunk) => { rawData += chunk })
  res.on('end', () => {
    console.log(rawData)
  })
}).on('error', (e) => {
  console.log(`Got error: ${e.message}`)
})

req.write(postData)
req.end()
