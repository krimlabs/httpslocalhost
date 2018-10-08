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
  const makeCert = `openssl req -x509 -out ${certficateName}.crt -keyout HTTPSLocalhost.key -newkey rsa:2048 -nodes -sha256  -subj /CN=${certficateName} -extensions EXT -config config.tmp`;
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
  const killCommand = `killall $(lsof -t -i:8446) || echo "Server not running"`;
  const startCommand = `NODE_ENV=${process.env.NODE_ENV} node ./src/proxyServer.js &`;
  return {
    isSudo: false,
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
      addDomainsToEtcHostsCommand(domains)
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
            
            const thenable = childProcess.spawn(startServer().cmd, {shell: true});
            console.log('[spawn] childProcess.pid: ', thenable.pid);
            thenable.childProcess.stdout.on('data', function (data) {
              console.log('[spawn] stdout: ', data.toString());
            });

            thenable.childProcess.stderr.on('data', function (data) {
              console.log('[spawn] stderr: ', data.toString());
            });

            thenable.then(function () {
              console.log('[spawn] done!');
            })
            .catch(function (err) {
              console.error('[spawn] ERROR: ', err);
            });
          
            res.send({msg: "Certificate and routing ready."});        
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