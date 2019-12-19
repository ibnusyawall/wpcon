const needle = require('needle')

class getRoute {
  async main(site) {
    await needle.get(`${site}/wp-json/`, (err, resp, body) => {
      const r = body.routes; console.log('\n   [ ctrl + c ] For Exit \n')
      Object.keys(r).forEach((key) => {
        return console.log(`   [-] ${site}${key} `)
        process.exit(1)
      })
    })
  }
}

module.exports = getRoute
