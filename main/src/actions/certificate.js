const Schema = require('validate');
const sudo = require('sudo-prompt');
const childProcess = require('child-process-promise');
const fs = require('fs');

const db = require('../db');
const {tmpPath, userDataPath} = require('../utils/common');


const generateCertificateCommand = (domains, certficateName='HTTPSLocalhost') => {
  try {
    const configPath = `${tmpPath}/ssl_cert_config`;
    const domainsToDNSNames = domains.map((d, i) => `\nDNS.${i+1}=${d.from}`).join('') + '\n';
    const config = `[dn]\nCN=${certficateName}\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=@alt_names\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth\n[alt_names]${domainsToDNSNames}`;
    fs.writeFileSync(configPath, config, {flag: 'w'});
    const makeCert = `openssl req -x509 -out ${tmpPath}/${certficateName}.crt -keyout ${tmpPath}/HTTPSLocalhost.key -newkey rsa:2048 -nodes -sha256  -subj "/CN=HTTPSLocalhost/O=HTTPSLocalhost" -extensions EXT -config ${configPath}`;
    return {
      isSudo: false, 
      certficateName,
      cmd: `${makeCert}`
    };
  } catch(error) {
  }
};

const addCertToTrustStoreCommand = () => {
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
  const domainsAddCommands = domains
    .map(d => `127.0.0.1\t${d.from}\n`)
    .map(line => `grep -q -F '${line}' /etc/hosts || echo '${line}' >> /etc/hosts`)
  ;
  return {
    isSudo: true,
    cmd: domainsAddCommands.join(';')
  };
};


const killServer = () => {
  return {
    isSudo: true,
    cmd: `ps | grep proxyServer | awk '{print "kill -9 " $1}' | sh`
  }
};

const startServer = async () => {
  const proxies = (await db.proxies.find({})).map(c => ({from: c.from, to: c.to}));
  const startCommand = `./${userDataPath}/proxyServer '${tmpPath}' '${JSON.stringify(proxies)}' &`;
  return {
    isSudo: true,
    cmd: startCommand
  };
};

const actions = {
  generateCertsAddToTrustStoreAndEtcHosts: async (req, res) => {
    const domains = await db.proxies.find({});
    const commands = [
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
              res.error({error, stderr, stdout}) 
            } else {
              res.send({msg: "Certificate and routing ready."});   
            }
          });
        })
        .catch(err => {
          res.error({err});
        })
      ;  
    } catch(error) {
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