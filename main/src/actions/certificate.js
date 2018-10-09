const Schema = require('validate');
const sudo = require('sudo-prompt');
const childProcess = require('child-process-promise');

const validator = require('../utils/validator');
const {stringCleaner} = require('../utils/string');
const db = require('../db');
// const proxyServer = require('../proxyServer');

const generateCertificateCommand = (domains, certficateName='HTTPSLocalhost') => {
  const domainsToDNSNames = domains.map((d, i) => `\nDNS.${i+1}=${d.from}`).join('') + '\n';
  const makeTempConfig = `printf "[dn]\nCN=${certficateName}\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=@alt_names\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth\n[alt_names]${domainsToDNSNames}" > config.tmp`;
  const makeCert = `openssl req -x509 -out ${certficateName}.crt -keyout HTTPSLocalhost.key -newkey rsa:2048 -nodes -sha256  -subj "/CN=httpslocalhost.com/O=HTTPSLocalhost" -extensions EXT -config config.tmp`;
  return {
    isSudo: false, 
    certficateName,
    cmd: `${makeTempConfig}; ${makeCert}; rm config.tmp`
  };
};

const addCertToTrustStoreCommand = (certficatePath) => {
  const deleteExitingCertificate = `security find-certificate -c "HTTPSLocalhost" -a -Z | awk '/SHA-1/{system("security delete-certificate -Z "$NF)}'`;
  const addNewCertificate = `security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain -p ssl -p basic ${certficatePath}`
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
  const domainsText = domains.map(d => `127.0.0.1\t${d.from}\n`).join('');
  return {
    isSudo: true,
    cmd: `cat /etc/hosts > defaultEtcHosts; printf "\n\n## Added by HTTPSLocalhost ##\n\n${domainsText}" | tee -a /etc/hosts > /dev/null`
  };
};

const resetEtcHostsCommand = () => {
  return {
    isSudo: true,
    cmd: 'cat defaultEtcHosts > /etc/hosts; rm defaultEtcHosts'
  }
};

const startServer = () => {
  const killCommand = `pkill -f proxyServer.js"`;
  const startCommand = `NODE_ENV=${process.env.NODE_ENV} nohup node ./src/proxyServer.js >/dev/null 2>&1 &`;
  return {
    isSudo: true,
    cmd: `${killCommand}; ${startCommand}`
  };
};

const actions = {
  generateCertsAddToTrustStoreAndEtcHosts: async (req, res) => {
    const domains = await db.proxies.find({});
    const commands = [
      resetEtcHostsCommand(),
      generateCertificateCommand(domains),
      addCertToTrustStoreCommand('./HTTPSLocalhost.crt'), // figure out the path
      addDomainsToEtcHostsCommand(domains),
      startServer()
    ];

    const modestCommands = commands.filter(c => !c.isSudo).map(c => c.cmd).join(';');
    const immodestCommands = commands.filter(c => c.isSudo).map(c => c.cmd).join(';');


    childProcess.exec(modestCommands)
      .then(() => {
        const options = {
          name: 'HTTPSLocalhost',
          // icns: '/Applications/Electron.app/Contents/Resources/Electron.icns', // (optional)
        };


        // run all commands in one sudo
        sudo.exec(immodestCommands, options, async (error, stdout, stderr) => {
          if (error) {
            console.log(error, stdout, stderr)
            res.error({error, stderr, stdout}) 
          } else {
            console.log("Starting server");
            res.send({msg: "Certificate and routing ready."});   
            
            // const thenable = childProcess.spawn(startServer().cmd, {shell: true});

            // // stream stderr and stdout
            // thenable.childProcess.stdout.on('data', (data) => {
            //   console.log('[spawn] stdout: ', data.toString());
            // });

            // thenable.childProcess.stderr.on('data', (data) => {
            //   console.log('[spawn] stderr: ', data.toString());
            // });

            // thenable
            //   .then(() => {
            //     const purgeFiles = [purgeFile('HTTPSLocalhost.crt', 'HTTPSLocalhost.key')];
            //     childProcess.exec(purgeFiles.map(p => p.cmd).join(';'))
            //       .then(() => {
            //         res.send({msg: "Certificate and routing ready."});   
            //       })
            //       .catch(err => {
            //         console.log('Unable to delete certs');
            //         res.error({err});
            //       })
            //     ;
            //   })
            //   .catch((err) => {
            //     console.error('[spawn] ERROR: ', err);
            //   })
            // ;
          }
        });
      })
      .catch(err => {
        res.error({err});
      })
    ;
  },
  removeCertsAndClearHosts: async (req, res) => {
    // do as said
  }
};

module.exports = actions;