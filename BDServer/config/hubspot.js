const Hubspot = require('hubspot')
const hubspot = new Hubspot({
  apiKey: '2f347fca-4639-40c7-af20-c2090d8649b5',
  checkLimit: false // (Optional) Specify whether to check the API limit on each call. Default: true
})

module.exports = {
    hubspot: hubspot
}