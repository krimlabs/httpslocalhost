const redbird = require('redbird')
const fsExtra = require('fs-extra')

class ProxyServer {
  constructor(tmpPath, proxies) {
    console.log('ProxyServer#constructor')
    this._proxyServer = new redbird({
      port: 65231,
      ssl: {
        port: 443,
        key: `${tmpPath}/HTTPSLocalhost.key`, 
        cert: `${tmpPath}/HTTPSLocalhost.crt`
      }
    });

    this.tmpPath = tmpPath
    this.proxies = JSON.parse(proxies)
  }

  async start() {
    console.log('ProxyServer#start')
    this.proxies.map(p => this.registerProxy(p))

    // !! BOOM !!
    console.log('ProxyServer#start will delete tmp certs')
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
    console.log('ProxyServer#register ' + JSON.stringify(proxy))
    this._proxyServer.register(proxy.from, proxy.to, {
      ssl: {
        key: `${this.tmpPath}/HTTPSLocalhost.key`, 
        cert: `${this.tmpPath}/HTTPSLocalhost.crt`
      }
    }); 
  }
}

console.log("process.cwd() = " + process.cwd());
const instance = new ProxyServer(process.argv[2], process.argv[3]);
Object.freeze(instance);

instance.start();
module.exports = instance;

