const Schema = require('validate');

const validator = require('../utils/validator');
const {stringCleaner} = require('../utils/string');
const db = require('../db');

const proxySchema = new Schema({
  from: {type: String, required: true, length: {min: 1}, message: 'From address is required.'},
  to: {type: String, required: true, length: {min: 1}, message: 'To address is required.'}
});

const actions = {
  getProxies: async (req, res) => {
    const proxies = await db.proxies.find({});
    return res.send({proxies});
  },
  createProxy: async (req, res) => {
    const {payload} = req;
    const errors = validator(proxySchema, payload);
    if (errors) {
      return res.error(errors);
    } 
    
    const existingProxies = await db.proxies.find({from: payload.from});
    if (existingProxies.length > 0) {
      return res.error({from: "From address already exists."})
    } 
      
    const proxy = await db.proxies.insert(payload);
    return res.send({proxy, msg: 'Proxy created successfully.'});     
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