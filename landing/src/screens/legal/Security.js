import React from 'react';

import Nav from 'components/Nav';
import Footer from 'components/Footer';

const Security = () => {
  return (<React.Fragment>
    <Nav />
    <div className="w-90 w-40-ns center mv3 mv4-ns black-60 lh-copy">
      <div className="f2">Security Concerns</div>
      <div className="pa2 bg-black-10 br2">
        HTTPSLocalhost depends on devert, which introduces a root signing authority. 
        I have audited the repo and have ensured its authenticity. This page quotes the author's concerns and measures taken.
      </div>
      <div className="f6 b mt3">"quote</div>
      <p>
      There's a reason that your OS prompts you for your root password when devcert attempts to install it's root certificate authority. By adding it to your machine's trust stores, your browsers will automatically trust any certificate generated with it.
      </p>
      <p>
      This exposes a potential attack vector on your local machine: if someone else could use the devcert certificate authority to generate certificates, and if they could intercept / manipulate your network traffic, they could theoretically impersonate some websites, and your browser would not show any warnings (because it trusts the devcert authority).
      </p>
      <p>
      To prevent this, devcert takes steps to ensure that no one can access the devcert certificate authority credentials to generate malicious certificates without you knowing. The exact approach varies by platform:
      </p>
      <p>
      macOS and Linux: the certificate authority's credentials are written to files that are only readable by the root user (i.e. chown 0 ca-cert.crt and chmod 600 ca-cert.crt). When devcert itself needs these, it shells out to sudo invocations to read / write the credentials.
      </p>
      <p>
      Windows: because of my unfamiliarity with Windows file permissions, I wasn't confident I would be able to correctly set permissions to mimic the setup on macOS and Linux. So instead, devcert will prompt you for a password, and then use that to encrypt the credentials with an AES256 cipher. The password is never written to disk.
      To further protect these credentials, any time they are written to disk, they are written to temporary files, and are immediately deleted after they are no longer needed.
      </p>
      <p>
      Additionally, the root CA certificate is unique to your machine only: it's generated on-the-fly when it is first installed. ensuring there are no central / shared keys to crack across machines.
      </p>
      
      <div className="f3">Why install a root certificate authority at all?</div>

      <p>
      The root certificate authority makes it simpler to manage which domains are configured for SSL by devcert. The alternative is to generate and trust self-signed certificates for each domain. The problem is that while devcert is able to add a certificate to your machine's trust stores, the tooling to remove a certificate doesn't cover every case. So if you ever wanted to untrust devcert's certificates, you'd have to manually remove each one from each trust store.
      </p>
      <p>
      By trusting only a single root CA, devcert is able to guarantee that when you want to disable SSL for a domain, it can do so with no manual intervention
      we just delete the domain-specific certificate files. Since these domain-specific files aren't installed in your trust stores, once they are gone, they are gone.
      </p>
    </div>
    <Footer />
  </ React.Fragment>);
};

export default Security;


