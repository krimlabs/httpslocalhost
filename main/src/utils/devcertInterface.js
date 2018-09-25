//const devcert = require('../devcert/dist');
const devcert = require('devcert');

const generateCertificate = async (fromAddress) => {
  return await devcert.certificateFor(fromAddress.split(':')[0]);
}

const removeDomain = (domain) => {
  return devcert.removeDomain(domain);
};

module.exports = {generateCertificate, removeDomain};