const Datastore = require('nedb-promises')

const dbFactory = (fileName) => Datastore.create({
  filename: (process.env.NODE_ENV === 'dev' ? `${__dirname}/..` : process.resourcesPath) + `/data/${fileName}`, 
  timestampData: true,
  autoload: true
})

const db = {
  proxies: dbFactory('proxies.db')
}

exports.dbFactory = dbFactory
module.exports = db