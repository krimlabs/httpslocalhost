const redbird = require('redbird');
const exec = require('child-process-promise').exec;

const db = require('./db');

class ProxyServer {
  constructor() {
    this._proxyServer = new redbird({
      ssl: {
        port: 8446,
        key: './HTTPSLocalhost.key', 
        cert: './HTTPSLocalhost.crt'
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

  async registerProxy(proxy) {
    this._proxyServer.register(proxy.from, proxy.to, {
      ssl: {
        key: './HTTPSLocalhost.key', 
        cert: './HTTPSLocalhost.crt'
      }
    }); 
  }
}

const instance = new ProxyServer();
Object.freeze(instance);

instance.start();
module.exports = instance;

