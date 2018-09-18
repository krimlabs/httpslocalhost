const Datastore = require('nedb-promises');

const dbFactory = (fileName) => Datastore.create({
  filename: `./data/${fileName}`, 
  timestampData: true,
  autoload: true
});

const db = {
  proxies: dbFactory('proxies.db')
};

module.exports = db;
