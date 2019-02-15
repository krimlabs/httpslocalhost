const Schema = require('validate')
const sudo = require('sudo-prompt')
const childProcess = require('child-process-promise')
const fs = require('fs')

const db = require('../db')
const {tmpPath, userDataPath} = require('../utils/common')

const http = require('http')
const log = (msg) => {
  //http.get(`http://localhost:8080/?msg=${msg}`)
}

const generateCertificateCommand = (domains, certficateName='HTTPSLocalhost') => {
  log('generateCertificateCommand')
  try {
    const configPath = `${tmpPath}/ssl_cert_config`;
    log(configPath)
    const domainsToDNSNames = domains.map((d, i) => `\nDNS.${i+1}=${d.from}`).join('') + '\n';
    const config = `[dn]\nCN=${certficateName}\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=@alt_names\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth\n[alt_names]${domainsToDNSNames}`;
    fs.writeFileSync(configPath, config, {flag: 'w'});
    const makeCert = `openssl req -x509 -out ${tmpPath}/${certficateName}.crt -keyout ${tmpPath}/HTTPSLocalhost.key -newkey rsa:2048 -nodes -sha256  -subj "/CN=HTTPSLocalhost/O=HTTPSLocalhost" -extensions EXT -config ${configPath}`;
    log(makeCert)
    return {
      isSudo: false, 
      certficateName,
      cmd: `${makeCert}`
    }
  } catch(error) {
    
  }
};

const addCertToTrustStoreCommand = () => {
  log('addCertToTrustStoreCommand')
  const deleteExitingCertificate = `security find-certificate -c "HTTPSLocalhost" -a -Z | awk '/SHA-1/{system("security delete-certificate -Z "$NF)}'`;
  const addNewCertificate = `security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain -p ssl -p basic ${tmpPath}/HTTPSLocalhost.crt`
  return {
    isSudo: true,
    cmd: `${deleteExitingCertificate}; ${addNewCertificate}`
  };
};

const purgeFile = (filePath, isSudo=false) => {
  return {
    isSudo,
    cmd: `rm ${filePath}`
  }
}

const addDomainsToEtcHostsCommand = (domains) => {
  log('addDomainsToEtcHostsCommand')
  const domainsAddCommands = domains
    .map(d => `127.0.0.1 ${d.from}`)
    .map(line => `grep -q -F '${line}' /etc/hosts || echo '${line}' >> /etc/hosts`)
  ;
  log(domainsAddCommands.join(';'))
  return {
    isSudo: true,
    cmd: domainsAddCommands.join(';')
  };
};


const killServer = () => {
  return {
    isSudo: true,
    cmd: `if pgrep proxyServer; then pkill proxyServer; fi`
    //cmd: `ps | grep proxyServer | awk '{print "kill -9 " $1}' | sh`
  }
};

const startServer = async () => {
  log('startServer ' + __dirname)
  const executableBasePath = (process.env.NODE_ENV === 'dev' ? `${__dirname}/../..` : process.resourcesPath)+'/build/executables';
  const proxies = (await db.proxies.find({deleted: {$exists: false}})).map(c => ({from: c.from, to: c.to}))
  const startCommand = `cd ${executableBasePath}; ./proxyServer '${tmpPath}' '${JSON.stringify(proxies)}' &`
  log(startCommand)
  return {
    isSudo: true,
    cmd: startCommand
  }
}

const cleanupDeletedHosts = async () => {
  const deletedProxies = await db.proxies.find({deleted: true}); 
  const clearHostCommands = deletedProxies.map(proxy => `sed -i '.bak' '/^127.0.0.1 ${proxy.from}$/d' /etc/hosts`)
  //deletedProxies.map(async (proxy) => await db.proxies.remove({'_id': proxy._id}))
  return {
    isSudo: true,
    cmd: clearHostCommands.join(';')
  }
}

const actions = {
  generateCertsAddToTrustStoreAndEtcHosts: async (req, res) => {
    log('action.generateCertsAddToTrustStoreAndEtcHosts')
    const domains = await db.proxies.find({});
    log('action.domains')
    const commands = [
      // await cleanupDeletedHosts(),
      generateCertificateCommand(domains),
      addCertToTrustStoreCommand(), // figure out the path
      addDomainsToEtcHostsCommand(domains),
      killServer(), // kill before starting, this is important
      await startServer()
    ];


    const modestCommands = commands.filter(c => !c.isSudo).map(c => c.cmd).join(';');
    const immodestCommands = commands.filter(c => c.isSudo).map(c => c.cmd).join(';');

    try {
      childProcess.exec(modestCommands)
        .then(() => {
          const options = {
            name: 'HTTPSLocalhost',
            // icns: '/Applications/Electron.app/Contents/Resources/Electron.icns', // (optional)
          };

          // run all commands in one sudo
          sudo.exec(immodestCommands, options, async (error, stdout, stderr) => {
            if (error) {
              log(error, stderr, stdout)
              res.error({error, stderr, stdout}) 
            } else {
              res.send({msg: "Certificate and routing ready."});   
            }
          });
        })
        .catch(err => {
          log(err)
          res.error({err});
        })
      ;  
    } catch(error) {
      log(error)
      res.error({error});
    }
    
  },
  removeCertsAndClearHosts: async (req, res) => {
    // do as said
  },
  stopServer: () => {

  }
};

module.exports = actions;