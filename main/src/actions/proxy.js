const Schema = require('validate');
const validator = require('../utils/validator');
const {stringCleaner} = require('../utils/string');
const devcert = require('devcert');

const db = require('../db');

const proxySchema = new Schema({
  from: {type: String, required: true, length: {min: 1}, message: 'From address is required.'},
  to: {type: String, required: true, length: {min: 1}, message: 'To address is required.'}
});

const generateCertificate = async (fromAddress) => {
  return await devcert.certificateFor(fromAddress.split(':')[0], {
    async getWindowsEncryptionPassword() {
      return new Promise((resolve, reject) => {
        resolve("L0vebulls");
      });
    }
  });
}

const actions = {
  getProxies: async (req, res) => {
    const proxies = await db.proxies.find({});
    res.send({proxies});
  },
  createProxy: async (req, res) => {
    const {payload} = req;
    const cleanedPayload = Object.keys(payload)
      .map(k => ({[k]: stringCleaner(payload[k])}))
      .reduce((acc, current) => ({...acc, ...current}), {})
    ;

    const errors = validator(proxySchema, cleanedPayload);
    if (errors) {
      res.error(errors);
    } else {
      const ssl = await generateCertificate(cleanedPayload.from);
      if (ssl) {
        const proxy = await db.proxies.insert(cleanedPayload);
        res.send({proxy, msg: 'Proxy created successfully.'});  
      } else {
        res.error({from: 'Unable to generate certificate.'})
      }
    }
  },
  deleteProxy: async (req, res) => {
    const {payload} = req;
    const proxy = await db.proxies.findOne({'_id': payload.id});
    try {
      const deleted = await db.proxies.remove({'_id': proxy._id});
      res.send({proxy, msg: 'Proxy deleted successfully.'});
    } catch (err) {
      res.error(err);
    }
  }
}

module.exports = actions;