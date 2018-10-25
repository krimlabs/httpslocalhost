const redbird = require('redbird');
const fsExtra = require('fs-extra');

class ProxyServer {
  constructor(tmpPath, proxies) {
    this._proxyServer = new redbird({
      ssl: {
        port: 443,
        key: `${tmpPath}/HTTPSLocalhost.key`, 
        cert: `${tmpPath}/HTTPSLocalhost.crt`
      }
    });

    this.tmpPath = tmpPath;
    this.proxies = JSON.parse(proxies);
  }

  async start() {
    this.proxies.map(p => this.registerProxy(p));

    // !! BOOM !!
    fsExtra.emptyDir(this.tmpPath);
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
        key: `${this.tmpPath}/HTTPSLocalhost.key`, 
        cert: `${this.tmpPath}/HTTPSLocalhost.crt`
      }
    }); 
  }
}

const instance = new ProxyServer(process.argv[2], process.argv[3]);
Object.freeze(instance);

instance.start();
module.exports = instance;

