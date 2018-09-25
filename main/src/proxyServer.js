const redbird = require('redbird');
const {generateCertificate} = require('./utils/devcertInterface');
const {domainsDir} = require('devcert/dist/constants');
const db = require('./db.js');


const getPaths = (domain) => {
  return {
    key: `${domainsDir}/${domain}/private-key.key`, 
    cert: `${domainsDir}/${domain}/certificate.crt`
  };
};


class ProxyServer {
  constructor(){
    this._proxyServer = new redbird({
      ssl: {
        port: 443
      }
    });
  }

  async start() {
    const proxies = await db.proxies.find({});
    proxies.map(p => this.registerProxy(p));
  }

  async stop() {
    await this._proxyServer.close();
  }

  async restart() {
    await this.stop();
    await this.start();
  }

  registerProxy(proxy) {
    // TODO: Check if certs exist
    this._proxyServer.register(proxy.from, proxy.to, {
      ssl: getPaths(proxy.from)
    }); 
  }
}

const instance = new ProxyServer();
Object.freeze(instance);

module.exports = instance;
